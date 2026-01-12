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

  if (path === 'counseling-inquiry' && req.method === 'POST') {
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

      const timestamp = new Date().toLocaleString('en-IN', {
        dateStyle: 'full',
        timeStyle: 'short',
        timeZone: 'Asia/Kolkata'
      });

      // Format file attachment info
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
                <h3>🎯 Area of Interest</h3>
                <div class="highlight">
                  <span class="badge">${data.areaOfInterest}</span>
                </div>
              </div>

              ${notesSection}

              ${attachmentInfo}

              <div class="timestamp">
                <strong>📅 Received:</strong> ${timestamp}
              </div>
            </div>

            <div class="footer">
              <p><strong>K-GEO Office | Kumaraguru Institutions</strong></p>
              <p>This request was submitted through the KI Outbound Programs Counseling Portal</p>
              <p style="color: #dc3545; font-weight: 600; margin-top: 10px;">⚡ Action Required: Please respond within 24 hours</p>
            </div>
          </div>
        </body>
        </html>
      `;

      // Send to GEO team
      await transporter.sendMail({
        from: `"K-GEO Counseling Portal" <${process.env.VITE_SMTP_USER}>`,
        to: process.env.VITE_GEO_EMAIL,
        replyTo: data.email,
        subject: `🎓 Counseling Request - ${data.name} | ${data.areaOfInterest}`,
        html: htmlContent,
        attachments,
      });

      // Send confirmation to student
      await transporter.sendMail({
        from: `"K-GEO Team" <${process.env.VITE_SMTP_USER}>`,
        to: data.email,
        subject: 'Your Counseling Request Received - Kumaraguru Global Engagement',
        html: `
          <!DOCTYPE html>
          <html>
          <head><meta charset="utf-8"></head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
            <div style="background: linear-gradient(135deg, #1565d8 0%, #228be6 100%); color: white; padding: 35px 30px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; font-size: 26px;">🎉 Request Received!</h1>
              <p style="margin: 10px 0 0; font-size: 16px;">Thank you for reaching out to K-GEO</p>
            </div>
            
            <div style="background: white; padding: 35px 30px; border-radius: 0 0 12px 12px;">
              <p style="font-size: 16px; margin: 0 0 20px;">Dear <strong>${data.name}</strong>,</p>
              
              <p style="font-size: 15px; margin: 0 0 15px;">Thank you for your interest in our <strong>${data.areaOfInterest}</strong> program!</p>
              
              <div style="background: #f0f7ff; padding: 20px; border-radius: 8px; border-left: 4px solid #1565d8; margin: 25px 0;">
                <p style="margin: 0 0 10px; font-size: 15px;"><strong>📋 Your Request Summary:</strong></p>
                <p style="margin: 5px 0; color: #555;"><strong>Name:</strong> ${data.name}</p>
                <p style="margin: 5px 0; color: #555;"><strong>Program:</strong> ${data.program}</p>
                <p style="margin: 5px 0; color: #555;"><strong>Year:</strong> ${data.year}</p>
                <p style="margin: 5px 0; color: #555;"><strong>Interest:</strong> ${data.areaOfInterest}</p>
                ${data.additionalNotes ? `<p style="margin: 5px 0; color: #555;"><strong>Notes:</strong> ${data.additionalNotes}</p>` : ''}
              </div>

              <div style="background: #fff3cd; padding: 18px; border-radius: 8px; border-left: 4px solid #ffc107; margin: 25px 0;">
                <p style="margin: 0; color: #856404; font-weight: 600;">⏱️ What Happens Next?</p>
                <ul style="margin: 10px 0 0; padding-left: 20px; color: #856404;">
                  <li>Our counseling team will review your request within <strong>24 hours</strong></li>
                  <li>You'll receive an email with available counseling slots</li>
                  <li>We'll schedule a personalized session to discuss your global opportunities</li>
                </ul>
              </div>

              <p style="font-size: 15px; margin: 25px 0 15px;">If you have urgent questions, feel free to reach out:</p>
              
              <div style="background: #f8f9fa; padding: 18px; border-radius: 8px; text-align: center; margin: 20px 0;">
                <p style="margin: 5px 0; color: #555;">📧 <a href="mailto:global@kumaraguru.in" style="color: #1565d8; text-decoration: none; font-weight: 600;">global@kumaraguru.in</a></p>
                <p style="margin: 5px 0; color: #555;">📍 K-GEO Office, Kumaraguru Campus</p>
              </div>

              <p style="font-size: 15px; margin: 30px 0 0;">Best regards,</p>
              <p style="font-size: 15px; margin: 5px 0; font-weight: 600; color: #1565d8;">Global Future Centre Team</p>
              <p style="font-size: 14px; margin: 5px 0; color: #666;">Kumaraguru Institutions</p>
            </div>
            
            <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
              <p style="margin: 0;">This is an automated confirmation. Please do not reply to this email.</p>
            </div>
          </body>
          </html>
        `,
      });

      return res.status(200).json({ success: true, message: 'Counseling request submitted successfully' });

    } catch (error) {
      console.error('Counseling email error:', error);
      return res.status(500).json({ success: false, message: 'Failed to submit counseling request' });
    }
  }

  if (path === 'research-inquiry' && req.method === 'POST') {
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

      return res.status(200).json({ success: true, message: 'Research inquiry submitted successfully' });

    } catch (error) {
      console.error('Research inquiry error:', error);
      return res.status(500).json({ success: false, message: 'Failed to submit research inquiry' });
    }
  }

  if (path === 'global-faculty-inquiry' && req.method === 'POST') {
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

      return res.status(200).json({ success: true, message: 'Global faculty inquiry submitted successfully' });

    } catch (error) {
      console.error('Global faculty inquiry error:', error);
      return res.status(500).json({ success: false, message: 'Failed to submit global faculty inquiry' });
    }
  }

  return res.status(404).json({ error: 'Not found' });
}
