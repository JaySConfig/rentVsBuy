import Image from "next/image";
import Footer from "@/components/Footer";
import Link from "next/link";
import Head from "next/head";
import BuyVsRentCalculator from "@/components/BuyVsRentCalculator";

export default function Home() {
  return (
    <>
      <Head>
        <title>UK Property Calculator - Buy vs Rent Analysis Tool</title>
        <meta 
          name="description" 
          content="Make smarter UK property decisions with our Buy vs Rent calculator. Compare long-term costs of buying and renting with our comprehensive analysis tool." 
        />
      </Head>
      <main>
        <div className="min-h-screen flex flex-col bg-base-200">
          <section className="bg-base-200 text-black">
            <div className="px-8 text-center pt-32 max-w-3xl mx-auto">
              <h1 className="font-extrabold text-4xl mb-6 lg:text-5xl">
                Make Smarter Property Decisions with Our Buy vs Rent Calculator
              </h1>
              <div>
                <div className="opacity-90 mb-10 text-2xl py-6">
                  Compare the true costs of buying versus renting in the UK—get detailed insights in seconds.
                </div>
              </div>

              <section className="py-4">
                <div className="pt-12 pb-8 px-8 max-w-3xl mx-auto bg-base-200">
                  <h2 className="text-3xl lg:text-4xl font-extrabold mb-12">
                    Comprehensive Property Cost Analysis
                  </h2>

                  <div className="p-4 bg-base-100 max-w-124 rounded-2xl mx-auto">
                    <div>
                      <h3 className="opacity-90 text-xl font-semibold">Buy vs Rent Calculator</h3>
                      <h4 className="mt-4 font-semibold opacity-90 text-lg">
                        Compare Long-term Costs of Buying and Renting
                      </h4>
                      <p className="py-6">
                        Make an informed decision about your next property move. Our calculator considers:
                        <strong> mortgage payments, property appreciation, stamp duty, maintenance costs</strong>, and more.
                        Perfect for anyone wanting to understand the <strong>true financial impact</strong> of buying versus renting.
                      </p>
                      <BuyVsRentCalculator />
                    </div>
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