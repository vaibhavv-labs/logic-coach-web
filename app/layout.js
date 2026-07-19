import "./globals.css";
import "./modals.css";

export const metadata = {
  metadataBase: new URL('https://logic-coach-web.netlify.app'),
  title: "Logic Coach — Learn to Think Like a Programmer",
  description:
    "Build coding logic step-by-step through interactive Socratic dialogue with your AI programming tutor. Master core computing fundamentals through curated logic challenges.",
  keywords: "logic, programming, tutor, AI, Socratic, coding, learn to code",
  openGraph: {
    title: "Logic Coach — Learn to Think Like a Programmer",
    description: "Build coding logic step-by-step through interactive Socratic dialogue with your AI programming tutor.",
    url: "https://logic-coach-web.netlify.app",
    siteName: "Logic Coach",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Logic Coach - AI Programming Tutor",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Logic Coach — Learn to Think Like a Programmer",
    description: "Build coding logic step-by-step through interactive Socratic dialogue with your AI programming tutor.",
    images: ["/og-image.jpg"],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

import { Toaster } from 'react-hot-toast';
import FirebaseAnalytics from './components/FirebaseAnalytics';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FirebaseAnalytics />
        {children}
        <Toaster 
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#1a1a1a',
              color: '#fff',
              border: '1px solid #333',
              borderRadius: '8px',
              padding: '12px 16px',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            }
          }}
        />
      </body>
    </html>
  );
}
