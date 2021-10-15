import React, {useContext} from 'react'
import {Link} from "react-router-dom"
import axios from "axios"
import { GlobalState } from '../../../GlobalState'

const DashboardLinks = () => {
    //Global state
    const state = useContext(GlobalState);
    // Night Mode Api
    const [night] = state.nightModeApi.nightMode;
    // admin
    const [isAdmin] = state.userApi.isAdmin;

    const logOutUser = async () => {
        await axios.get("/user/logout");
        localStorage.removeItem("firstLogin");
        window.location.href = "/"
    }

    return (
        <div className="bg-light dashboard mb-5">
            <ul className={`nav nav-tabs ${ night && 'bgNightCard nightText nightBorder'}`} id="myTab">
                <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/checkout">Checkout</Link></li>
                {  isAdmin && <li className="nav-item"><Link className="nav-link" to="/category">Categories</Link></li> }
                {  isAdmin && <li className="nav-item"><Link className="nav-link" to="/create_product">Create Product</Link></li> }
                <li className="nav-item"><Link className="nav-link" to="/history">My Order</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/" onClick={logOutUser}>Logout</Link></li>
            </ul>
        </div>
    )
}

export default DashboardLinks
