import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { writeFile, readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const BOOKINGS_FILE = path.join(process.cwd(), "data", "bookings.json");

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), "data");
  if (!existsSync(dataDir)) {
    await writeFile(path.join(dataDir, "bookings.json"), "[]");
  }
}

// Get all bookings
async function getBookings() {
  await ensureDataDir();
  try {
    const data = await readFile(BOOKINGS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Save booking
async function saveBooking(booking: any) {
  await ensureDataDir();
  const bookings = await getBookings();
  const newBooking = {
    ...booking,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    status: "pending",
  };
  bookings.push(newBooking);
  await writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
  return newBooking;
}

// Send email notification
async function sendEmail(booking: any) {
  // Configure nodemailer with SMTP settings
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Email to client
  await transporter.sendMail({
    from: process.env.SMTP_FROM || "saroistavaloon@gmail.com",
    to: booking.email,
    subject: "Kiitos varauskyselystä - Säröistä Valoon",
    html: `
      <h2>Kiitos varauskyselystäsi!</h2>
      <p>Hei ${booking.name},</p>
      <p>Olemme vastaanottaneet varauskyselysi ja olemme sinuun yhteydessä 1-2 arkipäivän kuluessa.</p>
      
      <h3>Varaustiedot:</h3>
      <ul>
        <li><strong>Palvelu:</strong> ${booking.service}</li>
        <li><strong>Toivottu päivämäärä:</strong> ${booking.preferredDate || "Ei toivetta"}</li>
        <li><strong>Toivottu aika:</strong> ${booking.preferredTime || "Ei toivetta"}</li>
      </ul>
      
      ${booking.message ? `<p><strong>Viestisi:</strong><br>${booking.message}</p>` : ""}
      
      <p>Ystävällisin terveisin,<br>Säröistä Valoon</p>
      <hr>
      <p style="font-size: 12px; color: #666;">
        saroistavaloon@gmail.com | 041 715 4295 (WhatsApp)
      </p>
    `,
  });

  // Email to admin
  await transporter.sendMail({
    from: process.env.SMTP_FROM || "saroistavaloon@gmail.com",
    to: process.env.ADMIN_EMAIL || "saroistavaloon@gmail.com",
    subject: `Uusi varauskysely: ${booking.name}`,
    html: `
      <h2>Uusi varauskysely</h2>
      
      <h3>Asiakastiedot:</h3>
      <ul>
        <li><strong>Nimi:</strong> ${booking.name}</li>
        <li><strong>Sähköposti:</strong> ${booking.email}</li>
        <li><strong>Puhelin:</strong> ${booking.phone || "Ei annettu"}</li>
      </ul>
      
      <h3>Varaustiedot:</h3>
      <ul>
        <li><strong>Palvelu:</strong> ${booking.service}</li>
        <li><strong>Toivottu päivämäärä:</strong> ${booking.preferredDate || "Ei toivetta"}</li>
        <li><strong>Toivottu aika:</strong> ${booking.preferredTime || "Ei toivetta"}</li>
      </ul>
      
      ${booking.message ? `<p><strong>Viesti:</strong><br>${booking.message}</p>` : ""}
      
      <p><a href="${process.env.NEXT_PUBLIC_URL}/admin">Hallitse varauksia →</a></p>
    `,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.service) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save booking
    const booking = await saveBooking(body);

    // Send email notifications (don't wait, just trigger)
    sendEmail(booking).catch(console.error);

    return NextResponse.json({ success: true, booking }, { status: 200 });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to process booking" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Simple auth check (you should implement proper auth)
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bookings = await getBookings();
    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error("Get bookings error:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
