import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-amber-950 text-stone-300">
      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* Main Footer */}
        <div className="grid gap-10 md:grid-cols-3">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-semibold tracking-wide text-white">
              LuxeLiving
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-6 text-stone-400">
              Thoughtful furniture for beautiful everyday spaces.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>

            <nav className="mt-4 flex flex-col gap-3 text-sm">
              <Link
                to="/"
                className="transition-colors hover:text-[#df5612]"
              >
                Home
              </Link>

              <Link
                to="/about"
                className="transition-colors hover:text-[#df5612]"
              >
                About Us
              </Link>

              <Link
                to="/products"
                className="transition-colors hover:text-[#df5612]"
              >
                Products
              </Link>
            </nav>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Customer Care
            </h3>

            <nav className="mt-4 flex flex-col gap-3 text-sm">
              <Link
                to="/contact"
                className="transition-colors hover:text-[#df5612]"
              >
                Contact
              </Link>

              <Link
                to="/orders"
                className="transition-colors hover:text-[#df5612]"
              >
                My Orders
              </Link>

              <Link
                to="/privacy"
                className="transition-colors hover:text-[#df5612]"
              >
                Privacy Policy
              </Link>
            </nav>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-stone-700 pt-6 text-center">
          <p className="text-xs text-stone-500">
            © 2026 LuxeLiving. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};