import React, { useState } from 'react';
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import logo from '../Assests/logo.png';
import profile from '../Assests/profile.avif';
import { HiOutlineLogout } from "react-icons/hi";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";
import { BiSolidUserRectangle } from "react-icons/bi";


export const Profile = () => {
  const initialUserData = JSON.parse(localStorage.getItem("Adminuserdata")) || {};
  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({ ...userData });

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("Adminuserdata");
    navigate("/");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async () => {
    if (!updatedData.userName || !updatedData.email || !updatedData.mobileNo) {
      toast.error("All fields are required.");
      return;
    }

    try {
        await axios.put("http://localhost:7000/admin/putadminuserdata", {
        email: updatedData.email,
        updatedData
      })
      .then((res) => {
                          toast.success(res.data.message) 
                          setUserData(updatedData) 
                          localStorage.setItem("Adminuserdata", JSON.stringify(updatedData));  
                          navigate("/profile")
                      })
                      .catch((err) => toast.error(err.response.data.message))
                      .finally(() => setIsEditing(false))
    } catch (error) {
      toast.error(error.res.data.message);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-black opacity-95 ">
      <img src={profile} className="w-full h-screen absolute -z-10 opacity-20 object-cover" alt="background" />
      <div className="min-w-100vw h-screen flex flex-col justify-center gap-10">
        <div className="flex flex-col justify-center items-center gap-5">
          <p className="flex flex-col items-center gap-2">
            <img src={logo} alt="logo" className="md:w-[60px] w-[40px]" />
            <span className="text-[#4a2eb0] sm:text-[26px] text-[22px] font-semibold">CRICLOG</span>
          </p>
          
        </div>
        {!isEditing ? (
          
          <div className="w-full flex flex-col justify-center gap-7 px-[30px]">
            <p className="w-full flex justify-center items-center gap-4 sm:text-[24px] text-[20px] text-[#00FFCF] pb-4">User Profile</p>
            <p className="w-full flex items-center gap-4 sm:text-[22px] text-[16px] text-white">
              <FaUser className="sm:text-[25px] text-[20px] text-[#00FFCF]" /> {userData.userName}
            </p>
            <p className="w-full flex items-center gap-4 sm:text-[22px] text-[16px] text-white">
              <MdEmail className="sm:text-[25px] text-[20px] text-[#00FFCF]" /> {userData.email }
            </p>
            <p className="w-full flex items-center gap-4 sm:text-[22px] text-[16px] text-white">
              <BiSolidUserRectangle className="sm:text-[25px] text-[20px] text-[#00FFCF]" /> {userData.userId }
            </p>
            <p className="w-full flex items-center gap-4 sm:text-[22px] text-[16px] text-white">
              <IoCall className="sm:text-[25px] text-[20px] text-[#00FFCF]" /> {userData.mobileNo}
            </p>
            <div className='w-full flex justify-center'>
            <button
              onClick={() => setIsEditing(true)}
              className="w-[110px]  text-[white] border-[#00FFCF] border-2 py-1 text-[17px] rounded-md hover:border-[white] hover:text-[black] hover:bg-[white] ease-in duration-200">
              Edit Profile
            </button></div>
          </div>
        ) : (
          <div className="w-full flex flex-col justify-center gap-6 px-[35px]">
            
            <p className="w-full flex justify-center items-center gap-4 sm:text-[24px] text-[20px] text-[#00FFCF] ">Edit Profile</p>
            <input
              type="text"
              name="userName"
              value={updatedData.userName}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="text-[white] bg-transparent px-2 py-1 rounded-md border-[#00FFCF] border-2 text-[18px] outline-none"
            />
            <input
              type="email"
              name="email"
              value={updatedData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="text-[white] bg-transparent px-2 py-1 rounded-md border-[#00FFCF] border-2 text-[18px] outline-none "
            />
             <input
              type="text"
              name="userId"
              value={updatedData.userId}
              onChange={handleInputChange}
              placeholder="Enter your user Id"
              className="text-[white] bg-transparent px-2 py-1 rounded-md border-[#00FFCF] border-2 text-[18px] outline-none "
            />
            <input
              type="text"
              name="mobileNo"
              value={updatedData.mobileNo}
              onChange={handleInputChange}
              placeholder="Enter your mobile number"
              className="text-[white] bg-transparent px-2 py-1 rounded-md border-[#00FFCF] border-2 text-[18px] outline-none"
            />
            <div className='w-full flex justify-center gap-6'>
            <button
              onClick={handleUpdate}
              className="w-[110px]  text-[white] border-[#5336e7] border-2 py-1 text-[17px] rounded-md hover:border-[white] hover:text-[#4a2be0] hover:bg-[white] ease-in duration-200">
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="w-[110px]  text-[white] border-[red] border-2 py-1 text-[17px] rounded-md hover:border-[white] hover:text-[red] hover:bg-[white] ease-in duration-200">
              Cancel
            </button></div>
          </div>
        )}
        <div className="w-full flex justify-between px-[30px]">
          <Link to="/home">
            <p className="flex items-center gap-4 sm:text-[21px] text-[18px] text-white cursor-pointer">
              <IoArrowBackCircleOutline className="sm:text-[35px] text-[30px] text-[#00FFCF]" />
              Back
            </p>
          </Link>
          <p
            onClick={handleLogout}
            className="flex items-center gap-4 sm:text-[21px] text-[18px] text-white cursor-pointer">
            <HiOutlineLogout className="sm:text-[30px] text-[25px] text-[#00FFCF]" />
            Logout
          </p>
        </div>
      </div>
    </div>
  );
};
