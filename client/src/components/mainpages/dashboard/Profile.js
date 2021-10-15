import React, { useContext } from 'react'
import DashboardLinks from './DashboardLinks'
import Cash from "./credit/cash.jpg"
import { GlobalState } from '../../../GlobalState';
import Loading from '../utils/loading/Loading';

const Profile = () => {

    //Global state
    const state = useContext(GlobalState);
    // Night Mode Api
    const [night] = state.nightModeApi.nightMode;
    // User
    const [user] = state.userApi.User;
    

    return (
        // <!--_______________ Profile _______________-->
        <section className="profile">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <DashboardLinks/>
                    </div>

                    <div className="col-md-9">
                        <div className={`card ${ night && 'bgNightCard nightColor'}`}>
                            <div className="card-body">
                                <div id="profile">
                                    <div className="profile_setting">
                                        <form action="">
                                            <div className="row">
                                                <h4 className="my-3 w-100 pl-3">Your Profile</h4>
                                                <div className="col-md-12 col-lg-6">
                                                    {
                                                        !user.name ?
                                                            <div className="form-group">
                                                                {!user.name && <Loading height={50} width={396} />}
                                                            </div>
                                                        :
                                                            <div className="form-group">
                                                                <label className="font-weight-500">Name:</label>
                                                                <input type="text" className={`form-control ${ night && 'bgNightBody nightColor' }`} value={user.name}/>
                                                            </div>
                                                    }
                                                </div>
                                                <div className="col-md-12 col-lg-6">
                                                {
                                                    !user.email ?
                                                        <div className="form-group">
                                                            {!user.email && <Loading height={50} width={396} />}
                                                        </div>
                                                    :
                                                    <div className="form-group">
                                                        <label className="font-weight-500">Email:</label>
                                                        <input type="email" className={`form-control ${ night && 'bgNightBody nightColor' }`} value={user.email}/>
                                                    </div>
                                                }
                                                </div>

                                                <h4 className="my-3 w-100 pl-3">Contact Number</h4>
                                                <div className="col-md-4">
                                                {
                                                    !user.phone ?
                                                        <div className="form-group">
                                                            {!user.phone && <Loading height={120} width={310} />}
                                                        </div>
                                                    :
                                                    <label htmlFor="myCheck_1" className="profile_label">
                                                        <div className={`address_card ${ night && 'bgNightCard'}`}>
                                                            <button className="address_card_btn">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10.003" height="10" viewBox="0 0 10.003 10"><path data-name="_ionicons_svg_ios-close (5)" d="M166.686,165.55l3.573-3.573a.837.837,0,0,0-1.184-1.184l-3.573,3.573-3.573-3.573a.837.837,0,1,0-1.184,1.184l3.573,3.573-3.573,3.573a.837.837,0,0,0,1.184,1.184l3.573-3.573,3.573,3.573a.837.837,0,0,0,1.184-1.184Z" transform="translate(-160.5 -160.55)" fill="currentColor"></path></svg>
                                                            </button>
                                                            <input type="radio" name="radio" id="myCheck_1"/>
                                                            <h4 className={`${night && 'nightColor'}`}>Primary</h4>
                                                            <p className={ night ? 'text-white' : 'text-dark' }>{user.phone}</p>
                                                        </div>
                                                    </label>
                                                }
                                                </div>

                                               

                                                {
                                                    user.phone &&  
                                                        <div className="col-md-4">
                                                            <button type="button" className={`bg-white add_contact ${ night && 'bgNightCard' }`}>
                                                                <a href="" data-bs-toggle="modal" data-bs-target="#add_contact">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="12px" viewBox="0 0 12 12"><g id="Group_3351" data-name="Group 3351" transform="translate(-1367 -190)"><rect data-name="Rectangle 520" width="12" height="2" rx="1" transform="translate(1367 195)" fill="currentColor"></rect><rect data-name="Rectangle 521" width="12" height="2" rx="1" transform="translate(1374 190) rotate(90)" fill="currentColor"></rect></g></svg>
                                                                    Add Contact
                                                                </a>
                                                            </button>
                                                        </div>
                                                }

                                                <h4 className="my-3 w-100 pl-3">Delivery Address</h4>
                                                <div className="col-md-4">
                                                {
                                                    !user.address ?
                                                        <div className="form-group">
                                                            {!user.address && <Loading height={120} width={310} />}
                                                        </div>
                                                    :
                                                    <label htmlFor="myCheck_3" className="profile_label">
                                                        <div className={`address_card ${ night && 'bgNightCard'}`}>
                                                            <button className="address_card_btn">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10.003" height="10" viewBox="0 0 10.003 10"><path data-name="_ionicons_svg_ios-close (5)" d="M166.686,165.55l3.573-3.573a.837.837,0,0,0-1.184-1.184l-3.573,3.573-3.573-3.573a.837.837,0,1,0-1.184,1.184l3.573,3.573-3.573,3.573a.837.837,0,0,0,1.184,1.184l3.573-3.573,3.573,3.573a.837.837,0,0,0,1.184-1.184Z" transform="translate(-160.5 -160.55)" fill="currentColor"></path></svg>
                                                            </button>
                                                            <input type="radio" name="radio" id="myCheck_3"/>
                                                            <h4 className={`${night && 'nightColor'}`}>Home</h4>
                                                            <p className={ night ? 'text-white' : 'text-dark' }>{user.address}</p>
                                                        </div>
                                                    </label>
                                                }
                                                </div>

                                                {
                                                user.address && 
                                                <div className="col-md-4">
                                                    <button type="button" className={`bg-white add_contact ${ night && 'bgNightCard' }`}>
                                                        <a href="" data-bs-toggle="modal" data-bs-target="#add_address">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="12px" viewBox="0 0 12 12"><g id="Group_3351" data-name="Group 3351" transform="translate(-1367 -190)"><rect data-name="Rectangle 520" width="12" height="2" rx="1" transform="translate(1367 195)" fill="currentColor"></rect><rect data-name="Rectangle 521" width="12" height="2" rx="1" transform="translate(1374 190) rotate(90)" fill="currentColor"></rect></g></svg>
                                                            Add Address
                                                        </a>
                                                    </button>
                                                </div>
                                                }

                                                <h4 className="my-3 w-100 pl-3">Payment Option</h4>
                                                
                                                <div className="col-md-4">
                                                {
                                                    !user.name ?
                                                        <div className="form-group">
                                                            {!user.name && <Loading height={200} width={310} />}
                                                        </div>
                                                    :
                                                    <label htmlFor="myCheck_11">
                                                        <div className={`address_card ${ night && 'bgNightCard nightText-5'}`}>
                                                            <button className="address_card_btn">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="10.003" height="10" viewBox="0 0 10.003 10"><path data-name="_ionicons_svg_ios-close (5)" d="M166.686,165.55l3.573-3.573a.837.837,0,0,0-1.184-1.184l-3.573,3.573-3.573-3.573a.837.837,0,1,0-1.184,1.184l3.573,3.573-3.573,3.573a.837.837,0,0,0,1.184,1.184l3.573-3.573,3.573,3.573a.837.837,0,0,0,1.184-1.184Z" transform="translate(-160.5 -160.55)" fill="currentColor"></path></svg>
                                                            </button>
                                                            <img src={Cash} className=" mb-3 cash_delivery img-fluid" alt=""/>
                                                        
                                                            <span className="payment_card_style_name">{user.name}</span>

                                                            <p className={ night ? 'text-white' : 'text-dark' }>The Goods will be delivered</p>
                                                        </div>
                                                    </label>
                                                }
                                                </div>
                                           
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Profile
