'use client'
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Link from 'next/link';

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  // Sample data for the generated PDFs and plan limit
  const pdfFiles = [
    { id: 1, name: "Project Report 1", date: "2024-09-10" },
    { id: 2, name: "AI Research Notes", date: "2024-09-15" },
    { id: 3, name: "Project Summary", date: "2024-09-20" },
  ];
  const generatedPDFs = pdfFiles.length;
  const pdfLimit = 10; // Example limit based on the user's package
  const remainingPDFs = pdfLimit - generatedPDFs;

  // Data for the Pie Chart
  const data = {
    labels: ['Generated PDFs', 'Remaining PDFs'],
    datasets: [
      {
        label: 'PDF Usage',
        data: [generatedPDFs, remainingPDFs],
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
        
        {/* Package Info Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Current Package</h2>
          <p className="text-gray-600">Standard Plan</p>
          <p className="text-gray-500">Access to basic features, 5 projects, and standard support.</p>
          <Link href={'/prime'}>
          <button className="mt-4 w-44 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200">
            Upgrade Package
          </button>
          </Link>
        </div>

        {/* PDF Files Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Generated PDFs</h2>
          <ul className="bg-gray-50 p-4 rounded-lg">
            {pdfFiles.map((pdf) => (
              <li key={pdf.id} className="flex justify-between items-center p-2 border-b border-gray-200">
                <span className='text-black'>{pdf.name}</span>
                <span className="text-gray-500">{pdf.date}</span>
                <button className="text-blue-500 hover:underline">View</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Pie Chart Representation Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Data Representation</h2>
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
