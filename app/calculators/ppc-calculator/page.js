'use client';

import dynamic from 'next/dynamic';
const PPCCalculator = dynamic(() => import('../../../components/PPCCalculator'), { ssr: false });
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
          <h1 className="font-extrabold text-4xl mb-6 lg:text-5xl">PPC Campaign Calculator</h1>
          <div className="opacity-90 mb-10 text-2xl py-6">
            Plan your PPC campaigns by calculating expected clicks, conversions, and revenue based on your budget and metrics.
          </div>

          <section className="py-4">
            <div className="pt-12 pb-8 px-8 max-w-3xl mx-auto bg-base-200">
              <div className="p-4 bg-base-100 rounded-2xl mx-auto">
                <PPCCalculator />
              </div>

              <div className="p-4 bg-base-100 rounded-2xl mx-auto mt-8">
                <h2 className="text-xl font-semibold mb-4">How to use this calculator</h2>
                <ul className="space-y-2 text-left">
                  <li>1. Enter your monthly PPC advertising budget</li>
                  <li>2. Input your average cost per click (CPC)</li>
                  <li>3. Add your expected conversion rate</li>
                  <li>4. Enter your average order value</li>
                  <li>5. Click calculate to see projected results</li>
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