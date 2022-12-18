import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useDispatch,useSelector } from "react-redux"
import { regusterUser } from '../../../store/feature/auth/authSlice';
import toast from 'react-hot-toast';
import { useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"

const Reguster = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { loding, error } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //SEND DATA
    const handleReguster = (datas) => {
        const data = {
            name: datas.name,
            email: datas.email,
            password: datas.password
        }
        dispatch(regusterUser({ data, toast, navigate }))
    };

    useEffect(() => {
        error && toast.error(error)
    }, [error]);

    return (
        <motion.div
            className="h-screen w-full flex justify-center items-center"
            initial={{ y:"100px",opacity:0 }}
            animate={{y:"0px",opacity:1}}
            transition={{ duration: ".6"}}
        >
            <form onSubmit={handleSubmit(handleReguster)} className="w-1/3 px-3 py-4 rounded-lg bg-blue-700 dark:bg-black">
                <h2 className='text-center text-3xl text-white font-semibold'>Reguster</h2>
                <input type="text"
                    {...register("name",{required:true,minLength:3,maxLength:30})}
                    placeholder='Enter your name'
                    className="w-full p-2 text-white font-semibold bg-transparent focus:outline-none mt-3 border-b border-white"
                />
                {errors.name?.type === 'required' && <p role="alert" className='text-red-400 pl-3'>name is required</p>}
                {errors.name?.type === 'minLength' && <p role="alert" className='text-red-400 pl-3'>name muse be 3 charecter</p>}
                {errors.name?.type === 'maxLength' && <p role="alert" className='text-red-400 pl-3'>name muse be 30 charecter</p>}
              <input type="text"
                    placeholder='Enter your email'
                    className="w-full p-2 text-white font-semibold bg-transparent focus:outline-none mt-3 border-b border-white"
                    {...register("email",{required:true,minLength:5,maxLength:35,pattern:/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/})}
                />
                 {errors.email?.type === 'required' && <p role="alert" className='text-red-400 pl-3'>email is required</p>}
                 {errors.email?.type === 'pattern' && <p role="alert" className='text-red-400 pl-3'>plese inter valid email</p>}
                {errors.email?.type === 'minLength' && <p role="alert" className='text-red-400 pl-3'>email muse be 3 charecter</p>}
                {errors.email?.type === 'maxLength' && <p role="alert" className='text-red-400 pl-3'>email muse be 35 charecter</p>}
                <input type="password"
                    placeholder='Enter your password'
                    className="w-full p-2 text-white font-semibold bg-transparent focus:outline-none mt-3 border-b border-white"
                    {...register("password",{required:true,minLength:5,maxLength:35})}
                />
                 {errors.password?.type === 'required' && <p role="alert" className='text-red-400 pl-3'>password is required</p>}
                {errors.password?.type === 'minLength' && <p role="alert" className='text-red-400 pl-3'>password muse be 3 charecter</p>}
                {errors.password?.type === 'maxLength' && <p role="alert" className='text-red-400 pl-3'>password muse be 35</p>}
                <input type="password"
                    placeholder='Enter your Re-password'
                    className="w-full p-2 text-white font-semibold bg-transparent focus:outline-none mt-3 border-b border-white"
                    {...register("conpassword",{required:true,minLength:5,maxLength:35})}
                />
                {errors.conpassword?.type === 'required' && <p role="alert" className='text-red-400 pl-3'>con-password is required</p>}
                {errors.conpassword?.type === 'minLength' && <p role="alert" className='text-red-400 pl-3'>con-password muse be 3 charecter</p>}
                {errors.conpassword?.type === 'maxLength' && <p role="alert" className='text-red-400 pl-3'>con-password muse be 35</p>}
                <button disabled={loding} className={`w-full border-2 px-2 py-2 text-white mt-5 duration-300 rounded-[24px] border-white hover:ring-4 hover:border-2 hover:text-[black] ${loding && "cursor-not-allowed"}`}>{loding ? "Pending" : "Reguster"}</button>
                <Link to="/login" className='underline pl-3 mt-4 text-white inline-block font-semibold hover:underline text-sm '>Already have account? Login Plese </Link>
            </form>
      </motion.div>
  )
}

export default Reguster