import { useState } from 'react';
import { Copy, Send } from 'lucide-react';
import { contact } from '../data/content';
import { showToast } from '../lib/toast';
import { contactLinks, linkProps } from './contactLinks';
import { Reveal } from './Reveal';

export async function copyEmail() {
  try {
    await navigator.clipboard.writeText(contact.email);
    showToast('Email copied to clipboard');
  } catch {
    const ta = document.createElement('textarea');
    ta.value = contact.email;
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    showToast(ok ? 'Email copied to clipboard' : contact.email);
  }
}

export function ContactCards() {
  return (
    <ul className="contact-cards">
      {contactLinks.map((l, i) => (
        <Reveal as="li" key={l.id} delay={i * 0.04} className={l.id === 'email' ? 'contact-card-wrap wide' : 'contact-card-wrap'} style={l.id === 'email' ? { gridColumn: '1 / -1' } : undefined}>
          <div className="contact-card glass" style={{ position: 'relative' }}>
            <span className="contact-icon">{l.icon}</span>
            <span className="contact-card-text">
              <span className="contact-card-label" style={{ display: 'block' }}>
                {l.label}
              </span>
              <a className="contact-card-value stretched" href={l.href} {...linkProps(l)} style={{ display: 'block' }}>
                {l.value}
                {l.external && <span className="sr-only"> (opens in a new tab)</span>}
              </a>
            </span>
            {l.id === 'email' && (
              <button type="button" className="copy-btn" onClick={copyEmail} aria-label="Copy email address">
                <Copy aria-hidden="true" /> Copy
              </button>
            )}
          </div>
        </Reveal>
      ))}
    </ul>
  );
}

/** The mailto: link the contact form opens, with subject and body filled in. */
export function mailtoHref(name: string, subject: string, message: string) {
  const subj = subject.trim() || `Hello from ${name.trim() || 'your portfolio'}`;
  const body = `${message.trim()}\n\n${name.trim() ? `— ${name.trim()}` : ''}`.trim();
  return `mailto:${contact.email}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
}

/** No backend: opens the visitor's email app with everything filled in. */
export function ContactForm() {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = mailtoHref(name, subject, message);
  };

  return (
    <form className="contact-form glass" onSubmit={submit}>
      <h3>Send a message</h3>
      <p>Opens your email app with everything filled in.</p>
      <div className="field">
        <label htmlFor="cf-name">Your name</label>
        <input id="cf-name" name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="cf-subject">Subject</label>
        <input
          id="cf-subject"
          name="subject"
          placeholder="AI/ML engineer role at …"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="cf-message">Message</label>
        <textarea id="cf-message" name="message" required value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary">
        <Send aria-hidden="true" /> Open in email
      </button>
    </form>
  );
}
