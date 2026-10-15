'use client';

import React, { useState } from 'react';
import styles from './Contact.module.css';

const pathways = [
  {
    id: 'Student Admission',
    label: 'Student Admission',
    helper: 'Apply for upcoming cohorts in Full-Stack, AI, or Design. Scholarships & flexible tracks available.',
    icon: '✦',
  },
  {
    id: 'Faculty & Mentorship',
    label: 'Faculty / Mentor Fellowship',
    helper: 'Pour into the next generation. Join our international circle of engineering & design mentors.',
    icon: '◈',
  },
  {
    id: 'Philanthropic Partnership',
    label: 'Philanthropic Partnership',
    helper: 'Support tuition subsidies, hardware provision, and digital innovation hubs across communities.',
    icon: '◎',
  },
  {
    id: 'General Inquiry',
    label: 'General Inquiry',
    helper: 'Connect with our leadership team for speaking, collaborations, or foundation questions.',
    icon: '✧',
  },
];

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Student Admission',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const activePathway = pathways.find((p) => p.id === form.subject) || pathways[0];

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setErrorMsg('Please complete all required fields.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', subject: 'Student Admission', message: '' });
      } else {
        const d = await res.json();
        setErrorMsg(d.message || 'Something went wrong while submitting.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network connectivity issue. Please try again or email us directly.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>

        {/* Left Column: Direct Inquiries & Movement Concierge */}
        <div className={styles.infoCol}>
          <div className={styles.kicker}>
            <span className={styles.dot} />
            <span className={styles.kickerText}>Admissions & Partnerships</span>
          </div>

          <h2 className={styles.heading}>
            Join the<br />
            <em>mission.</em>
          </h2>

          <p className={styles.body}>
            Whether you are an aspiring builder seeking purposeful training, a senior engineer ready to mentor, or a Kingdom partner eager to accelerate this movement — our doors are wide open.
          </p>

          <div className={styles.contactDirectory}>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>✉</div>
              <div>
                <p className={styles.contactLabel}>Admissions & Partnerships Email</p>
                <a href="mailto:kingshima001@gmail.com" className={styles.contactValue}>
                  kingshima001@gmail.com
                </a>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>✆</div>
              <div>
                <p className={styles.contactLabel}>Direct Hotline / WhatsApp</p>
                <a href="tel:+2349039556992" className={styles.contactValue}>
                  +234 903 9556 992
                </a>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>⊕</div>
              <div>
                <p className={styles.contactLabel}>Regional Hubs & Campus</p>
                <p className={styles.contactValue}>Kingshima Foundation &bull; Lagos &bull; Abuja</p>
              </div>
            </div>
          </div>

          {/* Response Guarantee Badge */}
          <div className={styles.guaranteeBox}>
            <span className={styles.guaranteeDot} />
            <div>
              <strong>48-Hour Response Commitment</strong>
              <p>Every application and inquiry is personally reviewed by our leadership team.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Multi-Pathway Form */}
        <div className={styles.formCol}>
          {status === 'success' ? (
            <div className={styles.successCard}>
              <div className={styles.successIcon}>✓</div>
              <h3 className={styles.successTitle}>Inquiry Received</h3>
              <p className={styles.successText}>
                Thank you for taking this step. Our admissions & partnership team will review your details and reach back to you within 48 hours.
              </p>
              <div className={styles.successTimeline}>
                <div className={styles.timelineItem}>
                  <span className={styles.stepNum}>1</span>
                  <span>Review by Faculty Lead</span>
                </div>
                <div className={styles.timelineItem}>
                  <span className={styles.stepNum}>2</span>
                  <span>1-on-1 Consultation Call</span>
                </div>
                <div className={styles.timelineItem}>
                  <span className={styles.stepNum}>3</span>
                  <span>Onboarding & Syllabus Access</span>
                </div>
              </div>
              <button className={styles.resetBtn} onClick={() => setStatus('idle')}>
                Submit another inquiry →
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              
              {/* Pathway Selector */}
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Select your Engagement Pathway:</label>
                <div className={styles.pathwayGrid}>
                  {pathways.map((p) => {
                    const isSelected = form.subject === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        className={`${styles.pathwayBtn} ${isSelected ? styles.pathwayBtnActive : ''}`}
                        onClick={() => setForm((f) => ({ ...f, subject: p.id }))}
                      >
                        <span className={styles.pathwayIcon}>{p.icon}</span>
                        <span className={styles.pathwayName}>{p.label}</span>
                      </button>
                    );
                  })}
                </div>
                <p className={styles.pathwayHelper}>{activePathway.helper}</p>
              </div>

              {/* Name & Email Row */}
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label htmlFor="contact-name" className={styles.fieldLabel}>
                    Full Legal Name <span className={styles.req}>*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="e.g. Emmanuel Adeleke"
                    value={form.name}
                    onChange={set('name')}
                    className={styles.input}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="contact-email" className={styles.fieldLabel}>
                    Email Address <span className={styles.req}>*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="e.g. emmanuel@example.com"
                    value={form.email}
                    onChange={set('email')}
                    className={styles.input}
                  />
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div className={styles.field}>
                <label htmlFor="contact-phone" className={styles.fieldLabel}>
                  Phone / WhatsApp Number (Optional)
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  placeholder="+234..."
                  value={form.phone}
                  onChange={set('phone')}
                  className={styles.input}
                />
              </div>

              {/* Story / Message */}
              <div className={styles.field}>
                <div className={styles.labelRow}>
                  <label htmlFor="contact-message" className={styles.fieldLabel}>
                    Tell Us Your Background & Goals <span className={styles.req}>*</span>
                  </label>
                  <span className={styles.charCount}>{form.message.length} chars</span>
                </div>
                <textarea
                  id="contact-message"
                  required
                  placeholder="Share a brief overview of your current journey, what track or partnership you are pursuing, and your vision..."
                  value={form.message}
                  onChange={set('message')}
                  className={styles.textarea}
                  rows={4}
                />
              </div>

              {status === 'error' && (
                <div className={styles.errorBanner}>
                  <span>✕</span> {errorMsg}
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className={styles.submitBtn}
              >
                {status === 'sending' ? (
                  <>
                    <span className={styles.spinner} />
                    Submitting Inquiry...
                  </>
                ) : (
                  <>
                    <span>Submit Inquiry</span>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};

export default Contact;
