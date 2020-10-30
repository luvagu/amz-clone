import React from 'react'
import { useStateValue } from '../../StateProvider'
import { getBasketTotal } from '../../reducer'
import { useHistory } from 'react-router-dom'
import CurrencyFormat from 'react-currency-format'

import './Subtotal.css'

function Subtotal() {
    const history = useHistory()
    const [{ basket }] = useStateValue()
    //console.log('basket >>>>>', basket)

    const items = basket?.length

    return (
        <div className="subtotal">
            <CurrencyFormat 
                renderText={(total) => (
                    <>
                        <p>
                            Subtotal ({items} items): <strong>{total}</strong>
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
            <button onClick={() => history.push('/checkout')}  disabled={!items && ('disabled')}>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal
