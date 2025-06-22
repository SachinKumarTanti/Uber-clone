import React from 'react'

function LookingForDriver(props) {
  return (
    <div>
      <h5 onClick={()=>{props.setVehicleFound(false);}} className='p-2 w-full text-center absolute top-0'><i className='ri-arrow-down-wide-line text-3xl text-gray-500'></i></h5>
      <h3 className='text-xl mb-3 font-bold '>Looking For a Driver</h3>
      <div className='flex flex-col gap-2 justify-between items-center'>
        <img className='w-40 h-20' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJb6fK783e2lzgNMHcPBgbVIK1gX3xeo1rFQ&s"></img>
        <div className='w-full mt-3'>
          <div className='flex gap-2 items-center p-2 border-b-2'>
            <i className='text-lg ri-map-pin-2-fill'></i>
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-base text-gray-500 text-sm'>{props.pickup}</p>
            </div>
          </div>
          <div className='flex gap-2 items-center p-2 border-b-2'>
            <i className='text-lg ri-map-pin-2-fill'></i>
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-base text-gray-500 text-sm'>{props.destination}</p>
            </div>
          </div>
          <div className='flex gap-2 items-center p-2'>
            <i className='text-lg ri-currency-line'></i>
            <div>
              <h3 className='text-lg font-medium'>₹{props.fare[ props.vehicleType ]}</h3>
              <p className='text-base text-gray-500 text-sm'>Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LookingForDriver