import React, { useEffect, useState } from 'react'
import profile from "../../image/undraw_male_avatar_re_y880.svg";
import { useDispatch,useSelector} from "react-redux";
import { updateUser } from '../../store/feature/auth/authSlice';
import { useParams, useNavigate } from "react-router-dom";
import { profileData } from '../../store/feature/auth/authSlice';
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { motion } from "framer-motion"


 
const Edit = () => {
  const [data, setData] = useState({
    name: "",
    profacation: "",
    address:"",
    
  });
 
  const [image, setImage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(image)

  const { user,updateUserData,loding, error } = useSelector(state => state.auth);

  const dispatch = useDispatch();


  useEffect(() => {
    if (id) {
      dispatch(profileData(id));
    }
  }, [id])

  useEffect(() => {
    if (id) {
      setData({ ...updateUserData });
    }
  }, [updateUserData, id]);

  if (loding) return <div className='fixed inset-1/2 bg-blue-300'><ClipLoader color="blue" loading={true} size={50}/></div>
  

  const profileDatas = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  };

  
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("address", data.address);
  formData.append("profacation", data.profacation);
  formData.append("image",image);
  

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      toast.error("only allow jpg and jpeg and png and gif file");
      return
    }
    if (image.size > 10e6) {
      toast.error("Your file is too large");
      return;
    }
    dispatch(updateUser({id,formData,toast,navigate}))
   
  }
  return (
    <motion.div
      className="container mx-auto mt-5"
      initial={{ y:"50px",opacity:0 }}
      animate={{y:"0px",opacity:1}}
      transition={{ duration: ".6"}}
    >     
      <div className='grid md:grid-cols-[1fr_2fr] gap-4'>
       <div className="">
          <img src={updateUserData?.image ? updateUserData?.image  : profile} alt="" className='rounded md:w-[80%] w-[100%] h-[300px] object-cover' />
        </div>
        <form onSubmit={handleSubmit}>
        <div className="shadow p-4 rounded">
            <input type="text"
              onChange={profileDatas}
              value={data.name}
              name="name"
              placeholder='Enter Your name'id=""
              className='w-full p-2 border dark:bg-transparent dark:border dark:border-blue-700 dark:text-white border-gray-300 rounded mt-3'
            />
            <input type="text"
              onChange={profileDatas}
              name="profacation"
              value={data.profacation}
              placeholder='Enter Your profication'id=""
              className='w-full p-2 border dark:bg-transparent dark:border dark:border-blue-700 dark:text-white border-gray-300 rounded mt-3'
            />
            <input type="text"
              onChange={profileDatas}
              value={data.address}
              name="address"
              placeholder='Enter Your address' id=""
              className='w-full p-2 border dark:bg-transparent dark:border dark:border-blue-700 border-gray-300 rounded mt-3 dark:text-white'
            />
            <input type="file"
              onChange={(e)=>setImage(e.target.files[0])}
              placeholder='Enter Your Address' name="image" id=""
              className='w-full dark:bg-transparent dark:border dark:border-blue-700 p-2 border border-gray-300 rounded mt-3'
            />
          </div>
          
          <button type='submit' className={`bg-blue-700 px-5 py-2 rounded-full text-white uppercase block mx-auto mt-5 hover:ring-blue-700 hover:ring-2 hover:ring-offset-2 ${loding && "cursor-not-allowed"}`}>{loding ? "Pending":"Update"}</button>
      </form>
         
       
      </div>
      
    </motion.div>
  
  )
}

export default Edit