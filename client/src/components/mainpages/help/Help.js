import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState';

const Help = () => {

    //Global state
    const state = useContext(GlobalState);
    // Night Mode Api
    const [night] = state.nightModeApi.nightMode;

    return (
        // <!--_______________ Need Help _______________-->
        <section className="need_help profile">
            <div className="container-fluid nightColor">
                <h3 className="text-center font-weight-bold">F.A.Q</h3>
                <div className="row justify-content-center">

                    <div className="col-md-8 ">
                        <div className="accordian_need_help">
                            <button className={`btn_accordion ${ night && 'bgNightCard nightColor' }`} type="button" data-bs-toggle="collapse" data-bs-target="#need_help_1" aria-expanded="false" aria-controls="collapseExample">
                                How to contact with Customer Service?
                            </button>
                            <div className="collapse" id="need_help_1">
                                <div className={`card card-body border-0 ${ night && 'bgNightCard nightColor' }`}>
                                    <p className="text-muted ">
                                        Our Customer Experience Team is available 7 days a week and we offer 2 ways to get in contact.Email and Chat . We try to reply quickly, so you need not to wait too long for a response!.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="accordian_need_help">
                            <button className={`btn_accordion ${ night && 'bgNightCard nightColor' }`} type="button" data-bs-toggle="collapse" data-bs-target="#need_help_2" aria-expanded="false" aria-controls="collapseExample">
                                App installation failed, how to update system information?
                            </button>
                            <div className="collapse" id="need_help_2">
                                <div className={`card card-body border-0 ${ night && 'bgNightCard nightColor' }`}>
                                    <p className="text-muted">
                                        Our Customer Experience Team is available 7 days a week and we offer 2 ways to get in contact.Email and Chat . We try to reply quickly, so you need not to wait too long for a response!.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="accordian_need_help">
                            <button className={`btn_accordion ${ night && 'bgNightCard nightColor' }`} type="button" data-bs-toggle="collapse" data-bs-target="#need_help_3" aria-expanded="false" aria-controls="collapseExample">
                                App installation failed, how to update system information?
                            </button>
                            <div className="collapse" id="need_help_3">
                                <div className={`card card-body border-0 ${ night && 'bgNightCard nightColor' }`}>
                                    <p className="text-muted">
                                        Our Customer Experience Team is available 7 days a week and we offer 2 ways to get in contact.Email and Chat . We try to reply quickly, so you need not to wait too long for a response!.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="accordian_need_help">
                            <button className={`btn_accordion ${ night && 'bgNightCard nightColor' }`} type="button" data-bs-toggle="collapse" data-bs-target="#need_help_4" aria-expanded="false" aria-controls="collapseExample">
                                App installation failed, how to update system information?
                            </button>
                            <div className="collapse" id="need_help_4">
                                <div className={`card card-body border-0 ${ night && 'bgNightCard nightColor' }`}>
                                    <p className="text-muted">
                                        Our Customer Experience Team is available 7 days a week and we offer 2 ways to get in contact.Email and Chat . We try to reply quickly, so you need not to wait too long for a response!.
                                    </p>
                                </div>
                            </div>
                        </div>

                        
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Help
