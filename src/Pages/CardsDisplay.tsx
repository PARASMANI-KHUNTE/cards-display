import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, Loader2, PlusCircle } from "lucide-react";
import Card from "../components/Card"; // Importing the separate Card component
import mockData from "../../public/collegeData.json"; // Using external JSON data

// Define the type for college data
interface College {
  collegeName: string;
  location: string;
  coursesOffered: string[];
  scholarshipsOffered: string[];
  eligibilityCriteriaForInternationalStudents: string;
}

const CardsDisplay = () => {
  const [page, setPage] = useState(1);
  const [dynamicCards, setDynamicCards] = useState(3);
  const [showMoreCards, setShowMoreCards] = useState(3);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(mockData.length / itemsPerPage);

  // Handle infinite scroll
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

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="p-10 space-y-10 bg-gray-50 min-h-screen">
      {/* Pagination Container */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">Pagination Loading</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockData
            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map((college: College, index: number) => (
              <Card key={index} college={college} />
            ))}
        </div>
        <div className="flex justify-center mt-6 space-x-4">
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-all ${
              page === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            <ChevronLeft className="mr-2" /> Prev
          </button>
          <span className="text-lg font-semibold text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-all ${
              page === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next <ChevronRight className="ml-2" />
          </button>
        </div>
      </div>

      {/* Infinite Scroll Container */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">Infinite Scroll</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockData
            .slice(0, dynamicCards)
            .map((college: College, index: number) => (
              <Card key={index} college={college} />
            ))}
        </div>
        {loading && (
          <div className="flex justify-center mt-6">
            <Loader2 className="animate-spin text-blue-500" size={30} />
          </div>
        )}
      </div>

      {/* Show More Container */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">Show More</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockData
            .slice(0, showMoreCards)
            .map((college: College, index: number) => (
              <Card key={index} college={college} />
            ))}
        </div>
        <div className="flex justify-center mt-6">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-600 transition-all"
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