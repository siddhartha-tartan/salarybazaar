import React, { useState } from "react";
import { AppLayout } from "./components/AppLayout";
import { Dashboard } from "./components/Dashboard";
import { Home } from "./components/Home";
import { CorporateLanding } from "./components/CorporateLanding";
import { PolicySelector } from "./components/PolicySelector";

function AppContent() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [initialCategory, setInitialCategory] = useState<string>('all');

  const handleNavigate = (page: string) => {
    // Check if the page is a product category deep-link
    if (page === 'salary-accounts') {
        setInitialCategory('salary-account');
        setCurrentPage('marketplace');
    } else if (page === 'investments') {
        setInitialCategory('investment');
        setCurrentPage('marketplace');
    } else if (page === 'marketplace') {
        setInitialCategory('all');
        setCurrentPage('marketplace');
    } else {
        setCurrentPage(page);
    }
    window.scrollTo(0, 0);
  };

  return (
    <AppLayout 
      currentPage={currentPage} 
      onNavigate={handleNavigate}
    >
      {currentPage === 'home' && (
        <Home onNavigate={handleNavigate} />
      )}

      {currentPage === 'marketplace' && (
        <Dashboard 
           onNavigate={handleNavigate} 
           initialCategory={initialCategory}
        />
      )}

      {currentPage === 'selector' && (
        <PolicySelector />
      )}
      
      {currentPage === 'corporate' && (
        <CorporateLanding />
      )}
    </AppLayout>
  );
}

export function App() {
  return (
    <AppContent />
  );
}
