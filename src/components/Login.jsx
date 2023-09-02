import React, { useState } from 'react'
import { useGlobalContext } from '../context'
import Cookies from 'js-cookie';
import axios from "axios"

const Login = () => {
    const { isLogin, dontShowLog, loggedSigned, signError, assignSignError } = useGlobalContext()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/login', formData);
            console.log(response);

            const userDataCookie = Cookies.get('userData');
            console.log(userDataCookie)
            if (userDataCookie) {
                loggedSigned()
                window.location.href = "/"

            }
            else {
                assignSignError(response.data.msg)
            }
        }
        catch (err) {
            console.log(err);
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
        <div className={isLogin ? 'wrapperAuth ' : 'nonvisible'}>
            <form onSubmit={handleFormSubmit} method="POST">
                <div className="email">
                    <input value={formData.email}
                        onChange={handleInputChange} type="text" name="email" placeholder="email adress" />
                </div>
                <div className="password">
                    <input value={formData.password}
                        onChange={handleInputChange} type="password" name="password" placeholder="password" />
                </div>
                <div className="button">
                    <button type="submit">Login</button>
                </div>
                {signError && <p className='error'>{signError}</p>}
            </form>
            <button className='closeButton' onClick={() => {
                dontShowLog()
            }}>X</button>
        </div>
    )
}

export default Login