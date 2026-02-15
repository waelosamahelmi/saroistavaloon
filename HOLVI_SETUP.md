# Holvi Payment Integration - Setup Guide

## Overview
This guide explains how to integrate Holvi payment into Säröistä Valoin for automated Finnish invoice generation.

---

## Prerequisites

1. **Holvi Business Account**
   - Sign up at https://holvi.com if you don't have one
   - Verify your business details

2. **Holvi API Access**
   - Available on Holvi Pro or Business plans
   - Contact Holvi support if you need API access

---

## Step 1: Get Holvi API Credentials

### Via Holvi Dashboard:

1. Log in to https://holvi.com
2. Navigate to **Settings** → **Integrations** → **API**
3. Click **"Create API Key"**
4. Copy your credentials:
   - **API Key**: `holvi_sk_live_xxxxxxxxxxxx`
   - **Pool ID**: Your Holvi account ID (usually a UUID)

### Save these securely - you'll need them for environment variables!

---

## Step 2: Set Up Environment Variables

Create `.env.local` file in the project root:

```bash
cd /home/willhelmi/.openclaw/workspace/saroistavaloon
cp .env.example .env.local
```

Edit `.env.local` and add:

```env
# Holvi Payment Integration
HOLVI_API_KEY=holvi_sk_live_your_actual_api_key_here
HOLVI_POOL_ID=your_holvi_pool_id_here
HOLVI_API_URL=https://api.holvi.com
```

**Important**: Never commit `.env.local` to Git! It's already in `.gitignore`.

---

## Step 3: Test the Integration

### Test with cURL:

```bash
curl -X POST http://localhost:3000/api/holvi-invoice \
  -H "Content-Type: application/json" \
  -d '{
    "bookingId": "test_booking_123"
  }'
```

### Expected Response:

```json
{
  "success": true,
  "invoice": {
    "id": "INV-2026-1234",
    "url": "https://holvi.com/invoices/abc123",
    "dueDate": "2026-03-01",
    "amount": 75.00,
    "pdfUrl": "https://holvi.com/invoices/abc123.pdf"
  }
}
```

---

## Step 4: How It Works

### Flow:

1. **Customer books a service** → Booking created (status: pending)
2. **Admin selects "Create Holvi Invoice"** → API call to `/api/holvi-invoice`
3. **Backend creates invoice via Holvi API** → Holvi generates PDF invoice
4. **Customer receives email** → Invoice link + PDF attached
5. **Customer pays** → Holvi marks as paid, updates booking status

### Invoice Details:

- **Items**: Service name + price
- **VAT**: 24% (Finnish standard VAT)
- **Due Date**: 14 days from creation
- **Reference**: `VARAUS-<bookingId>`
- **Payment Methods**: Bank transfer, card (via Holvi)

---

## Step 5: Update Database Helper

The API route expects `db.updateBooking()` to exist. Let's check if it does:

```javascript
// data/database.js should have:
async updateBooking(id, updates) {
  const bookings = await this.getAll();
  const index = bookings.findIndex(b => b.id === id);
  
  if (index === -1) {
    throw new Error('Booking not found');
  }
  
  bookings[index] = { ...bookings[index], ...updates };
  await fs.writeFile(bookingsPath, JSON.stringify(bookings, null, 2));
  
  return bookings[index];
}
```

If missing, add this method to `data/database.js`.

---

## Step 6: Admin Panel Integration

### Add "Create Invoice" Button

In `/app/admin/page.tsx`, add invoice action:

```tsx
<button
  onClick={() => handleCreateInvoice(booking.id)}
  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
>
  Luo lasku
</button>
```

### Handle Invoice Creation:

```tsx
const handleCreateInvoice = async (bookingId: string) => {
  try {
    const response = await fetch('/api/holvi-invoice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingId }),
    });

    if (response.ok) {
      const { invoice } = await response.json();
      alert(`Lasku luotu! Numero: ${invoice.id}\nLinkki: ${invoice.url}`);
      
      // Refresh bookings
      const updatedBookings = await db.getAll();
      setBookings(updatedBookings);
    } else {
      const error = await response.json();
      alert(`Virhe: ${error.details || error.error}`);
    }
  } catch (error) {
    alert(`Virhe laskun luonnissa: ${error.message}`);
  }
};
```

---

## Step 7: Email Notification (Optional)

When invoice is created, send email to customer:

```typescript
// After successful invoice creation in API route:
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

await transporter.sendMail({
  from: process.env.SMTP_FROM,
  to: booking.email,
  subject: 'Laskusi on valmis - Säröistä Valoon',
  html: `
    <h2>Hei ${booking.name}!</h2>
    <p>Laskusi varaukseesi on valmis.</p>
    <p><strong>Laskun numero:</strong> ${invoice.id}</p>
    <p><strong>Summa:</strong> ${invoice.amount} € (sis. ALV 24%)</p>
    <p><strong>Eräpäivä:</strong> ${invoice.dueDate}</p>
    <p><a href="${invoice.url}">Näytä lasku</a> | <a href="${invoice.pdfUrl}">Lataa PDF</a></p>
  `,
});
```

---

## Troubleshooting

### Error: "Holvi API not configured"
→ Check `.env.local` has `HOLVI_API_KEY` and `HOLVI_POOL_ID`

### Error: "Invalid API credentials" (401)
→ API key is wrong or expired. Generate a new one in Holvi dashboard.

### Error: "Booking not found" (404)
→ Check the `bookingId` exists in `data/bookings.json`

### Error: "Failed to create invoice"
→ Check Holvi API response details in server logs

---

## Production Deployment

### On Vercel:

1. Go to project settings → Environment Variables
2. Add:
   - `HOLVI_API_KEY`
   - `HOLVI_POOL_ID`
   - `HOLVI_API_URL`
3. Redeploy the app

### Security Notes:

- ✅ Never expose API keys in frontend code
- ✅ API routes run server-side only
- ✅ Always validate booking ownership before creating invoices
- ✅ Use HTTPS in production (automatic with Vercel)

---

## Alternative: Manual Holvi Payment Links

If you don't want API integration, you can:

1. Create payment links manually in Holvi dashboard
2. Copy link and send to customer via email
3. Mark booking as "invoiced" manually in admin panel

---

**Questions?** Check Holvi API docs: https://docs.holvi.com/api/

---

Created: 2026-02-14
Last Updated: 2026-02-14
