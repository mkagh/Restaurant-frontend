import React, { useState } from 'react'
import Logo from '../images/logo.jpg'
import { Link } from 'react-router-dom'
import Login from "./Login";
import SignUp from "./SignUp";
import { useGlobalContext } from '../context'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi'
import Cookies from 'js-cookie';
import axios from "axios"


const Navbar = () => {
    const { showLog, showSignup, dontShowLog, dontShowSignup, isLogged, unloggedUnsigned } = useGlobalContext()
    const [isSidebar, setIsSidebar] = useState(false)

    return (
        <>
            <div onClick={() => {
                setIsSidebar(!isSidebar)
            }} className="hamburger">{isSidebar ? <i>  <AiOutlineCloseCircle /> </i> : <i><GiHamburgerMenu /></i>}</div>
            <nav>
                <div className="left-side">
                    <ul>
                        <Link to={"/"}><li>Home</li> </Link>
                        <Link to={"/menu"}><li>Menu</li> </Link>
                        <Link to={"/about"}><li>About</li></Link>
                        <Link to={"/contact"}><li>Contact</li></Link>
                    </ul>
                </div>
                <div className="center">
                    <img src={Logo} alt="" />
                </div>

                {!isLogged ? <div className="right-side"> <ul>
                    <Link to={"/onlineorder"}><li>Order</li></Link>
                    <li onClick={() => {

                        dontShowSignup()
                        showLog()
                    }}>Login</li>
                    <li
                        onClick={() => {
                            dontShowLog()
                            showSignup()
                        }}
                    >Sign up</li>
                </ul>
                    <Login />
                    <SignUp />
                </div> : <div className="loged-right-side">
                    <Link to={"/memberorder"}> <li onClick={() => {
                    }}>order as a member</li> </Link>

                    <button onClick={async () => {
                        try {
                            await axios.get('/logout')
                            const userDataCookie = Cookies.get('userData');
                            if (userDataCookie === undefined) {

                                unloggedUnsigned()
                            }
                            window.location.href = '/'
                        }
                        catch (err) {
                            console.log(err)
                        }
                    }} >odjavi se </button>
                </div>
                }

            </nav>
            <div className={isSidebar ? "sidebar" : "nonvisible"} >
                <nav>
                    <div className="center">
                        <img src={Logo} alt="" />
                    </div>
                    <ul>
                        <Link to={"/"}><li>Home</li> </Link>
                        <Link to={"/menu"}><li>Menu</li> </Link>
                        <Link to={"/about"}><li>About</li></Link>
                        <Link to={"/contact"}><li>Contact</li></Link>

                    </ul>
                    {!isLogged ? <div className="downer-side">

                        <ul>
                            <Link to={"/onlineorder"}><li>Order</li></Link>
                            <li onClick={() => {
                                dontShowSignup()
                                showLog()
                            }}>Login</li>
                            <li
                                onClick={() => {
                                    dontShowLog()
                                    showSignup()
                                }}
                            >Sign up</li>
                        </ul>
                        <Login />
                        <SignUp />
                    </div> : <div className="loged-downer-side">
                        <Link to={"/memberorder"}> <li onClick={() => {
                        }}>order as a member</li> </Link>
                        <button onClick={async () => {
                            await axios.get('/logout')
                            const userDataCookie = Cookies.get('userData');
                            if (!userDataCookie) {
                                unloggedUnsigned()
                            }
                            window.location.href = '/'
                        }} >odjavi se </button>
                    </div>}

                </nav>
            </div>



        </>
    )
}

export default Navbar