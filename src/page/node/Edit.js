import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';
import { editNode, getNode } from '../../store/feature/node/nodeSlice';
import { useParams } from "react-router-dom"
import { motion } from "framer-motion"


const Edit = () => {
    const [update, setUpdate] = useState({
        title: "",
        text: "",
        color: ""
    });
    const { id } = useParams();

    const handleInput = (e) => {
        setUpdate({ ...update, [e.target.name]: e.target.value });
    }
  
    const { error, loding,nodes } = useSelector(state => state.node);
    

    //color
    const colors = ["red", "green", "blue", "orange"];
   

    const dispatch = useDispatch();
    const navegate = useNavigate();

    //get deta
    useEffect(() => {
        dispatch(getNode());
    }, []);

    useEffect(() => {
        if (id) {
            const filterItem =nodes && nodes?.find(node => node._id === id)
            setUpdate({...filterItem})
        }
    },[nodes,id])

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            title:update.title,
            text:update.text,
            color:update.color
        }
       
        dispatch(editNode({data,id,toast,navegate}))

       
        
    };

    useEffect(() => {
        error && toast.error(error);
    }, [error]);

  return (
      <motion.div
          className='w-100 h-screen flex justify-center items-center'
            initial={{ scale:.6,opacity:0 }}
            animate={{scale:1,opacity:1}}
            transition={{ duration: ".6"}}
      >
          <form className='md:w-1/3 sm:w-1/2 w-10/12 dark:bg-black bg-blue-700 p-4 rounded-lg' onSubmit={handleSubmit}>
              <h5 className='text-center text-white md:text-2xl text-xl'>EDIT NOTE</h5>
              <input type="text"
                  placeholder='Enter Title'
                  name="title" id=""
                  className='w-full mt-3 p-2 outline-none bg-transparent text-[18px] border-white border-b text-white rounded'
                  onChange={handleInput}
                  value={update.title}
              />
              <textarea type="text"
                  name="text" id=""
                  cols="5" rows="5"
                  className='w-full mt-3 p-2 outline-none bg-transparent text-[18px]  border-white border-b text-white rounded' placeholder='Enter Text'
                  onChange={handleInput}
                  value={update.text}
              ></textarea>
              <div className="flex justify-center gap-3 mt-3 ">
              {colors.map((color,index) => (
                      <div key={index} onClick={()=>setUpdate({...update,color})} className="w-[30px] h-[30px] rounded-full cursor-pointer" style={{background:color}} ></div>
              ))}
              </div>
              <button disabled={loding} className={`w-full  py-2 border border-white text-white rounded-[24px] mt-5 font-semibold ${loding && "cursor-not-allowed"}`}>{loding?"pending":"Update Node" }</button>
          </form>
    </motion.div>
  )
}

export default Edit