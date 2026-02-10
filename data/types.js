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
 * @property {string} date - YYYY-MM-DD
 * @property {string} time - HH:mm
 * @property {boolean} available
 * @property {string} [bookingId]
 */

/**
 * @typedef {Object} Material
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {number} price
 * @property {'pdf'|'video'} type
 * @property {string} [fileUrl]
 * @property {string} createdAt
 */
