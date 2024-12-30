import React, { useEffect, useState } from 'react'
import TextField from "@mui/material/TextField";
import { Config } from '../utils/Token';
import axios from "axios";  
import { toast } from "react-toastify";


export const Newsnavbar=()=>{
  return(
      <div>
           
    <div className='w-full min-h-100vh ' >
      <Navbar/>
      </div>
      <div>
     <h2 className='hidden'><Localnews/></h2> 
     <h2 className='hidden'><Internationalnews/></h2> 
      </div>
  </div>
   

  )
} 

export const Navbar = () => {

  const [activeTab, setActiveTab] = useState("Local"); // Default tab
const matchnav=["Local", "International" ]
const handleTabClick = (tab) => {
  setActiveTab(tab);
};
  
  return (<>                    
           <div className='px-[40px] bg-[#4D28D4] '>
            <ul className='sm:text-[20px] text-[13px]  text-[white] font-medium flex gap-[40px] px-[50px]'>
           {matchnav.map((tab) => (
                  <li
                    key={tab}
                    className={`py-3 px-1 hover:text-[text] border-b-2 cursor-pointer  ${
                      activeTab === tab
                        ? "text-[white] border-[white]"
                        : "text-[white] border-[#4D28D4]"
                    }`}
                    onClick={() => handleTabClick(tab)}
                  >
                    {tab}
                  </li>))}
            </ul>
          </div>
          
        <div className="w-full py-3">
            {activeTab === "Local" && <Localnews/> }
            {activeTab === "International" && <Internationalnews/> }
            
          </div>
       
   
  </>
)
}




let newsinitial = {
  newsTitle: "",
  location: "",
  description: "",
  matchDetails: "",
  keyMoments: "",
  topBatter: "",
  topBowler: "",
  file:null
}



export const Localnews = () => {
const [localformdata, Setlocalform] = useState(newsinitial);
    const [Issubmitting, Setissumitting] = useState(false);

    const handleChange = (event) => {
      const { name, value, files } = event.target
      if (name === 'file') {
        Setlocalform((prevlocalformdata) => ({ ...prevlocalformdata, file: files[0] }));
      } else {
        Setlocalform((prevlocalformdata) => ({ ...prevlocalformdata, [name]: value }));
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      Setissumitting(true)
  
      const formDataToSend = new FormData();
      for (const key in localformdata) {
        formDataToSend.append(key, localformdata[key]);
      }
  
      try {
              await axios.post("http://localhost:7000/newsData", formDataToSend, Config)
                  .then((res) => {
                      toast.success(res.data.message)  
                  })
                  .catch((err) => console.log(err))
                  .finally(() => Setissumitting(false))
          }
      
      catch (error) {
          console.log(error)
      }
  
  
      Setlocalform(newsinitial)
  
  }



  return (
    <div className='w-full min-h-100vh flex flex-col justify-center items-center py-[40px] gap-[30px] '>
     <h2 className='text-[22px] font-semibold text-[#4D28D4] underline'>LOCAL NEWS DATA</h2>
     <div className=''>
        <form onSubmit={handleSubmit}  className='w-full flex flex-col gap-[50px] justify-center items-center' >
        <div className=' w-full grid sm:grid-cols-2 grid-cols-1 grid-flow-row text-[17px] justify-center items-center gap-[40px] '>   
        <TextField id="newsTitle" name='newsTitle' label="NewsTitle" variant="filled" type='text' value={localformdata.newsTitle} onChange={handleChange} />
        <TextField id="location" name='location' label="Location" variant="filled" type='text' value={localformdata.location} onChange={handleChange} />
        <h1 className='w-full flex flex-col gap-3 font-semibold text-[#4D28D4]'><label htmlFor="">News image:</label> 
        <input type="file"  name='file' onChange={handleChange}  className='w-[230px] outline-none  px-[4px] py-[2px] rounded-lg text-[14px] text-[#4D28D4]'/></h1>
  
        <TextField id="description" name='description' label="Description" variant="filled" type='text' value={localformdata.description} onChange={handleChange}/>
        <TextField id="matchdetails" name='matchDetails' label="Match details" variant="filled" type='text' value={localformdata.matchDetails} onChange={handleChange}/>
        <TextField id="Keymoments" name='keyMoments' label="Keymoments" variant="filled" type='text' value={localformdata.keyMoments} onChange={handleChange} />
        <TextField id="topbatter" name='topBatter' label="TopBatter" variant="filled" type='text' value={localformdata.topBatter} onChange={handleChange} />
        <TextField id="topbowler" name='topBowler' label="Topbowler" variant="filled" type='text' value={localformdata.topBowler} onChange={handleChange}/>
          
        
        </div> 
        <div>
            <button className='w-full py-1 px-2 font-semibold sm:text-[16px] text-[14px] bg-[#4D28D4] rounded-lg text-[white] hover:scale-105 ease-in-out duration-200'>
            {Issubmitting ?  "submiting.." : 
                            "submit"}</button></div>
        </form>
     </div>
     <Getlocalnews/>
    </div>

    
  )
}


export const Getlocalnews = () => {
  const[localnews,setlocalnews]=useState([])
  


  const Fetchlocalnewsdata=async()=>{
    await axios.get("http://localhost:7000/getnewsallData", Config)
    .then((res)=>setlocalnews(res.data))
    .catch((err)=> toast.error(err.res.data.message))
    .finally()
}

useEffect(()=>{
  Fetchlocalnewsdata();
},[])




  return (
    <div>   
<div className='w-full min-h-100vh flex flex-col gap-5 justify-center items-center px-[20px]'>
  <h1 className='text-[20px]'>Local news</h1>
  <div className='w-full grid md:grid-cols-2 grid-cols-1 px-[30px] gap-10 '>
{
                    localnews.map((news)=>(
                        <div key={news._id} className="w-full h-full bg-[#f7f5f8] flex flex-col gap-3 p-4 text-[#4D28D4] text-[14px] border-2 border-[#bbb8b8] rounded-xl"> 
                           <div className='flex items-center justify-between'> <h1 className='font-semibold  '>Title: <span className="text-[black]  font-normal">{news.newsTitle}</span></h1></div>
                            <h1 className='font-semibold' >location: <span className="text-[black] font-normal">{news.location}</span></h1>
                            <h1 className='font-semibold'>description: <span className="text-[black] font-normal">{news.description}</span></h1>
                            <h1 className='font-semibold'>match Details: <span className="text-[black] font-normal">{news.matchDetails}</span></h1>
                            <h1 className='font-semibold'>Key moments: <span className="text-[black] font-normal">{news.keyMoments}</span></h1>
                            <h1 className='font-semibold'>Top batter: <span className="text-[black] font-normal">{news.topBatter}</span></h1>
                            <h1 className='font-semibold'>Top Bowler: <span className="text-[black] font-normal">{news.topBowler}</span></h1>
                            <img src={`http://localhost:7000/view/${news.filename}`} alt="" className='w-[200px] h-[200px] mx-auto' />
                            <h1 className='font-semibold'>posted: <span className="text-[black] font-normal">{news.date}</span></h1>
                            </div>
))}
</div>
</div>
    </div>
  )
}





let interinitial = {
  newsTitle: "",
  location: "",
  description: "",
  matchDetails: "",
  keyMoments: "",
  topBatter: "",
  topBowler: "",
  file:null
}



export const Internationalnews = () => {
  const [interformdata, Setinterform] = useState(interinitial);
  const [Issubmitting, Setissumitting] = useState(false);

  const handleChange = (event) => {
    const { name, value, files } = event.target
    if (name === 'file') {
      Setinterform((previnterformdata) => ({ ...previnterformdata, file: files[0] }));
    } else {
      Setinterform((previnterformdata) => ({ ...previnterformdata, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Setissumitting(true)

    const formDataToSend = new FormData();
    for (const key in interformdata) {
      formDataToSend.append(key, interformdata[key]);
    }

    try {
            await axios.post("http://localhost:7000/internationalData", formDataToSend, Config)
                .then((res) => {
                    toast.success(res.data.message)  
                })
                .catch((err) => console.log(err))
                .finally(() => Setissumitting(false))
        }
    
    catch (error) {
        console.log(error)
    }


    Setinterform(newsinitial)

}




  return (
    <div className='w-full min-h-100vh flex flex-col justify-center items-center py-[40px] gap-[30px] '>
     <h2 className='text-[22px] font-semibold text-[#4D28D4] underline'>INTERNATIONAL NEWS DATA</h2>
     <div className=''>
     <form onSubmit={handleSubmit}  className='w-full flex flex-col gap-[50px] justify-center items-center' >
        <div className=' w-full grid sm:grid-cols-2 grid-cols-1 grid-flow-row text-[17px] justify-center items-center gap-[40px] '>   
        <TextField id="newsTitle" name='newsTitle' label="NewsTitle" variant="filled" type='text' value={interformdata.newsTitle} onChange={handleChange} />
        <TextField id="location" name='location' label="Location" variant="filled" type='text' value={interformdata.location} onChange={handleChange} />
        <h1 className='w-full flex flex-col gap-3 font-semibold text-[#4D28D4]'><label htmlFor="">News image:</label> 
        <input type="file"  name='file' onChange={handleChange}  className='w-[230px] outline-none  px-[4px] py-[2px] rounded-lg text-[14px] text-[#4D28D4]'/></h1>
  
        <TextField id="description" name='description' label="Description" variant="filled" type='text' value={interformdata.description} onChange={handleChange}/>
        <TextField id="matchdetails" name='matchDetails' label="Match details" variant="filled" type='text' value={interformdata.matchDetails} onChange={handleChange}/>
        <TextField id="Keymoments" name='keyMoments' label="Keymoments" variant="filled" type='text' value={interformdata.keyMoments} onChange={handleChange} />
        <TextField id="topbatter" name='topBatter' label="TopBatter" variant="filled" type='text' value={interformdata.topBatter} onChange={handleChange} />
        <TextField id="topbowler" name='topBowler' label="Topbowler" variant="filled" type='text' value={interformdata.topBowler} onChange={handleChange}/>
          
        
        </div> 
        <div>
            <button className='w-full py-1 px-2 font-semibold sm:text-[16px] text-[14px] bg-[#4D28D4] rounded-lg text-[white] hover:scale-105 ease-in-out duration-200'>
            {Issubmitting ?  "submiting.." : 
                            "submit"}</button></div>
        </form>
     </div>
     <Getinternews/>
    </div>

    
  )
}



export const Getinternews = () => {
  const[internews,setinternews]=useState([])
  


  const Fetchinternewsdata=async()=>{
    await axios.get("http://localhost:7000/getAllInternationalData", Config)
    .then((res)=>setinternews(res.data))
    .catch((err)=> toast.error(err.res.data.message))
    .finally()
}

useEffect(()=>{
  Fetchinternewsdata();
},[])




  return (
    <div>   
<div className='w-full min-h-100vh flex flex-col gap-5 justify-center items-center px-[20px]'>
  <h1 className='text-[20px]'>International news</h1>
  <div className='w-full grid md:grid-cols-2 grid-cols-1 px-[30px] gap-10 '>
{
                    internews.map((news)=>(
                        <div key={news._id} className="w-full h-full bg-[#f7f5f8] flex flex-col gap-3 p-4 text-[#4D28D4] text-[14px] border-2 border-[#bbb8b8] rounded-xl"> 
                           <div className='flex items-center justify-between'> <h1 className='font-semibold  '>Title: <span className="text-[black]  font-normal">{news.newsTitle}</span></h1></div>
                            <h1 className='font-semibold' >location: <span className="text-[black] font-normal">{news.location}</span></h1>
                            <h1 className='font-semibold'>description: <span className="text-[black] font-normal">{news.description}</span></h1>
                            <h1 className='font-semibold'>match Details: <span className="text-[black] font-normal">{news.matchDetails}</span></h1>
                            <h1 className='font-semibold'>Key moments: <span className="text-[black] font-normal">{news.keyMoments}</span></h1>
                            <h1 className='font-semibold'>Top batter: <span className="text-[black] font-normal">{news.topBatter}</span></h1>
                            <h1 className='font-semibold'>Top Bowler: <span className="text-[black] font-normal">{news.topBowler}</span></h1>
                            <img src={`http://localhost:7000/view/${news.filename}`} alt="" className='w-[200px] h-[200px] mx-auto' />
                            <h1 className='font-semibold'>posted: <span className="text-[black] font-normal">{news.date}</span></h1>
                            </div>
))}
</div>
</div>
    </div>
  )
}
