import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';
import Transactions from './pages/Transactions';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Task 5: Consistent Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/transactions" element={<Transactions />} />
          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Standardized Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-3 sm:py-3.5">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-center sm:text-left text-xs sm:text-sm text-slate-500">
          <p>© {new Date().getFullYear()} AK Bank Management System. All rights reserved.</p>
          <p className="font-medium">
            Developed By{' '}
            <a
              href="https://github.com/ArkaKarmoker"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 hover:underline font-semibold transition-colors"
            >
              Arka Karmoker
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
