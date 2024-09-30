from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://15.38.111.74"}})  #測試點
CORS(app, resources={r"/*": {"origins": "http://127.0.0.1"}})  #測試點


@app.route('/ollama', methods=['POST'])
def generate_response():
    try:
        # 从请求中获取用户的输入 (prompt)
        user_input = request.json.get('prompt')

        # 调用本地 Ollama 服务
        ollama_response = requests.post(
            "http://127.0.0.1:11434/api/generate",  # 本地运行的 Ollama
            json={"model": "gemma2:9b ", "prompt": user_input, "stream": False},
            headers={"Content-Type": "application/json"}
        )

        # 获取 Ollama 的响应
        ollama_data = ollama_response.json()
        #print(ollama_data)

        # 将 Ollama 的响应发送给前端
        return jsonify({"response": ollama_data.get("response")})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    


if __name__ == "__main__":
    app.run(host="15.38.111.74", port=8081)