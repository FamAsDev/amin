import React, { useContext, useState } from 'react'
import {Link, useLocation} from "react-router-dom"
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalState } from '../../GlobalState';
import Login from "../mainpages/auth/Login"
import Register from "../mainpages/auth/Register"
import Cart from '../mainpages/cart/Cart';

const Footer = () => {

  const location = useLocation();
  //Global state
  const state = useContext(GlobalState);
  // Night Mode Api
  const [night, setNight] = state.nightModeApi.nightMode;
  // Get Night mode
  const getNightMode = localStorage.getItem("nightMode");
  
  // Check if local-storage available
  if(getNightMode === "true"){
    setNight(true)
  }

  //setStorage  
  const handleNightMode = () => {

    const isNightMode = localStorage.getItem("nightMode");

    if(!isNightMode){
      localStorage.setItem("nightMode", true);
      setNight(true)
    }else{
      localStorage.removeItem("nightMode");
      setNight(false)
    }
  }


    return (
      // _______________ Footer _______________
      <footer className={`bg-white p-4 text-center ${ night && 'bgNight nightColor'}`}>  
          <p className="fw-bold text-dark">&copy; copyright All right reserved { new Date().getFullYear()} <Link to="https://www.facebook.com/famasWebServices/" className="text-success fw-bolder">FAMAS</Link></p>
          <ul className={`list-inline ${ night && 'nightText'}`}>
            <li className="list-inline-item"><Link className="social-icon text-xs-center" to="/help">Need Help</Link></li>
            <li className="list-inline-item"><Link className="social-icon text-xs-center" to="/privacy-policy">Privacy Policy</Link></li>
          </ul>

        {/* Cart */}
        {
          location.pathname === "/"  ?
          <Cart/> : ""
        }
        {/* Login */}
        <Login id={"login"}/>
        {/* Register */}
        <Register id={"signup"}/>

        <button className={`openbtn-2 ${ night && 'bgNightCard nightColor'}`} onClick={handleNightMode}>
            {
              night ?
              <span className="material-icons text-warning">
                  light_mode
              </span>
              :
              <span className="material-icons text-white">
                  mode_night
              </span>
            }
        </button>

        {/* popup error */}
        <ToastContainer draggable={false} transition={Zoom} autoClose="2000" position={toast.POSITION.BOTTOM_RIGHT}  />
    </footer>
    )
}

export default Footer
