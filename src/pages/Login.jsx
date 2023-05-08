import axios from 'axios';
import React, { useRef, useState } from 'react'
import { url } from '../utils/config';
import { useNavigate } from 'react-router-dom';
import AlertContent, { Alert } from '../components/Alert';
import jwt_decode from "jwt-decode";
import bg from "./gif.gif"

function Login() {
    const [alert, setAlert] = useState({ open: false, color: "", text: "" });
    const [show, setShow] = useState(false)

    const loginRef = useRef()
    const passwordRef = useRef()

    const navigate = useNavigate()

    const login = (e) => {
        e.preventDefault()
        axios.post(`${url}/api/login`, {
            username: loginRef.current.value,
            password: passwordRef.current.value
        }).then((res) => {
            localStorage.setItem("user", JSON.stringify(jwt_decode(res.data.access_token)))
            localStorage.setItem("token", res.data.access_token);
            navigate("/home")
        }).catch((err) => {
            Alert(setAlert, "danger", "login yoki parolda xatolik");
        })
    }

    return (
        <div class="p-0 " style={{background: `url(${bg})`, backgroundPosition: "center", }}>
            <div className="authentication-wrapper authentication-basic container-p-y">
                <div className="authentication-inner">
                    <div className="card">
                        <div className="card-body">
                            <div className="app-brand justify-content-center pb-0 mb-2">
                               <img src="../assets/img/logo.png" alt="" height={"150px"}/>
                            </div>
                            <h4 className="mb-2 justify-content-center text-center" style={{color: "#152b03", fontWeight: "700"}}>RedStarExpress admin paneliga xush kelibsiz!</h4>
                            <form onSubmit={login}>
                                <div className="mb-3">
                                    <label for="email" className="form-label" style={{color: "#152b03", fontWeight: "700"}}>Login</label>
                                    <input
                                        ref={loginRef}
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        name="email-username"
                                        placeholder="loginni kiriting"
                                        autofocus
                                    />
                                </div>
                                <div className="mb-3 form-password-toggle">
                                    <div className="d-flex justify-content-between">
                                        <label className="form-label" for="password" style={{color: "#152b03", fontWeight: "700"}}>Parol</label>
                                        {/* <a href="auth-forgot-password-basic.html">
                                            <small>Forgot Password?</small>
                                        </a> */}
                                    </div>
                                    <div className="input-group input-group-merge">
                                        <input
                                            ref={passwordRef}
                                            type={show ? "text" : "password"}
                                            id="password"
                                            className="form-control"
                                            name="password"
                                            placeholder="Parolni kiriting"
                                            aria-describedby="password"
                                        />
                                        <span className="input-group-text cursor-pointer"
                                            onClick={() => setShow(!show)}>
                                            {
                                                show ? <i className="bx bx-show"></i> : <i className="bx bx-hide"></i>
                                            }
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-0">
                                    <button className="btn btn-primary d-grid w-100 mb-0" type="submit">Kirish</button>
                                </div>
                            </form>

                            {/* <p className="text-center">
                                <span>New on our platform?</span>
                                <a href="auth-register-basic.html">
                                    <span>Create an account</span>
                                </a>
                            </p> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* alert */}
            <AlertContent alert={alert} />
        </div>
    )
}

export default Login