import React from "react";
import bgHome from "../assets/images/home-bg.jpg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const Home: React.FC = () => {
  return (
    <>
      <section
        className="relative min-h-[calc(100vh-80px)] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${bgHome})` }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 w-full px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-white/80"
            >
              Welcome to LuxeLiving
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="mb-5 text-4xl font-bold leading-tight text-white md:text-6xl"
            >
              Transform Your Space
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              className="mb-8 text-lg leading-relaxed text-stone-100"
            >
              Discover furniture that makes your home feel truly yours.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
            >
              <Link
                to="/products"
                className="inline-block bg-[#df5612] px-7 py-3 font-medium text-white transition hover:bg-[#c94d0f] cursor-pointer"
              >
                Shop Now
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};