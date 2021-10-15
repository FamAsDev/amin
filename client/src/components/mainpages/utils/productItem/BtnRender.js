import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import CurrencyFormat from 'react-currency-format'
import { GlobalState } from '../../../../GlobalState';

const BtnRender = ({product, deleteProduct, params}) => {

    //Global state
    const state = useContext(GlobalState);
    // Night Mode Api
    const [night] = state.nightModeApi.nightMode;

    const [isAdmin, setIsAdmin] = state.userApi.isAdmin;
    const addCart = state.userApi.addCart

    return (
        <div className="product-meta">
            { isAdmin ?
                <>
                   <button className={`cart-button ${ night && 'nightText-2 bgNightBody'}`}>
                        <Link to="/" onClick={() => deleteProduct(product._id  ,product.images.public_id)}>
                            Delete
                        </Link>
                    </button>
                    <button className={`cart-button ${ night && 'nightText-2 bgNightBody'}`}>
                        <Link to={`/edit_product/${product._id}`}>
                            Edit
                        </Link>
                    </button>
                </>
                :
                <>
                    <div className="productPriceWrapper">
                        <span className={`product-price ${params && 'priceDetail rupeesTag p-2 bg-success'} ${night && 'nightColor'}`}>
                            <CurrencyFormat
                                renderText={(value) => (
                                    <>
                                        { value }
                                    </>
                                )}
                                decimalScale={2}
                                value={product.price}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"Rs "}
                            />
                        </span>
                    </div>
                   
                    <button className={`cart-button ${ night && ' bgNightBody nightColor nightText-2'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14.4px" height="12px" viewBox="0 0 14.4 12" fill="currentColor" className="box__Box-sc-5533u7-0 vfnVS"><g data-name="Group 120" transform="translate(-288 -413.89)"><path data-name="Path 154" fill="currentColor" d="M298.7,418.289l-2.906-4.148a.835.835,0,0,0-.528-.251.607.607,0,0,0-.529.251l-2.905,4.148h-3.17a.609.609,0,0,0-.661.625v.191l1.651,5.84a1.336,1.336,0,0,0,1.255.945h8.588a1.261,1.261,0,0,0,1.254-.945l1.651-5.84v-.191a.609.609,0,0,0-.661-.625Zm-5.419,0,1.984-2.767,1.98,2.767Zm1.984,5.024a1.258,1.258,0,1,1,1.319-1.258,1.3,1.3,0,0,1-1.319,1.258Zm0,0"></path></g></svg>
                        <Link to="/" onClick={ () => addCart(product)}>
                            Cart
                        </Link>
                    </button>
                </> 
            }
        </div>
    )
}

export default BtnRender
