"use client"

import React from 'react';
import BuyVsRentCalculator from '../components/BuyVsRentCalculator';



export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">UK Buy vs Rent Calculator</h1>
          <p className="text-xl opacity-80">Make informed property decisions</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <BuyVsRentCalculator />
        
        <div className="mt-12 prose max-w-none">
          <h2 className="text-2xl font-semibold">Understanding Your Results</h2>
          <p>
            The calculator compares the total costs of buying and renting over the specified period. 
            It takes into account factors such as mortgage payments, property appreciation, rent increases, 
            and potential investment returns. A lower total cost suggests that option may be more 
            financially advantageous in the long term.
          </p>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}