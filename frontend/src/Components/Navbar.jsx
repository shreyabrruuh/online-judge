import React from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom';
import { useAuth } from '../AuthContext';
import logo2 from '../assets/logo2.png'


const Navbar = () => {

  const {isAuthenticated, logout, username} = useAuth();


  return (
    <div>
      <nav className='flex fixed top-0 w-full z-[1000]  bg-slate-900'>
        <ul className='flex space-x-7 px-10 text-white h-12'>
        <li className='pt-5 cursor-pointer'><Link to='/'><img src={logo2}  alt="logo" /></Link></li>
          <li className='pt-5 hover:first-line:underline'><Link to='/problems'>Problems</Link></li>
          <li className='pt-5 hover:first-line:underline'><Link to='/contest'>Contests</Link></li>
          
        </ul>
        {isAuthenticated ? (
          <div className='flex ml-[680px]'>
          <span className='text-white mr-2 mt-5'>Hello, {username}</span>
          <button className='button-login h-11 ms-auto mx-8 ml-4 mt-3 mb-2' onClick={logout}>Logout</button>
          </div>
        ) : (
          <button className='button-login h-11 ms-auto mx-8 mt-3 mb-2'><Link to='/login'>Login</Link></button>
        )}
      </nav>
    </div>
  )
}

export default Navbar

