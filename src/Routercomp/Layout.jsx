import { Outlet } from "react-router-dom"
import { Navbar } from "../Header/navbar"
import { Footer } from "../Footer/Footer"


export const Layout=()=>{
    return(<div className="w-full h-screen">
        <Navbar/>
        <div className="w-full min-h-100vh absolute top-[60px]">
            <Outlet/>
            <Footer/>
        </div>
        
    </div>

    )
}