import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [trademarks, setTrademarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchTrademarks();
  }, []);

  const fetchTrademarks = async () => {
    try {
      const response = await axios.get('/api/trademarks/my-trademarks');
      setTrademarks(response.data);
    } catch (error) {
      setError('Failed to fetch trademarks');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Trademarks</h2>
        <Link
          to="/submit-trademark"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit New Trademark
        </Link>
      </div>

      {trademarks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">You haven't submitted any trademarks yet.</p>
          <Link
            to="/submit-trademark"
            className="text-blue-500 hover:text-blue-600 mt-2 inline-block"
          >
            Submit your first trademark
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trademarks.map((trademark) => (
            <div
              key={trademark._id}
              className="bg-white p-4 rounded-lg shadow"
            >
              <img
                src={trademark.imageUrl}
                alt={trademark.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="font-semibold text-lg mb-2">{trademark.name}</h3>
              <p className="text-gray-600 mb-2">{trademark.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Category: {trademark.category}
                </span>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    trademark.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : trademark.status === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {trademark.status.charAt(0).toUpperCase() + trademark.status.slice(1)}
                </span>
              </div>
              {trademark.feedback && (
                <div className="mt-4 p-3 bg-gray-50 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Feedback:</strong> {trademark.feedback}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
