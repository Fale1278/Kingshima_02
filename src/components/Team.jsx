'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import TiltCard from './TiltCard';
import { teamMembers } from '@/data/teamMembers';
import styles from './Team.module.css';

const Team = () => {
  const [activeMember, setActiveMember] = useState(null);

  return (
    <section id="team" className={styles.section}>
      <div className={styles.container}>
        
        {/* Editorial Section Header */}
        <div className={styles.header}>
          <div className={styles.kicker}>
            <span className={styles.dot} />
            <span className={styles.kickerText}>Faculty & Leadership Council</span>
          </div>
          <h2 className={styles.title}>
            Leadership & <em>Mentorship.</em>
          </h2>
          <p className={styles.subtitle}>
            Guided by industry veterans and visionary Kingdom leaders deeply committed to your
            technological mastery, intellectual sharpness, and spiritual grounding.
          </p>
        </div>

        {/* Executive Faculty Grid */}
        <div className={styles.grid}>
          {teamMembers.map((member, index) => (
            <TiltCard key={member.id || index} maxTilt={6} scale={1.015} className={styles.cardTilt}>
              <article className={styles.memberCard}>
                {/* Member Top Bar */}
                <div className={styles.cardHeader}>
                  <span className={styles.memberIndex}>0{index + 1}</span>
                  <span className={styles.statusIndicator}>
                    <span className={styles.pulseDot} /> Faculty Mentor
                  </span>
                </div>

                {/* Portrait & Halo */}
                <div className={styles.imageBox}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className={styles.image}
                    />
                    <div className={styles.imageOverlay} />
                  </div>
                  <div className={styles.cornerMarkTL} />
                  <div className={styles.cornerMarkBR} />
                </div>

                {/* Info & Credentials */}
                <div className={styles.cardBody}>
                  <h3 className={styles.name}>{member.name}</h3>
                  <p className={styles.role}>{member.role}</p>
                  <p className={styles.bio}>{member.bio}</p>

                  {/* Expertise Tags */}
                  {member.expertise && (
                    <div className={styles.expertiseList}>
                      {member.expertise.map((exp, i) => (
                        <span key={i} className={styles.expertiseBadge}>
                          {exp}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Social Channels & Statement Button */}
                  <div className={styles.cardFooter}>
                    <div className={styles.socials}>
                      {member.socials?.linkedin && (
                        <a href={member.socials.linkedin} target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label={`${member.name} LinkedIn`}>
                          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                        </a>
                      )}
                      {member.socials?.twitter && (
                        <a href={member.socials.twitter} target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label={`${member.name} Twitter`}>
                          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </a>
                      )}
                      {member.socials?.github && (
                        <a href={member.socials.github} target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label={`${member.name} GitHub`}>
                          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                        </a>
                      )}
                      {member.socials?.behance && (
                        <a href={member.socials.behance} target="_blank" rel="noreferrer" className={styles.socialIcon} aria-label={`${member.name} Behance`}>
                          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M4 8h5a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H4V8zm0 4h6a2.5 2.5 0 0 1 2.5 2.5v0A2.5 2.5 0 0 1 10 17H4v-5zm11-1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-1-3h4"/></svg>
                        </a>
                      )}
                    </div>

                    <button
                      type="button"
                      className={styles.statementBtn}
                      onClick={() => setActiveMember(member)}
                    >
                      <span>Read Statement</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </article>
            </TiltCard>
          ))}
        </div>

        {/* Leadership Statement Modal */}
        {activeMember && (
          <div className={styles.modalBackdrop} onClick={() => setActiveMember(null)}>
            <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <div>
                  <span className={styles.modalSub}>FACULTY STATEMENT</span>
                  <h3 className={styles.modalName}>{activeMember.name}</h3>
                  <p className={styles.modalRole}>{activeMember.role}</p>
                </div>
                <button
                  className={styles.modalClose}
                  onClick={() => setActiveMember(null)}
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              <div className={styles.modalBody}>
                <blockquote className={styles.modalQuote}>
                  &ldquo;{activeMember.bio}&rdquo;
                </blockquote>
                <div className={styles.modalFocusArea}>
                  <h4>Areas of Strategic Oversight:</h4>
                  <ul>
                    {activeMember.expertise?.map((exp, i) => (
                      <li key={i}>✦ {exp}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Team;
