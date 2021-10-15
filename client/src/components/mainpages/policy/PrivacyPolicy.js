import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState';

const PrivacyPolicy = () => {

    //Global state
    const state = useContext(GlobalState);
    // Night Mode Api
    const [night] = state.nightModeApi.nightMode;

    return (
        // <!--_______________ Profile _______________-->
        <section className="profile">
            <div className="container-fluid">
                <h2 className="font-weight-bold mb-2 pl-4 text-lightgreen">Privacy Policy</h2>
                <p  className={`pl-4 ${ !night && 'text-dark' }`}>Last update: 24/04/2021</p>
                <div className="row">
                    <div className="col-md-3 ">
                        <div className="info_sidebar">
                            <div className={`list-group list-group-flus ${ night && 'bgNightCard stopBackground nightText-2'}`}>
                                <a href="#purpose" className="list-group-item border-0">PURPOSE </a>
                                <a href="#WPD" className="list-group-item border-0">WHAT IS PERSONAL DATA?</a>
                                <a href="#PDC" className="list-group-item border-0">PERSONAL DATA COLLECTED</a>
                                <a href="#AYPD" className="list-group-item border-0">ACCESSING YOUR PERSONAL DATA</a>
                                <a href="#complaints" className="list-group-item border-0">COMPLAINTS</a>
                                <a href="#OADC" className="list-group-item border-0">OWNER AND DATA CONTROLLER</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9">
                        {/* <!-- Purpose --> */}
                        <div className={`info_widget mb-5 bg-white p-2 px-4 shadow-sm rounded  ${ night && ' bgNightCard p-2 px-4 rounded nightColor' }`} id="purpose">
                            <h3 className="font-weight-bold">Purpose</h3>
                            <p className="lead text-dark"> 
                                Little & Big is committed to protecting your privacy because we are committed to valuing people. Our Privacy Policy below sets out how your personal information is collected, used and protected. The Demo Country Privacy Principles also apply to us.
                                This Privacy Policy describes our policies and procedures on the collection, holding, use and disclosure of your personal information and should be read together with our Terms and Conditions. By providing your personal information you consent to our collection, use and disclosure of that information in accordance with this Privacy Policy.
                            </p>
                        </div>

                        {/* <!-- What is Personal Data? --> */}
                        <div className={`info_widget mb-5 bg-white p-2 px-4 shadow-sm rounded  ${ night && ' bgNightCard p-2 px-4 rounded nightColor' }`} id="WPD">
                            <h3 className="font-weight-bold">What is Personal Data?</h3>
                            <p className="lead text-dark">
                                When used in this Policy, "personal information" has the meaning given in the Privacy Act. Generally, it means any information or an opinion that could be used to identify you.
                            </p>
                        </div>

                        {/* <!-- Personal Data Collected --> */}
                        <div className={`info_widget mb-5 bg-white p-2 px-4 shadow-sm rounded  bg-white p-2 px-4 shadow-sm rounded ${ night && ' bgNightCard p-2 px-4 rounded nightColor' }`} id="PDC">
                            <h3 className="font-weight-bold">Personal Data Collected</h3>
                            <p className="lead text-dark"> 
                                Personal Data collected for the following purposes and using the following services:
                                <ul className="pl-5">
                                    <li>Google Analytics: Cookies; Usage Data</li>
                                    <li>Contact form: email address; first name; phone number</li>
                                    <li>Mailing list or newsletter: email address; first name</li>
                                </ul>
                            </p>
                        </div>

                        {/* <!-- Accessing your Personal Data --> */}
                        <div className={`info_widget mb-5 bg-white p-2 px-4 shadow-sm rounded  ${ night && ' bgNightCard p-2 px-4 rounded nightColor' }`} id="AYPD">
                            <h3 className="font-weight-bold">Accessing your Personal Data</h3>
                            <p className="lead text-dark"> 
                                You may request access to your personal information collected by us, and ask that we correct that personal information. You can ask for access or correction by contacting us and we will usually respond within 30 days. If we refuse to give you access to, or correct, your personal information, we will notify you in writing setting out the reasons.
                            </p>
                        </div>

                        {/* <!-- Complaints --> */}
                        <div className={`info_widget mb-5 bg-white p-2 px-4 shadow-sm rounded  ${ night && ' bgNightCard p-2 px-4 rounded nightColor'}`} id="complaints">
                            <h3 className="font-weight-bold">Complaints</h3>
                            <p className="lead text-dark">
                                If you believe your privacy has been breached or you have a complaint about how we have handled your personal information, please contact us in writing. We will respond within a reasonable period (usually within 30 days).
                            </p>
                        </div>

                        {/* <!-- Owner and Data Controller --> */}
                        <div className={`info_widget mb-5 bg-white p-2 px-4 shadow-sm rounded  ${ night && ' bgNightCard p-2 px-4 rounded nightColor' }`} id="OADC">
                            <h3 className="font-weight-bold">Owner and Data Controller</h3>
                            <p className="lead text-dark">
                                <ul className="mb-4">
                                    <li>The Commons</li>
                                    <li>20-40 demo St,</li>
                                    <li>Jon doe NSW 2008</li>
                                    <li>Country</li>
                                </ul>
                                Email: demo@demo.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PrivacyPolicy
