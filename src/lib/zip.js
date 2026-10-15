// A minimal, dependency-free ZIP writer — good enough for bundling a
// handful of small text files for download. Uses the STORE method
// (no compression) so there's no need to pull in a compression library
// just to let students download their playground files.

let crcTable = null;
function getCrcTable() {
  if (crcTable) return crcTable;
  crcTable = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? (0xedb88320 ^ (c >>> 1)) : c >>> 1;
    }
    crcTable[n] = c >>> 0;
  }
  return crcTable;
}

function crc32(bytes) {
  const table = getCrcTable();
  let crc = 0 ^ -1;
  for (let i = 0; i < bytes.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ bytes[i]) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}

function u16(n) { return [n & 0xff, (n >> 8) & 0xff]; }
function u32(n) { return [n & 0xff, (n >> 8) & 0xff, (n >> 16) & 0xff, (n >> 24) & 0xff]; }

/**
 * @param {{ name: string, content: string }[]} files
 * @returns {Blob}
 */
export function createZipBlob(files) {
  const encoder = new TextEncoder();
  const localChunks = [];
  const centralChunks = [];
  let offset = 0;

  files.forEach(({ name, content }) => {
    const nameBytes = encoder.encode(name);
    const dataBytes = encoder.encode(content ?? '');
    const crc = crc32(dataBytes);
    const size = dataBytes.length;

    const localHeader = new Uint8Array([
      0x50, 0x4b, 0x03, 0x04, // local file header signature
      20, 0,                  // version needed
      0, 0,                   // flags
      0, 0,                   // compression method (0 = store)
      0, 0, 0, 0,              // mod time / mod date
      ...u32(crc),
      ...u32(size),
      ...u32(size),
      ...u16(nameBytes.length),
      ...u16(0),               // extra field length
    ]);
    localChunks.push(localHeader, nameBytes, dataBytes);

    const centralHeader = new Uint8Array([
      0x50, 0x4b, 0x01, 0x02, // central directory file header signature
      20, 0,                  // version made by
      20, 0,                  // version needed
      0, 0,                   // flags
      0, 0,                   // compression method
      0, 0, 0, 0,              // mod time / mod date
      ...u32(crc),
      ...u32(size),
      ...u32(size),
      ...u16(nameBytes.length),
      ...u16(0),               // extra field length
      ...u16(0),               // comment length
      ...u16(0),               // disk number start
      ...u16(0),               // internal attrs
      ...u32(0),               // external attrs
      ...u32(offset),
    ]);
    centralChunks.push(centralHeader, nameBytes);

    offset += localHeader.length + nameBytes.length + dataBytes.length;
  });

  const centralOffset = offset;
  const centralSize = centralChunks.reduce((sum, c) => sum + c.length, 0);

  const endRecord = new Uint8Array([
    0x50, 0x4b, 0x05, 0x06, // end of central directory signature
    0, 0,
    0, 0,
    ...u16(files.length),
    ...u16(files.length),
    ...u32(centralSize),
    ...u32(centralOffset),
    ...u16(0),
  ]);

  return new Blob([...localChunks, ...centralChunks, endRecord], { type: 'application/zip' });
}

export function downloadZip(files, filename = 'download.zip') {
  const blob = createZipBlob(files);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadText(content, filename) {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
