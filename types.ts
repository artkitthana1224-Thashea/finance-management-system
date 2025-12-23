
export enum UserRole {
  ADMIN = 'admin',
  FINANCE = 'finance',
  STAFF = 'staff',
  AUDITOR = 'auditor'
}

export enum VehicleStatus {
  ACTIVE = 'active',
  STORED = 'stored',
  REDEEMED = 'redeemed',
  SEIZED = 'seized'
}

export enum ContractStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
  CLOSED = 'closed',
  OVERDUE = 'overdue'
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

export interface Customer {
  id: string;
  name: string;
  idCard: string;
  phone: string;
  address: string;
  createdAt: string;
}

export interface Vehicle {
  id: string;
  customerId: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  vin: string;
  engineNo: string;
  status: VehicleStatus;
  images: string[];
}

export interface PawnContract {
  id: string;
  contractNo: string;
  customerId: string;
  vehicleId: string;
  principalAmount: number;
  interestRate: number; // monthly %
  startDate: string;
  endDate: string;
  status: ContractStatus;
  notes?: string;
}

export interface Payment {
  id: string;
  contractId: string;
  amount: number;
  type: 'interest' | 'principal' | 'closing';
  paymentDate: string;
  paymentMethod: 'cash' | 'transfer';
  receiptNo: string;
}

export interface DashboardStats {
  totalPawned: number;
  activeContractsCount: number;
  monthlyInterestIncome: number;
  overdueCount: number;
  recentPayments: Payment[];
}
