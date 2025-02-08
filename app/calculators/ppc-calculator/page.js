
'use client';

import dynamic from 'next/dynamic';
const PPCCalculator = dynamic(() => import('../../../components/PPCCalculator'), { ssr: false });
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="bg-base-100">
        <Navbar />
      </section>

      <section className="bg-base-200 text-black flex-grow">
        <div className="max-w-3xl mx-auto px-8 pt-24">
          <h1 className="text-4xl font-bold mb-6 text-center">PPC Campaign Calculator</h1>
          
          <div className="bg-white text-black text-xl leading-loose p-8 rounded-lg shadow-sm mb-12 text-center">
            <p>
              Want to get the most out of your paid ads? Our PPC Calculator helps you estimate clicks, 
              conversions, and potential revenue—all in one place. Enter your ad budget, cost-per-click (CPC), 
              conversion rate, and average order value to see exactly how your campaigns could perform. 
              No more guesswork—just data-driven insights to boost your ROI.
            </p>
          </div>

          <div className="bg-base-100 rounded-2xl p-4 mb-8">
            <PPCCalculator />
          </div>

          <div className="bg-base-100 rounded-2xl p-4 mb-8">
            <h2 className="text-xl font-semibold mb-4">How to use this calculator</h2>
            <ul className="space-y-2 text-left">
              <li>1. Enter your monthly PPC advertising budget</li>
              <li>2. Input your average cost per click (CPC)</li>
              <li>3. Add your expected conversion rate</li>
              <li>4. Enter your average order value</li>
              <li>5. Click calculate to see projected results</li>
            </ul>
          </div>

          <div className="bg-base-100 p-4 rounded-xl mb-8">
            <h2 className="text-xl font-semibold mb-2">Example Calculation</h2>
            <p className="mb-3">
              Suppose you have a total ad budget of <strong>$2,000</strong> and an average
              <strong> CPC of $1</strong>. You expect a <strong>5%</strong> conversion rate, with an
              <strong> Average Order Value (AOV) of $50</strong>.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Estimated Clicks:</strong> $2,000 ÷ $1 = 2,000 clicks</li>
              <li><strong>Estimated Conversions:</strong> 2,000 clicks × 5% = 100 conversions</li>
              <li><strong>Estimated Revenue:</strong> 100 conversions × $50 AOV = $5,000</li>
            </ul>
            <p className="mt-3">
              This means with a $2,000 ad budget, you could potentially earn $5,000 in revenue,
              resulting in a positive return on your PPC investment.
            </p>
          </div>

          <div className="bg-base-100 p-4 rounded-xl mb-12">
            <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1 text-lg">How accurate is this calculator?</h3>
                <p>
                  It provides estimates based on your inputs (budget, CPC, conversion rate, etc.).
                  Real-world results may vary, so use this as a guideline rather than a guarantee.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-1 text-lg">
                  What if I don't know my conversion rate or average order value?
                </h3>
                <p>
                  You can experiment with different numbers or look at past campaign data to set a baseline.
                  Start with conservative estimates and then adjust as you gather real performance data.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-1 text-lg">
                  Can I use this for platforms like Google Ads or Facebook Ads?
                </h3>
                <p>
                  Absolutely. Any platform where you pay per click can be analyzed with these inputs.
                  Just ensure your CPC and conversion rate match the platform's average metrics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}