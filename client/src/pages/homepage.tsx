import React from "react";
import HealthImage from "../assets/healthcare-image1.jpg";
import DoctorKeywordSearch from './search';

const Homepage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full bg-blue-800 text-white shadow-lg z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="text-2xl font-bold">
            <a href="/" className="hover:text-gray-300">
              HealthConnect
            </a>
          </div>
          <ul className="flex space-x-6 text-lg">
            <li>
              <a href="#learn-more" className="hover:text-gray-300">
                Learn More
              </a>
            </li>
            <li>
              <a href="#features" className="hover:text-gray-300">
                Features
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-gray-300">
                Contact
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-gray-300">
                Login
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-blue-800 text-white w-full py-20 px-4 md:px-16 mt-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            Welcome to HealthConnect
          </h1>
          <p className="text-lg md:text-xl mb-4">
            A Unified Platform for Integrated Medical Records and Personalized Wellness Management
          </p>
          <p className="mb-8">
            Empowering both healthcare providers and patients to manage health data seamlessly, ensuring better care, better outcomes.
          </p>
          <a
            href="#learn-more"
            className="inline-block bg-white text-blue-800 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
          >
            Learn More
          </a>
        </div>
      </section>
      
      {/* Doctor Search Section */}
      <section className="bg-white py-12 px-4 md:px-16">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Find Your Perfect Healthcare Provider</h2>
          <p className="text-gray-600 mb-8">
            Search for doctors by name, specialization, or medical expertise
          </p>
          <DoctorKeywordSearch />
        </div>
      </section>

      {/* Image Section */}
      <section className="relative w-full">
        <img
          src={HealthImage}
          alt="Healthcare"
          className="w-full h-auto object-cover"
        />
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-16 bg-gray-100" id="features">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">Key Features of HealthConnect</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <h3 className="text-2xl font-medium mb-4">Medical Record Management</h3>
              <p className="text-gray-700">
                Securely manage and access patient medical histories, test results, and prescriptions for more informed healthcare.
              </p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <h3 className="text-2xl font-medium mb-4">Fitness & Nutrition Tracking</h3>
              <p className="text-gray-700">
                Monitor your health with personalized workout plans, nutrition tracking, and wellness insights tailored to your needs.
              </p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <h3 className="text-2xl font-medium mb-4">Real-Time Insights & Alerts</h3>
              <p className="text-gray-700">
                Receive health alerts and insights based on your fitness data, helping you and your healthcare provider take proactive actions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 md:px-16 bg-gray-50" id="contact">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">Get in Touch</h2>
          <p className="mb-6">
            We'd love to hear from you! Please fill out the form below to reach out.
          </p>
          <form className="max-w-md mx-auto">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Your name"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Your email"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                className="w-full px-4 py-2 border rounded-lg"
                rows={5}
                placeholder="Your message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
