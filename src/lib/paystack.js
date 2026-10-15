'use client';

// Thin wrapper around Paystack's Inline JS popup.
// No npm package needed — we just load their script once and reuse it.
// Docs: https://paystack.com/docs/payments/accept-payments/#popup

const PAYSTACK_SCRIPT_SRC = 'https://js.paystack.co/v1/inline.js';

function loadPaystackScript() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Paystack can only be used in the browser.'));
      return;
    }
    if (window.PaystackPop) {
      resolve(window.PaystackPop);
      return;
    }

    const existing = document.querySelector(`script[src="${PAYSTACK_SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve(window.PaystackPop));
      existing.addEventListener('error', () => reject(new Error('Failed to load Paystack script.')));
      return;
    }

    const script = document.createElement('script');
    script.src = PAYSTACK_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve(window.PaystackPop);
    script.onerror = () => reject(new Error('Failed to load Paystack script.'));
    document.body.appendChild(script);
  });
}

/**
 * Opens the Paystack popup to collect the acceptance fee.
 *
 * @param {Object} opts
 * @param {string} opts.email - Student's email (required by Paystack).
 * @param {number} opts.amountKobo - Amount in kobo (₦1 = 100 kobo).
 * @param {string} opts.reference - Unique transaction reference you generate.
 * @param {(reference: string) => void} opts.onSuccess - Called with the reference on successful charge.
 * @param {() => void} [opts.onClose] - Called if the user closes the popup without paying.
 */
export async function payApplicationFee({ email, amountKobo, reference, onSuccess, onClose }) {
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

  if (!publicKey || publicKey.includes('your-paystack')) {
    throw new Error('Payments are not configured yet. Add NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY to your .env.local.');
  }

  const PaystackPop = await loadPaystackScript();

  const cleanRef = String(reference || `ks_${Date.now()}`).replace(/[^a-zA-Z0-9_-]/g, '');

  const handler = PaystackPop.setup({
    key: publicKey,
    email,
    amount: amountKobo,
    currency: 'NGN',
    ref: cleanRef,
    onClose: () => {
      if (onClose) onClose();
    },
    callback: (response) => {
      // Paystack confirms the charge client-side here, but we still verify
      // server-side (see /api/verify-payment) before unlocking access —
      // never trust a client-only success signal for something like this.
      onSuccess(response.reference);
    },
  });

  handler.openIframe();
}
