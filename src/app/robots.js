export default function robots() {
  const baseUrl = 'https://kingshimafoundation.org';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/bootcamp/dashboard/',
        '/bootcamp/admin/',
        '/api/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
