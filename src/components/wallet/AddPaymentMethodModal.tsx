import React, { useState } from 'react';
import { PaymentMethod } from './types';

interface AddPaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMethod: (method: Omit<PaymentMethod, 'id'>) => void;
}

export default function AddPaymentMethodModal({
  isOpen,
  onClose,
  onAddMethod,
}: AddPaymentMethodModalProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState<'bank' | 'card'>('bank');
  const [details, setDetails] = useState('');
  const [isDefault, setIsDefault] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !details.trim()) {
      setError('Please fill out all the fields.');
      return;
    }

    onAddMethod({
      name: name.trim(),
      type,
      details: details.trim(),
      isDefault,
    });

    // Reset fields
    setName('');
    setDetails('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-outline-variant/10 animate-scale-up overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-surface-container border-b border-outline-variant/10 flex justify-between items-center">
          <h2 className="font-headline font-bold text-lg text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">add_card</span>
            Add Payment Method
          </h2>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-200 transition-all text-on-surface-variant flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Method Type Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setType('bank')}
              className={`py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex flex-col items-center gap-2 transition-all border ${type === 'bank' ? 'border-primary bg-primary/5 text-primary' : 'border-outline-variant/10 text-on-surface-variant hover:bg-surface-container-low'}`}
            >
              <span className="material-symbols-outlined text-2xl">account_balance</span>
              Bank Account (Checking)
            </button>
            <button
              type="button"
              onClick={() => setType('card')}
              className={`py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex flex-col items-center gap-2 transition-all border ${type === 'card' ? 'border-primary bg-primary/5 text-primary' : 'border-outline-variant/10 text-on-surface-variant hover:bg-surface-container-low'}`}
            >
              <span className="material-symbols-outlined text-2xl">credit_card</span>
              Credit / Debit Card
            </button>
          </div>

          {/* Account/Card Nickname */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Account / Card Nickname
            </label>
            <input 
              type="text"
              placeholder={type === 'bank' ? 'e.g. Chase Business Checking' : 'e.g. Visa Travel Card'}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-surface-container-low px-4 py-3 rounded-xl border border-outline-variant/10 text-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
              required
            />
          </div>

          {/* Number detail mask */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              {type === 'bank' ? 'Routing / Account Last 4 Digits' : 'Card Last 4 Digits'}
            </label>
            <input 
              type="text"
              placeholder="e.g. •••• 4291"
              maxLength={12}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full bg-surface-container-low px-4 py-3 rounded-xl border border-outline-variant/10 text-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
              required
            />
          </div>

          {/* Default Switcher toggle */}
          <label className="flex items-center gap-3 py-1 cursor-pointer">
            <input 
              type="checkbox"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              className="w-4.5 h-4.5 checked:bg-primary accent-primary text-primary focus:ring-primary/20 border-outline-variant/10 rounded"
            />
            <span className="text-xs font-semibold text-on-surface-variant">
              Set as primary payout method
            </span>
          </label>

          {error && (
            <div className="bg-error-container/30 border border-error/25 text-error text-xs rounded-xl p-3 flex items-start gap-2.5">
              <span className="material-symbols-outlined text-base mt-0.5 shrink-0">error</span>
              <span className="leading-snug">{error}</span>
            </div>
          )}

          {/* Buttons */}
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
              className="cursor-pointer flex-1 py-3 bg-primary text-white rounded-xl font-bold text-sm text-center transition-colors hover:opacity-90 active:scale-95 shadow-md shadow-primary/10"
            >
              Add Method
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
