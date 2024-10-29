"use client";

import Notify from "@/utils/NotificationManager";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useMemo, useEffect } from "react";

function AllPdfTable({ files = [] }) {
  const [allPdfFiles, setAllPdfFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  
  const itemsPerPage = 5;

  console.log("all pdf files", allPdfFiles);

  useEffect(() => {
    if (files.length > 0) {
      setAllPdfFiles(files);
    }
  }, [files]);

  const filteredPdfFiles = useMemo(() => {
    return allPdfFiles.filter((file) =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allPdfFiles]);

  const totalPages = Math.ceil(filteredPdfFiles.length / itemsPerPage);

  const currentPdfFiles = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPdfFiles.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredPdfFiles]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset page when searching
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const filterDataAfterDelete = (id) => {
    console.log(id);
    return allPdfFiles.filter((file) => file._id !== id);
  };

  const deleteHandle = async (id) => {
    const isDelete = window.confirm('are you sure to delete this file ?')
    if(!isDelete) return
    try {
      if (id) {
        const res = await axios.delete(`/api/storage/${id}`);
        const filterData = filterDataAfterDelete(id);
        setAllPdfFiles(filterData);
        Notify.success(res.message || 'file delete successfully')
      }
    } catch (error) {
      console.error(error);
      Notify.error(error.response.data.message || 'somthing error file not delete')
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        All PDF Files
      </h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search PDFs..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full text-black px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Update
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentPdfFiles.map((file) => (
              <tr
                key={file._id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <svg
                      className="h-6 w-6 text-red-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">
                      {file.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">
                    {file.createdAt
                      ? new Date(file.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">
                    {file.updatedAt
                      ? new Date(file.updatedAt).toLocaleString()
                      : "N/A"}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => router.push(`/pdf/${file._id}`)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    View
                  </button>
                  <button
                    onClick={() => deleteHandle(file._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  currentPage === page
                    ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}

export default AllPdfTable;
