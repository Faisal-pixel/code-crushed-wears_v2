import { createContext, useEffect, useState } from "react";

const addCartItemByChecking = (cartItems, productToAdd) => {
    
    //check if the new item coming in exist in the cart items.
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
    //if the new item exists, we get a new array, here we need to increas the quantity. We do this by mapping through our cartItems and check if the new product id is equal to a cartItem id, if it is true that means we need to inrease the quantity for that one, so we return a new object spreading the existing object for this cartItem but increasing the quantity by 1
    if(existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem)
    }

    //if it is a new cart item, we return a new array consisting all the existing cartItems and a new object of the new product with quantity of 1
    return [...cartItems, {...productToAdd, quantity: 1}]
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => null,
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)

    useEffect(()=> {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems])
    
    const addItemToCart = (productToAdd) => {

        setCartItems(addCartItemByChecking(cartItems, productToAdd))

        
    }
    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount}
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}