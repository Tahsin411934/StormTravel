import React from 'react'
import Header from '../../Components/Header/Header';
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { useAuth } from '../../AuthProvider/AuthContext';
import LoadingIcon from '../LoadingIcon/LoadingIcon';
import Footer from '../../Components/Footer/Footer';

const UserLayout = () => {
  const {loading,setLoading} = useAuth()

  
  if (loading) {
// set loading
      return <LoadingIcon />
  }
  return (
    <div className='max-w-[1400px] mx-auto'>
      <Header></Header>
      <Outlet></Outlet>
      <ToastContainer />
      <Footer></Footer>
    </div>
  )
}

export default UserLayout
