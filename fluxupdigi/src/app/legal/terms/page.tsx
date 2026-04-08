import { Navbar } from '@/src/components/layout/Navbar';
import { Footer } from '@/src/components/layout/Footer';
import { Card } from '@/src/components/ui/Card';

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Terms & Conditions</h1>
          
          <Card className="p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">1. Acceptance of Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                By accessing and using FluxUpDigi, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">2. Digital Products</h2>
              <p className="text-gray-300 leading-relaxed mb-2">
                All digital products sold on FluxUpDigi are provided "as is" without any warranty.
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Products are delivered digitally via download or Telegram group access</li>
                <li>All sales are final - no refunds for digital products once access is granted</li>
                <li>You may not resell, redistribute, or share purchased content</li>
                <li>Personal use license only unless otherwise stated</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">3. Payment Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                We accept payments through Razorpay (automatic) and manual UPI transfers. 
                Manual payments require screenshot and UTR verification before access is granted.
                All prices are in Indian Rupees (₹).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">4. User Responsibility</h2>
              <p className="text-gray-300 leading-relaxed">
                Users are responsible for maintaining the confidentiality of their account credentials.
                Any activities under your account are your responsibility.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">5. Earning Games</h2>
              <p className="text-gray-300 leading-relaxed">
                Games listed under "Earn ₹500+ Daily" are third-party referral links. 
                FluxUpDigi is not responsible for any earnings, losses, or disputes related to these platforms.
                Participate at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">6. Modifications</h2>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to modify these terms at any time. 
                Continued use of the service constitutes acceptance of modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">7. Contact</h2>
              <p className="text-gray-300 leading-relaxed">
                For any questions regarding these terms, contact us via Telegram: @errorzxl
              </p>
            </section>

            <p className="text-gray-500 text-sm mt-8">Last updated: January 2025</p>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
