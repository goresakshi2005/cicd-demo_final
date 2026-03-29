import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

export default function Navbar() {
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const itemCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);
    return (
        <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', background: '#f0f0f0' }}>
            <Link to="/">Products</Link>
            {user ? (
                <>
                    <Link to="/orders">Orders</Link>
                    <Link to="/cart">Cart ({itemCount})</Link>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    );
}