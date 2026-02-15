'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminRootPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user has admin token
    const token = localStorage.getItem('adminToken');
    
    if (token) {
      // Redirect to materials admin (default landing)
      router.push('/admin/materials');
    } else {
      // Redirect to login
      router.push('/admin/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-stone-900 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
        <p className="mt-4 text-stone-400">Ohjataan...</p>
      </div>
    </div>
  );
}
