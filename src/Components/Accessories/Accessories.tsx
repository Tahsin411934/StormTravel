import React from 'react';
import { useFetchData } from '../../Hook/useFeatchData';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';

interface AccessoryItem {
  productName: string;
  imgUrl: string;
  available: string;
  price:  number;
  finalPrice:  number;
  discount:  number;

  // Define other properties of `item` as needed.
}

export const Accessories: React.FC = () => {
  const { data } = useFetchData() as { data: AccessoryItem[] | undefined };
  // Type data as an array of AccessoryItem
  console.log(data);

  return (
    <div className='font-Poppins w-[90%] mx-auto pt-20'>
      <div className='font-Poppins font-bold text-3xl'>
        <h1>Travel Accessories</h1>
      </div>
      <div className='grid grid-cols-3 gap-5 relative '>
        {data?.slice(0,6).map((item, index) => (
          <div key={index}>
            <div className="hover:bg-green-100 card bg-base-100 shadow-xl">
              <figure>
                <img
                  src={item.imgUrl}
                  alt={item.productName} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
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
          </div>
        ))}
      </div>
    </div>
  );
};
