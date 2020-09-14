import React from 'react'
import { useStateValue } from '../../StateProvider'

import './Product.css'

function Product({ id, title, price, rating, image }) {
    const [{ basket }, dispatch] = useStateValue()
    //console.log('Basket >>>>>', basket)

    const addToBasket = () => {
        // dispatch (action) item into the data layer
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating
            }
        })
    }

    return (
        <div className="product">
            <div className="product__info">
                <p>{title}</p>
                <p className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {Array(rating).fill().map((_, i) => (
                        <p key={i}><span role="img" aria-label="star">⭐️</span></p>
                    ))}
                </div>
            </div> 
            <img src={image} alt="" />
            <button onClick={addToBasket}>Add to Basket</button>       
        </div>
    )
}

export default Product