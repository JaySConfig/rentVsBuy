'use client';

import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Head from 'next/head';

export default function Page() {
  return (
    <>
    <Head>
        <title>About Us - PPC Calculator</title>
        <meta name="description" content="Learn more about our PPC Calculator and how it helps you optimize ad spend, increase conversions, and maximize ROI." />
      </Head>
    <main>
    
      <div className='min-h-screen flex flex-col bg-base-200'>
      <section className="bg-base-100">
        <Navbar />
      </section>

      <section className="bg-base-200 text-black">
        <div className="px-8 text-center pt-24 max-w-3xl mx-auto">
          <h1 className="font-extrabold text-4xl mb-6 lg:text-5xl">About Marketing Calculators</h1>
          
          <div className="opacity-90 mb-10 text-2xl py-6">
            Your one-stop solution for marketing metrics and ROI calculations.
          </div>

          <section className="py-4">
            <div className="pt-12 pb-8 px-8 max-w-3xl mx-auto bg-base-200">
              <div className="p-4 bg-base-100 rounded-2xl mx-auto text-left">
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="mb-6">
                  We provide marketers with easy-to-use tools to calculate and understand their marketing metrics.
                  From ROI to customer lifetime value, our calculators help you make data-driven decisions.
                </p>

                <h2 className="text-2xl font-semibold mb-4">Why Use Our Calculators?</h2>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Simple and intuitive interface</li>
                  <li>Accurate calculations</li>
                  <li>Instant results</li>
                  <li>Free to use</li>
                </ul>
              </div>
            </div>
          </section>

        </div>
      </section>
      <Footer />

      </div>
    </main>
    </>
  );
}