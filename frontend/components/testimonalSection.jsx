import React from "react";
import { Quote } from "lucide-react";
import Image from "next/image";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "AI-ForCaST has revolutionized how we forecast and analyze data. The accuracy and insights provided have transformed our decision-making process completely!",
      name: "John Doe",
      position: "Data Scientist at TechCorp",
      company: "TechCorp"
    },
    {
      quote: "We have achieved incredible results with AI-ForCaST. The platform is intuitive, powerful, and the support team goes above and beyond expectations!",
      name: "Jane Smith",
      position: "CEO at GreenFuture",
      company: "GreenFuture"
    },
    {
      quote: "The sustainability insights provided by AI-ForCaST have been game-changing for our environmental initiatives. It's become an essential tool for our success.",
      name: "Alice Johnson",
      position: "Environmental Analyst",
      company: "EcoSolutions"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-indigo-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600">
            Discover how AI-ForCaST is transforming businesses worldwide through innovative AI solutions.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6">
                <Quote className="w-8 h-8 text-indigo-100 group-hover:text-indigo-200 transition-colors duration-300" />
              </div>

              {/* Content */}
              <div className="space-y-6">
                {/* Quote */}
                <p className="text-gray-700 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author Info */}
                <div className="flex items-center pt-4 border-t border-gray-100">
                  {/* Avatar */}
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-500">
                    <Image
                      src="/testimonials/john.jpg" 
                      alt={testimonial.name}
                      width={48}
                      height={44}
                      className="w-full h-full object-cover opacity-75 mix-blend-overlay"
                    />
                  </div>

                  {/* Name and Position */}
                  <div className="ml-4">
                    <h4 className="text-base font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <p className="text-sm text-gray-600">
                        {testimonial.position}
                      </p>
                      <span className="hidden sm:block text-gray-300">•</span>
                      <p className="text-sm font-medium text-indigo-600">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Join hundreds of satisfied clients who trust AI-ForCaST
          </p>
          <button className="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-indigo-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

// import React from "react";
// import { Quote } from "lucide-react";
// import Image from "next/image";

// const TestimonialsSection = () => {
//   const testimonials = [
//     {
//       quote: "AI-ForCaST has revolutionized how we forecast and analyze data. The accuracy and insights provided have transformed our decision-making process completely!",
//       name: "John Doe",
//       position: "Data Scientist at TechCorp",
//       company: "TechCorp"
//     },
//     {
//       quote: "We have achieved incredible results with AI-ForCaST. The platform is intuitive, powerful, and the support team goes above and beyond expectations!",
//       name: "Jane Smith",
//       position: "CEO at GreenFuture",
//       company: "GreenFuture"
//     },
//     {
//       quote: "The sustainability insights provided by AI-ForCaST have been game-changing for our environmental initiatives. It's become an essential tool for our success.",
//       name: "Alice Johnson",
//       position: "Environmental Analyst",
//       company: "EcoSolutions"
//     }
//   ];

//   return (
//     <section className="py-24 bg-gradient-to-b from-indigo-50 via-white to-indigo-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//             What Our Clients Say
//           </h2>
//           <p className="text-lg text-gray-600">
//             Discover how AI-ForCaST is transforming businesses worldwide through innovative AI solutions.
//           </p>
//         </div>

//         {/* Testimonials Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {testimonials.map((testimonial, index) => (
//             <div
//               key={index}
//               className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
//             >
//               {/* Quote Icon */}
//               <div className="absolute top-6 right-6">
//                 <Quote className="w-8 h-8 text-indigo-100 group-hover:text-indigo-200 transition-colors duration-300" />
//               </div>

//               {/* Content */}
//               <div className="space-y-6">
//                 {/* Quote */}
//                 <p className="text-gray-700 leading-relaxed">
//                   "{testimonial.quote}"
//                 </p>

//                 {/* Author Info */}
//                 <div className="flex items-center pt-4 border-t border-gray-100">
//                   {/* Avatar */}
//                   <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-500">
//                     <Image
//                       src="/api/placeholder/48/48"
//                       alt={testimonial.name}
//                       className="w-full h-full object-cover opacity-75 mix-blend-overlay"
//                     />
//                   </div>

//                   {/* Name and Position */}
//                   <div className="ml-4">
//                     <h4 className="text-base font-semibold text-gray-900">
//                       {testimonial.name}
//                     </h4>
//                     <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
//                       <p className="text-sm text-gray-600">
//                         {testimonial.position}
//                       </p>
//                       <span className="hidden sm:block text-gray-300">•</span>
//                       <p className="text-sm font-medium text-indigo-600">
//                         {testimonial.company}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* CTA Section */}
//         <div className="mt-16 text-center">
//           <p className="text-gray-600 mb-6">
//             Join hundreds of satisfied clients who trust AI-ForCaST
//           </p>
//           <button className="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-indigo-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
//             Start Your Journey
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TestimonialsSection;