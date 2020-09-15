import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { useStateValue } from '../../StateProvider'

import Order from './Order'
import './Orders.css'

function Orders() {
    const [{ user }] = useStateValue()
    const [orders, setOrders] = useState([])

    useEffect(() => {
        if (user) {
            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .orderBy('created', 'desc')
                .onSnapshot(snapshot => {
                    setOrders(snapshot.docs.map(order => ({
                        id: order.id,
                        data: order.data()
                    })))
                })
        } else {
            setOrders([])
        }
    }, [user])

    return (
        <div className="orders">
            <h1>Your Orders</h1>

            <div className="orders_order">
                {orders?.map((order, index) => (
                    <Order key={index} order={order} />
                ))}
            </div>
        </div>
    )
}

export default Orders
