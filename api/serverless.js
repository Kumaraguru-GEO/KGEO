import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Handle different API routes
  const path = req.url.replace('/api/', '');

  if (path === 'health') {
    return res.status(200).json({ status: 'OK' });
  }

  if (path === 'partnership-inquiry' && req.method === 'POST') {
    try {
      const data = req.body;

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

      // Format selected interests
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

      // Send to GEO team
      await transporter.sendMail({
        from: `"K-GEO Portal" <${process.env.VITE_SMTP_USER}>`,
        to: process.env.VITE_GEO_EMAIL,
        replyTo: data.email,
        subject: `🌍 Partnership Inquiry - ${data.institution} (${data.country})`,
        html: htmlContent,
      });

      // Send confirmation
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

      return res.status(200).json({ success: true, message: 'Submitted successfully' });

    } catch (error) {
      console.error('Email error:', error);
      return res.status(500).json({ success: false, message: 'Failed to submit' });
    }
  }

  return res.status(404).json({ error: 'Not found' });
}
