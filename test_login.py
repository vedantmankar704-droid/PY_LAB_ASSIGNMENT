import json, urllib.request

url = 'http://localhost:5000/api/user-login'
data = json.dumps({'voter_id': 'user123', 'password': 'user123'}).encode()
req = urllib.request.Request(url, data, headers={'Content-Type': 'application/json'})
print(urllib.request.urlopen(req).read().decode())
