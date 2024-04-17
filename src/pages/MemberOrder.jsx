import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { useGlobalContext } from '../context'
import MainMenu from "../components/MainMenu";
import axios from "axios"
import Cookies from 'js-cookie';

const MemberOrder = () => {
    const { ordered, removeOrder, total, getTotal, clearOrder, clearError } = useGlobalContext()
    const buttonRef = useRef(null)
    const { pathname } = useLocation();

    useEffect(() => {
        clearOrder()
        clearError()
    }, [pathname])

    useEffect(() => {
        if (ordered.length === 0) {
            buttonRef.current.disabled = true
        }
        else {
            buttonRef.current.disabled = false
        }
    }, [ordered])

    return (
        <div className='memberorder'>
            <h1 style={{ textAlign: "center"}}>THANK YOU FOR BEING MEMBER</h1>
            <div className="order">
                <div className='orderedItems'  >{ordered.length !== 0 && ordered.map((order, index) => {
                    const { price, amount, name } = order
                    return <div key={index} className='orderedItem'>
                        <p>{index + 1}.</p>
                        <p>{name}</p>
                        <div className="aboutPrice">
                            <p>{price}$ *</p>
                            <p>{amount} =</p>
                            <p className='totalOfOne'>{amount * price}$</p>
                        </div>
                        <button onClick={() => {
                            removeOrder(name)
                            getTotal()
                        }} type='button'>X</button>
                    </div>
                })}</div>
            </div>
            <div className="button">
                <button ref={buttonRef} onClick={async (e) => {
                    const userDataCookie = Cookies.get('userData');
                    const parsedCookie = JSON.parse(userDataCookie)
                    ordered.push(`cena je ${total}`, true)
                    const dataToSend = {
                        ordered: ordered,
                        total: total
                    }
                    clearOrder()
                    e.target.disabled = true
                    await axios.patch(`/api/v1/${parsedCookie.username}`, dataToSend)
                }} type='submit'>Order</button>
                <p>YOUR PRICE IS: {total} $</p>
            </div>
            <MainMenu showAmount={true} />
        </div>
    )
}

export default MemberOrder