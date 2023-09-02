import React, { useState, useEffect } from 'react'
import { useGlobalContext } from '../context'
import Cookies from 'js-cookie';
import axios from "axios"


const SignUp = () => {
    const { isSignUp, dontShowSignup, loggedSigned, signError, assignSignError } = useGlobalContext()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        const userDataCookie = Cookies.get('userData');
        if (userDataCookie) {
            loggedSigned()
        }
    }, []);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/register', formData);
            const userDataCookie = Cookies.get('userData');
            if (userDataCookie) {
                loggedSigned()
                window.location.href = "/"
            }
            else {
                assignSignError(response.data.msg)

            }
        } catch {
            console.log("ne valja nesto");
        }

    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => {
            return {
                ...prevData,
                [name]: value,
            };
        });
    };

    return (

        <div className={isSignUp ? 'wrapperAuth ' : 'nonvisible'}>
            <form onSubmit={handleFormSubmit} className="registrationForm" /* action="/register" */ method="POST" >
                <div className="username">
                    <input value={formData.username}
                        onChange={handleInputChange} type="text" name="username" placeholder="username" />
                </div>
                <div className="email">
                    <input value={formData.email}
                        onChange={handleInputChange} type="text" name="email" placeholder="email" />
                </div>
                <div className="password">
                    <input value={formData.password}
                        onChange={handleInputChange} type="password" name="password" placeholder="password" />
                </div>
                <div className="password2">
                    <input value={formData.confirmPassword}
                        onChange={handleInputChange} type="password" name="confirmPassword" placeholder="confirm password" />
                </div>
                <div className="button ">
                    <button className="register" type="submit">Register</button>
                </div>
                {signError && <p className='error'>{signError}</p>}
            </form>
            <button className='closeButton' onClick={() => {
                dontShowSignup()
            }}>X</button>
        </div>

    )
}

export default SignUp