# API Setup Guide - Form Submission Backend

## ✅ What Was Fixed

The API routing errors have been resolved by adding the two missing endpoints to `server.js`:

### New Endpoints Added:
1. **POST `/api/research-inquiry`** - Research collaboration form
2. **POST `/api/global-faculty-inquiry`** - Global faculty engagement form

Both endpoints now properly handle:
- Form data reception and validation
- HTML email template generation
- Dual email sending (user confirmation + admin notification)
- JSON response for frontend error handling

## 🚀 How to Run (Development)

### Step 1: Start the Backend Server
```bash
node server.js
```
This starts the Express server on `http://localhost:3001`

**Expected output:**
```
✅ Email ready
🚀 Server: http://localhost:3001 [development]
```

### Step 2: In a New Terminal, Start the Vite Dev Server
```bash
npm run dev
```
This starts the Vite dev server on `http://localhost:3000`

**Expected output:**
```
➜  Local:   http://localhost:3000/
```

### Step 3: Test the Forms

Navigate to:
- **Research Page:** http://localhost:3000/ → Scroll to "Expression of Interest" form
- **Global Faculty Page:** http://localhost:3000/global-faculty → Scroll to "Get Started" form

Fill out and submit the forms. You should see:
1. ✅ Loading spinner showing "Sending..."
2. ✅ Success message after 1-2 seconds
3. ✅ Form fields reset
4. ✅ Emails received in your inbox

---

## 📝 Environment Variables Required

Create a `.env` file in the root directory with:

```env
# Email Configuration
VITE_SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password

# Email Recipients
VITE_GEO_EMAIL=geo@kumaraguru.edu.in

# Optional
PORT=3001
NODE_ENV=development
```

### Getting Gmail App Password:
1. Enable 2-Step Verification on your Google Account
2. Go to https://myaccount.google.com/apppasswords
3. Select "Mail" and "Windows Computer"
4. Copy the generated 16-character password
5. Paste into `.env` as `SMTP_PASS`

---

## 🔧 How the API Works

### Research Inquiry Endpoint
**URL:** `/api/research-inquiry`  
**Method:** POST  
**Body:**
```json
{
  "name": "Dr. Jane Smith",
  "institution": "University Name",
  "country": "United States",
  "researchDomain": "AI, Sustainability, etc.",
  "preferredMode": "PhD Co-Supervision",
  "email": "jane@university.edu",
  "phone": "+1 234 567 8900",
  "cv": "https://yourwebsite.com/cv"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Research inquiry submitted successfully"
}
```

### Global Faculty Inquiry Endpoint
**URL:** `/api/global-faculty-inquiry`  
**Method:** POST  
**Body:**
```json
{
  "name": "Dr. John Doe",
  "email": "john@institution.edu",
  "institution": "Global University",
  "country": "Canada",
  "expertise": "Computer Science",
  "engagement": ["masterclass", "visiting"],
  "message": "Interested in collaboration..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Global faculty inquiry submitted successfully"
}
```

---

## 🐛 Troubleshooting

### Error: "Failed to load resource: 404"
**Cause:** Backend server not running
**Solution:** 
```bash
node server.js
```

### Error: "SyntaxError: Unexpected token '<', '<!DOCTYPE'"
**Cause:** API endpoint doesn't exist or returns HTML instead of JSON
**Solution:** Make sure backend server is running and endpoints are registered

### Error: "Email config error"
**Cause:** Invalid Gmail credentials or app password
**Solution:** 
1. Verify `VITE_SMTP_USER` and `SMTP_PASS` in `.env`
2. Check Gmail app password is correct (no spaces)
3. Ensure 2-Step Verification is enabled

### Error: "ERR_HTTP_HEADERS_SENT"
**Cause:** Response already sent to client
**Solution:** Reload page and try again, this is a rare race condition

---

## 📧 Email Templates

Both endpoints send two emails:

### 1. **Admin Notification Email** (to geo@kumaraguru.edu.in)
- Contains all form details
- Color-coded sections for easy scanning
- Timestamp in IST timezone
- Reply-To field set to sender

### 2. **User Confirmation Email** (to form submitter)
- Thank you message
- Confirmation of received data
- Next steps (24-48 hour response time)
- Contact information

---

## 🛠️ Production Deployment

For Vercel or similar serverless platforms:

1. **Environment Variables:** Add to platform's settings
2. **Server:** Use `api/serverless.js` (already configured)
3. **API Routes:** Will auto-map to `/api/[endpoint]`

The `server.js` is for local development.  
The `api/serverless.js` is for serverless deployments.

---

## ✨ File Changes Summary

### Modified Files:
- ✅ `server.js` - Added 2 new POST endpoints
- ✅ `vite.config.ts` - Updated proxy configuration
- ✅ `src/components/pages/Research.tsx` - Added async form handling
- ✅ `src/components/pages/GlobalFaculty.tsx` - Added async form handling
- ✅ `api/serverless.js` - Added same endpoints for serverless deployment

### No Breaking Changes:
- All existing functionality preserved
- Backward compatible with Partnerships form
- Same email format and styling

---

## 🎯 Next Steps

1. ✅ Set up `.env` with email credentials
2. ✅ Run `node server.js` in terminal
3. ✅ Run `npm run dev` in another terminal
4. ✅ Test forms at http://localhost:3000
5. ✅ Check inbox for confirmation emails

**That's it! Your forms are now fully functional.** 🎉
