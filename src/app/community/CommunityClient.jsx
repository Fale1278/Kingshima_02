'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users2, 
  Heart, 
  Globe2, 
  ShieldCheck, 
  Compass, 
  Zap,
  X, 
  Send, 
  Loader2, 
  CheckCircle2
} from 'lucide-react';
import Section from '@/components/Section';
import GlassCard from '@/components/GlassCard';
import styles from './Community.module.css';

const ImpactCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
  >
    <GlassCard className={styles.valueCard}>
      <div className={styles.valueIcon}><Icon size={24} /></div>
      <h3 className={styles.valueTitle}>{title}</h3>
      <p className={styles.valueText}>{description}</p>
    </GlassCard>
  </motion.div>
);

export default function CommunityClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', linkedin: '', message: '' });
  const [status, setStatus] = useState({ type: '', text: '', url: '' });

  const handleApply = async (e) => {
    e.preventDefault();
    setStatus({ type: 'submitting', text: 'Sending your application...', url: '' });
    
    try {
      const res = await fetch('/api/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (res.ok) {
        setStatus({ type: 'success', text: data.message, url: data.previewUrl });
      } else {
        setStatus({ type: 'error', text: data.message || 'Application failed', url: '' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', text: 'Network error. Please try again.', url: '' });
    }
  };

  const impacts = [
    {
      icon: Users2,
      title: "Youth Empowerment",
      description: "Directly mentoring over 500+ young innovators across tech and creative sectors.",
    },
    {
      icon: Heart,
      title: "Kingdom Values",
      description: "Infusing technology with spiritual purpose to build ethical, high-impact solutions.",
    },
    {
      icon: Globe2,
      title: "Global Network",
      description: "Connecting local talent with international opportunities and industry experts.",
    },
  ];

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.hero}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className={styles.heroBadge}
        >
          <Users2 size={16} /> Our Community
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className={styles.heroContent}
        >
          <h1 className={styles.title}>Our <span className={styles.highlight}>Community</span></h1>
          <p className={styles.subtitle}>
            The Kingshima Foundation is a family of innovators, artists, and leaders united by a single vision: to build a better future together.
          </p>
        </motion.div>
      </header>

      <Section id="impact-stories">
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Impact and Purpose</h2>
          <p className={styles.sectionSubtitle}>Stories of transformation from our community of believers and builders.</p>
        </div>
        <div className={styles.valuesGrid}>
          {impacts.map((imp, i) => (
            <ImpactCard key={i} {...imp} delay={i * 0.15} />
          ))}
        </div>
      </Section>

      <Section id="mentorship" className={styles.teamVibe}>
        <div className={`${styles.vibeCard} glass`}>
          <h2 className={styles.vibeTitle}>Join the Mentorship Program</h2>
          <p className={styles.vibeText}>
            Our mentorship network is at the heart of everything we do. Whether you are looking to learn or give back, there is a place for you in the Kingshima family.
          </p>
          <div className={styles.vibeIcons}>
            <Compass size={40} />
            <ShieldCheck size={40} />
            <Zap size={40} />
          </div>
          <button className={styles.learnMore} onClick={() => setIsModalOpen(true)}>
            Apply as Mentor
          </button>
        </div>
      </Section>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={styles.modalPanel}
          >
            <div className={styles.modalHeader}>
              <h3>Apply as Mentor</h3>
              <button className={styles.modalCloseBtn} onClick={() => { setIsModalOpen(false); setStatus({ type: '', text: '', url: '' }); }}><X size={20} /></button>
            </div>
            
            <div className={styles.modalBody}>
              {status.type === 'success' ? (
                <div className={styles.successState}>
                  <CheckCircle2 size={48} className={styles.successIcon} />
                  <h4>Application Received!</h4>
                  <p>{status.text}</p>
                  {status.url && (
                     <a href={status.url} target="_blank" rel="noreferrer" className={styles.etherealLink}>
                       View generated test email (Ethereal)
                     </a>
                  )}
                  <button className={styles.closeBtn} onClick={() => { setIsModalOpen(false); setStatus({ type: '', text: '', url: '' }); }}>Close</button>
                </div>
              ) : (
                <form onSubmit={handleApply} className={styles.mentorForm}>
                  <p className={styles.formHint}>We're looking for experienced leaders to guide the next generation. Fill out the details below.</p>
                  
                  <div className={styles.formGroup}>
                    <label>Full Name</label>
                    <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="John Doe" />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Email Address</label>
                    <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>LinkedIn Profile</label>
                    <input type="url" value={formData.linkedin} onChange={e => setFormData({...formData, linkedin: e.target.value})} placeholder="https://linkedin.com/in/johndoe" />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Why do you want to mentor?</label>
                    <textarea rows="4" required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="Share your motivation..."></textarea>
                  </div>
                  
                  {status.type === 'error' && <p className={styles.errorText}>{status.text}</p>}
                  
                  <button type="submit" disabled={status.type === 'submitting'} className={styles.submitBtn}>
                    {status.type === 'submitting' ? <><Loader2 size={18} className="spin" /> Sending...</> : <><Send size={18} /> Submit Application</>}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
