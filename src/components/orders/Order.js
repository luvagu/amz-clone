import React from 'react'
import moment from 'moment'
import CurrencyFormat from 'react-currency-format'

import BasketProduct from '../basket/BasketProduct'
import './Order.css'


function Order({ order }) {
    return (
        <div className="order">
            <h2>Order</h2>
            <p>{moment.unix(order.data.created).format('Do MMMM YYYY, h:mma')}</p>

            <p className="order__id">
                <small>{order.id}</small>
            </p>

            {order.data.basket?.map((product, index) => (
                <BasketProduct
                    key={index}
                    id={product.id}
                    image={product.image}
                    title={product.title}
                    price={product.price}
                    rating={product.rating}
                    hiddenBt
                />
            ))}

            <CurrencyFormat 
                renderText={(total) => (
                    <h3 className="order__total">Order Total: {total}</h3>
                )}
                decimalScale={2}
                value={order.data.amount / 100}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
            />
        </div>
    )
}

export default Order
