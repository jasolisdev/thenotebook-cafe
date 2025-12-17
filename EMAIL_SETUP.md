# Email Setup Guide for Contact Form

This guide explains how to set up email notifications for the contact form.

## Overview

The contact form uses [Resend](https://resend.com) to send email notifications when users submit the form. Messages are also saved to Sanity CMS for record-keeping.

## Setup Steps

### 1. Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### 2. Get Your API Key

1. Log in to your Resend dashboard
2. Navigate to **API Keys** in the sidebar
3. Click **Create API Key**
4. Give it a name (e.g., "The Notebook Café Contact Form")
5. Copy the API key (it starts with `re_`)

### 3. Add Domain (For Production)

**For Testing:** You can skip this step and use the default domain `onboarding.resend.dev`. Emails will work but come from this generic domain.

**For Production:**
1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain: `thenotebookcafe.com`
4. Follow the DNS configuration instructions
5. Wait for verification (usually takes a few minutes)

Once verified, update the `from` email in `/app/api/contact/route.ts`:
```typescript
from: 'The Notebook Café <noreply@thenotebookcafe.com>',
```

### 4. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and add your values:
   ```env
   # Resend API Key (from step 2)
   RESEND_API_KEY=re_your_actual_api_key_here

   # Email recipient
   # For testing:
   CONTACT_EMAIL_RECIPIENT=jasolisdev@gmail.com

   # For production (change later):
   # CONTACT_EMAIL_RECIPIENT=thenotebookcafellc@gmail.com
   ```

3. Restart your dev server:
   ```bash
   npm run dev
   ```

### 5. Test the Contact Form

1. Visit `http://localhost:3000/contact`
2. Fill out the form with test data
3. Submit the form
4. Check `jasolisdev@gmail.com` for the email notification

## Email Format

The notification email includes:
- Sender's name and email
- Subject selected from dropdown
- Full message content
- Timestamp
- Styled with The Notebook Café brand colors

## Free Tier Limits

Resend's free tier includes:
- 3,000 emails per month
- 100 emails per day
- Email delivery monitoring
- Perfect for small businesses!

## Troubleshooting

### Emails not arriving?

1. **Check spam folder** - First time emails may go to spam
2. **Verify API key** - Make sure `RESEND_API_KEY` is set correctly
3. **Check logs** - Look for errors in terminal where dev server is running
4. **Test email address** - Ensure recipient email is valid

### "Domain not verified" error?

If using a custom domain, wait for DNS verification. Use `onboarding.resend.dev` for testing.

### Rate limits?

The contact form has built-in rate limiting (3 submissions per minute). If testing frequently, wait a minute between tests.

## Switching to Production Email

When ready to go live:

1. Update `.env.local`:
   ```env
   CONTACT_EMAIL_RECIPIENT=thenotebookcafellc@gmail.com
   ```

2. Add the same to Vercel environment variables:
   - Go to Vercel dashboard → Project Settings → Environment Variables
   - Add `RESEND_API_KEY` and `CONTACT_EMAIL_RECIPIENT`
   - Redeploy

## Support

- Resend Documentation: https://resend.com/docs
- Resend Dashboard: https://resend.com/dashboard
