import {TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { Config } from '../utils/Token';
import axios from "axios";
import { Batting1card, Batting2card, Bowling1card, Bowling2card, CommentaryCard, Livescorecard, Matchlivecard, PlayerofmatchdataCard } from './Matchcard';





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
       <h2 className='hidden'><Bowlingdata2/></h2> 
       <h2 className='hidden'><Batterdata/></h2> 
       <h2 className='hidden'><Batterdata2/></h2> 
       <h2 className='hidden'><Comments/></h2> 
       <h2 className='hidden'><Playerofmatch/></h2> 
        </div>
    </div>
  )
}



export const Navbar = () => {

    const [activeTab, setActiveTab] = useState("Match live data"); // Default tab
const matchnav=["Match live data", "Livescore", "Bowlingdata", 'Bowling 2', "Batingdata", "Bating 2", "Comments", "Player of match"]
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
    
    return (<>                    
             <div className='px-[40px]  border-t-2 '>
              <ul className='sm:text-[14px] text-[13px] gap-1 text-[#646464] font-semibold flex justify-between items-center sticky top-65 overflow-x-scroll xl:overflow-hidden'>
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
              {activeTab === "Match live data" && <Matchlivedata/> }
              {activeTab === "Livescore" && <Livescore/> }
              {activeTab === "Bowlingdata" && <Bowlingdata/>}
              {activeTab === "Bowling 2" && <Bowlingdata2/>}
              {activeTab === "Batingdata" && <Batterdata/>}
              {activeTab === "Bating 2" && <Batterdata2/>}
              {activeTab === "Comments" && <Comments/>}
              {activeTab === "Player of match" && <Playerofmatch/>}
            </div>
         
     
    </>
)
  }



const Matchliveinit={
matchname:'',
MatchID:'',
location:'',
batteam:'',
over:'',
bowlingstatus:'',
detaillocation:'',
bowlover:'',
matchtype:'',
score:'',
bowlingteam:'',
tosswin:'',
tossstatus:'',
Updatedtime:'',
MatchDate:'',
Team1players: [],
    Team2players: [],
}
export const Matchlivedata=()=>{
  const [Matchliveformdata, SetMatchliveformdata] = useState(Matchliveinit);
  const [Issubmitting, Setissumitting] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  

  const handleChange = (event) => {
    const { name, value } = event.target
    SetMatchliveformdata((prevMatchliveform) => ({ ...prevMatchliveform, [name]: value }));
  };

  const getmatchliveById = async (id) => {
    try {
       await axios.get(`https://criclogbackendtest01.vercel.app/getMatchById?MatchID=${id}`, Config)
       .then((res) => {
        toast.success(res.data.message)  
        SetMatchliveformdata(res.data);  
    })
    .catch((err) => console.log(err))
    .finally(() => setIsEdit(true))
      
    } catch (error) {
      toast.error(error.res.data.message );
    }
  };

   useEffect(() => {
      if (id) {
        getmatchliveById(id);
      }
    }, [id]);

const handleSubmit = async (e) => {
  e.preventDefault();
  Setissumitting(true)

 

  try {
    if (isEdit) {
      await axios.put(`https://criclogbackendtest01.vercel.app/updateMatchById?MatchID=${Matchliveformdata.MatchID}`, Matchliveformdata, Config)
      .then((res) => {toast.success(res.data.message)
       navigate('/match');
       
      })
      .catch((err) => console.log(err))
             .finally(() => Setissumitting(false))
   } else {
  await axios.post("https://criclogbackendtest01.vercel.app/createMatch", Matchliveformdata, Config)
              .then((res) => {
                  toast.success(res.data.message)  
              })
              .catch((err) => console.log(err))
              .finally(() => Setissumitting(false))
      }}
  
  catch (error) {
      console.log(error)
  }


  SetMatchliveformdata(Matchliveinit)

}

const handleclear=()=>{
  setIsEdit(false)
  SetMatchliveformdata(Matchliveinit)
}


  return(
    <div className='w-full min-h-100vh flex flex-col justify-center items-center py-[40px] gap-[30px] '>
     <h2 className='text-[22px] font-semibold text-[#4D28D4] underline'>{isEdit ? 'EDIT MATCH DATA' : 'MATCH LIVE DATA'}</h2>
     <div className=''>
        <form onSubmit={handleSubmit}   className='w-full flex flex-col gap-[50px] justify-center items-center' >
        <div className=' w-full grid sm:grid-cols-2 grid-cols-1 grid-flow-row text-[17px] justify-center items-center gap-[40px] '>   
        <TextField id="Matchname" label="Matchname" variant="filled" type='text' name='matchname' value={Matchliveformdata.matchname} onChange={handleChange}  />
        <TextField id="MatchID" label="MatchID" variant="filled" type='text' name='MatchID' value={Matchliveformdata.MatchID} onChange={handleChange} required />
        <TextField id="location" label="Location" variant="filled" type='text' name='location' value={Matchliveformdata.location} onChange={handleChange}  />
        <TextField id="Matchtype" label="Matchtype" variant="filled" type='text' name='matchtype'value={Matchliveformdata.matchtype} onChange={handleChange} />
        <TextField id="Batteam" label="Batteam" variant="filled" type='text' name='batteam'value={Matchliveformdata.batteam} onChange={handleChange} />
        <TextField id="Score" label="Score" variant="filled" type='text' name='score'value={Matchliveformdata.score} onChange={handleChange} />
        <TextField id="Over" label="Over" variant="filled" type='number' name='over' value={Matchliveformdata.over} onChange={handleChange} />
        <TextField id="BowlingTeam" label="BowlingTeam" variant="filled" type='text' name='bowlingteam' value={Matchliveformdata.bowlingteam} onChange={handleChange} />
        <TextField id="Bowlingstatus" label="Bowlingstatus" variant="filled" type='text' name='bowlingstatus' value={Matchliveformdata.bowlingstatus} onChange={handleChange}  />
        <TextField id="Tosswin" label="Tosswin" variant="filled" type='text' name='tosswin' value={Matchliveformdata.tosswin} onChange={handleChange} />
        <TextField id="Tossstatus" label="Tossstatus" variant="filled" type='text' name='tossstatus' value={Matchliveformdata.tossstatus} onChange={handleChange} />
        <TextField id="MatchDate" label="MatchDate" variant="filled" type='date' name='MatchDate' value={Matchliveformdata.MatchDate} onChange={handleChange} />
        <TextField id="Detaillocation" label="Detaillocation" variant="filled" type='text' name='detaillocation' value={Matchliveformdata.detaillocation} onChange={handleChange} />
        <TextField id="Updatedtime" label="Updatedtime" variant="filled" type='text' name='Updatedtime' value={Matchliveformdata.Updatedtime} onChange={handleChange} />
        <TextField id="Bowlover" label="Bowlover" variant="filled" type='number' name='bowlover' value={Matchliveformdata.bowlover} onChange={handleChange} />
        <TextField id="Team1players" label="Team1players" variant="filled" type="text" name="Team1players" value={Matchliveformdata.Team1players.join(", ")} // Display as a comma-separated string
  onChange={(e) => {
    handleChange({
      target: {
        name: "Team1players",
        value: e.target.value.split(", "), // Convert back to an array
      },
    });
  }}
/>
<TextField id="Team2players" label="Team2players"  variant="filled"  type="text"  name="Team2players"  value={Matchliveformdata.Team2players.join(", ")}
  onChange={(e) => {
    handleChange({
      target: {
        name: "Team2players",
        value: e.target.value.split(", "),
      },
    });
  }}
/>
       
        </div> 
        <div className=' flex gap-[40px]'>
        <button className='px-4 py-2 font-semibold bg-[#4a2be0] text-white rounded-lg hover:scale-105 transition'>
          {Issubmitting ? (isEdit ? 'Updating...' : 'Submitting...') : (isEdit ? 'Update' : 'Submit')}
  
        </button>
        {isEdit? (<Link to={'/match'}><button className='px-4 py-2 font-semibold bg-[#c94141] text-white rounded-lg hover:scale-105 transition' onClick={handleclear}>cancel</button></Link>):''}
        </div>      
                </form>
     </div>
     <Matchlivecard/>
    </div>

  )
}



const Livescoreinit={
  MatchID:'',
  currentRR:'',
  projected:'',
  overRR:'',
  matchofficial:'',
  matchofficialrole:''
}

export const Livescore=()=>{
  const [livescoreformdata, Setlivescoreform] = useState(Livescoreinit);
  const [Issubmitting, Setissumitting] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  

  const handleChange = (event) => {
    const { name, value } = event.target
      Setlivescoreform((prevliveformdata) => ({ ...prevliveformdata, [name]: value }));
  };

  const getlivescoretById = async (id) => {
    try {
       await axios.get(`https://criclogbackendtest01.vercel.app/getMatchLiveById?MatchID=${id}`, Config)
       .then((res) => {
        toast.success(res.data.message)  
        Setlivescoreform(res.data);  
    })
    .catch((err) => console.log(err))
    .finally(() => setIsEdit(true))
      
    } catch (error) {
      toast.error(error.res.data.message );
    }
  };

   useEffect(() => {
      if (id) {
        getlivescoretById(id);
      }
    }, [id]);

const handleSubmit = async (e) => {
  e.preventDefault();
  Setissumitting(true)

 

  try {
    if (isEdit) {
      await axios.put(`https://criclogbackendtest01.vercel.app/updateMatchLiveById?MatchID=${livescoreformdata.MatchID}`, livescoreformdata, Config)
      .then((res) => {toast.success(res.data.message)
       navigate('/match');
       
      })
      .catch((err) => console.log(err))
             .finally(() => Setissumitting(false))
   } else {
  await axios.post("https://criclogbackendtest01.vercel.app/createMatchLive", livescoreformdata, Config)
              .then((res) => {
                  toast.success(res.data.message)  
              })
              .catch((err) => console.log(err))
              .finally(() => Setissumitting(false))
      }}
  
  catch (error) {
      console.log(error)
  }


  Setlivescoreform(Livescoreinit)

}

const handleclear=()=>{
  setIsEdit(false)
  Setlivescoreform(Livescoreinit)
}

  return(
    <div className='w-full min-h-100vh flex flex-col justify-center items-center py-[40px] gap-[30px] '>
     <h2 className='text-[22px] font-semibold text-[#4D28D4] underline'>{isEdit ? 'EDIT LIVE DATA' : 'LIVE SCORE DATA'}</h2>
     <div className=''>
        <form onSubmit={handleSubmit}  className='w-full flex flex-col gap-[50px] justify-center items-center' >
        <div className=' w-full grid sm:grid-cols-2 grid-cols-1 grid-flow-row text-[17px] justify-center items-center gap-[40px] '>   
        <TextField id="MatchID" label="MatchID" variant="filled" type='string' name='MatchID' value={livescoreformdata.MatchID} onChange={handleChange} required />
        <TextField id="currentRR" label="CurrentRR" variant="filled" type='Number' name='currentRR' value={livescoreformdata.currentRR} onChange={handleChange} />
        <TextField id="Projected" label="Projected" variant="filled" type='number' name='projected' value={livescoreformdata.projected} onChange={handleChange} />
        <TextField id="OverRR" label="OverRR" variant="filled" type='text' name='overRR' value={livescoreformdata.overRR} onChange={handleChange} /> 
        <TextField id="Matchofficial" label="Match official" variant="filled" type='text' name='matchofficial' value={livescoreformdata.matchofficial} onChange={handleChange}/>
        <TextField id="Matchofficialrole" label="Match official role" variant="filled" type='text' name='matchofficialrole' value={livescoreformdata.matchofficialrole} onChange={handleChange}/>
        
        
        </div> 
        <div className=' flex gap-[40px]'>
        <button className='px-4 py-2 font-semibold bg-[#4a2be0] text-white rounded-lg hover:scale-105 transition'>
          {Issubmitting ? (isEdit ? 'Updating...' : 'Submitting...') : (isEdit ? 'Update' : 'Submit')}
  
        </button>
        {isEdit? (<Link to={'/match'}><button className='px-4 py-2 font-semibold bg-[#c94141] text-white rounded-lg hover:scale-105 transition' onClick={handleclear}>cancel</button></Link>):''}
        </div>       
         </form>
     </div>
     <Livescorecard/>
     
    </div>

  )
}

const bowl1init={
  MatchID:'',
  bowlername:'',
  over:'',
  run:'',
  wicket:'',
  med:'',
  wide:'',
  ECO:''
}


export const Bowlingdata=()=>{
  const [Bowling1data, SetBowling1data] = useState(bowl1init);
  const [Issubmitting, Setissumitting] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  

  const handleChange = (event) => {
    const { name, value } = event.target
    SetBowling1data((prevliveformdata) => ({ ...prevliveformdata, [name]: value }));
  };

  const getbowling1ById = async (id) => {
    try {
       await axios.get(`https://criclogbackendtest01.vercel.app/getBowlingDataByIdandupdate?objid=${id}`, Config)
       .then((res) => {
        toast.success(res.data.message)  
        SetBowling1data(res.data);  
    })
    .catch((err) => console.log(err))
    .finally(() => setIsEdit(true))
      
    } catch (error) {
      toast.error(error.res.data.message );
    }
  };

   useEffect(() => {
      if (id) {
        getbowling1ById(id);
      }
    }, [id]);

const handleSubmit = async (e) => {
  e.preventDefault();
  Setissumitting(true)

 

  try {
    if (isEdit) {
      await axios.put(`https://criclogbackendtest01.vercel.app/updateBowlingDataById?objid=${Bowling1data._id}`, Bowling1data, Config)
      .then((res) => {toast.success(res.data.message)
       navigate('/match');
       
      })
      .catch((err) => console.log(err))
             .finally(() => Setissumitting(false))
   } else {
  await axios.post("https://criclogbackendtest01.vercel.app/BowlingData", Bowling1data, Config)
              .then((res) => {
                  toast.success(res.data.message)  
              })
              .catch((err) => console.log(err))
              .finally(() => Setissumitting(false))
      }}
  
  catch (error) {
      console.log(error)
  }


  SetBowling1data(bowl1init)

}

const handleclear=()=>{
  setIsEdit(false)
  SetBowling1data(bowl1init)
}

  return(
    <div className='w-full min-h-100vh flex flex-col justify-center items-center py-[40px] gap-[30px] '>
     <h2 className='text-[22px] font-semibold text-[#4D28D4] underline'>{isEdit ? 'EDIT LIVE DATA' : 'BOWLING DATA'}</h2>
     <div className=''>
        <form onSubmit={handleSubmit} className='w-full flex flex-col gap-[50px] justify-center items-center' >
        <div className=' w-full grid sm:grid-cols-2 grid-cols-1 grid-flow-row text-[17px] justify-center items-center gap-[40px] '>   
        <TextField id="MatchID" label="MatchID" variant="filled" type='text' name='MatchID' value={Bowling1data.MatchID} onChange={handleChange} required/>
        <TextField id="BowlerName" label="Bowler Name" variant="filled" type='text' name='bowlername' value={Bowling1data.bowlername} onChange={handleChange} />
        <TextField id="Over" label="Over" variant="filled" type='Number' name='over' value={Bowling1data.over} onChange={handleChange}/>
        <TextField id="Med" label="Med" variant="filled" type='number' name='med' value={Bowling1data.med} onChange={handleChange}/>
        <TextField id="Run" label="Run" variant="filled" type='number' name='run'  value={Bowling1data.run} onChange={handleChange}/> 
        <TextField id="Wide" label="Wide" variant="filled" type='number' name='wide' value={Bowling1data.wide} onChange={handleChange}/>
        <TextField id="Wicket" label="Wicket" variant="filled" type='Number' name='wicket'value={Bowling1data.wicket} onChange={handleChange}/>
        <TextField id="ECO" label="ECO" variant="filled" type='Number' name='ECO'value={Bowling1data.ECO} onChange={handleChange}/>
        </div> 
        
        <div className=' flex gap-[40px]'>
        <button className='px-4 py-2 font-semibold bg-[#4a2be0] text-white rounded-lg hover:scale-105 transition'>
          {Issubmitting ? (isEdit ? 'Updating...' : 'Submitting...') : (isEdit ? 'Update' : 'Submit')}
  
        </button>
        {isEdit? (<Link to={'/match'}><button className='px-4 py-2 font-semibold bg-[#c94141] text-white rounded-lg hover:scale-105 transition' onClick={handleclear}>cancel</button></Link>):''}
        </div>              </form>
     </div>
     <Bowling1card/>
    </div>

  )
}



const bowl2init={
  MatchID:'',
  bowlername2:'',
  over2:'',
  run2:'',
  wicket2:'',
  med2:'',
  wide2:'',
  ECO2:''
}


export const Bowlingdata2=()=>{

  const [Bowling2data, SetBowling2data] = useState(bowl2init);
  const [Issubmitting, Setissumitting] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  

  const handleChange = (event) => {
    const { name, value } = event.target
    SetBowling2data((prevliveformdata) => ({ ...prevliveformdata, [name]: value }));
  };

  const getbowling2ById = async (id) => {
    try {
       await axios.get(`https://criclogbackendtest01.vercel.app/getBowlingData2ByIdandupdate?objid=${id}`, Config)
       .then((res) => {
        toast.success(res.data.message)  
        SetBowling2data(res.data);  
    })
    .catch((err) => console.log(err))
    .finally(() => setIsEdit(true))
      
    } catch (error) {
      toast.error(error.res.data.message );
    }
  };

   useEffect(() => {
      if (id) {
        getbowling2ById(id);
      }
    }, [id]);

const handleSubmit = async (e) => {
  e.preventDefault();
  Setissumitting(true)

 

  try {
    if (isEdit) {
      await axios.put(`https://criclogbackendtest01.vercel.app/updateBowlingData2ById?objid=${Bowling2data._id}`, Bowling2data, Config)
      .then((res) => {toast.success(res.data.message)
       navigate('/match');
       
      })
      .catch((err) => console.log(err))
             .finally(() => Setissumitting(false))
   } else {
  await axios.post("https://criclogbackendtest01.vercel.app/BowlingData2", Bowling2data, Config)
              .then((res) => {
                  toast.success(res.data.message)  
              })
              .catch((err) => console.log(err))
              .finally(() => Setissumitting(false))
      }}
  
  catch (error) {
      console.log(error)
  }


  SetBowling2data(bowl2init)

}

const handleclear=()=>{
  setIsEdit(false)
  SetBowling2data(bowl2init)
}

  return(
    <div className='w-full min-h-100vh flex flex-col justify-center items-center py-[40px] gap-[30px] '>
     <h2 className='text-[22px] font-semibold text-[#4D28D4] underline'>{isEdit ? 'EDIT LIVE DATA' : 'BOWLING DATA TEAM 2'}</h2>
     <div className=''>
        <form onSubmit={handleSubmit} className='w-full flex flex-col gap-[50px] justify-center items-center' >
        <div className=' w-full grid sm:grid-cols-2 grid-cols-1 grid-flow-row text-[17px] justify-center items-center gap-[40px] '>   
        <TextField id="MatchID" label="MatchID" variant="filled" type='text' name='MatchID' value={Bowling2data.MatchID} onChange={handleChange} required/>
        <TextField id="BowlerName2" label="Bowler Name Team 2" variant="filled" type='text' name='bowlername2' value={Bowling2data.bowlername2} onChange={handleChange}  />
        <TextField id="Overteam2" label="Over Team 2" variant="filled" type='Number' name='over2' value={Bowling2data.over2} onChange={handleChange}/>
        <TextField id="Medteam2" label="Med Team 2" variant="filled" type='number' name='med2' value={Bowling2data.med2} onChange={handleChange}/>
        <TextField id="Runteam2" label="Run Team 2" variant="filled" type='number' name='run2' value={Bowling2data.run2} onChange={handleChange}/> 
        <TextField id="Wideteam2" label="Wide Team 2" variant="filled" type='number' name='wide2' value={Bowling2data.wide2} onChange={handleChange}/>
        <TextField id="Wicketteam2" label="Wicket Team 2" variant="filled" type='Number' name='wicket2' value={Bowling2data.wicket2} onChange={handleChange}/>
        <TextField id="ECO2" label="ECO Team2" variant="filled" type='Number' name='ECO2' value={Bowling2data.ECO2} onChange={handleChange}/>
        
          
        </div> 
        <div className=' flex gap-[40px]'>
        <button className='px-4 py-2 font-semibold bg-[#4a2be0] text-white rounded-lg hover:scale-105 transition'>
          {Issubmitting ? (isEdit ? 'Updating...' : 'Submitting...') : (isEdit ? 'Update' : 'Submit')}
  
        </button>
        {isEdit? (<Link to={'/match'}><button className='px-4 py-2 font-semibold bg-[#c94141] text-white rounded-lg hover:scale-105 transition' onClick={handleclear}>cancel</button></Link>):''}
        </div>         </form>
     </div>
     <Bowling2card/>
    </div>

  )
}



const bat1init={
  MatchID:'',
  Run1:'',
  Four1:'',
  SR1:'',
  Min1:'',
  Run2:'',
  Four2:'',
  SR2:'',
  Min2:'',
  Status1:'',
  fallofwickets:'',
  BatterName1:'',
  Ball1:'',
  Six1:'',
  BatterName2:'',
  Ball2:'',
  Six2:'',
  Status2:'',
  Yettobat:''
}
        

export const Batterdata=()=>{
  const [Bating1data, SetBating1data] = useState(bat1init);
  const [Issubmitting, Setissumitting] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  

  const handleChange = (event) => {
    const { name, value } = event.target
    SetBating1data((prevliveformdata) => ({ ...prevliveformdata, [name]: value }));
  };

  const getbat1ById = async (id) => {
    try {
       await axios.get(`https://criclogbackendtest01.vercel.app/getbatting1ByIdandupdate?objid=${id}`, Config)
       .then((res) => {
        toast.success(res.data.message)  
        SetBating1data(res.data);  
    })
    .catch((err) => console.log(err))
    .finally(() => setIsEdit(true))
      
    } catch (error) {
      toast.error(error.res.data.message );
    }
  };

   useEffect(() => {
      if (id) {
        getbat1ById(id);
      }
    }, [id]);

const handleSubmit = async (e) => {
  e.preventDefault();
  Setissumitting(true)

 

  try {
    if (isEdit) {
      await axios.put(`https://criclogbackendtest01.vercel.app/updateBattingData1ById?objid=${Bating1data._id}`, Bating1data, Config)
      .then((res) => {toast.success(res.data.message)
       navigate('/match');
       
      })
      .catch((err) => console.log(err))
             .finally(() => Setissumitting(false))
   } else {
  await axios.post("https://criclogbackendtest01.vercel.app/BattingData1", Bating1data, Config)
              .then((res) => {
                  toast.success(res.data.message)  
              })
              .catch((err) => console.log(err))
              .finally(() => Setissumitting(false))
      }}
  
  catch (error) {
      console.log(error)
  }


  SetBating1data(bat1init)

}

const handleclear=()=>{
  setIsEdit(false)
  SetBating1data(bat1init)
}
  return(
    <div className='w-full min-h-100vh flex flex-col justify-center items-center py-[40px] gap-[30px] '>
     <h2 className='text-[22px] font-semibold text-[#4D28D4] underline'>{isEdit ? 'EDIT  DATA' : 'BATTING DATA'}</h2>
     <div className=''>
        <form onSubmit={handleSubmit}  className='w-full flex flex-col gap-[50px] justify-center items-center' >
        <div className=' w-full grid sm:grid-cols-2 grid-cols-1 grid-flow-row text-[17px] justify-center items-center gap-[40px] '>   
        <TextField id="MatchID" label="MatchID" variant="filled" type='text' name='MatchID' value={Bating1data.MatchID} onChange={handleChange}/>
        <TextField id="BatterName1" label="Batter Name1" variant="filled" type='text' name='BatterName1' value={Bating1data.BatterName1} onChange={handleChange}/>
        <TextField id="Run1" label="Run1" variant="filled" type='Number' name='Run1' value={Bating1data.Run1} onChange={handleChange} />
        <TextField id="Ball1" label="Ball1" variant="filled" type='number' name='Ball1' value={Bating1data.Ball1} onChange={handleChange} />
        <TextField id="Four1" label="Four1" variant="filled" type='number' name='Four1' value={Bating1data.Four1} onChange={handleChange} /> 
        <TextField id="Six1" label="Six1" variant="filled" type='number' name='Six1' value={Bating1data.Six1} onChange={handleChange}/>
        <TextField id="SR1" label="SR1" variant="filled" type='Number' name='SR1' value={Bating1data.SR1} onChange={handleChange}/>
        <TextField id="Status1" label="Status1" variant="filled" type='text' name='Status1' value={Bating1data.Status1} onChange={handleChange}/>
        <TextField id="Min1" label="Min1" variant="filled" type='number' name='Min1' value={Bating1data.Min1} onChange={handleChange}/>
        <TextField id="BatterName2" label="Batter Name2" variant="filled" type='text' name='BatterName2'  value={Bating1data.BatterName2} onChange={handleChange}/>
        <TextField id="Run2" label="Run2" variant="filled" type='Number' name='Run2'  value={Bating1data.Run2} onChange={handleChange}/>
        <TextField id="Ball2" label="Ball2" variant="filled" type='number' name='Ball2' value={Bating1data.Ball2} onChange={handleChange}/>
        <TextField id="Four2" label="Four2" variant="filled" type='number' name='Four2' value={Bating1data.Four2} onChange={handleChange}/> 
        <TextField id="Six2" label="Six2" variant="filled" type='number' name='Six2' value={Bating1data.Six2} onChange={handleChange}/>
        <TextField id="SR2" label="SR2" variant="filled" type='Number' name='SR2' value={Bating1data.SR2} onChange={handleChange}/>
        <TextField id="Status2" label="Status2" variant="filled" type='text' name='Status2' value={Bating1data.Status2} onChange={handleChange}/>
        <TextField id="Min2" label="Min2" variant="filled" type='number' name='Min2' value={Bating1data.Min2} onChange={handleChange}/>
        <TextField id="Yettobat" label="Yet to bat" variant="filled" type='text' name='Yettobat' value={Bating1data.Yettobat} onChange={handleChange}/>
        <TextField id="Fallofwickets" label="Fall of wickets" variant="filled" type='text' name='fallofwickets' value={Bating1data.fallofwickets} onChange={handleChange}/>
          
        
        </div> 
        <div className=' flex gap-[40px]'>
        <button className='px-4 py-2 font-semibold bg-[#4a2be0] text-white rounded-lg hover:scale-105 transition'>
          {Issubmitting ? (isEdit ? 'Updating...' : 'Submitting...') : (isEdit ? 'Update' : 'Submit')}
  
        </button>
        {isEdit? (<Link to={'/match'}><button className='px-4 py-2 font-semibold bg-[#c94141] text-white rounded-lg hover:scale-105 transition' onClick={handleclear}>cancel</button></Link>):''}
        </div>  
        </form>
     </div>
     <Batting1card/>
    </div>

  )
}



const bat2init={
  MatchID:'',
  Team2Run1:'',
  Team2Four1:'',
  Team2SR1:'',
  Team2Min1:'',
  Team2Run2:'',
  Team2Four2:'',
  Team2SR2:'',
  Team2Min2:'',
  Team2fallofwickets:'',
  Team2BatterName1:'',
  Team2Ball1:'',
  Team2Six1:'',
  Team2Status1:'',
  Team2BatterName2:'',
  Team2Ball2:'',
  Team2Six2:'',
  Team2Status2:'',
  Team2Yettobat:''
}

export const Batterdata2=()=>{
  const [Bating2data, SetBating2data] = useState(bat2init);
  const [Issubmitting, Setissumitting] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  

  const handleChange = (event) => {
    const { name, value } = event.target
    SetBating2data((prevliveformdata) => ({ ...prevliveformdata, [name]: value }));
  };

  const getbat2ById = async (id) => {
    try {
       await axios.get(`https://criclogbackendtest01.vercel.app/getbatting2ByIdandupdate?objid=${id}`, Config)
       .then((res) => {
        toast.success(res.data.message)  
        SetBating2data(res.data);  
    })
    .catch((err) => console.log(err))
    .finally(() => setIsEdit(true))
      
    } catch (error) {
      toast.error(error.res.data.message );
    }
  };

   useEffect(() => {
      if (id) {
        getbat2ById(id);
      }
    }, [id]);

const handleSubmit = async (e) => {
  e.preventDefault();
  Setissumitting(true)

 

  try {
    if (isEdit) {
      await axios.put(`https://criclogbackendtest01.vercel.app/updateBattingData2ById?objid=${Bating2data._id}`, Bating2data, Config)
      .then((res) => {toast.success(res.data.message)
       navigate('/match');
       
      })
      .catch((err) => console.log(err))
             .finally(() => Setissumitting(false))
   } else {
  await axios.post("https://criclogbackendtest01.vercel.app/BattingData2", Bating2data, Config)
              .then((res) => {
                  toast.success(res.data.message)  
              })
              .catch((err) => console.log(err))
              .finally(() => Setissumitting(false))
      }}
  
  catch (error) {
      console.log(error)
  }


  SetBating2data(bat2init)

}

const handleclear=()=>{
  setIsEdit(false)
  SetBating2data(bat2init)
}
  return(
    <div className='w-full min-h-100vh flex flex-col justify-center items-center py-[40px] gap-[30px] '>
     <h2 className='text-[22px] font-semibold text-[#4D28D4] underline'>{isEdit ? 'EDIT DATA' : 'BATTING DATA 2'}</h2>
     <div className=''>
        <form onSubmit={handleSubmit}  className='w-full flex flex-col gap-[50px] justify-center items-center' >
        <div className=' w-full grid sm:grid-cols-2 grid-cols-1 grid-flow-row text-[17px] justify-center items-center gap-[40px] '>   
        <TextField id="MatchID" label="MatchID" variant="filled" type='text' name='MatchID' value={Bating2data.MatchID} onChange={handleChange} required />
        <TextField id="BatterName1Team2" label="Batter Name1 Team2" variant="filled" type='text'  name='Team2BatterName1' value={Bating2data.Team2BatterName1} onChange={handleChange}/>
        <TextField id="Team2Run1" label="Team2 Run1" variant="filled" type='Number' name='Team2Run1' value={Bating2data.Team2Run1} onChange={handleChange}/>
        <TextField id="Team2Ball1" label="Team2 Ball1" variant="filled" type='number' name='Team2Ball1' value={Bating2data.Team2Ball1} onChange={handleChange} />
        <TextField id="Team2Four1" label="Team2 Four1" variant="filled" type='number' name='Team2Four1' value={Bating2data.Team2Four1} onChange={handleChange} /> 
        <TextField id="Team2Six1" label="Team2 Six1" variant="filled" type='number' name='Team2Six1' value={Bating2data.Team2Six1} onChange={handleChange}/>
        <TextField id="Team2SR1" label="Team2 SR1" variant="filled" type='Number' name='Team2SR1' value={Bating2data.Team2SR1} onChange={handleChange}/>
        <TextField id="Team2Status1" label="Team2 Status1" variant="filled" type='text' name='Team2Status1' value={Bating2data.Team2Status1} onChange={handleChange}/>
        <TextField id="Team2Min1" label="Team2 Min1" variant="filled" type='number' name='Team2Min1' value={Bating2data.Team2Min1} onChange={handleChange}/>
        <TextField id="BatterName2Team2" label="Batter Name2 Team2" variant="filled" type='text' name='Team2BatterName2' value={Bating2data.Team2BatterName2} onChange={handleChange}/>
        <TextField id="Team2Run2" label="Team2 Run2" variant="filled" type='Number' name='Team2Run2' value={Bating2data.Team2Run2} onChange={handleChange} />
        <TextField id="Team2Ball2" label="Team2 Ball2" variant="filled" type='number' name='Team2Ball2' value={Bating2data.Team2Ball2} onChange={handleChange}/>
        <TextField id="Team2Four2" label="Team2 Four2" variant="filled" type='number' name='Team2Four2' value={Bating2data.Team2Four2} onChange={handleChange}/> 
        <TextField id="Team2Six2" label="Team2 Six2" variant="filled" type='number' name='Team2Six2' value={Bating2data.Team2Six2} onChange={handleChange}/>
        <TextField id="Team2SR2" label="Team2 SR2" variant="filled" type='Number' name='Team2SR2' value={Bating2data.Team2SR2} onChange={handleChange}/>
        <TextField id="Team2Status2" label="Team2 Status2" variant="filled" type='text' name='Team2Status2' value={Bating2data.Team2Status2} onChange={handleChange}/>
        <TextField id="Team2Min2" label="Team2 Min2" variant="filled" type='number' name='Team2Min2' value={Bating2data.Team2Min2} onChange={handleChange}/>
        <TextField id="Team2Yettobat" label="Team2 Yet to bat" variant="filled" type='text' name='Team2Yettobat' value={Bating2data.Team2Yettobat} onChange={handleChange}/>
        <TextField id="Team2Fallofwickets" label="Team2 Fall of wickets" variant="filled" type='text' name='Team2fallofwickets' value={Bating2data.Team2fallofwickets} onChange={handleChange}/> 

        </div> 
        <div className=' flex gap-[40px]'>
        <button className='px-4 py-2 font-semibold bg-[#4a2be0] text-white rounded-lg hover:scale-105 transition'>
          {Issubmitting ? (isEdit ? 'Updating...' : 'Submitting...') : (isEdit ? 'Update' : 'Submit')}
  
        </button>
        {isEdit? (<Link to={'/match'}><button className='px-4 py-2 font-semibold bg-[#c94141] text-white rounded-lg hover:scale-105 transition' onClick={handleclear}>cancel</button></Link>):''}
        </div>  
                </form>
     </div>
     <Batting2card/>
    </div>

  )
}

const Commentaryinit={
  MatchID:"",
  status1:"",
  endover1:"",
  overallscore1:"",
  status2:"",
  endover2:"",
  team1over:"",
  message1:"",
  runandwicket1:"",
  team2over:"",
  message2:"",
  runandwicket2:"",
  overallscore2:""
  }
  
  
  export const Comments = () => {
  
    const [Commentdata,setComment]=useState(Commentaryinit)
    const [Issubmit,SetIssubmit]=useState(false)
    const [isEdit,SetEdit]=useState(false)
  const navigate=useNavigate();
  const {id}=useParams();
  
  
  
  
  
    const handleChange=(e)=>{
      const {name,value}=e.target;
      setComment((prev)=>({
        ...prev,
        [name]:value
      }))
  
    }
  
  
    const getCommentID=async(id)=>{
      try {
        await axios
        .get(`https://criclogbackendtest01.vercel.app/getCommentaryByIdandupdate?objid=${id}`,Config)
        .then((res)=>{
          toast.success(res.data.message)
          setComment(res.data)
        })
         .catch((err)=>console.log(err))
         .finally(()=>SetEdit(true));
    
      } catch (error) {
        toast.error(error.res.data.message);
        
      }
      }
    useEffect(()=>{
      if(id){
        getCommentID(id)
      }
    },[id]);
  
  
    const handleSubmit=async(e)=>{
      e.preventDefault();
       SetIssubmit(true)
      
       try {
  
  if (isEdit) {
    await axios
    .put(
      `https://criclogbackendtest01.vercel.app/updateCommentaryById?objid=${Commentdata._id}`,
       Commentdata,
       Config
    )
    .then((res)=>{
      toast.success(res.data.message)
      navigate('/match')
    })
    .catch((err)=>console.log(err)
    .finally(()=>SetIssubmit(false))
    )
    
  } else {
     await axios
     .post("https://criclogbackendtest01.vercel.app/commentaryData",
      Commentdata,
      Config
     )
     .then((res)=>{
      toast.success(res.data.message)
     })
     .catch((err)=>{
      console.log(err)
     })
     .finally(()=> SetIssubmit(false))
  
  }  
       } catch (error) {
        console.log(error);
        
       }
       setComment(Commentaryinit)
    }
    const handleclear=()=>{
      SetEdit(false)
      setComment(Commentaryinit)
   };
  
  
    return (
      <div className="w-full min-h-100vh flex flex-col justify-center items-center py-[40px] gap-[30px] ">
        <h2 className="text-[22px] font-semibold text-[#4D28D4] underline">
        {isEdit ? "EDIT COMMENTARY DATA":" COMMENTARY  DATA"}
        </h2>
        <div className="">
          <form
            onSubmit={handleSubmit}
           className="w-full flex flex-col gap-[50px] justify-center items-center"
          >
            <div className=" w-full grid sm:grid-cols-2 grid-cols-1 grid-flow-row text-[17px] justify-center items-center gap-[40px] ">
              <TextField
                id="MatchID"
                label="MatchID"
                variant="filled"
                type="string"
                name="MatchID"
                value={Commentdata.MatchID}
                onChange={handleChange}
                required
              />
              <TextField
                id="team1over"
                label="team1 over"
                variant="filled"
                type="Number"
                name="team1over"
                value={Commentdata.team1over}
                onChange={handleChange}
              />
              <TextField
                id="Status1"
                label="Status1"
                variant="filled"
                type="Number"
                name="status1"
                value={Commentdata.status1}
                onChange={handleChange}
              />
              <TextField
                id="Message1"
                label="Message1"
                variant="filled"
                type="text"
                name="message1"
                value={Commentdata.message1}
                onChange={handleChange}
              />
              <TextField
                id="Endover1"
                label="Endover1"
                variant="filled"
                type="Number"
                name="endover1"
                value={Commentdata.endover1}
                onChange={handleChange}
              />
              <TextField
                id="Runandwicket1"
                label="Run and wicket1"
                variant="filled"
                type="text"
                name="runandwicket1"
                value={Commentdata.runandwicket1}
                onChange={handleChange}
              />
              <TextField
                id="overallscore1"
                label="over all score1"
                variant="filled"
                type="Number"
                name="overallscore1"
                value={Commentdata.overallscore1}
                onChange={handleChange}
              />
              <TextField
                id="team2over"
                label="team2 over"
                variant="filled"
                type="Number"
                name="team2over"
                value={Commentdata.team2over}
                onChange={handleChange}
              />
              <TextField
                id="Status2"
                label="Status2"
                variant="filled"
                type="Number"
                name="status2"
                value={Commentdata.status2}
                onChange={handleChange}
              />
              <TextField
                id="Message2"
                label="Message2"
                variant="filled"
                type="text"
                name="message2"
                value={Commentdata.message2}
                onChange={handleChange}
              />
              <TextField
                id="Endover2"
                label="Endover2"
                variant="filled"
                type="Number"
                name="endover2"
                value={Commentdata.endover2}
                onChange={handleChange}
              />
              <TextField
                id="Runandwicket2"
                label="Run and wicket2"
                variant="filled"
                type="text"
                name="runandwicket2"
                value={Commentdata.runandwicket2}
                onChange={handleChange}
              />
              <TextField
                id="overallscore2"
                label="over all score2"
                variant="filled"
                type="Number"
                name="overallscore2"
                value={Commentdata.overallscore2}
                onChange={handleChange}
              />
            </div>
            <div className=" flex gap-[40px]">
  
              <button className="w-full py-1 px-2 font-semibold sm:text-[16px] text-[14px] bg-[#4D28D4] rounded-lg text-[white] hover:scale-105 ease-in-out duration-200">
              {
                Issubmit ?
                 isEdit ?
                "Updating":"Submitting"
                :isEdit ?
                "Update":"Submit"
              }
              </button>
  
              { isEdit ? (
                <Link to={'/match'}>
                  <button
                    className="px-4 py-2 font-semibold bg-[#c94141] text-white rounded-lg hover:scale-105 transition"
                    onClick={handleclear}
                  >cancel
                  </button>
                  </Link>
              ):( ""
  
              )}
  
            </div>
          </form>
        </div>
        <CommentaryCard/>
      </div>
    );
  };
  


const Playerofmatchinit = {
  MatchID:"",
  playername:"",
  team:"",
  batting:"",
  bowling:"",
};

export const Playerofmatch = () => {


  const [Playerofmatchdata,setPlayerofmatchform]=useState(Playerofmatchinit)
  const [Issubmit,SetIssubmit]=useState(false)

  const [isEdit,SetEdit]=useState(false)

  const navigate=useNavigate();
  const {id}=useParams();


  const handleChange=(e)=>{
    const {name,value}=e.target;
    setPlayerofmatchform((prev)=>({
      ...prev,
      [name]:value
    }))

  }

  const getplayerofmatchID=async(id)=>{
  try {
    await axios
    .get(`https://criclogbackendtest01.vercel.app/getPlayerMatchById?MatchID=${id}`,Config)
    .then((res)=>{
      toast.success(res.data.message)
      setPlayerofmatchform(res.data)
    })
     .catch((err)=>console.log(err))
     .finally(()=>SetEdit(true));

  } catch (error) {
    toast.error(error.res.data.message);
    
  }
  }
useEffect(()=>{
  if(id){
    getplayerofmatchID(id)
  }
},[id]);

  const handleSubmit=async(e)=>{
    e.preventDefault();
     SetIssubmit(true)
    
     try {

if (isEdit) {
  await axios
  .put(
    `https://criclogbackendtest01.vercel.app/updatePlayerMatchById?MatchID=${Playerofmatchdata.MatchID}`,
     Playerofmatchdata,
     Config
  )
  .then((res)=>{
    toast.success(res.data.message)
    navigate('/match')
  })
  .catch((err)=>console.log(err)
  .finally(()=>SetIssubmit(false))
  )
  
} else {
   await axios
   .post("https://criclogbackendtest01.vercel.app/createPlayerMatch",
    Playerofmatchdata,
    Config
   )
   .then((res)=>{
    toast.success(res.data.message)
   })
   .catch((err)=>{
    console.log(err)
   })
   .finally(()=> SetIssubmit(false))

}  
     } catch (error) {
      console.log(error);
      
     }
     setPlayerofmatchform(Playerofmatchinit)
  }
 const handleclear=()=>{
    SetEdit(false)
    setPlayerofmatchform(Playerofmatchinit)
 };
  
  return (
    <div className="w-full min-h-100vh flex flex-col justify-center items-center py-[40px] gap-[30px] ">
      <h2 className="text-[22px] font-semibold text-[#4D28D4] underline">
       {isEdit ? "EDIT LIVE DATA":"PLAYER OF MATCH DATA"}
      </h2>
      <div className="">
        <form 
         onSubmit={handleSubmit}
         className="w-full flex flex-col gap-[50px] justify-center items-center"
        >
          <div className=" w-full grid sm:grid-cols-2 grid-cols-1 grid-flow-row text-[17px] justify-center items-center gap-[40px] ">
            <TextField
              id="MatchID"
              label="MatchID"
              variant="filled"
              type="string"
              name="MatchID"
              value={Playerofmatchdata.MatchID}
              onChange={handleChange}
              required
            />
            <TextField
              id="Playername"
              label="Player name"
              variant="filled"
              type="text"
              name="playername"
              value={Playerofmatchdata.playername}
              onChange={handleChange}
            />
            <TextField 
            id="Team" 
            label="Team"
             variant="filled" 
             type="text" 
             name="team"
             value={Playerofmatchdata.team}
             onChange={handleChange}
             />
            <TextField
              id="Batting"
              label="Batting"
              variant="filled"
              type="text"
              name="batting"
              value={Playerofmatchdata.batting}
              onChange={handleChange}
            />
            <TextField
              id="Bowling"
              label="Bowling"
              variant="filled"
              type="text"
              name="bowling"
              value={Playerofmatchdata.bowling}
              onChange={handleChange}
            />
          </div>
          <div className=" flex gap-[40px]">
            <button 
            className="w-full py-1 px-2 font-semibold sm:text-[16px] text-[14px] bg-[#4D28D4] rounded-lg text-[white] hover:scale-105 ease-in-out duration-200"
            >{
              Issubmit ?
               isEdit ?
              "Updating":"Submitting"
              :isEdit ?
              "Update":"Submit"
            }
             
            </button>
            { isEdit ? (
              <Link to={'/match'}>
                <button
                  className="px-4 py-2 font-semibold bg-[#c94141] text-white rounded-lg hover:scale-105 transition"
                  onClick={handleclear}
                >cancel
                </button>
                </Link>
            ):( ""

            )}


          </div>
        </form>

      

      </div>

      <PlayerofmatchdataCard /> 

    </div>
  );
}
