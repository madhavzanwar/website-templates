import { Metadata } from 'next';
import Template from '../../templates/physiotherapy/page';

export const metadata: Metadata = {
  title: 'Aarogya PhysioWell — Physiotherapy & Sports Rehabilitation in Wakad, Pune',
  description: 'Evidence-based manual therapy, spine care, joint preservation, and sports injury rehabilitation clinic in Wakad, Pune.',
};

export default function Page() {
  return <Template />;
}
