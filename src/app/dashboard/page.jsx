'use client'
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Link from 'next/link';
import axios from 'axios';
import Loader from '@/components/Loader';
import SpinnerLoader from '@/components/SpinnerLoader';

const AllPdfTable = React.lazy(() => import('./_components/AllPdfTable'));

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prime, setPrime] = useState('');
  const [selectedFeature, setSelectedFeature] = useState('pdf'); // Default to 'pdf'
  

  const features = [
    '10 free requests with PDF generation',
    'Generate 10 code snippets',
    'Create 10 videos',
    'Generate 10 images',
    'Access to basic dashboard'
];


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/storage');
      console.info("response", res);
      setAllData(res.data.data.data);

      // get prime features 
      const primeRes = await axios.get('/api/prime');
      console.log(primeRes);
      setPrime(primeRes.data.data);
    } catch (error) {
      console.error('some error ', error);
    } finally {
      setLoading(false);
    }
  };

  // Get data based on selected feature
  const generatedItems = prime?.offers?.[selectedFeature]?.exist || 0;
  const itemLimit = prime?.offers?.[selectedFeature]?.capacity || 0;
  const remainingItems = itemLimit - generatedItems;

  // Data for the Pie Chart
  const data = {
    labels: ['Used', 'Remaining'],
    datasets: [
      {
        label: `${selectedFeature.toUpperCase()} Usage`,
        data: [remainingItems, generatedItems],
        backgroundColor: ['#4f46e5', '#d1d5db'], // Custom colors for sections
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">User Dashboard</h1>

        {loading && (<Loader />)}

        {/* Package Info Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Current Package</h2>
          <p className="text-green-600 p-3 rounded-full bg-green-600/10 w-40 flex justify-center items-center">Free Pack</p>
          <p className="text-gray-500">Access to basic features</p>

          <ul className="mb-6">
              {features.map((feature, idx) => (
                <li key={idx} className="text-gray-600 mb-2 flex items-center">
                  <span className="mr-2 text-blue-500">✔</span> {feature}
                </li>
              ))}
            </ul>

          <Link href={'/prime'}>
            <button className="mt-4 w-44 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200">
              Upgrade Package
            </button>
          </Link>
        </div>

      

        {/* PDF Files Section */}
        <Suspense fallback={<div className='flex items-center justify-center gap-2 text-black'>loading ...<SpinnerLoader /></div>}>
          <AllPdfTable files={allData} />
        </Suspense>

        {/* Pie Chart Representation Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">{selectedFeature.toUpperCase()} Usage</h2>

            {/* Feature Buttons */}
        <div className="flex justify-start  mt-6">
          {['pdf', 'code', 'image', 'video'].map((feature) => (
            <button
              key={feature}
              className={`px-4 py-2 rounded ${selectedFeature === feature ? ' text-blue-700 bg-gray-100 ' : ' text-gray-800'}`}
              onClick={() => setSelectedFeature(feature)}
            >
              {feature.toUpperCase()}
            </button>
          ))}
        </div>
          <div className="h-64 bg-gray-100 rounded-lg p-4 flex items-center justify-center">
            <Pie data={data} options={options} />
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8">
          <p className="text-gray-500">Looking for more features?</p>
          <Link href={'/prime'} className="text-blue-600 hover:text-blue-900 font-semibold cursor-pointer">Explore Premium Plans</Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
