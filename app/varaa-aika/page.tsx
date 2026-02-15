'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { bookingApi } from '@/lib/bookingApi';

interface Service {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  price: number;
}

interface TimeSlot {
  start: number;
  end: number;
  startTime: string;
  endTime: string;
}

export default function BookingPage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    // Load services
    bookingApi.getServices()
      .then(data => {
        setServices(data.services);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load services:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedService && selectedDate) {
      setLoadingSlots(true);
      setSlots([]);
      setSelectedSlot(null);

      bookingApi.getAvailability(selectedDate, selectedService.id)
        .then(data => {
          setSlots(data.slots || []);
          setLoadingSlots(false);
        })
        .catch(err => {
          console.error('Failed to load availability:', err);
          setLoadingSlots(false);
        });
    }
  }, [selectedService, selectedDate]);

  const handleBook = async () => {
    if (!selectedSlot) return;

    const token = localStorage.getItem('userToken');
    
    if (!token) {
      // Redirect to login
      router.push('/auth/login?redirect=/varaa-aika');
      return;
    }

    setBooking(true);

    try {
      const result = await bookingApi.createBooking(
        selectedService!.id,
        selectedSlot.start,
        notes,
        token
      );

      if (result.success) {
        alert('✅ Aika varattu!\n\nSaat maksulinkin sähköpostitse 24 tunnin sisällä.');
        router.push('/omat-varaukset');
      }
    } catch (error: any) {
      alert('❌ Virhe: ' + error.message);
    } finally {
      setBooking(false);
    }
  };

  // Get min date (today)
  const today = new Date().toISOString().split('T')[0];
  
  // Get max date (3 months from now)
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
          <p className="mt-4 text-stone-600">Ladataan palveluita...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-amber-50/20 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-light text-stone-800 mb-4 font-serif">
            Varaa aika
          </h1>
          <p className="text-xl text-stone-600">
            Valitse palvelu, päivä ja aika
          </p>
        </div>

        {/* Step 1: Select Service */}
        <div className="mb-8">
          <h2 className="text-2xl font-light text-stone-800 mb-4 font-serif">
            1. Valitse palvelu
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => {
                  setSelectedService(service);
                  setSelectedDate('');
                  setSlots([]);
                  setSelectedSlot(null);
                }}
                className={`text-left p-6 rounded-2xl border-2 transition-all ${
                  selectedService?.id === service.id
                    ? 'border-amber-600 bg-amber-50'
                    : 'border-stone-200 bg-white hover:border-amber-400'
                }`}
              >
                <h3 className="text-xl font-medium text-stone-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-stone-600 mb-3">
                  {service.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-stone-500">
                    ⏱️ {service.duration_minutes} min
                  </span>
                  <span className="text-amber-700 font-medium">
                    {service.price}€
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Select Date */}
        {selectedService && (
          <div className="mb-8">
            <h2 className="text-2xl font-light text-stone-800 mb-4 font-serif">
              2. Valitse päivä
            </h2>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={today}
                max={maxDateStr}
                className="w-full px-4 py-3 border-2 border-stone-300 rounded-lg text-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <p className="text-sm text-stone-500 mt-2">
                Voit varata aikoja enintään 3 kuukautta etukäteen
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Select Time Slot */}
        {selectedService && selectedDate && (
          <div className="mb-8">
            <h2 className="text-2xl font-light text-stone-800 mb-4 font-serif">
              3. Valitse kellonaika
            </h2>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              {loadingSlots ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-700"></div>
                  <p className="mt-2 text-stone-600">Haetaan vapaita aikoja...</p>
                </div>
              ) : slots.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-stone-600">
                    😔 Valitettavasti tälle päivälle ei ole vapaita aikoja.
                  </p>
                  <p className="text-stone-500 text-sm mt-2">
                    Kokeile toista päivää.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {slots.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                        selectedSlot?.start === slot.start
                          ? 'border-amber-600 bg-amber-50 text-amber-800'
                          : 'border-stone-200 bg-white hover:border-amber-400 text-stone-700'
                      }`}
                    >
                      {slot.startTime}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Notes & Book */}
        {selectedSlot && (
          <div className="mb-8">
            <h2 className="text-2xl font-light text-stone-800 mb-4 font-serif">
              4. Lisätiedot (valinnainen)
            </h2>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Voit kertoa tässä lisätietoja tai toiveita..."
                rows={4}
                className="w-full px-4 py-3 border-2 border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Booking Summary & CTA */}
        {selectedSlot && (
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8">
            <h3 className="text-2xl font-light text-stone-800 mb-4 font-serif">
              Yhteenveto
            </h3>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-stone-600">Palvelu:</span>
                <span className="font-medium text-stone-800">{selectedService?.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600">Päivä:</span>
                <span className="font-medium text-stone-800">
                  {new Date(selectedDate).toLocaleDateString('fi-FI', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600">Kellonaika:</span>
                <span className="font-medium text-stone-800">
                  {selectedSlot.startTime} - {selectedSlot.endTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600">Kesto:</span>
                <span className="font-medium text-stone-800">
                  {selectedService?.duration_minutes} min
                </span>
              </div>
              <div className="flex justify-between text-lg pt-4 border-t-2 border-amber-300">
                <span className="text-stone-700 font-medium">Hinta:</span>
                <span className="font-medium text-amber-700">
                  {selectedService?.price}€
                </span>
              </div>
            </div>

            <button
              onClick={handleBook}
              disabled={booking}
              className="w-full bg-stone-800 hover:bg-stone-900 disabled:bg-stone-400 text-white py-4 rounded-full text-lg font-medium transition-all hover:scale-105 disabled:hover:scale-100"
            >
              {booking ? 'Varataan aikaa...' : 'Vahvista varaus'}
            </button>

            <p className="text-sm text-stone-600 text-center mt-4">
              Saat maksulinkin sähköpostitse 24 tunnin sisällä
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
