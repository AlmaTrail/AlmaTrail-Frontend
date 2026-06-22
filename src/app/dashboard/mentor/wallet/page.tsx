"use client";
import React, { useState } from 'react';
import Navbar from '@/components/NewNavbar';
import Footer from '@/components/footerSections';
import WithdrawModal from '@/components/wallet/WithdrawModal';
import AddPaymentMethodModal from '@/components/wallet/AddPaymentMethodModal';
import TransactionDetailModal from '@/components/wallet/TransactionDetailModal';
import SupportModal from '@/components/wallet/SupportModal';
import { Transaction, PaymentMethod, WalletStats } from '@/components/wallet/types';

const INITIAL_STATS: WalletStats = {
  currentBalance: 1240.0,
  totalEarnings: 8450.0,
  pendingClearance: 450.0,
  nextSettlementDays: 3,
};

const INITIAL_PAYMENTS: PaymentMethod[] = [
  {
    id: 'p-1',
    type: 'bank',
    name: 'Chase Business Checking',
    details: '•••• 4291',
    isDefault: true,
  },
];

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 't-1',
    type: 'earnings',
    title: 'Earnings: Session with Elena Rodriguez',
    date: 'Oct 24, 2023',
    time: '14:20 PM',
    amount: 150.0,
    status: 'completed',
    metadata: '#TRN-8291',
  },
  {
    id: 't-2',
    type: 'withdrawal',
    title: 'Withdrawal to Bank Account',
    date: 'Oct 21, 2023',
    time: '09:15 AM',
    amount: -1000.0,
    status: 'completed',
    metadata: '#WDR-2201',
  },
  {
    id: 't-3',
    type: 'earnings',
    title: 'Earnings: Session with Marcus Thorne',
    date: 'Oct 19, 2023',
    time: '11:45 AM',
    amount: 225.0,
    status: 'pending',
    metadata: '#TRN-8104',
  },
  {
    id: 't-4',
    type: 'earnings',
    title: 'Earnings: Session with Sarah Jenkins',
    date: 'Oct 15, 2023',
    time: '16:30 PM',
    amount: 150.0,
    status: 'completed',
    metadata: '#TRN-7988',
  },
];

export default function WalletPage() {
  // State
  const [stats, setStats] = useState<WalletStats>(INITIAL_STATS);
  const [payments, setPayments] = useState<PaymentMethod[]>(INITIAL_PAYMENTS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);

  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isAddPaymentOpen, setIsAddPaymentOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const filteredTransactions = transactions.filter((t) => {
    if (filter === 'all') return true;
    return t.status === filter;
  });

  const primaryMethod = payments.find(p => p.isDefault) || payments[0];

  const triggerToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleWithdraw = (amount: number, methodId: string) => {
    setStats((prev: WalletStats) => ({
      ...prev,
      currentBalance: parseFloat((prev.currentBalance - amount).toFixed(2))
    }));
    triggerToast(`Successfully withdrew $${amount}!`, 'success');
    setIsWithdrawOpen(false);
  };

  const handleAddPayment = (newMethod: Omit<PaymentMethod, 'id'>) => {
    const freshMethod: PaymentMethod = {
      ...newMethod,
      id: `pm-${Date.now()}`,
    };
    setPayments(prev => [...prev, freshMethod]);
    triggerToast(`Payment method added!`, 'success');
    setIsAddPaymentOpen(false);
  };

  const handleDocumentDownload = (docName: string) => {
    triggerToast(`Downloaded ${docName}`, 'success');
  };

  const handleSupportSubmit = (subject: string, message: string) => {
    triggerToast('Support ticket submitted!', 'success');
    setIsSupportOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Toast */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg text-white text-sm font-medium"
          style={{
            backgroundColor: toast.type === 'success' ? '#10b981' : toast.type === 'error' ? '#ef4444' : '#3b82f6'
          }}>
          {toast.message}
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 py-12 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">My Wallet</h1>
            <p className="text-gray-600 text-lg max-w-2xl">
              Review your session earnings, track pending clearances, and manage your payouts.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Current Balance */}
            <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Current Balance</p>
              <h3 className="text-3xl font-bold text-blue-600 mb-6">
                ${stats.currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h3>
              <button
                onClick={() => setIsWithdrawOpen(true)}
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Withdraw Funds
              </button>
            </div>

            {/* Total Earnings */}
            <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Total Earnings</p>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                ${stats.totalEarnings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h3>
              <p className="text-sm text-green-600 font-medium">↑ 12% increase from last month</p>
            </div>

            {/* Pending Clearances */}
            <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Pending Clearances</p>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                ${stats.pendingClearance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h3>
              <p className="text-sm text-gray-600">Next settlement in {stats.nextSettlementDays} days</p>
            </div>
          </div>

          {/* Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Transactions */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow border border-gray-200">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Transaction History</h2>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as typeof filter)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>

                <div className="divide-y divide-gray-200">
                  {filteredTransactions.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                      No transactions found
                    </div>
                  ) : (
                    filteredTransactions.map((tx) => {
                      const isEarning = tx.type === 'earnings';
                      return (
                        <div
                          key={tx.id}
                          onClick={() => setSelectedTransaction(tx)}
                          className="p-6 hover:bg-gray-50 cursor-pointer transition-colors flex items-center justify-between"
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg ${
                                isEarning ? 'bg-green-500' : 'bg-red-500'
                              }`}
                            >
                              {isEarning ? '↓' : '↑'}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{tx.title}</h4>
                              <p className="text-sm text-gray-600">{tx.date} • {tx.time}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`text-lg font-bold ${isEarning ? 'text-green-600' : 'text-red-600'}`}>
                              {isEarning ? '+' : '-'}${Math.abs(tx.amount).toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}
                            </p>
                            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mt-1 ${
                              tx.status === 'completed'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {tx.status}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Payment Method</h3>
                  <button
                    onClick={() => setIsAddPaymentOpen(true)}
                    className="text-blue-600 text-sm font-semibold hover:underline"
                  >
                    Edit
                  </button>
                </div>
                {primaryMethod ? (
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="font-semibold text-gray-900">{primaryMethod.name}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {primaryMethod.type === 'bank' ? 'Bank Account' : 'Card'} • {primaryMethod.details}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No payment method added</p>
                )}
              </div>

              {/* Support */}
              <div className="bg-blue-50 rounded-lg shadow p-6 border border-blue-200">
                <h3 className="font-bold text-gray-900 mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Our support team is available 24/7 for payout inquiries.
                </p>
                <button
                  onClick={() => setIsSupportOpen(true)}
                  className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <WithdrawModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        availableBalance={stats.currentBalance}
        paymentMethods={payments}
        onWithdrawSubmit={handleWithdraw}
      />

      <AddPaymentMethodModal
        isOpen={isAddPaymentOpen}
        onClose={() => setIsAddPaymentOpen(false)}
        onAddMethod={handleAddPayment}
      />

      <TransactionDetailModal
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        onContactSupport={() => setIsSupportOpen(true)}
      />

      <SupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
        onSubmitSupport={handleSupportSubmit}
      />

      <Footer />
    </div>
  );
}

