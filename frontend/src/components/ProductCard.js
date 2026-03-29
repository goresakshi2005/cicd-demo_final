import React from 'react';
import { useCart } from '../contexts/CartContext';

export default function ProductCard({ product }) {
    const { addItem } = useCart();
    return (
        <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '0.5rem' }}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
            <button onClick={() => addItem(product.id)} disabled={product.stock === 0}>
                Add to Cart
            </button>
        </div>
    );
}