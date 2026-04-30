# Frontend Yeniden Başlatma

## Sorun
Backend çalışıyor ve API'ler veri dönüyor ama frontend güncellenmiyor.

## Çözüm

### 1. Frontend'i Durdur
```bash
# Terminal'de Ctrl+C ile durdur
```

### 2. Cache Temizle
```bash
cd ai-saas-production/frontend

# Node modules temizle (opsiyonel)
rm -rf node_modules
npm install

# Vite cache temizle
rm -rf .vite
rm -rf dist
```

### 3. Yeniden Başlat
```bash
npm run dev
```

### 4. Browser Cache Temizle
- Chrome/Edge: `Ctrl + Shift + Delete`
- Hard Refresh: `Ctrl + F5`
- Veya Incognito/Private mode'da aç

## Hızlı Test

### Console'da Test Et (F12)
```javascript
// Video modelleri
fetch('http://localhost:8000/api/v1/video/models')
  .then(r => r.json())
  .then(d => console.log('Models:', d.data.length, 'models'))

// Video üretimi
fetch('http://localhost:8000/api/v1/video/generate', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    prompt: 'test video',
    model_id: 'kling25_turbo_text_5s'
  })
})
  .then(r => r.json())
  .then(d => console.log('Generate Response:', d))
```

## Beklenen Sonuç

Console'da görmelisin:
```
Models: 10 models
Generate Response: {success: true, task_id: "...", ...}
```

## Eğer Hala Çalışmazsa

### Frontend Kodunu Kontrol Et
```bash
# Frontend'in hangi API URL'ini kullandığını kontrol et
cd ai-saas-production/frontend
cat .env
```

Görmelisin:
```
VITE_API_URL=http://localhost:8000/api/v1
```

### Network Tab'ı Kontrol Et
1. F12 → Network
2. "Video Üret" butonuna tıkla
3. Request'i gör:
   - URL: `http://localhost:8000/api/v1/video/generate`
   - Method: POST
   - Status: 200
   - Response: `{success: true, ...}`

### Eğer Request Gitmiyorsa
Frontend kodunda sorun var. Button onClick handler'ı çalışmıyor olabilir.

## Son Çare: Hard Reset

```bash
# Backend'i durdur (Ctrl+C)
# Frontend'i durdur (Ctrl+C)

# Backend'i başlat
cd ai-saas-production/backend
python simple_main.py

# Yeni terminal'de frontend'i başlat
cd ai-saas-production/frontend
npm run dev

# Browser'ı tamamen kapat ve yeniden aç
# localhost:5173 adresine git
```

**Şimdi çalışmalı!** 🎉
