import React from 'react'

const AboutPage = () => {
  return (
    <div className="top-16 min-h-screen  flex flex-col items-center justify-center ">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-7xl">
        <h1 className="text-3xl font-bold mb-4 text-center text-indigo-600">AI-ForCaST</h1>
        <p className="text-gray-700 text-lg mb-4 leading-relaxed">
          Welcome to our website! We are committed to providing top-notch services and products to our users.
          Our mission is to deliver value through innovation and dedication. 
        </p>
        <p className="text-gray-700 text-lg mb-4 leading-relaxed">
          Founded in [Year], we have been constantly growing and adapting to meet the needs of our customers.
          Whether it is technology, design, or customer service, our team strives for excellence in all aspects.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h2>
        <p className="text-gray-700 text-lg mb-4 leading-relaxed">
          To become a global leader in our industry, known for innovation, quality, and customer satisfaction.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Team</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Our team is composed of passionate and skilled individuals from diverse backgrounds, all working together
          to achieve our shared goals. We believe in fostering a culture of collaboration, learning, and respect.
        </p>
      </div>
    </div>
  )
}

export default AboutPage