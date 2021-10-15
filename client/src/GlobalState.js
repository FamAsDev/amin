import React, { createContext, useState, useEffect } from "react";
import ProductsAPI from './api/ProductsAPI';
import UserApi from './api/UserApi';
import CategoriesApi from './api/CategoriesApi';
import axios from "axios";
import WinSizeApi from "./api/WinSizeApi";
import BannerApi from "./api/BannerApi";
import NightModeApi from "./api/NightModeApi";

export const GlobalState = createContext()

export const DataProvider = ({ children }) => {

    const [token , setToken] = useState(false)

    useEffect(() => {
        const firstLogin = localStorage.getItem("firstLogin");

        if(firstLogin){
            const refreshToken = async () => {
                const res = await axios.get("/user/refresh_token");
                
                setToken(res.data.accesstoken)
    
                setTimeout(() => {
                    refreshToken();
                }, 10 * 60 * 1000 );
            }
    
           refreshToken();
        }
    },[])

    const state = {
        token: [token , setToken],
        productsAPI:  ProductsAPI(),
        userApi: UserApi(token),
        categoriesApi: CategoriesApi(),
        winSizeApi: WinSizeApi(),
        bannerApi: BannerApi(),
        nightModeApi: NightModeApi(),
    }


    return (
        <GlobalState.Provider value={state}>
            { children }
        </GlobalState.Provider>
    )
} 