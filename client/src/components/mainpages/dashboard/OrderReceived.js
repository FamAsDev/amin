import React, { useContext, useEffect, useState } from 'react'
import DashboardLinks from './DashboardLinks'
import CurrencyFormat from 'react-currency-format'
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';

const OrderReceived = () => {

    //Global state
    const state = useContext(GlobalState);
    // Night Mode Api
    const [night] = state.nightModeApi.nightMode;
    // isAdmin
    const [isAdmin] = state.userApi.isAdmin
    // token
    const [token] = state.token
    // Orders
   const [history, setHistory] = useState([])
    // Cart 
    const [cart] = state.userApi.cart
    // total
    const [total, setTotal]= useState(0)

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

    // Get User History Orders
    useEffect(() => {
        const orderHistory = async () => {
            const res = await axios.get("/user/history", {
                headers: {Authorization: token}
            })
            setHistory(res.data)
        }

        orderHistory();
    },[token, isAdmin, setHistory])

    return (
        // <!--_______________ Profile _______________-->
        <section className="profile">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <DashboardLinks/>
                    </div>

                    <div className="col-md-9">
                        <div className={`card p-5 ${ night && 'bgNightCard nightColor' }`}>
                            <div className="card-body">

                                {
                                !history.length ?
                                    <div className="text-center loadingOrders">
                                    <div className={`spinner-grow text-success ${ night && 'nightColor' }`} role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <div  className={`spinner-grow text-success ${ night && 'nightColor' }`} style={{marginLeft: '10px'}} role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                                :
                                <>
                                    <div className="order_recieve_widgit">
                                        <h3 className="font-weight-bold mb-4">Order Received</h3>
                                        <p className={ night ? 'text-white' : 'text-dark' }>Thank you. Your order has been received</p>
                                        <ol className={`list-group list-group-numbered ${ night && 'bgNightCardList nightWhiteBorder py-4' }`}>
                                            <li className=" list-group-item d-flex justify-content-between align-items-start">
                                                <div className="ms-2 me-auto ">
                                                <div className="fw-bold">Order Number</div>
                                                    {history[history.length -1]?.user_id}
                                                </div>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                                <div className="ms-2 me-auto">
                                                <div className="fw-bold">Date</div>
                                                    {new Date(history[history.length -1]?.createdAt).toLocaleDateString()}
                                                </div>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                                <div className="ms-2 me-auto">
                                                <div className="fw-bold">Payment Method</div>
                                                    {history[history.length -1]?.paymentMethod}
                                                </div>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                                <div className="ms-2 me-auto">
                                                <div className="fw-bold">Name</div>
                                                    {history[history.length -1]?.name}
                                                </div>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                                <div className="ms-2 me-auto">
                                                <div className="fw-bold">Email</div>
                                                    {history[history.length -1]?.email}
                                                </div>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                                <div className="ms-2 me-auto">
                                                <div className="fw-bold">Phone</div>
                                                    {history[history.length -1]?.phone}
                                                </div>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                                <div className="ms-2 me-auto">
                                                <div className="fw-bold">Address</div>
                                                    {history[history.length -1]?.address}
                                                </div>
                                            </li>
                                        </ol>
                                    </div>
    
                                    <div className="order_recieve_widgit">
                                        <h3 className="font-weight-bold mb-4">Order Details</h3>
                                        <ol className={`list-group list-group-numbered ${ night && 'bgNightCardList nightWhiteBorder py-4' }`}>
                                            {
                                            history && history[history.length - 1]?.cart.map(product => (
                                                <li key={product._id} className="list-group-item d-flex justify-content-between align-items-start">
                                                    <div className="ms-2 me-auto">
                                                    <div className="fw-bold">{product.quantity} x</div>
                                                        {product.title}
                                                    </div>
                                                    <span class="badge bg-primary rounded-pill">
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
                                                </li>
                                            ))
                                            }
                                        </ol> 
                                    </div>
        
                                    <div className="order_recieve_widgit ">
                                        <h3 className="font-weight-bold mb-4">Total Amount</h3>
                                        <table className={`table border-0 ${ night && 'nightText-11' }`}>
                                            <tr>
                                                <th>Sub Total</th>
                                                <th className="text-dark">
                                                    <CurrencyFormat
                                                        renderText={(value) => (
                                                            <>
                                                                { value }
                                                            </>
                                                        )}
                                                        decimalScale={2}
                                                        value={history[history.length -1]?.total}
                                                        displayType={"text"}
                                                        thousandSeparator={true}
                                                        prefix={"Rs "}
                                                    />
                                                </th>
                                            </tr>

                                            <tr>
                                                <th>Payment Method</th>
                                                <th className="text-dark">{history[history.length -1]?.paymentMethod}</th>
                                            </tr>
                                        </table>
                                    </div>
                                </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OrderReceived
