'use client';

import ROICalculator from '../../../components/ROICalculator';
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <main>
      <div className="min-h-screen flex flex-col bg-base-200">

      {/* nav */}
      <section className="bg-base-100">
        <Navbar />
      </section>

      {/* main content */}
      <section className="bg-base-200 text-black">
        <div className="px-8 text-center pt-24 max-w-3xl mx-auto">
          <h1 className="font-extrabold text-4xl mb-6 lg:text-5xl">ROI Calculator</h1>
          <div className="opacity-90 mb-10 text-2xl py-6">
            Calculate your Return on Investment (ROI) to measure the profitability of your marketing campaigns.
          </div>

          {/* calculator section */}
          <section className="py-4">
            <div className="pt-12 pb-8 px-8 max-w-3xl mx-auto bg-base-200">
              <div className="p-4 bg-base-100 rounded-2xl mx-auto">
                <ROICalculator />
              </div>

              {/* How to use section */}
              <div className="p-4 bg-base-100 rounded-2xl mx-auto mt-8">
                <h2 className="text-xl font-semibold mb-4">How to use this calculator</h2>
                <ul className="space-y-2 text-left">
                  <li>1. Enter your total advertising spend</li>
                  <li>2. Enter the revenue generated from your campaign</li>
                  <li>3. Click calculate to see your ROI and profit</li>
                </ul>
              </div>
            </div>
          </section>

          
        </div>
      </section>
      <Footer />
      </div>
    </main>
  );
}