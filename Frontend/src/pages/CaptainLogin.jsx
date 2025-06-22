import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/Captaincontext';
import axios from 'axios';
import { toast } from 'react-toastify';
import logo from '../assets/uber-logo.png';

const CaptainLogin = () => {
  const { setcaptain } = useContext(CaptainDataContext);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const captaindata = { email, password };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, captaindata);
      const data = response.data;
      setcaptain(data);
      localStorage.setItem('token', data.token);

      toast.success('Login successful! Redirecting...');
      setTimeout(() => navigate('/captain-home'), 1500);
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Login failed! Please check your credentials.';
      toast.error(errMsg);
      console.error('Login Error:', error);
    }

    setemail('');
    setpassword('');
  };

  return (
    <div
      className="h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://media.cntraveler.com/photos/6194111487ce9726f9af5e0a/16:9/w_2560%2Cc_limit/Uber_GettyImages-696059214.jpg')",
      }}
    >
      <div className="h-full w-full flex justify-center items-center bg-black bg-opacity-50">
        <div className="backdrop-blur-lg bg-white/20 shadow-xl rounded-2xl p-10 w-[90%] max-w-md animate-fade-in">
          <form onSubmit={submitHandler} className="flex flex-col gap-5">
            <div className="flex justify-center">
              <img src={logo} alt="uber-logo" className="w-16 h-16" />
            </div>
            <h1 className="text-white text-2xl font-bold text-center">Captain Login</h1>

            <input
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
              type="email"
              placeholder="email@example.com"
              className="p-3 rounded-md bg-white/70 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
              type="password"
              placeholder="Password"
              className="p-3 rounded-md bg-white/70 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-2 rounded-md"
            >
              Login
            </button>
          </form>

          <p className="text-white mt-4 text-center text-sm">
            New here?{' '}
            <Link to="/captain-signup" className="text-blue-300 hover:underline">
              Register as a Captain
            </Link>
          </p>

          <Link
            to="/login"
            className="mt-6 block w-full text-center bg-yellow-500 hover:bg-yellow-600 transition-colors text-white py-2 rounded-md font-semibold"
          >
            Sign in as User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaptainLogin;
