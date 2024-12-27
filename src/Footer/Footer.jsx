import React from 'react'

export const Footer = () => {
  const copyright = String.fromCodePoint(169);
  return (
    <div className='w-full min-h-100vh bg-[#171827] py-[30px] flex flex-col items-center justify-center gap-[20px] px-[25px]'>
        <div className='w-full'>
            <ul className=' min-h-100vh flex flex-wrap justify-center items-center sm:gap-[22px] md:gap-[40px] gap-[12px] font-bold text-[#89898b] md:font-semibold md:text-[14px] sm:text-[12px] text-[11px] '>
              <li>ABOUT</li>
              <li>JOBS</li>
              <li>PRIVACY POLICY </li>
              <li>TERMS OF SERVICE</li>
              <li>PAID SERVICE TERMS</li>
              <li>ICC POLICY</li>
              </ul>   
        </div>
        <div className='w-3/4 h-[1px] bg-[#7b7b7c] '></div>
        <div>
              <p className=' text-[#89898b] font-semibold md:text-[16px] sm:text-[14px] text-[12px] '> {copyright} CricLog Pvt Ltd. All rights reserved.</p>
        </div>
    </div>
  )
}
