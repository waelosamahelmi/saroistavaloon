"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Booking {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const router = useRouter();

  useEffect(() => {
    // Check auth
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin");
      return;
    }

    // Fetch bookings
    fetchBookings();
  }, [router]);

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/bookings", {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_SECRET}`,
        },
      });
      const data = await response.json();
      setBookings(data.bookings || []);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin");
  };

  const filteredBookings = bookings.filter((b) => {
    if (filter === "all") return true;
    return b.status === filter;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    completed: bookings.filter((b) => b.status === "completed").length,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-light text-slate-800">
              Admin Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                target="_blank"
                className="text-slate-600 hover:text-slate-800"
              >
                Näytä sivusto →
              </Link>
              <button
                onClick={handleLogout}
                className="text-slate-600 hover:text-red-600"
              >
                Kirjaudu ulos
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm text-slate-600 mb-1">Kaikki varaukset</p>
            <p className="text-3xl font-semibold text-slate-800">{stats.total}</p>
          </div>
          <div className="bg-yellow-50 rounded-lg shadow-sm p-6 border border-yellow-200">
            <p className="text-sm text-yellow-800 mb-1">Odottaa</p>
            <p className="text-3xl font-semibold text-yellow-900">{stats.pending}</p>
          </div>
          <div className="bg-green-50 rounded-lg shadow-sm p-6 border border-green-200">
            <p className="text-sm text-green-800 mb-1">Vahvistettu</p>
            <p className="text-3xl font-semibold text-green-900">{stats.confirmed}</p>
          </div>
          <div className="bg-blue-50 rounded-lg shadow-sm p-6 border border-blue-200">
            <p className="text-sm text-blue-800 mb-1">Suoritettu</p>
            <p className="text-3xl font-semibold text-blue-900">{stats.completed}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Kaikki ({bookings.length})
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === "pending"
                  ? "bg-yellow-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Odottaa ({stats.pending})
            </button>
            <button
              onClick={() => setFilter("confirmed")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === "confirmed"
                  ? "bg-green-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Vahvistettu ({stats.confirmed})
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === "completed"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Suoritettu ({stats.completed})
            </button>
          </div>
        </div>

        {/* Bookings List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-slate-600">Ladataan...</div>
          ) : filteredBookings.length === 0 ? (
            <div className="p-8 text-center text-slate-600">Ei varauksia</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">
                      Asiakas
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">
                      Yhteystiedot
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">
                      Palvelu
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">
                      Toivottu aika
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">
                      Tila
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">
                      Luotu
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <p className="font-medium text-slate-800">{booking.name}</p>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <p className="text-slate-600">{booking.email}</p>
                        {booking.phone && (
                          <p className="text-slate-500">{booking.phone}</p>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {booking.service}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {booking.preferredDate || "Ei toivetta"}
                        {booking.preferredTime && <br />}
                        {booking.preferredTime}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2 py-1 text-xs rounded-full ${
                            booking.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : booking.status === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {booking.status === "pending"
                            ? "Odottaa"
                            : booking.status === "confirmed"
                            ? "Vahvistettu"
                            : "Suoritettu"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-500">
                        {new Date(booking.createdAt).toLocaleDateString("fi-FI")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Coming Soon */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 opacity-50">
            <h3 className="font-medium text-slate-800 mb-2">Materiaalit</h3>
            <p className="text-sm text-slate-600">Tulossa pian</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 opacity-50">
            <h3 className="font-medium text-slate-800 mb-2">Tilastot</h3>
            <p className="text-sm text-slate-600">Tulossa pian</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 opacity-50">
            <h3 className="font-medium text-slate-800 mb-2">Asetukset</h3>
            <p className="text-sm text-slate-600">Tulossa pian</p>
          </div>
        </div>
      </div>
    </div>
  );
}
