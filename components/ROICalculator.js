'use client';

import { useState } from 'react';

const ROICalculator = () => {
    // State for form inputs
    const [adSpend, setAdSpend] = useState('');
    const [revenue, setRevenue] = useState('');
    const [conversionRate, setConversionRate] = useState('');
    
    // State for results
    const [results, setResults] = useState({
        profit: 0,
        roi: 0,
        showResults: false
    });

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Convert inputs to numbers
        const spend = parseFloat(adSpend);
        const rev = parseFloat(revenue);
        const conv = parseFloat(conversionRate);

        // Calculate profit and ROI
        const profit = rev - spend;
        const roi = ((profit) / spend) * 100;

        // Update results
        setResults({
            profit: profit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            roi: roi.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            showResults: true
        });
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6 text-black text-center">Marketing ROI Calculator</h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2 text-black">
                    <label className="block text-sm font-medium">
                        Ad Spend ($)
                    </label>
                    <input
                        type="number"
                        value={adSpend}
                        onChange={(e) => setAdSpend(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Enter ad spend"
                        required
                    />
                </div>

                <div className="space-y-2 text-black">
                    <label className="block text-sm font-medium">
                        Revenue ($)
                    </label>
                    <input
                        type="number"
                        value={revenue}
                        onChange={(e) => setRevenue(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Enter revenue"
                        required
                    />
                </div>

                {/* <div className="space-y-2">
                    <label className="block text-sm font-medium">
                        Conversion Rate (%)
                    </label>
                    <input
                        type="number"
                        value={conversionRate}
                        onChange={(e) => setConversionRate(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Enter conversion rate"
                        required
                    />
                </div> */}

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Calculate ROI
                </button>
            </form>

            {results.showResults && (
                <div className="mt-6 p-4 bg-gray-50 rounded text-black
                ">
                    <h3 className="text-lg font-semibold mb-2">Results</h3>
                    <div className="space-y-2">
                        <p>Profit: ${results.profit}</p>
                        <p>ROI: {results.roi}%</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ROICalculator;