import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/Usercontext';

const UserProtectedWrapper = ({children}) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    const {user,setuser} = useContext(UserDataContext)
    const [isloading,setisloading]= useState(true);

    useEffect(() => {
        if(!token){
            navigate('/login')
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,
            {headers:{
                'Authorization': 'Bearer '+localStorage.getItem('token')
            } 
        })
        .then((res)=>{
            if(res.status ===200 ){
                setuser(res.data);
                setisloading(false);
            }
        })
        .catch((err)=>{
            console.log(err);
            localStorage.removeItem('token')
            navigate('/login')
        })
    }, [ token ])
    
  

  if(isloading){
      return(
          <>
          Loading...
          </>
      )
  }
  return (
    <>
        {children}
    </>
  )
}

export default UserProtectedWrapper