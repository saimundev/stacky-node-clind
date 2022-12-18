import React,{useState} from 'react'
import { FaCopy, FaEllipsisV } from "react-icons/fa";
import { Link } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux"
import { deleteNode } from '../../store/feature/node/nodeSlice';
import toast from "react-hot-toast";
import moment from 'moment';


const ShowNode = ({ node }) => {
  const [show, setShow] = useState(false);
  const [hide, setHide] = useState(true);
  const [value, setValue] = useState("");


    const dispatch = useDispatch();

  const { title, text, _id, color,createdAt } = node;

  const inputText = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      navigator.clipboard.readText();
      toast.success("Copid Successfull")
   }
  }


  return (
    <div style={{ background: node.color }} className="p-3 rounded-2xl">
     
    <div className="flex justify-between items-center">
        <h5 className='font-bold w-full text-white  dark:text-black '>{title}</h5>
      <div className="p-1" onClick={inputText}>
        <FaCopy className='cursor-pointer text-white' />
        </div>
      <div className="p-1 ml-1 relative">
        <FaEllipsisV className='cursor-pointer text-white' onClick={()=>setShow(true)}/>
          {show && <ul style={{background:color}} className=' text-center p-0 absolute top-0 right-0 border border-white rounded-lg shadow' onClick={()=>setShow(false)}>
          <li><Link to={`/edit/${_id}`} className='block text-center  text-white px-5 py-2 border-b border-white no-underline'>EDIT</Link></li>
                      <li><Link to="/" className='block text-center px-5 py-2 no-underline  border-b border-white text-white'
                     onClick={()=>dispatch(deleteNode({_id,toast}))}
                      >DELETE</Link></li>
          <li><Link to="/" className='block text-center  text-white px-5 py-2  no-underline'>CLOSE</Link></li>
          </ul>}
      </div>
      </div>
      <span className='text-xs text-white font-semibold'>{moment(createdAt).fromNow()}</span>
      <hr />
     
          <p className='text-[14px] text-md font-bold text-white'>{hide ? `${text?.slice(0, 300)}` :text}</p>
     
  </div>
  )
}

export default ShowNode