'use client';

import { useState } from 'react';

const PPCCalculator = () => {
    const [adSpend, setAdSpend] = useState('');
    const [cpc, setCpc] = useState('');
    const [conversionRate, setConversionRate] = useState('');
    const [orderValue, setOrderValue] = useState('');
    
    const [results, setResults] = useState({
        clicks: 0,
        conversions: 0,
        revenue: 0,
        profit: 0,
        showResults: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const spend = parseFloat(adSpend);
        const costPerClick = parseFloat(cpc);
        const convRate = parseFloat(conversionRate) / 100; // Convert percentage to decimal
        const avgOrderValue = parseFloat(orderValue);

        const totalClicks = spend / costPerClick;
        const totalConversions = totalClicks * convRate;
        const totalRevenue = totalConversions * avgOrderValue;
        const profit = totalRevenue - spend;

        setResults({
            clicks: totalClicks.toLocaleString('en-US', { maximumFractionDigits: 0 }),
            conversions: totalConversions.toLocaleString('en-US', { maximumFractionDigits: 0 }),
            revenue: totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            profit: profit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            showResults: true
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div className="text-left">
                        <label className="block text-xl font-semibold mb-2">
                            Monthly Ad Spend ($)
                        </label>
                        <input
                            type="number"
                            value={adSpend}
                            onChange={(e) => setAdSpend(e.target.value)}
                            className="w-full p-3 border rounded-lg bg-white text-lg"
                            placeholder="Enter your monthly PPC budget"
                            required
                        />
                    </div>

                    <div className="text-left">
                        <label className="block text-xl font-semibold mb-2">
                            Average Cost per Click ($)
                        </label>
                        <input
                            type="number"
                            value={cpc}
                            onChange={(e) => setCpc(e.target.value)}
                            className="w-full p-3 border rounded-lg bg-white text-lg"
                            placeholder="Enter your average CPC"
                            step="0.01"
                            required
                        />
                    </div>

                    <div className="text-left">
                        <label className="block text-xl font-semibold mb-2">
                            Conversion Rate (%)
                        </label>
                        <input
                            type="number"
                            value={conversionRate}
                            onChange={(e) => setConversionRate(e.target.value)}
                            className="w-full p-3 border rounded-lg bg-white text-lg"
                            placeholder="Enter expected conversion rate"
                            step="0.1"
                            required
                        />
                    </div>

                    <div className="text-left">
                        <label className="block text-xl font-semibold mb-2">
                            Average Order Value ($)
                        </label>
                        <input
                            type="number"
                            value={orderValue}
                            onChange={(e) => setOrderValue(e.target.value)}
                            className="w-full p-3 border rounded-lg bg-white text-lg"
                            placeholder="Enter average order value"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn bg-blue-800 text-white w-full text-lg py-3 mt-6"
                >
                    Calculate PPC Results
                </button>
            </form>

            {results.showResults && (
                <div className="mt-8 p-6 bg-base-100 rounded-2xl text-left">
                    <h3 className="text-2xl font-bold mb-4">Results</h3>
                    <div className="space-y-4 text-xl">
                        <p><span className="font-semibold">Expected Clicks:</span> {results.clicks}</p>
                        <p><span className="font-semibold">Expected Conversions:</span> {results.conversions}</p>
                        <p><span className="font-semibold">Projected Revenue:</span> ${results.revenue}</p>
                        <p><span className="font-semibold">Projected Profit:</span> ${results.profit}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PPCCalculator;
