import React from 'react';
import Section from '@/components/Section';
import GlassCard from '@/components/GlassCard';
import styles from './Terms.module.css';

export const metadata = {
  title: 'Terms of Service | Kingshima Foundation',
  description: 'Read our terms of service and conditions for using our services and platform.',
};

const TermsPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <header className={styles.hero}>
        <h1 className={styles.title}>Terms of <span className={styles.highlight}>Service</span></h1>
        <p className={styles.subtitle}>Last Updated: May 2026</p>
      </header>

      <Section id="terms-content">
        <GlassCard className={styles.contentCard}>
          <div className={styles.content}>
            <section>
              <h2>1. Acceptance of Terms</h2>
              <p>By accessing or using the services provided by Kingshima Foundation ("Kingshima," "we," "us," or "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
            </section>

            <section>
              <h2>2. Services Provided</h2>
              <p>Kingshima provides technology mentorship, software engineering services, brand identity design, and community programs. We reserve the right to modify or discontinue any service at any time without notice.</p>
            </section>

            <section>
              <h2>3. User Obligations</h2>
              <p>You agree to use our services for lawful purposes only and in a manner that does not infringe the rights of, or restrict the use and enjoyment of, the services by any third party.</p>
            </section>

            <section>
              <h2>4. Intellectual Property</h2>
              <p>All content, including but not limited to code, designs, text, and graphics provided as part of our services, is the property of Kingshima Foundation or its licensors and is protected by copyright and other intellectual property laws.</p>
            </section>

            <section>
              <h2>5. Limitation of Liability</h2>
              <p>Kingshima Foundation shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services.</p>
            </section>

            <section>
              <h2>6. Governing Law</h2>
              <p>These terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria, without regard to its conflict of law principles.</p>
            </section>

            <section>
              <h2>7. Changes to Terms</h2>
              <p>We may update these Terms of Service from time to time. Your continued use of our services after any changes constitutes acceptance of the new terms.</p>
            </section>

            <section>
              <h2>8. Contact Us</h2>
              <p>If you have any questions about these Terms of Service, please contact us at <a href="mailto:kingshima001@gmail.com">kingshima001@gmail.com</a>.</p>
            </section>
          </div>
        </GlassCard>
      </Section>
    </div>
  );
};

export default TermsPage;
