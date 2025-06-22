import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/Captaincontext';

const CaptainProtectedWrapper = ({children}) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    const [isloading ,setisloading] = useState(true);
    const {captain,setcaptain} = useContext(CaptainDataContext);

    useEffect(() => {
        if(!token){
            navigate('/captain-login')
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        .then((res)=>{
            if(res.status ===200 ){
                setcaptain(res.data);
                setisloading(false);
            }
        })
        .catch((err)=>{
            console.log(err);
            localStorage.removeItem('token')
            navigate('/captain-login')
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

export default CaptainProtectedWrapper