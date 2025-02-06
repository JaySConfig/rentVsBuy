'use client';

import LTVCalculator from '@/components/LTVCalculator';
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <main>
      <section className="bg-base-100">
        <Navbar />
      </section>

      <section className="bg-base-200 text-black">
        <div className="px-8 text-center pt-24 max-w-3xl mx-auto">
          <h1 className="font-extrabold text-4xl mb-6 lg:text-5xl">Customer Lifetime Value Calculator</h1>
          <div className="opacity-90 mb-10 text-2xl py-6">
            Calculate how much revenue a customer generates over their entire relationship with your business.
          </div>

          <section className="py-4">
            <div className="pt-12 pb-8 px-8 max-w-3xl mx-auto bg-base-200">
              <div className="p-4 bg-base-100 rounded-2xl mx-auto">
                <LTVCalculator />
              </div>

              <div className="p-4 bg-base-100 rounded-2xl mx-auto mt-8">
                <h2 className="text-xl font-semibold mb-4">How to use this calculator</h2>
                <ul className="space-y-2 text-left">
                  <li>1. Enter your average order value (how much customers spend per purchase)</li>
                  <li>2. Enter purchase frequency (how many times a customer buys per year)</li>
                  <li>3. Enter customer lifespan (how many years customers typically stay)</li>
                  <li>4. Click calculate to see both annual and lifetime value</li>
                </ul>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </section>
    </main>
  );
}