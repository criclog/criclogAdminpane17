import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast } from "react-toastify";
import { Config } from '../utils/Token';
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

export const Livescorecard = () => {
    const[Livescoredata,setLivescoredata]=useState([])

  const navigate= useNavigate()

    const Fetchlivescoredata=async()=>{
      try {
      await axios.get("http://localhost:7000/getAllMatchLives", Config)
      .then((res)=>setLivescoredata(res.data))
      .catch((err)=> toast.error(err.res.data.message))
      .finally()
       } catch (error) {
            toast.error(error.res.data.message )
          }
        }
  
  
  useEffect(()=>{
    Fetchlivescoredata();
  },[])

  const handledelete=async(id)=>{
       
    await axios.delete(`http://localhost:7000/deleteMatchLiveById?MatchID=${id}`,Config)
    .then((res)=> {
        toast.success(res.data.message)
        setLivescoredata((Prevlivescoredata)=> Prevlivescoredata.filter((livescore)=>livescore.MatchID !== id))
    })
    .catch((err)=> console.log(err))
  
  }
  
  
  const handleUpdate = (id) => {
    navigate(`/livescore/${id}`);
  };
  

  return (
    <div>   
    <div className='w-full min-h-100vh flex flex-col gap-5 justify-center items-center px-[20px]'>
      <h1 className='text-[20px]'>Livescore details</h1>
      <div className='w-full grid md:grid-cols-3 sm:grid-cols-3 grid-col-1 px-[30px] gap-10 '>
    {
                        Livescoredata.map((live)=>(
                            <div key={live._id} className="w-full h-full bg-[#f7f5f8] flex flex-col gap-3 p-4 text-[#4D28D4] text-[14px] border-2 border-[#bbb8b8] rounded-xl"> 
                               <div className='flex items-start justify-between gap-[40px] text-justify'> <h1 className='font-semibold  '>MatchID: <span className="text-[black]  font-normal">{live.MatchID}</span></h1>
                               <div className='flex gap-6'>
                                             <FaEdit className='text-[20px] cursor-pointer text-[#4a2be0]' onClick={() => handleUpdate(live.MatchID)} />
                                             <RiDeleteBin6Fill className="text-[20px] cursor-pointer text-[red]" onClick={() => handledelete(live.MatchID)} />
                                             </div></div>
                               <div className='flex items-center justify-between'> <h1 className='font-semibold  '>Projected: <span className="text-[black]  font-normal">{live.projected}</span></h1></div>
                                <h1 className='font-semibold'>matchofficial: <span className="text-[black] font-normal">{live.matchofficial}</span></h1>
                                <h1 className='font-semibold'>currentRR: <span className="text-[black] font-normal">{live.currentRR}</span></h1>
                                <h1 className='font-semibold'>overRR: <span className="text-[black] font-normal">{live.overRR}</span></h1>
                                <h1 className='font-semibold'>matchofficialrole: <span className="text-[black] font-normal">{live.matchofficialrole}</span></h1>
                                </div>
    ))}
    </div>
    </div>
        </div>
      )
}


export const Matchlivecard = () => {
  const[Matchdata,setMatchdata]=useState([])

const navigate= useNavigate()

  const Fetchmatchdata=async()=>{
    try {
    await axios.get("http://localhost:7000/getAllMatches", Config)
    .then((res)=>setMatchdata(res.data))
    .catch((err)=> toast.error(err.res.data.message))
    .finally()
     } catch (error) {
          toast.error(error.res.data.message )
        }
      }


useEffect(()=>{
  Fetchmatchdata();
},[])

const handledelete=async(id)=>{
     
  await axios.delete(`http://localhost:7000/deleteMatchById?MatchID=${id}`,Config)
  .then((res)=> {
      toast.success(res.data.message)
      setMatchdata((Prevmatch)=> Prevmatch.filter((match)=>match.MatchID !== id))
  })
  .catch((err)=> console.log(err))

}


const handleUpdate = (id) => {
  navigate(`/matchlive/${id}`);
};


return (
  <div>   
  <div className='w-full min-h-100vh flex flex-col gap-5 justify-center items-center px-[20px]'>
    <h1 className='text-[20px]'>Match details</h1>
    <div className='w-full grid md:grid-cols-3 sm:grid-cols-3 grid-col-1 px-[30px] gap-10 '>
  {
                      Matchdata.map((match)=>(
                          <div key={match._id} className="w-full h-full bg-[#f7f5f8] flex flex-col gap-3 p-4 text-[#4D28D4] text-[14px] border-2 border-[#bbb8b8] rounded-xl"> 
                             <div className='flex items-start justify-between gap-[40px] text-justify'> <h1 className='font-semibold  '>MatchID: <span className="text-[black]  font-normal">{match.MatchID}</span></h1>
                             <div className='flex gap-6'>
                                           <FaEdit className='text-[20px] cursor-pointer text-[#4a2be0]' onClick={() => handleUpdate(match.MatchID)} />
                                           <RiDeleteBin6Fill className="text-[20px] cursor-pointer text-[red]" onClick={() => handledelete(match.MatchID)} />
                                           </div></div>
                             <div className='flex items-center justify-between'> <h1 className='font-semibold  '>matchname: <span className="text-[black]  font-normal">{match.matchname}</span></h1></div>
                              <h1 className='font-semibold'>location: <span className="text-[black] font-normal">{match.location}</span></h1>
                              <h1 className='font-semibold'>batteam: <span className="text-[black] font-normal">{match.batteam}</span></h1>
                              <h1 className='font-semibold'>over: <span className="text-[black] font-normal">{match.over}</span></h1>
                              <h1 className='font-semibold'>bowlingstatus: <span className="text-[black] font-normal">{match.bowlingstatus}</span></h1>
                              <h1 className='font-semibold'>tossstatus: <span className="text-[black] font-normal">{match.tossstatus}</span></h1>
                              <h1 className='font-semibold'>detaillocation: <span className="text-[black] font-normal">{match.detaillocation}</span></h1>
                              <h1 className='font-semibold'>bowlover: <span className="text-[black] font-normal">{match.bowlover}</span></h1>
                              <h1 className='font-semibold'>matchtype: <span className="text-[black] font-normal">{match.matchtype}</span></h1>
                              <h1 className='font-semibold'>score: <span className="text-[black] font-normal">{match.score}</span></h1>
                              <h1 className='font-semibold'>bowlingteam: <span className="text-[black] font-normal">{match.bowlingteam}</span></h1>
                              <h1 className='font-semibold'>tosswin: <span className="text-[black] font-normal">{match.tosswin}</span></h1>
                              <h1 className='font-semibold'>Updatedtime: <span className="text-[black] font-normal">{match.Updatedtime}</span></h1>
                              <h1 className='font-semibold'>MatchDate: <span className="text-[black] font-normal">{match.MatchDate}</span></h1>
                              </div>
  ))}
  </div>
  </div>
      </div>
    )
}


export const PlayerofmatchdataCard = () => {
 

  const [Playerofmatchcard, setPlayerofmatchcard] = useState([]);

  const navigate = useNavigate();

  const Fetchpalyerofmatch = async () => {
    try {
      await axios
        .get("http://localhost:7000/getAllPlayerMatches", Config)
        .then((res) => setPlayerofmatchcard(res.data))
        .catch((err) => toast.error(err.res.data.message))
        .finally();
    } catch (error) {
      toast.error(error.res.data.message);
    }
  };
  useEffect(() => {
    Fetchpalyerofmatch();
  },[]);

  const handledelete = async (id) => {
    try {
      await axios
        .delete(`http://localhost:7000/deletePlayerMatchById?MatchID=${id}`)
        .then((res) => {
          toast.success(res.data.message);
          setPlayerofmatchcard((prev) =>
            prev.filter((playofmatch) => playofmatch.MatchID!== id)
          );
        })
        .catch((err) => console.log(err));
    } catch (err) {}
  };

  const handleUpdate = (id) => {
    navigate(`/playerofmatch/${id}`);
  };

  return (
    <div>
      <div className="w-full min-h-100vh flex flex-col gap-5 justify-center items-center px-[20px]">
        <h1 className="text-[20px]">Player of Match details</h1>
        <div className="w-full grid md:grid-cols-3 sm:grid-cols-3 grid-col-1 px-[30px] gap-10 ">
          {Playerofmatchcard.map((player) => (
            <div
              key={player._id}
              className="w-full h-full bg-[#f7f5f8] flex flex-col gap-3 p-4 text-[#4D28D4] text-[14px] border-2 border-[#bbb8b8] rounded-xl"
            >
              <div className="flex items-start justify-between gap-[40px] text-justify">
                <h1 className="font-semibold  ">
                  MatchID:{" "}
                  <span className="text-[black]  font-normal">
                    {player.MatchID}
                  </span>
                </h1>
                <div className="flex gap-6">
                  <FaEdit
                    className="text-[20px] cursor-pointer text-[#4a2be0]"
                    onClick={() => handleUpdate(player.MatchID)}
                  />
                  <RiDeleteBin6Fill
                    className="text-[20px] cursor-pointer text-[red]"
                    onClick={() => handledelete(player.MatchID)}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                {" "}
                <h1 className="font-semibold  ">
                Playername: {" "}
                  <span className="text-[black]  font-normal">
                    {player.playername}
                  </span>
                </h1>
              </div>
              <h1 className="font-semibold">
              Team:{" "}
                <span className="text-[black] font-normal">
                  {player.team}
                </span>
              </h1>
              <h1 className="font-semibold">
              Batting:{" "}
                <span className="text-[black] font-normal">
                  {player.batting}
                </span>
              </h1>
              <h1 className="font-semibold">
              Bowling:{" "}
                <span className="text-[black] font-normal">
                    {player.bowling}</span>
              </h1>
             
            </div>
          ))
          }
        </div>
      </div>
    </div>
  )
};


export const CommentaryCard = () => {
 

  const [Commentcard, setCommentcard] = useState([]);

  const navigate = useNavigate();

  const FetchComment = async () => {
    try {
      await axios
        .get("http://localhost:7000/getAllCommentaries", Config)
        .then((res) => setCommentcard(res.data))
        .catch((err) => toast.error(err.res.data.message))
        .finally();
    } catch (error) {
      toast.error(error.res.data.message);
    }
  };
  useEffect(() => {
    FetchComment();
  },[]);

  const handledelete = async (id) => {
    try {
      await axios
        .delete(`http://localhost:7000/deleteCommentaryById?objid=${id}`)
        .then((res) => {
          toast.success(res.data.message);
          setCommentcard((prev) =>
            prev.filter((commentes) => commentes._id !== id)
          );
        })
        .catch((err) => console.log(err));
    } catch (err) {}
  };

  const handleUpdate = (id) => {
    navigate(`/comment/${id}`);
  };

  return (
    <div>
      <div className="w-full min-h-100vh flex flex-col gap-5 justify-center items-center px-[20px]">
        <h1 className="text-[20px]">Commentary details</h1>
        <div className="w-full grid md:grid-cols-3 sm:grid-cols-3 grid-col-1 px-[30px] gap-10 ">
          {Commentcard.map((comment) => (
            <div
              key={comment._id}
              className="w-full h-full bg-[#f7f5f8] flex flex-col gap-3 p-4 text-[#4D28D4] text-[14px] border-2 border-[#bbb8b8] rounded-xl"
            >
              <div className="flex items-start justify-between gap-[40px] text-justify">
                <h1 className="font-semibold  ">
                  MatchID:{" "}
                  <span className="text-[black]  font-normal">
                    {comment.MatchID}
                  </span>
                </h1>
                <div className="flex gap-6">
                  <FaEdit
                    className="text-[20px] cursor-pointer text-[#4a2be0]"
                    onClick={() => handleUpdate(comment._id)}
                  />
                  <RiDeleteBin6Fill
                    className="text-[20px] cursor-pointer text-[red]"
                    onClick={() => handledelete(comment._id)}
                  />
                </div>
                </div>


              <div className="flex items-center justify-between">
                {" "}
                <h1 className="font-semibold  ">
                Status1: {" "}
                  <span className="text-[black]  font-normal">
                    {comment.status1}
                  </span>
                </h1>
              </div>
              <h1 className="font-semibold">
              Endover1:{" "}
                <span className="text-[black] font-normal">
                  {comment.endover1}
                </span>
              </h1>
              <h1 className="font-semibold">
              Overallscore1:{" "}
                <span className="text-[black] font-normal">
                  {comment.overallscore1}
                </span>
              </h1>
              <h1 className="font-semibold">
              Status2:{" "}
                <span className="text-[black] font-normal">
                    {comment.status2}</span>
              </h1>

              <h1 className="font-semibold">
              Endover2:{" "}
                <span className="text-[black] font-normal">
                    {comment.endover2}</span>
              </h1>
              <h1 className="font-semibold">
              Overallscore2:{" "}
                <span className="text-[black] font-normal">
                    {comment.overallscore2}</span>
              </h1>
              <h1 className="font-semibold">
              Team1over:{" "}
                <span className="text-[black] font-normal">
                    {comment.team1over}</span>
              </h1>
              <h1 className="font-semibold">
              Message1:{" "}
                <span className="text-[black] font-normal">
                    {comment.message1}</span>
              </h1>
              <h1 className="font-semibold">
              Runandwicket1:{" "}
                <span className="text-[black] font-normal">
                    {comment.runandwicket1}</span>
              </h1>
              <h1 className="font-semibold">
              Team2over:{" "}
                <span className="text-[black] font-normal">
                    {comment.team2over}</span>
              </h1>
              <h1 className="font-semibold">
              Message2:{" "}
                <span className="text-[black] font-normal">
                    {comment.message2}</span>
              </h1>
              <h1 className="font-semibold">
              Runandwicket2:{" "}
                <span className="text-[black] font-normal">
                    {comment.runandwicket2}</span>
              </h1>
            </div>
          ))
          }
        </div>
    </div>
    </div>

  )
};

export const Bowling1card = () => {
  const[Bowling1,setBowling1]=useState([])

const navigate= useNavigate()

  const Fetchbowling1data=async()=>{
    try {
    await axios.get("http://localhost:7000/getAllBowlingData", Config)
    .then((res)=>setBowling1(res.data))
    .catch((err)=> toast.error(err.res.data.message))
    .finally()
     } catch (error) {
          toast.error(error.res.data.message )
        }
      }


useEffect(()=>{
  Fetchbowling1data();
},[])

const handledelete=async(id)=>{
     
  await axios.delete(`http://localhost:7000/deleteBowlingDataById?objid=${id}`,Config)
  .then((res)=> {
      toast.success(res.data.message)
      setBowling1((Prevmatch)=> Prevmatch.filter((match)=>match.MatchID !== id))
  })
  .catch((err)=> console.log(err))

}


const handleUpdate = (id) => {
  navigate(`/bowling1/${id}`);
};


return (
  <div>   
  <div className='w-full min-h-100vh flex flex-col gap-5 justify-center items-center px-[20px]'>
    <h1 className='text-[20px]'>Bowling 1 details</h1>
    <div className='w-full grid md:grid-cols-3 sm:grid-cols-3 grid-col-1 px-[30px] gap-10 '>
  {
                      Bowling1.map((match)=>(
                          <div key={match._id} className="w-full h-full bg-[#f7f5f8] flex flex-col gap-3 p-4 text-[#4D28D4] text-[14px] border-2 border-[#bbb8b8] rounded-xl"> 
                             <div className='flex items-start justify-between gap-[40px] text-justify'> <h1 className='font-semibold  '>MatchID: <span className="text-[black]  font-normal">{match.MatchID}</span></h1>
                             <div className='flex gap-6'>
                                           <FaEdit className='text-[20px] cursor-pointer text-[#4a2be0]' onClick={() => handleUpdate(match._id)} />
                                           <RiDeleteBin6Fill className="text-[20px] cursor-pointer text-[red]" onClick={() => handledelete(match._id)} />
                                           </div></div>
                             <div className='flex items-center justify-between'> <h1 className='font-semibold  '>over: <span className="text-[black]  font-normal">{match.over}</span></h1></div>
                              <h1 className='font-semibold'>Run: <span className="text-[black] font-normal">{match.run}</span></h1>
                              <h1 className='font-semibold'>wicket: <span className="text-[black] font-normal">{match.wicket}</span></h1>
                              <h1 className='font-semibold'>bowlername: <span className="text-[black] font-normal">{match.bowlername}</span></h1>
                              <h1 className='font-semibold'>med: <span className="text-[black] font-normal">{match.med}</span></h1>
                              <h1 className='font-semibold'>wide: <span className="text-[black] font-normal">{match.wide}</span></h1>
                              <h1 className='font-semibold'>ECO: <span className="text-[black] font-normal">{match.ECO}</span></h1>
                                                           </div>
  ))}
  </div>
  </div>
      </div>
    )
}

export const Batting1card = () => {
  const[Batting1,setBatting1]=useState([])

const navigate= useNavigate()

  const Fetchbatting1data=async()=>{
    try {
    await axios.get("http://localhost:7000/getAllBattingData1", Config)
    .then((res)=>setBatting1(res.data))
    .catch((err)=> toast.error(err.res.data.message))
    .finally()
     } catch (error) {
          toast.error(error.res.data.message )
        }
      }


useEffect(()=>{
  Fetchbatting1data();
},[])

const handledelete=async(id)=>{
     
  await axios.delete(`http://localhost:7000/deleteBattingData1ById?objid=${id}`,Config)
  .then((res)=> {
      toast.success(res.data.message)
      setBatting1((Prevmatch)=> Prevmatch.filter((match)=>match.MatchID !== id))
  })
  .catch((err)=> console.log(err))

}


const handleUpdate = (id) => {
  navigate(`/batting1/${id}`);
};


return (
  <div>   
  <div className='w-full min-h-100vh flex flex-col gap-5 justify-center items-center px-[20px]'>
    <h1 className='text-[20px]'>Batting 1 details</h1>
    <div className='w-full grid md:grid-cols-3 sm:grid-cols-3 grid-col-1 px-[30px] gap-10 '>
  {
                      Batting1.map((match)=>(
                          <div key={match._id} className="w-full h-full bg-[#f7f5f8] flex flex-col gap-3 p-4 text-[#4D28D4] text-[14px] border-2 border-[#bbb8b8] rounded-xl"> 
                             <div className='flex items-start justify-between gap-[40px] text-justify'> <h1 className='font-semibold  '>MatchID: <span className="text-[black]  font-normal">{match.MatchID}</span></h1>
                             <div className='flex gap-6'>
                                           <FaEdit className='text-[20px] cursor-pointer text-[#4a2be0]' onClick={() => handleUpdate(match._id)} />
                                           <RiDeleteBin6Fill className="text-[20px] cursor-pointer text-[red]" onClick={() => handledelete(match._id)} />
                                           </div></div>
                             <div className='flex items-center justify-between'> <h1 className='font-semibold  '>Run1: <span className="text-[black]  font-normal">{match.Run1}</span></h1></div>
                              <h1 className='font-semibold'>Four1: <span className="text-[black] font-normal">{match.Four1}</span></h1>
                              <h1 className='font-semibold'>SR1: <span className="text-[black] font-normal">{match.SR1}</span></h1>
                              <h1 className='font-semibold'>Min1: <span className="text-[black] font-normal">{match.Min1}</span></h1>
                              <h1 className='font-semibold'>Run2: <span className="text-[black] font-normal">{match.Run2}</span></h1>
                              <h1 className='font-semibold'>Four2: <span className="text-[black] font-normal">{match.Four2}</span></h1>
                              <h1 className='font-semibold'>SR2: <span className="text-[black] font-normal">{match.SR2}</span></h1>
                              <h1 className='font-semibold'>Min2: <span className="text-[black] font-normal">{match.Min2}</span></h1>
                              <h1 className='font-semibold'>fallofwickets: <span className="text-[black] font-normal">{match.fallofwickets}</span></h1>
                              <h1 className='font-semibold'>BatterName1: <span className="text-[black] font-normal">{match.BatterName1}</span></h1>
                              <h1 className='font-semibold'>Ball1: <span className="text-[black] font-normal">{match.Ball1}</span></h1>
                              <h1 className='font-semibold'>Six1: <span className="text-[black] font-normal">{match.Six1}</span></h1>
                              <h1 className='font-semibold'>Status1: <span className="text-[black] font-normal">{match.Status1}</span></h1>
                              <h1 className='font-semibold'>BatterName2: <span className="text-[black] font-normal">{match.BatterName2}</span></h1>
                              <h1 className='font-semibold'>Ball2: <span className="text-[black] font-normal">{match.Ball2}</span></h1>
                              <h1 className='font-semibold'>Six2: <span className="text-[black] font-normal">{match.Six2}</span></h1>
                              <h1 className='font-semibold'>Status2: <span className="text-[black] font-normal">{match.Status2}</span></h1>
                              <h1 className='font-semibold'>Yettobat: <span className="text-[black] font-normal">{match.Yettobat}</span></h1>
                                                           </div>
  ))}
  </div>
  </div>
      </div>
    )
}