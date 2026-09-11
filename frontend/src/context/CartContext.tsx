import { createContext, useContext, useState } from "react";
import type { CartItem, Product } from "../types";

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product, quantity: number) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (product: Product, quantity: number) => {
        setCartItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) => item.product.id === product.id
            );
    
            if (existingItem) {
                return currentItems.map((item) =>
                    item.product.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + quantity,
                        }
                        : item
                );
            }
    
            return [
                ...currentItems,
                {
                    product,
                    quantity,
                },
            ];
        });
    };
    const updateQuantity = (productId: string, quantity: number) => {
        setCartItems((currentItems) =>
            currentItems.map((item) =>
                item.product.id === productId
                    ? {
                        ...item,
                        quantity: Math.min(quantity, item.product.stock),
                    }
                    : item
            )
        );
    };
    const removeFromCart = (productId: string) => {
        setCartItems((currentItems) =>
            currentItems.filter(
                (item) => item.product.id !== productId
            )
        );
    };
    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateQuantity ,removeFromCart,  clearCart, }}>
            {children}
        </CartContext.Provider>
    );
};
export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used within CartProvider");
    }

    return context;
};