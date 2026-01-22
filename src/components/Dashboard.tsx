import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Building2, Briefcase, PiggyBank, TrendingUp, ShieldCheck, 
  Filter, Search, ArrowRight, Star, Wallet, CreditCard, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PROVIDER_LOGOS: Record<string, string> = {
  "HDFC Bank": new URL("../../logos/Bank Name=HDFC Bank.png", import.meta.url).href,
  "ICICI Bank": new URL("../../logos/Bank Name=ICICI Bank.png", import.meta.url).href,
  "SBI": new URL("../../logos/Bank Name=State Bank of India.png", import.meta.url).href,
  "Kotak Mahindra": new URL("../../logos/Bank Name=Kotak Mahindra Bank.png", import.meta.url).href,
  "Union Bank": new URL("../../logos/Bank Name=Union Bank.png", import.meta.url).href,
  "RBL Bank": new URL("../../logos/Bank Name=RBL Bank.png", import.meta.url).href,
  "Bandhan Bank": new URL("../../logos/Bank Name=Bandhan Bank.png", import.meta.url).href,
  "Central Bank of India": new URL("../../logos/Bank Name=Central Bank of India.png", import.meta.url).href,
  "Ujjivan Small Finance Bank": new URL("../../logos/Bank Name=Ujjivan Small Finance Bank.png", import.meta.url).href,
  "AU Small Finance Bank": new URL("../../logos/Bank Name=AU Small Finance Bank.png", import.meta.url).href,
};

function getProviderLogo(provider: string): string | undefined {
  return PROVIDER_LOGOS[provider];
}

interface MarketplaceProps {
  onNavigate: (page: string) => void;
  initialCategory?: string; // 'all', 'salary-accounts', 'investments'
}

interface Product {
  id: string;
  category: 'salary-account' | 'investment';
  title: string;
  provider: string;
  description: string;
  features: string[];
  ctaLink: string;
  rating: number;
  highlight?: string;
  tags: string[];
}

const PRODUCTS: Product[] = [
  // Salary Accounts
  {
    id: 'hdfc-sal',
    category: 'salary-account',
    title: 'Classic Salary Account',
    provider: 'HDFC Bank',
    description: 'Zero balance salary account with unlimited ATM withdrawals.',
    features: ['Zero Balance', 'Free Debit Card', '₹5L Accidental Cover'],
    ctaLink: '#',
    rating: 4.8,
    highlight: 'Most Popular',
    tags: ['Zero Balance', 'Instant']
  },
  {
    id: 'axis-sal',
    category: 'salary-account',
    title: 'Priority Salary Account',
    provider: 'Axis Bank',
    description: 'Exclusive privileges and higher transaction limits for employees.',
    features: ['Lounge Access', 'Higher withdrawal limits', 'Cashback offers'],
    ctaLink: '#',
    rating: 4.5,
    tags: ['Rewards']
  },
  {
    id: 'sbi-sal',
    category: 'salary-account',
    title: 'Corporate Salary Package',
    provider: 'SBI',
    description: 'Trusted by millions, wide network of branches.',
    features: ['Wide Branch Network', 'Digital Banking', 'Free Insurance'],
    ctaLink: '#',
    rating: 4.6,
    tags: ['Govt Backed']
  },
  {
    id: 'icici-sal',
    category: 'salary-account',
    title: 'Salary Plus Account',
    provider: 'ICICI Bank',
    description: 'Premium salary account with family banking benefits.',
    features: ['No Min Balance', 'Family Banking', 'Wealth Management'],
    ctaLink: '#',
    rating: 4.7,
    tags: ['Family Banking']
  },
  {
    id: 'kotak-sal',
    category: 'salary-account',
    title: 'Everyday Salary Account',
    provider: 'Kotak Mahindra',
    description: 'Everyday savings with high interest on balance.',
    features: ['Higher Interest', 'Digital Banking', 'Zero Charges'],
    ctaLink: '#',
    rating: 4.4,
    tags: ['High Interest']
  },

  // Investments
  {
    id: 'bajaj-fd',
    category: 'investment',
    title: 'Bajaj Finserv FD',
    provider: 'Bajaj Finserv',
    description: 'High interest rates up to 8.60% p.a. for corporates.',
    features: ['High Returns', 'Flexible Tenure', 'Safe Investment'],
    ctaLink: '#',
    rating: 4.9,
    highlight: 'High Returns',
    tags: ['FD', 'High Interest']
  },
  {
    id: 'nps-tier1',
    category: 'investment',
    title: 'National Pension System',
    provider: 'Govt of India',
    description: 'Long term retirement planning with tax benefits under 80CCD.',
    features: ['Tax saving', 'Low cost', 'Market linked returns'],
    ctaLink: '#',
    rating: 4.7,
    tags: ['Tax Saver', 'Retirement']
  },
  {
    id: 'ppf',
    category: 'investment',
    title: 'Public Provident Fund',
    provider: 'Post Office',
    description: 'Government backed long term saving scheme.',
    features: ['Tax Free Returns', 'Sovereign Guarantee', '15 Year Tenure'],
    ctaLink: '#',
    rating: 4.8,
    tags: ['Tax Free', 'Safe']
  },
  {
    id: 'elss-fund',
    category: 'investment',
    title: 'Tax Saver ELSS Fund',
    provider: 'Mirae Asset',
    description: 'Equity linked saving scheme with shortest lock-in period.',
    features: ['3 Year Lock-in', 'High Growth Potential', 'Tax Saving'],
    ctaLink: '#',
    rating: 4.6,
    tags: ['Mutual Fund', 'High Growth']
  }
];

export const Dashboard: React.FC<MarketplaceProps> = ({ initialCategory = 'all', onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory === 'investments' ? 'investment' : initialCategory === 'salary-accounts' ? 'salary-account' : 'all');
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Normalize initial category on mount if needed, or just rely on state
  // Note: 'view' prop from App.tsx maps to 'initialCategory' here.

  const providers = Array.from(new Set(PRODUCTS.map(p => p.provider)));

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesProvider = selectedProviders.length === 0 || selectedProviders.includes(product.provider);
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.provider.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesProvider && matchesSearch;
    });
  }, [selectedCategory, selectedProviders, searchQuery]);

  const toggleProvider = (provider: string) => {
    setSelectedProviders(prev => 
      prev.includes(provider) ? prev.filter(p => p !== provider) : [...prev, provider]
    );
  };

  const getCategoryIcon = (cat: string) => {
    switch(cat) {
      case 'salary-account': return <Building2 className="w-5 h-5 text-blue-600" />;
      case 'investment': return <TrendingUp className="w-5 h-5 text-green-600" />;
      default: return <Building2 className="w-5 h-5 text-blue-600" />;
    }
  };

  const SidebarContent = () => (
    <div className="space-y-8">
       {/* Category Filter */}
       <motion.div 
         initial={{ x: -20, opacity: 0 }}
         animate={{ x: 0, opacity: 1 }}
         transition={{ delay: 0.1 }}
         className="space-y-3 glass p-4 rounded-2xl"
       >
          <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm uppercase tracking-wide">
            <Filter className="w-4 h-4" /> Categories
          </h3>
          <div className="space-y-1">
            {[
              { id: 'all', label: 'All Products' },
              { id: 'salary-account', label: 'Salary Accounts' },
              { id: 'investment', label: 'Investments' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat.id); setIsFilterOpen(false); }}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  selectedCategory === cat.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                    : 'text-gray-600 hover:bg-white/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
       </motion.div>

       {/* Provider Filter */}
       <motion.div 
         initial={{ x: -20, opacity: 0 }}
         animate={{ x: 0, opacity: 1 }}
         transition={{ delay: 0.2 }}
         className="space-y-3 glass p-4 rounded-2xl"
       >
          <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Providers</h3>
          <div className="space-y-3">
             {providers.map(provider => (
               <div key={provider} className="flex items-center space-x-3">
                  <Checkbox 
                    id={`provider-${provider}`}
                    checked={selectedProviders.includes(provider)}
                    onCheckedChange={() => toggleProvider(provider)}
                    className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <label 
                    htmlFor={`provider-${provider}`} 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-600 cursor-pointer select-none"
                  >
                    {provider}
                  </label>
               </div>
             ))}
          </div>
       </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen pb-10">
      {/* Marketplace Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass border-b border-white/20 sticky top-20 z-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-auto md:h-16 py-3 md:py-0 flex flex-col md:flex-row items-center justify-between gap-4">
           <div className="flex w-full md:w-auto items-center justify-between gap-2 text-gray-800 font-bold text-xl">
              <div className="flex items-center gap-2">
                Marketplace
                <span className="text-sm font-normal text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">{filteredProducts.length}</span>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="md:hidden flex items-center gap-2"
                onClick={() => setIsFilterOpen(true)}
              >
                <Filter className="w-4 h-4" /> Filters
              </Button>
           </div>
           
           <div className="w-full md:flex-1 md:max-w-md relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search products, banks..." 
                className="w-full pl-9 pr-4 py-2 bg-white/50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>
        </div>
      </motion.div>

      {/* Mobile Filters Sheet */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm md:hidden"
              onClick={() => setIsFilterOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-80 bg-white z-50 shadow-2xl overflow-y-auto md:hidden"
            >
              <div className="p-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <h2 className="font-bold text-lg">Filters</h2>
                <Button variant="ghost" size="sm" onClick={() => setIsFilterOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="p-4">
                <SidebarContent />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden md:block w-64 flex-shrink-0">
             <SidebarContent />
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
             <AnimatePresence mode="popLayout">
             {filteredProducts.length > 0 ? (
               <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {filteredProducts.map((product, index) => (
                   <motion.div 
                     key={product.id} 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.95 }}
                     transition={{ delay: index * 0.05 }}
                     whileHover={{ y: -5 }}
                     className="glass bg-white/40 border border-white/60 rounded-3xl p-5 flex flex-col items-start group cursor-pointer h-full relative hover:bg-white/60 hover:shadow-xl transition-all duration-300"
                   >
                      <div className="flex justify-between items-start w-full mb-3">
                         <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm overflow-hidden">
                            {getProviderLogo(product.provider) ? (
                              <img
                                src={getProviderLogo(product.provider)}
                                alt={`${product.provider} logo`}
                                className="w-full h-full object-contain p-1.5"
                                loading="lazy"
                              />
                            ) : (
                              getCategoryIcon(product.category)
                            )}
                         </div>
                         <div className="flex items-center gap-1 bg-white/50 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-gray-700 border border-white/50">
                            {product.rating} <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                         </div>
                      </div>

                      <div className="mb-3 w-full">
                          <div className="flex items-center gap-2 mb-1.5">
                              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">{product.provider}</span>
                              {product.highlight && (
                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full border border-blue-100">{product.highlight}</span>
                              )}
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-700 transition-colors">{product.title}</h3>
                      </div>

                      <div className="flex-1 w-full space-y-4">
                         <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                           {product.description}
                         </p>

                         <div className="flex flex-wrap gap-2">
                           {product.features.slice(0, 3).map((feature, idx) => (
                             <span key={idx} className="inline-flex items-center text-[10px] font-medium text-gray-600 bg-gray-100/80 px-2 py-1 rounded-md">
                                {feature}
                             </span>
                           ))}
                         </div>
                      </div>
                      
                      <div className="w-full mt-5 pt-4 border-t border-gray-100/50 flex items-center justify-between text-blue-600 font-semibold text-sm group-hover:text-blue-700">
                          <span>View Details</span>
                          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>

                   </motion.div>
                 ))}
               </motion.div>
             ) : (
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="text-center py-20 glass rounded-3xl"
               >
                  <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                     <Search className="w-6 h-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                  <p className="text-gray-500 text-sm mt-1">Try adjusting your filters or search query.</p>
                  <Button 
                    variant="link" 
                    className="mt-2 text-blue-600"
                    onClick={() => { setSelectedCategory('all'); setSelectedProviders([]); setSearchQuery(''); }}
                  >
                    Clear all filters
                  </Button>
               </motion.div>
             )}
             </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};

const CheckCheckIcon = () => (
  <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);
