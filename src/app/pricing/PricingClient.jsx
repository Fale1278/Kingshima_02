'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  Code, 
  GraduationCap, 
  HelpCircle,
  TrendingUp,
  Heart,
  Users2,
  Building,
  Sparkles
} from 'lucide-react';
import Section from '@/components/Section';
import GlassCard from '@/components/GlassCard';
import styles from './Pricing.module.css';

const EXCHANGE_RATE = 1600;

const PriceCard = ({ tier, price, duration, description, features, isPopular, delay, icon: Icon, currency, btnText, btnLink }) => {
  const formatPrice = (p) => {
    if (p === "Custom" || p === "0") return p === "0" ? "Free" : p;
    const numericPrice = parseInt(p.replace(/,/g, ''));
    if (currency === 'NGN') {
      return (numericPrice * EXCHANGE_RATE).toLocaleString();
    }
    return numericPrice.toLocaleString();
  };

  const isFree = price === "0";
  const isCustom = price === "Custom";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className={`${styles.priceCardWrapper} ${isPopular ? styles.popularWrapper : ''}`}
    >
      <GlassCard className={`${styles.priceCard} ${isPopular ? styles.popular : ''}`}>
        {isPopular && (
          <div className={styles.popularBadge}>
            <TrendingUp size={14} /> Most Recommended
          </div>
        )}
        
        <div className={styles.tierHeader}>
          <div className={styles.iconContainer}>
            {Icon && <Icon size={28} />}
          </div>
          <h3 className={styles.tierName}>{tier}</h3>
          <div className={styles.priceContainer}>
            {!isFree && !isCustom && (
              <span className={styles.currencySymbol}>{currency === 'USD' ? '$' : '₦'}</span>
            )}
            <span className={styles.amount}>{formatPrice(price)}</span>
            <span className={styles.duration}>{duration}</span>
          </div>
          {currency === 'NGN' && !isFree && !isCustom && (
            <span className={styles.originalPrice}>(${price} USD)</span>
          )}
          <p className={styles.tierDesc}>{description}</p>
        </div>

        <div className={styles.divider}></div>

        <ul className={styles.featureList}>
          {features.map((f, i) => (
            <li key={i}>
              <div className={styles.checkIcon}>
                <Check size={14} />
              </div>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <Link 
          href={btnLink || '/bootcamp'} 
          className={`${styles.planBtn} ${isPopular ? styles.popularBtn : ''}`}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {btnText || "Apply to Cohort"}
        </Link>
      </GlassCard>
    </motion.div>
  );
};

const PricingClient = () => {
  const [activeTab, setActiveTab] = useState('students');
  const [currency, setCurrency] = useState('USD');

  const studentPlans = [
    {
      tier: "Need-Based Scholarship",
      price: "0",
      duration: " / 100% Subsidized",
      icon: GraduationCap,
      description: "Full tuition coverage for passionate, deserving youth from underserved communities.",
      features: [
        "Full 16-Week Curriculum Access",
        "Hardware & Lab Access at Lagos/Abuja Hubs",
        "Dedicated Faculty Mentor Support",
        "Certificate of Mastery Verification",
        "Kingshima Alumni Guild Fellowship"
      ],
      isPopular: false,
      btnText: "Apply for Financial Aid",
      btnLink: "/contact",
    },
    {
      tier: "Cohort Fellowship",
      price: "150",
      duration: " / cohort",
      icon: Code,
      description: "Standard enrollment covering complete coursework, mentoring, and production reviews.",
      features: [
        "Full 16-Week Intensive Track",
        "Direct 1-on-1 Mentorship Sessions",
        "Live Production Code & Design Critiques",
        "Verifiable Certificate & Transcript",
        "Career Resilience & Job Placement Support"
      ],
      isPopular: true,
      btnText: "Enroll in Bootcamp",
      btnLink: "/bootcamp",
    },
    {
      tier: "Founder & Capstone Fellow",
      price: "350",
      duration: " / cohort",
      icon: Sparkles,
      description: "For aspiring startup founders and leaders requiring intensive executive coaching.",
      features: [
        "All Cohort Fellowship Privileges",
        "Executive 1-on-1 Venture Mentorship",
        "Cloud Hosting & API Credits Stipend",
        "Pitch Deck & Presentation Coaching",
        "Featured Showcase at Demo Day"
      ],
      isPopular: false,
      btnText: "Apply as Fellow",
      btnLink: "/bootcamp",
    },
  ];

  const sponsorPlans = [
    {
      tier: "Sponsor a Student",
      price: "200",
      duration: " per student",
      icon: Heart,
      description: "Directly underwrite the tuition, internet, and learning materials for one young builder.",
      features: [
        "100% Tuition Subsidy for 1 Deserving Youth",
        "Quarterly Student Progress Impact Reports",
        "Invitation to Capstone Demo Day Presentation",
        "Direct Letter of Gratitude from Your Fellow",
        "Non-Profit Contribution Receipt"
      ],
      isPopular: true,
      btnText: "Sponsor a Student",
      btnLink: "/contact",
    },
    {
      tier: "Cohort Pod Sponsor",
      price: "950",
      duration: " 5 students",
      icon: Users2,
      description: "Support an entire 5-student collaborative sprint pod through their 16-week journey.",
      features: [
        "Funds Complete Cohort Pod of 5 Youths",
        "Dedicated Pod Named in Your Honor / Org",
        "Virtual Meet & Greet with Student Pod",
        "Annual Foundation Impact & Placement Briefing",
        "Priority Access to Hire Kingshima Graduates"
      ],
      isPopular: false,
      btnText: "Sponsor a Pod",
      btnLink: "/contact",
    },
    {
      tier: "Community Hub Partner",
      price: "Custom",
      duration: " institutional",
      icon: Building,
      description: "Partner with Kingshima to fund hardware labs, learning hubs, and regional initiatives.",
      features: [
        "Establish or Equip a Community Tech Hub",
        "Co-Designed Curriculums & Dedicated Tracks",
        "Corporate Mentorship & Fellowship Pipeline",
        "Executive Board Impact Governance",
        "Comprehensive Regional Transformation Report"
      ],
      isPopular: false,
      btnText: "Partner With Us",
      btnLink: "/contact",
    },
  ];

  const currentPlans = activeTab === 'students' ? studentPlans : sponsorPlans;

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.hero}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className={styles.badge}
        >
          <GraduationCap size={16} /> Tuition, Scholarships & Sponsorship
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.title}
        >
          Accessible Education. <span className={styles.highlight}>Kingdom Impact.</span>
        </motion.h1>
        <p className={styles.subtitle}>
          We ensure financial limitations never prevent passionate youth from acquiring world-class technical skills and Godly values. Explore our student tracks and partner sponsorship options.
        </p>

        <div className={styles.controls}>
          <div className={styles.tabSwitcher}>
            <button 
              onClick={() => setActiveTab('students')}
              className={activeTab === 'students' ? styles.activeTab : ''}
            >
              Student Tuition & Aid
            </button>
            <button 
              onClick={() => setActiveTab('sponsors')}
              className={activeTab === 'sponsors' ? styles.activeTab : ''}
            >
              Sponsor a Student / Partner
            </button>
          </div>

          <div className={styles.currencyToggle}>
            <span className={currency === 'USD' ? styles.activeCurrency : ''}>USD ($)</span>
            <button 
              className={styles.toggleBtn} 
              onClick={() => setCurrency(currency === 'USD' ? 'NGN' : 'USD')}
              aria-label="Toggle currency between USD and NGN"
            >
              <div className={`${styles.toggleCircle} ${currency === 'NGN' ? styles.toggleRight : ''}`}></div>
            </button>
            <span className={currency === 'NGN' ? styles.activeCurrency : ''}>NGN (₦)</span>
          </div>
        </div>
      </header>

      <Section id="pricing-grid">
        <div className={styles.grid}>
          <AnimatePresence mode="wait">
            {currentPlans.map((p, i) => (
              <PriceCard 
                key={`${activeTab}-${i}`} 
                {...p} 
                delay={i * 0.1} 
                currency={currency} 
              />
            ))}
          </AnimatePresence>
        </div>
      </Section>

      <Section id="faqs" className={styles.faqSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <p className={styles.sectionDesc}>Everything you need to know about tuition, financial aid, and student sponsorship.</p>
        </div>
        <div className={styles.faqGrid}>
          <div className={styles.faqItem}>
            <h4><HelpCircle size={18} /> How do need-based scholarships work?</h4>
            <p>We believe lack of funds should never be a barrier to high-integrity education. Applicants from low-income households can apply for full tuition waivers by submitting an application and brief statement of purpose through our admissions team.</p>
          </div>
          <div className={styles.faqItem}>
            <h4><HelpCircle size={18} /> Can students pay tuition in installments?</h4>
            <p>Yes. For students in the Cohort Fellowship, we offer a two-part flexible installment schedule across the 16-week period.</p>
          </div>
          <div className={styles.faqItem}>
            <h4><HelpCircle size={18} /> How are sponsored funds allocated?</h4>
            <p>Every dollar or naira donated directly supports student tuition, data stipends, laptop workstation access at our hubs, and mentor honorariums. Sponsors receive transparent quarterly reports.</p>
          </div>
          <div className={styles.faqItem}>
            <h4><HelpCircle size={18} /> What happens after graduation?</h4>
            <p>Graduates receive lifetime membership in the Kingshima Alumni Guild, verifiable diploma credentials, and direct introductions to hiring partners across tech and creative sectors.</p>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default PricingClient;
