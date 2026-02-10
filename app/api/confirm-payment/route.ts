/**
 * Payment Confirmation (Stripe)
 * Confirms a payment and updates booking status
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../data/database.js';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { bookingId, paymentIntentId } = body;

    // Get booking
    const bookings = await db.getAll();
    const booking = bookings.find(b => b.id === bookingId);

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Update booking to paid
    await db.updateBookingStatus(booking.id, { 
      status: 'confirmed',
      paymentStatus: 'paid',
      paymentMethod: 'stripe',
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ 
      success: true,
      message: 'Payment confirmed',
      booking: bookingId 
    }, { status: 200 });
  } catch (error) {
    console.error('Payment confirmation error:', error);
    return NextResponse.json({ error: 'Payment confirmation failed' }, { status: 500 });
  }
}
