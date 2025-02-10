'use client'

import React, { useState } from 'react';

const BuyVsRentCalculator = () => {
  const [showInvestmentComparison, setShowInvestmentComparison] = useState(false);
  const [inputs, setInputs] = useState({
    housePrice: 281000,
    downPayment: 10,
    downPaymentType: 'percent',
    mortgageRate: 4.85,
    mortgageTerm: 20,
    maintenanceCost: 1,
    homeInsurance: 500,
    monthlyRent: 1300,
    rentIncrease: 2,
    investmentReturn: 7,
    homeAppreciation: 3,
    mortgageFees: 995,
    legalFees: 1500
  });

  const [results, setResults] = useState({
    years: 20,
    buyingOutcome: 0,
    rentingOutcome: 0,
    difference: 0,
    recommendation: '',
    crossoverPoint: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateMonthlyMortgage = (principal, annualRate, years) => {
    const monthlyRate = annualRate / 100 / 12;
    const numPayments = years * 12;
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  };

  const handleCalculate = () => {
    const downPayment = inputs.downPaymentType === 'percent' 
      ? (inputs.housePrice * inputs.downPayment / 100) 
      : inputs.downPayment;

    const monthlyMortgage = calculateMonthlyMortgage(
      inputs.housePrice - downPayment,
      inputs.mortgageRate,
      inputs.mortgageTerm
    );

    let houseValue = inputs.housePrice;
    let rentAmount = inputs.monthlyRent;
    let investment = showInvestmentComparison ? downPayment : 0;
    let totalBuyingCosts = inputs.mortgageFees + inputs.legalFees;
    let totalRentPaid = 0;

    if (!showInvestmentComparison) {
      totalBuyingCosts += downPayment;
    }

    for (let year = 1; year <= inputs.mortgageTerm; year++) {
      const yearMortgage = monthlyMortgage * 12;
      const yearMaintenance = houseValue * (inputs.maintenanceCost / 100);
      const yearRent = rentAmount * 12;
      const yearlyBuyingCosts = yearMortgage + yearMaintenance + inputs.homeInsurance;

      totalBuyingCosts += yearlyBuyingCosts;
      totalRentPaid += yearRent;

      if (showInvestmentComparison) {
        investment *= (1 + inputs.investmentReturn / 100);
        const monthlySavings = (yearlyBuyingCosts / 12) - rentAmount;
        investment += monthlySavings * 12;
      }

      houseValue *= (1 + inputs.homeAppreciation / 100);
      rentAmount *= (1 + inputs.rentIncrease / 100);
    }

    const buyingOutcome = totalBuyingCosts - houseValue;
    const rentingOutcome = totalRentPaid - investment;

    setResults({
      years: inputs.mortgageTerm,
      buyingOutcome,
      rentingOutcome,
      difference: Math.abs(buyingOutcome - rentingOutcome),
      recommendation: buyingOutcome < rentingOutcome ? 'Buying is cheaper' : 'Renting is cheaper',
      crossoverPoint: 'No crossover point found - one option is better throughout the entire period.'
    });
  };

  const ResultsDisplay = ({ results }) => {
    return (
      <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
        <h3 className="text-xl font-bold mb-4">Results</h3>
        
        <div className="space-y-4">
          <p className="font-medium">
            Total outcome after <span className="font-bold">{results.years}</span> years:
          </p>
          
          <div className="grid gap-2">
            <div className="p-3 bg-white rounded shadow-sm">
              <p>Buying outcome: <span className="font-bold">£{results.buyingOutcome.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
            </div>
            
            <div className="p-3 bg-white rounded shadow-sm">
              <p>Renting & Investing outcome: <span className="font-bold">£{results.rentingOutcome.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
            </div>
            
            <div className="p-3 bg-blue-50 rounded shadow-sm">
              <p>Overall Difference: <span className="font-bold">£{results.difference.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-100 rounded-lg">
            <p className="font-semibold">Recommendation: <span className="text-blue-800">{results.recommendation}</span></p>
            <p className="mt-2 text-blue-900">{results.crossoverPoint}</p>
          </div>
          
          {showInvestmentComparison && (
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                <span className="font-semibold">Important Note:</span> This comparison assumes you would consistently invest both your down payment (£{(inputs.housePrice * inputs.downPayment / 100).toLocaleString('en-GB')}) 
                and the monthly difference between buying and renting costs. Many people find it challenging to maintain such disciplined investing habits.
              </p>
            </div>
          )}
          
          <div className="mt-6 space-y-2 text-sm text-gray-600">
            <p><span className="font-semibold">Buying outcome:</span> Total costs of buying and maintaining the property, minus the final value of the home. A positive number means a net cost.</p>
            <p><span className="font-semibold">Renting & Investing outcome:</span> Total rent paid, minus the value of investments. A negative number means a net gain.</p>
            <p><span className="font-semibold">Overall Difference:</span> How much better off you'd be financially by choosing the recommended option.</p>
            <p><span className="font-semibold">Crossover point:</span> The year when the financially better option changes. Before this point, the other option was better.</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Property Details</h3>
          
          <div className="space-y-1">
            <label htmlFor="housePrice" className="block text-sm font-medium">
              House Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">£</span>
              <input
                type="number"
                id="housePrice"
                name="housePrice"
                value={inputs.housePrice}
                onChange={handleInputChange}
                className="w-full p-2 pl-8 border rounded"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="downPayment" className="block text-sm font-medium">
              Down Payment
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                id="downPayment"
                name="downPayment"
                value={inputs.downPayment}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              <select
                name="downPaymentType"
                value={inputs.downPaymentType}
                onChange={handleInputChange}
                className="p-2 border rounded"
              >
                <option value="percent">%</option>
                <option value="absolute">£</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="mortgageRate" className="block text-sm font-medium">
              Mortgage Interest Rate (%)
            </label>
            <input
              type="number"
              id="mortgageRate"
              name="mortgageRate"
              value={inputs.mortgageRate}
              onChange={handleInputChange}
              step="0.1"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="mortgageTerm" className="block text-sm font-medium">
              Mortgage Term (years)
            </label>
            <input
              type="number"
              id="mortgageTerm"
              name="mortgageTerm"
              value={inputs.mortgageTerm}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Additional Details</h3>

          <div className="space-y-1">
            <label htmlFor="monthlyRent" className="block text-sm font-medium">
              Monthly Rent
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">£</span>
              <input
                type="number"
                id="monthlyRent"
                name="monthlyRent"
                value={inputs.monthlyRent}
                onChange={handleInputChange}
                className="w-full p-2 pl-8 border rounded"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="rentIncrease" className="block text-sm font-medium">
              Annual Rent Increase (%)
            </label>
            <input
              type="number"
              id="rentIncrease"
              name="rentIncrease"
              value={inputs.rentIncrease}
              onChange={handleInputChange}
              step="0.1"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="investmentReturn" className="block text-sm font-medium">
              Investment Return Rate (%)
            </label>
            <input
              type="number"
              id="investmentReturn"
              name="investmentReturn"
              value={inputs.investmentReturn}
              onChange={handleInputChange}
              step="0.1"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="homeAppreciation" className="block text-sm font-medium">
              Home Appreciation Rate (%)
            </label>
            <input
              type="number"
              id="homeAppreciation"
              name="homeAppreciation"
              value={inputs.homeAppreciation}
              onChange={handleInputChange}
              step="0.1"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="col-span-2">
          <div className="flex items-center space-x-2 mb-4">
            <input
              type="checkbox"
              id="showInvestmentComparison"
              checked={showInvestmentComparison}
              onChange={(e) => setShowInvestmentComparison(e.target.checked)}
              className="rounded border-gray-300"
            />
            <label htmlFor="showInvestmentComparison" className="text-sm">
              Compare with renting + investing the difference (assumes you invest the down payment and monthly savings)
            </label>
          </div>
        </div>

        <div className="col-span-2">
          <button
            onClick={handleCalculate}
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Calculate
          </button>
        </div>

        <div className="col-span-2">
          <ResultsDisplay 
            results={results} 
          />
        </div>
      </div>
    </div>
  );
};

export default BuyVsRentCalculator;