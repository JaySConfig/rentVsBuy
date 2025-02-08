// 'use client';

// import ROICalculator from '../../../components/ROICalculator';
// import Navbar from '@/components/NavBar';
// import Footer from '@/components/Footer';

// export default function Page() {
//   return (
//     <main>
//       <div className="min-h-screen flex flex-col bg-base-200">

//       {/* nav */}
//       <section className="bg-base-100">
//         <Navbar />
//       </section>

//       {/* main content */}
//       <section className="bg-base-200 text-black">
//         <div className="px-8 text-center pt-24 max-w-3xl mx-auto">
//           <h1 className="font-extrabold text-4xl mb-6 lg:text-5xl">ROI Calculator</h1>
//           <div className="opacity-90 mb-10 text-2xl py-6">
//             Calculate your Return on Investment (ROI) to measure the profitability of your marketing campaigns.
//           </div>

//           {/* calculator section */}
//           <section className="py-4">
//             <div className="pt-12 pb-8 px-8 max-w-3xl mx-auto bg-base-200">
//               <div className="p-4 bg-base-100 rounded-2xl mx-auto">
//                 <ROICalculator />
//               </div>

//               {/* How to use section */}
//               <div className="p-4 bg-base-100 rounded-2xl mx-auto mt-8">
//                 <h2 className="text-xl font-semibold mb-4">How to use this calculator</h2>
//                 <ul className="space-y-2 text-left">
//                   <li>1. Enter your total advertising spend</li>
//                   <li>2. Enter the revenue generated from your campaign</li>
//                   <li>3. Click calculate to see your ROI and profit</li>
//                 </ul>
//               </div>
//             </div>
//           </section>

          
//         </div>
//       </section>
//       <Footer />
//       </div>
//     </main>
//   );
// }

'use client';

import dynamic from 'next/dynamic';
const ROICalculator = dynamic(() => import('../../../components/ROICalculator'), { ssr: false });
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <section className="bg-base-100">
        <Navbar />
      </section>

      {/* Main Content */}
      <section className="bg-base-200 text-black flex-grow">
        <div className="max-w-3xl mx-auto px-8 pt-24">
          {/* Page Title */}
          <h1 className="text-4xl font-bold mb-6 text-center">ROI Calculator</h1>

          {/* Intro / Overview */}
          <div className="bg-white text-black text-xl leading-loose p-8 rounded-lg shadow-sm mb-12 text-center">
            <p>
              Curious if your marketing campaigns are truly profitable? Our
              <strong> ROI (Return on Investment)</strong> Calculator takes the
              guesswork out of analyzing your results. Simply enter your campaign
              costs and generated revenue to see how much profit you’re making—and
              what percentage of your spend is coming back as profit.
            </p>
          </div>

          {/* Calculator Component */}
          <div className="bg-base-100 rounded-2xl p-4 mb-8">
            <ROICalculator />
          </div>

          {/* How to Use */}
          <div className="bg-base-100 rounded-2xl p-4 mb-8">
            <h2 className="text-xl font-semibold mb-4">How to use this calculator</h2>
            <ul className="space-y-2 text-left">
              <li>1. Enter your total campaign spend (e.g., ad costs, tools, resources)</li>
              <li>2. Input the total revenue generated from the campaign</li>
              <li>3. (Optional) Include any additional overhead or staff costs if you want a more accurate estimate</li>
              <li>4. Click “Calculate” to see your ROI percentage and total profit</li>
            </ul>
          </div>

          {/* Example Calculation */}
          <div className="bg-base-100 p-4 rounded-xl mb-8">
            <h2 className="text-xl font-semibold mb-2">Example Calculation</h2>
            <p className="mb-3">
              Suppose you spent <strong>$5,000</strong> on a marketing campaign and
              earned <strong>$15,000</strong> in revenue from it.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Profit:</strong> $15,000 – $5,000 = $10,000</li>
              <li><strong>ROI %:</strong> ($10,000 ÷ $5,000) × 100 = 200%</li>
            </ul>
            <p className="mt-3">
              A 200% ROI means that for every dollar you spent, you earned two dollars
              in profit—an excellent return for most businesses!
            </p>
          </div>

          {/* FAQ Section */}
          <div className="bg-base-100 p-4 rounded-xl mb-12">
            <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1 text-lg">How accurate is this calculator?</h3>
                <p>
                  It provides an estimate based on your inputs (spend, revenue, etc.).
                  Real-world results may vary, so consider these figures a guideline rather
                  than a guarantee.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-1 text-lg">
                  Why is ROI important?
                </h3>
                <p>
                  ROI measures how effectively your marketing spend drives profit. Understanding
                  it helps you decide where to double down and where to cut back on spend.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-1 text-lg">
                  Can I factor in indirect costs?
                </h3>
                <p>
                  Absolutely. If you have additional overhead—like design fees or software
                  subscriptions—add them to your total spend for a more accurate ROI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
