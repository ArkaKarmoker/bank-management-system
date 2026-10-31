import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  History, 
  Menu, 
  X, 
  Wallet, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import FintechLogo from './FintechLogo';
import { useBank } from '../context/BankContext';
import { formatCurrency } from '../utils/formatters';
import ResetModal from './ResetModal';
import PopulateModal from './PopulateModal';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showPopulateModal, setShowPopulateModal] = useState(false);
  const { 
    bankName, 
    appTitle, 
    balance, 
    accountNumber, 
    resetToBlank, 
    populateDemoData 
  } = useBank();

  const navLinks = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Deposit', path: '/deposit', icon: ArrowDownCircle },
    { name: 'Withdraw', path: '/withdraw', icon: ArrowUpCircle },
    { name: 'Transaction History', path: '/transactions', icon: History },
  ];

  const handleConfirmReset = () => {
    resetToBlank();
    setShowResetModal(false);
  };

  const handleConfirmPopulate = () => {
    populateDemoData();
    setShowPopulateModal(false);
  };

  return (
    <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-40 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Title */}
          <Link to="/" className="flex items-center space-x-3 group">
            <FintechLogo className="w-10 h-10 rounded-xl shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform" />
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold tracking-tight text-white">{bankName}</span>
                <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-medium border border-indigo-500/30">
                  Demo
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">{appTitle}</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Quick Account Info & Actions Toolbar */}
          <div className="hidden md:flex items-center space-x-2.5">
            {/* Account Balance Pill */}
            <div className="flex items-center space-x-2.5 bg-slate-800/90 border border-slate-700/60 rounded-xl px-3 py-1.5 shadow-sm h-10">
              <Wallet className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <div className="text-right leading-none">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">{accountNumber}</p>
                <p className="text-sm font-bold text-white tabular-nums">{formatCurrency(balance)}</p>
              </div>
            </div>

            {/* Unified Demo & Reset Segmented Control */}
            <div className="flex items-center bg-slate-800/90 border border-slate-700/60 rounded-xl p-1 shadow-sm h-10">
              {/* Button 1: Load / Populate 50 Demo Transactions */}
              <button
                type="button"
                onClick={() => setShowPopulateModal(true)}
                title="Populate 50 Demo Transactions"
                aria-label="Populate Demo Data"
                className="h-full inline-flex items-center space-x-1.5 px-2.5 rounded-lg text-xs font-semibold text-indigo-300 hover:text-white hover:bg-indigo-600/30 active:scale-[0.98] transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden lg:inline">Demo Data</span>
                <span className="lg:hidden">Demo</span>
              </button>

              <div className="w-px h-4 bg-slate-700/80 mx-0.5" />

              {/* Button 2: Reset to Clean Blank State (1 Deposit) */}
              <button
                type="button"
                onClick={() => setShowResetModal(true)}
                title="Reset to Blank (1 Deposit)"
                aria-label="Reset to Blank Account"
                className="h-full inline-flex items-center space-x-1.5 px-2.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-rose-300 hover:bg-rose-500/15 active:scale-[0.98] transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Mobile Right Controls: Compact Balance & Menu Toggle */}
          <div className="flex items-center space-x-2 md:hidden">
            <div className="flex items-center space-x-1.5 bg-slate-800/90 border border-slate-700/60 rounded-lg px-2.5 py-1 text-right">
              <Wallet className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-bold text-white tabular-nums">{formatCurrency(balance)}</span>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900/95 backdrop-blur px-4 pt-3 pb-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Quick balance & actions for mobile */}
          <div className="p-3 bg-slate-800 rounded-xl mb-3 border border-slate-700/50 space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 font-mono">{accountNumber}</p>
                <p className="text-base font-bold text-white">{formatCurrency(balance)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-700/60">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowPopulateModal(true);
                }}
                className="text-xs flex items-center justify-center space-x-1.5 text-indigo-300 hover:text-white font-semibold px-2.5 py-2 bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/30 rounded-lg transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Load Demo (50)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowResetModal(true);
                }}
                className="text-xs flex items-center justify-center space-x-1.5 text-slate-300 hover:text-rose-400 font-semibold px-2.5 py-2 bg-slate-700/60 hover:bg-rose-500/10 border border-slate-600/60 hover:border-rose-500/30 rounded-lg transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset (Blank)</span>
              </button>
            </div>
          </div>

          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </div>
      )}

      {/* Confirmation Modal for Resetting Account to Blank */}
      <ResetModal
        isOpen={showResetModal}
        currentBalance={balance}
        onConfirm={handleConfirmReset}
        onCancel={() => setShowResetModal(false)}
      />

      {/* Confirmation Modal for Populating 50 Demo Transactions */}
      <PopulateModal
        isOpen={showPopulateModal}
        onConfirm={handleConfirmPopulate}
        onCancel={() => setShowPopulateModal(false)}
      />
    </header>
  );
};

export default Navbar;
