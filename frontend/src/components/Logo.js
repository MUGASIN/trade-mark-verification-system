import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ className = '' }) => {
  return (
    <Link to="/" className={`flex items-center space-x-2 ${className}`}>
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 bg-blue-600 rounded-lg transform rotate-45"></div>
        <div className="absolute inset-1 bg-white rounded-lg transform rotate-45 flex items-center justify-center">
          <span className="text-blue-600 font-bold text-xl transform -rotate-45">™</span>
        </div>
      </div>
      <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        TradeMark
        <span className="text-gray-700 dark:text-gray-300">Verify</span>
      </div>
    </Link>
  );
};

export default Logo;
