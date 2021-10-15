import React , { useContext, useState } from  'react';
import Navbar from "./Navbar"
import SideDrawer from "./SideDrawer"
import Backdrop from "./Backdrop"
import { GlobalState } from '../../GlobalState';

const Header = () => {
    // Global state
    const state = useContext(GlobalState);
    
    const [sideToggle, setSideToggle] = useState(false)
    // Night Mode Api
    const [night] = state.nightModeApi.nightMode;
    
    return (
        <>
         <header className="header_area" id="header">
            <div className={`main_header_area bg-white ${ night && 'bgNight'}`}>
                <div className="container-fluid">
                    <nav id="navigation1" className="navigation d-flex">
                        <Navbar click={ () => setSideToggle(true)}/>
                        <SideDrawer show={ sideToggle } click={ () => setSideToggle(false)}/>
                        <Backdrop show={ sideToggle } click={ () => setSideToggle(false)}/>
                    </nav>
                </div>
            </div>
         </header>
        </>
    )
}

export default Header
