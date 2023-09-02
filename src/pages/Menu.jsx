import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

const Menu = ({ items, categories, filterAllItems, searchFilter }) => {
    let searchValue = useRef("")

    return (
        <div className='menuWrapper'>
            <div className="search">
                <input ref={searchValue} onChange={() => {
                    const searchedValue = searchValue.current.value
                    searchFilter(searchedValue)
                }} type="text" placeholder='search...' />
            </div>
            <div className="choseCategory">
                {categories.map((category, index) => {
                    return (
                        <div key={index} className='button'>
                            <button
                                type="button"
                                className="filter-btn"
                                key={index}
                                onClick={() => filterAllItems(category)}
                            >
                                {category}
                            </button>
                        </div>
                    );
                })}
            </div>
            <div className="itemsWrapper">
                <div className="items">
                    {items.map((item) => {
                        const { name, price, id } = item
                        return <div key={id} className='oneItem'>
                            <div className="left-side">
                                <h3>{name}</h3>
                                <Link to={`/oneitem/${name}`}> <button>details</button></Link>
                            </div>
                            <p>{price}$</p>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Menu