import Image from "next/image";
import Footer from "@/components/Footer";
import ROICalculator from "@/components/ROICalculator";


export default function Home() {
  return (
    <main className="text-center bg-white text-black p-8">
      <h1 className="font-bold text-3xl mb-6 mt-6">Marketing Calculator – See How Your Wealth Grows</h1>
      <div>
        <h2 className="font-bold text-xl p-4">Calculate how much your investments can grow by reinvesting dividends and compounding returns.</h2>
        <a href="/calculators/ROI">ROICalculator</a>
        
        <Footer />

        
      </div>
    </main>
  );
}
