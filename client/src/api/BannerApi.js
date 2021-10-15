import axios from 'axios';
import React, { useEffect, useState } from 'react'

const BannerApi = () => {

     // get Banner
  const [banners, setBanners] = useState([]);
  // Callback
  const [bannerCallBack, setBannerCallBack] = useState(false);

    // Get Banner from mdb
    useEffect(() => {
    // get products from mongodb
        const getBanner = async () => {
        const res = await axios.get('/api/banner');
        setBanners(res.data);
        };

        getBanner();
    }, [bannerCallBack]);

    return {
        banners: [banners, setBanners], 
        bannerCallBack: [bannerCallBack, setBannerCallBack], 
      };
}

export default BannerApi
