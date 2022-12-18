import React, { useEffect, useState,useRef } from 'react'
import { useSelector,useDispatch } from "react-redux"
import { getNode, searchNodes } from '../../store/feature/node/nodeSlice';
import toast from "react-hot-toast"
import ShowNode from './ShowNode';
import { Link } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { motion } from "framer-motion"

const Home = () => {
  const { nodes, nodeContainer,loding, error } = useSelector(state => state.node);
  const [search, setSearch] = useState("");
  const { user } = useSelector(state => state.auth);

  const dispatch = useDispatch();


  //SEARCH

  useEffect(() => {
    dispatch(searchNodes(search))
  },[search])


  //CALL NODE DATA
  const id = user?.result?._id;
  useEffect(() => {
    if (id) {
      dispatch(getNode(id));
    }
  }, [id]);

  useEffect(() => {
    error && toast.error(error)
  }, [error])



  // const searceResults = nodes.filter(node => node.title.includes(search));
 

  

 
  
  
  if (loding) return <div className='fixed inset-1/2 bg-blue-300'><ClipLoader color="blue" loading={true} size={50} /></div>
  



  

  return (
    <div className="container mx-auto mt-5">
      {!nodeContainer.length && <div className='text-center'>
        <h1 className='text-center dark:text-white mt-10 font-bold'>Welcome to Stacky node <span className='text-blue-700'>{user?.result?.name}</span></h1>
        <Link to="/node" className='text-white bg-blue-700 px-16 rounded-full py-3 inline-block no-underline mt-10 hover:ring-2 hover:ring-offset-2 hover:ring-blue-700 duration-300'>Creat Your Node</Link>
      </div>}
      {nodeContainer.length ?  <div className='flex mb-8'>
        <input type="search" onChange={(e)=>setSearch(e.target.value)} placeholder="Search Your Node" className='w-full p-2 border-2 border-blue-500 focus:outline-none font-semibold text-blue-500 rounded-tl-full rounded-bl-full' />
        <button type='submit' className='bg-blue-700 text-white px-8 rounded-tr-full rounded-br-full'>Search</button>
      </div>:""}
      <motion.div
        className="grid md:grid-cols-4  sm:grid-cols-2 gap-4"
        initial={{y:"50px",opacity:0 }}
        animate={{y:"0px",opacity:1}}
        transition={{ duration: 1}}
      >
        {nodes.length  && nodeContainer.length ? nodes.map((node,index) => (
          <ShowNode
            key={index}
            node={node}
          />
        )):""} 
      </motion.div>
    </div>
  )
}

export default Home