import React, { useState } from 'react';
import { Transaction, PaymentMethod, WalletStats } from './types';

interface DesktopWalletProps {
  stats: WalletStats;
  transactions: Transaction[];
  paymentMethods: PaymentMethod[];
  onWithdrawClick: () => void;
  onEditPaymentClick: () => void;
  onLoadMoreClick: () => void;
  onDocumentDownloadClick: (docName: string) => void;
  onContactSupportClick: () => void;
  onTransactionClick: (transaction: Transaction) => void;
}

export default function DesktopWallet({
  stats,
  transactions,
  paymentMethods,
  onWithdrawClick,
  onEditPaymentClick,
  onLoadMoreClick,
  onDocumentDownloadClick,
  onContactSupportClick,
  onTransactionClick,
}: DesktopWalletProps) {
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Filter transactions
  const filteredTransactions = transactions.filter((t) => {
    if (filter === 'all') return true;
    return t.status === filter;
  });

  // Find default or active payment method
  const primaryMethod = paymentMethods.find(p => p.isDefault) || paymentMethods[0];

  return (
    <div className="hidden lg:block w-full">
      {/* Hero Section */}
      <section className="mb-12 animate-fade-in">
        <h1 className="font-display text-5xl font-extrabold tracking-tight text-on-surface mb-3">My Wallet</h1>
        <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed">
          Review your session earnings, track pending clearances, and manage your payouts. Your professional editorial career, summarized in one place.
        </p>
      </section>

      {/* Metric Bento Grid */}
      <section className="grid grid-cols-3 gap-6 mb-16">
        {/* Current Balance Card */}
        <div className="bg-surface-container-low rounded-xl p-8 flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] hover:shadow-md border border-outline-variant/10">
          <div>
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant/70 font-bold">Current Balance</span>
            <div className="mt-4 text-4xl font-display font-extrabold text-primary">
              ${stats.currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
          <button 
            onClick={onWithdrawClick}
            className="mt-8 cursor-pointer w-full text-center bg-gradient-to-r from-primary to-primary-container text-white py-3 px-6 rounded-lg font-bold text-sm hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/10"
          >
            Withdraw Funds
          </button>
        </div>

        {/* Total Earnings Card */}
        <div className="bg-surface-container-low rounded-xl p-8 flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] hover:shadow-md border border-outline-variant/10">
          <div>
            <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant/70 font-bold">Total Earnings</span>
            <div className="mt-4 text-4xl font-display font-extrabold text-on-surface font-headline">
              ${stats.totalEarnings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
          <div className="mt-8 flex items-center gap-2 text-on-surface-variant text-sm">
            <span className="material-symbols-outlined text-primary">trending_up</span>
            <span className="font-medium">12% increase from last month</span>
          </div>
        </div>

        {/* Pending Clearances Card */}
        <div className="bg-surface-container-low rounded-xl p-8 flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] hover:shadow-md border border-outline-variant/10">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant/70 font-bold font-sans">Pending Clearances</span>
              <div className="connection-pulse w-2 h-2 mr-2"></div>
            </div>
            <div className="mt-4 text-4xl font-display font-extrabold text-on-surface font-headline">
              ${stats.pendingClearance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
          <div className="mt-8 text-on-surface-variant text-sm flex gap-1 items-center">
            <span>Next settlement in</span>
            <span className="font-bold text-on-surface">{stats.nextSettlementDays} days</span>
          </div>
        </div>
      </section>

      {/* Transaction Content & Sidebar Layout */}
      <div className="grid grid-cols-12 gap-12 items-start">
        {/* Transactions Table (Main Content) */}
        <div className="col-span-8">
          <div className="flex items-center justify-between mb-8 relative">
            <h2 className="font-headline text-2xl font-bold text-on-surface">Transaction History</h2>
            
            {/* Filter Trigger */}
            <div className="relative">
              <button 
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="cursor-pointer bg-surface-container-low hover:bg-surface-container rounded-lg px-4 py-2 flex items-center gap-2 text-sm font-semibold text-on-surface transition-colors border border-outline-variant/10"
              >
                <span className="material-symbols-outlined text-on-surface-variant text-lg">filter_list</span>
                <span>Filter: {filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
              </button>

              {showFilterDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-outline-variant/20 rounded-xl shadow-lg z-20 py-2">
                  <button 
                    onClick={() => { setFilter('all'); setShowFilterDropdown(false); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-surface-container transition-colors ${filter === 'all' ? 'font-bold text-primary bg-primary/5' : 'text-on-surface-variant'}`}
                  >
                    All Transactions
                  </button>
                  <button 
                    onClick={() => { setFilter('completed'); setShowFilterDropdown(false); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-surface-container transition-colors ${filter === 'completed' ? 'font-bold text-primary bg-primary/5' : 'text-on-surface-variant'}`}
                  >
                    Completed Only
                  </button>
                  <button 
                    onClick={() => { setFilter('pending'); setShowFilterDropdown(false); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-surface-container transition-colors ${filter === 'pending' ? 'font-bold text-primary bg-primary/5' : 'text-on-surface-variant'}`}
                  >
                    Pending Only
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {filteredTransactions.length === 0 ? (
              <div className="bg-surface-container-lowest p-12 text-center rounded-xl border border-outline-variant/10">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant/40 mb-2">payments</span>
                <p className="text-on-surface-variant font-medium">No transactions found matching your filter Criteria.</p>
              </div>
            ) : (
              filteredTransactions.map((t) => {
                const isEarning = t.type === 'earnings';
                return (
                  <div 
                    key={t.id}
                    onClick={() => onTransactionClick(t)}
                    className="cursor-pointer bg-surface-container-lowest p-6 rounded-xl flex items-center justify-between group hover:bg-surface-container-low transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md border border-outline-variant/10"
                  >
                    <div className="flex items-center gap-5">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isEarning ? 'bg-primary/5 text-primary' : 'bg-error/5 text-error'}`}>
                        <span className="material-symbols-outlined">
                          {isEarning ? 'payments' : 'account_balance_wallet'}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-headline font-semibold text-on-surface group-hover:text-primary transition-colors">
                          {t.title}
                        </h3>
                        <p className="text-on-surface-variant text-sm mt-0.5">
                          {t.date} • {t.time}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`font-headline font-bold text-lg ${isEarning ? 'text-primary' : 'text-on-surface'}`}>
                        {isEarning ? '+' : '-'}${Math.abs(t.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      <span className={`inline-block mt-1 text-[10px] uppercase font-bold tracking-tight px-2 py-0.5 rounded-full ${t.status === 'completed' ? 'bg-secondary-fixed text-on-secondary-fixed-variant' : 'bg-surface-container-high text-on-surface-variant'}`}>
                        {t.status}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Load More Button */}
          <div className="mt-8 text-center">
            <button 
              onClick={onLoadMoreClick}
              className="cursor-pointer text-primary font-bold text-sm hover:underline underline-offset-4 transition-all hover:scale-[1.01]"
            >
              Load more transactions
            </button>
          </div>
        </div>

        {/* Sidebar Section */}
        <aside className="col-span-4 space-y-8">
          {/* Payment Method Card */}
          <div className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline font-bold text-lg text-on-surface">Payment Method</h2>
              <button 
                onClick={onEditPaymentClick}
                className="cursor-pointer text-primary text-sm font-bold hover:underline"
              >
                Edit
              </button>
            </div>
            
            {primaryMethod ? (
              <div className="flex items-start gap-4 p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/5">
                <span className="material-symbols-outlined text-primary mt-1">account_balance</span>
                <div>
                  <div className="font-semibold text-sm text-on-surface">{primaryMethod.name}</div>
                  <div className="text-on-surface-variant text-xs mt-1">
                    {primaryMethod.type === 'bank' ? 'Direct Deposit' : 'Card'} • {primaryMethod.details}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 text-center border border-dashed border-outline-variant/20 rounded-lg">
                <p className="text-xs text-on-surface-variant">No payment method added.</p>
              </div>
            )}
            
            <p className="text-[10px] text-on-surface-variant mt-4 leading-relaxed italic">
              Payouts are automatically processed on the 1st and 15th of each month if balance exceeds $100.
            </p>
          </div>

          {/* Tax Documents Card */}
          <div className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/10">
            <h2 className="font-headline font-bold text-lg mb-6 text-on-surface">Tax Documents</h2>
            <div className="space-y-4">
              <button 
                onClick={() => onDocumentDownloadClick('2023 Form 1099-NEC')}
                className="cursor-pointer flex items-center justify-between group w-full text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant">description</span>
                  <span className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors">2023 Form 1099-NEC</span>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary group-hover:scale-110 transition-all">download</span>
              </button>
              
              <button 
                onClick={() => onDocumentDownloadClick('Annual Earnings Statement')}
                className="cursor-pointer flex items-center justify-between group w-full text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant">description</span>
                  <span className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors">Annual Earnings Statement</span>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary group-hover:scale-110 transition-all">download</span>
              </button>
            </div>
          </div>

          {/* Help Center CTA */}
          <div className="bg-primary/5 rounded-xl p-8 relative overflow-hidden border border-primary/10">
            <div className="relative z-10">
              <h3 className="font-headline font-bold text-on-surface mb-2">Need billing help?</h3>
              <p className="text-on-surface-variant text-sm mb-4">Our support team is available 24/7 for payout inquiries.</p>
              <button 
                onClick={onContactSupportClick}
                className="cursor-pointer text-primary font-bold text-sm flex items-center gap-1 group/btn hover:underline"
              >
                Contact Support
                <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
            {/* Abstract Shape Background */}
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
          </div>
        </aside>
      </div>
    </div>
  );
}
