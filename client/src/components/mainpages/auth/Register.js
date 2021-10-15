import React, {useContext, useState} from 'react'
import axios from "axios"
import { GlobalState } from '../../../GlobalState';

const Register = ({id}) => {
    //Global state
    const state = useContext(GlobalState);
    // Night Mode Api
    const [night] = state.nightModeApi.nightMode;
    
    const RegMessages = document.querySelector("#RegAlertMessage")
    const email = document.querySelector("#email")

    const [error, setError] = useState(false)
    const [inErr, setInErr] = useState(false)
    const [success, setSuccess] = useState(false)
    
    // user information
    const [ user , setUser ] = useState({
        name: "",
        email: "", 
        password: "",
        phone: "",
        address: ""
    })

    const onChangeInput = e => {
       
            const { name, value } = e.target;
            setUser({ ...user, [name]:value });   
        
    }

    const registerSubmit = async e => {
        e.preventDefault();

       if(inErr){
            setError(true)
            RegMessages.innerHTML = "Please Provide Valid Email Address!"
       }else{
        try {
            await axios.post("/user/register", {...user});
            localStorage.setItem("firstLogin", true);
            setSuccess(true)
            RegMessages.innerHTML = `You are have Registered Successfully!!`
            window.location.href = "/";
        } catch (err) {

            if(err.response.status === 400) {
                setError(true)
                RegMessages.innerHTML = `${err.response.data.msg}`
                setError(true)
                RegMessages.innerHTML = `${err.response.data.msg}`
            } 
            if(err.response.status === 500) {
                setError(true)
                RegMessages.innerHTML = `${err.response.data.msg}`
            } 

            setError(true)
            RegMessages.innerHTML = `${err.response.data.msg}`
            
        }
       }
    }


    // Email Validation
    const handleEmail = () => {
        const regex = /^([\.\_a-zA-Z0-9]+)@([a-zA-Z]+)\.([a-zA-Z]){2,8}$/;
        const regexo = /^([\.\_a-zA-Z0-9]+)@([a-zA-Z]+)\.([a-zA-Z]){2,3}\.[a-zA-Z]{1,3}$/;
        console.log(email.value.length)

        if(email.value.length === 0) return setInErr(false)

        if(email.value.length > 21) return setInErr(true)
        
        if(regex.test(email.value) || regexo.test(email.value)){
            setInErr(false)
        }else{
            setInErr(true)
        }
    }
   
    return (
        //  Register
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
                            <strong id="RegAlertMessage"></strong>
                        </div>
                        <h5 className="text-lightgreen text-center">Welcome</h5>
                        <p className="text-muted">Register Your account with your Name , email & password</p>
                       
                        <form name="form1" action="" onSubmit={registerSubmit}>
                            <div className="input-group mb-3">
                                <input  className={`form-control  ${ night && 'bgNightBody nightColor' }`} type="text" required name="name"
                                placeholder="username" value={user.name} onChange={ onChangeInput } />
                            </div>

                            <div className="input-group mb-3">
                                <input pattern="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
                                    className={`form-control  ${ inErr && 'border-danger border-2' } ${ night && 'bgNightBody nightColor' }`} 
                                    tabIndex="0" 
                                    onKeyDown={handleEmail} 
                                    type="email" 
                                    required 
                                    name="email"
                                    placeholder="demo@demo.com" 
                                    autoComplete="off"
                                    value={user.email}
                                    id="email" 
                                    onChange={ onChangeInput } 
                                />
                            </div>   

                            <div className="input-group mb-3">
                                <span className="input-group-text bg-success text-white" id="basic-addon1">+92</span>
                                <input pattern="03[0-9]{2}(?!1234567)(?!1111111)(?!7654321)[0-9]{7}" aria-describedby="basic-addon1" className={`form-control  ${ night && 'bgNightBody nightColor' }`} type="text" required  name="phone"
                                placeholder="phone" user={user.phone}  onChange={ onChangeInput }/>
                            </div>
                            
                            <div className="input-group mb-3">
                                <input  className={`form-control  ${ night && 'bgNightBody nightColor' }`} type="textarea" required  name="address"
                                placeholder="Please Enter Your Address" value={user.address}  onChange={ onChangeInput }/>
                            </div>

                            <div className="input-group mb-3">
                                <input  className={`form-control  ${ night && 'bgNightBody nightColor' }`} type="password" required  name="password"
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

export default Register
