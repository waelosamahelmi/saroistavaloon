const fs = require('fs').promises;

const bookingsPath = '/home/willhelmi/.openclaw/workspace/saroistavaloon/data/bookings.json';

// Simple in-memory database
const db = {
  bookings: [],
  
  async getAll() {
    try {
      const data = await fs.readFile(bookingsPath, 'utf-8');
      this.bookings = JSON.parse(data);
      return this.bookings;
    } catch (error) {
      console.error('Error reading bookings:', error);
      return [];
    }
  },

  async saveBooking(booking) {
    const bookings = await this.getAll();
      const existing = bookings.find(b => 
        b.email === booking.email && 
        b.preferredDate === booking.preferredDate && 
        b.preferredTime === booking.preferredTime
      );
      
      if (existing) {
        throw new Error('Tämä ajankohta on jo varattu');
      }

      const newBooking = {
        ...booking,
        id: `bk_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        status: 'pending',
        paymentStatus: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      this.bookings.push(newBooking);
      await fs.writeFile(bookingsPath, JSON.stringify(this.bookings), null, 2), 'utf-8');
      return newBooking;
    },

  async updateBooking(id, updates) {
    const bookings = await this.getAll();
    const index = bookings.findIndex(b => b.id === id);
    if (index === -1) {
      throw new Error('Varausta ei löydy');
    }

    bookings[index] = {
      ...bookings[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await fs.writeFile(bookingsPath, JSON.stringify(this.bookings), null, 2), 'utf-8');
    return bookings[index];
  },

  async cancelBooking(id) {
    await this.updateBookingStatus(id, { status: 'cancelled' });
  },

  async confirmBooking(id, paymentMethod) {
    await this.updateBookingStatus(id, { 
      status: 'confirmed',
      ...(paymentMethod && { paymentMethod, paymentStatus: paymentMethod === 'cash' ? 'paid' : 'pending' })
    });
  },

  async deleteBooking(id) {
    try {
      const bookings = await this.getAll();
      const filtered = bookings.filter(b => b.id !== id);
      await fs.writeFile(bookingsPath, JSON.stringify({ bookings: filtered }, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  },
};

export default db;
