# Holvi Payment Links - Simple Guide

## ✅ No API needed! Just create payment links manually.

---

## 📋 Step-by-Step Process

### 1️⃣ **Customer Books a Service**
- Customer fills booking form on website
- Booking appears in admin panel with status "Odottaa" (Pending)

### 2️⃣ **Create Holvi Payment Link**

**In Holvi Dashboard:**
1. Log in to https://holvi.com
2. Go to **"Payments"** → **"Payment Links"** (or "Maksulinkit")
3. Click **"Create Payment Link"** (or "Luo maksulinkki")
4. Fill in:
   - **Amount**: 75€ (or whatever service price)
   - **Description**: "Valotapa-apu 60 minuuttia"
   - **Reference**: `VARAUS-[BookingID]` (optional)
   - **Valid until**: 14 days from now
5. Click **"Create"**
6. **Copy the link** (e.g., `https://holvi.com/shop/xxxx/payment/yyyy`)

### 3️⃣ **Send Link to Customer**

**Via Email:**
```
Hei [Nimi]!

Kiitos varauksestasi Säröistä Valoon -palveluun!

📅 Varauksen tiedot:
- Palvelu: [Palvelu]
- Päivämäärä: [DD.MM.YYYY]
- Kellonaika: [HH:MM]
- Hinta: [XX]€ (sis. ALV 24%)

💳 Maksa varaus tästä linkistä:
[Paste Holvi Payment Link Here]

Linkki on voimassa 14 päivää. Kun maksu on suoritettu, 
saat automaattisen vahvistuksen Holvilta.

Nähdään pian!

Ystävällisin terveisin,
[Your Name]
Säröistä Valoon
saroistavaloon@gmail.com
```

**Or via WhatsApp/SMS:**
```
Hei [Nimi]! Kiitos varauksesta. 
Maksa tästä linkistä: [link]
Summa: 75€. Nähdään [DD.MM] klo [HH:MM]!
```

### 4️⃣ **Customer Pays**
Customer clicks link → Pays via:
- Credit/debit card
- Bank transfer
- MobilePay
- Other Finnish payment methods

### 5️⃣ **Confirm in Admin Panel**

**After payment is received:**
1. Log in to admin panel: `/admin`
2. Find the booking in the list
3. Click **"Vahvista"** (Confirm) button
4. Booking status changes to "Vahvistettu" ✅

---

## 💰 Service Prices (Reference)

| Service | Price | Description |
|---------|-------|-------------|
| 45min | 59€ | Valotapa-apu 45 minuuttia |
| 60min | 75€ | Valotapa-apu 60 minuuttia |
| paketti3 | 225€ | 3 kertaa paketti |
| paketti5 | 375€ | 5 kertaa paketti |
| 14paivaa | 129€ | 14 päivän ohjelma |

*All prices include 24% Finnish VAT*

---

## 🔄 Admin Panel Actions

### Pending Bookings (Odottaa):
- **"Vahvista"** button → Marks as paid & confirmed
- **"Poista"** button → Deletes booking

### Confirmed Bookings (Vahvistettu):
- Shows ✅ green badge
- Only **"Poista"** button available

---

## 📧 Optional: Automated Emails

If you want to automate payment link sending, you can:
1. Set up SMTP in `.env.local`
2. Add email template in code
3. Email gets sent automatically when booking is created

But manual is perfectly fine and gives you more control! 👍

---

## ✨ Advantages of Manual Payment Links

✅ **No coding needed** - Just copy-paste links  
✅ **Full control** - You decide when to send  
✅ **Flexible** - Can adjust prices/terms per customer  
✅ **Secure** - Holvi handles all payment security  
✅ **Professional** - Clean payment experience  
✅ **Finnish payment methods** - MobilePay, bank transfer, cards  

---

## 💡 Pro Tips

1. **Save payment link templates** in Holvi for each service (45min, 60min, etc.)
2. **Use reference codes** to track which payment belongs to which booking
3. **Set expiry dates** (14 days) to keep links active but not forever
4. **Check Holvi dashboard** regularly for incoming payments
5. **Confirm bookings ASAP** after payment to send confirmation to customer

---

## 📱 Mobile-Friendly

Holvi payment links work perfectly on mobile:
- Customer opens link on phone
- Pays with MobilePay or card
- Done in 30 seconds! ⚡

---

## 🎯 Summary

**Simple 5-step workflow:**
1. Customer books → Appears in admin
2. Create payment link in Holvi
3. Send link to customer
4. Customer pays
5. Confirm booking in admin

**No API, no complex setup, just works!** ✅

---

Created: 2026-02-14  
For: Säröistä Valoon  
By: Helmies 🦾
