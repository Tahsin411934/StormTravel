import React from 'react';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';
import { Link, useParams } from 'react-router-dom';
import { useAccessoriesByCategory } from '../../utils/useAccessoriesByCategory';



const LoadingState = () => (
  <div className="flex items-center justify-center min-h-screen">
    <span>Loading...</span>
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center min-h-screen">
    <span>Error fetching related accessories: {message}</span>
  </div>
);

const NoDataState = () => (
  <div className="flex items-center justify-center min-h-screen">
    <span>No related accessories found.</span>
  </div>
);

export const AccessoriesByCategory: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  // Custom hook to fetch related data
 const { relatedData, relatedLoading, relatedError } = useAccessoriesByCategory(category!);

  // Handle invalid category
  if (!category) {
    return <div>No category provided in the URL.</div>;
  }

  // Handle loading state
  if (relatedLoading) return <LoadingState />;

  // Handle errors
  if (relatedError) return <ErrorState message={relatedError.message} />;

  // Handle empty data
  if (!relatedData?.length) return <NoDataState />;

  return (
    <div className="bg-slate-100 min-h-screen pb-16">
        {/* Related Accessories */}
            <div className="mt-10 w-[80%] mx-auto">
              <h3 className="text-xl font-bold">Related Accessories</h3>
              
              {relatedData && relatedData.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                  {relatedData.map((item) => (
                    <Link to={`/Accessories/${item._id}/${item.category}`}>
                                <div className="hover:bg-green-100 card bg-base-100 shadow-xl">
                                  <figure>
                                    <img
                                      src={item.imgUrl}
                                      alt={item.productName} />
                                  </figure>
                                  <div className="card-body">
                                    <h2 className="card-title h-8">
                                      {item.productName}
                                      <div className="badge badge-secondary">{item.available}</div>
                                    </h2>
                                    <div  className="card-actions">
                    
                                      <del className='flex items-center text-slate-500'><FaBangladeshiTakaSign  />{item.price} </del> <span className='text-[#024B90] font-semibold flex items-center'><FaBangladeshiTakaSign  /> {item.finalPrice}</span>
                                    </div>
                                    <div className="card-actions justify-end">
                                      <div className="badge badge-outline">Fashion</div>
                                      <div className="badge badge-outline">Products</div>
                                    </div>
                                    <div className=' absolute top-10'>
                                      <button className=" bg-[#024B90] text-white rounded-full p-3 ">{item.discount}% OFF</button>
                                    </div>
                                  </div>
                                </div>
                                </Link>
                  ))}
                </div>
              ) : (
                <div className="mt-4">No related accessories found.</div>
              )}
            </div>
    </div>
  );
};
