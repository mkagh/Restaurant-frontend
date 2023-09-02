import React from 'react'
import { useParams } from 'react-router-dom'


const SingleItem = ({ items }) => {
    const { id } = useParams()
    const singleItem = items.filter((item) => {
        return item.name === id
    })
    const { name, ingredients, image, category, price } = singleItem[0]
    return (
        <div key={id} style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }} className='singleItem'>
            <div className="restOfData">
                <h1>{name}</h1>
                <h2>category:{category}</h2>
                <h3>price:{price}</h3>
                <h3>ingredients:</h3>
                <div>{ingredients.map((ingredient) => {
                    return <p>{ingredient}</p>
                })}</div>

            </div>
        </div>
    )
}

export default SingleItem