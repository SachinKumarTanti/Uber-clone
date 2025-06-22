import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/Captaincontext';
import { toast } from 'react-toastify';
import logo from '../assets/uber-logo.png';

const CaptainSignup = () => {
  const navigate = useNavigate();
  const { setcaptain } = useContext(CaptainDataContext);

  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [color, setColor] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [capacity, setCapacity] = useState('');
  const [plate, setPlate] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const captaindata = {
      fullname: { firstname, lastname },
      email,
      password,
      vehicle: {
        color,
        plate,
        capacity,
        vehicleType,
      },
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, captaindata);

      if (response.status === 200) {
        const data = response.data;
        setcaptain(data);
        localStorage.setItem('token', data.token);

        toast.success('Captain account created! Redirecting...');
        setTimeout(() => navigate('/captain-home'), 1500);
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errMsg);
      console.error('Signup Error:', error);
    }

    setfirstname('');
    setlastname('');
    setemail('');
    setpassword('');
    setColor('');
    setCapacity('');
    setPlate('');
    setVehicleType('');
  };

  return (
    <div className="h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://media.cntraveler.com/photos/6194111487ce9726f9af5e0a/16:9/w_2560%2Cc_limit/Uber_GettyImages-696059214.jpg')" }}>
      <div className="h-full w-full flex justify-center items-center bg-black bg-opacity-50">
        <div className="backdrop-blur-lg bg-white/20 shadow-xl rounded-2xl p-10 w-[90%] max-w-xl animate-fade-in overflow-y-auto max-h-[95%]">
          <form onSubmit={submitHandler} className="flex flex-col gap-5">
            <div className="flex justify-center mb-2">
              <img src={logo} alt="uber-logo" className="w-16 h-16" />
            </div>
            <h1 className="text-white text-2xl text-center font-bold">Become a Captain</h1>

            <div className="flex gap-2">
              <input
                value={firstname}
                onChange={(e) => setfirstname(e.target.value)}
                required
                placeholder="First Name"
                className="w-1/2 p-3 rounded-md bg-white/70 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                value={lastname}
                onChange={(e) => setlastname(e.target.value)}
                required
                placeholder="Last Name"
                className="w-1/2 p-3 rounded-md bg-white/70 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <input
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
              type="email"
              placeholder="Email"
              className="p-3 rounded-md bg-white/70 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
              type="password"
              placeholder="Password"
              className="p-3 rounded-md bg-white/70 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <h2 className="text-white text-lg font-semibold text-center mt-2">Vehicle Details</h2>

            <div className="flex gap-2">
              <input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                required
                placeholder="Vehicle Color"
                className="w-1/2 p-3 rounded-md bg-white/70 text-black placeholder-gray-600"
              />
              <input
                value={plate}
                onChange={(e) => setPlate(e.target.value)}
                required
                placeholder="Plate Number"
                className="w-1/2 p-3 rounded-md bg-white/70 text-black placeholder-gray-600"
              />
            </div>

            <div className="flex gap-2">
              <input
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                required
                type="number"
                placeholder="Seating Capacity"
                className="w-1/2 p-3 rounded-md bg-white/70 text-black placeholder-gray-600"
              />
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                required
                className="w-1/2 p-3 rounded-md bg-white/70 text-black placeholder-gray-600"
              >
                <option value="" disabled>Select Type</option>
                <option value="car">Car</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="auto">Auto</option>
              </select>
            </div>

            <button type="submit" className="bg-purple-600 hover:bg-purple-700 transition-colors text-white font-semibold py-2 rounded-md">
              Create Account
            </button>
          </form>

          <p className="text-center text-white mt-4 text-sm">
            Already have an account? <Link to="/captain-login" className="text-blue-300 hover:underline">Login</Link>
          </p>

          <p className="mt-4 text-xs text-center text-gray-300">
            Protected by reCAPTCHA • <span className="underline">Privacy Policy</span> & <span className="underline">Terms</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;
