import { Route, Routes } from "react-router-dom"
import { Market } from "../Marketpage/Market"
import { Layout } from "./Layout"
import { Looking } from "../Looking/Looking"
import { Match } from "../Match/Match"
import { Homesect } from "../Homesection/Homesect"
import { Login } from "../Authentication/Login"
import { Forgot } from "../Authentication/Forgot"
import { Newsnavbar } from "../News/News"
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { Private } from "./Private"



export const Routercomponent = () => {
    return (
      <><Routes>
      <Route path="/" element={<Login/>}/>

      <Route  element={<Private/>}>
      <Route path="/" element={<Layout/>}>
          <Route path="/home" element={<Homesect/>}/>
          <Route path="/market" element={<Market/>}/>
          <Route path="/looking" element={<Looking/>}/>
          <Route path="/match" element={<Match/>}/>
          <Route path="/news" element={<Newsnavbar/>}/>

        </Route>
        </Route>
        
        <Route path="/forgot" element={<Forgot/>}/>
        </Routes>
        <ToastContainer/>
      </>
    )
  }