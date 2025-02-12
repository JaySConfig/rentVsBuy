import Image from "next/image";
import Footer from "@/components/Footer";
import Link from "next/link";
import Head from "next/head";
import BuyVsRentCalculator from "@/components/BuyVsRentCalculator";
import FAQSection from "@/components/FAQSection";

export default function Home() {
  return (
    <>
      <Head>
        <title>UK Buy vs Rent Calculator – Make Smarter Property Decisions</title>
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
                Make Smarter Property Decisions with Our UK Buy vs Rent Calculator
              </h1>
              <div>
                <div className="opacity-90 mb-10 text-2xl py-6">
                Compare the long-term costs of buying and renting in the UK to find out which option suits your financial goals.
                </div>
              </div>

              <section className="py-4">
                {/* <div className="pt-12 pb-8 px-8 max-w-3xl mx-auto bg-base-200">
                 */}
                 <div  div className="p-4 bg-base-100 w-full max-w-xl rounded-2xl mx-auto">
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
                      Thinking about buying a home but unsure if it's the right financial move? Our Buy vs Rent Calculator helps you compare the true costs of both options, taking into account mortgage payments, property appreciation, rent increases, and potential investment returns.
                  Simply enter your details and get an instant breakdown of which choice might be better for you.
                      </p>
                      <h3 className="text-xl font-semibold opacity-90 ">✅ Enter your details, and in seconds, you'll know whether buying or renting is the smarter financial choice!</h3>
                      <BuyVsRentCalculator />
                    </div>
                  </div>

                
                  

                </div>

                
              </section>

              {/* <div className="p-4 bg-base-100 max-w-124 rounded-2xl mx-auto mt-8 "> */}
              <div className="p-6 bg-base-100 w-full max-w-xl rounded-2xl mx-auto mt-12 ">

              <div>
                <h3 className="opacity-90 text-xl font-semibold">Buy vs Rent Calculator</h3>

                <h4 className=" font-semibold opacity-90 text-lg">📊 How It Works</h4>

                <h4 className="mt-4 font-semibold">💰 Step 1: Enter Your Financial Details</h4>
                <ul className="list-disc pl-6">
                  <li>House price, mortgage rate, and term</li>
                  <li>Rental costs and expected rent increases</li>
                  <li>Additional costs like insurance and maintenance</li>
                </ul>

                <h4 className="mt-4 font-semibold">📈 Step 2: Set Growth Projections</h4>
                <ul className="list-disc pl-6">
                  <li>Home appreciation</li>
                  <li>Expected investment returns</li>
                  <li>Inflation-adjusted rent increases</li>
                </ul>

                <h4 className="mt-4 font-semibold">📉 Step 3: Get Your Results</h4>
                <ul className="list-disc pl-6">
                  <li>Total cost of buying vs renting over time</li>
                  <li>Investment potential if you rent and invest the difference</li>
                  <li>A clear recommendation on which option may be more cost-effective</li>
                </ul>
              </div>
              </div>

              <FAQSection />
            </div>
          </section>
          <Footer />
        </div>
      </main>
    </>
  );
}