import React, { useContext, useEffect, useState } from 'react'
import CurrencyFormat from "react-currency-format"
import { GlobalState } from '../../../GlobalState';
import DashboardLinks from './DashboardLinks'
import {Link, useParams} from "react-router-dom"
import axios from 'axios';
import Loading from '../utils/loading/Loading';

const History = () => {

    //Global state
    const state = useContext(GlobalState);
    // Night Mode Api
    const [night] = state.nightModeApi.nightMode;
    
    const [history, setHistory] = state.userApi.history
    const params = useParams()
    const [orderDetails, setOrderDetails] = useState([])
    const [isAdmin] = state.userApi.isAdmin
    const [token] = state.token

    useEffect(() => {
        if(token){
            const getHistory = async () => {
                if(isAdmin){
                    const res = await axios.get("/api/payment", {
                        headers: {Authorization: token}
                    })

                    setHistory(res.data)
                }else{
                    const res = await axios.get("/user/history", {
                        headers: {Authorization: token}
                    })

                    setHistory(res.data)
                }
            }

            getHistory();
        }
    },[token, setHistory, isAdmin])

    useEffect(() => {
        if(params.id){
            history.forEach(item =>{
                if(item._id === params.id) setOrderDetails(item)
            })
        }
    },[params.id, history])

    return (
        // <!--_______________ My Order _______________-->
        <section className="my_order profile">
                
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                       <DashboardLinks/>
                    </div>

                    <div className={`col-md-3 border bg-white dashboard mb-5 ${ night && 'bgNightCard nightColor nightBorder' }`}>
                        
                        <h3 className="font-weight-bold text-center">My Order</h3>
                        <div className={`myorder ${ night && 'bgNightCard' }`} id="scroll">
                            {/* <!-- Tabs nav --> */}
                            <div className="nav flex-column nav-pills nav-pills-custom" id="v-pills-tab" role="tablist" aria-orientation="vertical">      
                                { 
                                !history.length
                                ?
                                <div className="myorderSkeleton">
                                    {!history.length && [0,1,2,3,4,5,6,7,8,9].map(() => <Loading height={300} width={272} />)}
                                </div>
                                
                                :
                                history.slice(0).reverse().map(item => {
                                    return(
                                        <Link className={`nav-link active ${ night && 'bgNightCard shadow-sm nightBorder' }`} to={`/history/${item._id}`} key={item._id}>
                                            <div className="myorder_div active">
                                                <div className={`order-cardstyle ${ night && 'nightText-5'}`}>
                                                    <span className="order_span_heading">
                                                        Order
                                                        <span>#1</span>
                                                    </span>
                                                    <span className="order_location">{`${ item.status === false ? 'Order On The Way' : 'Order Received' }`}</span>
                                                </div>
                                                <div className={`myorder_info ${ night && 'nightText-3 nightText-4'}`}>
                                                    <div className="order_date">
                                                        Name: 
                                                        <span>{item.name}</span>
                                                    </div>

                                                    <div className="order_date">
                                                        Email:
                                                        <span>{item.email}</span>
                                                    </div>

                                                    <div className="order_date">
                                                        Phone:
                                                        <span>{item.phone}</span>
                                                    </div>

                                                    <div className="order_date font-weight-bold">
                                                        Address:
                                                        <span>{item.address}</span>
                                                    </div>

                                                    <div className="order_date font-weight-bold">
                                                        Payment:
                                                        <span>{item.paymentMethod}</span>
                                                    </div>

                                                    <div className="order_date font-weight-bold">
                                                        Date:
                                                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })
                                
                                }
                            </div>
                        </div>

                    </div>

                    <div className="col-md-6">
                        <div className="container">
                            <div className="card nightBorder">
                                <div className={`card-header bg-white ${ night && 'bgNightCard nightColor' }`}>
                                    <h3 className="font-weight-bold">Order Details</h3>
                                </div>
                                <div className={`card-body p-0 ${ night && 'bgNightCard'}`}>
                                        { 
                                        orderDetails.cart?.map(item => (
                                            <>
                                            <table className="table bg-light table-striped table-hover">
                                                <thead className={`${ night && 'bgNightCard nightColor' }`}>
                                                    <tr className="table_heading">
                                                        <th>Item</th>
                                                        <th>Quantity</th>
                                                        <th>Price</th>
                                                    </tr>
                                                </thead>

                                                <tbody className={`${ night && 'bgNightCard nightBorder nightText-6 nightText-7' }`}>
                                                    <tr>
                                                        <td>
                                                            <span className="order_item_wrapper">
                                                                <span className="order_image">
                                                                    <img src={item.images.url} alt="Banana"/>
                                                                </span>
                                                                <span className="order_item_details">
                                                                    <span className="order_item_name">{item.title}</span>
                                                                </span>
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span>{item.quantity}</span>
                                                        </td>
                                                        <td>
                                                            <span className="text-center">
                                                                <CurrencyFormat
                                                                    renderText={(value) => (
                                                                        <>
                                                                            { value }
                                                                        </>
                                                                    )}
                                                                    decimalScale={2}
                                                                    value={item.price}
                                                                    displayType={"text"}
                                                                    thousandSeparator={true}
                                                                    prefix={"Rs "}
                                                                />
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    
                                                </tbody>
                                            </table> 
                                            </>
                                            )) 
                                        }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default History
