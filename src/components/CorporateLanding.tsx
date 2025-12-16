import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

export const CorporateLanding: React.FC = () => {
  return (
    <div className="p-8 min-h-[calc(100vh-80px)] flex flex-col items-center justify-center relative">
       {/* Decorative Background Elements */}
       <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
       <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

       <motion.div 
         initial={{ scale: 0.9, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         transition={{ duration: 0.5 }}
         className="glass p-8 rounded-3xl shadow-2xl border border-white/40 max-w-md w-full text-center relative z-10"
       >
          <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-white text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-inner border border-white/60">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">Corporate Portal</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">Manage employee benefits and salary accounts efficiently with our unified dashboard.</p>
          <div className="space-y-5">
              <div className="text-left space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Work Email</label>
                  <input 
                    type="email" 
                    placeholder="admin@company.com" 
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all focus:bg-white" 
                  />
              </div>
              <Button className="w-full bg-blue-600 text-white font-semibold py-6 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 hover:scale-[1.02] active:scale-[0.98]">
                  Login as Admin
              </Button>
              <div className="pt-6 border-t border-gray-100/50">
                  <p className="text-sm text-gray-500">
                      New to Salary Bazaar? <a href="#" className="text-blue-600 font-semibold hover:underline decoration-2 underline-offset-2">Contact Sales</a>
                  </p>
              </div>
          </div>
       </motion.div>
    </div>
  );
};
