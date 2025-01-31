import React, { createContext, useState, useEffect, useRef } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const isInitialRun = useRef(true);
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart_items")) || [];
        setCart(storedCart);
    }, []);

    useEffect(() => {
        if(isInitialRun.current){
            isInitialRun.current = false;
            return; 
        }
        localStorage.setItem("cart_items", JSON.stringify(cart));
    }, [cart]);
    

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
};
