import React from 'react'
import { useStateValue } from '../../StateProvider'
import { getBasketTotal } from '../../reducer'
import CurrencyFormat from 'react-currency-format'

import './Subtotal.css'

function Subtotal() {
    const [{ basket }] = useStateValue()
    //console.log('basket >>>>>', basket)

    return (
        <div className="subtotal">
            <CurrencyFormat 
                renderText={(total) => (
                    <>
                        <p>
                            Subtotal ({basket?.length} items): <strong>{total}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" id="gift" /> <label htmlFor="gift">This order contains a gift</label>
                        </small>
                    </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
            />
            <button>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal
