'use client';

import EngagementCalculator from '@/components/EngagementCalculator';
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <main>
      <div className="min-h-screen flex flex-col bg-base-200">
      <section className="bg-base-100">
        <Navbar />
      </section>

      <section className="bg-base-200 text-black">
        <div className="px-8 text-center pt-24 max-w-3xl mx-auto">
          <h1 className="font-extrabold text-4xl mb-6 lg:text-5xl">Social Media Engagement Rate Calculator</h1>
          <div className="opacity-90 mb-10 text-2xl py-6">
            Measure how engaged your social media audience is by calculating your engagement rate across likes, comments, and shares.
          </div>

          <section className="py-4">
            <div className="pt-12 pb-8 px-8 max-w-3xl mx-auto bg-base-200">
              <div className="p-4 bg-base-100 rounded-2xl mx-auto">
                <EngagementCalculator />
              </div>

              <div className="p-4 bg-base-100 rounded-2xl mx-auto mt-8">
                <h2 className="text-xl font-semibold mb-4">How to use this calculator</h2>
                <ul className="space-y-2 text-left">
                  <li>1. Enter the total number of likes on your posts</li>
                  <li>2. Enter the total number of comments</li>
                  <li>3. Enter the total number of shares</li>
                  <li>4. Enter your total follower count</li>
                  <li>5. Click calculate to see your engagement rate</li>
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