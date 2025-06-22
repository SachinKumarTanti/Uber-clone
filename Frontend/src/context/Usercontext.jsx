import React, { createContext, useState } from 'react'

export const UserDataContext=createContext()

const Usercontext = ({children}) => {

    const[user,setuser]=useState({
        fullname:{
            firstname:"",
            lastname:""
        },
        email:"",
        password:""
    })
  return (
    <div>
        <UserDataContext.Provider value={{user,setuser}}>
            {children}
        </UserDataContext.Provider>  
    </div>
  )
}

export default Usercontext