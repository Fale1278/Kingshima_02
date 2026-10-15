'use client';

import React from 'react';
import styles from './CertificateGenerator.module.css';

export default function CertificateGenerator({ studentName, courseTitle, certId, issueDate, onClose }) {
  const formattedDate = issueDate 
    ? new Date(issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const displayId = certId || `CERT-KGS-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

  const handleDownload = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.certWrapper} onClick={(e) => e.stopPropagation()}>
        
        {/* Controls Bar (hidden during print) */}
        <div className={styles.controlsBar}>
          <div className={styles.controlsLeft}>
            <span className={styles.telemetryTag}>OFFICIAL CREDENTIAL REGISTRY</span>
            <span className={styles.certIdDisplay}>{displayId}</span>
          </div>
          <div className={styles.controlsRight}>
            <button className={styles.printBtn} onClick={handleDownload}>
              <span>Print / Export PDF</span>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z" />
              </svg>
            </button>
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
              ✕
            </button>
          </div>
        </div>

        {/* Physical Luxury Certificate Card */}
        <div className={styles.certCard}>
          {/* Security Guilloche Pattern Border */}
          <div className={styles.guillocheBorder} />
          <div className={styles.innerBorder} />
          
          {/* Subtle Watermark */}
          <div className={styles.watermark} aria-hidden>
            ✦ KINGSHIMA
          </div>

          {/* Certificate Header */}
          <header className={styles.certHeader}>
            <div className={styles.crestBox}>
              <span className={styles.crestIcon}>✦</span>
            </div>
            <h1 className={styles.foundationName}>Kingshima Foundation</h1>
            <p className={styles.foundationMotto}>Faith-Driven Technology &bull; Kingdom Innovation</p>
          </header>

          <div className={styles.dividerLine} />

          {/* Title */}
          <div className={styles.titleSection}>
            <span className={styles.certCategory}>OFFICIAL DIPLOMA OF EXCELLENCE</span>
            <h2 className={styles.certTitle}>Certificate of Technical Mastery</h2>
          </div>

          <p className={styles.certPreamble}>This is to certify and attest that</p>
          
          {/* Student Name */}
          <div className={styles.studentBlock}>
            <h3 className={styles.studentName}>{studentName || 'Student Learner'}</h3>
            <div className={styles.studentUnderline} />
          </div>

          <p className={styles.certBodyText}>
            has demonstrated exceptional technical acumen, spiritual purpose, and collaborative leadership, successfully completing all rigorous sprints, architectural peer reviews, and the final cohort capstone for
          </p>

          {/* Course Badge */}
          <div className={styles.courseBadge}>
            <span className={styles.courseTitleText}>{courseTitle || 'Full-Stack Software Architecture'}</span>
          </div>

          {/* Signatures & Seal Footer */}
          <footer className={styles.certFooter}>
            {/* Signature 1 */}
            <div className={styles.signatureBlock}>
              <div className={styles.signatureLine}>
                <span className={styles.scriptSignature}>Fale King Nanmua</span>
              </div>
              <span className={styles.signatureName}>Fale King Nanmua</span>
              <span className={styles.signatureRole}>Founder &amp; Executive Director</span>
            </div>

            {/* Official Gold Embossed Seal */}
            <div className={styles.goldSeal}>
              <div className={styles.sealInner}>
                <span className={styles.sealStar}>★</span>
                <span className={styles.sealText}>AUTHENTIC &bull; VERIFIED</span>
                <span className={styles.sealYear}>2025</span>
              </div>
            </div>

            {/* Metadata Registry */}
            <div className={styles.metaBlock}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Issued Date:</span>
                <span className={styles.metaValue}>{formattedDate}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Registry Hash:</span>
                <span className={styles.metaValue}>{displayId}</span>
              </div>
            </div>
          </footer>

        </div>
      </div>
    </div>
  );
}
