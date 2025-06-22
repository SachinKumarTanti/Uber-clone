import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
          <h2 onClick={() => { props.setVehiclePanel(false) }} className='text-3xl absolute top-0 w-[93%] text-center'>
                <i className='text-gray-400 ri-arrow-down-wide-line'></i>
              </h2>
              <h2 className='font-semibold text-2xl mt-6 mb-2'>Choose your Ride</h2>
              <div onClick={()=>{props.setVehiclePanel(false); props.setConfirmRidePanel(true);props.selectVehicle('car')}} className='mb-2 p-2 flex items-center justify-between border-4 active:border-black bg-gray-100 rounded-3xl'>
                <img className=' h-16' src='https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png' />
                <div className='w-1/2'>
                  <h4 className='text-xl font-semibold'>UberGo <span className='text-lg'><i className='ri-user-3-fill' />4</span></h4>
                  <h5>2 mins away</h5>
                  <p>Affordable, compact rides</p>
                </div>
                <h2 className='text-xl font-semibold'>₹{props.fare.car}</h2>
              </div>
              <div onClick={()=>{props.setVehiclePanel(false); props.setConfirmRidePanel(true);props.selectVehicle('moto')}} className='mb-2 p-2 flex items-center justify-between border-4 active:border-black bg-gray-100 rounded-3xl'>
                <img className=' h-16' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png' />
                <div className='w-1/2'>
                  <h4 className='text-xl font-semibold'>Bike <span className='text-lg'><i className='ri-user-3-fill' />1</span></h4>
                  <h5>2 mins away</h5>
                  <p>Affordable, compact rides</p>
                </div>
                <h2 className='text-xl font-semibold'>₹{props.fare.moto}</h2>
              </div>
              <div onClick={()=>{props.setVehiclePanel(false); props.setConfirmRidePanel(true);props.selectVehicle('auto')}} className='mb-2 p-2 flex items-center justify-between border-4 active:border-black bg-gray-100 rounded-3xl'>
                <img className=' h-16' src='https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png' />
                <div className='w-1/2'>
                  <h4 className='text-xl font-semibold'>UberAuto <span className='text-lg'><i className='ri-user-3-fill' />3</span></h4>
                  <h5>2 mins away</h5>
                  <p>Affordable, compact rides</p>
                </div>
                <h2 className='text-xl font-semibold'>₹{props.fare.auto}</h2>
              </div>
    </div>
  )
}

export default VehiclePanel