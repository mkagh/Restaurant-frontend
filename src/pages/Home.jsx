import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='wrapper'>
            <div className="welcome">
                <h1>WELCOME</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod corporis cupiditate omnis quam, nostrum accusamus!</p>
                <button><Link to={"/reservations"}>Book a table</Link></button>
            </div>
        </div>
    )
}

export default Home