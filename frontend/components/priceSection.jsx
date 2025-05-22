'use client'
import React from "react";

const PricingSection = () => {
  const pricingPlans = [
    {
      title: "Basic",
      price: "$19/month",
      features: ["Feature 1", "Feature 2", "Feature 3"],
      buttonLabel: "Choose Basic",
    },
    {
      title: "Pro",
      price: "$49/month",
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
      buttonLabel: "Choose Pro",
      isPopular: true,
    },
    {
      title: "Enterprise",
      price: "$99/month",
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
      buttonLabel: "Choose Enterprise",
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
          Our Pricing Plans
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Choose a plan that suits your needs and scale your business with AI-ForCaST.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white ${
                plan.isPopular ? "border-2 border-blue-500" : ""
              }`}
            >
              {plan.isPopular && (
                <p className="bg-blue-500 text-white text-xs uppercase font-bold py-1 px-4 rounded-full inline-block mb-4">
                  Most Popular
                </p>
              )}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {plan.title}
              </h3>
              <p className="text-4xl font-bold text-blue-500 mb-4">
                {plan.price}
              </p>
              <ul className="text-gray-600 mb-6 space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>• {feature}</li>
                ))}
              </ul>
              <button className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-blue-600 transition duration-300">
                {plan.buttonLabel}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
