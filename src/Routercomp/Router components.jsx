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
import { Tournament } from "../Tournament/Tournament"



export const Routercomponent = () => {
    return (
      <><Routes>
      <Route path="/" element={<Login/>}/>

      <Route  element={<Private/>}>
      <Route path="/" element={<Layout/>}>
          <Route path="/home" element={<Homesect/>}/>
          <Route path="/market" element={<Market/>}/>
          <Route path="/market/:id" element={<Market/>}/>
          <Route path="/looking" element={<Looking/>}/>
          <Route path="/looking/:id" element={<Looking/>}/>
          <Route path="/match" element={<Match/>}/>
          <Route path="/livescore/:id" element={<Match/>}/>
          <Route path="/matchlive/:id" element={<Match/>}/>
          <Route path="/playerofmatch/:id" element={<Match/>}/>
          <Route path="/comment/:id" element={<Match/>}/>
          <Route path="/bowling1/:id" element={<Match/>}/>
          <Route path="/batting1/:id" element={<Match/>}/>
          <Route path="/news" element={<Newsnavbar/>}/>
          <Route path="/localnews/:id" element={<Newsnavbar/>}/>
          <Route path="/internews/:id" element={<Newsnavbar/>}/>
          <Route path="/tournament" element={<Tournament/>}/>
          <Route path="/tournament/:id" element={<Tournament/>}/>

        </Route>
        </Route>
        
        <Route path="/forgot" element={<Forgot/>}/>
        </Routes>
        <ToastContainer/>
      </>
    )
  }