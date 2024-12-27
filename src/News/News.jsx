import React from 'react'
import TextField from "@mui/material/TextField";





export const News = () => {
  return (
    <div className='w-full min-h-100vh flex flex-col justify-center items-center py-[40px] gap-[30px] '>
     <h2 className='text-[22px] font-semibold text-[#4D28D4] underline'>NEWS DATA</h2>
     <div className=''>
        <form action=""  className='w-full flex flex-col gap-[50px] justify-center items-center' >
        <div className=' w-full grid sm:grid-cols-2 grid-cols-1 grid-flow-row text-[17px] justify-center items-center gap-[40px] '>   
        <TextField id="NewsTitle" label="NewsTitle" variant="filled" type='text' />
        <TextField id="location" label="Location" variant="filled" type='text' />
        <TextField id="Date" label="" variant="filled" type='date'/>
        <h1 className='w-full flex flex-col gap-3 font-semibold text-[#4D28D4]'><label htmlFor="">Product image:</label> 
        <input type="file" name='sellerlogo'  className='w-[230px] outline-none  px-[4px] py-[2px] rounded-lg text-[14px] text-[#4D28D4]'/></h1>
         <h2 className='w-full font-semibold text-[18px] underline-offset-4 underline'>News Description</h2><br />
        <TextField id="description" label="Description" variant="filled" type='text'/>
        <TextField id="matchdetail" label="Match details" variant="filled" type='text'/>
        <TextField id="Keymoments" label="Keymoments" variant="filled" type='text' />
        <TextField id="topbatter" label="TopBatter" variant="filled" type='text' />
        <TextField id="topbowler" label="Topbowler" variant="filled" type='text' />
          
        
        </div> 
        <div>
            <button className='w-full py-1 px-2 font-semibold sm:text-[16px] text-[14px] bg-[#4D28D4] rounded-lg text-[white] hover:scale-105 ease-in-out duration-200'>SUBMIT</button></div>
        </form>
     </div>
    </div>

    
  )
}
