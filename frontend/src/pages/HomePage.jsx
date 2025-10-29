import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { url } from "../../config/config";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const currency = useMemo(() => new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }), []);

  // fetch products
  const getProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${url}/api/products`);
      setProducts(res.data.message || []);
    } catch (err) {
      console.log("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.log("Error deleting product:", err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return products;
    return products.filter((p) => `${p.name} ${p.price}`.toLowerCase().includes(term));
  }, [products, search]);

  return (
    <div className="min-h-screen bg-[#0b1120] text-white px-6 sm:px-10 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-sky-400 flex items-center gap-2">Products</h1>
          <p className="text-sm text-gray-400">Browse, update, and manage your catalog</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-6">
          <div className="flex-1">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-[#0f172a] border border-gray-700 rounded-xl px-4 py-2.5 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-600"
            />
          </div>
          <div className="text-sm text-gray-400">
            {filtered.length} result{filtered.length === 1 ? "" : "s"}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-[#111935] h-72 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-[#0f172a] rounded-2xl border border-gray-800">
            <div className="text-5xl mb-3">🔍</div>
            <h3 className="text-xl font-semibold text-gray-200">No products found</h3>
            <p className="text-gray-400 mt-1">Try adjusting your search or add a new product.</p>
            <Link to="/create" className="mt-6 inline-flex items-center justify-center bg-sky-600 hover:bg-sky-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition">
              Add Product
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <div
                key={p._id}
                className="group bg-[#0f172a] border border-gray-800 rounded-2xl overflow-hidden hover:border-sky-700 transition-shadow shadow hover:shadow-sky-900/20"
              >
                <div className="relative">
                  <img src={p.image} alt={p.name} className="w-full h-56 object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-100">{p.name}</h2>
                      <p className="text-sky-400 font-medium">{currency.format(Number(p.price || 0))}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Link
                      to={`/create/${p._id}`}
                      className="flex-1 inline-flex items-center justify-center bg-sky-600 hover:bg-sky-700 px-3 py-2 rounded-lg text-white transition"
                      title="Edit"
                    >
                      ✏️ Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="inline-flex items-center justify-center bg-rose-600 hover:bg-rose-700 px-3 py-2 rounded-lg text-white transition"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;