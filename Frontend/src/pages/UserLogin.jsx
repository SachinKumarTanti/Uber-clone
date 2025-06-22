import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/Usercontext';
import logo from '../assets/uber-user-logo.png';
import { toast } from 'react-toastify';

const UserLogin = () => {
  const navigate = useNavigate();
  const { user, setuser } = useContext(UserDataContext);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const userdata = { email, password };
    setemail('');
    setpassword('');

   try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userdata);
    const data = response.data;
    setuser(data);
    localStorage.setItem('token', data.token);

    toast.success('Login successful! Redirecting...');
    setTimeout(() => navigate('/home'), 1000);
  } catch (error) {
    const errMsg =
      error.response?.data?.message || 'Login failed! Please check your email or password.';
    toast.error(errMsg);
    console.error('Login Error:', error);
  }

  };

  return (
    <div className="h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://media.cntraveler.com/photos/6194111487ce9726f9af5e0a/16:9/w_2560%2Cc_limit/Uber_GettyImages-696059214.jpg')" }}>
      <div className="h-full w-full flex justify-center items-center bg-black bg-opacity-50">
        <div className="backdrop-blur-lg bg-white/20 shadow-xl rounded-2xl p-10 w-[90%] max-w-md animate-fade-in">
          <form onSubmit={submitHandler} className="flex flex-col gap-5">
            <div className="flex justify-center mb-4">
              <img src={logo} alt="uber-logo" className="w-16 h-16" />
            </div>
            <h1 className="text-white text-2xl text-center font-bold">Welcome Back</h1>
            <p className="text-white text-sm text-center mb-2">Login to continue your ride</p>

            <input
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
              type="email"
              placeholder="Email"
              className="p-3 rounded-md bg-white/70 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
              type="password"
              placeholder="Password"
              className="p-3 rounded-md bg-white/70 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold py-2 rounded-md"
            >
              Login
            </button>
          </form>

          <p className="text-center text-white mt-4 text-sm">
            New here? <Link to="/signup" className="text-blue-300 hover:underline">Create an account</Link>
          </p>

          <Link
            to="/captain-login"
            className="mt-6 block w-full text-center bg-blue-500 hover:bg-blue-600 transition-colors text-white py-2 rounded-md font-semibold"
          >
            Sign in as Captain
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
