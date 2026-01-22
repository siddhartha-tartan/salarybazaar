import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { goToAuthLink } from "@/lib/authLinks";
import { Phone, User, Search, Menu, X, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AppLayoutProps {
  children: React.ReactNode;
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  onNavigate,
  currentPage 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-transparent selection:bg-blue-100 overflow-x-hidden">
      {/* Decorative Background Blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Top Header / Navbar */}
      <header className="sticky top-0 z-50 glass border-b-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo Section */}
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => onNavigate('home')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform duration-300">
              ₹
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900 leading-none tracking-tight group-hover:text-blue-900 transition-colors">Salary<span className="text-blue-600">Bazaar</span></span>
              <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Financial Wellness</span>
            </div>
          </div>

          {/* Center Navigation - Simplified to "Explore" & "Corporate" */}
          <nav className="hidden lg:flex items-center gap-2 p-1 bg-gray-100/50 rounded-full backdrop-blur-sm border border-white/20">
             <Button 
                variant="ghost" 
                onClick={() => onNavigate('marketplace')}
                className={`text-sm font-semibold h-9 px-6 rounded-full transition-all duration-300 ${currentPage === 'marketplace' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-white/50 hover:text-blue-600'}`}
             >
                <Search className="w-3.5 h-3.5 mr-2" />
                Explore Products
             </Button>
             
             <Button 
                variant="ghost" 
                onClick={() => onNavigate('corporate')}
                className={`text-sm font-semibold h-9 px-6 rounded-full transition-all duration-300 ${currentPage === 'corporate' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-600 hover:bg-white/50 hover:text-blue-600'}`}
             >
                For Corporates
             </Button>
          </nav>

          {/* Right Actions - Talk to Expert & Sign In */}
          <div className="flex items-center gap-4 lg:gap-6">
             {/* Talk to Expert Block */}
             <div className="hidden md:flex items-center gap-3 border-r border-gray-200/50 pr-6">
                <div className="text-right">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Talk to Expert</p>
                    <p className="text-sm font-bold text-gray-800">1800-570-3888</p>
                </div>
                <div className="w-9 h-9 bg-green-50/80 rounded-full flex items-center justify-center text-green-600 hover:bg-green-100 transition-colors cursor-pointer shadow-sm">
                    <Phone className="w-4 h-4 animate-pulse-slow" />
                </div>
             </div>

             {/* Sign In Block */}
             <div className="hidden md:flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button 
                        className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors group"
                    >
                        <div className="w-9 h-9 bg-gray-100/80 rounded-full flex items-center justify-center text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all shadow-sm">
                            <User className="w-4 h-4" />
                        </div>
                        <span className="hidden sm:inline">Sign In</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-72 p-2">
                    <div className="px-2 pb-2">
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Sign in as</p>
                    </div>
                    <DropdownMenuItem
                      onSelect={(e) => {
                        e.preventDefault();
                        goToAuthLink("employeeSignIn");
                      }}
                      className="rounded-xl py-2.5 focus:bg-blue-50"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                          <User className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900">Employee Sign In</span>
                          <span className="text-xs text-gray-500">For salaried users</span>
                        </div>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={(e) => {
                        e.preventDefault();
                        goToAuthLink("corporateLogin");
                      }}
                      className="rounded-xl py-2.5 focus:bg-indigo-50"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 w-9 h-9 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900">Corporate Login</span>
                          <span className="text-xs text-gray-500">For HR (new & existing)</span>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
             </div>

             {/* Mobile Sign In (Icon Only) */}
             <div className="md:hidden">
               <DropdownMenu>
                 <DropdownMenuTrigger asChild>
                   <button 
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                   >
                      <User className="w-6 h-6" />
                   </button>
                 </DropdownMenuTrigger>
                 <DropdownMenuContent align="end" className="w-72 p-2">
                   <div className="px-2 pb-2">
                     <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Sign in as</p>
                   </div>
                   <DropdownMenuItem
                     onSelect={(e) => {
                       e.preventDefault();
                       goToAuthLink("employeeSignIn");
                     }}
                     className="rounded-xl py-2.5 focus:bg-blue-50"
                   >
                     <div className="flex items-start gap-3">
                       <div className="mt-0.5 w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                         <User className="w-4 h-4" />
                       </div>
                       <div className="flex flex-col">
                         <span className="font-semibold text-gray-900">Employee Sign In</span>
                         <span className="text-xs text-gray-500">For salaried users</span>
                       </div>
                     </div>
                   </DropdownMenuItem>
                   <DropdownMenuItem
                     onSelect={(e) => {
                       e.preventDefault();
                       goToAuthLink("corporateLogin");
                     }}
                     className="rounded-xl py-2.5 focus:bg-indigo-50"
                   >
                     <div className="flex items-start gap-3">
                       <div className="mt-0.5 w-9 h-9 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
                         <Building2 className="w-4 h-4" />
                       </div>
                       <div className="flex flex-col">
                         <span className="font-semibold text-gray-900">Corporate Login</span>
                         <span className="text-xs text-gray-500">For HR (new & existing)</span>
                       </div>
                     </div>
                   </DropdownMenuItem>
                 </DropdownMenuContent>
               </DropdownMenu>
             </div>

             {/* Mobile Menu Toggle */}
             <button 
               className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
             >
               {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
             </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-gray-200 fixed top-20 left-0 right-0 z-40 overflow-hidden"
          >
            <div className="p-4 space-y-4">
              <Button 
                variant="ghost" 
                onClick={() => { onNavigate('marketplace'); setIsMobileMenuOpen(false); }}
                className="w-full justify-start text-base font-semibold h-12"
              >
                <Search className="w-5 h-5 mr-3" />
                Explore Products
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => { onNavigate('corporate'); setIsMobileMenuOpen(false); }}
                className="w-full justify-start text-base font-semibold h-12"
              >
                For Corporates
              </Button>
              <div className="h-px bg-gray-100 my-2" />
              <div className="flex items-center justify-between p-2">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                        <Phone className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase">Expert Helpline</p>
                        <p className="text-sm font-bold text-gray-800">1800-570-3888</p>
                    </div>
                 </div>
              </div>
              <div className="space-y-2 pt-2">
                <Button
                  className="w-full bg-blue-600 text-white h-12 text-base font-bold rounded-xl"
                  onClick={() => goToAuthLink("employeeSignIn")}
                >
                  Employee Sign In
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    className="h-12 rounded-xl"
                    onClick={() => goToAuthLink("corporateLogin")}
                  >
                    Corporate Login
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#0A1023] text-gray-400 py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-lg">₹</div>
                <span className="text-xl font-bold text-white">Salary<span className="text-blue-500">Bazaar</span></span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500">
              Salary Bazaar is India's best platform for salary-linked financial products. We bridge the gap between employees and financial institutions.
            </p>
            <div className="text-sm">
                <p className="font-semibold text-white">CIN No. U74900HR2011PTC044581</p>
                <p>© Copyright 2014-{new Date().getFullYear()} SalaryBazaar.com</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">General</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Partner Banks</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contact Support</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Products</h4>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => onNavigate('salary-accounts')} className="hover:text-blue-400 transition-colors">Salary Accounts</button></li>
              <li><button onClick={() => onNavigate('investments')} className="hover:text-blue-400 transition-colors">Fixed Deposits</button></li>
              <li><button onClick={() => onNavigate('investments')} className="hover:text-blue-400 transition-colors">NPS Retirement</button></li>
              <li><button onClick={() => onNavigate('investments')} className="hover:text-blue-400 transition-colors">Mutual Funds</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Use</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Disclaimer</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Grievance Redressal</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-gray-800 text-xs text-center text-gray-600">
          *Standard T&C Apply. All offers are subject to the discretion of the partner banks/financial institutions.
        </div>
      </footer>
    </div>
  );
};
