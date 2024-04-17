import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context'
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'

const MainMenu = ({ showAmount, showDetails }) => {
    const { getTotal, Increase, Decrease, menuItems, NewOrder } = useGlobalContext()
    return (
        <div className = "itemsWrapper">
            <div className = "items">
                {menuItems.map((item) => {
                    const { name, price, id, amount } = item
                    return <div key={id} className = 'oneItem'>
                        <div className = "left-side">
                            <h3>{name}</h3>
                            {showDetails && <Link to = {`/oneitem/${name}`}> <button>details</button></Link>}
                        </div>
                        <div className = "right-side">
                            <p className = 'price'>{price} $</p>
                            {showAmount && <div className = "amount">
                                <div className = "increaseDecrease">
                                    <button onClick = {() => {
                                        Increase(id)
                                    }} className = 'increase'> <i><AiOutlineArrowUp /></i> </button>
                                    <p >{amount}</p>
                                    <button onClick={() => {
                                        Decrease(id)
                                    }} className = 'decrease'><i><AiOutlineArrowDown /></i></button>
                                </div>
                                <button onClick = {() => {
                                    NewOrder({ name, price, amount })
                                    getTotal()
                                }} className = 'add'>add</button>
                            </div>
                            }
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default MainMenu