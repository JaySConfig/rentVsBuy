'use client';

import { useState } from 'react';

const LTVCalculator = () => {
    const [orderValue, setOrderValue] = useState('');
    const [frequency, setFrequency] = useState('');
    const [lifespan, setLifespan] = useState('');
    
    const [results, setResults] = useState({
        ltv: 0,
        annualValue: 0,
        showResults: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const avgOrderValue = parseFloat(orderValue);
        const purchaseFrequency = parseFloat(frequency);
        const customerLifespan = parseFloat(lifespan);

        const ltv = avgOrderValue * purchaseFrequency * customerLifespan;
        const annualValue = avgOrderValue * purchaseFrequency;

        setResults({
            ltv: ltv.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            annualValue: annualValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            showResults: true
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div className="text-left">
                        <label className="block text-xl font-semibold mb-2">
                            Average Order Value ($)
                        </label>
                        <input
                            type="number"
                            value={orderValue}
                            onChange={(e) => setOrderValue(e.target.value)}
                            className="w-full p-3 border rounded-lg bg-white text-lg"
                            placeholder="Enter average amount spent per purchase"
                            required
                        />
                    </div>

                    <div className="text-left">
                        <label className="block text-xl font-semibold mb-2">
                            Purchase Frequency (per year)
                        </label>
                        <input
                            type="number"
                            value={frequency}
                            onChange={(e) => setFrequency(e.target.value)}
                            className="w-full p-3 border rounded-lg bg-white text-lg"
                            placeholder="Enter how many purchases per year"
                            required
                        />
                    </div>

                    <div className="text-left">
                        <label className="block text-xl font-semibold mb-2">
                            Customer Lifespan (years)
                        </label>
                        <input
                            type="number"
                            value={lifespan}
                            onChange={(e) => setLifespan(e.target.value)}
                            className="w-full p-3 border rounded-lg bg-white text-lg"
                            placeholder="Enter average customer relationship length"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn bg-blue-800 text-white w-full text-lg py-3 mt-6"
                >
                    Calculate LTV
                </button>
            </form>

            {results.showResults && (
                <div className="mt-8 p-6 bg-base-100 rounded-2xl text-left">
                    <h3 className="text-2xl font-bold mb-4">Results</h3>
                    <div className="space-y-4 text-xl">
                        <p><span className="font-semibold">Annual Value:</span> ${results.annualValue}</p>
                        <p><span className="font-semibold">Lifetime Value:</span> ${results.ltv}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LTVCalculator;