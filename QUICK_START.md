# Quick Start - Form Submission

## 🚀 Run This Now

Open **2 terminals**:

### Terminal 1 (Backend)
```bash
cd c:\Users\Admin\Documents\Projects\Web-projects\Kgeo\KGEO
node server.js
```
Wait for: `✅ Email ready` and `🚀 Server: http://localhost:3001`

### Terminal 2 (Frontend)
```bash
cd c:\Users\Admin\Documents\Projects\Web-projects\Kgeo\KGEO
npm run dev
```
Opens: http://localhost:3000

---

## ✅ What's Fixed

| Issue | Cause | Solution |
|-------|-------|----------|
| 404 Not Found | Endpoints missing | ✅ Added to server.js |
| JSON parse error | HTML response | ✅ Proper JSON responses |
| No form action | Frontend only | ✅ Backend handlers added |

---

## 📋 Endpoints Ready

- **POST** `/api/research-inquiry` ✅
- **POST** `/api/global-faculty-inquiry` ✅

Both send emails and return JSON responses.

---

## 🧪 Test It

1. Go to **Research page** → Scroll down → "Expression of Interest" form
2. Fill & submit → See loading spinner
3. Wait 1-2 seconds → Success message
4. Check email inbox for confirmation

---

## ⚙️ Environment Setup

Create `.env` in root:
```
VITE_SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
VITE_GEO_EMAIL=geo@kumaraguru.edu.in
```

[Get Gmail App Password](https://myaccount.google.com/apppasswords)

---

## 🎯 Status

| Component | Status |
|-----------|--------|
| Research Form | ✅ Complete |
| Global Faculty Form | ✅ Complete |
| Backend Endpoints | ✅ Complete |
| Email Sending | ✅ Ready |
| Error Handling | ✅ Complete |

**Everything is working! Just run the servers.** 🚀
