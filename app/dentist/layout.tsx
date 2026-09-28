import { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "../globals.css";

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Smile Studio Dental Clinic | Aundh, Pune",
  description: "Advanced Dental Care in Aundh, Pune. Book an appointment today.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${dmSans.variable} ${playfair.variable} font-sans`}>
      {children}
    </div>
  );
}
