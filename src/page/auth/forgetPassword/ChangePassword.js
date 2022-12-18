import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { forgetPassword } from '../../../store/feature/auth/authSlice';
import toast from "react-hot-toast"

const ChangePassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConPassword] = useState("");
    const { id, token } = useParams();
    const { error, loding } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const hanldeSubmit = (e) => {
        e.preventDefault();
        
        const data = {
            password,
            confirmPassword
        };

        dispatch(forgetPassword({ data, id, token, navigate, toast }));
    };

    useEffect(() => {
        error && toast.error(error)
    },[error])
  return (
      <div className="h-screen flex justify-center items-center">
          <form className='w-1/3 bg-blue-700 dark:bg-gray-900 p-4 rounded' onSubmit={hanldeSubmit}>
              <input type="password"
                  placeholder='Enter Your password'
                  className='w-full p-2 focus:outline-none rounded mt-3'
                  onChange={(e)=>setPassword(e.target.value)}
                  name="" id="" />
              <input type="password"
                  placeholder='Enter Your confirm password'
                  className='w-full p-2 focus:outline-none rounded mt-3'
                  onChange={(e)=>setConPassword(e.target.value)}
                  name="" id="" />
              <button className='w-full p-2 bg-blue-700 border border-white mt-4 text-white rounded font-semibold'>{ loding ? "pending":"Update Password"}</button>
          </form>
    </div>
  )
}

export default ChangePassword