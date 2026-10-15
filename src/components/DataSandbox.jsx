'use client';

import { useState, useEffect, useMemo } from 'react';
import { RotateCcw, Download } from 'lucide-react';
import { downloadText } from '@/lib/zip';

// A tiny, dependency-free spreadsheet for practicing the Data Analysis
// curriculum: edit cells directly, paste in real CSV data, and see column
// stats + a simple bar chart update live. No backend, no upload needed.

const SAMPLE_DATA = [
  ['Product', 'Units Sold', 'Price (₦)', 'Region'],
  ['Sneakers', '120', '4500', 'Lagos'],
  ['T-Shirts', '340', '1500', 'Abuja'],
  ['Sneakers', '95', '4500', 'Abuja'],
  ['Caps', '210', '1000', 'Lagos'],
  ['T-Shirts', '150', '1500', 'Kano'],
];

function loadSaved(key) {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function isNumeric(value) {
  return value.trim() !== '' && !isNaN(Number(value));
}

function parseCsv(text) {
  // Deliberately simple — good enough for the clean, comma-separated
  // sample data students will paste in during these lessons.
  return text
    .trim()
    .split('\n')
    .map((row) => row.split(',').map((cell) => cell.trim()));
}

export default function DataSandbox({ storageKey = 'sandbox' }) {
  const [rows, setRows] = useState(SAMPLE_DATA);
  const [hydrated, setHydrated] = useState(false);
  const [statColumn, setStatColumn] = useState(1);
  const [csvText, setCsvText] = useState('');
  const [showCsvInput, setShowCsvInput] = useState(false);

  useEffect(() => {
    const saved = loadSaved(`${storageKey}_rows`);
    if (saved && Array.isArray(saved) && saved.length > 0) setRows(saved);
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  const persist = (newRows) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(`${storageKey}_rows`, JSON.stringify(newRows));
    }
  };

  const header = rows[0] || [];
  const dataRows = rows.slice(1);

  const numericColumns = useMemo(() => {
    return header.map((_, colIdx) => colIdx > 0 && dataRows.every((r) => isNumeric(r[colIdx] ?? '')));
  }, [header, dataRows]);

  const updateCell = (rowIdx, colIdx, value) => {
    const next = rows.map((r, ri) => (ri === rowIdx ? r.map((c, ci) => (ci === colIdx ? value : c)) : r));
    setRows(next);
    persist(next);
  };

  const addRow = () => {
    const next = [...rows, header.map(() => '')];
    setRows(next);
    persist(next);
  };

  const removeRow = (rowIdx) => {
    const next = rows.filter((_, ri) => ri !== rowIdx);
    setRows(next);
    persist(next);
  };

  const handleImportCsv = () => {
    if (!csvText.trim()) return;
    const parsed = parseCsv(csvText);
    if (parsed.length < 2) return;
    setRows(parsed);
    persist(parsed);
    setCsvText('');
    setShowCsvInput(false);
    setStatColumn(1);
  };

  const handleReset = () => {
    if (!window.confirm('Reset this sandbox back to the sample dataset? This clears your changes.')) return;
    setRows(SAMPLE_DATA);
    persist(SAMPLE_DATA);
    setStatColumn(1);
  };

  const handleDownloadCsv = () => {
    const csv = rows.map((row) => row.map((cell) => (cell.includes(',') ? `"${cell}"` : cell)).join(',')).join('\n');
    downloadText(csv, 'kingshima-data-sandbox.csv');
  };

  const stats = useMemo(() => {
    if (!numericColumns[statColumn]) return null;
    const values = dataRows.map((r) => Number(r[statColumn])).filter((n) => !isNaN(n));
    if (values.length === 0) return null;
    const sum = values.reduce((a, b) => a + b, 0);
    return {
      count: values.length,
      sum,
      avg: sum / values.length,
      min: Math.min(...values),
      max: Math.max(...values),
      values,
    };
  }, [dataRows, statColumn, numericColumns]);

  if (!hydrated) return null;

  const numericColumnIndexes = header.map((_, i) => i).filter((i) => numericColumns[i]);
  const maxBarValue = stats ? Math.max(...stats.values, 1) : 1;

  return (
    <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, overflow: 'hidden', marginTop: '0.75rem' }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', padding: '0.6rem 0.85rem', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.03em', color: 'var(--text-muted, #9ca3af)', textTransform: 'uppercase' }}>
          Data Sandbox
        </span>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="button" onClick={() => setShowCsvInput((v) => !v)} style={toolbarBtnStyle}>
            {showCsvInput ? 'Cancel' : 'Paste CSV'}
          </button>
          <button type="button" onClick={addRow} style={toolbarBtnStyle}>+ Row</button>
          <button type="button" onClick={handleDownloadCsv} style={toolbarBtnStyle}>
            <Download size={12} /> CSV
          </button>
          <button type="button" onClick={handleReset} style={toolbarBtnStyle}>
            <RotateCcw size={12} /> Reset
          </button>
        </div>
      </div>

      {showCsvInput && (
        <div style={{ padding: '0.75rem 0.85rem', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.015)' }}>
          <textarea
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            placeholder={'Paste comma-separated data, first row as headers, e.g.\nProduct,Units Sold,Price\nSneakers,120,4500'}
            rows={4}
            style={{
              width: '100%', background: '#0d0d0f', color: '#e5e5e5', fontFamily: 'ui-monospace, monospace',
              fontSize: '0.78rem', padding: '0.6rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, resize: 'vertical',
            }}
          />
          <button type="button" onClick={handleImportCsv} style={{ ...toolbarBtnStyle, marginTop: '0.5rem' }}>
            Import
          </button>
        </div>
      )}

      {/* Grid */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
          <thead>
            <tr>
              {header.map((h, ci) => (
                <th
                  key={ci}
                  style={{
                    textAlign: 'left', padding: '0.5rem 0.6rem', background: 'rgba(255,255,255,0.04)',
                    color: 'var(--text-muted, #9ca3af)', fontWeight: 600, whiteSpace: 'nowrap',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {h}{numericColumns[ci] && <span style={{ opacity: 0.5, fontWeight: 400 }}> #</span>}
                </th>
              ))}
              <th style={{ width: 32, borderBottom: '1px solid rgba(255,255,255,0.08)' }} />
            </tr>
          </thead>
          <tbody>
            {dataRows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <input
                      value={cell}
                      onChange={(e) => updateCell(ri + 1, ci, e.target.value)}
                      style={{
                        width: '100%', minWidth: 90, background: 'transparent', color: '#e5e5e5',
                        border: 'none', outline: 'none', padding: '0.45rem 0.6rem', fontSize: '0.8rem',
                        fontFamily: 'inherit',
                      }}
                    />
                  </td>
                ))}
                <td style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                  <button
                    type="button"
                    onClick={() => removeRow(ri + 1)}
                    title="Remove row"
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-muted, #6b7280)', cursor: 'pointer', fontSize: '0.9rem' }}
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stats + chart */}
      <div style={{ padding: '0.85rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        {numericColumnIndexes.length === 0 ? (
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted, #9ca3af)', margin: 0 }}>
            Add a numeric column (like a price or quantity) to see stats and a chart.
          </p>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted, #9ca3af)' }}>Analyse column:</span>
              <select
                value={statColumn}
                onChange={(e) => setStatColumn(Number(e.target.value))}
                style={{ background: '#0d0d0f', color: '#e5e5e5', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 6, fontSize: '0.78rem', padding: '0.25rem 0.5rem' }}
              >
                {numericColumnIndexes.map((i) => (
                  <option key={i} value={i}>{header[i]}</option>
                ))}
              </select>
            </div>

            {stats && (
              <>
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  {[
                    ['Count', stats.count],
                    ['Sum', stats.sum.toLocaleString()],
                    ['Average', stats.avg.toFixed(2)],
                    ['Min', stats.min.toLocaleString()],
                    ['Max', stats.max.toLocaleString()],
                  ].map(([label, val]) => (
                    <div key={label}>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted, #9ca3af)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>{label}</div>
                      <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>{val}</div>
                    </div>
                  ))}
                </div>

                {/* Simple bar chart, first column as labels */}
                <svg width="100%" height={140} viewBox={`0 0 ${Math.max(dataRows.length * 60, 300)} 140`} style={{ display: 'block' }}>
                  {dataRows.map((row, i) => {
                    const val = Number(row[statColumn]) || 0;
                    const barHeight = (val / maxBarValue) * 90;
                    return (
                      <g key={i} transform={`translate(${i * 60 + 10}, 0)`}>
                        <rect x={0} y={110 - barHeight} width={34} height={barHeight} rx={3} fill="#ff6d40" opacity={0.85} />
                        <text x={17} y={124} textAnchor="middle" fontSize="9" fill="#9ca3af">
                          {(row[0] || '').slice(0, 8)}
                        </text>
                        <text x={17} y={110 - barHeight - 4} textAnchor="middle" fontSize="9" fill="#e5e5e5">
                          {val}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </>
            )}
          </>
        )}
      </div>

      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted, #9ca3af)', padding: '0.5rem 0.85rem', margin: 0, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        Runs entirely in your browser. Edit cells directly, paste your own CSV, or reset to the sample dataset.
      </p>
    </div>
  );
}

const toolbarBtnStyle = {
  display: 'flex', alignItems: 'center', gap: '0.3rem',
  fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted, #9ca3af)',
  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 6, cursor: 'pointer', padding: '0.35rem 0.65rem',
};
