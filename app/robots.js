export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://logic-coach-web.netlify.app/sitemap.xml',
  };
}
