/**
 * Materials API Client
 * Connects Säröistä Valoon website to Materials API
 */

const API_URL = process.env.NEXT_PUBLIC_MATERIALS_API_URL || 'http://69.62.126.13:4000';

interface Material {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'video' | 'pdf';
  price: number;
  thumbnail_url: string;
  preview_url: string;
  duration?: number;
  created_at: string;
}

interface Order {
  id: string;
  status: 'pending' | 'paid' | 'cancelled';
  paid_at?: string;
  created_at: string;
  material_id?: string;
  title?: string;
  price?: number;
  thumbnail_url?: string;
}

interface User {
  id: string;
  email: string;
  name: string;
}

export const materialsApi = {
  /**
   * Get all active materials (public catalog)
   */
  async getMaterials(): Promise<{ materials: Material[] }> {
    const res = await fetch(`${API_URL}/api/materials`);
    if (!res.ok) throw new Error('Failed to fetch materials');
    return res.json();
  },

  /**
   * Get single material details (public)
   */
  async getMaterial(id: string): Promise<{ material: Material }> {
    const res = await fetch(`${API_URL}/api/materials/${id}`);
    if (!res.ok) throw new Error('Material not found');
    return res.json();
  },

  /**
   * Register new user
   */
  async register(email: string, password: string, name: string): Promise<{ success: boolean; token: string; user: User }> {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Registration failed');
    }
    return res.json();
  },

  /**
   * Login user
   */
  async login(email: string, password: string): Promise<{ success: boolean; token: string; user: User }> {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Login failed');
    }
    return res.json();
  },

  /**
   * Create order (requires user token)
   */
  async createOrder(materialId: string, token: string): Promise<{ success: boolean; order: any }> {
    const res = await fetch(`${API_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ materialId }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Order creation failed');
    }
    return res.json();
  },

  /**
   * Get user's orders
   */
  async getMyOrders(token: string): Promise<{ orders: Order[] }> {
    const res = await fetch(`${API_URL}/api/orders/my`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch orders');
    return res.json();
  },

  /**
   * Get user's purchased materials
   */
  async getMyMaterials(token: string): Promise<{ materials: Material[] }> {
    const res = await fetch(`${API_URL}/api/materials/my`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch materials');
    return res.json();
  },

  /**
   * Get download URL for purchased material
   */
  getDownloadUrl(materialId: string, token: string): string {
    return `${API_URL}/api/materials/${materialId}/download?token=${token}`;
  },

  // ==================== ADMIN METHODS ====================

  /**
   * Admin login
   */
  async adminLogin(password: string): Promise<{ success: boolean; token: string }> {
    const res = await fetch(`${API_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Admin login failed');
    }
    return res.json();
  },

  /**
   * Upload material (admin only)
   */
  async uploadMaterial(formData: FormData, adminToken: string): Promise<{ success: boolean; material: any }> {
    const res = await fetch(`${API_URL}/api/admin/materials`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${adminToken}` },
      body: formData,
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Upload failed');
    }
    return res.json();
  },

  /**
   * Get all orders (admin only)
   */
  async getAdminOrders(adminToken: string): Promise<{ orders: any[] }> {
    const res = await fetch(`${API_URL}/api/admin/orders`, {
      headers: { 'Authorization': `Bearer ${adminToken}` },
    });
    if (!res.ok) throw new Error('Failed to fetch orders');
    return res.json();
  },

  /**
   * Add payment link to order (admin only)
   */
  async addPaymentLink(orderId: string, paymentLink: string, adminToken: string): Promise<{ success: boolean }> {
    const res = await fetch(`${API_URL}/api/admin/orders/${orderId}/payment-link`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`,
      },
      body: JSON.stringify({ paymentLink }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to add payment link');
    }
    return res.json();
  },

  /**
   * Mark order as paid (admin only)
   */
  async markAsPaid(orderId: string, adminToken: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_URL}/api/admin/orders/${orderId}/mark-paid`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${adminToken}` },
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to mark as paid');
    }
    return res.json();
  },

  /**
   * Get all materials (admin only)
   */
  async getAdminMaterials(adminToken: string): Promise<{ materials: Material[] }> {
    const res = await fetch(`${API_URL}/api/admin/materials`, {
      headers: { 'Authorization': `Bearer ${adminToken}` },
    });
    if (!res.ok) throw new Error('Failed to fetch materials');
    return res.json();
  },

  /**
   * Delete material (admin only)
   */
  async deleteMaterial(materialId: string, adminToken: string): Promise<{ success: boolean }> {
    const res = await fetch(`${API_URL}/api/admin/materials/${materialId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${adminToken}` },
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to delete material');
    }
    return res.json();
  },
};
