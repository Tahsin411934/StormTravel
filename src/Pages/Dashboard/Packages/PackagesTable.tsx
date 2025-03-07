import React, { useEffect, useState } from 'react';
import { axiosSecure } from '../../../Hook/useAxiouSecure';

// TypeScript Interface for Package Data
export interface Package {
  _id: string;
  name: string;
  price: number;
  discount: number;
  duration: string;
  description: string;
  features: string[];
  isActive: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
}

const PackagesTable: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get<Package[]>('/api/package', {
          signal: controller.signal,
        });
        setPackages(res.data);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch packages');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
    return () => controller.abort(); // Cleanup to avoid memory leaks
  }, []);

  if (loading) return <div className="text-center py-6 text-lg font-bold">Loading...</div>;

  if (error) return <div className="text-center text-red-500 py-6">{error}</div>;

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">All Packages</h1>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto bg-base-100 shadow-md rounded-lg">
        <table className="table w-full">
          {/* Table Header */}
          <thead className="bg-gray-300 text-blue-950">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Duration</th>
              <th>Description</th>
              <th>Features</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg._id} className="hover:bg-base-200">
                <td>
                  <img src={pkg.image} alt={pkg.name} className="h-16 w-16 object-cover rounded-md" loading="lazy" />
                </td>
                <td className="font-bold">{pkg.name}</td>
                <td className="text-success">${pkg.price.toFixed(2)}</td>
                <td className="text-error">{pkg.discount}%</td>
                <td>{pkg.duration}</td>
                <td className="truncate max-w-[150px]">{pkg.description}</td>
                <td>
                  <ul className="list-disc list-inside text-sm">
                    {pkg.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View: Stacked Cards */}
      <div className="sm:hidden mt-6 space-y-4">
        {packages.map((pkg) => (
          <div key={pkg._id} className="card bg-base-100 shadow-md p-4">
            <div className="flex items-center gap-4">
              <img src={pkg.image} alt={pkg.name} className="h-20 w-20 object-cover rounded-md" loading="lazy" />
              <div>
                <h2 className="text-lg font-semibold">{pkg.name}</h2>
                <p className="text-sm text-gray-500">
                  ${pkg.price.toFixed(2)} | <span className="text-error">{pkg.discount}% Off</span>
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{pkg.description}</p>
            <ul className="list-disc list-inside mt-2 text-sm text-gray-600">
              {pkg.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackagesTable;
