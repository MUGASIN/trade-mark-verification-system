import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [trademarks, setTrademarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTrademarks();
  }, []);

  const fetchTrademarks = async () => {
    try {
      const response = await axios.get('/api/trademarks/all');
      setTrademarks(response.data);
    } catch (error) {
      setError('Failed to fetch trademarks');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status, feedback, similarityScore) => {
    try {
      await axios.patch(`/api/trademarks/${id}/status`, {
        status,
        feedback,
        similarityScore
      });
      fetchTrademarks();
    } catch (error) {
      setError('Failed to update trademark status');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Trademark Administration</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left">Image</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Owner</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {trademarks.map((trademark) => (
              <tr key={trademark._id}>
                <td className="px-6 py-4">
                  <img
                    src={trademark.imageUrl}
                    alt={trademark.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium">{trademark.name}</div>
                  <div className="text-sm text-gray-500">{trademark.description}</div>
                </td>
                <td className="px-6 py-4">
                  <div>{trademark.owner.username}</div>
                  <div className="text-sm text-gray-500">{trademark.owner.email}</div>
                </td>
                <td className="px-6 py-4">{trademark.category}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      trademark.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : trademark.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {trademark.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {trademark.status === 'pending' && (
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          const feedback = prompt('Enter approval feedback:');
                          const similarityScore = parseFloat(prompt('Enter similarity score (0-100):'));
                          if (feedback && !isNaN(similarityScore)) {
                            handleStatusUpdate(trademark._id, 'approved', feedback, similarityScore);
                          }
                        }}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 w-full"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          const feedback = prompt('Enter rejection reason:');
                          if (feedback) {
                            handleStatusUpdate(trademark._id, 'rejected', feedback, 0);
                          }
                        }}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
