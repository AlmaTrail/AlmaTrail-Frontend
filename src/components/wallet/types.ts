export interface WalletStats {
  currentBalance: number;
  totalEarnings: number;
  pendingClearance: number;
  nextSettlementDays: number;
}

export interface PaymentMethod {
  id: string;
  type: 'bank' | 'card';
  name: string;
  details: string;
  isDefault: boolean;
}

export interface Transaction {
  id: string;
  type: 'earnings' | 'withdrawal';
  title: string;
  date: string;
  time: string;
  amount: number;
  status: 'completed' | 'pending';
  metadata?: string;
}