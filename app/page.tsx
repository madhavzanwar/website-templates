import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Website Previews',
  robots: { index: false, follow: false },
};

export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#09090b',
        color: '#a1a1aa',
        fontFamily: 'system-ui, sans-serif',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <div>
        <p style={{ fontSize: '1rem', letterSpacing: '0.05em' }}>
          Preview pages are available on private links.
        </p>
        <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: '#52525b' }}>
          Contact us to request a demo for your business.
        </p>
      </div>
    </main>
  );
}
