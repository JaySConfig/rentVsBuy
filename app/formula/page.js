import Footer from "@/components/Footer";
import Head from "next/head";
import Link from "next/link";

export default function HowItWorks() {
  return (
    <>
      <Head>
        <title>How It Works - UK Buy vs Rent Calculator</title>
        <meta 
          name="description" 
          content="Understand how our UK Buy vs Rent Calculator works. Learn how we compare mortgage payments, rent increases, and home appreciation to help you decide." 
        />
      </Head>

      <main>
        <div className="min-h-screen flex flex-col bg-base-200">
          <section className="bg-base-200 text-black">
            <div className="px-8 text-center pt-32 max-w-3xl mx-auto">
              <h1 className="font-extrabold text-4xl mb-6 lg:text-5xl">
                How the Buy vs Rent Calculator Works
              </h1>
              <div>
                <div className="opacity-90 mb-10 text-2xl py-6">
                  Get a clear breakdown of how we compare the costs of buying and renting in the UK.
                </div>
              </div>

              <section className="py-4">
                <div className="pt-12 pb-8 px-8 max-w-3xl mx-auto bg-base-200">
                  <h2 className="text-3xl lg:text-4xl font-extrabold mb-12">
                    Step-by-Step Breakdown
                  </h2>

                  <div className="p-6 bg-base-100 max-w-124 rounded-2xl mx-auto text-left">
                    <h3 className="text-2xl font-semibold mb-4">Step 1: Enter Your Details</h3>
                    <ul className="list-disc ml-6 space-y-2">
                      <li><strong>House Price & Mortgage:</strong> Enter the cost of buying and loan details.</li>
                      <li><strong>Rent Costs:</strong> Add how much you'd pay monthly for a similar property.</li>
                      <li><strong>Extra Expenses:</strong> We factor in stamp duty, maintenance, and more.</li>
                    </ul>

                    <h3 className="text-2xl font-semibold mt-8 mb-4">Step 2: We Run the Numbers</h3>
                    <ul className="list-disc ml-6 space-y-2">
                      <li><strong>Home Appreciation:</strong> Estimates future property value.</li>
                      <li><strong>Rent Increases:</strong> Projects how rent might change over time.</li>
                      <li><strong>Investment Comparison:</strong> What if you invested your deposit instead?</li>
                    </ul>

                    <h3 className="text-2xl font-semibold mt-8 mb-4">Step 3: View Your Results</h3>
                    <ul className="list-disc ml-6 space-y-2">
                      <li><strong>Total Cost Comparison:</strong> See the long-term cost of each option.</li>
                      <li><strong>Break-even Point:</strong> Find out when buying becomes more cost-effective.</li>
                      <li><strong>Smart Decision Support:</strong> A clear recommendation based on your inputs.</li>
                    </ul>

                    <p className="mt-6 text-lg font-semibold">
                      🏠 Buying builds equity but has upfront costs.  
                      🏡 Renting offers flexibility but doesn't build long-term wealth.  
                      ⚡ Our calculator helps you make the best decision for your future.
                    </p>

                    <div className="mt-8 text-center">
                      <Link href="/" className="inline-block bg-blue-900 text-white py-3 px-6 rounded-md font-bold hover:bg-blue-700">
                        Try the Calculator Now
                      </Link>
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
