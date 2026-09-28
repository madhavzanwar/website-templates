import { Metadata } from 'next';
import { Nunito, Cormorant_Garamond } from 'next/font/google';
import '../globals.css';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-nunito',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aarogya PhysioWell — Physiotherapy & Sports Rehabilitation in Wakad, Pune',
  description: 'Evidence-based manual therapy, spine care, joint preservation, and sports injury rehabilitation clinic in Wakad, Pune.',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${nunito.variable} ${cormorant.variable} font-body bg-[#F5F0E8]`}>
      {children}
    </div>
  );
}
