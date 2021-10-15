import React , { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import BtnRender from '../utils/productItem/BtnRender';
import ProductItem from '../utils/productItem/ProductItem';

const DetailProduct = () => {
    const params = useParams();
    const state = useContext(GlobalState);
    // Night Mode Api
    const [night] = state.nightModeApi.nightMode;
    // Products APi
    const [products] = state.productsAPI.products;
    // Category api 
    const [categories] = state.categoriesApi.categories;
    // callback 
    const [callback, setCallback] = state.productsAPI.callback;
    const [category, setCategory] = useState("");
    const [detailProduct, setDetailProduct] = useState([]);

    useEffect(() => {
        if(params.id){
            products.forEach(product => {
                if(product._id === params.id) setDetailProduct(product)
            });
            
            const filterCat = categories.filter((item) => item._id === detailProduct.category);

            setCategory(filterCat[0]?.name)
            setCallback(!callback)
        }
    },[params.id, products])


    if(detailProduct.length === 0) return null;

    return (
        <>
         
        <div className={`modal-content border-0 ${  night && 'bgNight' }`}>
            <div className="modal-body">
                <div className="row mt-2">
                <div className={`col-md-6 py-3 ${  night && 'bgNightCard mb-5' }`}>
                    <div className={`card border-0 shadow-sm ${ night && 'bgNightCard' }`}>
                        <div className="card-body">
                            <div className="text-center detail "> 
                                <img id="main-image" src={detailProduct.images.url} className="img-fluid product_img" />                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 border-left px-5">
                    <div className={`product_right ${ night && 'nightColor nightText-14'}`}>
                        <h4 className="font-weight-bold text-dark">{detailProduct.title}</h4>
                        <h6 className={`${ night ? 'text-white' : 'text-dark' }`}>#id: {detailProduct.product_id}</h6>
                        <p className="lead text-dark">{detailProduct.description}</p>
                        <p className="h6 text-dark">{detailProduct.content}</p>
                        <div className="quick-view mb-5 pt-5">
                            { category && <span>{category}</span> }
                            <span>Sold: {detailProduct.sold}</span>
                        </div>
                            <BtnRender product={detailProduct} params={params.id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div className={`col-sm-12 col-md-8 col-lg-10 bg-light pt-4 mx-auto ${ night && 'bgNight'}`}>
            <div className="container">
                <div className="row">
                    {/* {  <h2>Related Products</h2> }  */}
                    { products && products.map(product => {
                        return product.category === detailProduct.category && product._id !== params.id
                        ? <ProductItem key={product._id} product={product}/> : null 
                    })}
                </div>
            </div>
        </div>
        </>
    )
}

export default DetailProduct
