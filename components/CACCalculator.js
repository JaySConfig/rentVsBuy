'use client';

import { parse } from 'postcss';
import { useState } from 'react';

const CACCalculator = () => {
    const [totalMarketing, setTotalMarketing] = useState('');
    const [newCustomers, setTotalNewCustomers] = useState('');
    // const [orderValue, setOrderValue] = useState('');
    // const [frequency, setFrequency] = useState('');
    // const [lifespan, setLifespan] = useState('');
    
    const [results, setResults] = useState({
        cac: 0,
        
        showResults: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const totalMarketingCost = parseFloat(totalMarketing);
        const newCustomersAcquired = parseFloat(newCustomers);

        const cac = totalMarketingCost / newCustomersAcquired
        
        // const avgOrderValue = parseFloat(orderValue);
        // const purchaseFrequency = parseFloat(frequency);
        // const customerLifespan = parseFloat(lifespan);

        // const ltv = avgOrderValue * purchaseFrequency * customerLifespan;
        // const annualValue = avgOrderValue * purchaseFrequency;

        setResults({
            cac: cac.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            showResults: true
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div className="text-left">
                        <label className="block text-xl font-semibold mb-2">
                            Total Marketing Cost ($)
                        </label>
                        <input
                            type="number"
                            value={totalMarketing}
                            onChange={(e) => setTotalMarketing(e.target.value)}
                            className="w-full p-3 border rounded-lg bg-white text-lg"
                            placeholder="Enter your total marketing cost"
                            required
                        />
                    </div>

                    <div className="text-left">
                        <label className="block text-xl font-semibold mb-2">
                            New Customers Acquired
                        </label>
                        <input
                            type="number"
                            value={newCustomers}
                            onChange={(e) => setTotalNewCustomers(e.target.value)}
                            className="w-full p-3 border rounded-lg bg-white text-lg"
                            placeholder="Enter how many purchases within your specified timeframe"
                            required
                        />
                    </div>

                    
                </div>

                <button
                    type="submit"
                    className="btn bg-blue-800 text-white w-full text-lg py-3 mt-6"
                >
                    Calculate CAC
                </button>
            </form>

            {results.showResults && (
                <div className="mt-8 p-6 bg-base-100 rounded-2xl text-left">
                    <h3 className="text-2xl font-bold mb-4">Results</h3>
                    <div className="space-y-4 text-xl">
                        <p><span className="font-semibold">Customer Acquisition Cost</span> ${results.cac}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CACCalculator;