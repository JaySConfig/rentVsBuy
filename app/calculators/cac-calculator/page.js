

// 'use client';

// import CACCalculator from '@/components/CACCalculator';
// import Navbar from '@/components/NavBar';
// import Footer from '@/components/Footer';
// import Head from 'next/head';

// export default function Page() {
//   return (
//     <>
//       <Head>
//         <title>CAC Calculator - Customer Acquisition Cost</title>
//         <meta name="description" content="Calculate your Customer Acquisition Cost (CAC) easily. Enter your marketing spend and new customers acquired to determine your cost per customer." />
//       </Head>

//     <div className="min-h-screen flex flex-col">
//       {/* Navbar */}
//       <section className="bg-base-100">
//         <Navbar />
//       </section>

//       {/* Main Content */}
//       <section className="bg-base-200 text-black flex-grow">
//         <div className="max-w-3xl mx-auto px-8 pt-24">
//           {/* Page Title */}
//           <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 text-center">
//             Customer Acquisition Cost (CAC) Calculator
//           </h1>

//           {/* Intro / Overview */}
//           <div className="bg-white text-black text-xl leading-loose p-8 rounded-lg shadow-sm mb-12 text-center">
//             <p>
//               Want to know exactly how much it costs to bring in each new customer?
//               Our <strong>CAC (Customer Acquisition Cost)</strong> Calculator gives you a
//               clear view of your marketing efficiency. Simply enter your total spend
//               and the number of new customers acquired to see how effective your
//               campaigns really are—and whether your customer acquisition strategies
//               need a tweak.
//             </p>
//           </div>

//           {/* Calculator Component */}
//           <div className="bg-base-100 rounded-2xl p-4 mb-8">
//             <CACCalculator />
//           </div>

//           {/* How to Use */}
//           <div className="bg-base-100 rounded-2xl p-4 mb-8">
//             <h2 className="text-xl font-semibold mb-4">How to use this calculator</h2>
//             <ul className="space-y-2 text-left">
//               <li>1. Enter your total acquisition spend (ad costs, marketing budget, etc.)</li>
//               <li>2. Enter the number of new customers acquired in that same period</li>
//               <li>3. (Optional) Include any additional overhead or staff costs for a more accurate calculation</li>
//               <li>4. Click “Calculate” to see your average Customer Acquisition Cost (CAC)</li>
//             </ul>
//           </div>

//           {/* Example Calculation */}
//           <div className="bg-base-100 p-4 rounded-xl mb-8">
//             <h2 className="text-xl font-semibold mb-2">Example Calculation</h2>
//             <p className="mb-3">
//               Suppose you spent <strong>$10,000</strong> on a marketing campaign and acquired 
//               <strong> 50 new customers</strong> during that timeframe.
//             </p>
//             <ul className="list-disc list-inside space-y-2">
//               <li><strong>CAC:</strong> $10,000 ÷ 50 = $200 per customer</li>
//             </ul>
//             <p className="mt-3">
//               This means each new customer effectively costs you <strong>$200</strong> to acquire, 
//               a crucial insight when planning budgets or comparing acquisition channels.
//             </p>
//           </div>

//           {/* FAQ Section */}
//           <div className="bg-base-100 p-4 rounded-xl mb-12">
//             <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
//             <div className="space-y-4">
//               <div>
//                 <h3 className="font-semibold mb-1 text-lg">Why does CAC matter?</h3>
//                 <p>
//                   CAC tells you how cost-effective your marketing efforts are. 
//                   If your <strong>Lifetime Value (LTV)</strong> is higher than your CAC,
//                   you’re likely on the right track. 
//                   If not, it might be time to optimize your campaigns.
//                 </p>
//               </div>

//               <div>
//                 <h3 className="font-semibold mb-1 text-lg">
//                   What if I have multiple marketing channels?
//                 </h3>
//                 <p>
//                   You can calculate CAC for each channel separately. For instance, 
//                   if you spend $5,000 on Facebook Ads and gain 25 customers from that channel, 
//                   your CAC for Facebook alone is $200. Comparing different channels 
//                   helps you allocate budget more effectively.
//                 </p>
//               </div>

//               <div>
//                 <h3 className="font-semibold mb-1 text-lg">
//                   How do I improve my CAC?
//                 </h3>
//                 <p>
//                   Improving CAC typically involves optimizing your ad targeting, 
//                   refining your messaging, and streamlining your sales funnel. 
//                   You can also focus on <strong>retention</strong> and <strong>upselling</strong> 
//                   for existing customers to boost overall profitability.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <Footer />
//     </div>
//     </>
//   );
// }
