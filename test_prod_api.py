import urllib.request
import json
import urllib.error

url = "https://zexai-production.up.railway.app/api/v1/audio/tts"
data = json.dumps({"model_id": "kie_elevenlabs_turbo_25", "text": "hello test"}).encode('utf-8')

req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
try:
    with urllib.request.urlopen(req) as response:
        print("Success:", response.read().decode())
except urllib.error.HTTPError as e:
    print(f"HTTPError: {e.code}")
    print(f"Body: {e.read().decode('utf-8', errors='ignore')}")
except Exception as e:
    print(f"Error: {e}")
