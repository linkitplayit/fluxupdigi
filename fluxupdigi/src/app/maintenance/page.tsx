import { Navbar } from '@/src/components/layout/Navbar';
import { Footer } from '@/src/components/layout/Footer';
import { Card } from '@/src/components/ui/Card';
import { Wrench } from 'lucide-react';

export default function MaintenancePage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-12 flex items-center justify-center">
        <Card className="max-w-2xl w-full p-12 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full mb-6">
            <Wrench size={48} className="text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4">
            We'll Be Right Back!
          </h1>
          
          <p className="text-gray-300 text-lg mb-8">
            FluxUpDigi is currently undergoing scheduled maintenance.
            We're working hard to improve your experience.
          </p>

          <div className="space-y-4">
            <p className="text-gray-400">
              Expected downtime: A few minutes
            </p>
            <p className="text-gray-400">
              Need urgent assistance? Contact us on Telegram:
            </p>
            <a
              href="https://t.me/errorzxl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transition-all"
            >
              @errorzxl
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-gray-500 text-sm">
              Thank you for your patience!
            </p>
          </div>
        </Card>
      </div>
      <Footer />
    </>
  );
}