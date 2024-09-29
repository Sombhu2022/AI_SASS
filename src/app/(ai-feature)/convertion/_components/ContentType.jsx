import Link from 'next/link';
import React from 'react';

function ContentType({ contentData }) {
  return (
    <Link href={`/convertion/${contentData?.link}`} className="block max-w-[250px] md:max-w-[400px]">
      <div className="border border-gray-700 shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <div className="flex items-center space-x-4">
          <i className={`text-3xl p-2 rounded-md ${contentData?.iconBg} ${contentData?.iconColor}`}>{contentData?.icon}</i>
          <h3 className="text-xl font-semibold text-gray-300">{contentData?.type}</h3>
        </div>
        <div className="mt-4">
          <p className="text-gray-600">{contentData?.description}</p>
        </div>
      </div>
    </Link> 
  );
}

export default ContentType;
