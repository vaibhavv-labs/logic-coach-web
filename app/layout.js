import "./globals.css";
import "./modals.css";

export const metadata = {
  title: "Logic Coach — Learn to Think Like a Programmer",
  description:
    "Build coding logic step-by-step through interactive Socratic dialogue with your AI programming tutor. Master core computing fundamentals through curated logic challenges.",
  keywords: "logic, programming, tutor, AI, Socratic, coding, learn to code",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
