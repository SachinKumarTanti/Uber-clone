import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/uber-user-logo.png'
import './Home.css'
const Home = () => {
  return (
    <div>
       <div className='bg-home-back bg-no-repeat h-screen w-full  pt-8 flex justify-between flex-col '>
        <img src={`${logo}`} alt="uber-logo" className='w-14 ml-9'/>
        <div className='bg-white flex flex-col p-5 pb-7 justify-center items-center h-30'>
          <h1 className='text-2xl font-bold mb-2 mt-2'>Get Started with Uber</h1>
          <Link to='/login' className='inline-block text-center text-xl bg-zinc-900 text-white p-2 w-80 rounded-lg'>Continue</Link>
        </div>

       </div>
    </div>
  )
}

export default Home