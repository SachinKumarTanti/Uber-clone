import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ConfirmRidePopUp(props) {
    const navigate = useNavigate();
    const [otp, setotp] = useState('')
    const submitHandler=async (e)=> {
        e.preventDefault();
try{
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params: {
                rideId: props.ride._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            props.setConfirmRidePopupPanel(false)
            props.setRidePopupPanel(false)
            navigate('/captain-riding', { state: { ride: props.ride } })
     }
    }catch (err) {
            console.error(err);
            alert('Invalid OTP');
            setotp('');
    }
}
  return (
    <div >
        <h5 onClick={()=>{props.setConfirmridepopup(false)}} className='p-2 w-full text-center absolute top-0'><i className='ri-arrow-down-wide-line text-3xl text-gray-500'></i></h5>
        <h3 className='text-xl mb-3 font-bold '>Confirm this Ride to !</h3>
        <div className='flex items-center justify-between mt-5 p-3 bg-yellow-200 rounded-lg'>
            <div className='flex items-center gap-3'>
                <img className='h-12 w-12 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyRKG1JwDisX8UIORgJZqfxsnztxKoeFh5SQ&s"></img>
                <h2 className='text-xl font-medium'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
            </div>
            <h2 className='text-lg font-semibold'>2.3 KM</h2>
        </div>
        <div className='flex flex-col gap-2 justify-between items-center'>
            {/* <img className='w-40 h-20' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJb6fK783e2lzgNMHcPBgbVIK1gX3xeo1rFQ&s"></img> */}
            <div className='w-full mt-3'>
            <div className='flex gap-2 items-center p-2 border-b-2'>
                <i className='text-lg ri-map-pin-2-fill'></i>
                <div>
                <h3 className='text-lg font-medium'>562/11-A</h3>
                <p className='text-base text-gray-500 text-sm'>{props.ride?.pickup}</p>
                </div>
            </div>
            <div className='flex gap-2 items-center p-2 border-b-2'>
                <i className='text-lg ri-map-pin-2-fill'></i>
                <div>
                <h3 className='text-lg font-medium'>562/11-A</h3>
                <p className='text-base text-gray-500 text-sm'>{props.ride?.destination}</p>
                </div>
            </div>
            <div className='flex gap-2 items-center p-2'>
                <i className='text-lg ri-currency-line'></i>
                <div>
                <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                <p className='text-base text-gray-500 text-sm'>Cash</p>
                </div>
            </div>
            <div className='mt-5'>
                <form onSubmit={(e)=>{submitHandler(e)}}>
                   <input value={otp} onChange={(e)=>{setotp(e.target.value)}} type="text" placeholder="Enter OTP" className=' font-mono w-full bg-gray-200 p-3 px-8 text-base rounded-md required' />
                    <button className='w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>Confirm</button>
                        <button onClick={() => {
                            props.setConfirmRidePopupPanel(false)
                            props.setRidePopupPanel(false)

                        }} className='w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg'>Cancel</button>
                </form>
            </div>
                
            </div>
            
        </div>
    </div>
  )
}

export default ConfirmRidePopUp