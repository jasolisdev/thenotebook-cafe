# Email Setup

**Contact & Careers Email Configuration**

Last Updated: December 2025

---

## Overview

Email notifications are sent via **Resend** for:
- Contact form submissions (`/api/contact`)
- Job applications (`/api/apply`)

---

## Setup

### 1. Create Resend Account

1. Go to https://resend.com
2. Sign up and verify your email

### 2. Get API Key

1. Resend dashboard → **API Keys**
2. Create a key (starts with `re_`)

### 3. (Optional) Add Domain

For production, add your domain in Resend and update the `from` email in API routes.

---

## Environment Variables

Add to `.env.local`:

```env
RESEND_API_KEY=re_your_api_key
CONTACT_EMAIL_RECIPIENT=your@email.com
```

---

## Testing

1. Start dev server: `npm run dev`
2. Submit contact form at `http://localhost:3000/contact`
3. Submit careers form at `http://localhost:3000/careers`
4. Check recipient inbox

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| No email delivered | Verify `RESEND_API_KEY` and recipient |
| Domain not verified | Use Resend's test domain until DNS verified |
| Rate limited | Contact: 3/min, Apply: 2/hr |

---

## Email Templates

Contact and careers emails use HTML templates with:
- Dark mode support (`prefers-color-scheme`)
- Mobile responsive layout
- XSS protection (escaped inputs)
- Reply-to button with pre-filled content
