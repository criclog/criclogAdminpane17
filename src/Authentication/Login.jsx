import React, { useState } from 'react'
import logo from '../Assests/logo.png'
import axios from "axios";  
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';
import {TextField } from '@mui/material';
import { RxCross2 } from "react-icons/rx";

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
    const [loginformdata, setloginformdata]=useState(true);
    const [OTPdata, setOTPdata]=useState(false);

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
                        localStorage.setItem("Adminuserdata", JSON.stringify(res.data.findEmail))
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

const handleotpopen=()=>{
    setOTPdata(true)
}
const handleotpclose=()=>{
    setOTPdata(false)
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
        <p className='text-[#4D28D4] sm:text-[14px] text-[12px] underline-offset-2 underline cursor-pointer flex justify-end' onClick={handleotpopen}>Forgot password</p>   
        
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
<p className={`${OTPdata? 'w-full absolute z-10':'hidden'}`}><Otpverify handleotpclose={handleotpclose}/></p>
    </div>
  )
}


const textFieldStyles = {
    '& .MuiOutlinedInput-input': {
   
      fontSize: { xs: '12px', sm: '14px', md: '16px' }, // Responsive font size
                height: { xs: '10px', sm: '15px', md: '20px' },  // Responsive height
  
    },
  };


const sendotpinit={
    email:''
}

const verifyotpinit={
    email:'',
    OTP:''
}

export const Otpverify=({handleotpclose})=>{
    const [sendotp, setsendotp]=useState(sendotpinit);
    const [verifyotp, setverifyotp]=useState(verifyotpinit);

    const handleChange = (event) => {
        const { name, value } = event.target
        setsendotp((prevsendotp) => ({ ...prevsendotp, [name]: value }))
        
    }
    const handleChangeverify = (event) => {
        const { name, value } = event.target
        setverifyotp((prevverifyotp) => ({ ...prevverifyotp, [name]: value }))
        
    }
    
    const navigate = useNavigate();
    
    const handleOTP = async (e) => {
        e.preventDefault();
      
    
        try {
            
                await axios.put(`http://localhost:7000/admin/sendadminOTP`, sendotp)
                    .then((res) => {
                        toast.success(res.data.message)                
                        setsendotp(sendotpinit)   
        
                    })
                    .catch((err) => toast.error(err.response.data.message))

    
            } 
        catch (error) {
            console.log(error)
        }
    
    
    }    

    const handleOTPVerify = async (e) => {
        e.preventDefault();
    
        try {
            
                await axios.post(`http://localhost:7000/admin/VerifyadminOTP`, verifyotp)
                    .then((res) => {
                        toast.success(res.data.message)
                        setverifyotp(verifyotpinit)    
                        navigate("/forgot")
                       
                        
                    })
                    .catch((err) => toast.error(err.response.data.message))

            } 
        catch (error) {
            console.log(error)
        }
    
    
        
    
    }    




    return(
        <div  className='h-screen bg-[#ffffff3d] backdrop-blur-md flex justify-center items-center '>
            <div className='xl:w-[50%] lg:w-[60%] md:w-[70%] sm:w-[80%] w-[90%]  min-h-100vh bg-[white] py-10 shadow-md shadow-[#00000075] border-2 border-[#4D28D4] rounded-xl flex flex-col items-center relative'>
            <RxCross2 className='sm:text-[24px] text-[18px] absolute top-[20px] sm:right-[25px] right-[15px] cursor-pointer' onClick={handleotpclose}/>
            <p className='md:text-[20px] sm:text-[18px] text-[16px] text-[#4D28D4] underline underline-offset-4'>OTP Verification</p>
            <form className='w-full py-5 flex sm:flex-row flex-col justify-center gap-3 items-center' onSubmit={handleOTP}>
            <TextField id="email" label="E-mail ID" variant="outlined" type='email' sx={textFieldStyles} name='email' onChange={handleChange} required />
            <button type='submit' className='text-[15px] bg-[#4D28D4] text-[white] px-[15px] md:h-[40px] sm:h-[35px] h-[30px] rounded-[10px] shadow-md shadow-[#0000008f] font-sans'>Send OTP</button>
            </form>
            <p className='md:text-[20px] sm:text-[18px] text-[16px] text-[#4D28D4] underline underline-offset-4'>Confirm OTP</p>
            <form className=' py-5 flex flex-col justify-center gap-[20px] items-center' onSubmit={handleOTPVerify}>
            <TextField id="email" label="E-mail ID" variant="outlined" type='email' sx={textFieldStyles} name='email' onChange={handleChangeverify} required />
            <TextField id="OTP" label="OTP" variant="outlined" type='text' sx={textFieldStyles} name='OTP' onChange={handleChangeverify} required />
            <button type='submit' className='text-[15px] bg-[#4D28D4] text-[white] w-[120px] md:h-[40px] sm:h-[35px] h-[30px]  rounded-[10px] shadow-md shadow-[#0000008f] font-sans '>Verify OTP</button>
            </form>
            </div>
           
        </div>
    )
}