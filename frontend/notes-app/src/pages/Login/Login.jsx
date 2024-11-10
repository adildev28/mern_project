import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'


const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState(null);

  const navigate = useNavigate();
  const handleLogin = async(e) => {
    e.preventDefault();
    if(!validateEmail(email)){
      setError('please enter avalid email !');
      return;
    }
    if(!password){
      setError("please enter the password");
      return ;
    }
    setError("")
    //API CALL FOR LOGIN INTO APP
    try{
      const response = await axiosInstance.post('/login', {
        email:email,
        password:password
      });
      // handle successfull login response
      if(response.data && response.data.accessToken){
        localStorage.setItem("token",response.data.accessToken)
        navigate("/dashboard");
      }
    }catch(error){
      // handeling the error 
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("An unexpected error occurred. Please try again later !");
      }

    }

  }
  return (
    <>
    <Navbar/>
    <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border rounded px-7 py-10 bg-white'>
            <form onSubmit={handleLogin}>
                <h4 className="text-2xl mb-7">Login</h4>
                <input type="email" placeholder='Email' className='input-box'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                 />
                <PasswordInput 
                value={password}
                onChange={(e)=>setPassword(e.target.value)} />
                {error&& <p className='text-red-500 text-xs pb-1 '>{error}</p>}
                <button type="submit" value="" className="btn-primary" >Login</button>
                <p className='text-sm text-center mt-4'>
                    Not Registred Yet? {" "}
                    <Link to="/signup" className="font-medium underline text-primary">Create an Account</Link>
                </p>
            </form>
        </div>
    </div>
    </>
  )
}

export default Login