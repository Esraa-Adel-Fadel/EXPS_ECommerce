import { useEffect, useState } from "react";
import { adminService } from "../api/adminService";
import type {
  AdminOrder,
  AdminUser,
  ProductFormData,
} from "../api/adminService";
import { productService } from "../api/productService";
import type { Category, Product } from "../types";

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<
    "products" | "orders" | "users"
  >("products");

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    price: 0,
    stock: 0,
    description: "",
    imageURL: "",
    categoryId: "",
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        productsData,
        ordersData,
        usersData,
        categoriesData,
      ] = await Promise.all([
        productService.getProducts().catch(() => []),
        adminService.getOrders().catch(() => []),
        adminService.getUsers().catch(() => []),
        productService.getCategories().catch(() => []),
      ]);

      setProducts(Array.isArray(productsData) ? productsData : []);
      setOrders(Array.isArray(ordersData) ? ordersData : []);
      setUsers(Array.isArray(usersData) ? usersData : []);
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (err: any) {
      setError("An error occurred while loading dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await adminService.deleteProduct(id);

      setProducts((prev) =>
        prev.filter((p) => String(p.id) !== id)
      );
    } catch (err: any) {
      alert(
        err.response?.data?.message ||
          "Failed to delete product."
      );
    }
  };

  const handleOpenModal = (product?: Product) => {
    if (product) {
      // Edit Product
      setEditingProduct(product);

      setFormData({
        title: product.title || "",
        price: product.price || 0,
        stock: product.stock ?? 0,
        description: product.description || "",
        imageURL: product.imageURL || "",
        categoryId:
          product.categoryId ||
          (categories[0]?.id
            ? String(categories[0].id)
            : ""),
      });
    } else {
      // Add Product
      setEditingProduct(null);

      setFormData({
        title: "",
        price: 0,
        stock: 0,
        description: "",
        imageURL: "",
        categoryId: categories[0]?.id
          ? String(categories[0].id)
          : "",
      });
    }

    setIsModalOpen(true);
  };

  const handleFormSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      if (editingProduct) {
        // Update Product
        const updated = await adminService.updateProduct(
          String(editingProduct.id),
          formData
        );

        setProducts((prev) =>
          prev.map((p) =>
            p.id === editingProduct.id
              ? updated
              : p
          )
        );
      } else {
        // Create Product
        const created = await adminService.createProduct(
          formData
        );

        setProducts((prev) => [
          created,
          ...prev,
        ]);
      }

      setIsModalOpen(false);
    } catch (err: any) {
      alert(
        err.response?.data?.message ||
          "Operation failed."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F3ED]">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="hidden w-64 bg-stone-900 text-white md:block">
          <div className="p-6">
            <h1 className="font-serif text-xl font-semibold tracking-wide">
              <span className="text-[#df5612]">
                Luxe
              </span>
              Living
            </h1>

            <p className="mt-1 text-xs text-stone-400">
              Admin Dashboard
            </p>
          </div>

          <nav className="mt-6 px-4 space-y-1">

            <button
              onClick={() =>
                setActiveTab("products")
              }
              className={`cursor-pointer w-full px-4 py-3 text-left text-sm font-medium transition-colors ${
                activeTab === "products"
                  ? "bg-[#df5612] text-white"
                  : "text-stone-300 hover:bg-stone-800 hover:text-white"
              }`}
            >
              Products
            </button>

            <button
              onClick={() =>
                setActiveTab("orders")
              }
              className={`cursor-pointer w-full px-4 py-3 text-left text-sm font-medium transition-colors ${
                activeTab === "orders"
                  ? "bg-[#df5612] text-white"
                  : "text-stone-300 hover:bg-stone-800 hover:text-white"
              }`}
            >
              Orders
            </button>

            <button
              onClick={() =>
                setActiveTab("users")
              }
              className={`cursor-pointer w-full px-4 py-3 text-left text-sm font-medium transition-colors ${
                activeTab === "users"
                  ? "bg-[#df5612] text-white"
                  : "text-stone-300 hover:bg-stone-800 hover:text-white"
              }`}
            >
              Users
            </button>

          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">

          <div className="mb-8 flex justify-between items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#df5612] font-medium">
                Management
              </p>

              <h2 className="mt-1 text-3xl font-semibold text-stone-800 capitalize">
                {activeTab}
              </h2>

              <p className="mt-1 text-sm text-stone-500">
                Welcome back, Admin.
              </p>
            </div>

            {activeTab === "products" && (
              <button
                onClick={() => handleOpenModal()}
                className="bg-[#df5612] text-white text-sm px-4 py-2 hover:bg-[#c4490e] transition-colors font-medium"
              >
                + Add Product
              </button>
            )}
          </div>

          {loading ? (
            <div className="py-12 text-stone-500 text-sm">
              Loading data...
            </div>
          ) : error ? (
            <div className="py-6 text-red-600 text-sm">
              {error}
            </div>
          ) : (
            <>
              {/* Products Tab */}
              {activeTab === "products" && (
                <div className="bg-white shadow-sm border border-stone-200/60 overflow-hidden">

                  <table className="w-full text-left border-collapse text-sm">

                    <thead>
                      <tr className="border-b border-stone-200 bg-stone-50 text-xs text-stone-500 uppercase">

                        <th className="p-4">
                          Product
                        </th>

                        <th className="p-4">
                          Price
                        </th>

                        <th className="p-4">
                          Stock
                        </th>

                        <th className="p-4 text-right">
                          Actions
                        </th>

                      </tr>
                    </thead>

                    <tbody className="divide-y divide-stone-100">

                      {products.length === 0 ? (
                        <tr>
                          <td
                            colSpan={4}
                            className="p-4 text-center text-stone-400"
                          >
                            No products found.
                          </td>
                        </tr>
                      ) : (
                        products.map((product) => (
                          <tr
                            key={product.id}
                            className="hover:bg-stone-50/50"
                          >

                            <td className="p-4 font-medium text-stone-800 flex items-center gap-3">

                              {product.imageURL && (
                                <img
                                  src={product.imageURL}
                                  alt={product.title}
                                  className="w-10 h-10 object-cover rounded"
                                />
                              )}

                              {product.title}

                            </td>

                            <td className="p-4 font-semibold text-stone-900">
                              ${product.price}
                            </td>

                            <td className="p-4">
                              <span
                                className={`font-medium ${
                                  product.stock === 0
                                    ? "text-red-600"
                                    : product.stock <= 5
                                    ? "text-amber-600"
                                    : "text-green-600"
                                }`}
                              >
                                {product.stock}
                              </span>
                            </td>

                            <td className="p-4 text-right space-x-3">

                              <button
                                onClick={() =>
                                  handleOpenModal(product)
                                }
                                className="text-stone-600 hover:text-stone-900 text-xs font-medium"
                              >
                                Edit
                              </button>

                              <button
                                onClick={() =>
                                  handleDeleteProduct(
                                    String(product.id)
                                  )
                                }
                                className="text-red-600 hover:text-red-800 text-xs font-medium"
                              >
                                Delete
                              </button>

                            </td>

                          </tr>
                        ))
                      )}

                    </tbody>

                  </table>

                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div className="bg-white shadow-sm border border-stone-200/60 overflow-hidden">

                  <table className="w-full text-left border-collapse text-sm">

                    <thead>
                      <tr className="border-b border-stone-200 bg-stone-50 text-xs text-stone-500 uppercase">

                        <th className="p-4">
                          Order ID
                        </th>

                        <th className="p-4">
                          User
                        </th>

                        <th className="p-4">
                          Total
                        </th>

                        <th className="p-4">
                          Status
                        </th>

                      </tr>
                    </thead>

                    <tbody className="divide-y divide-stone-100">

                      {!orders ||
                      orders.length === 0 ? (
                        <tr>
                          <td
                            colSpan={4}
                            className="p-4 text-center text-stone-400"
                          >
                            No orders found.
                          </td>
                        </tr>
                      ) : (
                        orders.map((order: any) => (
                          <tr key={order.id}>

                            <td className="p-4 font-mono text-xs">
                              {order.id}
                            </td>

                            <td className="p-4">
                              {order.userEmail ||
                                order.user?.email ||
                                "N/A"}
                            </td>

                            <td className="p-4 font-semibold">
                              $
                              {order.totalAmount ??
                                order.total ??
                                0}
                            </td>

                            <td className="p-4">
                              <span className="px-2 py-1 text-xs bg-amber-50 text-amber-700 font-medium">
                                {order.status ||
                                  "PENDING"}
                              </span>
                            </td>

                          </tr>
                        ))
                      )}

                    </tbody>

                  </table>

                </div>
              )}

              {/* Users Tab */}
              {activeTab === "users" && (
                <div className="bg-white shadow-sm border border-stone-200/60 overflow-hidden">

                  <table className="w-full text-left border-collapse text-sm">

                    <thead>
                      <tr className="border-b border-stone-200 bg-stone-50 text-xs text-stone-500 uppercase">

                        <th className="p-4">
                          Email
                        </th>

                        <th className="p-4">
                          Role
                        </th>

                      </tr>
                    </thead>

                    <tbody className="divide-y divide-stone-100">

                      {!users ||
                      users.length === 0 ? (
                        <tr>
                          <td
                            colSpan={2}
                            className="p-4 text-center text-stone-400"
                          >
                            No users found.
                          </td>
                        </tr>
                      ) : (
                        users.map((u: any) => (
                          <tr key={u.id}>

                            <td className="p-4 font-medium text-stone-800">
                              {u.email || "N/A"}
                            </td>

                            <td className="p-4">

                              <span
                                className={`px-2 py-1 text-xs font-medium ${
                                  u.role === "ADMIN"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-stone-100 text-stone-600"
                                }`}
                              >
                                {u.role || "USER"}
                              </span>

                            </td>

                          </tr>
                        ))
                      )}

                    </tbody>

                  </table>

                </div>
              )}

            </>
          )}

        </main>
      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">

          <div className="bg-white max-w-lg w-full p-6 shadow-xl border border-stone-200 space-y-4">

            <h3 className="font-serif text-xl font-semibold text-stone-900">
              {editingProduct
                ? "Edit Product"
                : "Add New Product"}
            </h3>

            <form
              onSubmit={handleFormSubmit}
              className="space-y-4"
            >

              {/* Title */}
              <div>

                <label className="block text-xs uppercase font-medium text-stone-600 mb-1">
                  Title
                </label>

                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                  className="w-full border border-stone-300 p-2.5 text-sm focus:outline-none focus:border-[#df5612]"
                />

              </div>

              {/* Price + Stock */}
              <div className="grid grid-cols-2 gap-4">

                {/* Price */}
                <div>

                  <label className="block text-xs uppercase font-medium text-stone-600 mb-1">
                    Price ($)
                  </label>

                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price:
                          parseFloat(
                            e.target.value
                          ) || 0,
                      })
                    }
                    className="w-full border border-stone-300 p-2.5 text-sm focus:outline-none focus:border-[#df5612]"
                  />

                </div>

                {/* Stock */}
                <div>

                  <label className="block text-xs uppercase font-medium text-stone-600 mb-1">
                    Stock
                  </label>

                  <input
                    type="number"
                    required
                    min="0"
                    step="1"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        stock:
                          parseInt(
                            e.target.value
                          ) || 0,
                      })
                    }
                    className="w-full border border-stone-300 p-2.5 text-sm focus:outline-none focus:border-[#df5612]"
                  />

                </div>

              </div>

              {/* Category */}
              <div>

                <label className="block text-xs uppercase font-medium text-stone-600 mb-1">
                  Category
                </label>

                <select
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      categoryId:
                        e.target.value,
                    })
                  }
                  className="w-full border border-stone-300 p-2.5 text-sm focus:outline-none focus:border-[#df5612]"
                >

                  {categories.map((cat) => (
                    <option
                      key={cat.id}
                      value={cat.id}
                    >
                      {cat.name}
                    </option>
                  ))}

                </select>

              </div>

              {/* Image URL */}
              <div>

                <label className="block text-xs uppercase font-medium text-stone-600 mb-1">
                  Image URL
                </label>

                <input
                  type="url"
                  value={formData.imageURL}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      imageURL: e.target.value,
                    })
                  }
                  className="w-full border border-stone-300 p-2.5 text-sm focus:outline-none focus:border-[#df5612]"
                />

              </div>

              {/* Description */}
              <div>

                <label className="block text-xs uppercase font-medium text-stone-600 mb-1">
                  Description
                </label>

                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description:
                        e.target.value,
                    })
                  }
                  className="w-full border border-stone-300 p-2.5 text-sm focus:outline-none focus:border-[#df5612]"
                />

              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-2">

                <button
                  type="button"
                  onClick={() =>
                    setIsModalOpen(false)
                  }
                  className="px-4 py-2 text-sm text-stone-600 hover:text-stone-900 border border-stone-300"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 text-sm bg-[#df5612] text-white hover:bg-[#c4490e] transition-colors"
                >
                  {editingProduct
                    ? "Update Product"
                    : "Create Product"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
};