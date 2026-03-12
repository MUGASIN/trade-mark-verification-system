import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [trademarks, setTrademarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrademarks = async () => {
      try {
        const response = await fetch('/api/trademarks/my-trademarks', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch trademarks');
        }
        const data = await response.json();
        setTrademarks(data);
      } catch (error) {
        setError('Error fetching trademarks: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrademarks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Welcome, {user?.username}!</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Total Submissions</h3>
          <p className="text-3xl font-bold text-blue-600">{trademarks.length}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Pending Review</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {trademarks.filter(tm => tm.status === 'pending').length}
          </p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Approved</h3>
          <p className="text-3xl font-bold text-green-600">
            {trademarks.filter(tm => tm.status === 'approved').length}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <h3 className="text-xl font-semibold p-6 border-b dark:border-gray-700">
          Your Trademarks
        </h3>
        {trademarks.length === 0 ? (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
            No trademarks submitted yet. 
            <a href="/submit-trademark" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 ml-1">
              Submit your first trademark
            </a>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Trademark
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Submitted
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {trademarks.map((trademark) => (
                  <tr key={trademark._id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {trademark.imageUrl && (
                          <img
                            src={trademark.imageUrl}
                            alt={trademark.name}
                            className="h-10 w-10 rounded-full mr-3 object-cover"
                          />
                        )}
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {trademark.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {trademark.description.substring(0, 50)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        {trademark.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`badge ${
                        trademark.status === 'approved' ? 'badge-success' :
                        trademark.status === 'pending' ? 'badge-warning' :
                        'badge-danger'
                      }`}>
                        {trademark.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(trademark.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
