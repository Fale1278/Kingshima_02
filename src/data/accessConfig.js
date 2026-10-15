// Single source of truth for the platform's acceptance / application fee.
// Registration itself is free. This one-time fee is what unlocks full
// access to every course on the platform (no more per-course pricing).
//
// Change ONLY this number to adjust the fee everywhere it's used
// (dashboard paywall, checkout button, FAQ copy references it too —
// update that text manually if you change this).

export const APPLICATION_FEE_NGN = 5000; // ₦5,000 — adjust to anywhere in your ₦5,000–₦10,000 range
export const APPLICATION_FEE_KOBO = APPLICATION_FEE_NGN * 100; // Paystack takes amounts in kobo
