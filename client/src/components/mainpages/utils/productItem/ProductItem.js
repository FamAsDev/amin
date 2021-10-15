import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState';
import BtnRender from './BtnRender'

const ProductItem = ({product, isAdmin, deleteProduct, handleCheck}) => {

    //Global state
    const state = useContext(GlobalState);
    // Night Mode Api
    const [night] = state.nightModeApi.nightMode;

    return (
        // <!-- product_item -->
        <div className="col_styl col-6 col-sm-6 col-md-6 col-lg-3 mb-4 product__cards">
          <div className={`product_card card shadow-sm ${ night && 'bgNightCard nightBorder'}`}>
            { isAdmin && <input 
                            type="checkbox" 
                            checked={product.checked}
                            onChange={() => handleCheck(product._id)}
                        /> }
            <Link className="m-auto" to={`/detail/${product._id}`}>
                <img className="img-fluid" src={product.images.url} alt="Card image cap"/>
            </Link> 
            <div className="card-body">
                <Link to={`/detail/${product._id}`}>
                    <h3 title={product.title} className={`product-title ${ night && 'nightColor'}`}>{product.title}</h3>
                </Link>
                <BtnRender product={product} deleteProduct={deleteProduct}/>
            </div>
          </div>
        </div>
    )
}

export default ProductItem
