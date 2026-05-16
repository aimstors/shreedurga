// ── Shree Durga Interior · Backend API ──
// Node.js + Express + Supabase

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { createClient } = require('@supabase/supabase-js');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// ── Supabase client ──
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// ── Middleware ──
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000','https://shreedurgainterior.in'],
  credentials: true
}));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { error: 'Too many contact submissions. Please try again in an hour.' }
});
app.use('/api/', limiter);

// ── Email transporter ──
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ── Routes ──

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'Shree Durga Interior API' });
});

// Submit contact/enquiry form
app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const {
      firstName, lastName, phone, email,
      city, services, projectType, budget, message
    } = req.body;

    // Basic validation
    if (!firstName || !lastName || !phone) {
      return res.status(400).json({ error: 'Name and phone are required.' });
    }
    if (phone.length < 10) {
      return res.status(400).json({ error: 'Please enter a valid phone number.' });
    }

    // Save to Supabase
    const { data, error: dbError } = await supabase
      .from('enquiries')
      .insert([{
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        phone: phone.trim(),
        email: email?.trim() || null,
        city: city?.trim() || null,
        services: Array.isArray(services) ? services : [],
        project_type: projectType || null,
        budget: budget || null,
        message: message?.trim() || null,
        status: 'new',
        source: 'website',
        created_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (dbError) {
      console.error('Supabase error:', dbError);
      return res.status(500).json({ error: 'Failed to save enquiry. Please call us directly.' });
    }

    // Send notification email to business
    try {
      await transporter.sendMail({
        from: `"Website Enquiry" <${process.env.SMTP_USER}>`,
        to: process.env.NOTIFY_EMAIL || 'shreedurgainterior50@gmail.com',
        subject: `New Enquiry: ${firstName} ${lastName} — ${projectType || 'General'}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#FAFAF8;border-radius:12px;border:1px solid #E5E5E0">
            <h2 style="color:#1A1A1A;margin-bottom:24px;font-size:24px">📬 New Website Enquiry</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:10px 0;border-bottom:1px solid #EEE;color:#666;font-size:14px;width:140px">Name</td><td style="padding:10px 0;border-bottom:1px solid #EEE;font-weight:600">${firstName} ${lastName}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #EEE;color:#666;font-size:14px">Phone</td><td style="padding:10px 0;border-bottom:1px solid #EEE;font-weight:600"><a href="tel:${phone}" style="color:#B8860B">${phone}</a></td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #EEE;color:#666;font-size:14px">Email</td><td style="padding:10px 0;border-bottom:1px solid #EEE">${email || 'Not provided'}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #EEE;color:#666;font-size:14px">City</td><td style="padding:10px 0;border-bottom:1px solid #EEE">${city || 'Not specified'}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #EEE;color:#666;font-size:14px">Project Type</td><td style="padding:10px 0;border-bottom:1px solid #EEE">${projectType || 'Not specified'}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #EEE;color:#666;font-size:14px">Budget</td><td style="padding:10px 0;border-bottom:1px solid #EEE">${budget || 'Not specified'}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #EEE;color:#666;font-size:14px">Services</td><td style="padding:10px 0;border-bottom:1px solid #EEE">${services?.join(', ') || 'Not specified'}</td></tr>
              <tr><td style="padding:10px 0;color:#666;font-size:14px;vertical-align:top">Message</td><td style="padding:10px 0">${message || 'No message'}</td></tr>
            </table>
            <div style="margin-top:28px;padding:16px;background:#FDF6E3;border-radius:8px;border:1px solid rgba(184,134,11,0.2)">
              <p style="margin:0;font-size:14px;color:#B8860B">Enquiry ID: <strong>#${data.id}</strong> · Received: ${new Date().toLocaleString('en-IN', {timeZone:'Asia/Kolkata'})}</p>
            </div>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error('Email notification failed:', emailErr);
      // Don't fail the request if email fails
    }

    // Send confirmation email to client
    if (email) {
      try {
        await transporter.sendMail({
          from: `"Shree Durga Interior" <${process.env.SMTP_USER}>`,
          to: email,
          subject: 'We received your enquiry — Shree Durga Interior',
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#FAFAF8;border-radius:12px;border:1px solid #E5E5E0">
              <h1 style="font-family:Georgia,serif;color:#1A1A1A;font-size:28px;margin-bottom:8px">Thank you, ${firstName}!</h1>
              <p style="color:#666;font-size:16px;line-height:1.6;margin-bottom:28px">We've received your enquiry and our team will be in touch within <strong>24 hours</strong> to discuss your project.</p>
              <div style="background:#FDF6E3;border:1px solid rgba(184,134,11,0.2);border-radius:10px;padding:20px;margin-bottom:28px">
                <p style="margin:0;font-size:14px;color:#B8860B;font-weight:600">Your Enquiry Reference: #${data.id}</p>
              </div>
              <p style="color:#888;font-size:14px">Need to reach us sooner? Call <a href="tel:+919435754461" style="color:#B8860B;font-weight:600">+91 94357 54461</a></p>
              <hr style="border:none;border-top:1px solid #EEE;margin:28px 0">
              <p style="color:#AAA;font-size:12px">Shree Durga Interior · Kamalabari Rd, Duliajan, Assam · Est. 1999</p>
            </div>
          `,
        });
      } catch (e) {
        // non-critical
      }
    }

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully. We will contact you within 24 hours.',
      enquiryId: data.id,
    });

  } catch (err) {
    console.error('Contact route error:', err);
    res.status(500).json({ error: 'Something went wrong. Please call us at +91 94357 54461.' });
  }
});

// Get all enquiries (admin - protected)
app.get('/api/admin/enquiries', async (req, res) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const { status, page = 1, limit = 20 } = req.query;
  let query = supabase.from('enquiries').select('*', { count: 'exact' });
  if (status) query = query.eq('status', status);
  query = query.order('created_at', { ascending: false }).range((page - 1) * limit, page * limit - 1);
  const { data, error, count } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json({ data, total: count, page: +page, limit: +limit });
});

// Update enquiry status
app.patch('/api/admin/enquiries/:id', async (req, res) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.ADMIN_API_KEY) return res.status(401).json({ error: 'Unauthorized' });
  const { status, notes } = req.body;
  const { data, error } = await supabase
    .from('enquiries')
    .update({ status, notes, updated_at: new Date().toISOString() })
    .eq('id', req.params.id)
    .select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json({ data });
});

// Newsletter subscribe
app.post('/api/newsletter', async (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) return res.status(400).json({ error: 'Valid email required.' });
  const { error } = await supabase.from('newsletter').upsert([{ email: email.toLowerCase().trim(), subscribed_at: new Date().toISOString() }], { onConflict: 'email' });
  if (error) return res.status(500).json({ error: 'Subscription failed.' });
  res.json({ success: true, message: 'Subscribed successfully!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.path });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`\n🏠 Shree Durga Interior API running on port ${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   Health: http://localhost:${PORT}/api/health\n`);
});

module.exports = app;
