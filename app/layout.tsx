import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Premium Demo Website Templates Portfolio',
  description: 'Research-driven, high-taste website templates for local businesses (Gyms, Salons, Cafes).',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
