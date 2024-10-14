import requests


base_url = 'http://localhost:8088'

payload = {
    'username': 'jushengtin2',
    'password': 'a22753032',
    'provider': 'db'
}
r = requests.post(base_url + '/api/v1/security/login', json=payload)
if r:
    print('yes')
access_token = r.json()

headersAuth = {
    'Authorization': 'Bearer ' + access_token['access_token']
}
#print(access_token)  # {'access_token': 'eyJ0eXAiOiJKV1QiLCJhbGc...'} (訪問令牌)

# 設置 Authorization 標頭，使用 Bearer 認證
headersAuth = {
    'Authorization': 'Bearer ' + access_token['access_token']
}

# 發送 GET 請求獲取圖表列表
r2 = requests.get(base_url + '/api/v1/chart/', headers=headersAuth)

# 將返回的數據轉換成 JSON 格式
resp_chart = r2.json()

# 打印圖表列表數據
#print(resp_chart)