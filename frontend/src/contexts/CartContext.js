import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            const existing = state.items.find(i => i.product_id === action.payload.product_id);
            if (existing) {
                return {
                    ...state,
                    items: state.items.map(i =>
                        i.product_id === action.payload.product_id
                            ? { ...i, quantity: i.quantity + action.payload.quantity }
                            : i
                    )
                };
            }
            return { ...state, items: [...state.items, action.payload] };
        case 'REMOVE_ITEM':
            return { ...state, items: state.items.filter(i => i.product_id !== action.payload) };
        case 'CLEAR':
            return { items: [] };
        default:
            return state;
    }
};

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, { items: [] });
    const addItem = (product_id, quantity = 1) => dispatch({ type: 'ADD_ITEM', payload: { product_id, quantity } });
    const removeItem = (product_id) => dispatch({ type: 'REMOVE_ITEM', payload: product_id });
    const clearCart = () => dispatch({ type: 'CLEAR' });
    return (
        <CartContext.Provider value={{ cart: state, addItem, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}