import { Route, Routes } from "react-router-dom"
import { Market } from "../Marketpage/Market"
import { Layout } from "./Layout"
import { Looking } from "../Looking/Looking"
import { Match } from "../Match/Match"
import { Homesect } from "../Homesection/Homesect"
import { Login } from "../Authentication/Login"
import { Forgot } from "../Authentication/Forgot"
import { News } from "../News/News"




export const Routercomponent = () => {
    return (
      <>
      <Routes>
      <Route path="/" element={<Layout/>}>
      <Route path="/" element={<Homesect/>}/>
          <Route path="/market" element={<Market/>}/>
          <Route path="/looking" element={<Looking/>}/>
          <Route path="/match" element={<Match/>}/>
          <Route path="/news" element={<News/>}/>

        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgot" element={<Forgot/>}/>
        </Routes>
        
      </>
    )
  }