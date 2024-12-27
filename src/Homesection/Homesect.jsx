import heroimg from "../Assests/heroimg.jpg"
import heroplaystore from "../Assests/playStore hero.png"
import heroappstore from "../Assests/appStore hero.png"
import editorchoice from "../Assests/editors-choice.png"
import rating from "../Assests/rating_new.png"
import whycricimg from "../Assests/whycrichome.jpg"
import Dressinglogo from "../Assests/dressroomhome.png"
import taglineimg from "../Assests/home-tagline.avif"
import jointeam from "../Assests/join-team-home.avif"
import facebook from "../Assests/facebook.png"
import insta from "../Assests/insta.png"
import twitter from "../Assests/twitter.png"
import youtube from "../Assests/youtube.png"
import feature1 from "../Assests/home_feature_img1.png"
import feature2 from "../Assests/home_feature_img2.png"
import feature3 from "../Assests/home_feature_img3.png"
import feature4 from "../Assests/home_feature_img4.png"
import user1 from "../Assests/home user1.avif"
import user2 from "../Assests/home user2.avif"
import user3 from "../Assests/home user3.avif"
import user4 from "../Assests/home user4.avif"
import homestore from "../Assests/home store.webp"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom'






export const Homesect = () => {
  return (
    <div>
        <Herosect/>
        <Whycriclogsect/>
        <Homedressroom/>
        <Homenumbersect/>
        <Hometaginesect/>
        <Homefeatured/>
        <Homeuser/>
        <Homejointeam/>
        <Homeupdate/>
    </div>
  )
}

export const Herosect = () => {
    return (
        <div className='relative'>
        <img src={heroimg} alt="" width="100%" className='m-0 h-[500px]'/>
          <div className='w-full h-full flex flex-col justify-center lg:px-[150px] sm:px-[100px] px-[40px] lg:gap-[30px] gap-[25px] bg-[#4D28D4] opacity-90 absolute top-0'>
            <p className='text-[white] lg:text-[55px] md:text-[40px]  sm:text-[30px] text-[24px]  '>Enhancing <span className='font-bold'>grassroots cricket</span>, one game at a time.</p>
            <p className='text-[white] lg:text-[28px] md:text-[24px] sm:text-[20px] text-[18px]'>Download the app and start <span className='font-bold'>scoring for free.</span></p>
        
            <div className=" flex sm:gap-[20px] gap-[10px] cursor-pointer">
             <img src={heroplaystore} alt="couldn't load image" className="lg:w-[200px] sm:w-[170px] w-[115px]"/>
             <img src={heroappstore} alt="couldn't load image" className="lg:w-[200px] sm:w-[170px] w-[115px]"/>
          </div>
          <div className="flex sm:gap-[40px] gap-[20px] items-center cursor-pointer">
            <p className="flex gap-[10px] items-center cursor-pointer"> 
                <img src={editorchoice} className="lg:w-[60px] sm:w-[50px] w-[40px] "/>
             <p className='text-[white] lg:text-[18px] sm:text:[17px] text-[13px] font-semibold'>4.5 Ratings <br />12M+ Downloads </p></p>

             <p className="flex gap-[10px] items-center cursor-pointer"> 
                <img src={rating}  className="lg:w-[60px] sm:w-[50px] w-[40px]"/>
             <p className='text-[white] lg:text-[18px] sm:text:[17px] text-[13px] font-semibold'>4.3 Ratings <br />2M+ Downloads </p></p>
          </div>
          </div>
          </div>
    )
  }



 export const Whycriclogsect = () => {
   const arr=[{name:"Live Scoring",para:"Stay updated with real-time match progress through live scoring.", no:'01'},{name:"Scorecard",para:"Dive into player stats and match results with our comprehensive Professional Scorecard.", no:'02'},
    {name:"Organise Tournaments",para:"Effortlessly manage and streamline your tournament planning.", no:'03'},{name:"Live Streaming",para:"Experience live cricket action with real-time match streaming.", no:'04'},
    {name:"The Dressing Room",para:"Discover personalized merchandise and equipment with The Dressing Room.", no:'05'}
   ]
   const arr1=[{name:"Leaderboards",para:"Monitor and compare your cricket statistics with other players, highlighting top performances and milestones.", no:'06'},{name:"CricInsights",para:"Gain detailed insights into matches, players, and opponents with CricInsights.", no:'07'},
    {name:"Highlights",para:"Introducing cricket's first AI-generated highlights for your live-streamed matches—skip the manual edits and share perfect moments instantly!", no:'08'},{name:"Looking",para:"Easily locate players, opposing teams, umpires, and scorers with Looking.", no:'09'},
    {name:"Cricket Community",para:"Join the global cricket community and connect with fellow enthusiasts.", no:'10'}
   ]
    return (
        <div className='flex flex-col justify-center items-center py-[60px] gap-[40px]'>
            <p className='font-semibold md:text-[36px] sm:text-[30px] text-[24px] text-[#4D28D4] '>Why CricLog?</p>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-10">

<div className="flex flex-col items-center gap-5 px-[20px]">
  {arr.map((value, id) => (
    <h1
      key={id}
      className="w-full max-w-[300px] md:max-w-[400px] flex items-center gap-4 py-4 px-2 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:scale-105 ease-in-out duration-500"
    >
      <div className="flex-1 text-end">
        <p className="text-sm sm:text-base font-bold">{value.name}</p>
        <p className="text-xs sm:text-sm text-[#858484]">{value.para}</p>
      </div>
      <p className="text-2xl sm:text-3xl text-[#b1afaf] font-light">{value.no}</p>
    </h1>
  ))}
</div>
                <div>
                   <img src={whycricimg} alt=" couldn't load image" className="w-[200px] sm:w-[250px] md:w-[300px] mx-auto rounded-md " />
                </div>
                      
                <div className="flex flex-col items-center gap-5 px-[20px]">
          {arr1.map((value, id) => (
            <h1
              key={id}
              className="w-full max-w-[300px] md:max-w-[400px] flex items-center gap-4 py-4 px-2 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:scale-105 ease-in-out duration-500">
              <p className="text-2xl sm:text-3xl text-[#b1afaf] font-light">{value.no}</p>
              <div className="flex-1 text-start">
                <p className="text-sm sm:text-base font-bold">{value.name}</p>
                <p className="text-xs sm:text-sm text-[#858484]">{value.para}</p>
              </div>
            </h1>
          ))}
        </div>
   
                
        </div>
        </div>
    )
  }


export const Homedressroom = () => {
    return (
        <div className='w-full min-h-100vh bg-[black] flex md:flex-row flex-col justify-center items-center gap-[40px] md:gap-[150px] py-[50px] px-[50px]'>
           <div className='min-h-100vh flex flex-col justify-center items-center gap-[40px] text-[white]'>
            <img src={Dressinglogo} className="md:w-[180px] w-[150px]"/>
            <p className='sm:text-[22px] text-[20px] font-semibold text-center'>A store by CricLog to celebrate <br />
            your passion for cricket.</p>
            <button className='px-7 py-[5px] bg-[yellow] text-[black] font-semibold sm:text-[14px] text-[12px] rounded-md cursor-pointer'>EXPLORE NOW</button>
           </div>
           <div>
             <img src={homestore}  className='md:w-[340px] w-[280px] rounded-lg' />
           </div>
        
          </div>
    )
  }


export const Homenumbersect = () => {
    return (
      <div className="w-full min-h-[400px] bg-[#00FFCF] flex flex-col justify-center items-center gap-6 py-12 px-4">
      <h2 className="text-[20px] sm:text-[24px] md:text-[32px] font-normal text-center">
        CricLog in Numbers
      </h2>
      <div className="w-full flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 divide-y-0 md:divide-y-0 md:divide-x divide-[#7b7b7c] py-4 text-[12px] sm:text-[14px] font-medium">
        <p className="text-center md:px-6">
          <span className="text-[20px] sm:text-[24px] md:text-[30px] font-semibold">15th</span><br />
          <span className="text-[16px] sm:text-[18px] md:text-[22px] font-semibold">May 2019</span><br />
          First Match Scored
        </p>
        <p className="text-center md:px-6">
          <span className="text-[20px] sm:text-[24px] md:text-[30px] font-semibold">8M+</span><br />
          <span className="text-[16px] sm:text-[18px] md:text-[22px] font-semibold">MATCHES</span><br />
          Scored so far
        </p>
        <p className="text-center md:px-6">
          <span className="text-[20px] sm:text-[24px] md:text-[30px] font-semibold">540K+</span><br />
          <span className="text-[16px] sm:text-[18px] md:text-[22px] font-semibold">TOURNAMENTS</span><br />
          Covered so far
        </p>
        <p className="text-center md:px-6">
          <span className="text-[20px] sm:text-[24px] md:text-[30px] font-semibold">30M+</span><br />
          <span className="text-[16px] sm:text-[18px] md:text-[22px] font-semibold">PLAYERS</span><br />
          Registered so far
        </p>
      </div>
      <div className="w-[80%] sm:w-[90%] md:w-[75%] h-[1px] bg-[#7b7b7c]"></div>
      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6">
        <p className="text-[14px] sm:text-[16px] md:text-[18px] font-semibold text-center">
          Become a Part of the World's Biggest Cricket Network.
        </p>
        <button className="text-[12px] sm:text-[14px] md:text-[16px] font-bold p-2 border border-black rounded-md hover:bg-white hover:border-white hover:scale-105 hover:text-[#4D28D4] transition duration-200 ease-in-out">
          GET APP
        </button>
      </div>
    </div>

    )
  }


export const Hometaginesect = () => {
    return (
        <div className='w-full min-h-100vh bg-black text-[white] relative'>
            
                  <img src={taglineimg} alt="" className='w-full h-[550px] opacity-10'/>
                  <div className='w-full h-full absolute top-0 flex flex-col justify-center items-center gap-[30px] px-[30px]'>
                    <p className='md:text-[20px] text-[18px] '>Every cricket story resonates deeply with us, which is why</p>
                    <p className='md:text-[24px] text-[22px] font-semibold'>Your Cricket Matters</p>
                    <iframe className="md:w-[500px] md:h-[300px] sm:w-[400px] sm:h-[250px] w-[280px] h-[220px]" src="https://www.youtube.com/embed/-1TdUlp4adE?si=ji4KjRAEjwuTO11Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    <p className='text-[16px]'>Presenting our brand-new tagline</p>
                    </div>
          </div>
    )
  }

export const Homefeatured = () => {
  

  let featurearr=[{image:feature1}, {image:feature2}, {image:feature3}, {image:feature4}]
  const settings = {
    dots: true, 
    infinite: true, 
    speed: 1000, 
    slidesToShow: 3, 
    slidesToScroll: 1, 
    autoplay: true, 
    autoplaySpeed: 2000, 
    responsive: [
      {
        breakpoint:1000, 
        settings: {
          slidesToShow: 2, // Show 2 slides
          slidesToScroll: 1,
        },},
        {
          breakpoint: 550, 
          settings: {
            slidesToShow: 1, // Show 2 slides
            slidesToScroll: 1,
          },}
      ]
  };
    return (
        <div className='w-full min-h-100vh text-[#4D28D4] flex flex-col justify-center items-center gap-[50px] py-[50px]'>
          <p className='text-[30px] font-medium'>Featured In</p>
          
          <div className='sm:w-[70%] w-[55%] h-[100px] m-0'>
          <Slider {...settings}>
            { 
              featurearr.map((value,id)=>
                
                <div key={id} >
                  
                <img src={value.image} alt="" className="lg:w-[250px] md:w-[230px] w-[200px]" />
                </div>
                
                 )
            }
            </Slider>
            </div>
             
          </div>
    )
  }

  export const Homeuser = () => {
    const star = String.fromCodePoint(9733);
    const userarr=[{name:"SATHISH SHARMA", image:user1, para:" It is a leading cricket website and mobile app that focuses on delivering real-time updates, live scores,  and news related to cricket. It is widely popular among cricket fans."},
      {name:"ABISHEK", image:user2,  para:" It provides ball-by-ball live updates with concise and engaging commentary. The scorecards are detailed, featuring partnerships, fall of wickets."},
      {name:"JOHNSON", image:user3, para:" A clear and user-friendly schedule section allows fans to track upcoming matches, team standings, and results. The website offers a wide range of cricket news"},
      {name:"STEPHEN", image:user4, para:" Its app is one of the most downloaded cricket apps globally. It’s lightweight, fast, and offers excellent performance even on slower internet connections."}
    ]


    const settings = {
      dots: true, 
      infinite: true, 
      speed: 2000, 
      slidesToShow: 1, 
      slidesToScroll: 1, 
      autoplay: true, 
      autoplaySpeed: 3000,
      arrows:false,
    };
   
    return (
        <div className='w-full min-h-100vh text-[white] bg-[#4D28D4] flex flex-col justify-center items-center gap-[40px] py-[70px]'>
          <p className='md:text-[30px] text-[25px] font-medium'>User Love</p>
         <div className='md:w-[35%] sm:w-[60%] w-[70%] min-h-100vh m-auto '>
          <Slider {...settings}>
          {
            userarr.map((value,id)=>
          <div key={id} className=' w-full bg-[white] text-[black] p-[20px] rounded-[10px] text-center py-[20px] '>
            <img src={value.image} alt="" className='w-[120px] h-[120px] rounded-full sm:mx-[35%] mx-[20%]' />
            <p className='mt-[20px] md:text-[16px] text-[14px] font-bold'>{value.name}</p>
            <p className='text-[rgb(235,208,60)] md:text-[18px] text-[16px] mt-[10px]'>{star} {star} {star} {star} {star}</p>
            <p className='mt-[10px] md:text-[14px] sm:text-[13px] text-[11px]'>{value.para}</p>
            </div>
             )} 
             </Slider> 
             </div>     
          </div>
    )
  }

  export const Homejointeam = () => {
    return (
        <div className='w-full min-h-100vh text-[#4D28D4] bg-[white] flex flex-col gap-[30px] justify-center items-center py-[50px]'>
          <p className='md:text-[30px] text-[26px] font-medium'>Join Criclog Team</p>  
          <div className='lg:w-[60%] md:w-[80%] w-[100%] flex lg:flex-row flex-col justify-center items-center md:gap-[50px] gap-[30px] text-[black] '>
            <img src={jointeam} alt="couldn't load image" className='lg:w-[220px] w-[280px] rounded-[20px] opacity-70' />
            <div className='w-[50%] min-h-100vh flex flex-col gap-[10px]'>
               <p className='font-bold text-[16px]'>Love Technology & Sports?</p>
               <p className='text-[14px]  text-[#666666]'>Great! You've successfully cleared the first step. Now, explore the available spots and submit your application.</p>
            <Link to={'/jobs'}><button className='md:w-[200px] w-[200px] py-[5px] px-[1px] bg-[#4D28D4] text-[white] lg:text-[14px] sm:text-[13px] text-[11px] font-semibold rounded-md'>CHECK AVAILABLE SPOTS</button></Link>
            </div>
            </div>     
          </div>
    )
  }

  export const Homeupdate = () => {
    return (
        <div className='w-full min-h-100vh bg-[#e1e8f3] flex flex-col gap-[15px] justify-center items-center py-[20px]'>
          <p className='sm:text-[15px] text-[13px] font-bold text-[#272727]'>For Current news and updates please</p>
          <p className='sm:text-[28px] text-[22px] font-semibold text-[#4D28D4]'>Follows us on</p>
          <div className='sm:w-[40px] w-[35px] flex justify-center items-center gap-[30px]'>
            <img src={facebook} alt=" couldn't load image"/>
            <img src={insta} alt="couldn't load image" />
            <img src={twitter} alt="couldn't load image" className='rounded-full' />
            <img src={youtube} alt="couldn't load image" />
          </div>
          </div>
    )
  }


  

