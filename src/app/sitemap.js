import { blogPosts } from '@/data/blogPosts';

export default async function sitemap() {
  const baseUrl = 'https://kingshimafoundation.org';

  // Base routes
  const routes = [
    '',
    '/about',
    '/team',
    '/programs',
    '/bootcamp',
    '/community',
    '/blog',
    '/contact',
    '/explore',
    '/pricing',
    '/careers',
    '/privacy',
    '/terms',
    '/services',
    '/projects',
    '/curriculum',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic blog routes
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...routes, ...blogRoutes];
}
