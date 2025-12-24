# Email Setup Guide (Contact + Careers)

Last Updated: 2025-12-23

This guide explains how to configure email notifications for contact and careers forms.

---

## Overview

- **Contact form:** `/api/contact` stores a Sanity record and sends an email via Resend.
- **Careers quick-apply:** `/api/careers/apply` sends an email via Resend (no Sanity write).
- **Full application:** `/api/apply` writes a job application to Sanity (no email).

---

## Setup Steps

### 1. Create a Resend Account
1. Go to https://resend.com
2. Sign up and verify your email

### 2. Get Your API Key
1. Resend dashboard → **API Keys**
2. Create a key (starts with `re_`)

### 3. (Optional) Add a Domain
For production, add your domain and update the `from` email in the API routes.

---

## Environment Variables

Add to `.env.local`:

```env
RESEND_API_KEY=re_your_actual_api_key_here
CONTACT_EMAIL_RECIPIENT=thenotebookcafellc@gmail.com
CAREERS_EMAIL_RECIPIENT=thenotebookcafellc@gmail.com
```

---

## Testing Locally

1. Start the dev server: `npm run dev`
2. Submit the contact form at `http://localhost:3000/contact`
3. Submit the careers form at `http://localhost:3000/careers`
4. Check the recipient inboxes

---

## Troubleshooting

- **No email delivered:** verify `RESEND_API_KEY` and recipients.
- **Domain not verified:** use Resend's default testing domain until DNS is verified.
- **Rate limits:** contact (3/min), careers (3/min).
