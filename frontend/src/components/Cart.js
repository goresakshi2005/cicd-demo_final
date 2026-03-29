import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { orders } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function Cart() {
    const { cart, removeItem, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleCheckout = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        const items = cart.items.map(i => ({ product_id: i.product_id, quantity: i.quantity }));
        try {
            await orders.create(items);
            clearCart();
            alert('Order placed!');
            navigate('/orders');
        } catch (err) {
            alert('Checkout failed: ' + err.response?.data?.detail);
        }
    };

    if (cart.items.length === 0) return <p>Cart is empty</p>;
    return (
        <div>
            <h2>Your Cart</h2>
            {cart.items.map(item => (
                <div key={item.product_id}>
                    Product ID: {item.product_id} - Quantity: {item.quantity}
                    <button onClick={() => removeItem(item.product_id)}>Remove</button>
                </div>
            ))}
            <button onClick={handleCheckout}>Checkout</button>
        </div>
    );
}