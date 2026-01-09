import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// CORS configuration for both local and production
const corsOptions = {
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.use(express.json());

// Serve static files in production
if (NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
}

// Email transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.VITE_SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify transporter
transporter.verify((error) => {
  if (error) {
    console.error('❌ Email config error:', error.message);
  } else {
    console.log('✅ Email ready');
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', env: NODE_ENV });
});

app.post('/api/partnership-inquiry', async (req, res) => {
  try {
    const data = req.body;

    const selectedInterests = Object.entries(data.interests || {})
      .filter(([_, value]) => value)
      .map(([key]) => {
        const labels = {
          studentMobility: 'Student Mobility',
          facultyMobility: 'Faculty Mobility',
          jointResearch: 'Joint Research & Innovation',
          academicPrograms: 'Joint Academic Programs',
          specializedCollab: 'Specialized Collaborations'
        };
        return labels[key] || key;
      });

    const timestamp = new Date().toLocaleString('en-IN', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Asia/Kolkata'
    });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; }
          .container { max-width: 700px; margin: 0 auto; background: #f5f5f5; }
          .header { background: linear-gradient(135deg, #1565d8 0%, #228be6 100%); color: white; padding: 30px; text-align: center; }
          .content { background: white; padding: 30px; }
          .section { margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #eee; }
          .label { font-weight: bold; color: #1565d8; }
          .interests { background: #f0f7ff; padding: 15px; border-left: 3px solid #1565d8; margin: 10px 0; }
          .notes { background: #f9f9f9; padding: 15px; border-left: 4px solid #228be6; margin: 10px 0; white-space: pre-wrap; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🌍 New Partnership Inquiry</h1>
            <p>Kumaraguru Global Engagement Office</p>
          </div>
          <div class="content">
            <div class="section">
              <h3>📋 Institution Details</h3>
              <p><span class="label">Institution:</span> <strong>${data.institution}</strong></p>
              <p><span class="label">Country:</span> ${data.country}</p>
            </div>
            <div class="section">
              <h3>👤 Contact Information</h3>
              <p><span class="label">Name:</span> <strong>${data.contactPerson}</strong></p>
              <p><span class="label">Designation:</span> ${data.designation}</p>
              <p><span class="label">Email:</span> <a href="mailto:${data.email}">${data.email}</a></p>
              <p><span class="label">Phone:</span> ${data.phone}</p>
            </div>
            <div class="section">
              <h3>🎯 Areas of Interest</h3>
              <div class="interests">
                ${selectedInterests.length > 0 
                  ? selectedInterests.map(i => `<div>• ${i}</div>`).join('') 
                  : '<p>No areas selected</p>'}
              </div>
            </div>
            ${data.notes ? `
              <div class="section">
                <h3>💬 Additional Notes</h3>
                <div class="notes">${data.notes}</div>
              </div>
            ` : ''}
            <div class="section">
              <p><strong>⏰ Received:</strong> ${timestamp}</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"K-GEO Portal" <${process.env.VITE_SMTP_USER}>`,
      to: process.env.VITE_GEO_EMAIL,
      replyTo: data.email,
      subject: `🌍 Partnership Inquiry - ${data.institution} (${data.country})`,
      html: htmlContent,
    });

    await transporter.sendMail({
      from: `"K-GEO Team" <${process.env.VITE_SMTP_USER}>`,
      to: data.email,
      subject: 'Thank you - Kumaraguru Partnership Inquiry',
      html: `
        <div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1565d8 0%, #228be6 100%); color: white; padding: 30px; text-align: center;">
            <h1>Thank You!</h1>
          </div>
          <div style="padding: 30px;">
            <p>Dear ${data.contactPerson},</p>
            <p>Thank you for your interest in partnering with <strong>Kumaraguru Institutions</strong>.</p>
            <p>We received your inquiry from <strong>${data.institution}</strong>.</p>
            <p><strong>Next Steps:</strong></p>
            <ul>
              <li>Review within 24-48 hours</li>
              <li>We'll contact you to discuss opportunities</li>
            </ul>
            <p>Contact: <a href="mailto:geo@kumaraguru.edu.in">geo@kumaraguru.edu.in</a></p>
            <p>Best regards,<br><strong>Global Engagement Office</strong></p>
          </div>
        </div>
      `,
    });

    res.json({ success: true, message: 'Submitted successfully' });

  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, message: 'Failed to submit' });
  }
});

// Serve React app in production
if (NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server: http://localhost:${PORT} [${NODE_ENV}]`);
});

// Export for Vercel
export default app;
