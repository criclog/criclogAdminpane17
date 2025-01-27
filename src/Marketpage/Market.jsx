import React, { useEffect, useState } from 'react';
import TextField from "@mui/material/TextField";
import axios from "axios";
import { toast } from "react-toastify";
import { Config } from '../utils/Token';
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RiDeleteBin6Fill } from "react-icons/ri";

const initial = {
  productname: "",
  location: "",
  price: "",
  sellername: "",
  description: "",
  file: null,
};

export const Market = () => {
  const [formdata, setForm] = useState(initial);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'file') {
      setForm((prevForm) => ({ ...prevForm, file: files[0] }));
    } else {
      setForm((prevForm) => ({ ...prevForm, [name]: value }));
    }
  };
  

  const getProdById = async (id) => {
    try {
       await axios.get(`https://criclogbackendtest01.vercel.app/getMarketById?objectid=${id}`, Config)
       .then((res) => {
        toast.success(res.data.message)  
        setForm(res.data);  
    })
    .catch((err) => console.log(err))
    .finally(() => setIsEdit(true))
      
    } catch (error) {
      toast.error(error.res.data.message );
    }
  };

  useEffect(() => {
    if (id) {
      getProdById(id);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    Object.keys(formdata).forEach((key) => {
      formDataToSend.append(key, formdata[key]);
    });

    try {
      if (isEdit) {
        const response = await axios.put(`https://criclogbackendtest01.vercel.app/updatemarket?objectid=${formdata._id}`, formDataToSend, Config);
        toast.success(response.data.message);
      } else {
        const response = await axios.post("https://criclogbackendtest01.vercel.app/marketData", formDataToSend, Config);
        toast.success(response.data.message);
        
      }
      navigate('/market');
    } catch (error) {
      toast.error(error.response.data.message || 'Error submitting form');
    } finally {
      setIsSubmitting(false);
      setForm(initial);
    }
  };

  const handleclear=()=>{
    setIsEdit(false)
    setForm(initial)
  }


  return (
    <div className='w-full min-h-100vh flex flex-col justify-center items-center py-10 px-[30px] gap-8'>
      <h2 className='text-[20px] font-semibold text-[#4a2be0] underline'>{isEdit ? 'Edit Data' : 'Market Data'}</h2>
      <form className='w-full flex flex-col gap-12 items-center' onSubmit={handleSubmit}>
        <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8'>
          <TextField label="Title" variant="filled" type='text' name='productname' value={formdata.productname} onChange={handleChange} />
          <TextField label="Location" variant="filled" type='text' name='location' value={formdata.location} onChange={handleChange} />
          <TextField label="Price" variant="filled" type='number' name='price' value={formdata.price} onChange={handleChange} />
          <TextField label="Seller Name" variant="filled" type='text' name='sellername' value={formdata.sellername} onChange={handleChange} />
          <TextField label="Description" variant="filled" type='text' name='description' value={formdata.description} onChange={handleChange} />
          <div className='flex flex-col'>
            <label htmlFor="file" className='font-semibold text-[#4a2be0]'>Product Image:</label>
            <input type="file" name='file' onChange={handleChange} className='text-[#4a2be0]' />
          </div>
        </div>
        <div className=' flex gap-[40px]'>
        <button className='px-4 py-2 font-semibold bg-[#4a2be0] text-white rounded-lg hover:scale-105 transition'>
          {isSubmitting ? (isEdit ? 'Updating...' : 'Submitting...') : (isEdit ? 'Update' : 'Submit')}
  
        </button>
        {isEdit? (<Link to={'/market'}><button className='px-4 py-2 font-semibold bg-[#c94141] text-white rounded-lg hover:scale-105 transition' onClick={handleclear}>cancel</button></Link>):''}
        </div>
      </form>
      <Getproduct />
    </div>
  );
};

export const Getproduct = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  const fetchProgramData = async () => {
    try {
     await axios.get("https://criclogbackendtest01.vercel.app/getallData", Config)
     .then((res) => {
      toast.success(res.data.message)  
      setProduct(res.data); 
  })
  .catch((err) => console.log(err))
      
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error fetching data');
    }
  };

  useEffect(() => {
    fetchProgramData();
  }, []);

  const handledelete=async(id)=>{
       
    await axios.delete(`https://criclogbackendtest01.vercel.app/deletemarket?objectid=${id}`,Config)
    .then((res)=> {
        toast.success(res.data.message)
        setProduct((Prevproduct)=> Prevproduct.filter((product)=>product._id !== id))
    })
    .catch((err)=> console.log(err))

}



  const handleUpdate = (id) => {
    navigate(`/market/${id}`);
  };

  return (
    <div className='w-full min h-100vh flex flex-col gap-5 items-center px-5'>
      <h1 className='text-[20px]'>Market Details</h1>
      <div className='grid md:grid-cols-2 gap-8'>
        {product.map((prod) => (
          <div key={prod._id} className='bg-gray-200 p-4 rounded-xl text-[14px] gap-3 flex flex-col'>
            <div className='flex justify-between items-center '>
              <h1 className='font-semibold'>Title: <span>{prod.productname}</span></h1>
              <div className='flex gap-6'>
              <FaEdit className='text-[20px] cursor-pointer text-[#4a2be0]' onClick={() => handleUpdate(prod._id)} />
              <RiDeleteBin6Fill className="text-[20px] cursor-pointer text-[red]" onClick={()=>handledelete(prod._id)}/>
              </div>
            </div>
            <h1>Location: {prod.location}</h1>
            <h1>Price: {prod.price}</h1>
            <h1>Seller Name: {prod.sellername}</h1>
            <h1>Description: {prod.description}</h1>
            <img src={`https://criclogbackendtest01.vercel.app/view/${prod.filename}`} alt="Product" className='w-40 h-40 mx-auto' />
            <h1>Posted: {prod.createdAt}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};
