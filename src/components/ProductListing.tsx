import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Filter, Star, ChevronDown, Building2, TrendingUp, PiggyBank } from 'lucide-react';

interface ProductListingProps {
  category: 'salary-accounts' | 'investments';
  onNavigate: (page: string) => void;
}

// Mock Data optimized for comparison
const SALARY_PRODUCTS = [
  {
    id: 'hdfc-classic',
    bank: 'HDFC Bank',
    name: 'Classic Salary Account',
    tags: ['Most Popular', 'Instant Account'],
    interest: '3.0% - 3.5%',
    minBalance: '₹0 (Zero Balance)',
    benefits: ['Free Debit Card', '₹5L Personal Accident Cover', 'Unlimited ATM Txns'],
    logo: 'H',
    color: 'bg-blue-600'
  },
  {
    id: 'axis-liberty',
    bank: 'Axis Bank',
    name: 'Liberty Salary Account',
    tags: ['Cashback', 'Lounge Access'],
    interest: '3.0% - 4.0%',
    minBalance: '₹0 (Zero Balance)',
    benefits: ['₹25k Gift Voucher', '4 Lounge Visits/Year', 'Weekend Cashback'],
    logo: 'A',
    color: 'bg-maroon-700' // approximate
  },
  {
    id: 'sbi-corp',
    bank: 'SBI',
    name: 'Corporate Salary Package',
    tags: ['Govt. Preferred', 'Low Loan Rates'],
    interest: '2.7% - 3.0%',
    minBalance: '₹0 (Zero Balance)',
    benefits: ['Overdraft Facility', 'Locker Discount', 'Zero Processing Fee on Loans'],
    logo: 'S',
    color: 'bg-blue-500'
  }
];

const INVESTMENT_PRODUCTS = [
  {
    id: 'bajaj-fd',
    bank: 'Bajaj Finserv',
    name: 'Corporate FD',
    tags: ['High Returns', 'AAA Rated'],
    interest: 'Up to 8.60% p.a.',
    minBalance: 'Min. ₹15,000',
    benefits: ['Flexible Tenure', 'Higher Senior Citizen Rates', 'Digital Process'],
    logo: 'B',
    color: 'bg-blue-900'
  },
  {
    id: 'nps-tier1',
    bank: 'NPS Trust',
    name: 'National Pension System',
    tags: ['Tax Saver', 'Retirement'],
    interest: 'Market Linked (8-12%)',
    minBalance: 'Min. ₹500/mo',
    benefits: ['Tax deduction u/s 80CCD', 'Low Fund Management Fee', 'Portable Account'],
    logo: 'N',
    color: 'bg-green-600'
  }
];

export const ProductListing: React.FC<ProductListingProps> = ({ category, onNavigate }) => {
  const isSalary = category === 'salary-accounts';
  const products = isSalary ? SALARY_PRODUCTS : INVESTMENT_PRODUCTS;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
             <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <span className="cursor-pointer hover:text-blue-600" onClick={() => onNavigate('home')}>Home</span>
                <span>/</span>
                <span className="font-medium text-gray-900 capitalize">{category.replace('-', ' ')}</span>
             </div>
             <h1 className="text-2xl font-bold text-gray-900">
               {isSalary ? 'Compare Salary Accounts' : 'Top Investment Options'}
             </h1>
          </div>
          <div className="flex items-center gap-3">
             <span className="text-sm text-gray-500 hidden sm:inline">Sort by:</span>
             <select className="bg-gray-50 border border-gray-200 text-sm rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500">
                <option>Popularity</option>
                <option>Interest Rate: High to Low</option>
             </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* LEFT SIDEBAR FILTERS (Desktop) */}
          <div className="hidden lg:block space-y-6">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
                <Filter className="w-4 h-4" /> Filters
              </div>
              
              <div className="space-y-6">
                <div>
                   <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3 block">Provider</label>
                   <div className="space-y-2">
                      {['HDFC Bank', 'Axis Bank', 'SBI', 'ICICI Bank'].map(bank => (
                        <label key={bank} className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 cursor-pointer">
                           <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                           {bank}
                        </label>
                      ))}
                   </div>
                </div>

                <div>
                   <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3 block">Features</label>
                   <div className="space-y-2">
                      {['Zero Balance', 'Free Credit Card', 'Cashback', 'Lounge Access'].map(feat => (
                        <label key={feat} className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 cursor-pointer">
                           <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                           {feat}
                        </label>
                      ))}
                   </div>
                </div>
              </div>
            </div>
            
            {/* Trust Banner */}
            <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 text-center">
               <ShieldCheck className="w-10 h-10 text-blue-600 mx-auto mb-2" />
               <h4 className="font-bold text-blue-900">100% Paperless</h4>
               <p className="text-xs text-blue-700 mt-1">Open your account instantly using Video KYC.</p>
            </div>
          </div>

          {/* MAIN LISTING AREA */}
          <div className="lg:col-span-3 space-y-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row gap-6 relative overflow-hidden group">
                 {/* Best Match Tag */}
                 {product.tags.includes('Most Popular') && (
                    <div className="absolute top-0 left-0 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-3 py-1 rounded-br-lg z-10">
                      BEST MATCH
                    </div>
                 )}

                 {/* Left: Logo & Basic Info */}
                 <div className="flex-1 flex gap-4">
                    <div className={`w-14 h-14 rounded-xl ${product.color || 'bg-gray-900'} text-white flex items-center justify-center text-xl font-bold flex-shrink-0 shadow-md`}>
                       {product.logo}
                    </div>
                    <div>
                       <div className="flex flex-wrap gap-2 mb-1">
                          {product.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-[10px] bg-gray-100 text-gray-600 border-gray-200">
                               {tag}
                            </Badge>
                          ))}
                       </div>
                       <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {product.name}
                       </h3>
                       <p className="text-sm text-gray-500">{product.bank}</p>
                    </div>
                 </div>

                 {/* Middle: Key Stats */}
                 <div className="flex-1 grid grid-cols-2 gap-4 border-l border-r border-gray-50 px-4 md:px-6">
                    <div>
                       <p className="text-xs text-gray-400 uppercase font-medium">Interest</p>
                       <p className="font-bold text-green-600 text-lg">{product.interest}</p>
                    </div>
                    <div>
                       <p className="text-xs text-gray-400 uppercase font-medium">Min Balance</p>
                       <p className="font-bold text-gray-900">{product.minBalance}</p>
                    </div>
                    <div className="col-span-2">
                       <p className="text-xs text-gray-400 uppercase font-medium mb-1">Key Benefits</p>
                       <ul className="text-xs text-gray-600 space-y-1">
                          {product.benefits.map((benefit, i) => (
                             <li key={i} className="flex items-center gap-1.5">
                                <Check className="w-3 h-3 text-blue-500" /> {benefit}
                             </li>
                          ))}
                       </ul>
                    </div>
                 </div>

                 {/* Right: CTA */}
                 <div className="flex flex-col justify-center gap-3 min-w-[140px]">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                       Apply Now
                    </Button>
                    <Button variant="outline" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50">
                       View Details
                    </Button>
                 </div>
              </div>
            ))}
            
            {/* Comparison Banner */}
            <div className="mt-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white flex items-center justify-between">
               <div>
                  <h3 className="text-xl font-bold mb-1">Confused? Let us help.</h3>
                  <p className="text-gray-400 text-sm">Talk to our salary account experts for free advice.</p>
               </div>
               <Button className="bg-white text-gray-900 hover:bg-gray-100 font-bold">
                  Request Call Back
               </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

