"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { db } from "@/data/database.js";
import { Booking, TimeSlot } from "@/data/types.js";

/**
 * @typedef {Object} Booking
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} service
 * @property {string} preferredDate
 * @property {string} preferredTime
 * @property {string} [message]
 * @property {'pending'|'confirmed'|'completed'|'cancelled'} status
 * @property {'pending'|'paid'|'invoiced'} paymentStatus
 * @property {'stripe'|'holvi'|'cash'} paymentMethod
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} TimeSlot
 * @property {string} date
 * @property {string} time
 * @property {boolean} available
 * @property {string} [bookingId]
 */

const services = [
  { id: "45min", name: "Henkilökohtainen etäohjaus (45 min)", price: 59 },
  { id: "60min", name: "Henkilökohtainen etäohjaus (60 min)", price: 75 },
  { id: "paketti3", name: "3 kerran paketti", price: 225 },
  { id: "paketti5", name: "5 kerran paketti", price: 375 },
  { id: "14paivaa", name: "14 päivän valmennusjakso", price: 129 },
];

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
];

export default function BookingPage() {
  const searchParams = useSearchParams();
  const preSelectedService = searchParams.get("service");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: preSelectedService || "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const selectedService = services.find(s => s.id === formData.service);

  const [bookings, setBookings] = useState([]);

  const loadSlots = async () => {
    if (formData.preferredDate) {
      setLoadingSlots(true);
      try {
        const daySlots = await db.getSlots(formData.preferredDate);
        setSlots(daySlots);
        setLoadingSlots(false);
      } catch (error) {
        console.error('Error loading slots:', error);
        setLoadingSlots(false);
      }
    }
  };

  const loadBookings = async () => {
    try {
      const allBookings = await db.getAll();
      setBookings(allBookings);
    } catch (error) {
      console.error('Error loading bookings:', error);
    }
  };

  useEffect(() => {
    loadSlots();
    loadBookings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSlot) {
      alert("Valitse ensin vapaa kellonaika");
      return;
    }

    try {
      const booking = await db.saveBooking({
        ...formData,
        preferredTime: selectedSlot,
      });

      setSubmitted(true);

      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          preferredDate: "",
          preferredTime: "",
          message: "",
        });
        setSelectedSlot(null);
        setSlots([]);
        setSubmitted(false);
      }, 2000);

      await loadBookings();
    } catch (error) {
      alert(`Virhe varauksen luomisessa: ${error.message}`);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-light text-slate-800 mb-4">
              Kiitos varauskyselystä!
            </h1>
            <p className="text-slate-600 mb-6">
              Olemme vastaanottaneet varauskyselysi. Vahvistamme sen sähköpostiisi.
            </p>
            <a href="/" className="inline-block mt-8 text-blue-600 hover:text-blue-700">
              Palaa etusivulle
            </a>
          </div>
        </div>
      </div>
    );
  }

  const checkSlotAvailable = (time: string) => {
    const conflictingBookings = bookings.filter(b => 
      b.preferredDate === formData.preferredDate && 
      b.preferredTime === time &&
      b.status !== 'cancelled'
    );
    
    return conflictingBookings.length === 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/30 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl font-light text-slate-800 mb-4">
              Varaa aika
            </h1>
            <p className="text-slate-600">
              Täytä alla oleva lomake. Valitse päivä ja näet vapaat ajat.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8 md:p-10 space-y-6">
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                Nimi
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Sähköposti
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                Puhelin
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-2">
                Valitse palvelu
              </label>
              <select
                id="service"
                required
                value={formData.service}
                onChange={e => {
                  setFormData({ ...formData, service: e.target.value });
                  setSelectedSlot(null);
                  setSlots([]);
                }}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Valitse palvelu</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} - {service.price} €
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="preferredDate" className="block text-sm font-medium text-slate-700 mb-2">
                Toivottu päivämäärä
              </label>
              <input
                type="date"
                id="preferredDate"
                min={new Date().toISOString().split('T')[0]}
                required
                value={formData.preferredDate}
                onChange={e => {
                  setFormData({ ...formData, preferredDate: e.target.value });
                  setSelectedSlot(null);
                  setSlots([]);
                  loadSlots();
                }}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {formData.preferredDate && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Vapaat ajat
                </label>
                {loadingSlots ? (
                  <div className="text-center py-4 text-slate-500">
                    Ladataan aikataulukkoa...
                  </div>
                ) : slots.length === 0 ? (
                  <div className="text-center py-4 text-slate-500">
                    Kaikki ajat on varattuja tälle päivälle
                  </div>
                ) : (
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                    {timeSlots.map((time) => {
                      const isAvailable = checkSlotAvailable(time);
                      
                      return (
                        <button
                          key={time}
                          type="button"
                          disabled={!isAvailable}
                          onClick={() => setSelectedSlot(time)}
                          className={"p-3 rounded-lg border text-center transition-colors " + (
                            isAvailable
                              ? "border-green-500 bg-green-50 text-green-700 hover:bg-green-100 hover:border-green-600"
                              : "border-slate-300 bg-slate-100 text-slate-400 cursor-not-allowed"
                          ) + (
                            selectedSlot === time
                              ? "ring-2 ring-blue-500 bg-blue-50"
                              : ""
                          )}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                Viesti
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Kerro lyhyesti tilanteestasi ja toiveistasi..."
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={!selectedSlot || submitted}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-full transition-colors shadow-sm hover:shadow-md font-medium"
              >
                {submitted ? 'Varausta lähetetty...' : 'Varaa aika'}
              </button>
            </div>

            <p className="text-sm text-slate-500 text-center">
              Valitse vapaa aika nähdäksesi varausmahdollisuudet
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
