'use client'

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// // graph

const ResultsGraph = ({ yearlyData }) => (
  <div className="mt-6 h-96">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={yearlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" label={{ value: 'Years', position: 'bottom' }} />
        <YAxis 
          label={{ value: 'Net Position (£)', angle: -90, position: 'left' }}
          tickFormatter={(value) => `£${(value / 1000)}k`}
        />
        <Tooltip 
          formatter={(value) => `£${value.toLocaleString()}`}
          labelFormatter={(year) => `Year ${year}`}
        />
        <Legend />
        <Line type="monotone" dataKey="buyingPosition" name="Buying" stroke="#2563eb" strokeWidth={2} />
        <Line type="monotone" dataKey="rentingPosition" name="Renting" stroke="#dc2626" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const BuyVsRentCalculator = () => {
  const [yearlyData, setYearlyData] = useState([]); ////////////// 
  const [showInvestmentComparison, setShowInvestmentComparison] = useState(false);
  const [results, setResults] = useState(null);
  const [inputs, setInputs] = useState({
    housePrice: 281000,
    downPayment: 10,
    downPaymentType: 'percent',
    mortgageRate: 4.85,
    mortgageTerm: 25,
    mortgageFees: 995,
    legalFees: 1500,
    renovationCosts: 0,
    maintenanceCost: 1,
    homeInsurance: 500,
    monthlyRent: 1300,
    rentIncrease: 2,
    investmentReturn: 7,
    homeAppreciation: 3
  });

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;
    setInputs(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleCalculate = () => {
    const downPaymentAmount = inputs.downPaymentType === 'percent' 
      ? (inputs.housePrice * inputs.downPayment / 100)
      : inputs.downPayment;

    let totalBuyingCosts = downPaymentAmount + inputs.mortgageFees + inputs.legalFees + inputs.renovationCosts;
    let houseValue = inputs.housePrice;
    
    const monthlyRate = inputs.mortgageRate / 100 / 12;
    const numPayments = inputs.mortgageTerm * 12;
    const monthlyMortgage = (inputs.housePrice - downPaymentAmount) * 
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
      (Math.pow(1 + monthlyRate, numPayments) - 1);

    let monthlyRent = inputs.monthlyRent;
    let totalRent = 0;
    let investmentValue = showInvestmentComparison ? downPaymentAmount : 0;

    for(let year = 0; year < inputs.mortgageTerm; year++) {
      const yearlyMortgage = monthlyMortgage * 12;
      const yearlyMaintenance = houseValue * (inputs.maintenanceCost / 100);
      const yearlyBuyingCosts = yearlyMortgage + yearlyMaintenance + inputs.homeInsurance;
      const yearlyRent = monthlyRent * 12;
      
      if (showInvestmentComparison) {
        const monthlyDifference = (yearlyBuyingCosts - yearlyRent) / 12;
        for(let month = 0; month < 12; month++) {
          investmentValue *= (1 + inputs.investmentReturn/100/12);
          investmentValue += monthlyDifference;
        }
      }
      
      totalBuyingCosts += yearlyBuyingCosts;
      totalRent += yearlyRent;
      houseValue *= (1 + inputs.homeAppreciation / 100);
      monthlyRent *= (1 + inputs.rentIncrease / 100);
    }

    yearlyData.push({ /////////////
      year,
      buyingPosition: houseValue - totalBuyingCosts,
      rentingPosition: investmentValue - totalRent
    });

    setResults({
      buyingTotal: -Math.round(totalBuyingCosts),
      finalHouseValue: Math.round(houseValue),
      buyingNetPosition: Math.round(houseValue - totalBuyingCosts),
      totalRent: -Math.round(totalRent),
      investmentValue: showInvestmentComparison ? Math.round(investmentValue) : 0,
      rentingNetPosition: Math.round(showInvestmentComparison ? 
        (investmentValue - totalRent) : -totalRent),
      difference: Math.abs(Math.round(
        (showInvestmentComparison ? (investmentValue - totalRent) : -totalRent) - 
        (houseValue - totalBuyingCosts)
      ))
    });
  };

  const renderInput = (name, label, type = 'number', options = {}) => {
    const { isPercentage, isCurrency, hasSelect, selectOptions, hint } = options;
    
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium">{label}</label>
        <div className={`${isCurrency ? 'relative' : ''} ${hasSelect ? 'flex gap-2' : ''}`}>
          {isCurrency && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2">£</span>
          )}
          <input
            type={type}
            name={name}
            value={inputs[name]}
            onChange={handleInputChange}
            className={`w-full p-2 ${isCurrency ? 'pl-8' : ''} border rounded`}
            step={isPercentage ? '0.1' : '1'}
          />
          {hasSelect && (
            <select
              name={name + 'Type'}
              value={inputs[name + 'Type']}
              onChange={handleInputChange}
              className="p-2 border rounded"
            >
              {selectOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          )}
        </div>
        {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
      </div>
    );
  };

  const renderResults = () => {
    // if (!results) return null;
    {yearlyData.length > 0 && (
      <ResultsGraph yearlyData={yearlyData} />
    )}

    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Results After {inputs.mortgageTerm} Years
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-bold text-center mb-4">Buying Scenario</h3>
            <div className="text-center space-y-4">
              <div>
                <p className="text-red-600">Total Costs: £{results.buyingTotal.toLocaleString()}</p>
                <p className="text-sm text-gray-600 mt-1">Everything you&apos;ll pay over {inputs.mortgageTerm} years</p>
              </div>
              <div>
                <p className="text-green-600">House Value: £{results.finalHouseValue.toLocaleString()}</p>
                <p className="text-sm text-gray-600 mt-1">What your property could be worth</p>
              </div>
              <div>
                <p className={results.buyingNetPosition >= 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                  Net Position: £{results.buyingNetPosition.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mt-1">House value minus all costs</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-bold text-center mb-4">Renting Scenario</h3>
            <div className="text-center space-y-4">
              <div>
                <p className="text-red-600">Total Rent: £{results.totalRent.toLocaleString()}</p>
                <p className="text-sm text-gray-600 mt-1">Total rent with {inputs.rentIncrease}% annual increases</p>
              </div>
              {results.investmentValue > 0 && (
                <div>
                  <p className="text-green-600">Investment Value: £{results.investmentValue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600 mt-1">Growth at {inputs.investmentReturn}% return</p>
                </div>
              )}
              <div>
                <p className={results.rentingNetPosition >= 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                  Net Position: £{results.rentingNetPosition.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {results.investmentValue > 0 
                    ? "Investment value minus total rent paid" 
                    : "Total cost of renting (no investments)"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="text-center space-y-3">
            <p className="font-bold text-lg">
              Buying is better by £{results.difference.toLocaleString()}
            </p>
            <div className="max-w-2xl mx-auto">
              <p className="text-sm text-gray-700 mb-2">
                This means after {inputs.mortgageTerm} years, buying leaves you £{results.difference.toLocaleString()} better off.
              </p>
              <div className="text-sm text-gray-700 text-left">
                <p className="font-medium mb-1">Understanding these numbers:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Red numbers show costs (money you spend)</li>
                  <li>Green numbers show value (what you gain)</li>
                  <li>Net Position shows your overall financial position</li>
                  <li>A negative Net Position means a cost, positive means a gain</li>
                  <li>The option with the higher (less negative) Net Position is better</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Property Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Property Details</h3>
          {renderInput('housePrice', 'House Price', 'number', { isCurrency: true })}
          {renderInput('downPayment', 'Down Payment', 'number', { 
            hasSelect: true, 
            selectOptions: [
              { value: 'percent', label: '%' },
              { value: 'absolute', label: '£' }
            ]
          })}
          {renderInput('mortgageRate', 'Mortgage Rate (%)', 'number', { 
            isPercentage: true,
            hint: 'Annual interest rate on your mortgage'
          })}
          {renderInput('mortgageTerm', 'Mortgage Term (years)')}
          {renderInput('mortgageFees', 'Mortgage Fees', 'number', { isCurrency: true })}
          {renderInput('legalFees', 'Legal Fees', 'number', { isCurrency: true })}
          {renderInput('renovationCosts', 'Renovation Costs', 'number', { 
            isCurrency: true,
            hint: 'Expected costs for any planned renovations or improvements'
          })}
        </div>

        {/* Additional Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Additional Details</h3>
          {renderInput('monthlyRent', 'Monthly Rent', 'number', { isCurrency: true })}
          {renderInput('rentIncrease', 'Annual Rent Increase (%)', 'number', { 
            isPercentage: true,
            hint: 'Expected yearly increase in rent'
          })}
          {renderInput('investmentReturn', 'Investment Return (%)', 'number', { 
            isPercentage: true,
            hint: 'Expected annual return on investments (e.g., stock market)'
          })}
          {renderInput('homeAppreciation', 'Home Appreciation (%)', 'number', { 
            isPercentage: true,
            hint: 'Expected annual increase in property value'
          })}
          {renderInput('maintenanceCost', 'Annual Maintenance (%)', 'number', { 
            isPercentage: true,
            hint: 'Percentage of property value spent on maintenance yearly'
          })}
          {renderInput('homeInsurance', 'Annual Insurance', 'number', { isCurrency: true })}
        </div>

        {/* Investment Toggle */}
        <div className="col-span-2">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showInvestmentComparison}
              onChange={(e) => setShowInvestmentComparison(e.target.checked)}
              className="rounded border-gray-300"
            />
            <label className="text-sm">
              Compare with renting + investing the difference 
              <span className="text-gray-500"> (assumes you invest both your down payment and monthly savings)</span>
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

        {/* Results Section */}
        <div className="col-span-2">
          {renderResults()}
        </div>
      </div>
    </div>
  );
};

export default BuyVsRentCalculator;


// "use client"

// import React, { useState } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// // Keep your existing MonthlyBreakdown, ResultsGraph, and calculateStampDuty functions as they are

// const MonthlyBreakdown = ({ monthlyMortgage = 0, maintenanceCost = 0, insurance = 0, rent = 0 }) => (
//   <div className="p-4 bg-gray-50 rounded-lg mt-4">
//     <h4 className="font-semibold mb-3">Monthly Cost Breakdown</h4>
//     <div className="grid grid-cols-2 gap-4">
//       <div>
//         <h5 className="font-medium mb-2">Buying Costs</h5>
//         <ul className="space-y-2">
//           <li>Mortgage: £{monthlyMortgage.toFixed(2)}</li>
//           <li>Maintenance: £{maintenanceCost.toFixed(2)}</li>
//           <li>Insurance: £{(insurance / 12).toFixed(2)}</li>
//           <li className="font-semibold border-t pt-1">
//             Total: £{(monthlyMortgage + maintenanceCost + (insurance / 12)).toFixed(2)}
//           </li>
//         </ul>
//       </div>
//       <div>
//         <h5 className="font-medium mb-2">Renting Costs</h5>
//         <ul className="space-y-2">
//           <li>Monthly Rent: £{rent.toFixed(2)}</li>
//           <li className="font-semibold border-t pt-1">
//             Total: £{rent.toFixed(2)}
//           </li>
//         </ul>
//       </div>
//     </div>
//   </div>
// );

// const ResultsGraph = ({ yearlyData }) => (
//   <div className="mt-6 h-96">
//     <ResponsiveContainer width="100%" height="100%">
//       <LineChart data={yearlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="year" label={{ value: 'Years', position: 'bottom' }} />
//         <YAxis 
//           label={{ value: 'Net Position (£)', angle: -90, position: 'left' }}
//           tickFormatter={(value) => `£${(value / 1000)}k`}
//         />
//         <Tooltip 
//           formatter={(value) => `£${value.toLocaleString()}`}
//           labelFormatter={(year) => `Year ${year}`}
//         />
//         <Legend />
//         <Line type="monotone" dataKey="buyingPosition" name="Buying" stroke="#2563eb" strokeWidth={2} />
//         <Line type="monotone" dataKey="rentingPosition" name="Renting" stroke="#dc2626" strokeWidth={2} />
//       </LineChart>
//     </ResponsiveContainer>
//   </div>
// );

// const calculateStampDuty = (price, isFirstTimeBuyer = false) => {
//   if (isFirstTimeBuyer) {
//     if (price <= 425000) return 0;
//     if (price <= 625000) {
//       const excess = Math.max(0, price - 425000);
//       return (excess * 0.05);
//     }
//   }
  
//   let stampDuty = 0;
//   if (price > 1500000) {
//     stampDuty += (price - 1500000) * 0.12;
//     price = 1500000;
//   }
//   if (price > 925000) {
//     stampDuty += (price - 925000) * 0.10;
//     price = 925000;
//   }
//   if (price > 250000) {
//     stampDuty += (price - 250000) * 0.05;
//   }
//   return stampDuty;
// };

// const BuyVsRentCalculator = () => {
//   const [inputs, setInputs] = useState({
//     housePrice: 281000,
//     downPayment: 10,
//     downPaymentType: 'percent',
//     mortgageRate: 4.85,
//     mortgageTerm: 25,
//     mortgageFees: 995,
//     legalFees: 1500,
//     renovationCosts: 0,
//     maintenanceCost: 1,
//     homeInsurance: 500,
//     monthlyRent: 1300,
//     rentIncrease: 2,
//     investmentReturn: 7,
//     homeAppreciation: 3,
//     isFirstTimeBuyer: false,
//     showInvestmentComparison: false
//   });

//   const [yearlyData, setYearlyData] = useState([]);
//   const [monthlyBreakdown, setMonthlyBreakdown] = useState({
//     monthlyMortgage: 0,
//     monthlyMaintenance: 0,
//     monthlyInsurance: 0,
//     monthlyRent: 0
//   });

//   const handleInputChange = (event) => {
//     const { name, value, type, checked } = event.target;
//     setInputs(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : Number(value)
//     }));
//   };

//   const handleCalculate = () => {
//     const downPaymentAmount = inputs.downPaymentType === 'percent' 
//       ? (inputs.housePrice * inputs.downPayment / 100)
//       : Number(inputs.downPayment);
      
//     const stampDuty = calculateStampDuty(Number(inputs.housePrice), inputs.isFirstTimeBuyer);
    
//     const monthlyRate = Number(inputs.mortgageRate) / 100 / 12;
//     const numPayments = Number(inputs.mortgageTerm) * 12;
//     const principal = Number(inputs.housePrice) - downPaymentAmount;
//     const monthlyMortgage = principal * 
//       (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
//       (Math.pow(1 + monthlyRate, numPayments) - 1);

//     const monthlyMaintenance = (Number(inputs.housePrice) * (Number(inputs.maintenanceCost) / 100)) / 12;
    
//     setMonthlyBreakdown({
//       monthlyMortgage,
//       monthlyMaintenance,
//       monthlyInsurance: Number(inputs.homeInsurance) / 12,
//       monthlyRent: Number(inputs.monthlyRent)
//     });

//     let currentHouseValue = Number(inputs.housePrice);
//     let currentRent = Number(inputs.monthlyRent);
//     let investmentValue = inputs.showInvestmentComparison ? downPaymentAmount : 0;
//     let yearlyData = [];

//     let totalBuyingCosts = downPaymentAmount + Number(inputs.mortgageFees) + Number(inputs.legalFees) + 
//                           stampDuty + Number(inputs.renovationCosts);

//     for(let year = 0; year <= inputs.mortgageTerm; year++) {
//       const yearlyMortgage = monthlyMortgage * 12;
//       const yearlyMaintenance = currentHouseValue * (Number(inputs.maintenanceCost) / 100);
//       const yearlyBuyingCosts = year === 0 ? totalBuyingCosts : 
//         (yearlyMortgage + yearlyMaintenance + Number(inputs.homeInsurance));
//       const yearlyRent = currentRent * 12;

//       if (inputs.showInvestmentComparison) {
//         investmentValue *= (1 + Number(inputs.investmentReturn) / 100);
//         if (year > 0) {
//           const monthlyDifference = (yearlyBuyingCosts - yearlyRent) / 12;
//           investmentValue += monthlyDifference * 12;
//         }
//       }

//       totalBuyingCosts += year === 0 ? 0 : yearlyBuyingCosts;
      
//       yearlyData.push({
//         year,
//         buyingPosition: currentHouseValue - totalBuyingCosts,
//         rentingPosition: investmentValue - (yearlyRent * (year + 1))
//       });

//       currentHouseValue *= (1 + Number(inputs.homeAppreciation) / 100);
//       currentRent *= (1 + Number(inputs.rentIncrease) / 100);
//     }

//     setYearlyData(yearlyData);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Property Details Column */}
//         <div className="space-y-4">
//           <h3 className="text-lg font-semibold">Property Details</h3>
          
//           {/* House Price */}
//           <div className="space-y-1">
//             <label htmlFor="housePrice" className="block text-sm font-medium">
//               House Price
//             </label>
//             <div className="relative">
//               <span className="absolute left-3 top-1/2 -translate-y-1/2">£</span>
//               <input
//                 type="number"
//                 id="housePrice"
//                 name="housePrice"
//                 value={inputs.housePrice}
//                 onChange={handleInputChange}
//                 className="w-full p-2 pl-8 border rounded"
//               />
//             </div>
//           </div>

//           {/* Down Payment */}
//           <div className="space-y-1">
//             <label htmlFor="downPayment" className="block text-sm font-medium">
//               Down Payment
//             </label>
//             <div className="flex gap-2">
//               <input
//                 type="number"
//                 id="downPayment"
//                 name="downPayment"
//                 value={inputs.downPayment}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded"
//               />
//               <select
//                 name="downPaymentType"
//                 value={inputs.downPaymentType}
//                 onChange={handleInputChange}
//                 className="p-2 border rounded"
//               >
//                 <option value="percent">%</option>
//                 <option value="absolute">£</option>
//               </select>
//             </div>
//           </div>

//           {/* Mortgage Rate */}
//           <div className="space-y-1">
//             <label htmlFor="mortgageRate" className="block text-sm font-medium">
//               Mortgage Interest Rate (%)
//             </label>
//             <input
//               type="number"
//               id="mortgageRate"
//               name="mortgageRate"
//               value={inputs.mortgageRate}
//               onChange={handleInputChange}
//               step="0.1"
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           {/* Mortgage Term */}
//           <div className="space-y-1">
//             <label htmlFor="mortgageTerm" className="block text-sm font-medium">
//               Mortgage Term (years)
//             </label>
//             <input
//               type="number"
//               id="mortgageTerm"
//               name="mortgageTerm"
//               value={inputs.mortgageTerm}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           {/* Mortgage Fees */}
//           <div className="space-y-1">
//             <label htmlFor="mortgageFees" className="block text-sm font-medium">
//               Mortgage Fees
//             </label>
//             <div className="relative">
//               <span className="absolute left-3 top-1/2 -translate-y-1/2">£</span>
//               <input
//                 type="number"
//                 id="mortgageFees"
//                 name="mortgageFees"
//                 value={inputs.mortgageFees}
//                 onChange={handleInputChange}
//                 className="w-full p-2 pl-8 border rounded"
//               />
//             </div>
//           </div>

//           {/* Legal Fees */}
//           <div className="space-y-1">
//             <label htmlFor="legalFees" className="block text-sm font-medium">
//               Legal Fees
//             </label>
//             <div className="relative">
//               <span className="absolute left-3 top-1/2 -translate-y-1/2">£</span>
//               <input
//                 type="number"
//                 id="legalFees"
//                 name="legalFees"
//                 value={inputs.legalFees}
//                 onChange={handleInputChange}
//                 className="w-full p-2 pl-8 border rounded"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Additional Details Column */}
//         <div className="space-y-4">
//           <h3 className="text-lg font-semibold">Additional Details</h3>

//           {/* Monthly Rent */}
//           <div className="space-y-1">
//             <label htmlFor="monthlyRent" className="block text-sm font-medium">
//               Monthly Rent
//             </label>
//             <div className="relative">
//               <span className="absolute left-3 top-1/2 -translate-y-1/2">£</span>
//               <input
//                 type="number"
//                 id="monthlyRent"
//                 name="monthlyRent"
//                 value={inputs.monthlyRent}
//                 onChange={handleInputChange}
//                 className="w-full p-2 pl-8 border rounded"
//               />
//             </div>
//           </div>

//           {/* Rent Increase */}
//           <div className="space-y-1">
//             <label htmlFor="rentIncrease" className="block text-sm font-medium">
//               Annual Rent Increase (%)
//             </label>
//             <input
//               type="number"
//               id="rentIncrease"
//               name="rentIncrease"
//               value={inputs.rentIncrease}
//               onChange={handleInputChange}
//               step="0.1"
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           {/* Investment Return */}
//           <div className="space-y-1">
//             <label htmlFor="investmentReturn" className="block text-sm font-medium">
//               Investment Return Rate (%)
//             </label>
//             <input
//               type="number"
//               id="investmentReturn"
//               name="investmentReturn"
//               value={inputs.investmentReturn}
//               onChange={handleInputChange}
//               step="0.1"
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           {/* Home Appreciation */}
//           <div className="space-y-1">
//             <label htmlFor="homeAppreciation" className="block text-sm font-medium">
//               Home Appreciation Rate (%)
//             </label>
//             <input
//               type="number"
//               id="homeAppreciation"
//               name="homeAppreciation"
//               value={inputs.homeAppreciation}
//               onChange={handleInputChange}
//               step="0.1"
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           {/* Maintenance Cost */}
//           <div className="space-y-1">
//             <label htmlFor="maintenanceCost" className="block text-sm font-medium">
//               Annual Maintenance (% of property value)
//             </label>
//             <input
//               type="number"
//               id="maintenanceCost"
//               name="maintenanceCost"
//               value={inputs.maintenanceCost}
//               onChange={handleInputChange}
//               step="0.1"
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           {/* Home Insurance */}
//           <div className="space-y-1">
//             <label htmlFor="homeInsurance" className="block text-sm font-medium">
//               Annual Home Insurance
//             </label>
//             <div className="relative">
//               <span className="absolute left-3 top-1/2 -translate-y-1/2">£</span>
//               <input
//                 type="number"
//                 id="homeInsurance"
//                 name="homeInsurance"
//                 value={inputs.homeInsurance}
//                 onChange={handleInputChange}
//                 className="w-full p-2 pl-8 border rounded"
//               />
//             </div>
//           </div>

//           {/* Renovation Costs */}
//           <div className="space-y-1">
//             <label htmlFor="renovationCosts" className="block text-sm font-medium">
//               Renovation Costs
//             </label>
//             <div className="relative">
//               <span className="absolute left-3 top-1/2 -translate-y-1/2">£</span>
//               <input
//                 type="number"
//                 id="renovationCosts"
//                 name="renovationCosts"
//                 value={inputs.renovationCosts}
//                 onChange={handleInputChange}
//                 className="w-full p-2 pl-8 border rounded"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Toggle Switches */}
//         <div className="col-span-2 space-y-4">
//           {/* First-Time Buyer Toggle */}
//           <div className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               id="isFirstTimeBuyer"
//               name="isFirstTimeBuyer"
//               checked={inputs.isFirstTimeBuyer}
//               onChange={handleInputChange}
//               className="rounded border-gray-300"
//             />
//             <label htmlFor="isFirstTimeBuyer" className="text-sm">
//               First-time buyer
//             </label>
//           </div>

//           {/* Investment Comparison Toggle */}
//           <div className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               id="showInvestmentComparison"
//               name="showInvestmentComparison"
//               checked={inputs.showInvestmentComparison}
//               onChange={handleInputChange}
//               className="rounded border-gray-300"
//             />
//             <label htmlFor="showInvestmentComparison" className="text-sm">
//               Compare with renting + investing the difference
//             </label>
//           </div>
//         </div>

//         {/* Calculate Button */}
//         <div className="col-span-2">
//           <button
//             onClick={handleCalculate}
//             className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Calculate
//           </button>
//         </div>

//         {/* Results Section */}
//         {/* <div className="col-span-2">
//           {monthlyBreakdown && (
//             <MonthlyBreakdown
//               monthlyMortgage={monthlyBreakdown.monthlyMortgage}
//               maintenanceCost={monthlyBreakdown.monthlyMaintenance}
//               insurance={monthlyBreakdown.monthlyInsurance}
//               rent={monthlyBreakdown.monthlyRent}
//             />
//           )}
          
//           {yearlyData.length > 0 && (
//             <ResultsGraph yearlyData={yearlyData} />
//           )}
//         </div> */}

//         {/* Results Section */}
//         <div className="col-span-2">
//           {monthlyBreakdown && (
//             <MonthlyBreakdown
//               monthlyMortgage={monthlyBreakdown.monthlyMortgage}
//               maintenanceCost={monthlyBreakdown.monthlyMaintenance}
//               insurance={monthlyBreakdown.monthlyInsurance}
//               rent={monthlyBreakdown.monthlyRent}
//             />
//           )}
          
//           {results && (
//             <div className="mt-8">
//               <h2 className="text-2xl font-bold text-center mb-6">
//                 Results After {inputs.mortgageTerm} Years
//               </h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                 <div className="p-6 bg-gray-50 rounded-lg">
//                   <h3 className="text-lg font-bold text-center mb-4">Buying Scenario</h3>
//                   <div className="text-center space-y-4">
//                     <div>
//                       <p className="text-red-600">Total Costs: £{results.buyingTotal.toLocaleString()}</p>
//                       <p className="text-sm text-gray-600 mt-1">Everything you&apos;ll pay over {inputs.mortgageTerm} years</p>
//                     </div>
//                     <div>
//                       <p className="text-green-600">House Value: £{results.finalHouseValue.toLocaleString()}</p>
//                       <p className="text-sm text-gray-600 mt-1">What your property could be worth</p>
//                     </div>
//                     <div>
//                       <p className={results.buyingNetPosition >= 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
//                         Net Position: £{results.buyingNetPosition.toLocaleString()}
//                       </p>
//                       <p className="text-sm text-gray-600 mt-1">House value minus all costs</p>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="p-6 bg-gray-50 rounded-lg">
//                   <h3 className="text-lg font-bold text-center mb-4">Renting Scenario</h3>
//                   <div className="text-center space-y-4">
//                     <div>
//                       <p className="text-red-600">Total Rent: £{results.totalRent.toLocaleString()}</p>
//                       <p className="text-sm text-gray-600 mt-1">Total rent with {inputs.rentIncrease}% annual increases</p>
//                     </div>
//                     {results.investmentValue > 0 && (
//                       <div>
//                         <p className="text-green-600">Investment Value: £{results.investmentValue.toLocaleString()}</p>
//                         <p className="text-sm text-gray-600 mt-1">Growth at {inputs.investmentReturn}% return</p>
//                       </div>
//                     )}
//                     <div>
//                       <p className={results.rentingNetPosition >= 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
//                         Net Position: £{results.rentingNetPosition.toLocaleString()}
//                       </p>
//                       <p className="text-sm text-gray-600 mt-1">
//                         {results.investmentValue > 0 
//                           ? "Investment value minus total rent paid" 
//                           : "Total cost of renting (no investments)"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-4 bg-blue-50 rounded-lg">
//                 <div className="text-center space-y-3">
//                   <p className="font-bold text-lg">
//                     {results.buyingNetPosition > results.rentingNetPosition ? "Buying" : "Renting"} is better by £{results.difference.toLocaleString()}
//                   </p>
//                   <div className="max-w-2xl mx-auto">
//                     <p className="text-sm text-gray-700 mb-2">
//                       This means after {inputs.mortgageTerm} years, {results.buyingNetPosition > results.rentingNetPosition ? "buying" : "renting"} leaves you £{results.difference.toLocaleString()} better off.
//                     </p>
//                     <div className="text-sm text-gray-700 text-left">
//                       <p className="font-medium mb-1">Understanding these numbers:</p>
//                       <ul className="list-disc pl-5 space-y-1">
//                         <li>Red numbers show costs (money you spend)</li>
//                         <li>Green numbers show value (what you gain)</li>
//                         <li>Net Position shows your overall financial position</li>
//                         <li>A negative Net Position means a cost, positive means a gain</li>
//                         <li>The option with the higher (less negative) Net Position is better</li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
          
//           {yearlyData.length > 0 && (
//             <ResultsGraph yearlyData={yearlyData} />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BuyVsRentCalculator