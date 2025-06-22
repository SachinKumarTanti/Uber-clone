import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { SocketContext } from '../context/SocketContext';
import { useContext } from 'react';
import { UserDataContext } from '../context/Usercontext';
import { useNavigate } from 'react-router-dom';
// import LiveTracking from '../components/LiveTracking';
import logo from '../assets/uber-user-logo.png';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const [ pickup, setPickup ] = useState('')
    const [ destination, setDestination ] = useState('')
    const [ panelOpen, setPanelOpen ] = useState(false)
    const vehiclePanelRef = useRef(null)
    const confirmRidePanelRef = useRef(null)
    const vehicleFoundRef = useRef(null)
    const waitingForDriverRef = useRef(null)
    const panelRef = useRef(null)
    const panelCloseRef = useRef(null)
    const [ vehiclePanel, setVehiclePanel ] = useState(false)
    const [ confirmRidePanel, setConfirmRidePanel ] = useState(false)
    const [ vehicleFound, setVehicleFound ] = useState(false)
    const [ waitingForDriver, setWaitingForDriver ] = useState(false)
    const [ pickupSuggestions, setPickupSuggestions ] = useState([])
    const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
    const [ activeField, setActiveField ] = useState(null)
    const [ fare, setFare ] = useState({})
    const [ vehicleType, setVehicleType ] = useState(null)
    const [ ride, setRide ] = useState(null)
    const navigate = useNavigate()

    const { socket } = useContext(SocketContext)
    const { user } = useContext(UserDataContext)


    socket.on('ride-confirmed', ride => {
        setVehicleFound(false)
        setWaitingForDriver(true)
        setRide(ride)
    })

    socket.on('ride-started', ride => {
        console.log("ride")
        setWaitingForDriver(false)
        navigate('/riding', { state: { ride } }) // Updated navigate to include ride data
    })

const handlePickupChange = async (e) => {
        setPickup(e.target.value)
        if(pickup.length < 3) {
            setPickupSuggestions([]);
            return;
        }
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }

            })
            setPickupSuggestions(response.data)
        } catch {
            console.error('Error fetching pickup suggestions');
            setPickupSuggestions([]);
        }
    }

    const handleDestinationChange = async (e) => {
        setDestination(e.target.value)
        if(destination.length < 3) {
            setDestinationSuggestions([]);
            return;
        }
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setDestinationSuggestions(response.data)
        } catch {
            console.error('Error fetching destination suggestions');
            setDestinationSuggestions([]);
        }
    }
    
  useEffect(()=>{
    if(!user){
      window.location.href = '/login'
    }
    socket.emit("join", { userType: "user", userId: user._id })
   // getSuggestions('iit guwahati');
  },[user])
  

  const submitHandler = (e) => {
    e.preventDefault();
  }

   useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70%',
                padding: 24
                // opacity:1
            })
            gsap.to(panelCloseRef.current, {
                opacity: 1
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0%',
                padding: 0
                // opacity:0
            })
            gsap.to(panelCloseRef.current, {
                opacity: 0
            })
        }
    }, [ panelOpen ])


   useGSAP(function () {
        if (vehiclePanel) {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ vehiclePanel ])

    useGSAP(function () {
        if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ confirmRidePanel ])

    useGSAP(function () {
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(200%)'
            })
        }
    }, [ vehicleFound ])

    useGSAP(function () {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ waitingForDriver ])


        async function findTrip() {
        setVehiclePanel(true)
        setPanelOpen(false)

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
            params: { pickup, destination },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setFare(response.data)
    }

    async function createRide() {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
        pickup,
        destination,
        vehicleType
        }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        });
        // Show success toast
       if (response.status === 201) {
          toast.success('Ride created successfully!');

       }
      }
      catch (error) {
        console.error('Error creating ride:', error);
        // Show error toast
          const errMsg = error.response?.data?.message || 'Ride creation failed. Please try again.';
          toast.error(errMsg);
        return;
      }


    }

  return (
    <div>
        <Navbar />
      <div className='h-screen bg-[url(https://media.cntraveler.com/photos/6194111487ce9726f9af5e0a/16:9/w_2560%2Cc_limit/Uber_GettyImages-696059214.jpg)]'>
        <div className='h-screen flex justify-center bg-gray-300 bg-opacity-40'>
          <div className='w-4/5 h-screen bg-purple-300 relative overflow-hidden'>
            {/* <img src={`${logo}`} alt='uber-logo' className='w-20 absolute left-10 top-5' /> */}
            <div className='h-screen w-full'>
              <img className='h-full w-full object-cover' src='https://www.hanbit.co.kr/data/editor/20210429161116_qvzgnfvw.gif' />
            </div>
            <div className='flex flex-col justify-end absolute h-screen top-0 w-full'>
              {/* <div className='bg-blue-400  p-5 relative'> */}
                <div className="h-[40%] relative bg-white/30 backdrop-blur-lg rounded-xl p-6 shadow-md border border-white/20 w-full">
  {/* Close Icon */}
  <h2
    ref={panelCloseRef}
    onClick={() => setPanelOpen(false)}
    className="text-4xl absolute top-4 right-4 text-white cursor-pointer hover:scale-110 transition-transform"
    title="Close"
  >
    <i className="ri-close-line"></i>
  </h2>

  {/* Title */}
  <h1 className="ml-1 mb-4 text-black font-bold text-2xl">Find a Trip</h1>

  {/* Form */}
  <form onSubmit={submitHandler} className="flex flex-col gap-4 relative">
    {/* Connecting Line */}
    <div className="absolute h-[50px] w-[4px] bg-gray-800 left-5 top-[33px] z-0"></div>

    {/* Pickup Input */}
    <div className="relative z-10">
      <i className="ri-map-pin-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-700 text-xl" />
      <input
        onClick={() => {
          setPanelOpen(true);
          setActiveField('pickup');
        }}
        value={pickup}
        onChange={handlePickupChange}
        placeholder="Add a pick-up location"
        type="text"
        required
        className="pl-10 pr-4 py-3 w-full bg-white/70 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-600"
      />
    </div>

    {/* Destination Input */}
    <div className="relative z-10">
      <i className="ri-navigation-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-700 text-xl" />
      <input
        onClick={() => {
          setPanelOpen(true);
          setActiveField('destination');
        }}
        value={destination}
        onChange={handleDestinationChange}
        placeholder="Enter your destination"
        type="text"
        required
        className="pl-10 pr-4 py-3 w-full bg-white/70 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-600"
      />
    </div>
  </form>

  {/* Find Trip Button */}
  <button
    onClick={findTrip}
    className="mt-6 bg-black text-white w-full py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
  >
    Find Trip
  </button>
</div>

              
              <div ref={panelRef} className='bg-white w-full h-[0%]'>
                <LocationSearchPanel suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                        setPanelOpen={setPanelOpen}
                       // setVehiclePanel={setVehiclePanel}
                        setSuggestion={activeField === 'pickup' ? setPickupSuggestions : setDestinationSuggestions}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField} />
              </div>
            </div>
            <div ref={vehiclePanelRef} className='translate-y-full absolute w-full z-10 bottom-0 p-2 bg-white'>
              <VehiclePanel selectVehicle={setVehicleType}
                    fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} /> 
            </div>
            <div ref={confirmRidePanelRef} className='translate-y-full absolute w-full z-10 bottom-0 p-2 bg-white'>
              <ConfirmRide createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setConfirmRidePanel={setConfirmRidePanel}
                     setVehicleFound={setVehicleFound}
                    />
            </div>
           <div ref={vehicleFoundRef} className='translate-y-full absolute w-full z-10 bottom-0 p-2 bg-white'>
              <LookingForDriver   createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setVehicleFound={setVehicleFound}
                     />
           </div>
            <div ref={waitingForDriverRef} className='translate-y-full absolute w-full z-10 bottom-0 p-2 bg-white'>
                <WaitingForDriver
                    ride={ride}
                  //  setVehicleFound={setVehicleFound}
                    setWaitingForDriver={setWaitingForDriver}
                  //  waitingForDriver={waitingForDriver} 
                  />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard