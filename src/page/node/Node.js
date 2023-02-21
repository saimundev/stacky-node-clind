import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from "react-redux";
import { addNode } from '../../store/feature/node/nodeSlice';
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';
import { motion } from "framer-motion"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const Node = () => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [color, setColor] = useState("" || "red");
    const [selectIndex,setSelectIndex] =useState(0)
    const { error, loding } = useSelector(state => state.node);
    const { user } = useSelector(state => state.auth);

    //color
    const colors = ["red", "green", "blue", "orange"];
    
   

    const dispatch = useDispatch();
    const navegate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = user?.result?._id;
        const data = {
            title,
            text,
            color,
            id
        }

        dispatch(addNode({ data, navegate, toast }))
        
    };

    useEffect(() => {
        error && toast.error(error);
    }, [error]);

    const handleColor = (color,index) => {
        setColor(color);
        setSelectIndex(index);
    }

  return (
      <motion.div
          className='w-100 h-screen flex justify-center items-center'
            initial={{ y:"100px",opacity:0 }}
            animate={{y:"0px",opacity:1}}
            transition={{ duration: ".6"}}
      >
          <form  className='md:w-1/2 sm:w-1/2 w-10/12 bg-blue-700 dark:bg-black p-4 rounded-lg' onSubmit={handleSubmit}>
              <h5 className='text-center text-white md:text-2xl text-xl'>ADD NOTE</h5>
              <input type="text"
                  placeholder='Enter Title'
                  name="" id=""
                  className='w-full mt-3 mb-5 p-2 outline-none bg-transparent text-[18px] border-b border-white text-white rounded'
                  onChange={(e)=>setTitle(e.target.value)}
              />
             <ReactQuill theme="snow"  value={text} className="h-[150px] text-[18px] font-semibold text-white " onChange={setText} />
              <div className="flex justify-center gap-3  mt-[80px] ">
              {colors.map((color,index) => (
                  <div key={index} onClick={() => handleColor(color, index)} className="w-[30px] h-[30px] rounded-full cursor-pointer" style={{ background: color,border:`3px solid ${index === selectIndex ? "white":color}`}} ></div>
              ))}
              </div>
              <button disabled={loding}  className={`w-full py-2 text-white ring-4 border border-white rounded-[24px] mt-5 font-semibold ${loding && "cursor-not-allowed"}`}>{loding?"pending":"Submit" }</button>
          </form>
    </motion.div>
  )
}

export default Node