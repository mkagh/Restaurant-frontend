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
            <div onClick = {() => {
                setIsSidebar(!isSidebar)
            }} className = "hamburger">{isSidebar ? <i> <AiOutlineCloseCircle /> </i> : <i><GiHamburgerMenu /></i>}</div>
            <nav>
                <div className = "left-side">
                    <ul>
                       <li><Link to = {"/"}>Home</Link></li>
                       <li><Link to = {"/menu"}>Menu</Link></li>
                       <li><Link to = {"/about"}>About</Link></li>
                       <li><Link to = {"/contact"}>Contact</Link></li>
                    </ul>
                </div>
                <div className = "center">
                    <img src = {Logo} alt = "" />
                </div>
                {!isLogged ? 
                    <div className = "right-side"> 
                        <ul>
                            <li>
                                <Link to = {"/onlineorder"}>
                                   Order
                                </Link>
                            </li>
                            <li onClick = {() => {
                                    dontShowSignup()
                                    showLog()
                            }}>Login</li>
                            <li  onClick = {() => {
                                    dontShowLog()
                                    showSignup()
                             }} >Sign up</li>
                        </ul>
                        <Login />
                        <SignUp />
                    </div> 
                    : 
                    <div className = "loged-right-side">
                     {/*    da li je poterban on click */}
                        <li onClick = {() => {
                        }}><Link to = {"/memberorder"}>order as a member</Link></li> 
                        <button onClick = {async () => {
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
                        }} >Sign out </button>
                    </div>
                }
            </nav>
            <div className = {isSidebar ? "sidebar" : "nonvisible"} >
                <nav>
                    <div className = "center">
                        <img src = {Logo} alt="" />
                    </div>
                    <ul>
                    <ul>
                        <li><Link to = {"/"}>Home</Link></li>
                        <li><Link to = {"/menu"}>Menu</Link></li>
                        <li><Link to = {"/about"}>About</Link></li>
                        <li><Link to = {"/contact"}>Contact</Link></li>
                    </ul>
                    </ul>
                    {!isLogged ? 
                    <div className = "downer-side">
                        <ul>
                            <li><Link to = {"/onlineorder"}>Order</Link></li>
                            <li onClick = {() => {
                                dontShowSignup()
                                showLog()
                            }}>Login</li>
                            <li onClick = {() => {
                                    dontShowLog()
                                    showSignup()
                            }}>Sign up</li>
                        </ul>
                        <Login />
                        <SignUp />
                    </div>
                    : 
                    <div className = "loged-downer-side">
                        <li onClick = {() => {
                        }}><Link to = {"/memberorder"}>order as a member</Link></li> 
                        <button onClick = {async () => {
                            await axios.get('/logout')
                            const userDataCookie = Cookies.get('userData');
                            if (!userDataCookie) {
                                unloggedUnsigned()
                            }
                            window.location.href = '/'
                        }} >Sign out </button>
                    </div>}
                </nav>
            </div>
        </>
    )
}

export default Navbar