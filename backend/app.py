from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

UPLOAD_FOLDER = './uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/upload', methods=['POST'])
def upload_file():
    program_matrix_file = request.files.get('programMatrixFile')
    mspeke_file = request.files.get('mspekeFile')
    hardware_qual_matrix_file = request.files.get('hardwareQualMatrixFile')

    if not program_matrix_file or not mspeke_file or not hardware_qual_matrix_file:
        return jsonify({"error": "Missing file"}), 400

    # 保存文件
    program_matrix_path = os.path.join(UPLOAD_FOLDER, program_matrix_file.filename)
    mspeke_file_path = os.path.join(UPLOAD_FOLDER, mspeke_file.filename)
    hardware_qual_matrix_path = os.path.join(UPLOAD_FOLDER, hardware_qual_matrix_file.filename)

    program_matrix_file.save(program_matrix_path)
    mspeke_file.save(mspeke_file_path)
    hardware_qual_matrix_file.save(hardware_qual_matrix_path)

    # 读取 Excel 文件（示例操作）
    program_matrix_df = pd.read_excel(program_matrix_path)
    mspeke_df = pd.read_excel(mspeke_file_path)
    hardware_qual_matrix_df = pd.read_excel(hardware_qual_matrix_path)

    # 您可以在这里对数据进行任何需要的操作，例如分析、保存到数据库等
    print(f"Program Matrix 文件內容:\n{program_matrix_df.head()}")
    print(f"MSPEKE 文件內容:\n{mspeke_df.head()}")
    print(f"Hardware Qual Matrix 文件內容:\n{hardware_qual_matrix_df.head()}")

    return jsonify({"message": "文件已成功上傳並處理"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
