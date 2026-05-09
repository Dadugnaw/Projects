"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Package, Plus, Loader2, Trash2, Edit, DollarSign } from "lucide-react";

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", duration_days: 30, price: 0 });
  const [submitting, setSubmitting] = useState(false);

  const fetchPackages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/packages");
      setPackages(res.data);
    } catch (error) {
      console.error("Failed to fetch packages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleCreatePackage = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post("http://localhost:5000/api/admin/packages", formData);
      setShowModal(false);
      setFormData({ name: "", duration_days: 30, price: 0 });
      fetchPackages();
    } catch (error) {
      alert("Failed to create package");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Package className="w-8 h-8 text-purple-400" />
            Packages & Billing
          </h1>
          <p className="text-slate-400 mt-1">Configure pricing and membership tiers.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-purple-500/20"
        >
          <Plus className="w-4 h-4" />
          Create Package
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full h-64 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
          </div>
        ) : (
          packages.map((pkg) => (
            <div key={pkg.id} className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-colors">
              <div className="p-6 border-b border-slate-800">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-md ${pkg.isActive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                    {pkg.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex items-baseline gap-1 text-white">
                  <span className="text-3xl font-bold">${pkg.price}</span>
                  <span className="text-slate-400 text-sm">/ {pkg.duration_days} days</span>
                </div>
              </div>
              <div className="bg-slate-800/20 p-4 flex justify-end gap-3">
                <button className="p-2 text-slate-400 hover:text-blue-400 transition-colors bg-slate-800/50 hover:bg-slate-800 rounded-lg">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-400 hover:text-red-400 transition-colors bg-slate-800/50 hover:bg-slate-800 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
        
        {packages.length === 0 && !loading && (
           <div className="col-span-full p-8 text-center text-slate-500 border border-dashed border-slate-700 rounded-2xl">
             No packages created yet. Click "Create Package" to begin.
           </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-6">Create New Package</h2>
            <form onSubmit={handleCreatePackage} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Package Name</label>
                <input 
                  type="text" required placeholder="e.g. Summer Special"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Duration (Days)</label>
                  <input 
                    type="number" required min="1"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                    value={formData.duration_days} onChange={e => setFormData({...formData, duration_days: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Price ($)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="w-4 h-4 text-slate-500" />
                    </div>
                    <input 
                      type="number" required min="0" step="0.01"
                      className="w-full pl-9 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                      value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium transition-colors flex items-center justify-center">
                  {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
