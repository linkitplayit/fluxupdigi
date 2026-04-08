import { Navbar } from '@/src/components/layout/Navbar';
import { Footer } from '@/src/components/layout/Footer';
import { Card } from '@/src/components/ui/Card';

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
          
          <Card className="p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">1. Information We Collect</h2>
              <p className="text-gray-300 leading-relaxed mb-2">We collect information you provide directly:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Name and email address (via Google OAuth or email signup)</li>
                <li>Payment information (UPI screenshots, transaction IDs)</li>
                <li>Collaboration requests and messages</li>
                <li>Usage data and analytics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">2. How We Use Your Information</h2>
              <p className="text-gray-300 leading-relaxed mb-2">Your information is used to:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Process your purchases and provide access to digital products</li>
                <li>Send order confirmations and product delivery</li>
                <li>Respond to collaboration requests</li>
                <li>Improve our services and user experience</li>
                <li>Communicate important updates</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">3. Data Storage & Security</h2>
              <p className="text-gray-300 leading-relaxed">
                All data is stored securely using Supabase (PostgreSQL) with industry-standard encryption.
                Payment screenshots are stored in private storage buckets with restricted access.
                We do not store credit card information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">4. Data Sharing</h2>
              <p className="text-gray-300 leading-relaxed">
                We do not sell or share your personal information with third parties except:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Payment processors (Razorpay) for transaction processing</li>
                <li>When required by law or legal process</li>
                <li>To protect our rights and prevent fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">5. Cookies</h2>
              <p className="text-gray-300 leading-relaxed">
                We use essential cookies for authentication and session management.
                You can disable cookies in your browser, but this may affect site functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">6. Your Rights</h2>
              <p className="text-gray-300 leading-relaxed">You have the right to:</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Access your personal data</li>
                <li>Request data deletion</li>
                <li>Opt-out of marketing communications</li>
                <li>Update your information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">7. Contact Us</h2>
              <p className="text-gray-300 leading-relaxed">
                For privacy concerns or data requests, contact us via Telegram: @errorzxl
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
