import React from 'react';
import { Transaction } from './types';

interface TransactionDetailModalProps {
  transaction: Transaction | null;
  onClose: () => void;
  onContactSupport: () => void;
}

export default function TransactionDetailModal({
  transaction,
  onClose,
  onContactSupport,
}: TransactionDetailModalProps) {
  if (!transaction) return null;

  const isEarning = transaction.type === 'earnings';

  return (
    <div className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl border border-outline-variant/10 animate-scale-up overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-surface-container border-b border-outline-variant/10 flex justify-between items-center">
          <h2 className="font-headline font-bold text-base text-on-surface">Transaction Detail</h2>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-200 transition-all text-on-surface-variant flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center ${isEarning ? 'bg-[#dae2ff] text-primary' : 'bg-error/5 text-error'}`}>
              <span className="material-symbols-outlined text-2xl">
                {isEarning ? 'payments' : 'account_balance_wallet'}
              </span>
            </div>
            <div>
              <h3 className="font-headline font-bold text-lg text-on-surface">{transaction.title}</h3>
              <p className="text-xs text-on-surface-variant">
                {transaction.date} • {transaction.time}
              </p>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-4 divide-y divide-outline-variant/10 space-y-3">
            <div className="flex justify-between items-center pb-2.5">
              <span className="text-xs font-semibold text-on-surface-variant">Reference ID</span>
              <span className="text-xs font-mono font-bold text-on-surface">
                {transaction.metadata || `#TRN-${transaction.id.slice(0, 4).toUpperCase()}`}
              </span>
            </div>
            <div className="flex justify-between items-center py-2.5">
              <span className="text-xs font-semibold text-on-surface-variant">Transaction Type</span>
              <span className="text-xs font-bold capitalize text-on-surface">{transaction.type}</span>
            </div>
            <div className="flex justify-between items-center py-2.5">
              <span className="text-xs font-semibold text-on-surface-variant">Clearance Status</span>
              <span className={`text-[10px] uppercase font-bold tracking-tight px-2 py-0.5 rounded-full ${transaction.status === 'completed' ? 'bg-[#cbf2de] text-emerald-800' : 'bg-surface-container-high text-on-surface-variant'}`}>
                {transaction.status}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2.5">
              <span className="text-xs font-semibold text-on-surface-variant">Net Amount</span>
              <span className={`text-base font-extrabold ${isEarning ? 'text-primary' : 'text-on-surface'}`}>
                {isEarning ? '+' : '-'}${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className="space-y-2.5">
            <button 
              onClick={() => {
                onClose();
                onContactSupport();
              }}
              className="w-full py-2.5 bg-primary/5 hover:bg-primary/10 text-primary font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <span className="material-symbols-outlined text-base">support_agent</span>
              Inquire about this transaction
            </button>
            <button 
              onClick={onClose}
              className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-on-surface-variant font-bold text-xs rounded-xl transition-all"
            >
              Keep Browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
