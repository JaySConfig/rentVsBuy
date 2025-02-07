import Image from "next/image";
import Footer from "@/components/Footer";
import ROICalculator from "@/components/ROICalculator";
import Navbar from "@/components/NavBar";
import Link from "next/link";


export default function Home() {
  return (
    <main>
      {/* nav */}
      <div className="min-h-screen flex flex-col bg-base-200">
      <section className="bg-base-100 ">
      <Navbar/> 
      </section>

      {/* hero */}
     <section className="bg-base-200 text-black">
      <div className="px-8 text-center pt-32 max-w-3xl mx-auto">
        <h1 className="font-extrabold text-4xl mb-6 lg:text-5xl">Supercharge Your Growth with Data-Driven Marketing Calculators</h1>
          <div>
        {/* <a href="/calculators/ROI">ROICalculator</a> */}
          <div className="opacity-90 mb-10  text-2xl py-6">Take the guesswork out of ROI, CAC, LTV, and more—get actionable insights in seconds.</div>
        </ div>
        {/* calculators */}
        <section className=" py-4">
          <div className="pt-12 pb-8 px-8 max-w-3xl mx-auto bg-base-200">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-12"> Marketing Calculators that adapt to your needs</h2>

            {/* ROI Calculator */}
          <div className="p-4 bg-base-100 max-w-124 rounded-2xl mx-auto">
            <div>
              <h3 className="opacity-90 text-xl font-semibold">ROI Calculator</h3>
              <h4 className="mt-4 font-semibold opacity-90 text-lg">See the Real Returns on Your Marketing Spend</h4>
              <p className="py-6">
                Quickly determine the <strong>Return on Investment (ROI)</strong> for your campaigns. 
                Simply input your ad spend and revenue to see which efforts deliver the biggest bang for your buck. 
                Perfect for anyone who wants clear insights into <strong>what’s driving real profit</strong>.
              </p>
              <Link href="/calculators/roi-calculator" className="btn bg-blue-800 text-white">
                Calculate Now
              </Link>
            </div>
          </div>

          {/* LTV Calculator */}
          <div className="p-4 bg-base-100 max-w-124 rounded-2xl mx-auto mt-8">
            <div>
              <h3 className="opacity-90 text-xl font-semibold">LTV Calculator</h3>
              <h4 className="mt-4 font-semibold opacity-90 text-lg">Uncover Your Customer’s True Lifetime Value</h4>
              <p className="py-6">
                Estimate how much each customer is really worth over time. By factoring in <strong>average order value</strong>, 
                <strong>purchase frequency</strong>, and <strong>customer lifespan</strong>, you’ll have a clear metric to guide 
                <strong>long-term marketing</strong> and <strong>retention strategies</strong>.
              </p>
              <Link href="/calculators/ltv-calculator" className="btn bg-blue-800 text-white">
                Calculate Now
              </Link>
            </div>
          </div>

          {/* ROAS Calculator */}
          <div className="p-4 bg-base-100 max-w-124 rounded-2xl mx-auto mt-8">
            <div>
              <h3 className="opacity-90 text-xl font-semibold">ROAS Calculator</h3>
              <h4 className="mt-4 font-semibold opacity-90 text-lg">Maximize Revenue with Rock-Solid ROAS</h4>
              <p className="py-6">
                <strong>Return on Ad Spend (ROAS)</strong> tells you how effectively your ad budget is generating revenue.
                Plug in your ad costs and sales to see which channels are <strong>worth scaling</strong>—and which ones
                might need a rethink.
              </p>
              <Link href="/calculators/roas-calculator" className="btn bg-blue-800 text-white">
                Calculate Now
              </Link>
            </div>
          </div>

          {/* CAC Calculator */}
          <div className="p-4 bg-base-100 max-w-124 rounded-2xl mx-auto mt-8">
            <div>
              <h3 className="opacity-90 text-xl font-semibold">CAC Calculator</h3>
              <h4 className="mt-4 font-semibold opacity-90 text-lg">Know Your Cost to Acquire a New Customer</h4>
              <p className="py-6">
                Measure exactly how much you spend to bring in each new customer. This calculator factors in your 
                <strong>acquisition spend</strong> (ad costs, marketing overhead, etc.) and the 
                <strong>number of customers</strong> you acquired—giving you a clear picture of 
                <strong>acquisition efficiency</strong>.
              </p>
              <Link href="/calculators/cac-calculator" className="btn bg-blue-800 text-white">
                Calculate Now
              </Link>
            </div>
          </div>

          {/* Social Media Engagement Calculator */}
          <div className="p-4 bg-base-100 max-w-124 rounded-2xl mx-auto mt-8">
            <div>
              <h3 className="opacity-90 text-xl font-semibold">Social Media Engagement Calculator</h3>
              <h4 className="mt-4 font-semibold opacity-90 text-lg">Gauge Your Audience’s Engagement at a Glance</h4>
              <p className="py-6">
                Find out how well your audience interacts with your posts by measuring <strong>likes</strong>, 
                <strong>comments</strong>, <strong>shares</strong>, and <strong>followers</strong>.
                This <strong>engagement rate</strong> helps you fine-tune content, set realistic goals,
                and benchmark performance across platforms.
              </p>
              <Link href="/calculators/social-media-engagement-calculator" className="btn bg-blue-800 text-white">
                Calculate Now
              </Link>
            </div>
          </div>

          <div className="p-4 bg-base-100 max-w-124 rounded-2xl mx-auto mt-8">
            <div>
              <h3 className="opacity-90 text-xl font-semibold">PPC Calculator</h3>
              <h4 className="mt-4 font-semibold opacity-90 text-lg">Optimize Your Paid Campaigns with Precision</h4>
              <p className="py-6">
                Estimate the clicks, conversions, and total revenue your ad spend can generate. Our 
                <strong> PPC Calculator</strong> helps you fine-tune your cost-per-click, conversion rate, 
                and average order value so you can see exactly how to <strong>maximize returns</strong> from 
                your paid marketing.
              </p>
              <Link href="/calculators/ppc-calculator" className="btn bg-blue-800 text-white">
                Calculate Now
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
  );
}
