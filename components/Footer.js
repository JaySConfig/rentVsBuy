'use client';

import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-base-100 mt-auto">
            <div className="max-w-6xl mx-auto p-8">
                {/* Navigation Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-black">
                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {/* <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
                            <li><Link href="/about" className="hover:text-blue-600">About</Link></li> */}
                        </ul>
                    </div>

                    {/* Calculators */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Calculators</h3>
                        <ul className="space-y-2">
                            {/* <li><Link href="/calculators/roi-calculator" className="hover:text-blue-600">ROI Calculator</Link></li>
                            <li><Link href="/calculators/roas-calculator" className="hover:text-blue-600">ROAS Calculator</Link></li>
                            <li><Link href="/calculators/ltv-calculator" className="hover:text-blue-600">LTV Calculator</Link></li>
                            <li><Link href="/calculators/cac-calculator" className="hover:text-blue-600">CAC Calculator</Link></li> */}

                        </ul>
                    </div>

                    {/* More Calculators */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">More Tools</h3>
                        {/* <ul className="space-y-2"> */}
                            {/* <li><Link href="/calculators/social-media-engagement-calculator" className="hover:text-blue-600">Social Media Calculator</Link></li>
                            <li><Link href="/calculators/ppc-calculator" className="hover:text-blue-600">PPC Calculator</Link></li>
                        </ul> */}
                    </div>
                </div>

                {/* Copyright and Disclaimer */}
                <div className="border-t border-gray-200 pt-8 text-center text-gray-600">
                    <p className="mb-2">
                        These calculators are for informational purposes only. Please consult with marketing professionals for specific advice.
                    </p>
                    <p>
                        © 2024 Marketing Calculators. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;