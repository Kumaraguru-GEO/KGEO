import { PublicClientApplication } from '@azure/msal-browser';
import { Client } from '@microsoft/microsoft-graph-client';

const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID}`,
    redirectUri: import.meta.env.VITE_REDIRECT_URI,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

const loginRequest = {
  scopes: ['Mail.Send', 'User.Read'],
};

export async function initializeMsal() {
  await msalInstance.initialize();
}

async function getAuthToken() {
  try {
    await msalInstance.initialize();
    const accounts = msalInstance.getAllAccounts();
    
    if (accounts.length === 0) {
      const loginResponse = await msalInstance.loginPopup(loginRequest);
      return loginResponse.accessToken;
    }
    
    const silentRequest = {
      ...loginRequest,
      account: accounts[0],
    };
    
    const response = await msalInstance.acquireTokenSilent(silentRequest);
    return response.accessToken;
  } catch (error) {
    console.error('Auth error:', error);
    const response = await msalInstance.acquireTokenPopup(loginRequest);
    return response.accessToken;
  }
}

function createGraphClient(accessToken: string) {
  return Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    },
  });
}

interface FormData {
  institution: string;
  country: string;
  contactPerson: string;
  designation: string;
  email: string;
  phone: string;
  interests: {
    [key: string]: boolean;
  };
  notes: string;
}

export async function sendPartnershipEmail(formData: FormData) {
  try {
    const accessToken = await getAuthToken();
    const client = createGraphClient(accessToken);

    // Format selected interests
    const selectedInterests = Object.entries(formData.interests)
      .filter(([_, value]) => value)
      .map(([key]) => {
        const interestLabels: { [key: string]: string } = {
          studentMobility: 'Student Mobility (Exchange, Study Abroad, Projects, Internships, Schools, Immersions)',
          facultyMobility: 'Faculty Mobility (Visiting Faculty, Online Guest Lectures, Training & Development)',
          jointResearch: 'Joint Research & Innovation (Projects, Publications, Conferences, Centres, Supervision)',
          academicPrograms: 'Joint Academic Programs (Dual Degrees, Certifications, Twinning, Online/Hybrid)',
          specializedCollab: 'Specialized Collaborations (COIL, Service Learning, Student Competitions, Centres)'
        };
        return interestLabels[key] || key;
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
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 700px; margin: 0 auto; padding: 20px; background: #f5f5f5; }
          .header { background: linear-gradient(135deg, #1565d8 0%, #228be6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
          .section { margin-bottom: 25px; }
          .section-title { color: #1565d8; font-size: 16px; font-weight: bold; margin-bottom: 10px; border-bottom: 2px solid #1565d8; padding-bottom: 5px; }
          .info-row { margin-bottom: 12px; }
          .info-label { font-weight: 600; color: #555; display: inline-block; min-width: 150px; }
          .info-value { color: #333; }
          .interests-box { background: #f0f7ff; padding: 15px; border-left: 3px solid #1565d8; border-radius: 4px; margin-top: 10px; }
          .interest-item { margin-bottom: 8px; }
          .notes-box { background: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 4px solid #228be6; margin-top: 10px; white-space: pre-wrap; }
          .footer { background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 10px 10px; }
          .badge { background: #228be6; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">🌍 New Partnership Inquiry</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.95;">Kumaraguru Global Engagement Office</p>
          </div>
          
          <div class="content">
            <div class="section">
              <div class="section-title">📋 Institution Details</div>
              <div class="info-row">
                <span class="info-label">Institution Name:</span>
                <span class="info-value"><strong>${formData.institution}</strong></span>
              </div>
              <div class="info-row">
                <span class="info-label">Country:</span>
                <span class="info-value">${formData.country}</span>
              </div>
            </div>

            <div class="section">
              <div class="section-title">👤 Contact Information</div>
              <div class="info-row">
                <span class="info-label">Contact Person:</span>
                <span class="info-value"><strong>${formData.contactPerson}</strong></span>
              </div>
              <div class="info-row">
                <span class="info-label">Designation/Role:</span>
                <span class="info-value">${formData.designation}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Email:</span>
                <span class="info-value"><a href="mailto:${formData.email}" style="color: #1565d8;">${formData.email}</a></span>
              </div>
              <div class="info-row">
                <span class="info-label">Phone:</span>
                <span class="info-value">${formData.phone}</span>
              </div>
            </div>

            <div class="section">
              <div class="section-title">🎯 Areas of Interest <span class="badge">${selectedInterests.length} Selected</span></div>
              <div class="interests-box">
                ${selectedInterests.length > 0 
                  ? selectedInterests.map(interest => `<div class="interest-item">• ${interest}</div>`).join('') 
                  : '<p style="color: #999; font-style: italic;">No specific areas selected</p>'}
              </div>
            </div>

            ${formData.notes ? `
              <div class="section">
                <div class="section-title">💬 Additional Notes</div>
                <div class="notes-box">${formData.notes}</div>
              </div>
            ` : ''}

            <div class="section" style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e0e0e0;">
              <p style="margin: 0; color: #666; font-size: 14px;">
                <strong>⏰ Received:</strong> ${timestamp}
              </p>
            </div>
          </div>

          <div class="footer">
            <p style="margin: 0;">This inquiry was submitted through the Kumaraguru Global Engagement Partnership Portal</p>
            <p style="margin: 5px 0 0 0; color: #999;">Please respond within 24-48 hours</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email to GEO team
    const message = {
      subject: `🌍 New Partnership Inquiry - ${formData.institution} (${formData.country})`,
      body: {
        contentType: 'HTML',
        content: htmlContent,
      },
      toRecipients: [
        {
          emailAddress: {
            address: import.meta.env.VITE_GEO_EMAIL,
          },
        },
      ],
      replyTo: [
        {
          emailAddress: {
            address: formData.email,
            name: formData.contactPerson,
          },
        },
      ],
    };

    await client.api('/me/sendMail').post({ message });

    // Send confirmation email to applicant
    const confirmationHtml = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
        <div style="background: linear-gradient(135deg, #1565d8 0%, #228be6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0;">Thank You for Your Interest!</h1>
        </div>
        <div style="background: white; padding: 30px; border: 1px solid #e0e0e0;">
          <p>Dear ${formData.contactPerson},</p>
          <p>Thank you for expressing interest in partnering with <strong>Kumaraguru Institutions</strong>.</p>
          <p>We have received your inquiry from <strong>${formData.institution}</strong> and our Global Engagement Office team will review your submission carefully.</p>
          <p><strong>What's Next?</strong></p>
          <ul style="line-height: 1.8;">
            <li>Our team will review your partnership proposal within 24-48 hours</li>
            <li>We will reach out to you via email or phone to discuss potential collaboration opportunities</li>
            <li>We may schedule a virtual meeting to explore synergies in detail</li>
          </ul>
          <p>If you have any immediate questions, please feel free to contact us at <a href="mailto:geo@kumaraguru.edu.in" style="color: #1565d8; text-decoration: none;">geo@kumaraguru.edu.in</a></p>
          <p style="margin-top: 30px;">Best regards,<br><strong>Global Engagement Office</strong><br>Kumaraguru Institutions</p>
        </div>
        <div style="background: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 10px 10px;">
          <p style="margin: 0;">Kumaraguru College of Technology | Coimbatore, India</p>
        </div>
      </body>
      </html>
    `;

    const confirmationMessage = {
      subject: 'Thank you for your Partnership Inquiry - Kumaraguru Institutions',
      body: {
        contentType: 'HTML',
        content: confirmationHtml,
      },
      toRecipients: [
        {
          emailAddress: {
            address: formData.email,
            name: formData.contactPerson,
          },
        },
      ],
    };

    await client.api('/me/sendMail').post({ message: confirmationMessage });

    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
}
