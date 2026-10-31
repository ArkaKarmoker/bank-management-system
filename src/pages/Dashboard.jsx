import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Wallet, 
  ArrowDownLeft, 
  ArrowUpRight, 
  ArrowRight, 
  UserCheck, 
  ShieldCheck, 
  Building2, 
  CreditCard 
} from 'lucide-react';
import { useBank } from '../context/BankContext';
import BalanceCard from '../components/BalanceCard';
import TransactionList from '../components/TransactionList';

const Dashboard = () => {
  const {
    bankName,
    appTitle,
    accountHolder,
    accountNumber,
    balance,
    totalDeposited,
    totalWithdrawn,
    transactions,
  } = useBank();

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* Hero / Account Overview Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
          <div>
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Building2 className="w-4 h-4" />
              <span>{bankName} • {appTitle}</span>
            </div>
            
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              Welcome back, <span className="text-indigo-300">{accountHolder}</span>
            </h1>
            
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3 text-sm text-slate-300">
              <div className="flex items-center space-x-1.5 bg-slate-800/80 px-2.5 sm:px-3 py-1 rounded-full border border-slate-700/60 font-mono text-xs">
                <CreditCard className="w-3.5 h-3.5 text-indigo-400" />
                <span>{accountNumber}</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-emerald-500/10 text-emerald-300 px-2.5 sm:px-3 py-1 rounded-full border border-emerald-500/20 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Account</span>
              </div>
            </div>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="grid grid-cols-2 gap-2.5 sm:flex sm:items-center sm:gap-3 w-full sm:w-auto">
            <Link
              to="/deposit"
              className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02]"
            >
              <ArrowDownLeft className="w-4 h-4" />
              <span>Deposit</span>
            </Link>
            <Link
              to="/withdraw"
              className="flex items-center justify-center space-x-2 bg-rose-600 hover:bg-rose-500 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-bold text-sm shadow-lg shadow-rose-600/30 transition-all hover:scale-[1.02]"
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Withdraw</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Task 1: Dashboard Balance Cards Grid */}
      <section aria-label="Account Summary Metrics">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Financial Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <BalanceCard
            title="Current Balance"
            amount={balance}
            icon={Wallet}
            variant="indigo"
            subtitle="Ready for withdrawal & transfers"
            badge="Available"
          />
          <BalanceCard
            title="Total Deposited"
            amount={totalDeposited}
            icon={ArrowDownLeft}
            variant="emerald"
            subtitle="Cumulative total of all credits"
            badge="Credits"
          />
          <BalanceCard
            title="Total Withdrawn"
            amount={totalWithdrawn}
            icon={ArrowUpRight}
            variant="rose"
            subtitle="Cumulative total of all debits"
            badge="Debits"
          />
        </div>
      </section>

      {/* Recent Activity Section */}
      <section aria-label="Recent Transactions">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Recent Transactions</h2>
            <p className="text-xs text-slate-500">Your latest account credits and debits</p>
          </div>
          <Link
            to="/transactions"
            className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 group"
          >
            <span>View All ({transactions.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Display top 4 recent transactions */}
        <TransactionList
          transactions={transactions}
          limit={4}
          emptyTitle="No activity yet"
          emptyMessage="Make your first deposit to see your transaction history."
        />
      </section>
    </div>
  );
};

export default Dashboard;
