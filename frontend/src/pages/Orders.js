import React, { useState, useEffect } from 'react';
import { orders } from '../services/api';

export default function Orders() {
    const [orderList, setOrderList] = useState([]);
    useEffect(() => {
        orders.list().then(res => setOrderList(res.data));
    }, []);
    return (
        <div>
            <h2>Your Orders</h2>
            {orderList.map(order => (
                <div key={order.id} style={{ border: '1px solid gray', margin: '1rem', padding: '1rem' }}>
                    <p>Order #{order.id} - {order.status} - {new Date(order.created_at).toLocaleString()}</p>
                    <ul>
                        {order.items.map(item => (
                            <li key={item.id}>Product {item.product_id} x {item.quantity} = ${item.price * item.quantity}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}