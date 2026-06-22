import React, { useState } from 'react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSupport: (subject: string, msg: string) => void;
}

export default function SupportModal({
  isOpen,
  onClose,
  onSubmitSupport,
}: SupportModalProps) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!subject.trim() || !message.trim()) {
      setError('Please fill in both a subject and details for your query.');
      return;
    }

    onSubmitSupport(subject.trim(), message.trim());
    setSubject('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-outline-variant/10 animate-scale-up overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-surface-container border-b border-outline-variant/10 flex justify-between items-center">
          <h2 className="font-headline font-bold text-lg text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">contact_support</span>
            Contact Support Helpdesk
          </h2>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-200 transition-all text-on-surface-variant flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Have questions about fees, payout clearances, or updating banking information? Send a ticket directly to the Almatrail Accounting desk.
          </p>

          {/* Subject */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Query Subject
            </label>
            <input 
              type="text"
              placeholder="e.g., clearance timeframe, update payout routing card"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-surface-container-low px-4 py-3 rounded-xl border border-outline-variant/10 text-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
              required
            />
          </div>

          {/* Message text area */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              Message / Inquiry Details
            </label>
            <textarea 
              rows={4}
              placeholder="Tell us more about how our system can support you today..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-surface-container-low px-4 py-3 rounded-xl border border-outline-variant/10 text-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
              required
            />
          </div>

          {error && (
            <div className="bg-error-container/30 border border-error/25 text-error text-xs rounded-xl p-3 flex items-start gap-2.5">
              <span className="material-symbols-outlined text-base mt-0.5 shrink-0">error</span>
              <span className="leading-snug">{error}</span>
            </div>
          )}

          {/* Support availability label footer */}
          <div className="text-[10px] text-on-surface-variant italic leading-normal bg-neutral-50 p-2.5 rounded-lg border border-neutral-100 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-primary">circle_notifications</span>
            Our support teams usually reply back within 2-4 hours. Thank you!
          </div>

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
              Submit Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
