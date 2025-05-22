'use client'
import React from "react";
import { BarChart3, Leaf, Settings, ArrowRight } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <BarChart3 className="w-12 h-12" />,
      title: "Advanced Analytics",
      description: "Harness the power of AI to provide accurate and insightful forecasting solutions that drive business growth.",
      color: "from-blue-600 to-indigo-600",
      hover: "group-hover:text-blue-600"
    },
    {
      icon: <Leaf className="w-12 h-12" />,
      title: "Sustainability Focus",
      description: "Promoting sustainable practices with data-driven environmental insights that shape a better future.",
      color: "from-emerald-600 to-green-600",
      hover: "group-hover:text-emerald-600"
    },
    {
      icon: <Settings className="w-12 h-12" />,
      title: "Customizable Tools",
      description: "Tailor our solutions to meet the specific needs of your organization with flexible, powerful tools.",
      color: "from-purple-600 to-pink-600",
      hover: "group-hover:text-purple-600"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Discover the innovative features that make AI-ForCaST the leading choice for AI-powered forecasting solutions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl" />

              {/* Icon Container */}
              <div className={`mb-6 text-gray-700 ${feature.hover} transition-colors duration-300`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {feature.description}
              </p>

              {/* Learn More Link */}
              <div className="flex items-center text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                Learn More 
                <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button className="inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-indigo-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
            Get Started Now
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

// 'use client'
// import React from "react";
// import { FaChartLine, FaLeaf, FaCogs } from "react-icons/fa";

// const FeaturesSection = () => {
//   const features = [
//     {
//       icon: <FaChartLine className="text-blue-500 text-4xl mb-4" />,
//       title: "Advanced Analytics",
//       description: "Harness the power of AI to provide accurate and insightful forecasting solutions."
//     },
//     {
//       icon: <FaLeaf className="text-green-500 text-4xl mb-4" />,
//       title: "Sustainability Focus",
//       description: "Promoting sustainable practices with data-driven environmental insights."
//     },
//     {
//       icon: <FaCogs className="text-gray-500 text-4xl mb-4" />,
//       title: "Customizable Tools",
//       description: "Tailor our solutions to meet the specific needs of your organization."
//     }
//   ];

//   return (
//     <section className="py-16 bg-gray-100 text-center">
//       <div className="max-w-6xl mx-auto px-6">
//         <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">Our Features</h2>
//         <p className="text-lg text-gray-600 mb-12">
//           Discover the unique features that make AI-ForCaST the leading choice for AI forecasting solutions.
//         </p>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
//             >
//               {feature.icon}
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
//               <p className="text-gray-600">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturesSection;
