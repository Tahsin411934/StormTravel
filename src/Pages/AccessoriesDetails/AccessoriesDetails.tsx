import React from 'react';
import { useAccessory } from '../../utils/useAccessory';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';
import { useAccessoriesByCategory } from '../../utils/useAccessoriesByCategory';
import useScrollToTop from '../../Hook/useScrollToTop';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice'; // Import Redux actions

// Define a type for the product
type Product = {
  _id: string;
  productName: string;
  description: string;
  price: number;
  imgUrl: string;
  discount?: number; // Optional discount
  available: string;
};

export const AccessoriesDetails = () => {
  const { id } = useParams<{ id: string }>();
  useScrollToTop();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Call hooks unconditionally at the top
  const { data, isLoading, error } = useAccessory(id!);
  const category = data?.category || '';
  const { relatedData, relatedLoading, relatedError } =
    useAccessoriesByCategory(category);

 // Handle "Buy Now" functionality
const handleBuyNow = (product: Product) => {
  const buyNowProduct = {
    ...product,
    discount: product.discount || 0, // Default discount to 0 if undefined
    quantity: 1,
  };
  navigate('/Accessories/order-summary', { state: { cart: [buyNowProduct] } }); // Fixed syntax
};

  // Handle adding to cart using Redux
  const handleAddToCart = (product: Product) => {
    
    const cartItem = {
      ...product,
      discount: product.discount || 0, // Default discount to 0 if undefined
      quantity: 1,
    };
    dispatch(addToCart(cartItem)); // Dispatch Redux action
    alert('Product added to cart!');
  };

  // Handle the case where `id` is not available
  if (!id) {
    return <div>No accessory ID provided in the URL.</div>;
  }

  // Handle loading, error, and empty data conditions for the primary data
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No details available for this accessory.</div>;
  }

  const { productName, description, price, imgUrl, discount, available } = data;

  return (
    <div className="bg-slate-100 min-h-screen pb-16">
      {/* Accessory Details */}
      <div className="p-4 w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-full h-96 overflow-hidden relative">
          <img
            src={imgUrl}
            alt={productName}
            className="w-full h-full object-cover rounded-md"
          />
          {discount && (
            <div className="absolute top-5 left-5">
              <button className="bg-[#024B90] text-white rounded-full px-4 py-2">
                {discount}% OFF
              </button>
            </div>
          )}
        </div>

        <div className="pt-5">
          <h2 className="text-3xl font-bold text-gray-700">
            {productName}
            <span className="badge ml-3 badge-secondary">{available}</span>
          </h2>
          <p className="mt-4 text-2xl flex items-center gap-2 font-semibold">
            Price:
            <span>{price}</span>
            <FaBangladeshiTakaSign />
          </p>
          <p className="mt-4 text-lg">
            <span className="font-semibold">Description:</span> {description}
          </p>

          <div className="flex space-x-4 mt-10">
            <button
              onClick={() => handleAddToCart(data)}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-black"
            >
              Add to Cart
            </button>
            <button
              onClick={() => handleBuyNow(data)}
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Accessories */}
      <div className="mt-10 w-[80%] mx-auto">
        <h3 className="text-xl font-bold">Related Accessories</h3>
        {relatedLoading && <div>Loading related accessories...</div>}
        {relatedError && (
          <div>Error fetching related accessories: {relatedError.message}</div>
        )}
        {relatedData && relatedData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {relatedData.map((item) => (
              <Link to={`/Accessories/${item._id}/${item.category}`} key={item._id}>
                <div className="hover:bg-green-100 card bg-base-100 shadow-xl">
                  <figure>
                    <img src={item.imgUrl} alt={item.productName} />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title h-8">
                      {item.productName}
                      <div className="badge badge-secondary">{item.available}</div>
                    </h2>
                    <div className="card-actions">
                      <del className="flex items-center text-slate-500">
                        <FaBangladeshiTakaSign />
                        {item.price}
                      </del>
                      <span className="text-[#024B90] font-semibold flex items-center">
                        <FaBangladeshiTakaSign />
                        {item.finalPrice}
                      </span>
                    </div>
                    <div className="card-actions justify-end">
                      <div className="badge badge-outline">Fashion</div>
                      <div className="badge badge-outline">Products</div>
                    </div>
                    <div className="absolute top-10">
                      <button className="bg-[#024B90] text-white rounded-full p-3">
                        {item.discount}% OFF
                      </button>
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