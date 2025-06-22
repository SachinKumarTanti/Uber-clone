import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/Usercontext';
import axios from 'axios';
import logo from '../assets/uber-user-logo.png';
import { toast } from 'react-toastify';

const UserSignup = () => {
  const navigate = useNavigate();
  const { user, setuser } = useContext(UserDataContext);
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const newdata = {
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
    };

    setemail('');
    setpassword('');
    setfirstname('');
    setlastname('');

    try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newdata);
    const data = response.data;
    setuser(data);
    localStorage.setItem('token', data.token);

    toast.success('Signup successful! Redirecting...');
    setTimeout(() => navigate('/home'), 1500);
  } catch (error) {
    const errMsg =
      error.response?.data?.message || 'Signup failed! Please check your input or try again.';
    toast.error(errMsg);
    console.error('Signup Error:', error);
  }
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
            <div className="flex justify-center mb-4">
              <img src={logo} alt="uber-logo" className="w-16 h-16" />
            </div>
            <h1 className="text-white text-2xl text-center font-bold">Create your Uber Account</h1>

            <div className="flex gap-2">
              <input
                value={firstname}
                onChange={(e) => setfirstname(e.target.value)}
                required
                type="text"
                placeholder="First Name"
                className="w-1/2 p-3 rounded-md bg-white/70 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                value={lastname}
                onChange={(e) => setlastname(e.target.value)}
                required
                type="text"
                placeholder="Last Name"
                className="w-1/2 p-3 rounded-md bg-white/70 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <input
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
              type="email"
              placeholder="email@example.com"
              className="p-3 rounded-md bg-white/70 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
              type="password"
              placeholder="Create Password"
              className="p-3 rounded-md bg-white/70 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 transition-colors text-white font-semibold py-2 rounded-md"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-white mt-4 text-sm">
            Have an account?{' '}
            <Link to="/login" className="text-blue-300 hover:underline">
              Login to your account
            </Link>
          </p>

          <p className="mt-6 text-xs text-center text-gray-300">
            By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and
            its affiliates to the number provided.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
