'use client'
import React from "react";
import { ArrowRight, Phone, ChevronRight, Star } from "lucide-react";

const CallToActionSection = () => {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Enhanced gradient background with multiple layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-purple-500/10 to-transparent rotate-45 transform-gpu" />
      </div>

      {/* Main content container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Enhanced highlight badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 group hover:bg-white/20 transition-all duration-300">
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-sm text-white/90 ml-2 group-hover:text-white transition-colors duration-300">
              Transform your business today
            </span>
          </div>

          {/* Enhanced main heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight bg-clip-text">
            Ready to Transform Your Business with AI?
          </h2>

          {/* Enhanced description */}
          <p className="text-lg sm:text-xl text-white/90 mb-12 leading-relaxed max-w-2xl mx-auto">
            Join thousands of satisfied clients and experience the power of AI-driven forecasting.
            Take the next step towards a smarter, data-driven future.
          </p>

          {/* Enhanced buttons container */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Primary button */}
            <button className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-indigo-700 font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl hover:bg-indigo-50 transition-all duration-300 transform hover:-translate-y-1">
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            {/* Secondary button */}
            <button className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/80 text-white font-semibold py-4 px-8 rounded-full hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1">
              Contact Us
              <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
            </button>
          </div>

          {/* Enhanced trust indicators */}
          <div className="mt-16 pt-8 border-t border-white/10">
            {/* Stats section */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { value: '1000+', label: 'Clients' },
                { value: '98%', label: 'Satisfaction' },
                { value: '24/7', label: 'Support' },
                { value: '50+', label: 'Countries' }
              ].map((stat, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Company logos section */}
            <p className="text-white/80 mb-6 flex items-center justify-center gap-2">
              <Star className="w-4 h-4" />
              Trusted by industry leaders
            </p>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 items-center text-white/60">
              {['TechCorp', 'EcoSolutions', 'GreenFuture', 'DataTech'].map((company, index) => (
                <div key={index} className="flex items-center group">
                  <span className="text-sm font-semibold group-hover:text-white transition-colors duration-300">
                    {company}
                  </span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
// 'use client'
// import React from "react";
// import { ArrowRight, Phone } from "lucide-react";

// const CallToActionSection = () => {
//   return (
//     <section className="relative py-24 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//       {/* Background with gradient */}
//       <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800">
//         {/* Animated background elements */}
//         <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
//       </div>

//       {/* Content */}
//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//         <div className="max-w-3xl mx-auto">
//           {/* Highlight badge */}
//           <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
//             <span className="animate-pulse w-2 h-2 rounded-full bg-emerald-400 mr-2" />
//             <span className="text-sm text-white/90">Transform your business today</span>
//           </div>

//           {/* Main heading */}
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
//             Ready to Transform Your Business with AI?
//           </h2>

//           {/* Description */}
//           <p className="text-lg sm:text-xl text-white/90 mb-12 leading-relaxed">
//             Join thousands of satisfied clients and experience the power of AI-driven forecasting.
//             Take the next step towards a smarter, data-driven future.
//           </p>

//           {/* Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//             <button className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-indigo-700 font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105">
//               Get Started
//               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </button>
            
//             <button className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/80 text-white font-semibold py-3 px-8 rounded-full hover:bg-white/10 transition-all duration-300">
//               Contact Us
//               <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform" />
//             </button>
//           </div>

//           {/* Trust indicators */}
//           <div className="mt-12 pt-8 border-t border-white/10">
//             <p className="text-white/80 mb-4">Trusted by industry leaders</p>
//             <div className="flex flex-wrap justify-center gap-8 items-center text-white/60">
//               {['TechCorp', 'EcoSolutions', 'GreenFuture', 'DataTech'].map((company, index) => (
//                 <span key={index} className="text-sm font-semibold">
//                   {company}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       </div>
//     </section>
//   );
// };

// export default CallToActionSection;

// // 'use client'
// // import React from "react";

// // const CallToActionSection = () => {
// //   return (
// //     <section className="py-16 bg-blue-500 text-white text-center">
// //       <div className="max-w-6xl mx-auto px-6">
// //         <h2 className="text-3xl md:text-4xl font-bold mb-6">
// //           Ready to Transform Your Business?
// //         </h2>
// //         <p className="text-lg md:text-xl mb-8">
// //           Join thousands of satisfied clients and experience the power of AI-driven forecasting.
// //           Take the next step towards a smarter future.
// //         </p>
// //         <div>
// //           <button className="bg-white text-blue-500 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-100 transition duration-300">
// //             Get Started
// //           </button>
// //           <button className="ml-4 bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white hover:text-blue-500 transition duration-300">
// //             Contact Us
// //           </button>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default CallToActionSection;
