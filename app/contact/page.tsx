import { ContactForm } from '@/components/contact-form';
import { Mail, Instagram, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Contact - Grant Ward',
  description:
    'Get in touch with Grant Ward for inquiries about artwork, commissions, or exhibitions.',
};

export default function ContactPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground">
            Have a question about a piece, interested in a commission, or want
            to discuss an exhibition? Send us a message.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-5">
          <div className="md:col-span-3">
            <ContactForm />
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="rounded-lg border bg-card p-6 space-y-6">
              <div className="space-y-2">
                <h3 className="font-semibold">Studio Location</h3>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="h-5 w-5 mt-0.5" />
                  <div>
                    <p>Pacific Northwest</p>
                    <p className="text-sm">By appointment only</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Email</h3>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Mail className="h-5 w-5 mt-0.5" />
                  <a
                    href="mailto:grant@grantward.art"
                    className="hover:text-foreground transition-colors"
                  >
                    grant@grantward.art
                  </a>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Social</h3>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Instagram className="h-5 w-5 mt-0.5" />
                  <a
                    href="https://instagram.com/grantwardart"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    @grantwardart
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-6 space-y-3">
              <h3 className="font-semibold">Inquiry Types</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Purchase inquiries</li>
                <li>• Commission requests</li>
                <li>• Exhibition opportunities</li>
                <li>• Wholesale inquiries</li>
                <li>• Press and media</li>
                <li>• General questions</li>
              </ul>
            </div>

            <div className="rounded-lg border bg-card p-6 space-y-2">
              <h3 className="font-semibold">Response Time</h3>
              <p className="text-sm text-muted-foreground">
                We typically respond within 1-2 business days. For urgent
                inquiries, please mention that in your message.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
