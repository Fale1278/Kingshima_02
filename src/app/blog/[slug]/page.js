import BlogDetailClient from './BlogDetailClient';
import { blogPosts } from '@/data/blogPosts';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  
  if (!post) {
    return {
      title: 'Article Not Found | Kingshima Blog',
      description: 'The requested article could not be found.',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} — Kingshima Blog`,
      description: post.excerpt,
      images: [{ url: post.image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} — Kingshima Blog`,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostDetailPage({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return <BlogDetailClient post={post} relatedPosts={relatedPosts} />;
}
