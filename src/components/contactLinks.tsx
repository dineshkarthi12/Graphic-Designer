import { Download, FileText, Mail, MapPin, Phone } from 'lucide-react';
import type { ReactNode } from 'react';
import { contact, person } from '../data/content';
import { GithubIcon, LinkedinIcon, WhatsappIcon } from './Icon';

export type ContactLink = {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: ReactNode;
  external?: boolean;
  download?: string;
};

/** Every way to reach Dinesh. Used by the contact cards, the footer and the mobile "Let's talk" menu. */
export const contactLinks: ContactLink[] = [
  { id: 'email', label: 'Email', value: contact.email, href: `mailto:${contact.email}`, icon: <Mail aria-hidden="true" /> },
  { id: 'phone', label: 'Phone', value: contact.phoneDisplay, href: contact.phoneHref, icon: <Phone aria-hidden="true" /> },
  { id: 'whatsapp', label: 'WhatsApp', value: 'Message me', href: contact.whatsapp, icon: <WhatsappIcon />, external: true },
  { id: 'linkedin', label: 'LinkedIn', value: 'dinesh-karthi', href: contact.linkedin, icon: <LinkedinIcon />, external: true },
  { id: 'github', label: 'GitHub', value: 'dineshkarthi12', href: contact.github, icon: <GithubIcon />, external: true },
  { id: 'resume', label: 'Resume', value: 'View online', href: contact.resumeView, icon: <FileText aria-hidden="true" />, external: true },
  {
    id: 'resume-pdf',
    label: 'Resume',
    value: 'Download PDF',
    href: contact.resumePdf,
    icon: <Download aria-hidden="true" />,
    download: 'Dinesh_Kumar_AI_ML_Engineer_Resume.pdf',
  },
  { id: 'location', label: 'Location', value: person.location, href: contact.mapsUrl, icon: <MapPin aria-hidden="true" />, external: true },
];

export const linkProps = (l: ContactLink) =>
  l.external ? { target: '_blank', rel: 'noopener' } : l.download ? { download: l.download } : {};
