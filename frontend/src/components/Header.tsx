import { useState } from "react";
import { ShoppingCart, Sofa, User, Menu, X, LogOut } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Products", path: "/products" },
  { name: "AdminDashboard", path: "/admin" },
];
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { user, logout } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-[#F7F3ED]/95 shadow-sm backdrop-blur-md">
      {/* Main Header */}
      <div className="flex items-center justify-between px-6 py-3 lg:px-10">
        {/* Logo */}
        <Link to="/" className="select-none">
          <div className="flex items-center gap-2">
            <Sofa className="h-6 w-6 text-[#df5612] transition-transform duration-300 hover:rotate-[-8deg]" />

            <span className="font-serif text-2xl tracking-wide">
              <span className="font-semibold text-[#df5612]">Luxe</span>

              <span className="font-light text-stone-800">Living</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="
                relative text-base font-medium text-stone-700
                transition-colors duration-300
                hover:text-[#df5612]

                after:absolute
                after:-bottom-2
                after:left-0
                after:h-[2px]
                after:w-0
                after:bg-[#df5612]
                after:transition-all
                after:duration-300

                hover:after:w-full
              "
            >
              {item.name}
            </Link>
          ))}

          {/* My Orders - USER only */}
          {user&& (
            <Link
              to="/orders"
              className="
                relative text-base font-medium text-stone-700
                transition-colors duration-300
                hover:text-[#df5612]

                after:absolute
                after:-bottom-2
                after:left-0
                after:h-[2px]
                after:w-0
                after:bg-[#df5612]
                after:transition-all
                after:duration-300

                hover:after:w-full
              "
            >
              My Orders
            </Link>
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-6 lg:flex">
          {/* Icons */}
          <div className="flex items-center gap-5">
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-5 w-5 text-stone-700 transition-all duration-300 hover:scale-110 hover:text-[#df5612]" />

              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#df5612] text-[10px] text-white">
                {cartCount}
              </span>
            </Link>

            {/* Profile Dropdown */}
            {user && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                  className="cursor-pointer"
                  aria-label="Open profile menu"
                  aria-expanded={isProfileOpen}
                >
                  <User className="h-5 w-5 text-stone-700 transition-all duration-300 hover:scale-110 hover:text-[#df5612]" />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 top-8 z-50 w-44 bg-white py-2 shadow-lg ring-1 ring-stone-200">
                    <Link
                      to="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="block px-4 py-2.5 text-sm text-stone-700 transition-colors hover:bg-stone-50 hover:text-[#df5612]"
                    >
                      Profile
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-stone-700 transition-colors hover:bg-stone-50 hover:text-[#df5612]"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sign In / Sign Up - Guest only */}
          {!user && (
            <Link
              to="/login"
              className="
                cursor-pointer
                bg-[#df5612]
                px-5
                py-2.5
                text-sm
                font-medium
                text-white
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#c94d0f]
                hover:shadow-md
              "
            >
              Sign In / Sign Up
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="cursor-pointer text-stone-700 transition-colors hover:text-[#df5612] lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          overflow-hidden
          border-t
          border-stone-200/70
          bg-[#F7F3ED]
          transition-all
          duration-300
          lg:hidden
          ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <nav className="flex flex-col px-6 py-4">
          {/* Mobile Navigation */}
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={closeMenu}
              className="
                border-b
                border-stone-200
                py-3
                text-sm
                font-medium
                text-stone-700
                transition-colors
                hover:text-[#df5612]
              "
            >
              {item.name}
            </Link>
          ))}

          {/* My Orders - USER only */}
          {user?.role === "USER" && (
            <Link
              to="/orders"
              onClick={closeMenu}
              className="
                border-b
                border-stone-200
                py-3
                text-sm
                font-medium
                text-stone-700
                transition-colors
                hover:text-[#df5612]
              "
            >
              My Orders
            </Link>
          )}

          {/* Mobile Actions */}
          <div className="flex items-center gap-5 py-4">
            <Link to="/cart" onClick={closeMenu} className="relative">
              <ShoppingCart className="h-5 w-5 text-stone-700 transition-colors hover:text-[#df5612]" />

              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#df5612] text-[10px] text-white">
                {cartCount}
              </span>
            </Link>

            {/* Profile */}
            <Link to="/profile" onClick={closeMenu}>
              <User className="h-5 w-5 text-stone-700 transition-colors hover:text-[#df5612]" />
            </Link>
            {/* Logout - Logged in users only */}
            {user && (
              <button
                type="button"
                onClick={handleLogout}
                className="flex cursor-pointer items-center gap-2 text-sm font-medium text-stone-700 transition-colors hover:text-[#df5612]"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            )}

            {/* Sign In - Guest only */}
            {!user && (
              <Link
                to="/login"
                onClick={closeMenu}
                className="
                  ml-auto
                  cursor-pointer
                  bg-[#df5612]
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-[#c94d0f]
                "
              >
                Sign In
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
