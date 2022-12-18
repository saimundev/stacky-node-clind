import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from "react-redux"
import { forgetEmailSend } from '../../../store/feature/auth/authSlice';
import toast from "react-hot-toast"

const SendEmail = () => {
    const [email, setEmail] = useState("");
    const { error, loding,isEmailSuccess } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const hanldeSubmit = (e) => {
        e.preventDefault();
        const data = {
            email:email
        }
        dispatch(forgetEmailSend({ data, toast }))
    };

    useEffect(() => {
        error && toast.error(error)
    },[error])
  return (
      <div className="h-screen flex justify-center items-center">
          {isEmailSuccess ? <span className='text-3xl text-blue-700 font-semibold'>We send a email your inbox. plsese check your email and chane password</span> :
               <form className='w-1/3 bg-blue-700 dark:bg-gray-900 p-4 rounded' onSubmit={hanldeSubmit}>
               <input type="text"
                   placeholder='Enter Your Email'
                   className='w-full p-2 focus:outline-none rounded'
                   onChange={(e)=>setEmail(e.target.value)}
                   name="" id="" />
               <button disabled={loding} className='w-full p-2  bg-blue-700 border border-white mt-6 text-white rounded font-semibold'>{ loding?"Loding":"Send Email"}</button>
           </form>
          }
         
    </div>
  )
}

export default SendEmail