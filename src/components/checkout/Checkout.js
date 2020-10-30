import React, { useEffect, useState } from 'react'
import { useStateValue } from '../../StateProvider'
import { Link, useHistory } from 'react-router-dom'
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js'
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from '../../reducer'
import axios from '../../api/axios'
import { db } from '../../firebase'

import BasketProduct from '../basket/BasketProduct'
import './Checkout.css'


function Checkout() {
    const history = useHistory()
    const [{ basket, user }, dispatch] = useStateValue()

    const stripe = useStripe()
    const elements = useElements()

    const [succeded, setSucceded] = useState(false)
    const [processing, setProcessing] = useState('')
    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [clientSecret, setClientSecret] = useState(true)

    useEffect(() => {
        const getClientSecret = async () => {
            const response =  await axios({
                method: 'post',
                // Stripe expects the total in a currency subunit
                url: `/checkout/payment?total=${getBasketTotal(basket) * 100}`
            })
            .catch(() => console.log('Oooops >>>> Could not get clientSecret'))

            setClientSecret(response?.data.clientSecret)
        }

        getClientSecret()
    }, [basket])

    // console.log('Secret response  >>> ', clientSecret)
    // console.log('Stripe total >>> ', getBasketTotal(basket) * 100)

    const handleSubmit = async (event) => {
        // do all the payment processing with stripe
        event.preventDefault()
        setProcessing(true)

        try {
            const payload = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            })
            .then(({ paymentIntent }) => {
                // paymentIntent = payment confirmation

                // push order to firestore db
                db
                    .collection('users')
                    .doc(user?.uid)
                    .collection('orders')
                    .doc(paymentIntent.id)
                    .set({
                        basket: basket,
                        amount: paymentIntent.amount,
                        created: paymentIntent.created
                    })

                setSucceded(true)
                setError(null)
                setProcessing(false)

                dispatch({
                    type: 'EMPTY_BASKET'
                })

                history.replace('/orders')
            })
        } catch(err) {
            console.log('Oooops >>> Invalid payment details');
        }

    }

    const handleChange = (event) => {
        // listen for changes in the CardElement
        // and display any errors to the customer
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className="checkout">
            <div className="checkout__container">
                <h1>
                    Checkout (<Link to="/basket">{basket?.length} items</Link>)
                </h1>

                <div className="checkout__section">
                    <div className="checkout__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="checkout__address">
                        <p>{user?.email}</p>
                        <p>26a The Road</p>
                        <p>Brighton, UK</p>
                    </div>
                </div>
                
                <div className="checkout__section">
                    <div className="checkout__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="checkout__items">
                        {basket.map((product, index) => (
                            <BasketProduct 
                                key={index}
                                id={product.id}
                                image={product.image}
                                title={product.title}
                                price={product.price}
                                rating={product.rating}
                            />
                        ))}
                    </div>
                </div>

                <div className="checkout__section">
                    <div className="checkout__title">
                        <h3>Payment Method</h3>
                    </div>

                    <div className="checkout__details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />

                            <div className="checkout__priceContainer">
                                <CurrencyFormat 
                                    renderText={(total) => (
                                        <h3>Order Total: {total}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                />
                                <button disabled={processing || disabled || succeded}>
                                        <span>{processing ? ('Processing') : ('Submit Payment')}</span>
                                </button>                                
                            </div>
                            {/* errors */}
                            {error && (<div className="checkout__errorMessage">{error}</div>)}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
