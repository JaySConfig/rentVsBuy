// 'use client';

// import EngagementCalculator from '@/components/EngagementCalculator';
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
//           <h1 className="font-extrabold text-4xl mb-6 lg:text-5xl">Social Media Engagement Rate Calculator</h1>
//           <div className="opacity-90 mb-10 text-2xl py-6">
//             Measure how engaged your social media audience is by calculating your engagement rate across likes, comments, and shares.
//           </div>

//           <section className="py-4">
//             <div className="pt-12 pb-8 px-8 max-w-3xl mx-auto bg-base-200">
//               <div className="p-4 bg-base-100 rounded-2xl mx-auto">
//                 <EngagementCalculator />
//               </div>

//               <div className="p-4 bg-base-100 rounded-2xl mx-auto mt-8">
//                 <h2 className="text-xl font-semibold mb-4">How to use this calculator</h2>
//                 <ul className="space-y-2 text-left">
//                   <li>1. Enter the total number of likes on your posts</li>
//                   <li>2. Enter the total number of comments</li>
//                   <li>3. Enter the total number of shares</li>
//                   <li>4. Enter your total follower count</li>
//                   <li>5. Click calculate to see your engagement rate</li>
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

import EngagementCalculator from '@/components/EngagementCalculator';
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
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 text-center">
            Social Media Engagement Rate Calculator
          </h1>

          {/* Intro / Overview */}
          <div className="bg-white text-black text-xl leading-loose p-8 rounded-lg shadow-sm mb-12 text-center">
            <p>
              Measure how engaged your social media audience is by calculating your
              engagement rate across likes, comments, and shares. Simply enter
              your post interactions and total follower count to instantly see how well 
              your content resonates with your audience.
            </p>
          </div>

          {/* Calculator Component */}
          <div className="bg-base-100 rounded-2xl p-4 mb-8">
            <EngagementCalculator />
          </div>

          {/* How to Use */}
          <div className="bg-base-100 rounded-2xl p-4 mb-8">
            <h2 className="text-xl font-semibold mb-4">How to use this calculator</h2>
            <ul className="space-y-2 text-left">
              <li>1. Enter the total number of likes on your posts</li>
              <li>2. Enter the total number of comments</li>
              <li>3. Enter the total number of shares</li>
              <li>4. Enter your total follower count</li>
              <li>5. Click “Calculate” to see your engagement rate</li>
            </ul>
          </div>

          {/* Example Calculation */}
          <div className="bg-base-100 p-4 rounded-xl mb-8">
            <h2 className="text-xl font-semibold mb-2">Example Calculation</h2>
            <p className="mb-3">
              Suppose you have <strong>300 likes</strong>, <strong>50 comments</strong>, 
              and <strong>20 shares</strong>, with a total of <strong>5,000 followers</strong>.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Total Interactions:</strong> 300 + 50 + 20 = 370</li>
              <li><strong>Engagement Rate:</strong> (370 ÷ 5,000) × 100 = 7.4%</li>
            </ul>
            <p className="mt-3">
              This means about <strong>7.4%</strong> of your audience is actively engaging 
              with your content—a solid indicator of relevance and interest.
            </p>
          </div>

          {/* FAQ Section */}
          <div className="bg-base-100 p-4 rounded-xl mb-12">
            <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1 text-lg">
                  What is a “good” engagement rate?
                </h3>
                <p>
                  Benchmarks vary by platform and industry, but higher is always better.
                  Some brands see success at around 2-3%, while others aim for 5% or more.
                  Watch your engagement trends over time to see what's working.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-1 text-lg">
                  How can I improve my engagement rate?
                </h3>
                <p>
                  Focus on quality content and consistent posting schedules. 
                  Interact with your audience by replying to comments and 
                  encouraging user-generated content. Experimenting with different 
                  formats—images, videos, or stories—can also boost engagement.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-1 text-lg">
                  Should I track each post or my overall profile?
                </h3>
                <p>
                  Both! Post-level engagement helps you see which types of content 
                  resonate most, while an overall engagement average provides a 
                  broader picture of your social media performance.
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
