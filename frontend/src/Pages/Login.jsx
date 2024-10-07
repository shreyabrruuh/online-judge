import React,{useState} from 'react'
import axios from 'axios'
import './Login.css'
import {Link,useNavigate} from 'react-router-dom'
import {BiUser} from 'react-icons/bi'
import { AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import { useAuth } from '../AuthContext'

const Login = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const {login} = useAuth()

    const API_URL= 'https://online-judge-qmoq.onrender.com';

    const handleSubmit= async (e)=>{
        e.preventDefault()
        try{
            const res = await axios.post(`${API_URL}/login`,{email,password},{
                headers:{
                    'Content-Type': 'application/json'
                }
            });
            console.log(res.data);
            login(res.data.token);
            navigate('/');
        }catch(err){
            alert('User does not exist');
            if (err.response) {
                // Server responded with a status other than 200 range
                console.log('Response data:', err.response.data);
                console.log('Response status:', err.response.status);
                console.log('Response headers:', err.response.headers);
            } else if (err.request) {
                // Request was made but no response was received
                console.log('Request data:', err.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error message:', err.message);
            }
            console.log('Error config:', err.config);
        }
    };

  return (
    <div className="m-container min-h-[99.9vh] flex justify-center items-center bg-cover" >
        <div className="wrapper text-white bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
            <h1 className='text-whitefont-bold text-4xl text-center mb-6'>Login</h1>
            <form action="" onSubmit={handleSubmit}>
            <div className='relative my-4 pb-2'>
                <input type="email" onChange={(e)=> setEmail(e.target.value)} className='block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer' placeholder=''/>
                <label htmlFor="" className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:tranlate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Your Email</label>
                <BiUser className='absolute top-0 right-4'/>
            </div>
            <div className='relative my-4'>
                <input type={showPassword ? "text" : "password"} onChange={(e)=> setPassword(e.target.value)} className='block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0  focus:text-white focus:border-blue-600 peer' placeholder=''/>
                <label htmlFor="" className='absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:tranlate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'>Your Password</label>
                <span
          className="absolute right-3 top-[0] cursor-pointer"
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
                <label htmlFor="Remember me">Remember me</label>
            </div>
            <Link to='/forgot-pass' className='text-blue-600'>Forgot Password?</Link>
           </div>
        <button className='w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2' type='Submit'>Sign In</button>
        <div>
            <span className='m-4'>New Here? <Link className='text-blue-600' to='/register'>Create your Account</Link></span>
        </div>
        </form>
    </div>
    </div>
  )
}

export default Login
