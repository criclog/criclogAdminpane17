import { Link } from 'react-router-dom'
import logo from '../Assests/logo.png'
import { RxCross2 } from "react-icons/rx";
import { MdMenu } from "react-icons/md";
import { useState } from 'react';


export const Navbar = () => {
    
    const [isChecked, setIsChecked] = useState(false);
   
    const handleToggle =()=>{
       setIsChecked(true)
   };
   
   
    
    const handlemenuclose =()=> {
     setIsChecked(false)
   };
   
   
     return (<>
       <div className='w-full h-[65px] shadow-lg shadow-[#00000038] bg-[white] flex flex-row justify-between items-center pl-[50px] fixed z-20'>
   
       
           <div className='md:w-[18%] w-[90%] flex items-center gap-4'>
   <p className='text-[28px] ml-[-15px] md:hidden visible cursor-pointer ' onClick={handleToggle} ><MdMenu/></p>   
          <div className='w-full flex items-center justify-center gap-3'>
          <Link to={"/"}><img src={logo} alt="couldn't load image" className='sm:w-[45px] sm:h-[45px] w-[40px] h-[40px]'/></Link> 
          <Link to={"/"}><h3 className='font-bold sm:text-[18px] text-[16px] text-[#4D28D4] '>CRICLOG</h3></Link> 
          </div> </div>
               <ul className='lg:w-[40%] md:w-[50%] w-full h-full md:flex items-center xl:gap-[25px] gap-[25px] font-semibold text-[14px] cursor-pointer md:visible hidden'>
                  
               <Link to={'/match'}>  <li className='flex flex-col items-center group'><p className='flex items-center gap-1 hover:text-[#4D28D4]'>MATCH </p> </li></Link>
                   <Link to={'/market'}> <li className='flex flex-col items-center group'><p className='flex items-center gap-1 hover:text-[#4D28D4]'>MARKET </p> </li></Link>
                   <Link to={'/looking'}> <li className='flex flex-col items-center group'><p className='flex items-center gap-1 hover:text-[#4D28D4]'>LOOKING </p> </li></Link>
                    <Link to={'/news'}><li className='flex flex-col items-center group'><p className='flex items-center gap-1 hover:text-[#4D28D4]'>NEWS</p> </li></Link>
                   
                                      
                   <Link  to={"/Login"}><button className='py-[3px] px-[5px] text-[13px]  border-[#4D28D4] border-[2px] rounded-md text-[black] hover:text-[white] hover:bg-[#4D28D4] ease-in-out duration-300'>SIGN IN</button> </Link>  
                   
                   </ul>
                   
               
   
       </div>
   
       <div className={`${isChecked? 'w-[80%] h-screen py-[30px] bg-[#ffffff] fixed z-30 overflow-y-scroll':"hidden"}`}> 
      <div className='w-full px-[40px] flex flex-col text-[14px] gap-5 '>
      <p onClick={handlemenuclose} className='text-[20px]'><RxCross2/></p>
      <Link  to={"/"}><button className='py-[6px] w-full text-[14px] font-medium border-[#4D28D4] border-[2px] rounded-md text-[black] hover:text-[white] hover:bg-[#4D28D4] ease-in-out duration-300'>SIGN IN</button> </Link>
      
      <Link to={"/home"}><p className='font-medium hover:text-[#4D28D4]'>HOME</p></Link>
      <Link to={"/match"}><p className='font-medium hover:text-[#4D28D4]'>MATCH</p></Link>
      <Link to={"/market"}><p className='font-medium hover:text-[#4D28D4]'>MARKET</p></Link>
      <Link to={"/looking"}><p className='font-medium hover:text-[#4D28D4]'>LOOKING</p></Link>
      <Link to={"/news"}><p className='font-medium hover:text-[#4D28D4]'>NEWS</p></Link>
      
        
      </div>
   </div>
   
     </>)
   }