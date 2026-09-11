import { useEffect, useState } from "react";
import type { Order } from "../types";
import { orderService } from "../api/orderService";

export const MyOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await orderService.getMyOrders();
                setOrders(data);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (isLoading) {
        return (
            <section className="mx-auto w-4/5 py-12">
                <p className="text-center text-stone-500">
                    Loading orders...
                </p>
            </section>
        );
    }

    if (orders.length === 0) {
        return (
            <section className="mx-auto w-4/5 py-12">
                <h1 className="mb-10 text-4xl font-bold text-stone-900">
                    My Orders
                </h1>

                <p className="text-center text-stone-500">
                    You haven't placed any orders yet.
                </p>
            </section>
        );
    }

    return (
        <section className="mx-auto w-4/5 py-12">
            <h1 className="mb-10 text-4xl font-bold text-stone-900">
                My Orders
            </h1>

            <div className="space-y-6">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
                    >
                        {/* Order Header */}
                        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                            <div>
                                <p className="text-sm text-stone-500">
                                    Order ID
                                </p>

                                <p className="mt-1 font-medium text-stone-900">
                                    {order.id}
                                </p>
                            </div>

                            <span
                                className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                                    order.status === "DELIVERED"
                                        ? "bg-green-100 text-green-700"
                                        : order.status === "CANCELLED"
                                        ? "bg-red-100 text-red-700"
                                        : order.status === "SHIPPED"
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-yellow-100 text-yellow-700"
                                }`}
                            >
                                {order.status}
                            </span>
                        </div>

                        {/* Order Items */}
                        <div className="mt-5 space-y-4">
                            {order.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-4"
                                >
                                    <img
                                        src={item.product.imageURL}
                                        alt={item.product.title}
                                        className="h-20 w-20 rounded-xl object-cover"
                                    />

                                    <div className="flex-1">
                                        <h2 className="font-semibold text-stone-900">
                                            {item.product.title}
                                        </h2>

                                        <p className="mt-1 text-sm text-stone-500">
                                            Quantity: {item.quantity}
                                        </p>
                                    </div>

                                    <p className="font-semibold text-stone-900">
                                        $
                                        {(
                                            item.price * item.quantity
                                        ).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Order Footer */}
                        <div className="mt-6 flex items-center justify-between border-t border-stone-200 pt-5">
                            <p className="text-sm text-stone-500">
                                {order.createdAt
                                    ? new Date(
                                          order.createdAt
                                      ).toLocaleDateString()
                                    : ""}
                            </p>

                            <p className="text-xl font-bold text-stone-900">
                                Total: ${order.total.toFixed(2)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};