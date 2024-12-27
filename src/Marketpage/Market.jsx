import React from 'react'
import TextField from "@mui/material/TextField";





export const Market = () => {
  return (
    <div className='w-full min-h-100vh flex flex-col justify-center items-center py-[60px] gap-[30px] '>
     <h2 className='text-[22px] font-semibold text-[#4D28D4] underline'>MARKET DATA</h2>
     <div className=''>
        <form action=""  className='w-full flex flex-col gap-[50px] justify-center items-center' >
        <div className=' w-full grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid-flow-row text-[17px] justify-center items-center gap-[50px] '>   
        <TextField id="Title" label="Title" variant="filled" type='text' />
        <TextField id="location" label="Location" variant="filled" type='text' />
        <TextField id="Price" label="Price" variant="filled" type='number'/>
        <TextField id="SellerName" label="Seller Name" variant="filled" type='text'/>
        <TextField id="Description" label="Description" variant="filled" type='text' />
               <h1 className='w-full flex flex-col gap-3 font-semibold text-[#4D28D4]'><label htmlFor="">Product image:</label> 
        <input type="file" name='sellerlogo'  className='w-[230px] outline-none  px-[4px] py-[2px] rounded-lg text-[14px] text-[#4D28D4]'/></h1>
        
        </div> 
        <div>
            <button className='w-full py-1 px-2 font-semibold sm:text-[16px] text-[14px] bg-[#4D28D4] rounded-lg text-[white] hover:scale-105 ease-in-out duration-200'>SUBMIT</button></div>
        </form>
     </div>
    </div>

    
  )
}



