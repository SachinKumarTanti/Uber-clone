import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Captainlogout = () => {

    const navigate = useNavigate();
    axios.post(`${import.meta.env.VITE_BASE_URL}/captain/logout`,{},
        {headers:{
            'Authorization':'Bearer '+localStorage.getItem('token')
        }} 
    )
    .then((res)=>{
        if(res.status === 200){
            localStorage.removeItem('token')
            navigate('/captain-login');
        }
    })
  return (
    <div>Captainlogout</div>
  )
}

export default Captainlogout