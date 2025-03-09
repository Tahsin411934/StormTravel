import axios from 'axios';
import React from 'react'

export const axiosSecure = axios.create({
    // baseURL: 'https://server-blue-seven.vercel.app'
   //  baseURL: 'http://localhost:5000'
     baseURL: 'https://share-trip-serverv1.vercel.app'

})

const useAxiouSecure = () => {
   return axiosSecure
};



export default useAxiouSecure
