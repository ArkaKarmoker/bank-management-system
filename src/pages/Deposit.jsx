import React from 'react';
import { ArrowDownCircle, ArrowLeft, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import DepositForm from '../components/DepositForm';
import BalanceCard from '../components/BalanceCard';
import TransactionList from '../components/TransactionList';
import { useBank } from '../context/BankContext';
import { Wallet } from 'lucide-react';

const Deposit = () => {
  const { balance, totalDeposited, transactions } = useBank();

  // Filter only deposits for the recent sidebar
  const recentDeposits = transactions.filter((t) => t.type === 'Deposit').slice(0, 3);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <Link
            to="/"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-3">
            <span>Deposit Money</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Top up your balance instantly with simulated online deposits.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        {/* Main Form (2 cols) */}
        <div className="lg:col-span-2 space-y-5 sm:space-y-6">
          <DepositForm />

          {/* Educational / Security Notice */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex items-start space-x-3 text-slate-600 text-xs leading-relaxed">
            <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">Simulated Safe Banking:</span> This application runs locally with instant updates and localStorage persistence. All deposit operations update your available balance immediately without external delays.
            </div>
          </div>
        </div>

        {/* Side Balance Overview & Recent Deposits */}
        <div className="space-y-5 sm:space-y-6">
          <BalanceCard
            title="Available Balance"
            amount={balance}
            icon={Wallet}
            variant="indigo"
            subtitle="Your current available funds"
          />

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800">Recent Deposits</h3>
              <Link to="/transactions" className="text-xs text-indigo-600 font-semibold hover:underline">
                All
              </Link>
            </div>
            
            <TransactionList
              transactions={recentDeposits}
              emptyTitle="No deposits yet"
              emptyMessage="Deposited amounts will be listed here."
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Deposit;
