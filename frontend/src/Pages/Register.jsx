import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Register = () => {
  const [Fullname, setFullname] = useState('');
  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();

  const API_URL = 'http://localhost:8000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`${API_URL}/register`, {
        fullname: Fullname,
        username: Username,
        email: Email,
        password: Password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(result.data);
      navigate('/login');
    } catch (err) {
      if (err.response) {
        alert(err.response.data);
      } else if (err.request) {
        console.log('No response received:', err.request);
      } else {
        console.log('Error:', err.message);
      }
    }
  };

  return (
    <div className="m-container min-h-[99.9vh] flex justify-center items-center bg-cover">
      <div className="wrapper text-white bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
        <h1 className='text-white font-bold text-4xl text-center mb-6'>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className='relative my-4 pb-2'>
            <input
              type="text"
              onChange={(e) => setFullname(e.target.value)}
              className='block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer'
              placeholder=''
              required
            />
            <label className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600'>Fullname</label>
          </div>
          <div className='relative my-4 pb-2'>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              className='block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer'
              placeholder=''
              required
            />
            <label className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600'>Username</label>
          </div>
          <div className='relative my-4 pb-2'>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className='block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer'
              placeholder=''
              required
            />
            <label className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600'>Your Email</label>
            <BiUser className='absolute top-0 right-4' />
          </div>
          <div className='relative my-4'>
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              className='block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer'
              placeholder=''
              required
            />
            <label className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600'>Your Password</label>
            <span
              className="absolute right-3 top-0 cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </div>
          <div className='flex justify-between items-center'>
            <div className='flex gap-2 items-center'>
              <input type="checkbox" />
              <label>Remember me</label>
            </div>
          </div>
          <button
            className='w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2'
            type='submit'
          >
            Register
          </button>
          <div>
            <span className='m-4'>Already have an account? <Link className='text-blue-600' to='/login'>Login</Link></span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

