// Database Types
export interface Booking {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'invoiced';
  paymentMethod?: 'stripe' | 'holvi' | 'cash';
  createdAt: string;
  updatedAt: string;
}

export interface TimeSlot {
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  available: boolean;
  bookingId?: string;
}

export interface Material {
  id: string;
  title: string;
  description: string;
  price: number;
  type: 'pdf' | 'video';
  fileUrl?: string;
  createdAt: string;
}
