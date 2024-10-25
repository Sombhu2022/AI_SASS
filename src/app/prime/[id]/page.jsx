'use client'
import { useParams } from 'next/navigation';
import React from 'react';


function PlanDetails() {
  const { id } = useParams(); // Get the plan ID from the URL
  const plan = getPlanById(id); // Replace with actual data fetching

  // Example function for fetching plan details based on ID
  function getPlanById(planId) {
    const plans = [
      {
        id: '0',
        name: 'Basic',
        price: '$9.99 / month',
        description: 'Best for individual users or small teams looking to get started.',
        features: [
          { name: 'Standard Access', detail: 'Access to core features with limited usage.' },
          { name: '5 Project Limit', detail: 'Manage up to 5 projects simultaneously.' },
          { name: 'Email Support', detail: 'Reach out via email and get a response within 24 hours.' },
        ],
        support: {
          level: 'Basic',
          responseTime: '24 hours',
          channels: ['Email'],
        },
      },
      {
        id: '1',
        name: 'Pro',
        price: '$19.99 / month',
        description: 'Perfect for growing businesses that need advanced capabilities.',
        features: [
          { name: 'All Features Access', detail: 'Unlimited access to all available features.' },
          { name: '15 Project Limit', detail: 'Manage up to 15 projects with advanced tracking.' },
          { name: 'Priority Support', detail: 'Email and chat support with a 4-hour response time.' },
          { name: 'Analytics Dashboard', detail: 'Track project performance with detailed analytics.' },
        ],
        support: {
          level: 'Priority',
          responseTime: '4 hours',
          channels: ['Email', 'Live Chat'],
        },
      },
      {
        id: '2',
        name: 'Enterprise',
        price: '$49.99 / month',
        description: 'Ideal for large teams requiring full access and dedicated support.',
        features: [
          { name: 'Unlimited Projects', detail: 'No limit on the number of projects you can manage.' },
          { name: 'Advanced Analytics', detail: 'In-depth analysis and custom reporting.' },
          { name: 'Dedicated Account Manager', detail: 'Work with a manager to tailor solutions to your needs.' },
          { name: 'Custom Integrations', detail: 'Connect with third-party services and custom tools.' },
        ],
        support: {
          level: 'Dedicated',
          responseTime: 'Instant',
          channels: ['Phone', 'Email', 'Live Chat'],
        },
      },
    ];
    return plans.find((plan) => plan.id === planId);
  }

  return (
    <div className="min-h-screen flex items-center justify-center  p-6">
      <div className="bg-gray-100 shadow-lg rounded-lg w-full max-w-2xl p-8">
        {/* Plan Header */}
        <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">{plan.name} Plan</h1>
        <p className="text-2xl text-blue-600 font-semibold text-center mb-4">{plan.price}</p>
        <p className="text-center text-gray-600 mb-8">{plan.description}</p>

        {/* Features Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Features</h2>
          {plan.features.map((feature, idx) => (
            <div key={idx} className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{feature.name}</h3>
              <p className="text-gray-600">{feature.detail}</p>
            </div>
          ))}
        </div>

        {/* Support Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Support</h2>
          <p className="text-gray-600 mb-2"><strong>Support Level:</strong> {plan.support.level}</p>
          <p className="text-gray-600 mb-2"><strong>Response Time:</strong> {plan.support.responseTime}</p>
          <p className="text-gray-600"><strong>Available Channels:</strong> {plan.support.channels.join(', ')}</p>
        </div>

        {/* Payment Options */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Payment Options</h2>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition duration-200 mb-3">
            Pay Monthly
          </button>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition duration-200">
            Pay Annually (Save 10%)
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlanDetails;
