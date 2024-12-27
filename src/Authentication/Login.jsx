import React, { useState } from 'react'
import logo from '../Assests/logo.png'
import { Link } from 'react-router-dom';

export const Login = () => {
const [loginformdata, setloginformdata]=useState(false);


const Handlelogin=()=>{
    setloginformdata(true)
    
}
const Handleregister=()=>{
    setloginformdata(false)
    
}



return (
<div className='w-full min-h-[100vh] bg-[#4D28D4] flex ' >
{loginformdata ? 
(<div className='lg:w-[50%] w-[100%] mx-[25px] lg:mt-[0px] lg:mx-[0px] mt-[40px] min-h-[100vh] bg-[white] flex flex-col justify-center items-center gap-[35px] py-[20px] lg:rounded-r-[15px] rounded-t-[15px]'>
    <img src={logo} alt="couldn't load image" className='sm:w-[100px] w-[70px]'/>
    <h2 className='sm:text-[26px] text-[22px] font-semibold'>Sign in to continue</h2>
    <form className="flex flex-col  gap-[30px] px-[10px] ">
        <div>
                <label className='font-semibold sm:text-[20px] text-[16px]'>Email ID </label>
                <input className="py-[1px] sm:px-3 px-2 sm:w-[250px] w-[170px] sm:text-[18px] text-[13px] ml-[12px] border-[#4D28D4] border-[2px] sm:rounded-xl rounded-lg outline-none" type="text"
                    name="email"
                    placeholder="Enter Your Email ID"  
                    required />
        </div>
        <div>
                <label className='font-semibold sm:text-[20px] text-[16px]'>User ID </label>
                <input className="py-[1px] sm:px-3 px-2 sm:w-[250px] w-[170px] sm:text-[18px] text-[13px] ml-[20px] border-[#4D28D4] border-[2px] sm:rounded-xl rounded-lg outline-none" type="Password"
                    name="userid"
                    placeholder="Enter your User ID"
                    required />
        </div>
        <div>
                <label className='font-semibold sm:text-[20px] text-[16px]'>Password </label>
                <input className="py-[1px] sm:px-3 px-2 sm:w-[250px] w-[170px] sm:text-[18px] text-[13px] ml-[3px] border-[#4D28D4] border-[2px] sm:rounded-xl rounded-lg outline-none" type="Password"
                    name="Password"
                    placeholder="Enter your Password"
                    required />
        </div>
       <Link to={"/forgot"}> <p className='text-[#4D28D4] sm:text-[14px] text-[12px] underline-offset-2 underline cursor-pointer flex justify-end'>Forgot password</p></Link>
        
        <div className='w-full flex justify-center'>
        <button type="submit" className="py-[2px] sm:w-[100px] w-[70px] bg-[#00FFCF] flex justify-center sm:rounded-xl rounded-lg font-semibold sm:text-[18px] text-[14px] shadow-md shadow-[#404443b0] hover:text-[#00FFCF] hover:bg-black hover:shadow-[#2b2e2d] cursor-pointer">
                       Login
                    </button>
                    </div>
           </form>
    <p className='sm:text-[18px] text-[13px] font-medium'>You don't have an account? <span className='text-[#4D28D4] underline-offset-2 underline cursor-pointer'  onClick={Handleregister}>Sign up</span></p>
</div>): 
(<div className='lg:w-[50%] w-[100%] mx-[25px] lg:mt-[0px] lg:mx-[0px] mt-[40px] min-h-[100vh] bg-[white] flex flex-col justify-center items-center sm:gap-[30px] gap-[25px] py-[20px] lg:rounded-r-[15px] rounded-t-[15px]'>
    <img src={logo} alt="couldn't load image" className='sm:w-[100px] w-[70px]'/>
    <h2 className='sm:text-[26px] text-[20px] font-semibold'>Create your account</h2>
    <form className="flex flex-col justify-center items-center gap-[30px] px-[10px]">
        <div>
                <label className='font-semibold sm:text-[20px] text-[16px]'>Name </label>
                <input className="py-[1px] sm:px-3 px-2 sm:w-[250px] w-[160px] sm:text-[18px] text-[13px] ml-[40px] border-[#4D28D4] border-[2px] sm:rounded-xl rounded-lg outline-none" type="text"
                    name="Name"
                    placeholder="Enter Your name"  
                    required />
        </div>
        <div>
                <label className='font-semibold sm:text-[20px] text-[16px] '>Email ID </label>
                <input className="py-[1px] sm:px-3 px-2 sm:w-[250px] w-[160px] sm:text-[18px] text-[13px] ml-[20px] border-[#4D28D4] border-[2px] sm:rounded-xl rounded-lg outline-none" type="email"
                    name="email"
                    placeholder="Enter your Email ID"
                    required />
        </div>
        <div>
                <label className='font-semibold sm:text-[20px] text-[16px] '>User ID </label>
                <input className="py-[1px] sm:px-3 px-2 sm:w-[250px] w-[160px] sm:text-[18px] text-[13px] ml-[20px] border-[#4D28D4] border-[2px] sm:rounded-xl rounded-lg outline-none" type="email"
                    name="user ID"
                    placeholder="Enter your user ID"
                    required />
        </div>

        <div>
                <label className='font-semibold sm:text-[20px] text-[16px]'>Mobile No </label>
                <input className="py-[1px] sm:px-3 px-2 sm:w-[250px] w-[160px] sm:text-[18px] text-[13px] ml-[5px] border-[#4D28D4] border-[2px] sm:rounded-xl rounded-lg outline-none" type="Number"
                    name="Mobile"
                    placeholder="Enter your Mobile No"
                    required />
        </div>
        <div className='w-full flex justify-center'>
        <button type="submit" className="py-[2px] sm:w-[110px] w-[75px] bg-[#00FFCF] flex justify-center sm:rounded-xl rounded-lg font-semibold sm:text-[18px] text-[14px] shadow-md shadow-[#404443b0] hover:text-[#00FFCF] hover:bg-black hover:shadow-[#2b2e2d] cursor-pointer">
                       Sign Up
                    </button>
                    </div>
           </form>
    
    <p className='sm:text-[18px] text-[13px] font-medium'>Do you have an account? <span className='text-[#4D28D4] underline-offset-2 underline cursor-pointer'  onClick={Handlelogin}>Login</span></p>
</div>)
}


<div className='lg:w-[50%] w-[0%] min-h-[100vh] flex flex-col justify-center items-center gap-[10px]'>
    <div className='lg:w-[140px] lg:h-[140px] w-[0px] h-[0px] bg-black rounded-full lg:px-5 lg:py-8 lg:border-2 border-[#00FFCF]'>
<img src={logo} alt="couldn't load image" className='lg:w-[120px]  w-[0px]'/>
</div>
<h1 className='lg:text-[34px]  text-[0px] font-semibold text-[#00FFCF]'>CRICLOG</h1>
<p className='lg:text-[32px] text-[0px]  font-medium text-[white] lg:px-[90px] text-center pt-[70px]'>WORLD'S BIGGEST CRICKET NETWORK</p>
</div>
    </div>
  )
}
