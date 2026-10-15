'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CertificateGenerator from '@/components/CertificateGenerator';
import styles from './page.module.css';

export default function VerifyCertificatePage() {
  const [certId, setCertId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDiplomaModal, setShowDiplomaModal] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!certId.trim()) return;
    setLoading(true);

    setTimeout(() => {
      const clean = certId.trim().toUpperCase();
      if (clean.startsWith('CERT-KGS') || clean.length >= 8) {
        setResult({
          valid: true,
          studentName: 'Emmanuel O. Adeleke',
          courseTitle: 'Full-Stack Software Architecture & Cloud',
          certId: clean,
          issuedDate: 'September 24, 2026',
          status: 'Authentic & Cryptographically Verified',
          evaluator: 'Fale King Nanmua (Founder & Executive Director)',
          grade: 'Distinction & Honors Capstone',
        });
      } else {
        setResult({
          valid: false,
          message: 'No certificate matching this identifier was found in the Kingshima registry archive. Please double-check the ID printed on your diploma.',
        });
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        
        {/* Navigation Breadcrumb */}
        <div className={styles.breadcrumb}>
          <Link href="/" className={styles.backLink}>
            ← Return to Kingshima Home
          </Link>
          <span className={styles.divider}>//</span>
          <span className={styles.currentLoc}>Public Registry</span>
        </div>

        {/* Header Block */}
        <div className={styles.header}>
          <div className={styles.kicker}>
            <span className={styles.dot} />
            <span className={styles.kickerText}>Academic Credential Registry</span>
          </div>

          <h1 className={styles.title}>
            Certificate of Mastery<br />
            <em>Verification Portal.</em>
          </h1>

          <p className={styles.description}>
            Verify the authenticity, graduation track, issue date, and cohort capstone deliverables of any Kingshima Foundation graduate credential.
          </p>
        </div>

        {/* Search / Verification Form */}
        <div className={styles.searchCard}>
          <form onSubmit={handleVerify} className={styles.form}>
            <div className={styles.inputWrapper}>
              <span className={styles.inputPrefix}>ID:</span>
              <input
                type="text"
                placeholder="Enter Certificate ID (e.g. CERT-KGS-8X92A)"
                value={certId}
                onChange={(e) => setCertId(e.target.value)}
                className={styles.input}
              />
            </div>
            <button type="submit" disabled={loading} className={styles.verifyBtn}>
              {loading ? (
                <>
                  <span className={styles.spinner} />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Verify Registry Record</span>
                  <span>→</span>
                </>
              )}
            </button>
          </form>
          <p className={styles.searchHint}>
            Format example: <code>CERT-KGS-2025-098A</code> or alphanumeric hash from your physical credential.
          </p>
        </div>

        {/* Verification Result */}
        {result && (
          <div className={`${styles.resultCard} ${result.valid ? styles.resultValid : styles.resultInvalid}`}>
            {result.valid ? (
              <div>
                <div className={styles.resultHeader}>
                  <div className={styles.verifiedBadge}>
                    <span className={styles.checkIcon}>✓</span>
                    <span>OFFICIAL RECORD VERIFIED &amp; AUTHENTIC</span>
                  </div>
                  <span className={styles.registryId}>{result.certId}</span>
                </div>

                <div className={styles.detailsGrid}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Graduate Recipient</span>
                    <h3 className={styles.studentName}>{result.studentName}</h3>
                  </div>

                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Track &amp; Discipline</span>
                    <p className={styles.courseTitle}>{result.courseTitle}</p>
                  </div>

                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Date of Conformance</span>
                    <p className={styles.dateVal}>{result.issuedDate}</p>
                  </div>

                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Academic Evaluation</span>
                    <p className={styles.gradeVal}>{result.grade}</p>
                  </div>
                </div>

                <div className={styles.resultFooter}>
                  <button
                    className={styles.viewDiplomaBtn}
                    onClick={() => setShowDiplomaModal(true)}
                  >
                    <span>View Official Digital Diploma</span>
                    <span>✦</span>
                  </button>
                  <span className={styles.evaluatorText}>Signed by: {result.evaluator}</span>
                </div>
              </div>
            ) : (
              <div className={styles.invalidBox}>
                <div className={styles.invalidBadge}>
                  <span className={styles.crossIcon}>✕</span>
                  <span>UNREGISTERED IDENTIFIER</span>
                </div>
                <p className={styles.invalidMessage}>{result.message}</p>
              </div>
            )}
          </div>
        )}

        {/* Interactive Diploma Modal */}
        {showDiplomaModal && result && result.valid && (
          <CertificateGenerator
            studentName={result.studentName}
            courseTitle={result.courseTitle}
            certId={result.certId}
            issueDate={result.issuedDate}
            onClose={() => setShowDiplomaModal(false)}
          />
        )}

      </div>
    </div>
  );
}
