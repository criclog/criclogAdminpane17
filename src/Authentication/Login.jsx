import React, { useState } from 'react'
import logo from '../Assests/logo.png'
import axios from "axios";  
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';

let initial = {
  userName:"",
  email : "",
   mobileNo: "",
   userId: "",
}

let logininit={
    email : "",
    userId: "",
    password: "", 
}

export const Login = () => {
    const [formdata, Setform] = useState(initial);
    const [logindata, Setlogindata] = useState(logininit);
    const [Issubmitting, Setissumitting] = useState(false);
    const [loginformdata, setloginformdata]=useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target
        Setform((prevformdata) => ({ ...prevformdata, [name]: value }))
        Setlogindata((prevformdata) => ({ ...prevformdata, [name]: value }))
    }
    
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        Setissumitting(true)
    
        try {
            if (loginformdata) {
                await axios.post(`http://localhost:7000/admin/signin`, logindata)
                    .then((res) => {
                        toast.success(res.data.message)
                        localStorage.setItem("token", res.data.token)
                        Setlogindata(logininit)   
                        navigate("/home")
                    })
                    .catch((err) => toast.error(err.response.data.message))
                    .finally(() => Setissumitting(false))
    
            } else {
                await axios.post("http://localhost:7000/admin/signup", formdata)
                    .then((res) => {
                        toast.success(res.data.message)
                        Setform(initial)
                        setloginformdata(true)
                    })
                    .catch((err) => toast.error(err.response.data.message))
                    .finally(() => Setissumitting(false))
            }
        }
        catch (error) {
            console.log(error)
        }
    
    
        Setform(initial)
        Setlogindata(logininit)
    }
    

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
    <form className="flex flex-col  gap-[30px] px-[10px] " onSubmit={handleSubmit}>
        <div>
                <label className='font-semibold sm:text-[20px] text-[16px]'>Email ID </label>
                <input className="py-[1px] sm:px-3 px-2 sm:w-[250px] w-[170px] sm:text-[18px] text-[13px] ml-[12px] border-[#4D28D4] border-[2px] sm:rounded-xl rounded-lg outline-none" type="email"
                    name="email"
                    placeholder="Enter Your Email ID" 
                    value={logindata.email}
                    onChange={handleChange}  
                    required />
        </div>
        <div>
                <label className='font-semibold sm:text-[20px] text-[16px]'>User ID </label>
                <input className="py-[1px] sm:px-3 px-2 sm:w-[250px] w-[170px] sm:text-[18px] text-[13px] ml-[20px] border-[#4D28D4] border-[2px] sm:rounded-xl rounded-lg outline-none" type="text"
                    name="userId"
                    placeholder="Enter your User ID"
                    value={logindata.userId}
                    onChange={handleChange} 
                    required />
        </div>
        <div>
                <label className='font-semibold sm:text-[20px] text-[16px]'>Password </label>
                <input className="py-[1px] sm:px-3 px-2 sm:w-[250px] w-[170px] sm:text-[18px] text-[13px] ml-[3px] border-[#4D28D4] border-[2px] sm:rounded-xl rounded-lg outline-none" type="Password"
                    name="password"
                    placeholder="Enter your Password"
                    value={logindata.password}
                    onChange={handleChange} 
                    required />
        </div>
       <Link to={"/forgot"}> <p className='text-[#4D28D4] sm:text-[14px] text-[12px] underline-offset-2 underline cursor-pointer flex justify-end'>Forgot password</p></Link>
        
        <div className='w-full flex justify-center'>
        <button type="submit" disabled={Issubmitting} className="py-[2px] sm:w-[100px] w-[70px] bg-[#00FFCF] flex justify-center sm:rounded-xl rounded-lg font-semibold sm:text-[18px] text-[14px] shadow-md shadow-[#404443b0] hover:text-[#00FFCF] hover:bg-black hover:shadow-[#2b2e2d] cursor-pointer">
        {Issubmitting ? 
                         "Login..":
                            "login"}
                    </button>
                    </div>
           </form>
    <p className='sm:text-[18px] text-[13px] font-medium'>You don't have an account? <span className='text-[#4D28D4] underline-offset-2 underline cursor-pointer'  onClick={Handleregister}>Sign up</span></p>
</div>): 
(<div className='lg:w-[50%] w-[100%] mx-[25px] lg:mt-[0px] lg:mx-[0px] mt-[40px] min-h-[100vh] bg-[white] flex flex-col justify-center items-center sm:gap-[30px] gap-[25px] py-[20px] lg:rounded-r-[15px] rounded-t-[15px]'>
    <img src={logo} alt="couldn't load image" className='sm:w-[100px] w-[70px]'/>
    <h2 className='sm:text-[26px] text-[20px] font-semibold'>Create your account</h2>
    <form className="flex flex-col justify-center items-center gap-[30px] px-[10px]" onSubmit={handleSubmit}>
        <div>
                <label className='font-semibold sm:text-[20px] text-[16px]'>Name </label>
                <input className="py-[1px] sm:px-3 px-2 sm:w-[250px] w-[160px] sm:text-[18px] text-[13px] ml-[40px] border-[#4D28D4] border-[2px] sm:rounded-xl rounded-lg outline-none" type="text"
                    name="userName"
                    placeholder="Enter Your name" 
                    value={formdata.userName}
                    onChange={handleChange}  
                    required />
        </div>
        <div>
                <label className='font-semibold sm:text-[20px] text-[16px] '>Email ID </label>
                <input className="py-[1px] sm:px-3 px-2 sm:w-[250px] w-[160px] sm:text-[18px] text-[13px] ml-[20px] border-[#4D28D4] border-[2px] sm:rounded-xl rounded-lg outline-none" type="email"
                    name="email"
                    placeholder="Enter your Email ID"
                    value={formdata.email}
                    onChange={handleChange} 
                    required />
        </div>
        <div>
                <label className='font-semibold sm:text-[20px] text-[16px] '>User ID </label>
                <input className="py-[1px] sm:px-3 px-2 sm:w-[250px] w-[160px] sm:text-[18px] text-[13px] ml-[20px] border-[#4D28D4] border-[2px] sm:rounded-xl rounded-lg outline-none" type="text"
                    name="userId"
                    placeholder="Enter your user ID"
                    value={formdata.userId}
                    onChange={handleChange} 
                    required />
        </div>

        <div>
                <label className='font-semibold sm:text-[20px] text-[16px]'>Mobile No </label>
                <input className="py-[1px] sm:px-3 px-2 sm:w-[250px] w-[160px] sm:text-[18px] text-[13px] ml-[5px] border-[#4D28D4] border-[2px] sm:rounded-xl rounded-lg outline-none" type="Number"
                    name="mobileNo"
                    placeholder="Enter your Mobile No"
                    value={formdata.mobileNo}
                    onChange={handleChange} 
                    required />
        </div>
        <div className='w-full flex justify-center'>
        <button type="submit" disabled={Issubmitting} className="py-[2px] sm:w-[110px] w-[75px] bg-[#00FFCF] flex justify-center sm:rounded-xl rounded-lg font-semibold sm:text-[18px] text-[14px] shadow-md shadow-[#404443b0] hover:text-[#00FFCF] hover:bg-black hover:shadow-[#2b2e2d] cursor-pointer">
        {Issubmitting ? 
                         "Sign Up..":
                            "Sign Up"}
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
