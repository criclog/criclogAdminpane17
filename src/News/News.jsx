import React, { useEffect, useState } from 'react'
import TextField from "@mui/material/TextField";
import { Config } from '../utils/Token';
import axios from "axios";  
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Link, useNavigate, useParams } from 'react-router-dom';


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
    const [isEdit, setIsEdit] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const handleChange = (event) => {
      const { name, value, files } = event.target
      if (name === 'file') {
        Setlocalform((prevlocalformdata) => ({ ...prevlocalformdata, file: files[0] }));
      } else {
        Setlocalform((prevlocalformdata) => ({ ...prevlocalformdata, [name]: value }));
      }
    };


    const getlocalnewsById = async (id) => {
      try {
         await axios.get(`http://localhost:7000/getnewsById?objectid=${id}`, Config)
         .then((res) => {
          toast.success(res.data.message)  
          Setlocalform(res.data);  
      })
      .catch((err) => console.log(err))
      .finally(() => setIsEdit(true))
        
      } catch (error) {
        toast.error(error.res.data.message );
      }
    };
  
    useEffect(() => {
      if (id) {
        getlocalnewsById(id);
      }
    }, [id]);
  



    const handleSubmit = async (e) => {
      e.preventDefault();
      Setissumitting(true)
  
      const formDataToSend = new FormData();
      for (const key in localformdata) {
        formDataToSend.append(key, localformdata[key]);
      }
  
      try {
        if (isEdit) {
          await axios.put(`http://localhost:7000/updatenews?objectid=${localformdata._id}`, formDataToSend, Config)
          .then((res) => {toast.success(res.data.message)
           navigate('/news');
           
          })
          .catch((err) => console.log(err))
                 .finally(() => Setissumitting(false))
       } else {
              await axios.post("http://localhost:7000/newsData", formDataToSend, Config)
                  .then((res) => {
                      toast.success(res.data.message)  
                  })
                  .catch((err) => console.log(err))
                  .finally(() => Setissumitting(false))
          }}
      
      catch (error) {
          console.log(error)
      }
  
  
      Setlocalform(newsinitial)
  
  }

  const handleclear=()=>{
    setIsEdit(false)
    Setlocalform(newsinitial)
  }

  return (
    <div className='w-full min-h-100vh flex flex-col justify-center items-center py-[40px] gap-[30px] '>
     <h2 className='text-[22px] font-semibold text-[#4D28D4] underline'>{isEdit ? 'Edit Local News' : 'Local News Data'}</h2>
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
        <div className=' flex gap-[40px]'>
        <button className='px-4 py-2 font-semibold bg-[#4a2be0] text-white rounded-lg hover:scale-105 transition'>
          {Issubmitting ? (isEdit ? 'Updating...' : 'Submitting...') : (isEdit ? 'Update' : 'Submit')}
  
        </button>
        {isEdit? (<Link to={'/news'}><button className='px-4 py-2 font-semibold bg-[#c94141] text-white rounded-lg hover:scale-105 transition' onClick={handleclear}>cancel</button></Link>):''}
        </div></div>
        </form>
     </div>
     <Getlocalnews/>
    </div>

    
  )
}


export const Getlocalnews = () => {
  const[localnews,setlocalnews]=useState([])
  
  const navigate = useNavigate();


  const Fetchlocalnewsdata=async()=>{
    await axios.get("http://localhost:7000/getnewsallData", Config)
    .then((res)=>setlocalnews(res.data))
    .catch((err)=> toast.error(err.res.data.message))
    .finally()
}

useEffect(()=>{
  Fetchlocalnewsdata();
},[])

const handledelete=async(id)=>{
       
  await axios.delete(`http://localhost:7000/deletenews?objectid=${id}`,Config)
  .then((res)=> {
      toast.success(res.data.message)
      setlocalnews((Prevlocalnews)=> Prevlocalnews.filter((localnews)=>localnews._id !== id))
  })
  .catch((err)=> console.log(err))

}


const handleUpdate = (id) => {
  navigate(`/localnews/${id}`);
};



  return (
    <div>   
<div className='w-full min-h-100vh flex flex-col gap-5 justify-center items-center px-[20px]'>
  <h1 className='text-[20px]'>Local news</h1>
  <div className='w-full grid md:grid-cols-2 grid-cols-1 px-[30px] gap-10 '>
{
                    localnews.map((news)=>(
                        <div key={news._id} className="w-full h-full bg-[#f7f5f8] flex flex-col gap-3 p-4 text-[#4D28D4] text-[14px] border-2 border-[#bbb8b8] rounded-xl"> 
                           <div className='flex items-start justify-between'> <h1 className='font-semibold  '>Title: <span className="text-[black]  font-normal">{news.newsTitle}</span></h1>
                            <div className='flex gap-6'>
                            <FaEdit className='text-[20px] cursor-pointer text-[#4a2be0]' onClick={() => handleUpdate(news._id)}  />
                            <RiDeleteBin6Fill className="text-[20px] cursor-pointer text-[red]" onClick={() => handledelete(news._id)} />
                              </div></div>
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
  const [isEdit, setIsEdit] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, files } = event.target
    if (name === 'file') {
      Setinterform((previnterformdata) => ({ ...previnterformdata, file: files[0] }));
    } else {
      Setinterform((previnterformdata) => ({ ...previnterformdata, [name]: value }));
    }
  };

  const getinternewsById = async (id) => {
    try {
       await axios.get(`http://localhost:7000/getInternationalById?objectid=${id}`, Config)
       .then((res) => {
        toast.success(res.data.message)  
        Setinterform(res.data);  
    })
    .catch((err) => console.log(err))
    .finally(() => setIsEdit(true))
      
    } catch (error) {
      toast.error(error.res.data.message );
    }
  };

  useEffect(() => {
    if (id) {
      getinternewsById(id);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    Setissumitting(true)

    const formDataToSend = new FormData();
    for (const key in interformdata) {
      formDataToSend.append(key, interformdata[key]);
    }

    try {
      if (isEdit) {
        await axios.put(`http://localhost:7000/updateInternational?objectid=${interformdata._id}`, formDataToSend, Config)
        .then((res) => {toast.success(res.data.message)
         navigate('/news');
         
        })
        .catch((err) => console.log(err))
               .finally(() => Setissumitting(false))
     } else {  await axios.post("http://localhost:7000/internationalData", formDataToSend, Config)
                .then((res) => {
                    toast.success(res.data.message)  
                })
                .catch((err) => console.log(err))
                .finally(() => Setissumitting(false))
        }}
    
    catch (error) {
        console.log(error)
    }


    Setinterform(interinitial)

}
const handleclear=()=>{
  setIsEdit(false)
  Setinterform(interinitial)
}



  return (
    <div className='w-full min-h-100vh flex flex-col justify-center items-center py-[40px] gap-[30px] '>
     <h2 className='text-[22px] font-semibold text-[#4D28D4] underline'>{isEdit ? 'Edit International News' : 'INTERNATIONAL NEWS DATA'}</h2>
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
            <div className=' flex gap-[40px]'>
                    <button className='px-4 py-2 font-semibold bg-[#4a2be0] text-white rounded-lg hover:scale-105 transition'>
                      {Issubmitting ? (isEdit ? 'Updating...' : 'Submitting...') : (isEdit ? 'Update' : 'Submit')}
              
                    </button>
                    {isEdit? (<Link to={'/news'}><button className='px-4 py-2 font-semibold bg-[#c94141] text-white rounded-lg hover:scale-105 transition' onClick={handleclear}>cancel</button></Link>):''}
                    </div>
                    </div>
        </form>
     </div>
     <Getinternews/>
    </div>

    
  )
}



export const Getinternews = () => {
  const[internews,setinternews]=useState([])
    const navigate = useNavigate();
  


  const Fetchinternewsdata=async()=>{
    await axios.get("http://localhost:7000/getAllInternationalData", Config)
    .then((res)=>setinternews(res.data))
    .catch((err)=> toast.error(err.res.data.message))
    .finally()
}

useEffect(()=>{
  Fetchinternewsdata();
},[])

const handledelete=async(id)=>{
       
  await axios.delete(`http://localhost:7000/deleteInternational?objectid=${id}`,Config)
  .then((res)=> {
      toast.success(res.data.message)
      setinternews((Previnternews)=> Previnternews.filter((internews)=>internews._id !== id))
  })
  .catch((err)=> console.log(err))

}


const handleUpdate = (id) => {
  navigate(`/internews/${id}`);
};


  return (
    <div>   
<div className='w-full min-h-100vh flex flex-col gap-5 justify-center items-center px-[20px]'>
  <h1 className='text-[20px]'>International news</h1>
  <div className='w-full grid md:grid-cols-2 grid-cols-1 px-[30px] gap-10 '>
{
                    internews.map((news)=>(
                        <div key={news._id} className="w-full h-full bg-[#f7f5f8] flex flex-col gap-3 p-4 text-[#4D28D4] text-[14px] border-2 border-[#bbb8b8] rounded-xl"> 
                           <div className='flex items-center justify-between'> <h1 className='font-semibold  '>Title: <span className="text-[black]  font-normal">{news.newsTitle}</span></h1>
                           <div className='flex gap-6'>
                             <FaEdit className='text-[20px] cursor-pointer text-[#4a2be0]' onClick={() => handleUpdate(news._id)}  />
                            <RiDeleteBin6Fill className="text-[20px] cursor-pointer text-[red]" onClick={() => handledelete(news._id)} />
                            </div></div>
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
