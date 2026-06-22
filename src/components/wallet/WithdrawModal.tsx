import React, { useState } from 'react';
import { PaymentMethod } from './types';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableBalance: number;
  paymentMethods: PaymentMethod[];
  onWithdrawSubmit: (amount: number, methodId: string) => void;
}

export default function WithdrawModal({
  isOpen,
  onClose,
  availableBalance,
  paymentMethods,
  onWithdrawSubmit,
}: WithdrawModalProps) {
  const [amount, setAmount] = useState<string>('');
  const [selectedMethod, setSelectedMethod] = useState<string>(paymentMethods[0]?.id || '');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const withdrawalAmount = parseFloat(amount);
    if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
      setError('Please enter a valid amount greater than zero.');
      return;
    }

    if (withdrawalAmount > availableBalance) {
      setError(`Insufficient funds. Your available balance is $${availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}.`);
      return;
    }

    onWithdrawSubmit(withdrawalAmount, selectedMethod);
    setAmount('');
  };

  return (
    <div className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-outline-variant/10 animate-scale-up overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-surface-container border-b border-outline-variant/10 flex justify-between items-center">
          <h2 className="font-headline font-bold text-lg text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">payments</span>
            Withdraw Funds
          </h2>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-200 transition-all text-on-surface-variant flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Available balance indicator */}
          <div className="bg-primary/5 rounded-xl p-4 flex justify-between items-center">
            <div>
              <span className="text-xs text-on-surface-variant block">Available balance</span>
              <span className="font-headline font-bold text-lg text-primary">
                ${availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <button 
              type="button"
              onClick={() => setAmount(availableBalance.toFixed(2))}
              className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full hover:bg-opacity-90 leading-normal"
            >
              Use Max
            </button>
          </div>

          {/* Amount input */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Amount to Withdraw ($)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/70 font-semibold">$</span>
              <input 
                type="number" 
                step="0.01" 
                min="1"
                placeholder="0.00"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError(null);
                }}
                className="w-full bg-surface-container-low pl-8 pr-4 py-3 rounded-xl border border-outline-variant/10 focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-base font-bold text-on-surface focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Select Payment Method */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Deposit To
            </label>
            <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1">
              {paymentMethods.map((pm) => (
                <label 
                  key={pm.id}
                  className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${selectedMethod === pm.id ? 'border-primary bg-primary/5 shadow-sm' : 'border-outline-variant/10 bg-white hover:bg-surface-container-low'}`}
                >
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="payout_method" 
                      value={pm.id}
                      checked={selectedMethod === pm.id}
                      onChange={() => setSelectedMethod(pm.id)}
                      className="hidden"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedMethod === pm.id ? 'border-primary' : 'border-outline'}`}>
                      {selectedMethod === pm.id && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                    </div>
                    <div>
                      <span className="text-sm font-bold text-on-surface block leading-tight">{pm.name}</span>
                      <span className="text-xs text-on-surface-variant mt-0.5 block leading-normal">
                        {pm.type === 'bank' ? 'Direct Deposit' : 'Card'} • {pm.details}
                      </span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant text-lg">
                    {pm.type === 'bank' ? 'account_balance' : 'credit_card'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-error-container/30 border border-error/25 text-error text-xs rounded-xl p-3 flex items-start gap-2.5">
              <span className="material-symbols-outlined text-base mt-0.5 shrink-0">error</span>
              <span className="leading-snug">{error}</span>
            </div>
          )}

          {/* Form Actions */}
          <div className="pt-2 flex gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="cursor-pointer flex-1 py-3 bg-surface-container-low hover:bg-surface-container rounded-xl font-bold text-sm text-on-surface-variant text-center transition-colors border border-outline-variant/10"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="cursor-pointer flex-1 py-3 bg-gradient-to-r from-primary to-primary-container text-white rounded-xl font-bold text-sm text-center transition-colors shadow-md hover:opacity-90 active:scale-95"
            >
              Withdraw Funds
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
