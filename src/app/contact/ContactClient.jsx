'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  MapPin,
  Phone,
  Globe,
  Send,
  Share2,
  MessageCircle,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import styles from './Contact.module.css';

const ContactItem = ({ icon: Icon, title, content, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className={styles.contactItem}
  >
    <div className={styles.itemIcon}><Icon size={22} /></div>
    <div className={styles.itemText}>
      <h4>{title}</h4>
      <p>{content}</p>
    </div>
  </motion.div>
);

const ContactClient = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Partnership', message: '' });
  const [status, setStatus] = useState({ type: '', text: '' });
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.warn("Geolocation access denied or failed:", error.message);
        }
      );
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'submitting', text: 'Initializing secure transmission...' });

    // Attach location string if available
    const payload = {
      ...formData,
      userLocation: coords ? `Lat: ${coords.lat.toFixed(4)}, Lng: ${coords.lng.toFixed(4)}` : 'Permission denied / Unavailable'
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (res.ok) {
        setStatus({ type: 'success', text: data.message });
        setFormData({ name: '', email: '', subject: 'Partnership', message: '' });
      } else {
        setStatus({ type: 'error', text: data.message || 'Signal lost. Please try again.' });
      }
    } catch (err) {
      setStatus({ type: 'error', text: 'Network malfunction. Ensure you have a connection.' });
    }
  };

  const contactDetails = [
    { icon: Mail, title: "Secure Line", content: "hello@kingshimafoundation.org" },
    { icon: Phone, title: "Comm-Link", content: "+234 903 9556 992" },
    { icon: MapPin, title: "Global HQ", content: "Langtang North, Plateau, Nigeria (Hybrid Ops)" },
    { icon: Globe, title: "Operating Zone", content: "GMT+1 / Worldwide" },
  ];

  const socialLinks = [
    { icon: Globe, url: "https://linkedin.com" },
    { icon: MessageCircle, url: "#" },
    { icon: Share2, url: "#" },
  ];

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.hero}>
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className={styles.title}
        >
          Signal <span className={styles.highlight}>Nexus</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={styles.subtitle}
        >
          Have a vision requiring elite engineering or want to partner with our foundation? Our core team is ready to respond.
        </motion.p>
      </header>

      <div className={styles.mainGrid}>
        <div className={styles.infoSection}>
          <div className={styles.mapContainer}>
            <iframe
              src={coords
                ? `https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=15&output=embed`
                : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126839.8142345037!2d3.2798791334645226!3d6.5243793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1714151703273!5m2!1sen!2sus"
              }
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(80%) invert(90%) contrast(1.2)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>

          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Direct Access</h2>
            <p className={styles.sectionDesc}>Bridge the distance. We monitor all frequencies 24/7.</p>
          </div>

          <div className={styles.detailsGrid}>
            {contactDetails.map((detail, i) => (
              <ContactItem key={i} {...detail} delay={i * 0.1} />
            ))}
          </div>

          <div className={styles.socials}>
            {socialLinks.map((link, i) => (
              <motion.a
                key={i}
                href={link.url}
                className={styles.socialIcon}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                whileTap={{ scale: 0.95 }}
              >
                <link.icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>

        <div className={styles.formSection}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className={styles.contactCard}>
              {status.type === 'success' ? (
                <div className={styles.successState}>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                    <CheckCircle2 color="var(--accent-primary)" size={60} style={{ margin: '0 auto 1.5rem', filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))' }} />
                  </motion.div>
                  <h3>Transmission Successful</h3>
                  <p>{status.text}</p>
                  <button onClick={() => setStatus({ type: '', text: '' })} className={styles.resetBtn}>
                    Send Another Signal
                  </button>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                  <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '800' }}>Send a Message</h3>
                  <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                      <label>Operator Name</label>
                      <input required type="text" placeholder="John Doe" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Signal Node (Email)</label>
                      <input required type="email" placeholder="john@example.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Transmission Type</label>
                    <div className={styles.selectWrapper}>
                      <select required value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })}>
                        <option value="Partnership">Partnership Inquiry</option>
                        <option value="Project Proposal">Project Proposal</option>
                        <option value="Mentorship">Mentorship Query</option>
                        <option value="Support">General Support</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Encrypted Payload (Message)</label>
                    <textarea required rows="5" placeholder="Detail your project or questions here..." value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}></textarea>
                  </div>

                  {status.type === 'error' && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.errorText}>
                      {status.text}
                    </motion.p>
                  )}

                  <button type="submit" disabled={status.type === 'submitting'} className={styles.submitBtn} style={{ opacity: status.type === 'submitting' ? 0.7 : 1 }}>
                    {status.type === 'submitting' ? <><Loader2 size={18} className="spin" /> Establishing Connection...</> : <><Send size={18} /> Transmit Query</>}
                  </button>
                </form>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactClient;
