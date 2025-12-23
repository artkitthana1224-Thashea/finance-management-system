
import { UserRole, VehicleStatus, ContractStatus, Customer, Vehicle, PawnContract, Payment } from '../types';

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'c1', name: 'นายสมชาย ใจดี', idCard: '1100100123456', phone: '081-234-5678', address: '123 กรุงเทพฯ', createdAt: '2023-01-15' },
  { id: 'c2', name: 'นางสาวสิรินทร์ รักเรียน', idCard: '1200200123456', phone: '089-876-5432', address: '456 นนทบุรี', createdAt: '2023-02-10' },
];

export const MOCK_VEHICLES: Vehicle[] = [
  {
    id: 'v1',
    customerId: 'c1',
    brand: 'Toyota',
    model: 'Camry',
    year: 2021,
    color: 'White',
    licensePlate: 'กข 1234',
    vin: 'TYT123456789',
    engineNo: 'ENG-9988',
    status: VehicleStatus.STORED,
    images: ['https://picsum.photos/400/300?random=1']
  }
];

export const MOCK_CONTRACTS: PawnContract[] = [
  {
    id: 'con1',
    contractNo: 'CONT-2023-001',
    customerId: 'c1',
    vehicleId: 'v1',
    principalAmount: 500000,
    interestRate: 1.25,
    startDate: '2023-10-01',
    endDate: '2024-04-01',
    status: ContractStatus.ACTIVE
  }
];

export const MOCK_PAYMENTS: Payment[] = [
  {
    id: 'p1',
    contractId: 'con1',
    amount: 6250,
    type: 'interest',
    paymentDate: '2023-11-01',
    paymentMethod: 'transfer',
    receiptNo: 'REC-001'
  }
];
