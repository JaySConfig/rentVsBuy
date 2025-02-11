'use client'


import React, { useState } from 'react';

const ResultsDisplay = ({ results }) => {
  if (!results) return null;
  
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-center mb-6">
        Results After {results.years} Years
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="p-6 bg-gray-50 rounded-lg">
          <h4 className="text-lg font-bold mb-4">Buying Scenario</h4>
          <div className="space-y-2">
            <p>Total Costs: £{results.buyingTotal.toLocaleString()}</p>
            <p>House Value: £{results.finalHouseValue.toLocaleString()}</p>
            <p>Net Position: £{results.buyingNetPosition.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="p-6 bg-gray-50 rounded-lg">
          <h4 className="text-lg font-bold mb-4">Renting Scenario</h4>
          <div className="space-y-2">
            <p>Total Rent: £{results.totalRent.toLocaleString()}</p>
            {results.investmentValue > 0 && (
              <p>Investment Value: £{results.investmentValue.toLocaleString()}</p>
            )}
            <p>Net Position: £{results.rentingNetPosition.toLocaleString()}</p>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-blue-50 rounded-lg text-center">
        <p className="font-bold">
          Buying is better by £{results.difference.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

const BuyVsRentCalculator = () => {
  const [showInvestmentComparison, setShowInvestmentComparison] = useState(false);
  const [results, setResults] = useState(null);
  const [inputs, setInputs] = useState({
    housePrice: 281000,
    downPayment: 10,
    downPaymentType: 'percent',
    mortgageRate: 4.85,
    mortgageTerm: 25,
    monthlyRent: 1300,
    rentIncrease: 2,
    investmentReturn: 7,
    homeAppreciation: 3,
    mortgageFees: 995,
    legalFees: 1500,
    maintenanceCost: 1,
    homeInsurance: 500
  });

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;
    setInputs(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const calculateMonthlyMortgage = (principal, annualRate, years) => {
    const monthlyRate = annualRate / 100 / 12;
    const numPayments = years * 12;
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
           (Math.pow(1 + monthlyRate, numPayments) - 1);
  };

  const handleCalculate = () => {
    // Calculate down payment amount
    const downPaymentAmount = inputs.downPaymentType === 'percent' 
      ? (inputs.housePrice * inputs.downPayment / 100)
      : inputs.downPayment;

    // Initial buying costs
    let totalBuyingCosts = downPaymentAmount + inputs.mortgageFees + inputs.legalFees;
    let houseValue = inputs.housePrice;
    
    // Calculate monthly mortgage
    const monthlyMortgage = calculateMonthlyMortgage(
      inputs.housePrice - downPaymentAmount,
      inputs.mortgageRate,
      inputs.mortgageTerm
    );

    // Initialize renting values
    let monthlyRent = inputs.monthlyRent;
    let totalRent = 0;
    let investmentValue = showInvestmentComparison ? downPaymentAmount : 0;

    // Calculate year by year
    for(let year = 0; year < inputs.mortgageTerm; year++) {
      // Buying costs for the year
      const yearlyMortgage = monthlyMortgage * 12;
      const yearlyMaintenance = houseValue * (inputs.maintenanceCost / 100);
      const yearlyInsurance = inputs.homeInsurance;
      const yearlyBuyingCosts = yearlyMortgage + yearlyMaintenance + yearlyInsurance;
      
      // Renting costs and investment
      const yearlyRent = monthlyRent * 12;
      
      if (showInvestmentComparison) {
        // Monthly investment of the difference
        const monthlyDifference = (yearlyBuyingCosts - yearlyRent) / 12;
        
        // Compound monthly
        for(let month = 0; month < 12; month++) {
          investmentValue *= (1 + inputs.investmentReturn/100/12);  // Monthly compound
          investmentValue += monthlyDifference;
        }
      }
      
      // Add yearly costs
      totalBuyingCosts += yearlyBuyingCosts;
      totalRent += yearlyRent;
      
      // Appreciation for next year
      houseValue *= (1 + inputs.homeAppreciation / 100);
      monthlyRent *= (1 + inputs.rentIncrease / 100);
    }

    // Calculate final positions
    const buyingNetPosition = -Math.abs(Math.round(totalBuyingCosts - houseValue));
    const rentingNetPosition = Math.round(showInvestmentComparison ? 
      totalRent - investmentValue : totalRent);
    
    setResults({
      years: inputs.mortgageTerm,
      buyingTotal: Math.round(totalBuyingCosts),
      finalHouseValue: Math.round(houseValue),
      buyingNetPosition,
      totalRent: Math.round(totalRent),
      investmentValue: showInvestmentComparison ? Math.round(investmentValue) : 0,
      rentingNetPosition,
      difference: Math.abs(rentingNetPosition - buyingNetPosition)
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Property Details */}
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
              step="0.01"
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

          {/* Mortgage Fees */}
          <div className="space-y-1">
            <label htmlFor="mortgageFees" className="block text-sm font-medium">
              Mortgage Fees
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">£</span>
              <input
                type="number"
                id="mortgageFees"
                name="mortgageFees"
                value={inputs.mortgageFees}
                onChange={handleInputChange}
                className="w-full p-2 pl-8 border rounded"
              />
            </div>
          </div>

          {/* Legal Fees */}
          <div className="space-y-1">
            <label htmlFor="legalFees" className="block text-sm font-medium">
              Legal Fees
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">£</span>
              <input
                type="number"
                id="legalFees"
                name="legalFees"
                value={inputs.legalFees}
                onChange={handleInputChange}
                className="w-full p-2 pl-8 border rounded"
              />
            </div>
          </div>
        </div>

        {/* Additional Details */}
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

          {/* Annual Rent Increase */}
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

          {/* Investment Return Rate */}
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

          {/* Home Appreciation Rate */}
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

          {/* Maintenance Cost */}
          <div className="space-y-1">
            <label htmlFor="maintenanceCost" className="block text-sm font-medium">
              Annual Maintenance Cost (% of home value)
            </label>
            <input
              type="number"
              id="maintenanceCost"
              name="maintenanceCost"
              value={inputs.maintenanceCost}
              onChange={handleInputChange}
              step="0.1"
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Home Insurance */}
          <div className="space-y-1">
            <label htmlFor="homeInsurance" className="block text-sm font-medium">
              Annual Home Insurance
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">£</span>
              <input
                type="number"
                id="homeInsurance"
                name="homeInsurance"
                value={inputs.homeInsurance}
                onChange={handleInputChange}
                className="w-full p-2 pl-8 border rounded"
              />
            </div>
          </div>
        </div>

        {/* Investment Toggle */}
        <div className="col-span-2">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showInvestmentComparison"
              checked={showInvestmentComparison}
              onChange={(e) => setShowInvestmentComparison(e.target.checked)}
              className="rounded border-gray-300"
            />
            <label htmlFor="showInvestmentComparison">
              Compare with renting + investing the difference
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
        {results && (
          <div className="col-span-2">
            <ResultsDisplay results={results} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyVsRentCalculator;