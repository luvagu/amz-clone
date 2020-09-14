import React from 'react'
import { useStateValue } from '../../StateProvider'

import './BasketProduct.css'

function BasketProduct({ id, title, price, rating, image }) {
    const [{ basket }, dispatch] = useStateValue()

    const deleteFromBasket = () => {
        // delete item from the basket
        dispatch({
            type: 'DELETE_FROM_BASKET',
            id: id
        })
    }

    return (
        <div key={id} className="basketProduct">
            <div className="basketProduct__container__image">
                <img className="basketProduct__image" src={image} alt="" />
            </div>

            <div className="basketProduct__info">
                <p className="basketProduct__title">{title}</p>
                <p className="basketProduct__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="basketProduct__rating">
                    {Array(rating).fill().map((_, i) => (
                        <p key={i}><span role="img" aria-label="star">⭐️</span></p>
                    ))}
                </div>
                <button onClick={deleteFromBasket}>Delete</button>
            </div>
        </div>
    )
}

export default BasketProduct
