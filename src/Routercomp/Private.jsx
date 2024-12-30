import React from 'react'
import { Outlet } from 'react-router-dom'

export const Private = () => {
    const token= localStorage.getItem("token")
  return (
    <div>
    {token?(
        <>
        <Outlet/>
        </>
    ):(
        <>
        <navigate to ={"/"}/>
        </>
    )}
</div>

  )
}
