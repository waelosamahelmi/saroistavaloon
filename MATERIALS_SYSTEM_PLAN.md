# Materials E-Learning System - Build Plan

## Phase 1: Database Schema ✅

### Tables Needed:

1. **materials** (Digital products)
   - id, title, description, category, price
   - type (pdf/video)
   - preview_url (20 sec video or 1-page PDF)
   - full_url (full content, protected)
   - thumbnail_url
   - created_at, updated_at

2. **users** (Customer accounts)
   - id, email, password_hash, name
   - created_at, last_login

3. **orders** (Purchase orders)
   - id, user_id, material_id
   - status (pending/paid/cancelled)
   - payment_link (Holvi link)
   - paid_at, created_at

4. **user_materials** (Access control)
   - user_id, material_id, unlocked_at

---

## Phase 2: Customer Pages 🎨

### `/materiaalit` (Materials Catalog)
- Grid of material cards
- Each card shows:
  - Thumbnail
  - Title
  - Category badge
  - Price
  - "Preview" button (opens modal with 20sec/1page)
  - "Order Now" button

### `/materiaalit/preview/[id]` (Preview Modal/Page)
- Video: First 20 seconds playable
- PDF: First page viewable
- "Order Full Version" button → Login required

### `/materiaalit/my-materials` (User Dashboard)
- Login required
- Shows purchased materials
- Click to access full content
- "My Orders" history

### `/auth/login` & `/auth/register`
- Simple email + password
- Or use email magic link (passwordless)

---

## Phase 3: Admin Panel 🛠️

### `/admin/materials` (Materials Management)
- Upload new material (PDF or Video)
- Set: Title, Description, Category, Price
- Upload preview (20sec video or 1-page PDF)
- Upload full content
- List all materials (edit/delete)

### `/admin/orders` (Orders Management)
- View all orders
- For each order:
  - Customer name, email
  - Material ordered
  - Status badge (Pending/Paid)
  - Input field: Paste Holvi payment link
  - "Send Payment Link" button → Auto-email customer
  - "Mark as Paid" button → Unlock + Email

---

## Phase 4: Automation 🤖

### Email Notifications:
1. **Order Created** → "Thanks! Payment link coming within 24h"
2. **Payment Link Sent** → "Pay here: [link]"
3. **Payment Confirmed** → "Material unlocked! Access here: [link]"

### Access Control:
- Middleware checks if user owns material before showing full content
- Redirect to login if not authenticated
- Redirect to payment if not purchased

---

## Phase 5: File Storage 📁

### Options:

**Option A: Server Upload (Simple)**
- Upload to `/public/materials/previews/`
- Upload to `/public/materials/full/` (protected route)
- Pro: Simple, no external service
- Con: Takes server space

**Option B: Cloud Storage (Scalable)**
- Upload to Google Cloud Storage
- Or AWS S3
- Or Supabase Storage
- Pro: Unlimited space, CDN
- Con: Requires API setup

**Recommendation:** Start with Server Upload, migrate to cloud later if needed.

---

## Tech Stack:

- **Frontend:** Already have Next.js ✅
- **Database:** Upgrade from JSON to SQLite or PostgreSQL
- **Auth:** NextAuth.js or simple JWT
- **File Upload:** `next-connect` + `multer`
- **Email:** Nodemailer (already configured) ✅
- **Payment:** Holvi links (manual paste) ✅

---

## Timeline:

- **Phase 1 (Database):** 1 hour
- **Phase 2 (Customer UI):** 2-3 hours
- **Phase 3 (Admin UI):** 2-3 hours
- **Phase 4 (Automation):** 1-2 hours
- **Phase 5 (File Storage):** 1 hour

**Total:** ~8-10 hours of focused development

---

## MVP Version (Fastest):

To launch quickly, we can simplify:

1. **No user registration** - Just email + order ID
2. **Manual unlock** - Admin pastes email when paid
3. **Simple file hosting** - Google Drive links for now
4. **Basic preview** - Just show thumbnail + description

This reduces to ~4 hours of work.

---

## Next Steps:

1. Choose: Full system or MVP?
2. Database: SQLite (simple) or PostgreSQL (scalable)?
3. Auth: Full accounts or email-only?
4. File storage: Server or cloud?

**Want me to start building?** I'll begin with the database schema and admin upload UI! 🚀

---

Created: 2026-02-14
