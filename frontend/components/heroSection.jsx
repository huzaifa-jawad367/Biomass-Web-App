"use client";
import React from "react";
import { ArrowRight, ChevronRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-900 via-indigo-700 to-indigo-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-10 -left-10 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute w-96 h-96 -bottom-10 -right-10 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:3rem_3rem]" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Main Heading with Gradient */}
        <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-white animate-gradient">
          Welcome to AI-ForCaST
        </h1>

        {/* Subheading */}
        <p className="text-sm sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
          Revolutionizing the future with cutting-edge AI forecasting solutions
          that transform data into actionable insights.
        </p>

        {/* Buttons Container */}
        <div className="flex flex-row gap-4 justify-center items-center">
          <button className="group flex text-sm sm:text-lg items-center justify-center gap-2 bg-white text-indigo-900 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105">
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button className="group flex text-sm sm:text-lg items-center justify-center gap-2 bg-transparent border-2 border-white/80 text-white font-semibold py-3 px-8 rounded-full hover:bg-white/10 transition-all duration-300">
            Learn More
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Feature Pills */}
        <div className="mt-12 flex flex-wrap justify-center gap-3 text-sm text-gray-200">
          {[
            "Advanced Analytics",
            "Real-time Forecasting",
            "Machine Learning",
            "Data Visualization",
          ].map((feature, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-colors duration-300"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

// 'use client'
// import React from "react";
// import Image from "next/image";
// import HeroImg from '../assets/heroSection/image1.jpeg'

// const HeroSection = () => {
//   return (
//     <section className="relative bg-blue-500 text-white h-[80vh] w-full flex items-center justify-center">
//       <div className="absolute inset-0 overflow-hidden">
//         <Image
//           src={HeroImg} // Replace with your image path
//           alt="Background Image"
//           layout="fill"
//           objectFit="cover"
//           objectPosition="center"
//           className="opacity-50"
//         />
//       </div>

//       <div className="relative z-10 text-center px-4">
//         <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to AI-ForCaST</h1>
//         <p className="text-lg md:text-xl mb-6">
//           Revolutionizing the future with cutting-edge AI forecasting solutions.
//         </p>
//         <div>
//           <button className="bg-white text-blue-500 font-semibold py-2 px-6 rounded-full shadow-lg hover:bg-blue-100 transition duration-300">
//             Get Started
//           </button>
//           <button className="ml-4 bg-transparent border-2 border-white text-white font-semibold py-2 px-6 rounded-full hover:bg-white hover:text-blue-500 transition duration-300">
//             Learn More
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
