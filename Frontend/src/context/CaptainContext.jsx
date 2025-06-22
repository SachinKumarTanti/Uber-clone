import React, { createContext, useState } from 'react'

export const CaptainDataContext=createContext()

const CaptainContext = ({children}) => {

    const[captain,setcaptain]=useState({
        fullname:{
            firstname:"",
            lastname:""
        },
        email:"",
        password:"",
        vehicle:{
            color:"",
            plate:"",
            vehicletype:"",
            vehicleCapacity:""
        }
    })
  return (
    <div>
        <CaptainDataContext.Provider value={{captain,setcaptain}}>
            {children}
        </CaptainDataContext.Provider>  
    </div>
  )
}

export default CaptainContext