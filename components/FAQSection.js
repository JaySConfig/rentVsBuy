"use client";
// import { useState } from "react";

// const FAQItem = ({ question, answer }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="border-b border-gray-300">
//       <button
//         className="w-full text-left py-4 px-6 flex justify-between items-center font-semibold text-lg focus:outline-none"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <span>{question}</span>
//         <span className="text-gray-500">{isOpen ? "−" : "+"}</span>
//       </button>
//       {isOpen && <div className="px-6 pb-4 text-gray-700">{answer}</div>}
//     </div>
//   );
// };

// const FAQSection = () => {
//   const faqs = [
//     {
//       question: "📊 Is buying always cheaper than renting?",
//       answer:
//         "Not always. It depends on factors like property prices, mortgage rates, rent increases, and investment growth. This calculator helps you compare both options accurately.",
//     },
//     {
//       question: "💰 What costs are included in the calculation?",
//       answer:
//         "The calculator considers mortgage payments, home appreciation, maintenance costs, insurance, and more. For renting, it factors in rent increases and potential investment returns.",
//     },
//     {
//       question: "⏳ What happens if I move before my mortgage is paid off?",
//       answer:
//         "If you sell before your mortgage term ends, you'll need to factor in closing costs and potential property appreciation. The calculator helps you estimate total costs for different time frames.",
//     },
//     {
//       question: "📈 Does the calculator consider inflation?",
//       answer:
//         "Yes, rent increases and home appreciation rates are included, allowing you to see how costs change over time.",
//     },
//     {
//       question: "🔎 How accurate is this tool?",
//       answer:
//         "While this calculator provides a solid estimate, actual costs will vary based on market conditions and personal financial factors. Always consult a financial advisor for major decisions.",
//     },
//   ];

//   return (
//     <section className="max-w-3xl mx-auto mt-12 bg-white rounded-lg shadow-md p-6">
//       <h2 className="text-3xl font-extrabold text-center mb-6">❓ Frequently Asked Questions</h2>
//       <div className="divide-y divide-gray-200">
//         {faqs.map((faq, index) => (
//           <FAQItem key={index} {...faq} />
//         ))}
//       </div>
//     </section>
//   );
// };

////////

// export default FAQSection;"use client";"use client";
"use client";
import { useState } from "react";

const FAQSection = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqs = [
    {
      question: "📊 Is buying always cheaper than renting?",
      answer: "Not always. It depends on various factors including market conditions, how long you plan to stay, and investment opportunities."
    },
    {
      question: "💰 What costs are included in the calculation?",
      answer: "We include mortgage payments, down payment, stamp duty, legal fees, maintenance, insurance, rent increases, and potential investment returns."
    },
    {
      question: "⌛ What happens if I move before my mortgage is paid off?",
      answer: "The calculator can show outcomes for different timeframes, helping you understand the financial impact of selling early."
    },
    {
      question: "📈 Does the calculator consider inflation?",
      answer: "Yes, through home appreciation rates, rent increases, and investment returns - all adjustable to match your expectations."
    },
    {
      question: "🔍 How accurate is this tool?",
      answer: "While the calculator uses real market factors, actual results may vary based on market conditions and personal circumstances."
    }
  ];

  return (
    <div className="p-4 bg-base-100 w-full max-w-xl rounded-2xl mx-auto mt-8 mb-8">
      <div>
        <h3 className="opacity-90 text-xl font-semibold">Buy vs Rent Calculator</h3>
        <h4 className="mt-4 font-semibold opacity-90 text-lg">❓ Frequently Asked Questions</h4>
        
        <div className="mt-4 space-y-4">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                className="w-full text-left mt-4 font-semibold flex justify-between items-center"
              >
                {faq.question}
                <span className="text-gray-400">{openQuestion === index ? "-" : "+"}</span>
              </button>
              {openQuestion === index && (
                <p className="mt-2 text-base">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
