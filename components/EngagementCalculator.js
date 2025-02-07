'use client';

import { useState } from 'react';

const EngagementCalculator = () => {
    const [likes, setLikes] = useState('');
    const [comments, setComments] = useState('');
    const [shares, setShares] = useState('');
    const [followers, setFollowers] = useState('');
    
    const [results, setResults] = useState({
        engagementRate: 0,
        totalEngagements: 0,
        showResults: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const totalLikes = parseFloat(likes) || 0;
        const totalComments = parseFloat(comments) || 0;
        const totalShares = parseFloat(shares) || 0;
        const totalFollowers = parseFloat(followers);

        const totalEngagements = totalLikes + totalComments + totalShares;
        const engagementRate = (totalEngagements / totalFollowers) * 100;

        setResults({
            engagementRate: engagementRate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            totalEngagements: totalEngagements.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
            showResults: true
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div className="text-left">
                        <label className="block text-xl font-semibold mb-2">
                            Total Likes
                        </label>
                        <input
                            type="number"
                            value={likes}
                            onChange={(e) => setLikes(e.target.value)}
                            className="w-full p-3 border rounded-lg bg-white text-lg"
                            placeholder="Enter number of likes"
                            required
                        />
                    </div>

                    <div className="text-left">
                        <label className="block text-xl font-semibold mb-2">
                            Total Comments
                        </label>
                        <input
                            type="number"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            className="w-full p-3 border rounded-lg bg-white text-lg"
                            placeholder="Enter number of comments"
                            required
                        />
                    </div>

                    <div className="text-left">
                        <label className="block text-xl font-semibold mb-2">
                            Total Shares
                        </label>
                        <input
                            type="number"
                            value={shares}
                            onChange={(e) => setShares(e.target.value)}
                            className="w-full p-3 border rounded-lg bg-white text-lg"
                            placeholder="Enter number of shares"
                            required
                        />
                    </div>

                    <div className="text-left">
                        <label className="block text-xl font-semibold mb-2">
                            Total Followers
                        </label>
                        <input
                            type="number"
                            value={followers}
                            onChange={(e) => setFollowers(e.target.value)}
                            className="w-full p-3 border rounded-lg bg-white text-lg"
                            placeholder="Enter total number of followers"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn bg-blue-800 text-white w-full text-lg py-3 mt-6"
                >
                    Calculate Engagement Rate
                </button>
            </form>

            {results.showResults && (
                <div className="mt-8 p-6 bg-base-100 rounded-2xl text-left">
                    <h3 className="text-2xl font-bold mb-4">Results</h3>
                    <div className="space-y-4 text-xl">
                        <p><span className="font-semibold">Total Engagements:</span> {results.totalEngagements}</p>
                        <p><span className="font-semibold">Engagement Rate:</span> {results.engagementRate}%</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EngagementCalculator;