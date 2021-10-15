import React, {useContext, useEffect, useState} from 'react'
import { GlobalState } from '../../../GlobalState';
import {Link} from "react-router-dom"
import CurrencyFormat from 'react-currency-format'
import axios from "axios"

const Cart = () => {
    // Global state
    const state = useContext(GlobalState);
    // Night Mode Api
    const [night] = state.nightModeApi.nightMode;

    //token
    const [token] = state.token 
    // admin
    const [isAdmin] = state.userApi.isAdmin;
    const [isLogged] = state.userApi.isLogged;

    // sidebar cart
    const [ openCart , setOpenCart ] = useState(false)

    // Cart 
    const [cart, setCart] = state.userApi.cart

    // total
    const [total, setTotal]= useState(0)


    // update cart in user profile
    const addToCart = async () => {
      await axios.patch("/user/addcart", {cart}, {
          headers: { authorization: token }
      })
    }

    // Get total
    useEffect(() => {
      const getTotal = () => {
        const total = cart.reduce((prev, item) => {
          return prev + (item.price * item.quantity)
        },0)

        setTotal(total)
      }

      getTotal()
    }, [cart])

    // increment
    const increment = (id) => {
      cart.forEach(item => {
          if(item._id === id){
              // item.quantity += 1
              item.quantity === 9 ? item.quantity = 9 : item.quantity += 1
          }
      });

      setCart([...cart])
      addToCart()
  }
    // decrement
    const decrement = (id) => {
      cart.forEach(item => {
          if(item._id === id){
              // item.quantity += 1
              item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
          }
      });

      setCart([...cart])
      addToCart()
  }

  const removeCart = (id) => {
    cart.forEach((item, index) => {
        if(item._id === id){
          cart.splice(index, 1);
        }
    });

    setCart([...cart])
    addToCart()
  }

    return (
        <>
        {/* <!-- item fixed --> */}
            {  !isAdmin &&   
              <button className={`openbtn ${ night && 'bgNightCard'}`} onClick={ () => setOpenCart(true) }>
                  <span className="cart-popupstyle">
                      <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12.686" height="16" viewBox="0 0 12.686 16"><g data-name="Group 2704" transform="translate(-27.023 -2)"><g data-name="Group 17" transform="translate(27.023 5.156)"><g data-name="Group 16"><path data-name="Path 3" d="M65.7,111.043l-.714-9A1.125,1.125,0,0,0,63.871,101H62.459V103.1a.469.469,0,1,1-.937,0V101H57.211V103.1a.469.469,0,1,1-.937,0V101H54.862a1.125,1.125,0,0,0-1.117,1.033l-.715,9.006a2.605,2.605,0,0,0,2.6,2.8H63.1a2.605,2.605,0,0,0,2.6-2.806Zm-4.224-4.585-2.424,2.424a.468.468,0,0,1-.663,0l-1.136-1.136a.469.469,0,0,1,.663-.663l.8.8,2.092-2.092a.469.469,0,1,1,.663.663Z" transform="translate(-53.023 -101.005)" fill="currentColor"></path></g></g><g data-name="Group 19" transform="translate(30.274 2)"><g data-name="Group 18"><path data-name="Path 4" d="M160.132,0a3.1,3.1,0,0,0-3.093,3.093v.063h.937V3.093a2.155,2.155,0,1,1,4.311,0v.063h.937V3.093A3.1,3.1,0,0,0,160.132,0Z" transform="translate(-157.039)" fill="currentColor"></path></g></g></g></svg>
                      </span>
                      {cart && cart.length} Item
                  </span>
                  <span className="cart_value">
                    <CurrencyFormat
                          renderText={(value) => (
                              <>
                                  { value }
                              </>
                          )}
                          decimalScale={2}
                          value={total}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"Rs "}
                      />
                  </span>
              </button>
            }

            {/* <!-- sidebar toggler --> */}
            <div id="mySidebar" className={`sidebar_toggler ${ night && 'bgNightCard'} ${ openCart === true && 'sidebar_togglerShow' }`}>
              <div className={`sidebar_cart ${ night && 'bgNightCard nightBorder'}`}>
                <div className={`cart_count ${ night && 'nightColor'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="19px" height="24px" viewBox="0 0 23.786 30"><g data-name="shopping-bag (3)" transform="translate(-53.023)"><g data-name="Group 2704"><g data-name="Group 17" transform="translate(53.023 5.918)"><g data-name="Group 16"><path data-name="Path 3" d="M76.8,119.826l-1.34-16.881A2.109,2.109,0,0,0,73.362,101H70.716v3.921a.879.879,0,1,1-1.757,0V101H60.875v3.921a.879.879,0,1,1-1.757,0V101H56.472a2.109,2.109,0,0,0-2.094,1.937l-1.34,16.886a4.885,4.885,0,0,0,4.87,5.259H71.926a4.884,4.884,0,0,0,4.87-5.261Zm-7.92-8.6-4.544,4.544a.878.878,0,0,1-1.243,0l-2.13-2.13A.878.878,0,0,1,62.2,112.4l1.509,1.508,3.923-3.923a.879.879,0,1,1,1.242,1.243Z" transform="translate(-53.023 -101.005)" fill="currentColor"></path></g></g><g data-name="Group 19" transform="translate(59.118)"><g data-name="Group 18"><path data-name="Path 4" d="M162.838,0a5.806,5.806,0,0,0-5.8,5.8v.119H158.8V5.8a4.042,4.042,0,1,1,8.083,0v.119h1.757V5.8A5.806,5.806,0,0,0,162.838,0Z" transform="translate(-157.039)" fill="currentColor"></path></g></g></g></g></svg>
                  <span className={`${ night && 'nightColor'}`}>{cart && cart.length}&nbsp;Items</span>
                </div>
                <a href="javascript:void(0)" className={`closebtn ${ night && 'nightColor' }`}  onClick={ () => setOpenCart(false) }>
                  <svg xmlns="http://www.w3.org/2000/svg" width="10.003" height="10" viewBox="0 0 10.003 10"><path data-name="_ionicons_svg_ios-close (5)" d="M166.686,165.55l3.573-3.573a.837.837,0,0,0-1.184-1.184l-3.573,3.573-3.573-3.573a.837.837,0,1,0-1.184,1.184l3.573,3.573-3.573,3.573a.837.837,0,0,0,1.184,1.184l3.573-3.573,3.573,3.573a.837.837,0,0,0,1.184-1.184Z" transform="translate(-160.5 -160.55)" fill="currentColor"></path></svg>
                </a>
            </div>

            {/* <!-- shipping body --> */}
            <div className={`sidebar_cart_body ${ night && 'bgNightBody'}`}>

              {/* <!-- Item Add --> */}
              {
                cart.length !== 0

                ?
                <>
                  <div className="shopping_add">
                    {/* <!-- Product #1 --> */}
                    { cart && cart.map(product => (
                        <div className="shopping_item" key={product._id}>
                          {/* <!-- qty --> */}
                          <div className="shopping_item_quantity">
                            <button  onClick={() => decrement(product._id)} className=" shopping_item_quantity_btn minus-btn" type="button" name="button">
                              <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="2px" viewBox="0 0 12 2"><rect data-name="Rectangle 522" width="12" height="2" rx="1" fill="currentColor"></rect></svg>
                              </button>
                            <input type="text" name="name" value={product.quantity} readonly />
                            <button onClick={() => increment(product._id)} className="shopping_item_quantity_btn plus-btn" type="button" name="button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12px" height="12px" viewBox="0 0 12 12"><g id="Group_3351" data-name="Group 3351" transform="translate(-1367 -190)"><rect data-name="Rectangle 520" width="12" height="2" rx="1" transform="translate(1367 195)" fill="currentColor"></rect><rect data-name="Rectangle 521" width="12" height="2" rx="1" transform="translate(1374 190) rotate(90)" fill="currentColor"></rect></g></svg>
                            </button>
                          </div>

                          {/* <!-- img --> */}
                          <div className="shopping_item_image">
                            <img src={product.images.url} className="img-fluid" alt=""/>
                          </div>

                          {/* <!-- title --> */}
                          <div className={`shopping_item_desc ${ night && 'nightText-5' }`}>
                            <span className="shopping_item_title">{product.title}</span>
                            <span className="shopping_item_price">
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

                          {/* <!-- price --> */}
                          <span className={`shopping_item_total_price text-dark ${ night && 'nightColor' }`}>
                              <CurrencyFormat
                                  renderText={(value) => (
                                      <>
                                          { value }
                                      </>
                                  )}
                                  decimalScale={2}
                                  value={product.price * product.quantity}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"Rs "}
                              />
                            </span>

                          {/* <!-- remove --> */}
                          <button onClick={() => removeCart(product._id)} className={`shopping_item_remove ${ night && 'nightColor' }`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10.003" height="10" viewBox="0 0 10.003 10"><path data-name="_ionicons_svg_ios-close (5)" d="M166.686,165.55l3.573-3.573a.837.837,0,0,0-1.184-1.184l-3.573,3.573-3.573-3.573a.837.837,0,1,0-1.184,1.184l3.573,3.573-3.573,3.573a.837.837,0,0,0,1.184,1.184l3.573-3.573,3.573,3.573a.837.837,0,0,0,1.184-1.184Z" transform="translate(-160.5 -160.55)" fill="currentColor"></path></svg>
                          </button>
                        </div>
                      ))}

                  </div>
                </>
                :
                <> 
                  {/* <!-- Empty shipping --> */}
                  <div className="shipping_empty text-center">
                    <div className="shipping_bag_img">
                        <svg xmlns="http://www.w3.org/2000/svg" width="231.91" height="292" viewBox="0 0 231.91 292"><defs><linearGradient id="linear-gradient" x1="1" y1="0.439" x2="0.369" y2="1" gradientUnits="objectBoundingBox"><stop offset="0" ></stop><stop offset="1" ></stop></linearGradient></defs><g id="no_cart_in_bag_2" data-name="no cart in bag 2" transform="translate(-1388 -351)"><ellipse id="Ellipse_2873" data-name="Ellipse 2873" cx="115.955" cy="27.366" rx="115.955" ry="27.366" transform="translate(1388 588.268)" fill="#ddd" opacity="0.25"></ellipse><path id="Path_18691" data-name="Path 18691" d="M29.632,0H170.368A29.828,29.828,0,0,1,200,30.021V209.979A29.828,29.828,0,0,1,170.368,240H29.632A29.828,29.828,0,0,1,0,209.979V30.021A29.828,29.828,0,0,1,29.632,0Z" transform="translate(1403 381)" fill="#009e7f"></path><path id="Rectangle_1852" data-name="Rectangle 1852" d="M30,0H170a30,30,0,0,1,30,30v0a30,30,0,0,1-30,30H12.857A12.857,12.857,0,0,1,0,47.143V30A30,30,0,0,1,30,0Z" transform="translate(1403 381)" fill="#006854"></path><path id="Rectangle_1853" data-name="Rectangle 1853" d="M42,0H158a42,42,0,0,1,42,42v0a18,18,0,0,1-18,18H18A18,18,0,0,1,0,42v0A42,42,0,0,1,42,0Z" transform="translate(1403 381)" fill="#006854"></path><path id="Path_18685" data-name="Path 18685" d="M446.31,246.056a30,30,0,1,1,30-30A30.034,30.034,0,0,1,446.31,246.056Zm0-53.294A23.3,23.3,0,1,0,469.9,216.056,23.471,23.471,0,0,0,446.31,192.762Z" transform="translate(1056.69 164.944)" fill="#006854"></path><path id="Path_18686" data-name="Path 18686" d="M446.31,375.181a30,30,0,1,1,30-30A30.034,30.034,0,0,1,446.31,375.181Zm0-53.294A23.3,23.3,0,1,0,469.9,345.181,23.471,23.471,0,0,0,446.31,321.887Z" transform="translate(1057.793 95.684)" fill="#009e7f"></path><circle id="Ellipse_2874" data-name="Ellipse 2874" cx="28.689" cy="28.689" r="28.689" transform="translate(1473.823 511.046)" fill="#006854"></circle><circle id="Ellipse_2875" data-name="Ellipse 2875" cx="15.046" cy="15.046" r="15.046" transform="translate(1481.401 547.854) rotate(-45)" fill="#009e7f"></circle><path id="Path_18687" data-name="Path 18687" d="M399.71,531.27a71.755,71.755,0,0,1,12.65-13.6c3.4-2.863-1.5-7.726-4.882-4.882a78.392,78.392,0,0,0-13.73,15c-2.56,3.644,3.424,7.1,5.962,3.485Z" transform="translate(1060.579 -35.703)" fill="#006854"></path><path id="Path_18688" data-name="Path 18688" d="M412.913,527.786a78.419,78.419,0,0,0-13.73-15c-3.38-2.843-8.289,2.017-4.882,4.882a71.785,71.785,0,0,1,12.65,13.6c2.535,3.609,8.525.162,5.962-3.485Z" transform="translate(1060.566 -35.704)" fill="#006854"></path><path id="Path_18689" data-name="Path 18689" d="M583.278,527.786a78.417,78.417,0,0,0-13.73-15c-3.38-2.843-8.289,2.017-4.882,4.882a71.768,71.768,0,0,1,12.65,13.6c2.535,3.609,8.525.162,5.962-3.485Z" transform="translate(970.304 -35.704)" fill="#006854"></path><path id="Path_18690" data-name="Path 18690" d="M570.075,531.27a71.77,71.77,0,0,1,12.65-13.6c3.4-2.863-1.5-7.726-4.882-4.882a78.407,78.407,0,0,0-13.73,15c-2.56,3.644,3.424,7.1,5.962,3.485Z" transform="translate(970.318 -35.703)" fill="#006854"></path><path id="Path_18692" data-name="Path 18692" d="M301.243,287.464a19.115,19.115,0,0,1,8.071,9.077,19.637,19.637,0,0,1,1.6,7.88v26.085a19.349,19.349,0,0,1-9.672,16.957c-10.048-6.858-16.544-17.742-16.544-30S291.2,294.322,301.243,287.464Z" transform="translate(1292.301 101.536)" fill="url(#linear-gradient)"></path><path id="Path_18693" data-name="Path 18693" d="M294.371,287.464a19.115,19.115,0,0,0-8.071,9.077,19.637,19.637,0,0,0-1.6,7.88v26.085a19.349,19.349,0,0,0,9.672,16.957c10.048-6.858,16.544-17.742,16.544-30S304.419,294.322,294.371,287.464Z" transform="translate(1118.301 101.536)" fill="url(#linear-gradient)"></path></g></svg>
                    </div>
                    <span>No products found</span>
                  </div>
                </>

              }
              </div>

              {/* <!-- shipping footer --> */}
              <div className={`sidebar_cart_footer pt-3 ${ night && 'bgNightCard nightBorder'}`}>
                    <div className="checkout">
                      {/* <span className="promo_code">
                        <button>Do you have a voucher?</button>
                      </span> */}
                      <button className={`checkout_btn ${ night && 'bgNightBody' }`}>
                        <Link to={`${ isLogged ? '/checkout' : '/' }`} className="checkout_title">Checkout</Link>
                        <span className="checkout_price">
                              <CurrencyFormat
                                  renderText={(value) => (
                                      <>
                                          { value }
                                      </>
                                  )}
                                  decimalScale={2}
                                  value={total}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"Rs "}
                              />
                        </span>
                      </button>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default Cart
    