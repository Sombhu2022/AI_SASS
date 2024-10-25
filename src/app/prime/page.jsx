import Link from 'next/link';
import React from 'react';

function Prime() {
  const plans = [
    {
      name: 'Basic',
      price: '$9.99 / month',
      features: [
        'Access to standard features',
        'Up to 5 projects',
        'Basic support',
      ],
    },
    {
      name: 'Pro',
      price: '$19.99 / month',
      features: [
        'Access to all features',
        'Up to 15 projects',
        'Priority support',
        'Analytics dashboard',
      ],
    },
    {
      name: 'Enterprise',
      price: '$49.99 / month',
      features: [
        'Unlimited projects',
        'Advanced analytics',
        'Dedicated support',
        'Custom solutions',
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  py-10">
      <h1 className="text-4xl font-bold text-gray-200 mb-8">Prime Plans</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {plans.map((plan, index) => (
          <div key={index} className="bg-gray-200 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">{plan.name}</h2>
            <p className="text-xl text-blue-600 font-bold mb-4">{plan.price}</p>
            
            <ul className="mb-6">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="text-gray-600 mb-2 flex items-center">
                  <span className="mr-2 text-blue-500">✔</span> {feature}
                </li>
              ))}
            </ul>
            
            <Link href={`/prime/${index}`}  className=''>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200">
              Select {plan.name}
            </button>
            
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Prime;
