import { NextRequest, NextResponse } from 'next/server';

const BOOKING_API = process.env.BOOKING_API_URL || 'http://69.62.126.13:4001';

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${BOOKING_API}/api/services`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Services proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}
