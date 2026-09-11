import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { orderService } from "../api/orderService";

export const Cart = () => {
    const {
        cartItems,
        updateQuantity,
        removeFromCart,
        clearCart,
    } = useCart();

    const navigate = useNavigate();

    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    );

    const handleCheckout = async () => {
        try {
            setIsCheckingOut(true);

            await orderService.createOrder({
                items: cartItems.map((item) => ({
                    productId: item.product.id,
                    quantity: item.quantity,
                })),
            });
            
            clearCart();
            navigate("/orders");
        } catch (error) {
            console.error("Checkout failed:", error);
        } finally {
            setIsCheckingOut(false);
        }
    };

    return (
        <section className="mx-auto w-4/5 py-12">
            <h1 className="mb-10 text-4xl font-bold text-stone-900">
                Shopping Cart
            </h1>

            {cartItems.length === 0 ? (
                <p className="text-center text-stone-500">
                    Your cart is empty.
                </p>
            ) : (
                <div className="space-y-6">
                    {cartItems.map((item) => (
                        <div
                            key={item.product.id}
                            className="flex items-center gap-6 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
                        >
                            <img
                                src={item.product.imageURL}
                                alt={item.product.title}
                                className="h-28 w-28 rounded-xl object-cover"
                            />

                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-stone-900">
                                    {item.product.title}
                                </h2>

                                <p className="mt-2 text-stone-600">
                                    ${item.product.price}
                                </p>

                                <div className="mt-3 flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (item.quantity === 1) {
                                                removeFromCart(item.product.id);
                                            } else {
                                                updateQuantity(
                                                    item.product.id,
                                                    item.quantity - 1
                                                );
                                            }
                                        }}
                                        className="rounded-lg border border-stone-300 px-3 py-1"
                                    >
                                        −
                                    </button>

                                    <span>{item.quantity}</span>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            updateQuantity(
                                                item.product.id,
                                                item.quantity + 1
                                            )
                                        }
                                        className="rounded-lg border border-stone-300 px-3 py-1"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <p className="text-xl font-bold text-stone-900">
                                $
                                {(
                                    item.product.price * item.quantity
                                ).toFixed(2)}
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    removeFromCart(item.product.id)
                                }
                                className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    <div className="mt-10 flex justify-end border-t border-stone-200 pt-6">
                        <div className="text-right">
                            <p className="text-sm text-stone-500">
                                Total:
                            </p>

                            <p className="mt-1 text-3xl font-bold text-stone-900">
                                ${totalPrice.toFixed(2)}
                            </p>

                            <button
                                type="button"
                                onClick={handleCheckout}
                                disabled={
                                    cartItems.length === 0 ||
                                    isCheckingOut
                                }
                                className="mt-6 w-48 rounded-xl bg-[#df5612] px-6 py-3 font-medium text-white transition hover:bg-[#c94d0f] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isCheckingOut
                                    ? "Processing..."
                                    : "Checkout"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};