
import React from 'react'
import { Navbar } from './Header/navbar'
import { Market } from './Marketpage/Market'
import { StyledEngineProvider } from "@mui/styled-engine-sc";



export const App = () => {
  return (
    <div>
      <StyledEngineProvider injectFirst>
        <Navbar/>
        <Market/>
        </StyledEngineProvider>
    </div>
  )
}

