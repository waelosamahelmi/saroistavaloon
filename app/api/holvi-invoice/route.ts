/**
 * Holvi Invoice Generation
 * Creates Finnish PDF invoices via Holvi API
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../data/database.js';

const HOLVI_API_KEY = process.env.HOLVI_API_KEY;
const HOLVI_POOL_ID = process.env.HOLVI_POOL_ID;
const HOLVI_API_URL = process.env.HOLVI_API_URL || 'https://api.holvi.com';

// Service prices in euros
const servicePrices: Record<string, number> = {
  '45min': 59,
  '60min': 75,
  'paketti3': 225,
  'paketti5': 375,
  '14paivaa': 129,
};

// Service descriptions in Finnish
const serviceDescriptions: Record<string, string> = {
  '45min': 'Valotapa-apu 45 minuuttia',
  '60min': 'Valotapa-apu 60 minuuttia',
  'paketti3': 'Valotapa-paketti 3 kertaa',
  'paketti5': 'Valotapa-paketti 5 kertaa',
  '14paivaa': 'Valotapa-ohjelma 14 päivää',
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { bookingId } = body;

    // Validate API credentials
    if (!HOLVI_API_KEY || !HOLVI_POOL_ID) {
      console.error('Holvi API credentials missing');
      return NextResponse.json(
        { error: 'Holvi API not configured' },
        { status: 500 }
      );
    }

    // Get booking
    const bookings = await db.getAll();
    const booking = bookings.find(b => b.id === bookingId);

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Calculate amount and description
    const amount = servicePrices[booking.service] || 0;
    const description = serviceDescriptions[booking.service] || booking.service;

    // Prepare invoice data for Holvi API
    const invoiceData = {
      type: 'invoice',
      receiver: {
        name: booking.name,
        email: booking.email,
        phone: booking.phone,
      },
      items: [
        {
          description: description,
          quantity: 1,
          unit: 'kpl',
          net: amount,
          vat: 24, // Finnish VAT 24%
        },
      ],
      // Due date: 14 days from now
      due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      // Reference number (optional)
      reference: `VARAUS-${bookingId.substring(0, 8).toUpperCase()}`,
      // Invoice notes
      notes: `Varaus: ${booking.preferredDate} klo ${booking.preferredTime}`,
    };

    // Create invoice via Holvi API
    const response = await fetch(`${HOLVI_API_URL}/v1/pools/${HOLVI_POOL_ID}/invoices/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HOLVI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invoiceData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Holvi API error:', response.status, errorText);
      
      return NextResponse.json(
        { 
          error: 'Failed to create invoice',
          details: response.status === 401 ? 'Invalid API credentials' : errorText
        },
        { status: response.status }
      );
    }

    const invoice = await response.json();

    // Update booking with invoice info
    await db.updateBooking(bookingId, {
      paymentStatus: 'invoiced',
      paymentMethod: 'holvi',
      invoiceId: invoice.code,
      invoiceUrl: invoice.url,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        invoice: {
          id: invoice.code,
          url: invoice.url,
          dueDate: invoice.due_date,
          amount: invoice.total_gross,
          pdfUrl: invoice.pdf_url,
        },
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error creating Holvi invoice:', error);
    return NextResponse.json(
      { error: 'Invoice creation failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
