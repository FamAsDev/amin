import React, { useContext, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import axios from "axios";
import ProductItem from '../utils/productItem/ProductItem';
import { toast } from 'react-toastify';
import Loading from "../utils/loading/Loading"
import Slider  from "react-slick"
import Filters from './Filters';
import Banner from '../banner/Banner';
import LoadMore from './LoadMore';
import BannerDeleteBtn from './BannerDeleteBtn';

const Products = () => {

    //Global state
    const state = useContext(GlobalState);
    // Night Mode Api
    const [night] = state.nightModeApi.nightMode;
    // admin
    const [isAdmin] = state.userApi.isAdmin;
    // Token
    const [token] = state.token;
    // All Products
    const [products, setProducts] = state.productsAPI.products
    // Banners
    const [banners] = state.bannerApi.banners
    // Window size 
    const [ WinWidth ] = state.winSizeApi.winSize
    // Sort
    const [sort, setSort] = state.productsAPI.sort
    // Search
    const [search, setSearch] = state.productsAPI.search
    // callback products
    const [callback, setCallback] = state.productsAPI.callback
    // callback banners
    const[bannerCallBack, setBannerCallBack] = state.bannerApi.bannerCallBack
    // check ! check products
    const [isCheck, setIsCheck] = useState(false);

    const handleCheck = (id) => {
      products.forEach(product => {
          if(product._id === id) product.checked = !product.checked
      });
      setProducts([...products]);
    }

    // delete product
    const deleteProduct = async (id, public_id) => {
        try {
          const destroyImg = axios.post("/api/destroy", {public_id},{
            headers: {Authorization: token}
          });

          const deleteProduct = axios.delete(`/api/products/${id}`, {
            headers: {Authorization: token}
          });

          await destroyImg
          await deleteProduct
          setCallback(!callback);
          toast.success("Product Delete Successfully!");
          window.location.href = "/"
        } catch (err) {
            alert(err.response.data.msg);
        }
    }

    // delete banner
    const deleteBanner = async (id, public_id) => {
        try {
          const destroyImg = axios.post("/api/destroy", {public_id},{
            headers: {Authorization: token}
          });

          const deleteBanner = axios.delete(`/api/banner/${id}`, {
            headers: {Authorization: token}
          });

          await destroyImg
          await deleteBanner
          setBannerCallBack(!bannerCallBack);
          toast.success("Banner Delete Successfully!");
          window.location.href = "/"
        } catch (err) {
            alert(err.response.data.msg);
        }
    }

    // Check All products
    const checkAll = () => {
      products.forEach(product => {
           product.checked = !isCheck
      });
      setProducts([...products]);
      setIsCheck(!isCheck);
    }

    // Delete ALl
    const deleteAll = () => {
      products.forEach(product => {
          if(product.checked) deleteProduct(product._id, product.images.public_id)
      });
    }

    let settings = {
      dots: true,
      infinite: true,
      next: true,
      autoPlay: true,
      speed: 500,
      slidesToShow: WinWidth < 992 ? 1 : banners?.length < 2 ? 1 : 2 ,
      slidesToScroll: 1,
    };

    return (
        // _______________ Product _______________
        <section id="products_section" className="p-0">
           
            <div className="container-fluid">
              {/* Filter */}
                <div className="d-grid gap-2">
                    <button type="button" className={` ${ night && 'bgNightCard nightColor ' } btn btn-light btn-block border rounded-pill shadow-sm mb-1 d-md-none filter`} data-bs-toggle="modal" data-bs-target="#bottom_modal">
                     Filter
                    <i className="fa fa-filter pl-2"></i>
                    </button>
                </div>

                {/* responsive nav */}
                <div className="modal bottom fade" id="bottom_modal" tabIndex="-1" role="dialog" aria-labelledby="bottom_modal">
                  <div className="modal-dialog" role="document">
                    <div className={`modal-content ${ night && 'bgNightCard' }`}>
                      <button type="button" className="menu_close" data-bs-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10.003" height="10" viewBox="0 0 10.003 10" style={{ width: '12px', height: '12px'}}><path data-name="_ionicons_svg_ios-close (5)" d="M166.686,165.55l3.573-3.573a.837.837,0,0,0-1.184-1.184l-3.573,3.573-3.573-3.573a.837.837,0,1,0-1.184,1.184l3.573,3.573-3.573,3.573a.837.837,0,0,0,1.184,1.184l3.573-3.573,3.573,3.573a.837.837,0,0,0,1.184-1.184Z" transform="translate(-160.5 -160.55)" fill="currentColor"></path></svg>
                          </span>
                        </button>
                        <div className="modal-body pl-5 text-center">
                            <Filters/>
                        </div>
                    </div>
                  </div>
                </div>
              
                <div className="row">

                  {/* product_menu  */}
                    <div className="col-sm-12 col-md-3 col-lg-2 p-0 ">
                        <div className={`sidebar ${ night && 'bgNight'}`}>
                          <Filters/>
                        </div>
                    </div>

                    {/* Start product_list  */}
                    <div className="col-sm-12 col-md-9 col-lg-10 pt-4">
                      <Banner/>

                      {/*Slick Carousel */}
                      {
                        banners.length ?
                        <Slider {...settings} className="mb-5 text-center">
                          {
                            banners.map(item => (
                              <div key={item._id} className={`slick__item ${ night && 'nightBorders'} ${ banners?.length < 2 && 'fullBanner'}`}><img className="img-fluid" src={item.banner.url} alt=""/>
                               { isAdmin && <BannerDeleteBtn item={item} deleteBanner={deleteBanner}/>}
                              </div>
                            ))
                          }
                      </Slider>
                      :
                      <Slider {...settings} className="mb-5">
                          {
                            banners?.length < 2 && <div><Loading width={1100} height={282}/></div>
                          }
                      </Slider>
                      }

                      <div className="container">
                        <div className="row">
                            <div className={`card bg-white pb-4 border-0 shadow-sm ${ night && 'bgNightCard nightColor'} ${products.length && 'mb-5'}`}>
                              <form className={`responsive_menu_search ${ night && 'bgNightBody nightBorder'}`}>
                                  <svg className={ night && 'nightColor'} xmlns="http://www.w3.org/2000/svg" width="17px" height="18px" viewBox="0 0 17.048 18" style={{marginLeft:'16px', marginRight:'16px',color:'#212121'}}><path id="Path_142" data-name="Path 142" d="M380.321,383.992l3.225,3.218c.167.167.341.329.5.506a.894.894,0,1,1-1.286,1.238c-1.087-1.067-2.179-2.131-3.227-3.236a.924.924,0,0,0-1.325-.222,7.509,7.509,0,1,1-3.3-14.207,7.532,7.532,0,0,1,6,11.936C380.736,383.462,380.552,383.685,380.321,383.992Zm-5.537.521a5.707,5.707,0,1,0-5.675-5.72A5.675,5.675,0,0,0,374.784,384.513Z" transform="translate(-367.297 -371.285)" fill="currentColor"></path></svg>
                                  <input 
                                    type="search" value={search} 
                                    name="search" 
                                    placeholder="Search your products from here" 
                                    className={`responsive_menu_search_input ${night && 'bgNightBody'}`}
                                    onChange={(e) => setSearch(e.target.value.toLowerCase())}
                                  />
                              </form>
                            
                                <strong className="sort mb-2">&nbsp;&nbsp;Sort By:</strong>
                                <select className={`form-select ${ night && 'bgNightBody nightColor nightBorder-2'}`} name="sort" value={sort} onChange={e => setSort(e.target.value)}>
                                    <option value="">Newest</option>
                                    <option value="sort=oldest">Oldest</option>
                                    <option value="sort=-sold">Best Sales</option>
                                    <option value="sort=-price">Price: High-Low</option>
                                    <option value="sort=price">Price: Low-High</option>
                                </select>
                            </div>
                              {
                                isAdmin && 
                                <div className="delete-all">
                                    <span>Select All</span>
                                    <input 
                                      type="checkbox" 
                                      checked={isCheck}
                                      onChange={checkAll}
                                    />
                                    <button onClick={deleteAll} className="btn btn-success btn-lg text-white">Delete All</button>
                                </div>
                              }
                              {products && products.map(product => {
                                  return <ProductItem 
                                            key={product._id} 
                                            product={product} 
                                            isAdmin={isAdmin}
                                            deleteProduct={deleteProduct}
                                            handleCheck={handleCheck}
                                          />
                              })}
                              <LoadMore/>
                            </div>
                            <div className="skeleton_cards mb-5">
                              {!products.length && [0,1,2,3,4,5,6,7,8,9].map((i) => <Loading key={i}  height={300} width={220}  margin={10}/>)}
                            </div>
                        </div>
                    </div>   
                    {/* End product_list  */}               
                </div>
            </div>
        </section>
    )
}

export default Products
