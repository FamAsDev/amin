import React, {useContext, useState} from 'react'
import axios from "axios"
import { GlobalState } from '../../../GlobalState';

const Login = ({id}) => {
    //Global state
    const state = useContext(GlobalState);
    // Night Mode Api
    const [night] = state.nightModeApi.nightMode;
    
    const messages = document.querySelector("#alertMessage")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    
    // user information
    const [ user , setUser ] = useState({
        email: "", 
        password: ""
    })

    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]:value });
    }

    const loginSubmit = async e => {
        e.preventDefault();

        try {
            await axios.post("/user/login", {...user});
            localStorage.setItem("firstLogin", true);
            setSuccess(true)
            messages.innerHTML = `You are Login Successfully!`
            window.location.href = "/";
        } catch (err) {

            if(err.response.status === 400) {
                setError(true)
                messages.innerHTML = `${err.response.data.msg}`
                setError(true)
                messages.innerHTML = `${err.response.data.msg}`
            } 
            if(err.response.status === 500) {
                setError(true)
                messages.innerHTML = `${err.response.data.msg}`
            } 



            alert(err.response.headers);
            
        }
    }

    return (
    //    {/* <!-- Login IN --> */}
       <div className="modal fade border-0" id={id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-md modal-dialog-centered" role="document">
                <div className={`modal-content bg-light ${ night && 'bgNightBody'}`}>
                    <div className="modal-header border-0">
                        <button type="button" className="product_close" data-bs-dismiss="modal" aria-label="Close" onClick={ () => window.location = "/" }>
                                <svg xmlns="http://www.w3.org/2000/svg" width="10.003" height="10" viewBox="0 0 10.003 10" style={{width: '11px', height: '11px'}}><path data-name="_ionicons_svg_ios-close (5)" d="M166.686,165.55l3.573-3.573a.837.837,0,0,0-1.184-1.184l-3.573,3.573-3.573-3.573a.837.837,0,1,0-1.184,1.184l3.573,3.573-3.573,3.573a.837.837,0,0,0,1.184,1.184l3.573-3.573,3.573,3.573a.837.837,0,0,0,1.184-1.184Z" transform="translate(-160.5 -160.55)" fill="currentColor"></path></svg>
                        </button>
                    </div>
                    <div className={`modal-body p-5 text-center ${ night && 'nightColor'}`}>
                        <div className={`alert ${ success === true ? 'alert-success' : "alert-danger" }  fade ${ error === true ? 'show' : success === true && 'show' }`} role="alert">
                            <strong id="alertMessage"></strong>
                        </div>
                        <h5 className="text-lightgreen text-center">Welcome Back</h5>
                        <p className="text-muted">Login with your email & password</p>

                        <form action="" onSubmit={loginSubmit}>
                            <div className="input-group mb-3">
                                <input  className={`form-control ${ night && 'bgNightBody nightColor' }`} type="email" required name="email"
                                placeholder="demo@demo.com" value={user.email} onChange={ onChangeInput } />
                            </div>
                            <div className="input-group mb-2">
                                <input  className={`form-control ${ night && 'bgNightBody nightColor' }`} type="password" required  name="password"
                                placeholder="************" value={user.password} onChange={ onChangeInput }/>
                            </div>
                            <button type="submit" className="btn btn-success  p-2 mb-2">Continue</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
