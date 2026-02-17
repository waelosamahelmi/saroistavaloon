import { NextRequest, NextResponse } from 'next/server';

const MATERIALS_API = process.env.MATERIALS_API_URL || 'http://69.62.126.13:4000';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path: pathArray } = await context.params;
  const path = pathArray?.join('/') || '';
  // Forward query parameters from the original request
  const searchParams = request.nextUrl.searchParams.toString();
  const queryString = searchParams ? `?${searchParams}` : '';
  // Ensure path starts with /api/ if not already present
  const apiPath = path.startsWith('api/') ? `/${path}` : `/api/${path}`;
  const url = `${MATERIALS_API}${apiPath}${queryString}`;
  
  console.log('[Materials Proxy GET]', url);
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('Authorization') || '',
      },
    });

    // Check if response is ok before parsing JSON
    if (!response.ok) {
      const text = await response.text();
      console.error('Materials API error:', response.status, text);
      return NextResponse.json(
        { error: 'Backend API error', status: response.status, details: text },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Materials API proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to proxy request', details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path: pathArray } = await context.params;
  const path = pathArray?.join('/') || '';
  // Ensure path starts with /api/ if not already present
  const apiPath = path.startsWith('api/') ? `/${path}` : `/api/${path}`;
  const url = `${MATERIALS_API}${apiPath}`;
  
  console.log('[Materials Proxy POST]', url);
  
  try {
    const contentType = request.headers.get('Content-Type') || '';
    let body = null;
    let headers: HeadersInit = {
      'Authorization': request.headers.get('Authorization') || '',
    };

    // Handle multipart/form-data (file uploads)
    if (contentType.includes('multipart/form-data')) {
      // For file uploads, pass FormData directly and let fetch set Content-Type with boundary
      body = await request.formData();
      // Don't set Content-Type - fetch will set it with the correct boundary
    } else {
      // Handle JSON
      headers['Content-Type'] = 'application/json';
      try {
        body = await request.text();
      } catch (e) {
        body = '';
      }
    }
    
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: body || undefined,
    });

    // Check if response is ok before parsing JSON
    if (!response.ok) {
      const text = await response.text();
      console.error('Materials API error:', response.status, text);
      return NextResponse.json(
        { error: 'Backend API error', status: response.status, details: text },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Materials API proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to proxy request', details: String(error) },
      { status: 500 }
    );
  }
}
