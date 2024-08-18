from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
import pandas as pd
import os
from io import BytesIO

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

UPLOAD_FOLDER = './uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# 用于存储上传的文件名
file_names = {}

@app.route('/', methods=['GET'])
def get_data():
    return jsonify({"message": "Hello from Flask!"})

@app.route('/upload', methods=['POST'])
def upload_file():
    global file_names

    program_matrix_file = request.files.get('programMatrixFile')
    mspeke_file = request.files.get('mspekeFile')
    hardware_qual_matrix_file = request.files.get('hardwareQualMatrixFile')

    if not program_matrix_file or not mspeke_file or not hardware_qual_matrix_file:
        return jsonify({"error": "Missing file"}), 400

    # 保存文件并记录文件名
    program_matrix_path = os.path.join(UPLOAD_FOLDER, program_matrix_file.filename)
    mspeke_file_path = os.path.join(UPLOAD_FOLDER, mspeke_file.filename)
    hardware_qual_matrix_path = os.path.join(UPLOAD_FOLDER, hardware_qual_matrix_file.filename)

    program_matrix_file.save(program_matrix_path)
    mspeke_file.save(mspeke_file_path)
    hardware_qual_matrix_file.save(hardware_qual_matrix_path)

    # 记录文件名
    file_names['program_matrix_file'] = program_matrix_file.filename
    file_names['mspeke_file'] = mspeke_file.filename
    file_names['hardware_qual_matrix_file'] = hardware_qual_matrix_file.filename

    return jsonify({"message": "文件已成功上传并保存"}), 200

@app.route('/bom_cost_check', methods=['GET'])
def bom_cost_check():
    global file_names

    # 获取文件路径
    program_matrix_path = os.path.join(UPLOAD_FOLDER, file_names.get('program_matrix_file', ''))
    mspeke_file_path = os.path.join(UPLOAD_FOLDER, file_names.get('mspeke_file', ''))
    hardware_qual_matrix_path = os.path.join(UPLOAD_FOLDER, file_names.get('hardware_qual_matrix_file', ''))

    if not os.path.exists(program_matrix_path) or not os.path.exists(mspeke_file_path) or not os.path.exists(hardware_qual_matrix_path):
        return jsonify({"error": "One or more files are missing. Please upload the files first."}), 400

    # 读取 Excel 文件为 DataFrame
    program_matrix_df = pd.read_excel(program_matrix_path)
    mspeke_df = pd.read_excel(mspeke_file_path)
    hardware_qual_matrix_df = pd.read_excel(hardware_qual_matrix_path)

    # 合并 DataFrame
    combined_df = pd.concat([program_matrix_df, mspeke_df, hardware_qual_matrix_df], ignore_index=True)

    # 将合并后的 DataFrame 转换为 CSV
    csv_buffer = BytesIO()
    combined_df.to_csv(csv_buffer, index=False)
    csv_buffer.seek(0)

    return send_file(csv_buffer, as_attachment=True, download_name='combined_bom_cost_check.csv', mimetype='text/csv')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
