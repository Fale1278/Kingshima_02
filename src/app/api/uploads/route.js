import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';
import { recordUpload } from '@/lib/db';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${Date.now()}_${sanitizedName}`;
    const filePath = path.join(UPLOAD_DIR, filename);

    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;
    const uploadRecord = recordUpload({
      filename,
      original_name: file.name,
      mime_type: file.type || 'application/octet-stream',
      size: file.size || buffer.length,
      url: publicUrl,
    });

    return NextResponse.json({
      ok: true,
      url: publicUrl,
      filename,
      size: file.size,
      upload: uploadRecord,
    });
  } catch (err) {
    console.error('File upload error:', err);
    return NextResponse.json({ error: 'Failed to process file upload.' }, { status: 500 });
  }
}
