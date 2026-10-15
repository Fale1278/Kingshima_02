'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './About.module.css'; // Reusing styles from About

const PrivacyPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <header className={styles.hero}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.heroContent}
        >
          <h1 className={styles.title}>Privacy <span className={styles.highlight}>Policy</span></h1>
          <p className={styles.subtitle}>
            Your privacy is critically important to us at the Kingshima Foundation. Here is how we protect your information.
          </p>
        </motion.div>
      </header>

      <section style={{ padding: '4rem 5%', maxWidth: '800px', margin: '0 auto', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: '700' }}>1. Data Collection</h2>
        <p style={{ marginBottom: '2rem' }}>
          We collect information that you explicitly provide to us when applying for a mentorship program or subscribing to our newsletter. This includes your name, email address, and professional interests.
        </p>

        <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: '700' }}>2. How We Use Your Data</h2>
        <p style={{ marginBottom: '2rem' }}>
          We use your information exclusively to provide you with the best learning experience, to pair you with appropriate mentors, and to communicate updates regarding your program. We do not sell your data to third parties.
        </p>

        <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: '700' }}>3. Security</h2>
        <p style={{ marginBottom: '2rem' }}>
          We take security seriously and utilize industry-standard practices, including SSL encryption and secure database hashing (bcrypt), to protect your personal information against unauthorized access.
        </p>

        <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: '700' }}>4. Changes to This Policy</h2>
        <p style={{ marginBottom: '2rem' }}>
          We may update this Privacy Policy periodically to reflect changes to our practices or for other operational, legal, or regulatory reasons. 
        </p>
        
        <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', textAlign: 'center' }}>
          <p>If you have any questions, you can reach out via our <Link href="/contact" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>Contact Form</Link>.</p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;
