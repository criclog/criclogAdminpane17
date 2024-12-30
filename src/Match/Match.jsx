import {TextField } from '@mui/material';


import React from 'react';
import { useState } from 'react'

export const Match = () => {
  return (
    <div className='w-[100%] min-h-100vh flex flex-col '>
      <div className='w-full min-h-100vh  border-2 rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_6px]' >
        <Navbar/>
        </div>
        <div>
       <h2 className='hidden'><Matchlivedata/></h2> 
       <h2 className='hidden'><Livescore/></h2> 
       <h2 className='hidden'><Bowlingdata/></h2> 
       <h2 className='hidden'><Batterdata/></h2> 
       <h2 className='hidden'><Comments/></h2> 
       <h2 className='hidden'><Playerofmatch/></h2> 
        </div>
    </div>
  )
}



export const Navbar = () => {

    const [activeTab, setActiveTab] = useState("SCORECARD"); // Default tab
const matchnav=["Matchlivedata", "Livescore", "Bowlingdata", "Batingdata", "Comments", "Player of match"]
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
    
    return (<>                    
             <div className='px-[40px]  border-t-2 '>
              <ul className='sm:text-[16px] text-[13px] gap-3 text-[#646464] font-semibold flex justify-between items-center sticky top-65 overflow-x-scroll sm:overflow-hidden'>
             {matchnav.map((tab) => (
                    <li
                      key={tab}
                      className={`py-3 px-1 hover:text-[#4D28D4] border-b-2 cursor-pointer  ${
                        activeTab === tab
                          ? "text-[#4D28D4] border-[#4D28D4]"
                          : "text-[#646464] border-[white]"
                      }`}
                      onClick={() => handleTabClick(tab)}
                    >
                      {tab}
                    </li>))}
              </ul>
            </div>
            
          <div className="w-full py-3">
              {activeTab === "Matchlivedata" && <Matchlivedata/> }
              {activeTab === "Livescore" && <Livescore/> }
              {activeTab === "Bowlingdata" && <Bowlingdata/>}
              {activeTab === "Batingdata" && <Batterdata/>}
              {activeTab === "Comments" && <Comments/>}
              {activeTab === "Player of match" && <Playerofmatch/>}
            </div>
         
     
    </>
)
  }

export const Matchlivedata=()=>{
  return(
    <div className='w-full min-h-100vh flex flex-col justify-center items-center py-[40px] gap-[30px] '>
     <h2 className='text-[22px] font-semibold text-[#4D28D4] underline'>MATCH LIVE DATA</h2>
     <div className=''>
        <form action=""  className='w-full flex flex-col gap-[50px] justify-center items-center' >
        <div className=' w-full grid sm:grid-cols-2 grid-cols-1 grid-flow-row text-[17px] justify-center items-center gap-[40px] '>   
        <TextField id="Matchname" label="Matchname" variant="filled" type='text' />
        <TextField id="MatchID" label="MatchID" variant="filled" type='number' />
        <TextField id="location" label="Location" variant="filled" type='text' />
        <TextField id="Matchtype" label="Matchtype" variant="filled" type='text'/>
        <TextField id="Batteam" label="Batteam" variant="filled" type='text'/>
        <TextField id="Score" label="Score" variant="filled" type='number'/>
        <TextField id="Over" label="Over" variant="filled" type='number' />
        <TextField id="BowlingTeam" label="BowlingTeam" variant="filled" type='text' />
        <TextField id="Bowlingstatus" label="Bowlingstatus" variant="filled" type='text' />
        <TextField id="Tosswin" label="Tosswin" variant="filled" type='text' />
        <TextField id="Tossstatus" label="Tossstatus" variant="filled" type='text' />
        <TextField id="MatchDate" label="MatchDate" variant="filled" type='date' />
        <TextField id="Detaillocation" label="Detaillocation" variant="filled" type='text' />
        <TextField id="Updatedtime" label="Updatedtime" variant="filled" type='number' />
        <TextField id="Bowlover" label="Bowlover" variant="filled" type='number' />
          
        
        </div> 
        <div>
            <button className='w-full py-1 px-2 font-semibold sm:text-[16px] text-[14px] bg-[#4D28D4] rounded-lg text-[white] hover:scale-105 ease-in-out duration-200'>SUBMIT</button></div>
        </form>
     </div>
    </div>

  )
}



export const Livescore=()=>{
  return(
    <div className='w-full min-h-100vh flex flex-col justify-center items-center py-[40px] gap-[30px] '>
     <h2 className='text-[22px] font-semibold text-[#4D28D4] underline'>MATCH LIVE DATA</h2>
     <div className=''>
        <form action=""  className='w-full flex flex-col gap-[50px] justify-center items-center' >
        <div className=' w-full grid sm:grid-cols-2 grid-cols-1 grid-flow-row text-[17px] justify-center items-center gap-[40px] '>   
        <TextField id="MatchID" label="MatchID" variant="filled" type='number' />
        <TextField id="CurrentRR" label="CurrentRR" variant="filled" type='Number' />
        <TextField id="Projected" label="Projected" variant="filled" type='number' />
        <TextField id="OverRR" label="OverRR" variant="filled" type='number' /> 
        <TextField id="Matchofficial" label="Match official" variant="filled" type='text'/>
        <TextField id="Matchofficialrole" label="Match official role" variant="filled" type='text'/>
        
          
        
        </div> 
        <div>
            <button className='w-full py-1 px-2 font-semibold sm:text-[16px] text-[14px] bg-[#4D28D4] rounded-lg text-[white] hover:scale-105 ease-in-out duration-200'>SUBMIT</button></div>
        </form>
     </div>
    </div>

  )
}

export const Bowlingdata=()=>{
  return(
    <div className='w-full min-h-100vh flex flex-col justify-center items-center py-[40px] gap-[30px] '>
     <h2 className='text-[22px] font-semibold text-[#4D28D4] underline'>BOWLING DATA</h2>
     <div className=''>
        <form action=""  className='w-full flex flex-col gap-[50px] justify-center items-center' >
        <div className=' w-full grid sm:grid-cols-2 grid-cols-1 grid-flow-row text-[17px] justify-center items-center gap-[40px] '>   
        <TextField id="MatchID" label="MatchID" variant="filled" type='Number' />
        <TextField id="BowlerName" label="Bowler Name" variant="filled" type='text' />
        <TextField id="Over" label="Over" variant="filled" type='Number' />
        <TextField id="Med" label="Med" variant="filled" type='number' />
        <TextField id="Run" label="Run" variant="filled" type='number' /> 
        <TextField id="Wide" label="Wide" variant="filled" type='number'/>
        <TextField id="Wicket" label="Wicket" variant="filled" type='Number'/>
        <TextField id="ECO" label="ECO" variant="filled" type='Number'/>
        
          
        
        </div> 
        <div>
            <button className='w-full py-1 px-2 font-semibold sm:text-[16px] text-[14px] bg-[#4D28D4] rounded-lg text-[white] hover:scale-105 ease-in-out duration-200'>SUBMIT</button></div>
        </form>
     </div>
    </div>

  )
}

export const Batterdata=()=>{
  return(
    <div className='w-full min-h-100vh flex flex-col justify-center items-center py-[40px] gap-[30px] '>
     <h2 className='text-[22px] font-semibold text-[#4D28D4] underline'>BATTING DATA</h2>
     <div className=''>
        <form action=""  className='w-full flex flex-col gap-[50px] justify-center items-center' >
        <div className=' w-full grid sm:grid-cols-2 grid-cols-1 grid-flow-row text-[17px] justify-center items-center gap-[40px] '>   
        <TextField id="MatchID" label="MatchID" variant="filled" type='Number' />
        <TextField id="BatterName1" label="Batter Name1" variant="filled" type='text' />
        <TextField id="Run1" label="Run1" variant="filled" type='Number' />
        <TextField id="Ball1" label="Ball1" variant="filled" type='number' />
        <TextField id="Four1" label="Four1" variant="filled" type='number' /> 
        <TextField id="Six1" label="Six1" variant="filled" type='number'/>
        <TextField id="SR1" label="SR1" variant="filled" type='Number'/>
        <TextField id="Status1" label="Status1" variant="filled" type='text'/>
        <TextField id="Min1" label="Min1" variant="filled" type='number'/>
        <TextField id="BatterName2" label="Batter Name2" variant="filled" type='text' />
        <TextField id="Run2" label="Run2" variant="filled" type='Number' />
        <TextField id="Ball2" label="Ball2" variant="filled" type='number' />
        <TextField id="Four2" label="Four2" variant="filled" type='number' /> 
        <TextField id="Six2" label="Six2" variant="filled" type='number'/>
        <TextField id="SR2" label="SR2" variant="filled" type='Number'/>
        <TextField id="Status2" label="Status2" variant="filled" type='text'/>
        <TextField id="Min2" label="Min2" variant="filled" type='number'/>
        <TextField id="Yettobat" label="Yet to bat" variant="filled" type='text'/>
        <TextField id="Fallofwickets" label="Fall of wickets" variant="filled" type='text'/>
       
        
          
        
        </div> 
        <div>
            <button className='w-full py-1 px-2 font-semibold sm:text-[16px] text-[14px] bg-[#4D28D4] rounded-lg text-[white] hover:scale-105 ease-in-out duration-200'>SUBMIT</button></div>
        </form>
     </div>
    </div>

  )
}

export const Comments=()=>{
  return(
    <div className='w-full min-h-100vh flex flex-col justify-center items-center py-[40px] gap-[30px] '>
     <h2 className='text-[22px] font-semibold text-[#4D28D4] underline'>COMMENTARY</h2>
     <div className=''>
        <form action=""  className='w-full flex flex-col gap-[50px] justify-center items-center' >
        <div className=' w-full grid sm:grid-cols-2 grid-cols-1 grid-flow-row text-[17px] justify-center items-center gap-[40px] '>   
        <TextField id="MatchID" label="MatchID" variant="filled" type='number' />
        <TextField id="team1over" label="team1 over" variant="filled" type='number' />
        <TextField id="Status1" label="Status1" variant="filled" type='number' /> 
        <TextField id="Message1" label="Message1" variant="filled" type='text' /> 
        <TextField id="Endover1" label="Endover1" variant="filled" type='number' /> 
        <TextField id="Runandwicket1" label="Run and wicket1" variant="filled" type='text' /> 
        <TextField id="overallscore1" label="over all score1" variant="filled" type='number' /> 
        <TextField id="team2over" label="team2 over" variant="filled" type='number' />
        <TextField id="Status2" label="Status2" variant="filled" type='number' /> 
        <TextField id="Message2" label="Message2" variant="filled" type='text' /> 
        <TextField id="Endover2" label="Endover2" variant="filled" type='number' /> 
        <TextField id="Runandwicket2" label="Run and wicket2" variant="filled" type='text' /> 
        <TextField id="overallscore2" label="over all score2" variant="filled" type='number' /> 
          
        
        </div> 
        <div>
            <button className='w-full py-1 px-2 font-semibold sm:text-[16px] text-[14px] bg-[#4D28D4] rounded-lg text-[white] hover:scale-105 ease-in-out duration-200'>SUBMIT</button></div>
        </form>
     </div>
    </div>

  )
}


export const Playerofmatch=()=>{
  return(
    <div className='w-full min-h-100vh flex flex-col justify-center items-center py-[40px] gap-[30px] '>
     <h2 className='text-[22px] font-semibold text-[#4D28D4] underline'>PLAYER OF MATCH</h2>
     <div className=''>
        <form action=""  className='w-full flex flex-col gap-[50px] justify-center items-center' >
        <div className=' w-full grid sm:grid-cols-2 grid-cols-1 grid-flow-row text-[17px] justify-center items-center gap-[40px] '>   
        <TextField id="MatchID" label="MatchID" variant="filled" type='text' />
        <TextField id="Playername" label="Player name" variant="filled" type='text' />
        <TextField id="Team" label="Team" variant="filled" type='text' />
        <TextField id="Batting" label="Batting" variant="filled" type='text' />
        <TextField id="Bowling" label="Bowling" variant="filled" type='text' />
        
          
        
        </div> 
        <div>
            <button className='w-full py-1 px-2 font-semibold sm:text-[16px] text-[14px] bg-[#4D28D4] rounded-lg text-[white] hover:scale-105 ease-in-out duration-200'>SUBMIT</button></div>
        </form>
     </div>
    </div>

  )
}