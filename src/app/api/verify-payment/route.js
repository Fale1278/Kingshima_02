import { NextResponse } from 'next/server';
import { updateStudent } from '@/lib/db';

export async function POST(req) {
  try {
    const { reference, studentId } = await req.json();

    if (!reference || !studentId) {
      return NextResponse.json(
        { error: 'Missing payment reference or student ID.' },
        { status: 400 }
      );
    }

    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
    if (paystackSecret) {
      // Confirm transaction with Paystack API
      const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
        headers: { Authorization: `Bearer ${paystackSecret}` },
      });
      const verifyData = await verifyRes.json();

      if (!verifyRes.ok || verifyData?.data?.status !== 'success') {
        return NextResponse.json({ error: 'Payment could not be verified with Paystack.' }, { status: 400 });
      }
    }

    // Mark student paid in Node.js backend
    const updated = updateStudent(studentId, {
      application_paid: true,
      application_fee_ref: reference,
    });

    if (!updated) {
      return NextResponse.json({ error: 'Student record not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, student: updated });
  } catch (err) {
    console.error('verify-payment error:', err);
    return NextResponse.json({ error: 'Something went wrong verifying your payment.' }, { status: 500 });
  }
}
