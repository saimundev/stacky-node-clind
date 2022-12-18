import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { lazy, Suspense } from "react"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Reguster from './page/auth/reguster/Reguster';
import Login from './page/auth/login/Login';
import Header from './page/share/header/Header';
import {useEffect } from 'react';
import { getUser, profileData } from './store/feature/auth/authSlice';
import { useDispatch } from "react-redux"
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './page/auth/private/PrivateRoute';
import { getNode } from './store/feature/node/nodeSlice';
const Node = lazy(() => import("./page/node/Node"));
const Edit = lazy(() => import("./page/node/Edit"));
const Profile = lazy(() => import("./page/profile/Profile"));
const ProfielEdit = lazy(() => import("./page/profile/Edit"));
const ChangePassword = lazy(() => import("./page/auth/forgetPassword/ChangePassword"));
const SendEmail = lazy(() => import("./page/auth/forgetPassword/SendEmail"));
const Home = lazy(() => import("./page/home/Home"));



function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
   dispatch(getUser(user))
  }, [])
  
  const id = user?.result?._id;
  useEffect(() => {
    if (id) {
      dispatch(getNode(id));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      dispatch(profileData(id));
    }
  }, [id]);

  return (
    <div>
      <Router>
        <Header />
        <Toaster />
        <Suspense fallback={<span>Plese wait...</span>}>
        <Routes>
          <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path='/node' element={<PrivateRoute><Node /></PrivateRoute>} />
          <Route path='/edit/:id' element={ <PrivateRoute><Edit /></PrivateRoute>} />
          <Route path='/profile' element={ <PrivateRoute><Profile /></PrivateRoute>} />
          <Route path='/profile/:id' element={ <PrivateRoute><ProfielEdit /></PrivateRoute>} />
          <Route path='/reguster' element={ <Reguster />} />
          <Route path='/login' element={ <Login />} />
          <Route path='/sendemail' element={ <SendEmail />} />
          <Route path='/changepassword/:id/:token' element={ <ChangePassword />} />
        
          </Routes>
          </Suspense>
      </Router>
    </div>
  );
}

export default App;
