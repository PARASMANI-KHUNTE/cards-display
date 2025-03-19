
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Star, ChevronRight } from "lucide-react";

const Card = ({ college }) => (
  <motion.div
    whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
    className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300"
  >
    {/* Header Section */}
    <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6">
      <h2 className="text-2xl font-bold mb-2">{college.collegeName}</h2>
      <div className="flex items-center space-x-2">
        <MapPin className="w-5 h-5" />
        <p className="text-sm font-medium">{college.location}</p>
      </div>
    </div>

    {/* Body Section */}
    <div className="p-6">
      {/* Courses Offered */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          <GraduationCap className="w-6 h-6 mr-2 text-blue-500" />
          Courses Offered
        </h3>
        <ul className="space-y-2">
          {college.coursesOffered.map((course, idx) => (
            <li key={idx} className="text-sm text-gray-700 flex items-center">
              <ChevronRight className="w-4 h-4 mr-2 text-blue-500" />
              {course}
            </li>
          ))}
        </ul>
      </div>

      {/* Scholarships */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 flex items-center">
          <Star className="w-6 h-6 mr-2 text-yellow-500" />
          Scholarships
        </h3>
        <ul className="space-y-2">
          {college.scholarshipsOffered.map((scholarship, idx) => (
            <li key={idx} className="text-sm text-gray-700 flex items-center">
              <ChevronRight className="w-4 h-4 mr-2 text-yellow-500" />
              {scholarship}
            </li>
          ))}
        </ul>
      </div>

      {/* Eligibility Criteria */}
      <p className="text-sm text-gray-600 italic bg-gray-50 p-3 rounded-lg">
        {college.eligibilityCriteriaForInternationalStudents}
      </p>
    </div>

    {/* Footer Section */}
    <div className="bg-gray-50 p-6 text-center">
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all duration-300 mx-auto">
        <span>Learn More</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  </motion.div>
);

export default Card;