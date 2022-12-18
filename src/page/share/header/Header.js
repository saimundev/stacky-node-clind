import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux"
import { logOut, profileData } from '../../../store/feature/auth/authSlice';
import profileImage from "../../../image/undraw_male_avatar_re_y880.svg"
import decode from "jwt-decode";
import { toast } from "react-hot-toast"
const Header = () => {
  const [show, setShow] = useState(false);
  const [theme, setTheme] = useState("light");
  const { user, updateUserData } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const token = user?.token;
 
  if (token) {
    const decodeToken = decode(token);
    if (decodeToken.exp * 1000 < new Date().getTime()) {
      dispatch(logOut()); 
      toast.success("Logout successfull")
    }
  }



  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  },[theme])


  
  const id = user?.result?._id;
  useEffect(() => {
    if (id) {
      dispatch(profileData(id));
    }
  }, [id]);


  const handleLogout = () => {
    dispatch(logOut());
    
  }


  const hanldeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  }

 
  return (
      <div>
          <div className="bg-blue-700 md:flex dark:bg-black  justify-between items-center px-8 w-full">
            <div className="text-xl text-white font-bold py-3 text-center">Stacky Pade</div>
            <ul className='flex gap-3 m-0 items-center'>
          {user?.result?.isVarefide && <li><NavLink to="/"
            style={({ isActive }) =>
            isActive
                ? {
                    color: '#000',
                    borderBottom: 'solid 2.5px #fff',
                    paddingBottom: 2.5
                }
                : {}
        }
            className="no-underline text-white text-[16px]  inline-block font-semibold py-3 px-2">Home</NavLink></li>}
          {user?.result?.isVarefide && <li><NavLink to="/node"
            style={({ isActive }) =>
            isActive
                ? {
                    color: '#0000FF',
                    borderBottom: 'solid 2.5px #fff',
                    paddingBottom: 2.5
                }
                : {}
        }
            className="no-underline text-white text-[16px] inline-block font-semibold py-3 px-2">Add Node</NavLink></li>}
                 {user?.result?.isVarefide &&  <li className="relative" onClick={()=>setShow(!show)}>
                      <img className='no-underline object-cover ring-1 ring-offset-1 ring-white  text-white text-[16px] font-semibold w-[50px] h-[50px] flex justify-center items-center rounded-[50%] border border-red-600 cursor-pointer capitalize' src={updateUserData?.image ? `https://ntacky-node.onrender.com/${updateUserData?.image}`: profileImage} alt="P" />
                      {show && <ul className='bg-white dark:bg-gray-500 text-center py-3 absolute w-[150px] right-0 top-14 shadow-lg p-0'>
                          <li><NavLink to="/profile" className="py-2 cursor-pointer block text-blue-700 no-underline hover:bg-blue-700 hover:text-white">View Profile</NavLink></li>
                          <li><NavLink to="/login" className=" py-2 block text-blue-700 no-underline hover:bg-blue-700 hover:text-white" onClick={handleLogout}>LogOut</NavLink></li>
                      </ul>}
                  
          </li>}
          <li>
          <label htmlFor="check" className='border-2 border-white mt-1 ml-2 relative w-14 h-7 rounded-full'>
          <input type="checkbox" onClick={hanldeSwitch} className='sr-only peer' name="" id="check" />
          <span className='w-2/5 h-4/5 left-1 top-1 bg-white absolute rounded-full  peer-checked:bg-white peer-checked:left-7'></span>
      </label>
         </li>
            </ul>

        </div>
    </div>
  )
}

export default Header