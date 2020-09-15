import React from 'react'
import { useStateValue } from '../../StateProvider'

import FlipMove from 'react-flip-move'
import BasketProduct from './BasketProduct'
import Subtotal from './Subtotal'

import './Basket.css'

function Basket() {
    const [{ basket, user }] = useStateValue()

    return (
        <div className="basket">
            <div className="basket__left">
                <img className="basket__ad" src="https://328897-1008310-2-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2019/12/Google-Banner-Ads-Example-2-Audible-1.jpg" alt="" />

                <div>
                    <h3 className="basket__user">Hello, {user ? user.email : 'Guest'}</h3>
                    <h2 className="basket__title">Your Shopping Basket</h2>
                </div>

                <FlipMove staggerDurationBy="30"
                    duration={500}
                    typeName="div">
                    {basket.map((product, index) => (
                        <div ref={index} key={index}>
                            <BasketProduct 
                                id={product.id}
                                image={product.image}
                                title={product.title}
                                price={product.price}
                                rating={product.rating}
                            />
                        </div>
                    ))}
                </FlipMove>
            </div>

            <div className="basket__right">
                <Subtotal />
            </div>
        </div>
    )
}

export default Basket

