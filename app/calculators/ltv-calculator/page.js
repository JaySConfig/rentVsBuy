// 'use client';

// import LTVCalculator from '@/components/LTVCalculator';
// import Navbar from '@/components/NavBar';
// import Footer from '@/components/Footer';

// export default function Page() {
//   return (
//     <main>
//       <div className="min-h-screen flex flex-col bg-base-200">
//       <section className="bg-base-100">
//         <Navbar />
//       </section>

//       <section className="bg-base-200 text-black">
//         <div className="px-8 text-center pt-24 max-w-3xl mx-auto">
//           <h1 className="font-extrabold text-4xl mb-6 lg:text-5xl">Customer Lifetime Value Calculator</h1>
//           <div className="opacity-90 mb-10 text-2xl py-6">
//             Calculate how much revenue a customer generates over their entire relationship with your business.
//           </div>

//           <section className="py-4">
//             <div className="pt-12 pb-8 px-8 max-w-3xl mx-auto bg-base-200">
//               <div className="p-4 bg-base-100 rounded-2xl mx-auto">
//                 <LTVCalculator />
//               </div>

//               <div className="p-4 bg-base-100 rounded-2xl mx-auto mt-8">
//                 <h2 className="text-xl font-semibold mb-4">How to use this calculator</h2>
//                 <ul className="space-y-2 text-left">
//                   <li>1. Enter your average order value (how much customers spend per purchase)</li>
//                   <li>2. Enter purchase frequency (how many times a customer buys per year)</li>
//                   <li>3. Enter customer lifespan (how many years customers typically stay)</li>
//                   <li>4. Click calculate to see both annual and lifetime value</li>
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
const LTVCalculator = dynamic(() => import('../../../components/LTVCalculator'), { ssr: false });
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
          <h1 className="text-4xl font-bold mb-6 text-center">Lifetime Value (LTV) Calculator</h1>

          {/* Intro / Overview */}
          <div className="bg-white text-black text-xl leading-loose p-8 rounded-lg shadow-sm mb-12 text-center">
            <p>
              Curious about how much a single customer is worth over the long run?
              Our LTV Calculator helps you estimate the total revenue a customer
              might generate before they churn or stop buying.
              Simply plug in your average order value, purchase frequency,
              and typical customer lifespan to see real-time insights into
              your most valuable revenue streams.
            </p>
          </div>

          {/* Calculator Component */}
          <div className="bg-base-100 rounded-2xl p-4 mb-8">
            <LTVCalculator />
          </div>

          {/* How to Use */}
          <div className="bg-base-100 rounded-2xl p-4 mb-8">
            <h2 className="text-xl font-semibold mb-4">How to use this calculator</h2>
            <ul className="space-y-2 text-left">
              <li>1. Enter your average order value (AOV)</li>
              <li>2. Add your purchase frequency (e.g., 12 orders per year)</li>
              <li>3. Input the typical customer lifespan (in years)</li>
              <li>4. Click “Calculate” to see the total revenue a single customer generates over their lifetime</li>
            </ul>
          </div>

          {/* Example Calculation */}
          <div className="bg-base-100 p-4 rounded-xl mb-8">
            <h2 className="text-xl font-semibold mb-2">Example Calculation</h2>
            <p className="mb-3">
              Suppose your average order value is <strong>$50</strong>, and each customer
              typically buys <strong>12 times a year</strong>. They remain active for about
              <strong> 2 years</strong>.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Annual Spend:</strong> $50 × 12 = $600</li>
              <li><strong>Lifetime Value (LTV):</strong> $600 × 2 years = $1,200</li>
            </ul>
            <p className="mt-3">
              This means each new customer can generate <strong>$1,200</strong>
              in revenue over their relationship with your business—valuable insight for
              making informed marketing decisions.
            </p>
          </div>

          {/* FAQ Section */}
          <div className="bg-base-100 p-4 rounded-xl mb-12">
            <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1 text-lg">How accurate is this calculator?</h3>
                <p>
                  It provides estimates based on your inputs (AOV, purchase frequency, lifespan).
                  Real-world results may vary, so use this as a guideline rather than a guarantee.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-1 text-lg">What if my customers have varying purchase frequencies?</h3>
                <p>
                  Consider using an <em>average</em>. If some buy weekly and others buy monthly,
                  pick a mid-range figure. Refine this number over time with real data.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-1 text-lg">Does this account for profit margins?</h3>
                <p>
                  This tool focuses on revenue. For a clearer picture of profit, consider factoring in
                  your cost of goods sold (COGS) and overhead in a separate calculation.
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
