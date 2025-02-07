'use client';

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 text-black shadow-md">
      {/* NAVBAR START (Brand + Mobile Menu) */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>

          {/* MOBILE DROPDOWN */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow-lg bg-base-100 rounded-lg w-52"
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <details>
                <summary>Calculators</summary>
                <ul className="p-2 bg-base-100 shadow-lg rounded-lg">
                  <li><Link href="/calculators/roi-calculator">ROI Calculator</Link></li>
                  <li><Link href="/calculators/roas-calculator">ROAS Calculator</Link></li>
                  <li><Link href="/calculators/ltv-calculator">LTV Calculator</Link></li>
                  <li><Link href="/calculators/social-media-engagement-calculator">Social Media Engagement</Link></li>
                  <li><Link href="/calculators/cac-calculator">Customer Acquisition Cost</Link></li>
                  <li><Link href="/calculators/ppc-calculator">Pay per Click Calculator</Link></li>
                </ul>
              </details>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </div>
        {/* BRAND NAME */}
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Marketing Calculators
        </Link>
      </div>

      {/* NAVBAR CENTER (Desktop links) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <details>
              <summary>Calculators</summary>
              <ul className="p-2 bg-base-100 shadow-lg rounded-lg mt-2 z-50">
                <li><Link href="/calculators/roi-calculator">ROI Calculator</Link></li>
                <li><Link href="/calculators/roas-calculator">ROAS Calculator</Link></li>
                <li><Link href="/calculators/ltv-calculator">LTV Calculator</Link></li>
                <li><Link href="/calculators/social-media-engagement-calculator">Social Media Engagement</Link></li>
                <li><Link href="/calculators/cac-calculator">Customer Acquisition Cost</Link></li>
                <li><Link href="/calculators/ppc-calculator">Pay per Click Calculator</Link></li>
              </ul>
            </details>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}