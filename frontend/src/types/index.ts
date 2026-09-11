export type Role = "ADMIN" | "USER";
export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    createdAt?: string;
    updatedAt?: string;
}
export interface Category {
    id: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;

}
export interface Product {
    id: string;
    title: string;
    price: number;
    stock: number;
    description: string;
    imageURL?: string;
    createdAt?: string;
    updatedAt?: string;
    isAvailable: boolean;
    category?: Category;
    categoryId: string;
}

export type OrderStatus = "PENDING" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export interface OrderItem {
    id: number;
    orderId: string;
    order?: Order;
    productId: string;
    product: Product;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    userId: string;
    user: User;
    total: number;
    status: OrderStatus;
    createdAt?: string;

    items: OrderItem[];
}
export interface AuthResponse {
    token: string;
    user: User;
}
export interface CreateOrderInput {
    items: {
        productId: string;
        quantity: number;
    }[];
}
export interface CartItem {
    product: Product;
    quantity: number;
}