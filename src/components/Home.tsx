import React, { useState, useEffect, useRef } from 'react';
import { 
  Building2, Briefcase, PiggyBank, TrendingUp, ShieldCheck, 
  Phone, Landmark, CreditCard, Banknote, Home as HomeIcon, 
  Repeat, Zap, Gauge, Receipt, Smartphone, Lightbulb, 
  Scroll, Heart, Shield, Car, Umbrella, Search, 
  ChevronRight, X, ArrowUpRight, Sparkles, User, Users,
  CheckCircle2, ArrowRight, Percent, Clock
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from 'framer-motion';

interface HomeProps {
  onNavigate: (page: string) => void;
}

// --- Data Definitions ---
const ALL_PRODUCTS = [
  { id: 'sal-acc', label: 'Salary Accounts', category: 'Accounts', icon: Building2, subLabel: 'HDFC, Axis, SBI', path: 'salary-accounts', tag: 'Top Rated' },
  { id: 'fd', label: 'Fixed Deposits', category: 'Invest', icon: PiggyBank, subLabel: 'Up to 8.60% p.a.', path: 'investments' },
  { id: 'nps', label: 'NPS (Pension)', category: 'Invest', icon: Landmark, subLabel: 'Tax Saving', path: 'investments' },
  { id: 'mutual-funds', label: 'Mutual Funds', category: 'Invest', icon: TrendingUp, subLabel: '0% Commission', path: 'investments' },
  { id: 'personal-loan', label: 'Personal Loan', category: 'Loans', icon: Banknote, subLabel: 'Rates from 10.49%', path: 'salary-accounts' },
  { id: 'credit-cards', label: 'Credit Cards', category: 'Cards', icon: CreditCard, subLabel: 'Lifetime Free Options', path: 'salary-accounts' },
  { id: 'home-loan', label: 'Home Loan', category: 'Loans', icon: HomeIcon, subLabel: 'Lowest Interest Rates', path: 'salary-accounts' },
  { id: 'credit-score', label: 'Credit Score', category: 'Utility', icon: Gauge, subLabel: 'Check for Free', path: 'home' },
  { id: 'health-ins', label: 'Health Insurance', category: 'Insurance', icon: Heart, subLabel: 'Cashless Claims', path: 'home' },
  { id: 'term-life', label: 'Term Life', category: 'Insurance', icon: Shield, subLabel: 'Secure Family', path: 'home' },
];

const POPULAR_SEARCHES = ['Salary Account', 'Fixed Deposit', 'HDFC Bank', 'Credit Score'];
const BRANDS = [
  { name: 'HDFC', color: 'bg-blue-600' },
  { name: 'AXIS', color: 'bg-red-700' },
  { name: 'SBI', color: 'bg-blue-400' },
  { name: 'ICICI', color: 'bg-orange-600' },
  { name: 'KOTAK', color: 'bg-red-600' },
  { name: 'BAJAJ', color: 'bg-blue-800' },
  { name: 'TATA', color: 'bg-blue-900' },
  { name: 'LIC', color: 'bg-yellow-500' },
  { name: 'BOB', color: 'bg-orange-500' }
];

// --- Components ---

const ProductCard = ({ icon: Icon, label, subLabel, tag, onClick, colorClass = "text-blue-600", bgClass = "bg-blue-50" }: any) => (
  <motion.button 
    whileHover={{ y: -5, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    onClick={onClick}
    className="group flex flex-col items-start p-5 rounded-2xl glass-card text-left relative overflow-hidden w-full h-full"
  >
    <div className={`absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
      <ArrowUpRight className="w-5 h-5 text-gray-400" />
    </div>
    
    <div className={`p-3.5 rounded-xl mb-4 ${bgClass} ${colorClass} shadow-inner group-hover:scale-110 transition-transform duration-300`}>
      <Icon className="w-7 h-7" strokeWidth={1.5} />
    </div>
    
    <div className="flex items-center gap-2 mb-1 w-full">
      <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors">
        {label}
      </h3>
      {tag && (
        <Badge variant="secondary" className="text-[10px] h-5 px-1.5 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 border-none shadow-sm">
          {tag}
        </Badge>
      )}
    </div>
    
    <p className="text-sm text-gray-500 font-medium">
      {subLabel}
    </p>
  </motion.button>
);

const SectionHeader = ({ title, icon: Icon, color }: any) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex items-center gap-3 mb-4 sm:mb-6 mt-2 pb-2"
  >
    <div className={`p-2 rounded-lg ${color} bg-opacity-10 backdrop-blur-sm`}>
      <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
    </div>
    <h2 className="text-lg sm:text-xl font-bold text-gray-900">{title}</h2>
  </motion.div>
);

const MobileCarousel = ({ children }: { children: React.ReactNode }) => (
  <div className="-mx-4 px-4 overflow-x-auto no-scrollbar scroll-touch">
    <div className="flex w-max gap-4 snap-x snap-mandatory">
      {children}
    </div>
  </div>
);

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState(ALL_PRODUCTS);
  const [userType, setUserType] = useState<'individual' | 'corporate'>('individual');
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults(ALL_PRODUCTS);
      return;
    }
    const lowerQuery = searchQuery.toLowerCase();
    const filtered = ALL_PRODUCTS.filter(p => 
      p.label.toLowerCase().includes(lowerQuery) || 
      p.category.toLowerCase().includes(lowerQuery) ||
      p.subLabel.toLowerCase().includes(lowerQuery)
    );
    setSearchResults(filtered);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProductClick = (path: string) => {
    onNavigate(path);
    setIsSearchOpen(false);
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      
      {/* Expanded Hero Section */}
      <section className="relative pt-16 pb-20 z-40 overflow-visible">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
           <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-100/40 rounded-full mix-blend-multiply filter blur-[100px] animate-blob"></div>
           <div className="absolute top-0 -right-40 w-[500px] h-[500px] bg-purple-100/40 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000"></div>
           <div className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] bg-indigo-100/40 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left Column: Text & Search */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
               India's One Stop Platform for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Accounts, Deposits & Investments</span>
            </h1>
            
            <p className="text-base md:text-lg text-gray-600 mb-6 max-w-lg leading-relaxed">
               One Stop for all Financial Solutions. Quick, easy & hassle free access to the best financial products.
            </p>

            {/* User Journey Switcher */}
            <div className="bg-white/70 backdrop-blur-md p-1 rounded-full inline-flex mb-6 border border-white/60 shadow-lg shadow-blue-100/50">
              <button 
                onClick={() => setUserType('individual')}
                className={`px-5 py-1.5 rounded-full text-sm font-bold transition-all duration-300 ${userType === 'individual' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'}`}
              >
                For Individuals
              </button>
              <button 
                 onClick={() => setUserType('corporate')}
                 className={`px-5 py-1.5 rounded-full text-sm font-bold transition-all duration-300 ${userType === 'corporate' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'}`}
              >
                For Corporates
              </button>
            </div>

            {/* Intelligent Search Bar */}
            <div ref={searchRef} className="w-full max-w-lg relative group">
              <div className={`
                glass p-1.5 rounded-xl bg-white/80
                flex items-center gap-3 transition-all duration-300 relative z-50
                ${isSearchOpen ? 'ring-4 ring-blue-100 border-blue-400/50 shadow-blue-100/50 transform scale-[1.01]' : 'hover:border-blue-300/50 hover:shadow-xl'}
              `}>
                <div className="pl-3 text-gray-400">
                  <Search className="w-5 h-5" />
                </div>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  placeholder={userType === 'corporate' ? "Search 'Corporate Salary'..." : "Search 'Salary Account', 'FD'..."} 
                  className="flex-1 h-11 outline-none text-gray-800 placeholder:text-gray-400 text-base bg-transparent font-medium"
                />
                <Button className="rounded-lg h-11 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30">
                  Search
                </Button>
              </div>

              {/* EXPANDING SEARCH RESULTS */}
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden z-[100]"
                  >
                    {searchQuery === '' && (
                      <div className="p-6">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-1">Trending Searches</p>
                        <div className="flex flex-wrap gap-3">
                          {POPULAR_SEARCHES.map(term => (
                            <button 
                              key={term}
                              onClick={() => setSearchQuery(term)}
                              className="px-4 py-2 bg-gray-50/50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-xl text-sm font-medium transition-colors border border-gray-100"
                            >
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {searchQuery !== '' && (
                      <div className="max-h-[350px] overflow-y-auto custom-scrollbar p-3">
                         {searchResults.map((item) => (
                            <button 
                              key={item.id}
                              onClick={() => handleProductClick(item.path)}
                              className="flex items-center gap-4 p-3 w-full hover:bg-blue-50/50 rounded-xl transition-colors text-left group border border-transparent hover:border-blue-100/50"
                            >
                              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition-colors shadow-sm">
                                <item.icon className="w-6 h-6" />
                              </div>
                              <div>
                                <p className="font-bold text-gray-900 text-base group-hover:text-blue-700">{item.label}</p>
                                <p className="text-sm text-gray-500">{item.subLabel}</p>
                              </div>
                            </button>
                         ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Column: Orbiting Brands Visualization */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex justify-center items-center relative h-[400px]"
          >
             {/* Central Hub */}
             <div className="relative z-20 w-24 h-24 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-blue-50">
                <ShieldCheck className="w-10 h-10 text-blue-600" />
                <div className="absolute -bottom-8 whitespace-nowrap bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-600 shadow-sm border border-white/50">
                   Trusted Partners
                </div>
             </div>

             {/* Orbit Rings */}
             <div className="absolute border border-blue-200/60 rounded-full w-[220px] h-[220px] animate-[spin_20s_linear_infinite]" />
             <div className="absolute border border-indigo-200/40 rounded-full w-[360px] h-[360px] animate-[spin_35s_linear_infinite_reverse]" />

             {/* Inner Orbit Icons */}
             {BRANDS.slice(0, 4).map((brand, idx) => {
                const angle = (idx * (360 / 4)) * (Math.PI / 180);
                const radius = 110; // Half of w-[220px]
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                return (
                   <motion.div
                      key={brand.name}
                      className="absolute z-20"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      style={{ width: '100%', height: '100%', position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                   >
                      <motion.div 
                        className={`w-12 h-12 rounded-full ${brand.color} text-white flex items-center justify-center font-bold text-xs shadow-lg border-2 border-white transform hover:scale-125 transition-transform cursor-pointer`}
                        style={{ transform: `translate(${x}px, ${y}px)` }}
                      >
                         <motion.span animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                            {brand.name.substring(0, 2)}
                         </motion.span>
                      </motion.div>
                   </motion.div>
                )
             })}

             {/* Outer Orbit Icons */}
             {BRANDS.slice(4, 9).map((brand, idx) => {
                const angle = (idx * (360 / 5)) * (Math.PI / 180);
                const radius = 180; // Half of w-[360px]
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                return (
                   <motion.div
                      key={brand.name}
                      className="absolute z-10"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                      style={{ width: '100%', height: '100%', position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                   >
                      <motion.div 
                        className={`w-10 h-10 rounded-full bg-white text-gray-600 flex items-center justify-center font-bold text-[10px] shadow-md border border-gray-100 transform hover:scale-125 transition-transform cursor-pointer`}
                        style={{ transform: `translate(${x}px, ${y}px)` }}
                      >
                         <motion.span animate={{ rotate: 360 }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }}>
                            {brand.name}
                         </motion.span>
                      </motion.div>
                   </motion.div>
                )
             })}
          </motion.div>

        </div>
      </section>

      {/* Main Content Area */}
      {userType === 'individual' ? (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-12">
          
          {/* Priority 1: Salary & Banking (The Core) */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="relative z-10"
          >
            <SectionHeader title="Maximize Your Salary" icon={Building2} color="bg-blue-500 text-blue-500" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 min-w-0">
               {/* Hero Feature Card - Drives conversion for the main product */}
               <motion.div 
                 whileHover={{ y: -5, scale: 1.01 }}
                 className="sm:col-span-2 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group cursor-pointer border border-blue-500/30 min-h-[280px] flex flex-col justify-between w-full min-w-0" 
                 onClick={() => onNavigate('salary-accounts')}
               >
                  <div className="relative z-10 flex flex-col justify-between h-full min-w-0">
                     <div>
                       <div className="flex items-center gap-2 mb-3">
                         <Badge className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border-white/20 shadow-sm">Zero Balance</Badge>
                         <Badge className="bg-emerald-500/20 text-emerald-200 border-none shadow-sm">High Interest</Badge>
                       </div>
                       <h3 className="text-2xl font-bold mb-2">Find Your Perfect Salary Account</h3>
                       <p className="text-blue-100 text-sm max-w-md leading-relaxed">
                         Don't settle for less. Compare exclusive employee benefits, overdraft facilities, and rewards from HDFC, Axis, and SBI.
                       </p>
                     </div>
                     <div className="mt-6">
                        <Button variant="secondary" className="bg-white text-blue-700 hover:bg-blue-50 border-none font-semibold h-10 px-6 shadow-lg shadow-black/10 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto">
                          Compare & Apply <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                     </div>
                  </div>
                  {/* Abstract Decor */}
                  <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4 transition-transform duration-700 group-hover:scale-110">
                     <Building2 className="w-64 h-64" />
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
               </motion.div>

               {/* Mobile: swipeable cards */}
               <div className="sm:hidden">
                 <MobileCarousel>
                   <div className="w-[82vw] max-w-[340px] snap-start shrink-0">
                     <ProductCard 
                       icon={CreditCard} label="Credit Cards" subLabel="Lifetime Free & Cashback" 
                       colorClass="text-purple-600" bgClass="bg-purple-50"
                       onClick={() => onNavigate('salary-accounts')} 
                     />
                   </div>
                   <div className="w-[82vw] max-w-[340px] snap-start shrink-0">
                     <ProductCard 
                       icon={Gauge} label="Credit Score" subLabel="Check Report for Free" 
                       colorClass="text-emerald-600" bgClass="bg-emerald-50"
                       onClick={() => onNavigate('home')} 
                     />
                   </div>
                 </MobileCarousel>
               </div>

               {/* Desktop/tablet: normal grid cards */}
               <div className="hidden sm:block">
                 <ProductCard 
                   icon={CreditCard} label="Credit Cards" subLabel="Lifetime Free & Cashback" 
                   colorClass="text-purple-600" bgClass="bg-purple-50"
                   onClick={() => onNavigate('salary-accounts')} 
                 />
               </div>
               <div className="hidden sm:block">
                 <ProductCard 
                   icon={Gauge} label="Credit Score" subLabel="Check Report for Free" 
                   colorClass="text-emerald-600" bgClass="bg-emerald-50"
                   onClick={() => onNavigate('home')} 
                 />
               </div>
            </div>
          </motion.div>

          {/* Priority 2: Investments (Wealth Creation) */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
          >
            <SectionHeader title="Smart Investments" icon={TrendingUp} color="bg-green-500 text-green-500" />
            {/* Mobile: swipeable carousel */}
            <div className="sm:hidden">
              <MobileCarousel>
                <div className="w-[76vw] max-w-[320px] snap-start shrink-0">
                  <ProductCard 
                    icon={PiggyBank} label="Fixed Deposits" subLabel="Higher rates for Corporates" tag="Safe"
                    colorClass="text-green-600" bgClass="bg-green-50"
                    onClick={() => onNavigate('investments')} 
                  />
                </div>
                <div className="w-[76vw] max-w-[320px] snap-start shrink-0">
                  <ProductCard 
                    icon={Landmark} label="NPS (Pension)" subLabel="Save Tax up to ₹50k" 
                    colorClass="text-teal-600" bgClass="bg-teal-50"
                    onClick={() => onNavigate('investments')} 
                  />
                </div>
                <div className="w-[76vw] max-w-[320px] snap-start shrink-0">
                  <ProductCard 
                    icon={TrendingUp} label="Mutual Funds" subLabel="Direct Plans, 0% Comm." 
                    colorClass="text-emerald-600" bgClass="bg-emerald-50"
                    onClick={() => onNavigate('investments')} 
                  />
                </div>
                <div className="w-[76vw] max-w-[320px] snap-start shrink-0">
                  <ProductCard 
                    icon={Scroll} label="Digital Gold" subLabel="Buy, Sell or SIP" 
                    colorClass="text-amber-500" bgClass="bg-amber-50"
                    onClick={() => onNavigate('investments')} 
                  />
                </div>
              </MobileCarousel>
            </div>

            {/* Desktop/tablet grid */}
            <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6">
              <ProductCard 
                icon={PiggyBank} label="Fixed Deposits" subLabel="Higher rates for Corporates" tag="Safe"
                colorClass="text-green-600" bgClass="bg-green-50"
                onClick={() => onNavigate('investments')} 
              />
              <ProductCard 
                icon={Landmark} label="NPS (Pension)" subLabel="Save Tax up to ₹50k" 
                colorClass="text-teal-600" bgClass="bg-teal-50"
                onClick={() => onNavigate('investments')} 
              />
              <ProductCard 
                icon={TrendingUp} label="Mutual Funds" subLabel="Direct Plans, 0% Comm." 
                colorClass="text-emerald-600" bgClass="bg-emerald-50"
                onClick={() => onNavigate('investments')} 
              />
              <ProductCard 
                icon={Scroll} label="Digital Gold" subLabel="Buy, Sell or SIP" 
                colorClass="text-amber-500" bgClass="bg-amber-50"
                onClick={() => onNavigate('investments')} 
              />
            </div>
          </motion.div>

          {/* Priority 3: Loans (Need Money?) */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.3 }}
          >
             <SectionHeader title="Instant Funds" icon={Banknote} color="bg-orange-500 text-orange-500" />
             {/* Mobile: swipeable carousel */}
             <div className="sm:hidden">
               <MobileCarousel>
                 <div className="w-[76vw] max-w-[320px] snap-start shrink-0">
                   <ProductCard 
                     icon={Banknote} label="Personal Loan" subLabel="Approval in 5 mins" 
                     onClick={() => onNavigate('salary-accounts')} 
                   />
                 </div>
                 <div className="w-[76vw] max-w-[320px] snap-start shrink-0">
                   <ProductCard 
                     icon={HomeIcon} label="Home Loan" subLabel="Balance Transfer Offers" 
                     onClick={() => onNavigate('salary-accounts')} 
                   />
                 </div>
                 <div className="w-[76vw] max-w-[320px] snap-start shrink-0">
                   <ProductCard 
                     icon={Briefcase} label="Business Loan" subLabel="Collateral Free Options" 
                     onClick={() => onNavigate('salary-accounts')} 
                   />
                 </div>
                 <div className="w-[76vw] max-w-[320px] snap-start shrink-0">
                   <ProductCard 
                     icon={Car} label="Car Loan" subLabel="Up to 100% On-Road Funding" 
                     onClick={() => onNavigate('salary-accounts')} 
                   />
                 </div>
               </MobileCarousel>
             </div>

             {/* Desktop/tablet grid */}
             <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6">
               <ProductCard 
                 icon={Banknote} label="Personal Loan" subLabel="Approval in 5 mins" 
                 onClick={() => onNavigate('salary-accounts')} 
               />
               <ProductCard 
                 icon={HomeIcon} label="Home Loan" subLabel="Balance Transfer Offers" 
                 onClick={() => onNavigate('salary-accounts')} 
               />
               <ProductCard 
                 icon={Briefcase} label="Business Loan" subLabel="Collateral Free Options" 
                 onClick={() => onNavigate('salary-accounts')} 
               />
               <ProductCard 
                 icon={Car} label="Car Loan" subLabel="Up to 100% On-Road Funding" 
                 onClick={() => onNavigate('salary-accounts')} 
               />
             </div>
          </motion.div>

        </section>
      ) : (
        /* Corporate View */
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.5 }}
             className="glass rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden"
           >
               {/* Background Glow */}
               <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
               <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

               <div className="flex-1 space-y-6 relative z-10">
                  <Badge className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200 px-3 py-1">Corporate Portal</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">Empower Your Workforce with Financial Wellness</h2>
                  <p className="text-gray-500 text-lg leading-relaxed">
                    A unified dashboard to manage salary disbursements, employee benefits, and group insurance policies. Reduce admin overhead by 40%.
                  </p>
                  
                  <div className="space-y-4 pt-4">
                      <div className="flex items-start gap-4 p-4 glass-card rounded-xl">
                         <div className="p-2.5 rounded-xl bg-green-50 text-green-600 shadow-sm"><ShieldCheck className="w-6 h-6" /></div>
                         <div>
                            <p className="font-bold text-gray-900 text-lg">Bulk Salary Accounts</p>
                            <p className="text-sm text-gray-500">Instant account opening with top banks</p>
                         </div>
                      </div>
                      <div className="flex items-start gap-4 p-4 glass-card rounded-xl">
                         <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 shadow-sm"><TrendingUp className="w-6 h-6" /></div>
                         <div>
                            <p className="font-bold text-gray-900 text-lg">Group Investments</p>
                            <p className="text-sm text-gray-500">Corporate NPS & FD benefits</p>
                         </div>
                      </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                     <Button onClick={() => onNavigate('corporate')} className="bg-indigo-600 hover:bg-indigo-700 h-12 px-8 text-base shadow-lg shadow-indigo-600/20 transition-all hover:scale-105">
                        Login to Portal
                     </Button>
                     <Button variant="outline" className="h-12 px-8 border-gray-300 text-gray-700 hover:bg-white/50 bg-white/30 backdrop-blur-sm">
                        Schedule Demo
                     </Button>
                  </div>
               </div>
               
               {/* Illustration / Graphic */}
               <div className="flex-1 w-full max-w-md">
                  <motion.div 
                    whileHover={{ y: -10, rotate: 1 }}
                    className="glass rounded-2xl p-8 relative overflow-hidden shadow-2xl"
                  >
                     <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Users className="w-32 h-32 text-indigo-900" />
                     </div>
                     <div className="space-y-4 relative z-10">
                        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-white/50 flex items-center gap-3">
                           <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg shadow-inner">TC</div>
                           <div>
                              <p className="font-bold text-gray-900 text-lg">Tech Corp India</p>
                              <p className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full inline-block mt-1">● Active Portal</p>
                           </div>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-white/50 space-y-3 opacity-90 scale-95 origin-top">
                           <div className="h-2.5 w-24 bg-gray-200 rounded-full"></div>
                           <div className="h-2 w-full bg-gray-100 rounded-full"></div>
                           <div className="h-2 w-2/3 bg-gray-100 rounded-full"></div>
                        </div>
                        <div className="bg-white/40 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-white/50 space-y-2 opacity-80 scale-90 origin-top">
                           <div className="h-2 w-full bg-gray-100/50 rounded-full"></div>
                        </div>
                     </div>
                  </motion.div>
               </div>
           </motion.div>
        </section>
      )}

    </div>
  );
};
