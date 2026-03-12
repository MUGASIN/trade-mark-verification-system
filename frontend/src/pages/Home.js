import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-6">
        Welcome to Trademark Verification System
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        A secure and efficient platform for submitting and verifying trademarks
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Easy Submission</h3>
          <p className="text-gray-600">
            Submit your trademark applications quickly and securely through our
            platform
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Fast Verification</h3>
          <p className="text-gray-600">
            Get your trademarks verified quickly with our advanced verification
            system
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Secure Platform</h3>
          <p className="text-gray-600">
            Your trademark data is protected with industry-standard security
            measures
          </p>
        </div>
      </div>

      {!user ? (
        <div className="space-x-4">
          <Link
            to="/register"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200"
          >
            Login
          </Link>
        </div>
      ) : (
        <div>
          <Link
            to="/dashboard"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Go to Dashboard
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
