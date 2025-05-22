'use client'
import React, { useState } from "react";
import { ChevronDown, Search, PlusCircle } from "lucide-react";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      question: "What is AI-ForCaST and how does it work?",
      answer: "AI-ForCaST is an advanced forecasting platform that leverages artificial intelligence to help businesses make data-driven decisions. Our technology combines machine learning algorithms with comprehensive data analysis to provide accurate predictions and actionable insights.",
      category: "General"
    },
    {
      question: "How can I get started with AI-ForCaST?",
      answer: "Getting started is simple! Choose a plan that fits your needs, create an account, and you will have immediate access to our platform. Our onboarding process guides you through setting up your first forecast, and our support team is always available to help.",
      category: "Getting Started"
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes! We offer a comprehensive 14-day free trial that gives you full access to all premium features. No credit card required. You can explore the platform, test our forecasting capabilities, and see the value AI-ForCaST brings to your business.",
      category: "Pricing"
    },
    {
      question: "What kind of support and training do you offer?",
      answer: "We provide 24/7 customer support through multiple channels including email, live chat, and phone. Additionally, you'll have access to our extensive knowledge base, video tutorials, and regular webinars. Enterprise clients receive dedicated account managers and customized training sessions.",
      category: "Support"
    },
    {
      question: "How accurate are the AI-ForCaST predictions?",
      answer: "Our AI models consistently achieve accuracy rates of 85-95% across various industries. We continuously train and refine our models using the latest data, and provide confidence intervals with all predictions to ensure transparency.",
      category: "Technical"
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Everything you need to know about AI-ForCaST. Can not find what you are looking for? Just ask our support team.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-300"
            />
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              className="group border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <button
                className="w-full flex justify-between items-center p-6 text-left bg-white hover:bg-gray-50 transition-colors duration-300"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex items-center gap-4">
                  <PlusCircle className={`w-5 h-5 text-indigo-600 transition-transform duration-300 ${
                    activeIndex === index ? 'rotate-45' : ''
                  }`} />
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                  activeIndex === index ? 'rotate-180' : ''
                }`} />
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${
                activeIndex === index ? 'max-h-96' : 'max-h-0'
              }`}>
                <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                  {faq.answer}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="inline-block px-3 py-1 text-sm text-indigo-600 bg-indigo-50 rounded-full">
                      {faq.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <button className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-indigo-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;