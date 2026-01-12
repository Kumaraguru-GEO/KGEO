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
app.use(express.json({ limit: '5mb' }));

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

app.post('/api/counseling-inquiry', async (req, res) => {
  try {
    const data = req.body;

    const timestamp = new Date().toLocaleString('en-IN', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Asia/Kolkata'
    });

    const attachmentInfo = data.attachment ? `
      <div class="section">
        <h3>📎 Attachment</h3>
        <p><span class="label">File Name:</span> ${data.attachment.name}</p>
        <p><span class="label">File Size:</span> ${(data.attachment.size / 1024).toFixed(2)} KB</p>
      </div>
    ` : '';

    const notesSection = data.additionalNotes ? `
      <div class="section">
        <h3>📝 Additional Notes</h3>
        <div class="notes">${data.additionalNotes}</div>
      </div>
    ` : '';

    const attachments = [];
    if (data.attachment && data.attachment.data) {
      attachments.push({
        filename: data.attachment.name || 'attachment',
        content: Buffer.from(data.attachment.data, 'base64'),
        contentType: data.attachment.type || 'application/octet-stream'
      });
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; background: #f5f5f5; }
          .container { max-width: 700px; margin: 20px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #1565d8 0%, #228be6 100%); color: white; padding: 40px 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; }
          .header p { margin: 10px 0 0; opacity: 0.95; font-size: 16px; }
          .content { padding: 40px 30px; }
          .section { margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #f0f7ff; }
          .section:last-child { border-bottom: none; }
          .section h3 { color: #1565d8; font-size: 18px; margin: 0 0 15px; display: flex; align-items: center; gap: 8px; }
          .info-row { margin: 12px 0; display: flex; align-items: baseline; }
          .label { font-weight: 600; color: #1565d8; min-width: 140px; }
          .value { color: #333; flex: 1; }
          .highlight { background: #f0f7ff; padding: 15px; border-radius: 8px; border-left: 4px solid #1565d8; margin: 15px 0; }
          .badge { display: inline-block; background: linear-gradient(135deg, #1565d8, #228be6); color: white; padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: 600; }
          .notes { background: #f9fbff; padding: 15px; border-radius: 10px; border-left: 4px solid #228be6; white-space: pre-wrap; }
          .footer { background: #f8f9fa; padding: 25px 30px; text-align: center; border-top: 2px solid #e9ecef; }
          .footer p { margin: 5px 0; color: #666; font-size: 13px; }
          .timestamp { background: #fff3cd; color: #856404; padding: 12px; border-radius: 8px; border-left: 4px solid #ffc107; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎓 New Counseling Request</h1>
            <p>KI Outbound Programs - Global Future Centre</p>
          </div>
          
          <div class="content">
            <div class="section">
              <h3>👤 Student Information</h3>
              <div class="info-row">
                <span class="label">Full Name:</span>
                <span class="value"><strong>${data.name}</strong></span>
              </div>
              <div class="info-row">
                <span class="label">Email:</span>
                <span class="value"><a href="mailto:${data.email}" style="color: #1565d8; text-decoration: none;">${data.email}</a></span>
              </div>
              <div class="info-row">
                <span class="label">Year:</span>
                <span class="value">${data.year}</span>
              </div>
              <div class="info-row">
                <span class="label">Program:</span>
                <span class="value">${data.program}</span>
              </div>
            </div>

            <div class="section">
              <h3>🌐 Interest Area</h3>
              <div class="highlight">
                <span class="badge">${data.areaOfInterest || 'Not specified'}</span>
              </div>
            </div>

            ${notesSection}

            ${attachmentInfo}

            <div class="timestamp">
              <strong>⏰ Received:</strong> ${timestamp}
            </div>
          </div>

          <div class="footer">
            <p>Global Engagement Office, Kumaraguru Institutions</p>
            <p>geo@kumaraguru.edu.in | +91 422 266 1100</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"K-GEO Portal" <${process.env.VITE_SMTP_USER}>`,
      to: process.env.VITE_GEO_EMAIL,
      replyTo: data.email,
      subject: `🎓 Counseling Request - ${data.name} (${data.program})`,
      html: htmlContent,
      attachments,
    });

    await transporter.sendMail({
      from: `"K-GEO Team" <${process.env.VITE_SMTP_USER}>`,
      to: data.email,
      subject: 'Thank you - Counseling Request Received',
      html: `
        <div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1565d8 0%, #228be6 100%); color: white; padding: 30px; text-align: center;">
            <h1>We got your request</h1>
          </div>
          <div style="padding: 30px;">
            <p>Dear ${data.name},</p>
            <p>Thank you for reaching out for a counseling session about KI Outbound programs.</p>
            ${data.additionalNotes ? `<p><strong>Your Message:</strong><br><em>${data.additionalNotes}</em></p>` : ''}
            <p><strong>What happens next?</strong></p>
            <ul>
              <li>Our Global Future Centre team will review your request.</li>
              <li>We will contact you within 1 business day to schedule the session.</li>
            </ul>
            <p>If you need to add details or documents, reply to this email.</p>
            <p>Best regards,<br><strong>Global Engagement Office</strong></p>
          </div>
        </div>
      `,
    });

    res.json({ success: true, message: 'Counseling request submitted' });

  } catch (error) {
    console.error('Email error (counseling):', error);
    res.status(500).json({ success: false, message: 'Failed to submit request' });
  }
});

app.post('/api/research-inquiry', async (req, res) => {
  try {
    const data = req.body;

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
          .header { background: linear-gradient(135deg, rgb(33, 47, 70) 0%, #228be6 100%); color: white; padding: 30px; text-align: center; }
          .content { background: white; padding: 30px; }
          .section { margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #eee; }
          .label { font-weight: bold; color: rgb(33, 47, 70); }
          .details { background: #f0f7ff; padding: 15px; border-left: 3px solid rgb(33, 47, 70); margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔬 New Research Collaboration Inquiry</h1>
            <p>Kumaraguru Research Office</p>
          </div>
          <div class="content">
            <div class="section">
              <h3>📋 Researcher Details</h3>
              <p><span class="label">Name:</span> <strong>${data.name}</strong></p>
              <p><span class="label">Institution:</span> ${data.institution}</p>
              <p><span class="label">Country:</span> ${data.country}</p>
            </div>
            <div class="section">
              <h3>🔍 Research Information</h3>
              <p><span class="label">Research Domain:</span> ${data.researchDomain}</p>
              <p><span class="label">Preferred Mode:</span> ${data.preferredMode}</p>
            </div>
            <div class="section">
              <h3>📞 Contact Information</h3>
              <p><span class="label">Email:</span> <a href="mailto:${data.email}">${data.email}</a></p>
              <p><span class="label">Phone:</span> ${data.phone || 'Not provided'}</p>
              ${data.cv ? `<p><span class="label">CV/Profile:</span> <a href="${data.cv}" style="color: rgb(33, 47, 70);">${data.cv}</a></p>` : ''}
            </div>
            <div class="section">
              <p><strong>⏰ Received:</strong> ${timestamp}</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send to Research team
    await transporter.sendMail({
      from: `"K-Research Portal" <${process.env.VITE_SMTP_USER}>`,
      to: process.env.VITE_GEO_EMAIL,
      replyTo: data.email,
      subject: `🔬 Research Inquiry - ${data.name} | ${data.researchDomain}`,
      html: htmlContent,
    });

    // Send confirmation
    await transporter.sendMail({
      from: `"Kumaraguru Research Office" <${process.env.VITE_SMTP_USER}>`,
      to: data.email,
      subject: 'Thank you - Kumaraguru Research Collaboration Inquiry',
      html: `
        <div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, rgb(33, 47, 70) 0%, #228be6 100%); color: white; padding: 30px; text-align: center;">
            <h1>Thank You!</h1>
          </div>
          <div style="padding: 30px;">
            <p>Dear ${data.name},</p>
            <p>Thank you for your interest in collaborating with <strong>Kumaraguru Institutions</strong> on research initiatives.</p>
            <p>We received your expression of interest in the field of <strong>${data.researchDomain}</strong>.</p>
            <p><strong>Next Steps:</strong></p>
            <ul>
              <li>Review within 24-48 hours</li>
              <li>Our research team will contact you to discuss opportunities</li>
              <li>We'll share details about ongoing research projects and collaboration possibilities</li>
            </ul>
            <p>Contact: <a href="mailto:research@kumaraguru.edu.in">research@kumaraguru.edu.in</a></p>
            <p>Best regards,<br><strong>Research Collaboration Office</strong></p>
          </div>
        </div>
      `,
    });

    res.json({ success: true, message: 'Research inquiry submitted successfully' });

  } catch (error) {
    console.error('Research inquiry error:', error);
    res.status(500).json({ success: false, message: 'Failed to submit research inquiry' });
  }
});

app.post('/api/global-faculty-inquiry', async (req, res) => {
  try {
    const data = req.body;

    const timestamp = new Date().toLocaleString('en-IN', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Asia/Kolkata'
    });

    // Format selected engagement types
    const engagementTypes = data.engagement && data.engagement.length > 0
      ? data.engagement.map(type => {
          const labels = {
            masterclass: 'Online Masterclass',
            virtual: 'Virtual Teaching',
            coil: 'COIL Program',
            visiting: 'Visiting Faculty',
            adjunct: 'Adjunct Faculty'
          };
          return labels[type] || type;
        })
      : [];

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; }
          .container { max-width: 700px; margin: 0 auto; background: #f5f5f5; }
          .header { background: linear-gradient(135deg, rgb(33, 47, 70) 0%, #228be6 100%); color: white; padding: 30px; text-align: center; }
          .content { background: white; padding: 30px; }
          .section { margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #eee; }
          .label { font-weight: bold; color: rgb(33, 47, 70); }
          .engagement { background: #f0f7ff; padding: 15px; border-left: 3px solid rgb(33, 47, 70); margin: 10px 0; }
          .message-box { background: #f9f9f9; padding: 15px; border-left: 4px solid #228be6; margin: 10px 0; white-space: pre-wrap; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🌍 New Global Faculty Inquiry</h1>
            <p>Kumaraguru Global Engagement Office</p>
          </div>
          <div class="content">
            <div class="section">
              <h3>👤 Faculty Information</h3>
              <p><span class="label">Name:</span> <strong>${data.name}</strong></p>
              <p><span class="label">Institution:</span> ${data.institution}</p>
              <p><span class="label">Country:</span> ${data.country}</p>
            </div>
            <div class="section">
              <h3>🎓 Expertise & Background</h3>
              <p><span class="label">Area of Expertise:</span> ${data.expertise}</p>
            </div>
            <div class="section">
              <h3>🤝 Engagement Interests</h3>
              <div class="engagement">
                ${engagementTypes.length > 0 
                  ? engagementTypes.map(e => `<div>• ${e}</div>`).join('') 
                  : '<p>No engagement types selected</p>'}
              </div>
            </div>
            <div class="section">
              <h3>📞 Contact Information</h3>
              <p><span class="label">Email:</span> <a href="mailto:${data.email}">${data.email}</a></p>
            </div>
            ${data.message ? `
              <div class="section">
                <h3>💬 Message</h3>
                <div class="message-box">${data.message}</div>
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

    // Send to GEO team
    await transporter.sendMail({
      from: `"K-GEO Portal" <${process.env.VITE_SMTP_USER}>`,
      to: process.env.VITE_GEO_EMAIL,
      replyTo: data.email,
      subject: `🌍 Global Faculty Inquiry - ${data.name} (${data.country})`,
      html: htmlContent,
    });

    // Send confirmation
    await transporter.sendMail({
      from: `"K-GEO Team" <${process.env.VITE_SMTP_USER}>`,
      to: data.email,
      subject: 'Thank you - Kumaraguru Global Faculty Inquiry',
      html: `
        <div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, rgb(33, 47, 70) 0%, #228be6 100%); color: white; padding: 30px; text-align: center;">
            <h1>Thank You!</h1>
          </div>
          <div style="padding: 30px;">
            <p>Dear ${data.name},</p>
            <p>Thank you for your interest in <strong>Global Faculty Programs</strong> at Kumaraguru Institutions.</p>
            <p>We received your inquiry from <strong>${data.institution}</strong>.</p>
            <p><strong>Next Steps:</strong></p>
            <ul>
              <li>Review within 24-48 hours</li>
              <li>We'll contact you to discuss engagement opportunities</li>
              <li>Share details about program structures and timelines</li>
            </ul>
            <p>Contact: <a href="mailto:geo@kumaraguru.edu.in">geo@kumaraguru.edu.in</a></p>
            <p>Best regards,<br><strong>Global Engagement Office</strong></p>
          </div>
        </div>
      `,
    });

    res.json({ success: true, message: 'Global faculty inquiry submitted successfully' });

  } catch (error) {
    console.error('Global faculty inquiry error:', error);
    res.status(500).json({ success: false, message: 'Failed to submit global faculty inquiry' });
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
