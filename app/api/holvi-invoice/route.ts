/**
 * Holvi Invoice Generation
 * Creates Finnish PDF invoices for payments
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../data/database.js';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { bookingId } = body;

    // Get booking
    const bookings = await db.getAll();
    const booking = bookings.find(b => b.id === bookingId);

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Create invoice
    const invoice = {
      id: `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      bookingId,
      invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    };

    // For now, return invoice data (would generate PDF in real implementation)
    return NextResponse.json({ invoice }, { status: 200 });
  } catch (error) {
    console.error('Error creating invoice:', error);
    return NextResponse.json({ error: 'Invoice creation failed' }, { status: 500 });
  }
}
