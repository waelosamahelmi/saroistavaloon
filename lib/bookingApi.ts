const API_BASE = '/api/booking-proxy';

export const bookingApi = {
  // ========================================================================
  // PUBLIC ENDPOINTS
  // ========================================================================

  async getServices() {
    const response = await fetch(`${API_BASE}/api/services`);
    return response.json();
  },

  async getAvailability(date: string, serviceId: string) {
    const response = await fetch(
      `${API_BASE}/api/availability?date=${date}&serviceId=${serviceId}`
    );
    return response.json();
  },

  // ========================================================================
  // USER AUTH
  // ========================================================================

  async register(email: string, password: string, name: string, phone?: string) {
    const response = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name, phone })
    });
    return response.json();
  },

  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return response.json();
  },

  // ========================================================================
  // USER BOOKINGS
  // ========================================================================

  async createBooking(serviceId: string, startTime: number, notes: string, token: string) {
    const response = await fetch(`${API_BASE}/api/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ serviceId, startTime, notes })
    });
    return response.json();
  },

  async getMyBookings(token: string) {
    const response = await fetch(`${API_BASE}/api/bookings`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  async cancelBooking(bookingId: string, token: string) {
    const response = await fetch(`${API_BASE}/api/bookings/${bookingId}/cancel`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  // ========================================================================
  // ADMIN AUTH
  // ========================================================================

  async adminLogin(password: string) {
    const response = await fetch(`${API_BASE}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    return response.json();
  },

  // ========================================================================
  // ADMIN ENDPOINTS
  // ========================================================================

  async getAdminBookings(token: string) {
    const response = await fetch(`${API_BASE}/api/admin/bookings`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  async addPaymentLink(bookingId: string, paymentLink: string, token: string) {
    const response = await fetch(`${API_BASE}/api/admin/bookings/${bookingId}/payment-link`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ paymentLink })
    });
    return response.json();
  },

  async markAsPaid(bookingId: string, token: string) {
    const response = await fetch(`${API_BASE}/api/admin/bookings/${bookingId}/mark-paid`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  async getAdminServices(token: string) {
    const response = await fetch(`${API_BASE}/api/admin/services`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  async createService(
    title: string,
    description: string,
    durationMinutes: number,
    price: number,
    token: string
  ) {
    const response = await fetch(`${API_BASE}/api/admin/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title, description, durationMinutes, price })
    });
    return response.json();
  },

  async deleteService(serviceId: string, token: string) {
    const response = await fetch(`${API_BASE}/api/admin/services/${serviceId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  async getAdminAvailability(token: string) {
    const response = await fetch(`${API_BASE}/api/admin/availability`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  async createAvailability(
    dayOfWeek: number,
    startTime: string,
    endTime: string,
    token: string
  ) {
    const response = await fetch(`${API_BASE}/api/admin/availability`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ dayOfWeek, startTime, endTime })
    });
    return response.json();
  },

  async deleteAvailability(availabilityId: string, token: string) {
    const response = await fetch(`${API_BASE}/api/admin/availability/${availabilityId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  }
};
