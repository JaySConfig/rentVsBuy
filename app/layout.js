import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "UK Buy vs Rent Calculator",
    template: "%s | UK Buy vs Rent Calculator"
  },
  description: "Free calculator to compare the long-term costs of buying vs renting in the UK. Make informed property decisions with our comprehensive analysis tool.",
  keywords: ["buy vs rent calculator", "UK property calculator", "mortgage calculator", "rent or buy UK", "property investment", "UK housing costs"],
  openGraph: {
    title: "UK Buy vs Rent Calculator",
    description: "Compare buying vs renting costs in the UK with our free calculator. Make smarter property decisions.",
    type: "website",
    locale: "en_GB",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>{children}</body>
    </html>
  );
}