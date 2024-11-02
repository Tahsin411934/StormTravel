import axios from 'axios';
import React from 'react'

export const axiosSecure = axios.create({
    // baseURL: 'https://server-blue-seven.vercel.app'
    baseURL: 'http://localhost:5000'

})

const useAxiouSecure = () => {
   return axiosSecure
};



export default useAxiouSecure
