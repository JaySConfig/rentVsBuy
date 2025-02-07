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
      <div className="px-8 text-center pt-24 max-w-3xl mx-auto">
        <h1 className="font-extrabold text-4xl mb-6 lg:text-5xl">Supercharge Your Marketing with Data-Driven Calculators</h1>
          <div>
        {/* <a href="/calculators/ROI">ROICalculator</a> */}
          <div className="opacity-90 mb-10  text-2xl py-6">Take the guesswork out of ROI, CAC, LTV, and more—get actionable insights in seconds.</div>
        </ div>
        {/* calculators */}
        <section className=" py-4">
          <div className="pt-12 pb-8 px-8 max-w-3xl mx-auto bg-base-200">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-12"> Marketing Calculators that adapt to your needs</h2>

            <div className="p-4 bg-base-100 max-w-124 rounded-2xl mx-auto">
              <div>
                <h3 className="opactity-90 text-xl font-semibold">ROI Calculator</h3>
                <p className="py-6">Calculate the ROI on your ads</p>
                <Link href="/calculators/roi-calculator" className="btn bg-blue-800 text-white">
                Calculate Now
                </Link>
              </div>
            </div>

            <div className="p-4 bg-base-100 max-w-124 rounded-2xl mx-auto mt-8">
              <div>
                <h3 className="opactity-90 text-xl font-semibold">ROAS Calculator</h3>
                <p className="py-6">Calculate the ROAS on your ads</p>
                <Link href="/calculators/roas-calculator" className="btn bg-blue-800 text-white">
                Calculate Now
                </Link>
              </div>
            </div>


            <div className="p-4 bg-base-100 max-w-124 rounded-2xl mx-auto mt-8">
              <div>
                <h3 className="opactity-90 text-xl font-semibold">LTV Calculator</h3>
                <p className="py-6">Calculate the LTV of your customers</p>
                <Link href="/calculators/ltv-calculator" className="btn bg-blue-800 text-white">
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
