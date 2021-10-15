import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react'
import { GlobalState } from '../../../GlobalState';
import DashboardLinks from './DashboardLinks';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useHistory, useParams} from "react-router-dom"
import Loading from '../utils/loading/Loading';

// state for products
const initialState = {
    product_id: '',
    title: '',
    price: 0,
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing.',
    content: ' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic odit odio quaerat consequatur nostrum expedita.',
    category: '',
    _id: ''
}

// State for banner
const initialStateBanner = {
    banner_id: '',
    _id: ''
}

const CreateProduct = () => {

    //Global state
    const state = useContext(GlobalState);
    // Night Mode Api
    const [night] = state.nightModeApi.nightMode;
    // Token
    const [token] = state.token;
    // Admin 
    const [isAdmin] = state.userApi.isAdmin;
    // History hook
    const history = useHistory();
    // Params hook
    const param = useParams();
    // product state
    const [product, setProduct] = useState(initialState)
    // Banner state
    const [bannerId, setBannerId] = useState(initialStateBanner)
    // Getting products form global store
    const [products] = state.productsAPI.products
    // Getting banners form global store
    const [banners] = state.bannerApi.banners
    // Getting categories form global store
    const [categories] = state.categoriesApi.categories;
    // Callback
    const [callback, setCallback] = state.productsAPI.callback
    // Callback banners
    const[bannerCallBack, setBannerCallBack] = state.bannerApi.bannerCallBack
    
    // Boolean states
    const [images, setImages] = useState(false);
    const [banner, setBanner] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingBanner, setLoadingBanner] = useState(false);
    const [onEdit, setOnEdit] = useState(false);

    // image css 
    const styleUpload = {
        display: images ? "block" : "none"
    }
    const styleUploadBanner = {
        display: banner ? "block" : "none"
    }

    // Edit Product
    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            products.forEach(product => {
                if(product._id === param.id){
                    setProduct(product);
                    setImages(product.images);
                }
            });
        }else{
            setOnEdit(false);
            setProduct(initialState);
            setImages(false);
        }
    },[param.id, products])

    // Upload product image
    const handleUpload = async (e) => {
        e.preventDefault();

        try {
            // Check if user is admin
            if(!isAdmin) return  toast.error("Your Not An Admin..");
            // Get the file which is first one
            const file = e.target.files[0];
            // check if there is file or not
            if(!file) return toast.error("Please Select a file to upload.");
           
            // check if file is too large 
            if(file.size > 1024 * 1024) 
                return toast.error("File is Too large it should be less then 1mb..");
            // check if format jpg or png
            if(file.type !== "image/jpeg" && file.type !== "image/png")
                return toast.error("invalid file its should be jpg/png format.");
            // Append uploaded file information info global object 
            let formData = new FormData();
            formData.append("file", file);

            setLoading(true)

            const res = await axios.post("/api/upload", formData, {
                headers: { 'content-type' : 'multipart/form-data', Authorization: token }
            })

            setLoading(false)
            setImages(res.data);
            toast.error(res.data.msg);
        } catch (err) {
            return toast.error(err.response.data.msg);
        }
    }

    // Delete uploaded image
    const handleDestroy = async () => {
        try {
            // check admin
            if(!isAdmin) return alert("Your not an admin!")
            // show loading 
            setLoading(true);
            // Delete Image
            await axios.post("/api/destroy", { public_id: images.public_id }, {
                headers: {Authorization: token}
            })
            // disable loading
            setLoading(false)
            // set image state back to off
            setImages(false)
        } catch (err) {
            toast.error(err.response.data.msg);
        }
    }

    // Get form fields value
    const handleChangeInput = e => {
        const { name, value } = e.target
        setProduct({...product, [name]:value});
    }
    // Get form fields value
    const handleChangeInputBanner = e => {
        const { name, value } = e.target
        setBannerId({...bannerId, [name]:value});
    }

    // OnSubmit Create Product
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // check if its admin
            if(!isAdmin) return alert("your not an admin!");
            // Check if image selected
            if(!images) return alert("Please upload an image.")
           
            if(onEdit){
                await axios.put(`/api/products/${product._id}`, {...product, images},{
                    headers: {Authorization: token}
                });
            }else{
                await axios.post("/api/products", {...product, images},{
                    headers: {Authorization: token}
                });
            }

            setCallback(!callback);
            setImages(false)
			setProduct(initialState);
            toast.success("Product Successfully Uploaded");
            history.push("/");
        } catch (err) {
            toast.error(err.response.data.msg);
        }
    }

    // OnSubmit Create Banner
    const handleBannerSubmit = async (e) => {
        e.preventDefault();
        try {
            // check if its admin
            if(!isAdmin) return alert("your not an admin!");
            // Check if image selected
            if(!banner) return alert("Please upload an banner.")
           
          
            await axios.post("/api/banner", {...bannerId, banner},{
                headers: {Authorization: token}
            });
            

            setBannerCallBack(!bannerCallBack);
            setBanner(false)
			setBannerId(initialStateBanner);
            toast.success("Banner Successfully Uploaded");
            history.push("/");
        } catch (err) {
            toast.error(err.response.data.msg);
        }
    }

    // Upload banner image
    const handleUploadBanner = async (e) => {
        e.preventDefault();

        try {
            // Check if user is admin
            if(!isAdmin) return  toast.error("Your Not An Admin..");
            // Get the file which is first one
            const file = e.target.files[0];

            // check if there is file or not
            if(!file) return toast.error("Please Select a file to upload.");
            
            // check if file is too large 
            if(file.size > 1024 * 1024) 
                return toast.error("File is Too large it should be less then 1mb..");
            // check if format jpg or png
            if(file.type !== "image/jpeg" && file.type !== "image/png")
                return toast.error("invalid file its should be jpg/png format.");
            // Append uploaded file information info global object 
            let formData = new FormData();
            formData.append("file", file);

            setLoadingBanner(true)

            const res = await axios.post("/api/upload", formData, {
                headers: { 'content-type' : 'multipart/form-data', Authorization: token }
            })

            setLoadingBanner(false)
            setBanner(res.data);
            toast.error(res.data.msg);
        } catch (err) {
            return toast.error(err.response.data.msg);
        }
    }

    // Delete uploaded Banner
    const handleDestroyBanner = async () => {
        try {
            // check admin
            if(!isAdmin) return alert("Your not an admin!")
            // show loading 
            setLoading(true);
            // Delete Image
            await axios.post("/api/destroy", { public_id: banner.public_id }, {
                headers: {Authorization: token}
            })
            // disable loading
            setLoading(false)
            // set image state back to off
            setBanner(false)
        } catch (err) {
            toast.error(err.response.data.msg);
        }
    }


    return (
        <>
        {/* // <!--_______________ CreateProduct _______________--> */}
        <section className="profile">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 mb-5">
                        <DashboardLinks/>
                    </div>

                    <div className="col-md-9">
                        {/* Create Banners */}
                        {
                        !onEdit &&
                        <div className="row mb-5">
                            <form action="" onSubmit={handleBannerSubmit}>
                                <div className="col-md-12 mb-5">
                                    <div className={`upload_banner ${ night && 'bgNightCard nightBorder nightColor' }`}>
                                    <h3>Create Banner</h3>
                                    <input type="file" className={`${ night && 'nightBefore'}`}  name="file" id="file_up" onChange={handleUploadBanner}/>
                                    {
                                        loadingBanner ?
                                        <div id="file_img">
                                            <Loading height={371} width={921}/>
                                        </div>  
                                        :
                                        <div id="file_img" style={styleUploadBanner}>
                                            <img src={ banner ?  banner.url : ''} alt=""/>
                                            <span className="close_icon" onClick={handleDestroyBanner}>X</span>
                                        </div>
                                    }
                                    </div>
                                </div>
                                <div className="col-md-12 m-auto">
                                    <div className="container">
                                        <div className={`form-group mb-3 ${ night && 'nightColor' }`}>
                                            <label className="mb-2" htmlFor="banner_id">Banner ID</label>
                                            <input className={`form-control ${ night && 'bgNightBody nightColor' }`} type="text" name="banner_id" id="banner_id" onChange={handleChangeInputBanner} value={bannerId.banner_id} required/>
                                        </div>
                                        <button type="submit" className="btn btn-success">Upload Banner</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        } 

                        {/* Create Products */}
                        <div className="row mb-5 rounded">
                            <div className="col-md-4 mb-5 ">
                                <div className={`upload ${ night && 'bgNightCard nightBorder'}`}>
                                    <input type="file" className={`${ night && 'nightBefore'}`} name="file" id="file_up" onChange={handleUpload}/>
                                    {
                                        loading ?
                                        <div id="file_img">
                                            <Loading height={498} width={289}/>
                                        </div>
                                        :
                                         <div id="file_img" style={styleUpload}>
                                            <img src={ images ?  images.url : ''} alt=""/>
                                            <span className="close_icon" onClick={handleDestroy}>X</span>
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className="col-md-8">
                                <div className={`card ${night && 'bgNightCard nightColor'}`}>
                                    <div className="card-body">
                                        <div id="profile">
                                            <div className="profile_setting">
                                                <form action="" onSubmit={handleSubmit}>
                                                    <div className="row">
                                                        <h4 className="my-3 w-100 pl-3">Create Products</h4>
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-3">
                                                                <label className="mb-2" htmlFor="product_id">Product ID</label>
                                                                <input className={`form-control ${ night && 'bgNightBody nightColor' }`} type="text" name="product_id" id="product_id" onChange={handleChangeInput} disabled={onEdit} value={product.product_id} required/>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-3">
                                                                <label className="mb-2" htmlFor="price">Title</label>
                                                                <input className={`form-control ${ night && 'bgNightBody nightColor' }`} type="text" name="title" id="title" onChange={handleChangeInput} value={product.title} required/>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-3">
                                                                <label className="mb-2" htmlFor="price">Price</label>
                                                                <input className={`form-control ${ night && 'bgNightBody nightColor' }`} type="number" name="price" id="price" onChange={handleChangeInput} value={product.price} required/>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-3">
                                                                <label className="mb-2" htmlFor="description">Description</label>
                                                                <textarea rows="5" className={`form-control ${ night && 'bgNightBody nightColor' }`} type="text" name="description" id="description" onChange={handleChangeInput} value={product.description} required/>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-3">
                                                                <label className="mb-2" htmlFor="content">Content</label>
                                                                <textarea rows="7" className={`form-control ${ night && 'bgNightBody nightColor' }`} type="text" name="content" id="content" onChange={handleChangeInput} value={product.content} required/>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group mb-3">
                                                                <label className="mb-2" htmlFor="category">Categories:</label>
                                                                <select className={`form-select ${ night && 'bgNightBody nightColor'}`} name="category" onChange={handleChangeInput} value={product.category}>
                                                                    <option value="">Please select a category</option>
                                                                    {
                                                                        categories.map(category => (
                                                                            <option value={category._id} key={category._id}>
                                                                                {category.name}
                                                                            </option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <button className="btn btn-success btn-lg text-white" type="submit">{onEdit ? "Update" : "Create"}</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>                                              
                    </div>
                </div>
            </div>
        </section>
         </>                                       
    )
}

export default CreateProduct
