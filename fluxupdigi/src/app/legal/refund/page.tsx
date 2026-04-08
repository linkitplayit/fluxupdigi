import { Navbar } from '@/src/components/layout/Navbar';
import { Footer } from '@/src/components/layout/Footer';
import { Card } from '@/src/components/ui/Card';

export default function RefundPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Refund Policy</h1>
          
          <Card className="p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">Digital Products - No Refund Policy</h2>
              <p className="text-gray-300 leading-relaxed mb-2">
                Due to the nature of digital products, <strong className="text-white">all sales are final</strong>. 
                We do not offer refunds once access has been granted to:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>PDF courses and guides</li>
                <li>APK files and software</li>
                <li>AI tools and digital assets</li>
                <li>Telegram group access</li>
                <li>Game referral links</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">Exceptions</h2>
              <p className="text-gray-300 leading-relaxed mb-2">
                Refunds may be issued only in the following exceptional cases:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Technical error preventing product delivery</li>
                <li>Wrong product delivered due to our error</li>
                <li>Duplicate payment charged</li>
                <li>Product significantly different from description</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-3">
                Refund requests must be made within 24 hours of purchase with valid proof.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">Non-Refundable Situations</h2>
              <p className="text-gray-300 leading-relaxed mb-2">
                We cannot process refunds for:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Change of mind after purchase</li>
                <li>Product already downloaded or accessed</li>
                <li>Inability to use the product (device compatibility, user error)</li>
                <li>Earnings from referral games (third-party responsibility)</li>
                <li>Violation of terms of service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">Refund Process</h2>
              <p className="text-gray-300 leading-relaxed">
                If you believe you qualify for a refund:
              </p>
              <ol className="list-decimal list-inside text-gray-300 space-y-2 ml-4 mt-2">
                <li>Contact us via Telegram (@errorzxl) within 24 hours</li>
                <li>Provide order ID and payment proof</li>
                <li>Explain the issue with supporting evidence</li>
                <li>Wait for admin review (24-48 hours)</li>
                <li>Approved refunds are processed within 5-7 business days</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">Before You Buy</h2>
              <p className="text-gray-300 leading-relaxed">
                To avoid issues, please:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Read product descriptions carefully</li>
                <li>Check system requirements and compatibility</li>
                <li>Contact support if you have questions before purchase</li>
                <li>Ensure your payment details are correct</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-3">Contact</h2>
              <p className="text-gray-300 leading-relaxed">
                For refund requests or questions, contact us via Telegram: @errorzxl
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
