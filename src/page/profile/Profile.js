import React, { useEffect } from 'react'
import profile from "../../image/undraw_male_avatar_re_y880.svg";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { getNode } from '../../store/feature/node/nodeSlice';
import { profileData } from '../../store/feature/auth/authSlice';
import ClipLoader from "react-spinners/ClipLoader";
import { motion } from "framer-motion"


const Profile = () => {
  const { updateUserData,user, loding, error } = useSelector(state => state.auth);
  const { nodes } = useSelector(state => state.node);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.result?._id) {
      dispatch(profileData(user && user?.result?._id));
    }
  }, [user?.result?._id]);

  useEffect(() => {
    
  },[])

  if (loding) return <div className='fixed inset-1/2 bg-blue-300'><ClipLoader color="blue" loading={true} size={50}/></div>
  
  return (
    <motion.div
      className="container mx-auto mt-5"
            initial={{ y:"50px",opacity:0 }}
            animate={{y:"0px",opacity:1}}
            transition={{ duration: ".6"}}
    >     
      <div className='grid md:grid-cols-[1fr_2fr] md:gap-4 gap-10'>
        <div className="shadow-xl px-2 pb-6 text-center">
          
          <img src={updateUserData?.image ? updateUserData?.image  :profile}  alt="" className='rounded mx-auto w-[80%] h-[250px] object-cover' />
          <h3 className='capitalize pt-3 dark:text-white font-bold'>{ updateUserData?.name}</h3>
          <h4 className='capitalize dark:text-white text-xl'>{ updateUserData?.profacation}</h4>
          <h4 className='capitalize dark:text-white text-sm mb-4'>{ updateUserData?.address}</h4>
          <button>
            <Link className={`bg-blue-700 px-16 hover:ring-offset-2 hover:ring-2 hover:ring-blue-700 py-2  inline-block duration-300 text-white rounded-full no-underline ${loding && "cursor-not-allowed"}`} to={`/profile/${user?.result?._id}`}>{ loding ? "Pending":"Edit"}</Link>
          </button>
        </div>

        <div className="flex justify-center">
          <div className="w-[300px] h-[300px] flex justify-center items-center flex-col border-4 rounded-full  border-blue-700">
            <h1 className='font-bold dark:text-white'>Total Node</h1>
            <h3 className='font-black dark:text-white'>{nodes && nodes.length ? nodes.length : 0 }</h3>
          </div>
        </div>
        
         
       
      </div>
      
    </motion.div>
  )
}

export default Profile