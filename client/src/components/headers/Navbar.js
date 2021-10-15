import React , {useContext} from "react";
import "./Navbar.css";
import {Link, useLocation} from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import axios from "axios"
import Logo from "./icon/logo.svg";
import Admin from "./icon/ADMIN.svg";
import AminNight from "./icon/AminNight.svg";
import AdminNight from "./icon/AdminNight.svg";

const Navbar = ({click}) => {

    const state = useContext(GlobalState);
    // Night Mode Api
    const [night] = state.nightModeApi.nightMode;
    
    // User & admin information
    const [isLogged] = state.userApi.isLogged;
    const [isAdmin] = state.userApi.isAdmin;
    // Route location
    const location = useLocation()

    const logOutUser = async () => {
        await axios.get("/user/logout");
        localStorage.removeItem("firstLogin");
        window.location.href = "/"
    }

    const adminRouter = () => {
        return(
            <>
                <li><Link to="/create_product">Create Product</Link></li>
                <li><Link to="/category">Categories</Link></li>
            </>
        )
    }

    const loggedRouter = () => {
        return(
            <>
                <li><Link to="/profile">Dashboard</Link></li>
                <li><Link to="/" onClick={logOutUser}>Logout</Link></li>
            </>
        )
    }

    return (
        <>
            {/* logo */}
            <Link className="navbar-brand pl-4 mt-1" style={{marginLeft: '15px'}} to="/">
                { isAdmin ? night ? <img src={AdminNight} alt="admin-logo" /> : <img src={Admin} alt="admin-logo" /> : night ? <img src={AminNight}  alt="logo" /> : <img src={Logo}  alt="logo" /> }
            </Link>
            
            {/* hamburger menu */}
            <div className={`hamburger__menu ${ night && 'bgNightWhiteHam' }`} onClick={click}>
                <div></div>
                <div></div>
                <div></div>
            </div>

            {/* links */}
            <div className="nav-menus-wrapper">
                <ul className={`nav-menu float-right ${ night &&  'nightText'}`}>
                    
                    {
                        location.pathname !== "/" &&
                        <li>
                            <Link to="/">
                                { isAdmin ? 'Products' : "Shop" }
                            </Link>
                        </li>
                    }
                    <li>
                        <Link to="/help">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 14 14">
                                <path id="Path_111" data-name="Path 111" d="M269.443,404.312a7,7,0,1,0,7,7,6.98,6.98,0,0,0-7-7Zm.635,10.818a.3.3,0,0,1-.319.319h-.635a.3.3,0,0,1-.319-.319v-.635a.3.3,0,0,1,.319-.319h.635a.3.3,0,0,1,.319.319Zm.859-2.832c-.446.382-.763.637-.859.987a.308.308,0,0,1-.319.255h-.635a.309.309,0,0,1-.319-.35,2.988,2.988,0,0,1,1.336-1.876c.574-.446.892-.732.892-1.274a1.591,1.591,0,1,0-3.182,0v.191a.3.3,0,0,1-.224.351l-.6.189a.318.318,0,0,1-.414-.253,2.363,2.363,0,0,1-.033-.479,2.864,2.864,0,0,1,5.729,0,2.792,2.792,0,0,1-1.369,2.259Zm0,0" transform="translate(-262.442 -404.312)" fill="currentColor"></path>
                            </svg>
                            &nbsp; Need Help
                        </Link>
                    </li>
                    { isAdmin && adminRouter() }
                   
                    { isLogged ? loggedRouter() 
                    :  
                    <li>
                        <div className="d-flex justify-content-right">
            
                            <div className="dropdown">
                                <button type="button" className={`btn btn-success mr-2 ${ night && 'bgNightCard'}`} data-bs-toggle="dropdown" aria-expanded="false">Join</button>
                                <div className={`dropdown-menu ${ night && 'bgNightCard'}`}>
                                    <button className="btn btn-block" data-bs-toggle="modal" data-bs-target="#login">
                                        <Link className={`dropdown-item ${ night && 'bgNightCard' }`} to="/login">Login</Link>
                                    </button>
                                    <button className="btn btn-block" data-bs-toggle="modal" data-bs-target="#signup">
                                        <Link className={`dropdown-item ${ night && 'bgNightCard' }`} to="/register">Signup</Link>
                                    </button>
                                    
                                </div>
                            </div>
                        </div>
                    </li>
                    }

                   
                </ul>
            </div>
        </>
    )
}

export default Navbar
