import { promises as fs } from 'fs';
import { join } from 'path';
import { Booking, TimeSlot, Material } from './types';

const DATA_DIR = join(process.cwd(), 'data');
const BOOKINGS_FILE = join(DATA_DIR, 'bookings.json');
const SLOTS_FILE = join(DATA_DIR, 'slots.json');
const MATERIALS_FILE = join(DATA_DIR, 'materials.json');

// Initialize data files
async function initDataFile(filename: string, defaultData: any = {}) {
  try {
    const filePath = join(DATA_DIR, filename);
    const exists = await fs.access(filePath).then(() => true).catch(() => false);
    if (!exists) {
      await fs.writeFile(filePath, JSON.stringify(defaultData, null, 2), 'utf-8');
    }
    return filePath;
  } catch (error) {
    console.error(`Error initializing ${filename}:`, error);
    throw error;
  }
}

// Database operations
export const db = {
  async getBookings(): Promise<Booking[]> {
    try {
      await initDataFile(BOOKINGS_FILE, { bookings: [] });
      const data = await fs.readFile(BOOKINGS_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      return parsed.bookings || [];
    } catch (error) {
      console.error('Error reading bookings:', error);
      return [];
    }
  },

  async saveBooking(booking: Omit<Booking, 'id' | 'createdAt'>): Promise<Booking> {
    try {
      const bookings = await db.getBookings();
      const existing = bookings.find(b => b.email === booking.email && b.preferredDate === booking.preferredDate && b.preferredTime === booking.preferredTime);
      
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

      bookings.push(newBooking);
      await fs.writeFile(BOOKINGS_FILE, JSON.stringify({ bookings }, null, 2), 'utf-8');
      return newBooking;
    } catch (error) {
      console.error('Error saving booking:', error);
      throw error;
    }
  },

  async updateBookingStatus(id: string, updates: Partial<Booking>): Promise<Booking> {
    try {
      const bookings = await db.getBookings();
      const index = bookings.findIndex(b => b.id === id);
      if (index === -1) {
        throw new Error('Varausta ei löydy');
      }

      bookings[index] = {
        ...bookings[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      await fs.writeFile(BOOKINGS_FILE, JSON.stringify({ bookings }, null, 2), 'utf-8');
      return bookings[index];
    } catch (error) {
      console.error('Error updating booking:', error);
      throw error;
    }
  },

  async cancelBooking(id: string): Promise<void> {
    await db.updateBookingStatus(id, { status: 'cancelled' });
  },

  async confirmBooking(id: string, paymentMethod?: 'stripe' | 'holvi' | 'cash'): Promise<void> {
    await db.updateBookingStatus(id, { 
      status: 'confirmed',
      ...(paymentMethod && { paymentMethod, paymentStatus: paymentMethod === 'cash' ? 'paid' : 'pending' })
    });
  },

  async deleteBooking(id: string): Promise<void> {
    try {
      const bookings = await db.getBookings();
      const filtered = bookings.filter(b => b.id !== id);
      await fs.writeFile(BOOKINGS_FILE, JSON.stringify({ bookings: filtered }, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error deleting booking:', error);
      throw error;
    }
  },

  // Time slots management
  async getSlots(date: string): Promise<TimeSlot[]> {
    try {
      await initDataFile(SLOTS_FILE, {});
      const data = await fs.readFile(SLOTS_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      return parsed[date] || [];
    } catch (error) {
      console.error('Error reading slots:', error);
      return [];
    }
  },

  async saveSlots(date: string, slots: TimeSlot[]): Promise<void> {
    try {
      const data = await fs.readFile(SLOTS_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      parsed[date] = slots;
      await fs.writeFile(SLOTS_FILE, JSON.stringify(parsed, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error saving slots:', error);
      throw error;
    }
  },

  // Materials management
  async getMaterials(): Promise<Material[]> {
    try {
      await initDataFile(MATERIALS_FILE, { materials: [] });
      const data = await fs.readFile(MATERIALS_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      return parsed.materials || [];
    } catch (error) {
      console.error('Error reading materials:', error);
      return [];
    }
  },

  async addMaterial(material: Omit<Material, 'id' | 'createdAt'>): Promise<Material> {
    try {
      const materials = await db.getMaterials();
      const newMaterial = {
        ...material,
        id: `mt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
      };

      materials.push(newMaterial);
      await fs.writeFile(MATERIALS_FILE, JSON.stringify({ materials }, null, 2), 'utf-8');
      return newMaterial;
    } catch (error) {
      console.error('Error saving material:', error);
      throw error;
    }
  },

  async deleteMaterial(id: string): Promise<void> {
    try {
      const materials = await db.getMaterials();
      const filtered = materials.filter(m => m.id !== id);
      await fs.writeFile(MATERIALS_FILE, JSON.stringify({ materials: filtered }, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error deleting material:', error);
      throw error;
    }
  },
};

export default db;
