import React from 'react'
import { Boxes } from "../Components/background-boxes";
import './Home.css'
import { useAuth } from '../AuthContext'
import homeImg from '../assets/homeImg.svg'
import { Link } from 'react-router-dom'
import Footer from '../Components/Footer';
import Topics from '../Components/Topics';

const Home = () => {
  const { isAuthenticated } = useAuth()
  return (
    <div className="wrapper bg-gradient-to-tr from-blue-300 to-slate-500">
    <div className='min-h-[700px] relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg'>
      
      <Boxes/>
        <h1 className='text-6xl mx-4 mt-7 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent pt-8'>Welcome to CodeVerse - the coding universe</h1>
        <div className="content flex flex-wrap">
          <div>
        <div className='mx-4 min-h-72 max-w-[550px] text-justify'><h1 className='text-3xl text-yellow-200 pt-8'>About CodeVerse</h1>
        <p className='text-white'>Welcome to CodeVerse, your premier destination 
          for honing coding skills through interactive problem-solving and timed 
          contests. Designed for enthusiasts and professionals alike, CodeVerse 
          offers a dynamic platform where users can tackle a diverse array of 
          coding challenges to enhance their programming prowess. Engage in solo 
          practice sessions to master algorithms and data structures, or participate 
          in exhilarating contests to test your abilities under time constraints. 
          Whether you're a beginner seeking to learn the ropes or an experienced 
          coder pushing your limits, CodeVerse provides a supportive environment to 
          thrive in the world of programming. Join us today and embark on your journey 
          to code with confidence and creativity.
        </p>
        </div><br />
        {
          isAuthenticated ? (
            <Link to='/problems'>
              <button className="cssbuttons-io-button mx-4">
              Get started
              <div className="icon">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </button>
            </Link>
          ):(
            <Link to='/login'>
              <button className="cssbuttons-io-button mx-4">
              Get started
              <div className="icon">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </button>
            </Link>
          )
        }</div>

        <div className="image ml-12 mt-3">
          <img src={homeImg} alt="coding" />
        </div>
        </div>
        
    </div>
    <div className="topics">
      <Topics/>
    </div>
     <Footer/>
  </div>
    
  )
}

export default Home
