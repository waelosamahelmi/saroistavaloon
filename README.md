# Säröistä Valoon - Coaching Website

Modern, professional website for Finnish coaching services with admin panel and booking system.

## Features

✅ **Public Website**
- Homepage with service overview
- Services & Pricing page
- Booking form with email notifications
- Contact information
- Self-study materials page (coming soon)
- Disclaimer/Terms page
- Fully responsive design
- Finnish language throughout

✅ **Admin Panel**
- Dashboard with booking statistics
- View and manage all bookings
- Filter by status (pending/confirmed/completed)
- Simple password authentication
- Material management (coming soon)
- Payment integration (coming soon)

✅ **Email Notifications**
- SMTP support (Gmail, custom SMTP)
- Automatic confirmation emails to clients
- Booking notification emails to admin
- Custom HTML templates

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Email:** Nodemailer (SMTP)
- **Data Storage:** JSON files (upgradeable to PostgreSQL)
- **Deployment:** Vercel-ready

## Getting Started

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Configure Environment

Copy \`.env.example\` to \`.env.local\` and fill in your details:

\`\`\`bash
cp .env.example .env.local
\`\`\`

**Required configuration:**
- \`NEXT_PUBLIC_ADMIN_PASSWORD\` - Admin panel password
- \`ADMIN_SECRET\` - API authentication secret
- \`SMTP_USER\` and \`SMTP_PASS\` - Your email credentials

**For Gmail:**
1. Enable 2-factor authentication
2. Generate an "App Password" at https://myaccount.google.com/apppasswords
3. Use that app password in \`SMTP_PASS\`

### 3. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit:
- Public site: http://localhost:3000
- Admin panel: http://localhost:3000/admin

### 4. Build for Production

\`\`\`bash
npm run build
\`\`\`

## Deployment to Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual Deployment

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables in Vercel

Add these in: **Project Settings → Environment Variables**

- \`NEXT_PUBLIC_URL\`
- \`NEXT_PUBLIC_ADMIN_PASSWORD\`
- \`ADMIN_SECRET\`
- \`ADMIN_EMAIL\`
- \`SMTP_HOST\`
- \`SMTP_PORT\`
- \`SMTP_USER\`
- \`SMTP_PASS\`
- \`SMTP_FROM\`

## Project Structure

\`\`\`
saroistavaloon/
├── app/
│   ├── page.tsx                 # Homepage
│   ├── palvelut/page.tsx        # Services & Pricing
│   ├── varaa/page.tsx           # Booking form
│   ├── yhteystiedot/page.tsx   # Contact page
│   ├── materiaalit/page.tsx    # Materials (coming soon)
│   ├── vastuuvapaus/page.tsx   # Disclaimer/Terms
│   ├── admin/
│   │   ├── page.tsx            # Admin login
│   │   └── dashboard/page.tsx  # Admin dashboard
│   └── api/
│       └── bookings/route.ts   # Booking API
├── components/
│   ├── Navigation.tsx           # Header navigation
│   └── Footer.tsx               # Site footer
├── data/
│   └── bookings.json            # Bookings database
└── public/                      # Static assets
\`\`\`

## Adding Stock Images

Place images in \`public/images/\`:

\`\`\`
public/
└── images/
    ├── hero.jpg         # Homepage hero image
    ├── about.jpg        # About section
    ├── services.jpg     # Services background
    └── contact.jpg      # Contact page
\`\`\`

## Future Enhancements

🔜 **Payment Integration**
- Holvi integration
- Stripe support
- Invoice generation

🔜 **Material Management**
- Upload PDF courses
- Set prices
- Track purchases
- Download links

🔜 **Calendar Integration**
- Real-time availability
- Zoom/Teams meeting creation
- Automated reminders

🔜 **Analytics**
- Visitor tracking
- Conversion metrics
- Revenue reports

## Support

For questions or issues, contact: saroistavaloon@gmail.com

## License

Private project - All rights reserved.

---

Built with ❤️ by Helmies
