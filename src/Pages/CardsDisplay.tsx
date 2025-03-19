import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, Loader2, PlusCircle } from "lucide-react";
import Card from "../components/Card"; // Importing the separate Card component
import mockData from "../../public/collegeData.json"; // Using external JSON data

const CardsDisplay = () => {
  const [page, setPage] = useState(1);
  const [dynamicCards, setDynamicCards] = useState(3);
  const [showMoreCards, setShowMoreCards] = useState(3);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(mockData.length / itemsPerPage);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
      !loading
    ) {
      setLoading(true);
      setTimeout(() => {
        setDynamicCards((prev) => prev + 3);
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="p-10 space-y-10">
      {/* Pagination Container */}
      <div>
        <h1 className="text-2xl font-bold mb-4">Pagination Loading</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockData.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((college, index) => (
            <Card key={index} college={college} />
          ))}
        </div>
        <div className="flex justify-center mt-4 space-x-4">
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            <ChevronLeft className="mr-2" /> Prev
          </button>
          <span className="text-lg font-semibold">Page {page} of {totalPages}</span>
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 ${page === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next <ChevronRight className="ml-2" />
          </button>
        </div>
      </div>

      {/* Infinite Scroll Container */}
      <div>
        <h1 className="text-2xl font-bold mb-4">Infinite Scroll</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockData.slice(0, dynamicCards).map((college, index) => (
            <Card key={index} college={college} />
          ))}
        </div>
        {loading && (
          <div className="flex justify-center mt-4">
            <Loader2 className="animate-spin" size={30} />
          </div>
        )}
      </div>

      {/* Show More Container */}
      <div>
        <h1 className="text-2xl font-bold mb-4">Show More</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockData.slice(0, showMoreCards).map((college, index) => (
            <Card key={index} college={college} />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-600"
            onClick={() => setShowMoreCards((prev) => prev + 3)}
          >
            <PlusCircle className="mr-2" /> Show More
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardsDisplay;