/**
 * Payment Intent Creation (Stripe)
 * Creates a Stripe payment intent for booking
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../data/database.js';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { bookingId, paymentMethod } = body;

    // Get booking
    const bookings = await db.getAll();
    const booking = bookings.find(b => b.id === bookingId);

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Calculate amount based on service
    const servicePrices: { [string]: number } = {
      '45min': 59,
      '60min': 75,
      'paketti3': 225,
      'paketti5': 375,
      '14paivaa': 129,
    };

    const amount = servicePrices[booking.service] || 0;

    // Stripe would process the payment here
    // For now, return mock payment intent
    const paymentIntent = {
      id: `pi_${Date.now()}`,
      amount,
      currency: 'eur',
      bookingId,
      paymentMethod,
      status: 'requires_payment_method',
    };

    return NextResponse.json({ paymentIntent }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Payment intent creation failed' }, { status: 500 });
  }
}
