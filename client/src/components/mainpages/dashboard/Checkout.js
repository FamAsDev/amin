import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../../GlobalState';
import CurrencyFormat from 'react-currency-format'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardLinks from './DashboardLinks'
import Cash from "./credit/cash.jpg"
import Slider  from "react-slick"
import axios from "axios"
import { Link } from 'react-router-dom';

const Checkout = () => {

    //Global state
    const state = useContext(GlobalState);
    // Night Mode Api
    const [night] = state.nightModeApi.nightMode;

    // User Info
    const [isLogged] = state.userApi.isLogged
    const [user] = state.userApi.User
    const [token] = state.token;

    // Cart 
    const [cart, setCart] = state.userApi.cart

    // total
    const [total, setTotal]= useState(0)
    const address = user.address
    const phone = user.phone

    // state payment
    const [paymentMethod, setPaymentMethod] = useState("")
    
    // Make a cart empty after order
    const addToCart = async (cart) => {
        await axios.patch("/user/addcart", {cart}, {
            headers: {authorization: token}
        })
    }

    // placing order
    const handlePayments = async () => {
      
        if (!isLogged) return alert("please login to continue buying.");
      
        await axios.post("/api/payment", {cart , total, address, phone, paymentMethod}, {
            headers: { Authorization: token }
        });
    
        setCart([])
        addToCart([]);
        
        toast.success("You have successfully placed an order!! Thank You..")      
        setTimeout(() => {
            window.location.href = "/order-received"
        },3000)
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
  
    let carousel = {
        dots: true,
        infinite: true,
        next: true,
        autoPlay: true,
        speed: 500,
        slidesToShow: 1 ,
        slidesToScroll: 1,
      };

    return (
        // <!--_______________ Checkout _______________-->
        <section className="checkout profile">
            <div className="container-fluid">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="row">
                        <div className="col-md-3">
                           <DashboardLinks/>
                        </div>

                        <div className="col-md-6">
                            
                            {/* <!-- Delivery Address --> */}
                            <div className={`card checkout_card ${ night && 'bgNightCard nightColor' }`}>
                                <div className={`card-header bg-white border-0 ${ night && 'bgNightCard nightText-8' }`}>
                                    <div className="d-flex">
                                        <h3 className="card_header_title">Delivery Address</h3>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <label htmlFor="myCheck_1 ">
                                                <div className={`address_card ${ night && 'bgNightBody'}`}>
                                                    <button className="address_card_btn">
                                                         <svg xmlns="http://www.w3.org/2000/svg" width="10.003" height="10" viewBox="0 0 10.003 10"><path data-name="_ionicons_svg_ios-close (5)" d="M166.686,165.55l3.573-3.573a.837.837,0,0,0-1.184-1.184l-3.573,3.573-3.573-3.573a.837.837,0,1,0-1.184,1.184l3.573,3.573-3.573,3.573a.837.837,0,0,0,1.184,1.184l3.573-3.573,3.573,3.573a.837.837,0,0,0,1.184-1.184Z" transform="translate(-160.5 -160.55)" fill="currentColor"></path></svg>
                                                    </button>
                                                    <h4 className={`text-dark ${ night && 'nightColor'}`}>Home</h4>
                                                    <p  className={`${ night ? 'nightColor' : 'text-dark '}`}>{!user.address ?
                                                        <>
                                                         <div className="text-center">
                                                            <div className={`spinner-grow text-success  ${ night && 'nightColor' }`} role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                            <div className={`spinner-grow text-dark  ${ night && 'nightColor'}`} style={{marginLeft: '10px'}} role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        </div>
                                                        </>
                                                        :
                                                        user.address
                                                    }</p>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        
                            {/* <!-- Contact Number --> */}
                            <div className={`card checkout_card contact_number ${ night && 'bgNightCard nightColor' }`}>
                                <div className={`card-header bg-white border-0 ${ night && 'bgNightCard nightText-8' }`}>
                                    <div className="d-flex">
                                        <h3 className="card_header_title">Contact Number</h3>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <label htmlFor="myCheck_9">
                                                <div className={`address_card ${ night && 'bgNightBody nightColor'}`}>
                                                    <button className="address_card_btn">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="10.003" height="10" viewBox="0 0 10.003 10"><path data-name="_ionicons_svg_ios-close (5)" d="M166.686,165.55l3.573-3.573a.837.837,0,0,0-1.184-1.184l-3.573,3.573-3.573-3.573a.837.837,0,1,0-1.184,1.184l3.573,3.573-3.573,3.573a.837.837,0,0,0,1.184,1.184l3.573-3.573,3.573,3.573a.837.837,0,0,0,1.184-1.184Z" transform="translate(-160.5 -160.55)" fill="currentColor"></path></svg>
                                                    </button>
                                                    <h4 className={`${ night && 'nightColor'}`}>Primary</h4>
                                                    <p className={`${ night ? 'nightColor' : 'text-dark '}`}>{!user.phone ?
                                                        <>
                                                         <div className="text-center">
                                                            <div className={`spinner-grow text-success ${ night && 'nightColor' }`} role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                            <div className={`spinner-grow text-dark  ${ night && 'nightColor' }`} style={{marginLeft: '10px'}} role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        </div>
                                                        </>
                                                        :
                                                        user.phone
                                                    }</p>
                                                </div>
                                            </label>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Payment Option --> */}
                            <div className={`card checkout_card payment_option ${ night && 'bgNightCard' }`}>
                                <div className={`card-header bg-white border-0 ${ night && 'bgNightCard nightText-8' }`}>
                                    <div className="d-flex">
                                        <h3 className="card_header_title">Payment Option</h3>
                                        <a href="" className="add_address" data-bs-toggle="modal" data-bs-target="#payment_option">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="12px" viewBox="0 0 12 12"><g id="Group_3351" data-name="Group 3351" transform="translate(-1367 -190)"><rect data-name="Rectangle 520" width="12" height="2" rx="1" transform="translate(1367 195)" fill="currentColor"></rect><rect data-name="Rectangle 521" width="12" height="2" rx="1" transform="translate(1374 190) rotate(90)" fill="currentColor"></rect></g></svg>
                                            Add Card
                                        </a>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <Slider {...carousel} className="mb-5">
                                         <div className="item shadow-lg">
                                            <label htmlFor="myCheck_11">
                                                <div className={`address_card payment__card ${ night && 'bgNightCard nightText-10 nightText-5' }`}>
                                                    <button className="address_card_btn">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="10.003" height="10" viewBox="0 0 10.003 10"><path data-name="_ionicons_svg_ios-close (5)" d="M166.686,165.55l3.573-3.573a.837.837,0,0,0-1.184-1.184l-3.573,3.573-3.573-3.573a.837.837,0,1,0-1.184,1.184l3.573,3.573-3.573,3.573a.837.837,0,0,0,1.184,1.184l3.573-3.573,3.573,3.573a.837.837,0,0,0,1.184-1.184Z" transform="translate(-160.5 -160.55)" fill="currentColor"></path></svg>
                                                    </button>
                                                        <input type="radio" id="myCheck" name="test" value="cash on delivery" onChange={e => setPaymentMethod(e.target.value)}  required/>
                                                    <img src={Cash} className=" mb-3 cash_delivery img-fluid" alt=""/>
                                                
                                                    <span className="payment_card_style_name">{user.name}</span>
                                                    <span className="payment_card_style_name">{user.email}</span>

                                                    <p className={ night ? 'text-white' : 'text-dark' }>Soon The Goods Will Be Delivered At Your Place.</p>
                                                </div>
                                            </label>
                                        </div>
                                    </Slider>

                                    <div className="coupon">
                                                    
                                        <div className="collapse pt-4" id="collapseExample">
                                            <div className="d-flex">
                                                <input placeholder="Enter voucher code here" className="form-control w-50 mr-3" value=""/>
                                                <button type="button" className="btn btn-success">Apply</button>
                                            </div>
                                        </div>
                                    </div>
                                    <p className={`my-3 ${ night ? 'text-white' : 'text-dark'  }`}>By making this purchase you agree to our
                                        <Link to="/privacy-policy" className="text-success fw-bolder">&nbsp;terms and conditions.</Link>
                                    </p>
                                    {
                                        !cart.length
                                        ?
                                        <button type="submit" className="btn btn-success btn-block">
                                            <div className="text-center">
                                                <div className="spinner-grow text-white" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                                <div className="spinner-grow text-white" style={{marginLeft: '10px'}} role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </div>
                                        </button>
                                        :
                                        <button type="submit" onClick={handlePayments} className="btn btn-success btn-block">Proceed to Checkout</button>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className={`checkout_sidebar p-4 ${ night && 'nightColor' }`}>
                                <h6 className={`text-center font-weight-bold ${ night ? 'text-white' : 'text-dark'  }`}>Your Order</h6>
                                <div className="checkout_amount">
                                    <table className="table table-responsive border-bottom">

                                        { cart && cart.map(product => (
                                            <tr key={product._id} className={`${ night && 'nightColor'}`}>
                                                <td className="w-15">{product.quantity} x</td>
                                                <td>{product.title}</td>
                                                <td>
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
                                                </td>
                                            </tr>
                                        ))
                                        }

                                        {!cart.length && 

                                            <div className="text-center text-uppercase">
                                                <h4 className="text-success fw-bold">Please Add To Cart To</h4>
                                                <h4 className={ night ? 'text-white' : 'text-dark' }>Continue Shopping.</h4>
                                            </div>

                                        }
                                
                                    </table>

                                    <p className={`checkout_style fw-bold ${ night ? 'text-white' : 'text-dark'  } `}>
                                        <span>Total</span>
                                        <span>
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
                                    </p>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Checkout
