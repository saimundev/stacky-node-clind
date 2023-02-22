import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';
import { editNode, getNode } from '../../store/feature/node/nodeSlice';
import { useParams } from "react-router-dom"
import { motion } from "framer-motion"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const Edit = () => {
    const [update, setUpdate] = useState({
        title: "",
        color: ""
    });
    const [text, setText] = useState("")
    const { id } = useParams();

    const handleInput = (e) => {
        setUpdate({ ...update, [e.target.name]: e.target.value });
    }

    const { error, loding, nodes } = useSelector(state => state.node);


    //color
    const colors = ["red", "green", "blue", "orange"];


    const dispatch = useDispatch();
    const navegate = useNavigate();

    //get deta
    useEffect(() => {
        dispatch(getNode());
    }, []);

    //updagte data

    useEffect(() => {
        if (id) {
            const filterItem = nodes && nodes?.find(node => node._id === id)
            if (filterItem) {
                setText(filterItem?.text)
                setUpdate({ ...filterItem })
            }

        }
    }, [nodes, id])



    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            title: update.title,
            text: text,
            color: update.color
        }

        dispatch(editNode({ data, id, toast, navegate }))
    };

    useEffect(() => {
        error && toast.error(error);
    }, [error]);

    return (
        <motion.div
            className='w-100 h-screen flex justify-center items-center'
            initial={{ scale: .6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: ".6" }}
        >
            <form className='md:w-1/2 sm:w-1/2 w-10/12 dark:bg-black bg-blue-700 p-4 rounded-lg' onSubmit={handleSubmit}>
                <h5 className='text-center text-white md:text-2xl text-xl'>EDIT NOTE</h5>
                <input type="text"
                    placeholder='Enter Title'
                    name="title" id=""
                    className='w-full mt-3 p-2 mb-[20px] outline-none bg-transparent text-[18px] border-white border-b text-white rounded'
                    onChange={handleInput}
                    value={update.title}
                />
                <ReactQuill theme="snow" value={text} className="h-[150px] text-[18px] font-semibold text-white " onChange={setText} />
                <div className="flex justify-center gap-3 mt-[60px] ">
                    {colors.map((color, index) => (
                        <div key={index} onClick={() => setUpdate({ ...update.color, color })} className="w-[30px] h-[30px] rounded-full cursor-pointer" style={{ background: color,border:`3px solid ${color}`}} ></div>
                    ))}
                </div>
                <button disabled={loding} className={`w-full  py-2 border border-white text-white rounded-[24px] mt-5 font-semibold ${loding && "cursor-not-allowed"}`}>{loding ? "pending" : "Update Node"}</button>
            </form>
        </motion.div>
    )
}

export default Edit