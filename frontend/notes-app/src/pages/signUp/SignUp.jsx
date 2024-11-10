import {React, useState} from 'react'
import Navbar from '../../components/navbar/Navbar'
import PasswordInput from '../../components/input/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';

const SignUp = () => {
  const[name,setName] = useState("");
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const[error,setError] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async(e) =>{
    e.preventDefault();
    if(!name){
      setError('please enter your name!');
      return ;
    }
    if(!validateEmail(email)){
      setError('please enter a valid email!');
      return ;
    }
    if(!password){
      setError('please enter a password!');
      return ;
    }
    setError('');
    // Sign up API CALL
    try{
      const response = await axiosInstance.post('/create-account', {
        fullName:name,
        email:email,
        password:password
      });
      // handle successfull signup response
      if(response.data && response.data.error){
        setError(response.data.message)
        return
      }
      if(response.data && response.data.accessToken){
        localStorage.setItem("token",response.data.accessToken);
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
            <form onSubmit={handleSignup}>
                <h4 className="text-2xl mb-7">Signup</h4>
                <input type="text" placeholder='Name' className='input-box'
                value={name}
                onChange={(e)=>setName(e.target.value)}
                 />
                <input type="email" placeholder='Email' className='input-box'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                 />
                 <PasswordInput  
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 />
                 {error&& <p className='text-red-500 text-xs pb-1 '>{error}</p>}
                <button type="submit" value="" className="btn-primary" >SignUp</button>
                <p className='text-sm text-center mt-4'>
                    Already have an Account? {" "}
                    <Link to="/login" className="font-medium underline text-primary">Login to your Account</Link>
                </p>
            </form>
        </div>
    </div>
    </>
  )
}

export default SignUp