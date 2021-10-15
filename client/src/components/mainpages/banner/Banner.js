import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState';
import Background from "./img/bg-1.png";

const Banner = () => {
    //Global state
    const state = useContext(GlobalState);
    // Night Mode Api
    const [night] = state.nightModeApi.nightMode;

    return (
        // <!--_______________ Page Banner _______________-->
        <div className={`page_banner ${ night && 'bgNightBody'}`} style={{backgroundImage: `url(${Background})`}}>
            <div className="container">
                <div className="page_banner_intro text-center justify-content-center">
                    <h1 className={`font-weight-bold ${ night && 'nightColor' }`}>Groceries Delivered in 90 Minute</h1>
                    <p>Get your healthy foods &amp; snacks delivered at your doorsteps all day everyday</p>
                </div>
            </div>
        </div>
    )
}

export default Banner
