import React from 'react'
import TextField from "@mui/material/TextField";

export const Looking = () => {
  return (
    <div className='w-full min-h-100vh flex flex-col justify-center items-center py-[90px] gap-[30px] '>
     <h2 className='text-[22px] font-semibold text-[#4D28D4] underline'>LOOKING</h2>
       <form action="" className='flex flex-col gap-7 '>
        <div className=' w-[80%] flex flex-col  justify-center gap-[30px] ml-[20px] '>
        <TextField id="Description" label="Description" variant="filled"  type='text'/>
       <h1 className='w-full flex flex-col gap-2 text-[15px] font-semibold text-[#4D28D4]'> <label htmlFor="">Image:</label>
        <input type="file" name='image' className='' /></h1> 
        </div>
        <div className='w-full flex justify-center'>
        <button className='w-[80px] py-1 px-2 font-semibold sm:text-[16px] text-[14px] bg-[#4D28D4] rounded-lg text-[white] hover:scale-105 ease-in-out duration-200'>SUBMIT</button>
            </div>
       </form>
    </div>
  )
}
