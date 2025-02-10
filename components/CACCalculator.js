"use client"

import React, { useState } from 'react';

const ResultsDisplay = ({ results, showInvestmentComparison }) => {
  const {
    years = 20,
    buyingOutcome = 0,
    rentingOutcome = 0,
    difference = 0,
    recommendation = '',
    crossoverPoint = '',
  } = results || {};

  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
      <h3 className="text-xl font-bold mb-4">Results</h3>
      
      <div className="space-y-4">
        <p className="font-medium">
          Total outcome after <span className="font-bold">{years}</span> years:
        </p>
        
        <div className="grid gap-2">
          <div className="p-3 bg-white rounded shadow-sm">
            <p>Buying outcome: <span className="font-bold">£{buyingOutcome.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
          </div>
          
          <div className="p-3 bg-white rounded shadow-sm">
            <p>Renting & Investing outcome: <span className="font-bold">£{rentingOutcome.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
          </div>
          
          <div className="p-3 bg-blue-50 rounded shadow-sm">
            <p>Overall Difference: <span className="font-bold">£{difference.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-blue-100 rounded-lg">
          <p className="font-semibold">Recommendation: <span className="text-blue-800">{recommendation}</span></p>
          <p className="mt-2 text-blue-900">{crossoverPoint}</p>
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

const BuyVsRentCalculator = () => {
  const [showInvestmentComparison, setShowInvestmentComparison] = useState(false);
  
  const [inputs, setInputs] = useState({
    housePrice: 281000,
    downPayment: 10,
    downPaymentType: 'percent',
    mortgageRate: 4.85,
    mortgageTerm: 20,
    councilTax: 0.5,
    councilTaxType: 'percent',
    maintenanceCost: 1,
    maintenanceCostType: 'percent',
    homeInsurance: 500,
    monthlyRent: 1300,
    rentIncrease: 2,
    investmentReturn: 7,
    homeAppreciation: 3,
    mortgageFees: 995,
    legalFees: 1500,
    energyRating: 'D',
    potentialRentalIncome: 0,
    includeLodgerIncome: false,
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
      [name]: name === 'includeLodgerIncome' ? event.target.checked : value,
    }));
  };

  const calculateMonthlyMortgage = (principal, annualRate, years) => {
    const monthlyRate = annualRate / 100 / 12;
    const numPayments = years * 12;
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  };

  const calculateScenario = (includeInvestments) => {
    // Calculate both scenarios
    const withInvestments = calculateScenario(true);
    const withoutInvestments = calculateScenario(false);
    
    const selectedScenario = showInvestmentComparison ? withInvestments : withoutInvestments;
    const downPaymentAmount = inputs.downPaymentType === 'percent' 
      ? (inputs.housePrice * inputs.downPayment / 100)
      : inputs.downPayment;
    const principal = inputs.housePrice - downPaymentAmount;
    const monthlyMortgage = calculateMonthlyMortgage(principal, inputs.mortgageRate, inputs.mortgageTerm);
    
    let currentHouseValue = inputs.housePrice;
    let currentRent = inputs.monthlyRent;
    let investmentValue = includeInvestments ? downPaymentAmount : 0; // Only start with down payment if including investments
    
    // Initial costs for buying
    let totalBuyingCosts = downPaymentAmount + inputs.mortgageFees + inputs.legalFees;
    let totalRentPaid = 0;
    
    // Calculate year by year
    for (let year = 1; year <= inputs.mortgageTerm; year++) {
      // Buying costs
      const yearlyMortgage = monthlyMortgage * 12;
      const yearlyMaintenance = currentHouseValue * (inputs.maintenanceCost / 100);
      const yearlyInsurance = inputs.homeInsurance;
      const yearlyBuyingCosts = yearlyMortgage + yearlyMaintenance + yearlyInsurance;
      totalBuyingCosts += yearlyBuyingCosts;
      
      // House appreciation
      currentHouseValue *= (1 + inputs.homeAppreciation / 100);
      
      // Renting costs and investment
      const yearlyRent = currentRent * 12;
      totalRentPaid += yearlyRent;
      
      if (includeInvestments) {
        // Invest the difference between buying and renting costs
        const yearlyInvestment = (yearlyBuyingCosts - yearlyRent);
        investmentValue *= (1 + inputs.investmentReturn / 100);
        investmentValue += yearlyInvestment;
      }
      
      // Rent increase for next year
      currentRent *= (1 + inputs.rentIncrease / 100);
    }
    
    // Final positions
    const buyingPosition = totalBuyingCosts - currentHouseValue;
    const rentingPosition = totalRentPaid - investmentValue;
    
    return {
      buyingPosition,
      rentingPosition,
      totalRentPaid,
      finalHouseValue: currentHouseValue,
      finalInvestmentValue: investmentValue
    };
  };

  const handleCalculate = () => {
    const yearlyResults = [];
    const downPaymentAmount = inputs.downPaymentType === 'percent' 
      ? (inputs.housePrice * inputs.downPayment / 100)
      : inputs.downPayment;
    const principal = inputs.housePrice - downPaymentAmount;
    const monthlyMortgage = calculateMonthlyMortgage(principal, inputs.mortgageRate, inputs.mortgageTerm);
    
    let currentHouseValue = inputs.housePrice;
    let currentRent = inputs.monthlyRent;
    let investmentValue = downPaymentAmount; // Start with down payment as investment
    let crossoverYear = null;
    
    // Initial costs for buying
    let totalBuyingCosts = downPaymentAmount + inputs.mortgageFees + inputs.legalFees;
    
    // Calculate year by year
    for (let year = 1; year <= inputs.mortgageTerm; year++) {
      // Buying costs
      const yearlyMortgage = monthlyMortgage * 12;
      const yearlyMaintenance = currentHouseValue * (inputs.maintenanceCost / 100);
      const yearlyInsurance = inputs.homeInsurance;
      const yearlyBuyingCosts = yearlyMortgage + yearlyMaintenance + yearlyInsurance;
      totalBuyingCosts += yearlyBuyingCosts;
      
      // House appreciation
      currentHouseValue *= (1 + inputs.homeAppreciation / 100);
      
      // Renting costs and investment
      const yearlyRent = currentRent * 12;
      // Invest the difference between buying and renting costs
      const yearlyInvestment = (yearlyBuyingCosts - yearlyRent);
      investmentValue *= (1 + inputs.investmentReturn / 100);
      investmentValue += yearlyInvestment;
      
      // Rent increase for next year
      currentRent *= (1 + inputs.rentIncrease / 100);
      
      // Store yearly results
      const buyingPosition = totalBuyingCosts - currentHouseValue;
      const rentingPosition = (yearlyRent * year) - investmentValue;
      
      yearlyResults.push({
        year,
        buyingPosition,
        rentingPosition
      });
      
      // Check for crossover
      if (crossoverYear === null && 
          yearlyResults.length >= 2 && 
          Math.sign(yearlyResults[year-2].buyingPosition - yearlyResults[year-2].rentingPosition) !==
          Math.sign(buyingPosition - rentingPosition)) {
        crossoverYear = year;
      }
    }
    
    // Final positions
    const finalBuyingPosition = totalBuyingCosts - currentHouseValue;
    const finalRentingPosition = (currentRent * 12 * inputs.mortgageTerm) - investmentValue;
    const difference = Math.abs(finalBuyingPosition - finalRentingPosition);
    
    setResults({
      years: inputs.mortgageTerm,
      buyingOutcome: finalBuyingPosition,
      rentingOutcome: finalRentingPosition,
      difference,
      recommendation: finalRentingPosition < finalBuyingPosition ? 'Renting is cheaper' : 'Buying is cheaper',
      crossoverPoint: crossoverYear 
        ? `The crossover point is at year ${crossoverYear}. After this point, ${finalRentingPosition < finalBuyingPosition ? 'renting' : 'buying'} becomes cheaper.`
        : 'No crossover point found - one option is better throughout the entire period.'
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Property Details Column */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Property Details</h3>
          
          {/* House Price */}
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

          {/* Down Payment */}
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

          {/* Mortgage Rate */}
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

          {/* Mortgage Term */}
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

        {/* Additional Details Column */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Additional Details</h3>

          {/* Monthly Rent */}
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

          {/* Rent Increase */}
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

          {/* Investment Return */}
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

          {/* Home Appreciation */}
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

        {/* Investment Toggle */}
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

        {/* Calculate Button */}
        <div className="col-span-2">
          <button
            onClick={handleCalculate}
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Calculate
          </button>
        </div>

        {/* Results Section */}
        <div className="col-span-2">
          <ResultsDisplay results={results} />
        </div>
      </div>
    </div>
  );
};

export default BuyVsRentCalculator;