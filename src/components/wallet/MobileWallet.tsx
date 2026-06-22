import React, { useState } from 'react';
import { Transaction, PaymentMethod, WalletStats } from './types';

interface MobileWalletProps {
  stats: WalletStats;
  transactions: Transaction[];
  paymentMethods: PaymentMethod[];
  onWithdrawClick: () => void;
  onAddPaymentClick: () => void;
  onEditPaymentClick: (method: PaymentMethod) => void;
  onDocumentDownloadClick: (docName: string) => void;
  onContactSupportClick: () => void;
  onTransactionClick: (transaction: Transaction) => void;
}

export default function MobileWallet({
  stats,
  transactions,
  paymentMethods,
  onWithdrawClick,
  onAddPaymentClick,
  onEditPaymentClick,
  onDocumentDownloadClick,
  onContactSupportClick,
  onTransactionClick,
}: MobileWalletProps) {
  const [taxDocsOpen, setTaxDocsOpen] = useState(false);
  const [payoutSettingsOpen, setPayoutSettingsOpen] = useState(false);

  return (
    <div className="lg:hidden w-full max-w-md mx-auto pt-4 pb-12 animate-fade-in px-2">
      {/* Page Header Title */}
      <section className="mb-6">
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-on-surface mb-1.5">Wallet</h1>
        <p className="text-on-surface-variant text-base">
          Manage your editorial earnings and payouts.
        </p>
      </section>

      {/* Primary Blue Balance Card */}
      <section className="mb-6">
        <div className="bg-primary hover:bg-opacity-95 transition-all duration-300 rounded-2xl p-6 text-white shadow-xl shadow-primary/20 relative overflow-hidden">
          <div className="flex justify-between items-start z-10 relative">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-on-primary-container/80 font-bold block mb-2">
                Available for Withdrawal
              </span>
              <div className="text-4xl font-display font-extrabold tracking-tight">
                ${stats.currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-white">account_balance_wallet</span>
            </div>
          </div>

          <button 
            onClick={onWithdrawClick}
            className="mt-8 cursor-pointer w-full bg-white text-primary hover:bg-surface-container-low transition-all duration-300 py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-sm tracking-wide shadow-md active:scale-95"
          >
            <span className="material-symbols-outlined text-sm">payments</span>
            Withdraw Funds
          </button>
        </div>
      </section>

      {/* Row of Metrics (Total Earnings & Pending Clear) */}
      <section className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-surface-container-low rounded-2xl p-4 border border-outline-variant/10 text-left">
          <span className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant/70">
            Total Earnings
          </span>
          <div className="text-2xl font-display font-extrabold text-on-surface mt-1.5">
            ${stats.totalEarnings.toLocaleString('en-US', { maximumFractionDigits: 0 })}
          </div>
          <div className="mt-2 flex items-center gap-1 text-[11px] font-bold text-emerald-600">
            <span className="material-symbols-outlined text-xs">trending_up</span>
            <span>+12%</span>
          </div>
        </div>

        <div className="bg-surface-container-low rounded-2xl p-4 border border-outline-variant/10 text-left">
          <span className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant/70">
            Pending Clear
          </span>
          <div className="text-2xl font-display font-extrabold text-on-surface mt-1.5">
            ${stats.pendingClearance.toLocaleString('en-US', { maximumFractionDigits: 0 })}
          </div>
          <div className="mt-2 flex items-center gap-1 text-[11px] font-bold text-primary">
            <span className="material-symbols-outlined text-xs">schedule</span>
            <span>In {stats.nextSettlementDays} days</span>
          </div>
        </div>
      </section>

      {/* Row of Payment Methods */}
      <section className="mb-8">
        <div className="grid grid-cols-2 gap-4">
          {paymentMethods.map((pm) => (
            <div 
              key={pm.id}
              onClick={() => onEditPaymentClick(pm)}
              className="cursor-pointer bg-white rounded-2xl p-4 border border-outline-variant/10 flex items-center gap-3 hover:bg-surface-container-low transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-primary/5 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-base">
                  {pm.type === 'bank' ? 'account_balance' : 'credit_card'}
                </span>
              </div>
              <div className="overflow-hidden">
                <div className="font-bold text-xs text-on-surface whitespace-nowrap overflow-hidden text-ellipsis">
                  {pm.name}
                </div>
                <div className="text-on-surface-variant text-[10px] mt-0.5">
                  {pm.isDefault ? 'Default Payout' : pm.details}
                </div>
              </div>
            </div>
          ))}

          {/* Add Method Trigger */}
          <div 
            onClick={onAddPaymentClick}
            className="cursor-pointer border border-dashed border-outline-variant/30 rounded-2xl p-4 flex items-center justify-center gap-2 hover:bg-surface-container-low transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-base text-on-surface-variant">add</span>
            </div>
            <span className="text-xs font-bold text-on-surface-variant">Add Method</span>
          </div>
        </div>
      </section>

      {/* Recent Activity lists */}
      <section className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-headline text-lg font-bold text-on-surface">Recent Activity</h2>
          <button className="text-xs font-bold text-primary hover:underline">See All</button>
        </div>

        <div className="space-y-3">
          {transactions.map((t) => {
            const isEarning = t.type === 'earnings';
            return (
              <div 
                key={t.id}
                onClick={() => onTransactionClick(t)}
                className="cursor-pointer bg-white p-4 rounded-xl flex items-center justify-between border border-outline-variant/5 hover:bg-surface-container-low transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isEarning ? 'bg-[#dae2ff] text-primary' : 'bg-error/5 text-error'}`}>
                    <span className="material-symbols-outlined text-sm">
                      {isEarning ? 'payments' : 'account_balance_wallet'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-[13px] text-on-surface leading-tight">
                      {t.title}
                    </h3>
                    <p className="text-on-surface-variant text-[10px] mt-1">
                      {t.date} {t.metadata ? `• ID: ${t.metadata}` : ''}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className={`font-headline font-bold text-sm ${isEarning ? 'text-[#0040a1]' : 'text-on-surface'}`}>
                    {isEarning ? '+' : '-'}${Math.abs(t.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <span className={`inline-block mt-0.5 text-[9px] uppercase font-bold tracking-tighter px-1.5 py-0.2 rounded ${t.status === 'completed' ? 'bg-[#cbf2de] text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                    {t.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Accordions */}
      <section className="space-y-3">
        {/* Tax Documents Accordion */}
        <div className="bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/10">
          <button 
            onClick={() => setTaxDocsOpen(!taxDocsOpen)}
            className="cursor-pointer w-full p-4 flex items-center justify-between font-bold text-[#191b22] focus:outline-none"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-lg">description</span>
              <span className="text-[13px] font-headline">Tax Documents</span>
            </div>
            <span className={`material-symbols-outlined text-base transform transition-transform duration-200 ${taxDocsOpen ? 'rotate-180' : ''}`}>
              keyboard_arrow_down
            </span>
          </button>
          
          {taxDocsOpen && (
            <div className="px-4 pb-4 bg-white/50 border-t border-outline-variant/5 pt-3 space-y-3">
              <button 
                onClick={() => onDocumentDownloadClick('2023 Form 1099-NEC')}
                className="w-full text-left flex items-center justify-between py-2 border-b border-outline-variant/10"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[424654]">description</span>
                  <span className="text-xs text-[191b22] font-medium">2023 Form 1099-NEC</span>
                </div>
                <span className="material-symbols-outlined text-sm">download</span>
              </button>
              <button 
                onClick={() => onDocumentDownloadClick('Annual Earnings Statement')}
                className="w-full text-left flex items-center justify-between py-1"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-[424654]">description</span>
                  <span className="text-xs text-[191b22] font-medium">Annual Earnings Statement</span>
                </div>
                <span className="material-symbols-outlined text-sm">download</span>
              </button>
            </div>
          )}
        </div>

        {/* Payout Settings Accordion */}
        <div className="bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/10">
          <button 
            onClick={() => setPayoutSettingsOpen(!payoutSettingsOpen)}
            className="cursor-pointer w-full p-4 flex items-center justify-between font-bold text-[#191b22] focus:outline-none"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-lg">settings_suggest</span>
              <span className="text-[13px] font-headline">Payout Settings</span>
            </div>
            <span className={`material-symbols-outlined text-base transform transition-transform duration-200 ${payoutSettingsOpen ? 'rotate-180' : ''}`}>
              keyboard_arrow_down
            </span>
          </button>
          
          {payoutSettingsOpen && (
            <div className="px-4 pb-4 bg-white/50 border-t border-outline-variant/5 pt-3 space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-outline-variant/10">
                <span className="text-xs font-semibold text-on-surface-variant">Min Payout Threshold</span>
                <span className="text-xs font-bold text-primary">$100.00</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-outline-variant/10">
                <span className="text-xs font-semibold text-on-surface-variant">Frequency</span>
                <span className="text-xs font-bold text-on-surface">1st & 15th monthly</span>
              </div>
              <button 
                onClick={onContactSupportClick}
                className="w-full text-center py-2 mt-1 block text-xs font-bold text-primary hover:underline"
              >
                Request Custom Payout schedule
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
