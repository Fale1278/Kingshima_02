'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Bookmark,
  MessageCircle
} from 'lucide-react';
import Image from 'next/image';
import styles from '../Blog.module.css';
import GlassCard from '@/components/GlassCard';
import Section from '@/components/Section';

const BlogDetailClient = ({ post, relatedPosts }) => {
  const router = useRouter();

  if (!post) {
    return (
      <div className={styles.pageWrapper} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <h1>Article Not Found</h1>
        <p>The article you are looking for is unavailable or has been moved.</p>
        <button onClick={() => router.push('/blog')} className={styles.readBtn} style={{ marginTop: '2rem' }}>
          <ArrowLeft size={18} /> Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.detailContainer}>
        <motion.button 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()} 
          className={styles.backBtn}
        >
          <ArrowLeft size={18} /> Back to Feed
        </motion.button>

        <header className={styles.detailHero}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.detailMeta}
          >
            <span className={styles.categoryTag}>{post.category}</span>
            <div className={styles.metaRow}>
              <span><Calendar size={14} /> {post.date}</span>
              <span><Clock size={14} /> {post.readTime}</span>
              <span><User size={14} /> {post.author}</span>
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={styles.detailTitle}
          >
            {post.title}
          </motion.h1>
        </header>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className={styles.mainImageWrapper}
          style={{ position: 'relative' }}
        >
          <Image 
            src={post.image} 
            alt={post.title} 
            fill
            priority
            sizes="(max-width: 900px) 100vw, 900px"
            className={styles.detailImage}
            style={{ objectFit: 'cover' }}
          />
        </motion.div>

        <div className={styles.articleGrid}>
          <aside className={styles.articleSidebar}>
            <div className={styles.sidebarSticky}>
              <div className={styles.authorBrief}>
                <div className={styles.authorAvatar}>
                  {post.author.charAt(0)}
                </div>
                <div>
                  <h4>{post.author}</h4>
                  <p>{post.role || 'Faculty Contributor'}</p>
                </div>
              </div>
              <div className={styles.shareActions}>
                <button title="Share"><Share2 size={20} /></button>
                <button title="Save"><Bookmark size={20} /></button>
                <button title="Comment"><MessageCircle size={20} /></button>
              </div>
            </div>
          </aside>

          <motion.article 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={styles.articleBody}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {relatedPosts && relatedPosts.length > 0 && (
          <Section id="more-insights" className={styles.relatedSection}>
            <h3 className={styles.sectionHeading}>Continue Exploring</h3>
            <div className={styles.grid}>
              {relatedPosts.map((related, i) => (
                <div key={i} className={styles.relatedCard} onClick={() => router.push(`/blog/${related.slug}`)}>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10', borderRadius: '8px', overflow: 'hidden', marginBottom: '1rem', border: '1px solid var(--border)' }}>
                    <Image 
                      src={related.image} 
                      alt={related.title} 
                      fill
                      sizes="(max-width: 768px) 100vw, 450px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <h4>{related.title}</h4>
                </div>
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
};

export default BlogDetailClient;
