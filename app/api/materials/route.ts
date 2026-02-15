import { NextRequest, NextResponse } from 'next/server';

const MATERIALS_API = process.env.MATERIALS_API_URL || 'http://69.62.126.13:4000';

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${MATERIALS_API}/api/materials`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Materials proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch materials' },
      { status: 500 }
    );
  }
}
