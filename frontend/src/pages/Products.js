import React, { useState, useEffect } from 'react';
import { products } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Products() {
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        products.list().then(res => setProductList(res.data));
    }, []);
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {productList.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
    );
}