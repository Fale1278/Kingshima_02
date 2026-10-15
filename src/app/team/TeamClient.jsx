'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Globe, 
  ShieldCheck,
  Zap,
  Link as LinkIcon
} from 'lucide-react';
import { Github, Twitter, Linkedin, Instagram, Behance } from '@/components/BrandIcons';
import Image from 'next/image';
import Section from '@/components/Section';
import GlassCard from '@/components/GlassCard';
import { teamMembers } from '@/data/teamMembers';
import styles from './Team.module.css';

const SocialIcon = ({ type, url }) => {
  const icons = {
    linkedin: <Linkedin size={18} />,
    twitter: <Twitter size={18} />,
    github: <Github size={18} />,
    instagram: <Instagram size={18} />,
    behance: <Behance size={18} />
  };
  return (
    <a href={url} target="_blank" rel="noreferrer" className={styles.socialLink}>
      {icons[type] || <LinkIcon size={18} />}
    </a>
  );
};

const TeamMember = ({ member, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.6 }}
  >
    <GlassCard className={styles.memberCard}>
      <div className={styles.memberGrid}>
        <div className={styles.imageSection}>
          <div className={styles.imageContainer}>
            <Image 
              src={member.image} 
              alt={member.name} 
              width={160} 
              height={160} 
              className={styles.memberImage} 
            />
            <div className={styles.socialOverlay}>
              {Object.entries(member.socials).map(([type, url]) => (
                <SocialIcon key={type} type={type} url={url} />
              ))}
            </div>
          </div>
        </div>
        
        <div className={styles.infoSection}>
          <div className={styles.nameRow}>
            <h3 className={styles.memberName}>{member.name}</h3>
            <span className={styles.memberRoleTag}>{member.role}</span>
          </div>
          <p className={styles.memberBio}>{member.bio}</p>
          
          <div className={styles.expertiseTags}>
            {member.expertise.map((exp, i) => (
              <span key={i} className={styles.expertiseTag}>
                <Zap size={10} /> {exp}
              </span>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  </motion.div>
);

const TeamClient = () => {
  const router = useRouter();
  return (
    <div className={styles.pageWrapper}>
      <header className={styles.hero}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={styles.heroBadge}
        >
          <ShieldCheck size={16} /> Our Core Team
        </motion.div>
        <h1 className={styles.title}>The Minds Behind <span className={styles.highlight}>Kingshima</span></h1>
        <p className={styles.subtitle}>
          A diverse collective of engineers, designers, and visionaries united by purpose and technical excellence.
        </p>
      </header>

      <Section id="team-list">
        <div className={styles.membersList}>
          {teamMembers.map((member, i) => (
            <TeamMember key={member.id} member={member} index={i} />
          ))}
        </div>
      </Section>

      <Section id="join-us" className={styles.ctaSection}>
        <div className={`${styles.ctaCard} glass`}>
          <Globe size={48} className={styles.ctaIcon} />
          <h2>Want to join the mission?</h2>
          <p>We are always looking for passionate individuals who believe in the intersection of technology and faith.</p>
          <button className={styles.ctaBtn} onClick={() => router.push('/contact')}>Contact Us</button>
        </div>
      </Section>
    </div>
  );
};

export default TeamClient;
