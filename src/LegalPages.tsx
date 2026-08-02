import * as React from 'react';
import { useEffect } from 'react';
import { ArrowLeft, Mail, MapPin, Phone } from 'lucide-react';
import { SITE_SETTINGS } from './content/siteSettings';

// Shared SPA navigate helper (mirrors App.tsx / VeneerCategoryPage.tsx)
const navigate = (path: string) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

const EFFECTIVE_DATE = 'August 1, 2026';

function useLegalSeo(title: string, canonical: string) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    const canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const prevCanonical = canonicalEl?.href;
    if (canonicalEl) canonicalEl.href = canonical;
    window.scrollTo(0, 0);
    return () => {
      document.title = prevTitle;
      if (canonicalEl && prevCanonical) canonicalEl.href = prevCanonical;
    };
  }, [title, canonical]);
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-12">
      <h2 className="text-2xl font-serif text-white mb-4">{title}</h2>
      <div className="text-wood-light font-light leading-relaxed space-y-4">{children}</div>
    </section>
  );
}

function LegalLayout({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-wood-dark text-wood-cream font-sans">
      <div className="container mx-auto px-6 py-16 max-w-3xl">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-wood-medium hover:text-gold transition-colors text-sm uppercase tracking-widest font-medium group mb-10"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
          Back to Home
        </button>

        <span className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-4 block">{eyebrow}</span>
        <h1 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-4">{title}</h1>
        {intro && <p className="text-wood-light text-lg font-light mb-12">{intro}</p>}
        {!intro && <div className="mb-12" />}

        {children}

        <div className="mt-16 pt-10 border-t border-wood-light/10 text-sm text-wood-light">
          <p className="mb-4">
            Questions about this page? Contact{' '}
            <a href="mailto:support@mbrosveneers.com" className="text-gold hover:underline">
              support@mbrosveneers.com
            </a>
            .
          </p>
          <p className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="/privacy" onClick={(e) => { e.preventDefault(); navigate('/privacy'); }} className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="/account-deletion" onClick={(e) => { e.preventDefault(); navigate('/account-deletion'); }} className="hover:text-gold transition-colors">Privacy Choices &amp; Account Deletion</a>
            <a href="/terms" onClick={(e) => { e.preventDefault(); navigate('/terms'); }} className="hover:text-gold transition-colors">Terms of Use</a>
            <a href="/support" onClick={(e) => { e.preventDefault(); navigate('/support'); }} className="hover:text-gold transition-colors">Support</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export function PrivacyPolicyPage() {
  useLegalSeo('Privacy Policy | M Bros Veneers', 'https://mbrosveneers.com/privacy');
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Privacy Policy"
      intro={`Effective ${EFFECTIVE_DATE}. This policy explains how M Bros Veneers ("we", "us") collects, uses, and protects information across mbrosveneers.com and the M Bros Veneers Showroom app.`}
    >
      <Section id="who-we-are" title="Who we are">
        <p>
          M Bros Veneers is a veneer and plywood showroom based at {SITE_SETTINGS.address.full}, a GST-registered
          business under Indian law. This policy covers our public website and the Showroom app used by our staff,
          Super Admins, and invited Design Partners, as well as enquiries submitted by visitors and customers.
        </p>
      </Section>

      <Section id="information-we-collect" title="Information we collect">
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Account identifiers</strong> — name, email, phone number, role (Super Admin, staff, or Design Partner), and login credentials managed via Firebase Authentication.</li>
          <li><strong>Contact information</strong> — details you submit through the website enquiry form or provide to our showroom staff.</li>
          <li><strong>Business and project records</strong> — leads, selection slips, quotations, orders, referrals, and Design Partner statements created in the course of doing business with us.</li>
          <li><strong>Photos and videos</strong> — inventory and product images captured by staff, and any samples or reference images shared with us.</li>
          <li><strong>Device and push notification tokens</strong> — used to deliver in-app and push notifications (e.g. quote updates, sample reminders) to staff and Design Partner devices.</li>
          <li><strong>Connected Instagram/Facebook account data</strong> — when a staff member links our business Facebook Page and Instagram Business account via Facebook Login, we receive the Page/Instagram account ID, name, profile picture, and an access token, as described below.</li>
          <li><strong>Diagnostics</strong> — basic crash and error logs, only if diagnostic reporting is enabled, used solely to fix app problems.</li>
        </ul>
      </Section>

      <Section id="how-we-use-it" title="How we use information">
        <ul className="list-disc pl-6 space-y-2">
          <li>Operate the showroom CRM: manage inventory, leads, quotations, selection slips, and Design Partner referrals.</li>
          <li>Respond to enquiries submitted through the website or app.</li>
          <li>Send transactional notifications (selection slip summaries, quotation updates, sample due-back reminders, restock alerts) via push notification, WhatsApp, or email.</li>
          <li>Maintain the security of accounts and detect misuse.</li>
          <li>Meet our accounting, GST, and other statutory obligations as a registered business in India.</li>
        </ul>
        <p>We do not sell your personal information.</p>
      </Section>

      <Section id="who-we-share-with" title="Who we share information with">
        <p>We use the following processors to operate our services. Each only receives what it needs to perform its function:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Google Firebase</strong> — authentication and push notifications.</li>
          <li><strong>Google Cloud Run</strong> — hosting for our backend API.</li>
          <li><strong>Cloudflare R2</strong> — storage for product photos and media.</li>
          <li><strong>Meta (WhatsApp Cloud API, Instagram/Facebook Graph API)</strong> — used only for staff-initiated customer notifications and social media posting from business-owned accounts; customer data is not shared with Meta for advertising purposes.</li>
        </ul>
        <p>We do not share your information with third parties for their own marketing purposes.</p>
      </Section>

      <Section id="instagram-facebook" title="Connecting Instagram &amp; Facebook">
        <p>
          Authorized staff can connect M Bros Veneers' own Facebook Page and its linked Instagram Business account to
          the Showroom app using Facebook Login for Business, in order to publish photos and videos of our products
          (such as veneer and plywood stock) directly from the app.
        </p>
        <p><strong>What we access:</strong> basic information about the connected Page and Instagram Business account
          (name, ID, profile picture) and permission to publish posts, photos, and videos on behalf of that account.
        </p>
        <p><strong>What we don't do:</strong> we do not access personal messages, followers' personal data, or any
          customer's personal Instagram or Facebook account. This access is never used for advertising, and no
          customer data is shared with Meta through this integration.
        </p>
        <p><strong>Storage and security:</strong> access tokens issued by Meta are stored securely on our backend
          (Google Cloud Run) and are never exposed on end-user devices or shared with any other third party.
        </p>
        <p><strong>Revoking access:</strong> staff can disconnect the integration at any time from Settings in the
          Showroom app, or by removing "M Bros Veneers Showroom" under Facebook Business Integrations in their own
          Facebook settings. Disconnecting immediately revokes and deletes the stored access token; we retain it only
          for as long as the integration stays connected.
        </p>
      </Section>

      <Section id="retention" title="How long we keep information">
        <p>
          We retain account and business records for as long as your account is active, and afterward for as long as
          required to meet our GST, tax, and accounting obligations under Indian law (currently up to 8 years for
          financial records). Website enquiries are kept until resolved and for a reasonable follow-up period.
        </p>
        <p>
          When an account is deleted, we remove your personal profile data. Transaction records that we are legally
          required to retain for audit or tax purposes are kept, but are handled in line with our security practices
          and are not used for any other purpose. See{' '}
          <a href="/account-deletion" onClick={(e) => { e.preventDefault(); navigate('/account-deletion'); }} className="text-gold hover:underline">
            Privacy Choices &amp; Account Deletion
          </a>{' '}
          for details.
        </p>
      </Section>

      <Section id="security" title="Security">
        <p>
          We use role-based access controls so staff and Design Partners only see the data relevant to their role,
          encrypt data in transit, and never store third-party platform secrets (such as WhatsApp or Meta credentials)
          on end-user devices.
        </p>
      </Section>

      <Section id="your-rights" title="Your rights">
        <p>
          You may request access to, correction of, or deletion of your personal information at any time by using the
          in-app Account &amp; Security screen or by contacting us at{' '}
          <a href="mailto:support@mbrosveneers.com" className="text-gold hover:underline">support@mbrosveneers.com</a>.
        </p>
      </Section>

      <Section id="children" title="Children">
        <p>Our services are intended for business use by adults and are not directed at children under 18.</p>
      </Section>

      <Section id="changes" title="Changes to this policy">
        <p>
          If we make material changes to this policy, we will update the effective date above and post the revised
          policy at this same address.
        </p>
      </Section>

      <Section id="contact" title="Contact us">
        <div className="space-y-2">
          <p className="flex items-center gap-3"><MapPin className="text-gold shrink-0" size={16} aria-hidden="true" /> {SITE_SETTINGS.address.full}</p>
          <p className="flex items-center gap-3"><Phone className="text-gold shrink-0" size={16} aria-hidden="true" /> {SITE_SETTINGS.phoneDisplay}</p>
          <p className="flex items-center gap-3"><Mail className="text-gold shrink-0" size={16} aria-hidden="true" /> support@mbrosveneers.com</p>
        </div>
      </Section>
    </LegalLayout>
  );
}

export function PrivacyChoicesPage() {
  useLegalSeo('Privacy Choices & Account Deletion | M Bros Veneers', 'https://mbrosveneers.com/account-deletion');
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Privacy Choices & Account Deletion"
      intro={`Effective ${EFFECTIVE_DATE}. This page explains how to request deletion of your M Bros Veneers account and data, whether or not you can currently sign in.`}
    >
      <Section id="if-signed-in" title="If you can sign in to the app">
        <p>
          Open the Showroom app, go to <strong>Settings → Account &amp; Security</strong>, and choose{' '}
          <strong>Delete Account</strong>. Follow the on-screen confirmation. This starts the same deletion process
          described below.
        </p>
      </Section>

      <Section id="if-signed-out" title="If you can't sign in, or want to request deletion by email">
        <p>
          Email <a href="mailto:support@mbrosveneers.com" className="text-gold hover:underline">support@mbrosveneers.com</a>{' '}
          from the email address on your account, with the subject line "Account deletion request", and include your
          registered name and phone number so we can verify your identity. We may ask for additional verification
          before proceeding, to prevent someone else from deleting your account.
        </p>
      </Section>

      <Section id="what-gets-deleted" title="What is deleted, and what is retained">
        <p>
          We delete your personal profile information (name, email, phone, login credentials, device push tokens)
          and revoke your account access.
        </p>
        <p>
          Some records cannot be deleted immediately because we are legally required to keep them: invoices,
          quotations, and other transaction records needed for GST and tax audit purposes under Indian law. These are
          retained only as long as legally required and are not used for any other purpose after your account is
          deleted.
        </p>
        <p>
          <strong>Important:</strong> for security, the last remaining active Super Admin account cannot delete
          itself. If you are the sole Super Admin, you must first assign another active Super Admin before your
          account can be deleted.
        </p>
      </Section>

      <Section id="timeline" title="Timeline">
        <p>
          We aim to complete verified deletion requests within 30 days. You will receive a confirmation once your
          request has been processed.
        </p>
      </Section>

      <Section id="marketing" title="Marketing and notification choices">
        <p>
          Transactional notifications (such as quotation updates or sample reminders) are part of the service and
          tied to your account. To stop all notifications, delete your account as described above, or contact{' '}
          <a href="mailto:support@mbrosveneers.com" className="text-gold hover:underline">support@mbrosveneers.com</a>{' '}
          to opt out of a specific channel.
        </p>
      </Section>
    </LegalLayout>
  );
}

export function TermsOfUsePage() {
  useLegalSeo('Terms of Use | M Bros Veneers', 'https://mbrosveneers.com/terms');
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Terms of Use"
      intro={`Effective ${EFFECTIVE_DATE}. Please read these terms before using mbrosveneers.com or the M Bros Veneers Showroom app.`}
    >
      <Section id="acceptance" title="Acceptance of terms">
        <p>
          By using our website or the Showroom app, you agree to these Terms of Use. If you do not agree, please do
          not use our services.
        </p>
      </Section>

      <Section id="the-service" title="Our services">
        <p>
          mbrosveneers.com lets visitors browse our veneer and plywood catalogue and submit enquiries. The M Bros
          Veneers Showroom app is a business tool used by our staff, Super Admins, and invited Design Partners to
          manage inventory, leads, quotations, and referrals.
        </p>
      </Section>

      <Section id="accounts" title="Accounts and eligibility">
        <p>
          App accounts are created or invited by M Bros Veneers for staff and Design Partners; the app is not
          available for general public sign-up. You are responsible for keeping your login credentials secure and
          for activity that happens under your account.
        </p>
      </Section>

      <Section id="acceptable-use" title="Acceptable use">
        <p>
          You agree to use our website and app only for lawful purposes connected to your relationship with M Bros
          Veneers, and not to attempt to access data or accounts you are not authorized to use.
        </p>
      </Section>

      <Section id="design-partner" title="Design Partner Program">
        <p>
          Design Partners may refer customers and earn rewards as described to them at the time of joining the
          program. Referral tracking and reward calculations are performed in good faith based on our records, but we
          do not guarantee any specific level of referred sales or rewards.
        </p>
      </Section>

      <Section id="content" title="Content and stock information">
        <p>
          Product photos, descriptions, and other content on our website and app belong to M Bros Veneers unless
          otherwise noted. Pricing and stock availability shown on the website or app are indicative and subject to
          change; please contact us or visit the showroom to confirm current availability before making a purchase
          decision.
        </p>
      </Section>

      <Section id="disclaimers" title="Disclaimers and limitation of liability">
        <p>
          Our website and app are provided "as is". To the extent permitted by law, M Bros Veneers is not liable for
          indirect or consequential losses arising from your use of our website or app.
        </p>
      </Section>

      <Section id="governing-law" title="Governing law">
        <p>
          These terms are governed by the laws of India, and any disputes will be subject to the exclusive
          jurisdiction of the courts in Nagpur, Maharashtra.
        </p>
      </Section>

      <Section id="changes" title="Changes to these terms">
        <p>
          We may update these terms from time to time. Continued use of our website or app after an update means you
          accept the revised terms.
        </p>
      </Section>
    </LegalLayout>
  );
}

export function SupportPage() {
  useLegalSeo('Support | M Bros Veneers', 'https://mbrosveneers.com/support');
  return (
    <LegalLayout eyebrow="Help" title="Support">
      <Section id="contact-support" title="Contact us">
        <p>
          For help with the M Bros Veneers Showroom app or website, questions about an order, or account and privacy
          requests, reach out and we'll get back to you.
        </p>
        <div className="space-y-2 mt-6">
          <p className="flex items-center gap-3"><Mail className="text-gold shrink-0" size={16} aria-hidden="true" /> <a href="mailto:support@mbrosveneers.com" className="text-gold hover:underline">support@mbrosveneers.com</a></p>
          <p className="flex items-center gap-3"><Phone className="text-gold shrink-0" size={16} aria-hidden="true" /> <a href={`tel:${SITE_SETTINGS.phone}`} className="hover:text-gold transition-colors">{SITE_SETTINGS.phoneDisplay}</a></p>
          <p className="flex items-center gap-3"><MapPin className="text-gold shrink-0" size={16} aria-hidden="true" /> {SITE_SETTINGS.address.full}</p>
        </div>
      </Section>
      <Section id="response-time" title="Response time">
        <p>We aim to respond to support and account requests within 2 business days.</p>
      </Section>
    </LegalLayout>
  );
}
