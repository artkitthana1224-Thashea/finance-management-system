
import { UserRole, VehicleStatus, ContractStatus, Customer, Vehicle, PawnContract, Payment } from '../types';

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'c1', name: 'นายสมชาย ใจดี', idCard: '1100100123456', phone: '081-234-5678', address: '123 กรุงเทพฯ', createdAt: '2023-01-15' },
  { id: 'c2', name: 'นางสาวสิรินทร์ รักเรียน', idCard: '1200200123456', phone: '089-876-5432', address: '456 นนทบุรี', createdAt: '2023-02-10' },
  { id: 'c3', name: 'นายพรชัย มีสุข', idCard: '1300300123456', phone: '085-555-4433', address: '789 ปทุมธานี', createdAt: '2023-05-20' },
  { id: 'c4', name: 'เศรษฐี พันล้าน', idCard: '1400400123456', phone: '082-111-2222', address: '99 หมู่บ้านหรู สุขุมวิท', createdAt: '2023-06-01' },
  { id: 'c5', name: 'มาดาม รวยทรัพย์', idCard: '1500500123456', phone: '083-333-4444', address: '88 คอนโดเพนท์เฮาส์ สาทร', createdAt: '2023-07-15' },
  { id: 'c6', name: 'คุณชาย ธนิน', idCard: '1600600123456', phone: '084-555-6666', address: '77 คฤหาสน์หรู เขาใหญ่', createdAt: '2023-08-20' },
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
    images: ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=800']
  },
  {
    id: 'v2',
    customerId: 'c2',
    brand: 'Honda',
    model: 'Civic',
    year: 2022,
    color: 'Black',
    licensePlate: 'ฮฮ 5555',
    vin: 'HND987654321',
    engineNo: 'ENG-1122',
    status: VehicleStatus.ACTIVE,
    images: ['https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=800']
  },
  {
    id: 'v3',
    customerId: 'c3',
    brand: 'Isuzu',
    model: 'D-Max',
    year: 2020,
    color: 'Grey',
    licensePlate: 'บร 99',
    vin: 'ISZ445566778',
    engineNo: 'ENG-4455',
    status: VehicleStatus.SEIZED,
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800']
  },
  {
    id: 'v4',
    customerId: 'c4',
    brand: 'Lamborghini',
    model: 'Aventador SVJ',
    year: 2022,
    color: 'Giallo Orion (Yellow)',
    licensePlate: 'รวย 999',
    vin: 'LAMBO-SVJ-001',
    engineNo: 'V12-SVJ-99',
    status: VehicleStatus.STORED,
    images: ['https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=800']
  },
  {
    id: 'v5',
    customerId: 'c5',
    brand: 'Ferrari',
    model: '812 Superfast',
    year: 2021,
    color: 'Rosso Corsa (Red)',
    licensePlate: 'สส 812',
    vin: 'FER-812-SF-102',
    engineNo: 'F140-V12',
    status: VehicleStatus.STORED,
    images: ['https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=800']
  },
  {
    id: 'v6',
    customerId: 'c6',
    brand: 'Porsche',
    model: '911 GT3 RS',
    year: 2023,
    color: 'Python Green',
    licensePlate: 'กท 911',
    vin: 'POR-911-GT3-RS',
    engineNo: 'MA1-75-FLAT6',
    status: VehicleStatus.ACTIVE,
    images: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800']
  },
  {
    id: 'v7',
    customerId: 'c4',
    brand: 'McLaren',
    model: '720S Spider',
    year: 2021,
    color: 'Papaya Spark',
    licensePlate: 'มล 720',
    vin: 'MCL-720S-SPIDER',
    engineNo: 'M840T-V8',
    status: VehicleStatus.STORED,
    images: ['https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=800']
  },
  {
    id: 'v8',
    customerId: 'c5',
    brand: 'Rolls-Royce',
    model: 'Cullinan Black Badge',
    year: 2022,
    color: 'Black Diamond',
    licensePlate: 'ฮฮ 1',
    vin: 'RR-CULLINAN-BB',
    engineNo: 'V12-675-BITURBO',
    status: VehicleStatus.STORED,
    images: ['https://images.unsplash.com/photo-1631214499551-246bb191962a?q=80&w=800']
  },
  {
    id: 'v9',
    customerId: 'c6',
    brand: 'Aston Martin',
    model: 'DBS Volante',
    year: 2022,
    color: 'British Racing Green',
    licensePlate: 'อท 007',
    vin: 'AM-DBS-V12-VOL',
    engineNo: 'AM-V12-TBITURBO',
    status: VehicleStatus.ACTIVE,
    images: ['https://images.unsplash.com/photo-1603584173870-7f3ca99403d1?q=80&w=800']
  },
  {
    id: 'v10',
    customerId: 'c4',
    brand: 'Bentley',
    model: 'Continental GT Speed',
    year: 2022,
    color: 'Midnight Emerald',
    licensePlate: 'บท 888',
    vin: 'BEN-CONT-GT-SPEED',
    engineNo: 'W12-TBITURBO',
    status: VehicleStatus.STORED,
    images: ['https://images.unsplash.com/photo-1621349141049-760778c43491?q=80&w=800']
  },
  {
    id: 'v11',
    customerId: 'c1',
    brand: 'Mercedes-Benz',
    model: 'G63 AMG',
    year: 2022,
    color: 'G Manufaktur South Sea Blue',
    licensePlate: 'กข 63',
    vin: 'MB-G63-AMG-V8',
    engineNo: 'M177-V8-BITURBO',
    status: VehicleStatus.STORED,
    images: ['https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=800']
  },
  {
    id: 'v12',
    customerId: 'c5',
    brand: 'Bugatti',
    model: 'Chiron Pur Sport',
    year: 2022,
    color: 'French Racing Blue',
    licensePlate: 'บก 16',
    vin: 'BUG-CHIRON-PS-001',
    engineNo: 'W16-QUAD-TURBO',
    status: VehicleStatus.STORED,
    images: ['https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=800']
  },
  {
    id: 'v13',
    customerId: 'c6',
    brand: 'Lamborghini',
    model: 'Urus Performante',
    year: 2023,
    color: 'Arancio Borealis (Orange)',
    licensePlate: 'สส 666',
    vin: 'LAMBO-URUS-PERF',
    engineNo: 'V8-BITURBO-666',
    status: VehicleStatus.ACTIVE,
    images: ['https://images.unsplash.com/photo-1566473065136-ac72d655663d?q=80&w=800']
  },
  {
    id: 'v14',
    customerId: 'c4',
    brand: 'Koenigsegg',
    model: 'Jesko Absolut',
    year: 2023,
    color: 'Apex White',
    licensePlate: 'วว 300',
    vin: 'KGG-JESKO-ABS',
    engineNo: 'V8-TT-1600HP',
    status: VehicleStatus.STORED,
    images: ['https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?q=80&w=800']
  },
  {
    id: 'v15',
    customerId: 'c2',
    brand: 'Ferrari',
    model: 'SF90 Stradale',
    year: 2022,
    color: 'Giallo Modena',
    licensePlate: 'ฟฟ 90',
    vin: 'FER-SF90-HYBRID',
    engineNo: 'V8-HYBRID-1000',
    status: VehicleStatus.ACTIVE,
    images: ['https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=800']
  },
  {
    id: 'v16',
    customerId: 'c5',
    brand: 'Pagani',
    model: 'Huayra Roadster BC',
    year: 2021,
    color: 'Exposed Carbon Fiber',
    licensePlate: 'ปป 12',
    vin: 'PAG-HUAYRA-R-BC',
    engineNo: 'V12-AMG-M158',
    status: VehicleStatus.STORED,
    images: ['https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=800']
  },
  {
    id: 'v17',
    customerId: 'c6',
    brand: 'Audi',
    model: 'R8 V10 Performance',
    year: 2022,
    color: 'Kemora Gray',
    licensePlate: 'ออ 8',
    vin: 'AUDI-R8-V10-LMS',
    engineNo: 'V10-52-FSI',
    status: VehicleStatus.ACTIVE,
    images: ['https://images.unsplash.com/photo-1606148601202-094073836ec4?q=80&w=800']
  },
  {
    id: 'v18',
    customerId: 'c4',
    brand: 'Lotus',
    model: 'Emira V6 First Edition',
    year: 2023,
    color: 'Seneca Blue',
    licensePlate: 'ลล 11',
    vin: 'LOT-EMIRA-V6-FE',
    engineNo: 'V6-SCHARGE-TOYOTA',
    status: VehicleStatus.STORED,
    images: ['https://images.unsplash.com/photo-1619682817481-e994891cd1f5?q=80&w=800']
  },
  {
    id: 'v19',
    customerId: 'c5',
    brand: 'Maserati',
    model: 'MC20 Cielo',
    year: 2023,
    color: 'Acquamarina',
    licensePlate: 'มซ 20',
    vin: 'MAS-MC20-CIELO',
    engineNo: 'NETTUN-V6-TBT',
    status: VehicleStatus.STORED,
    images: ['https://images.unsplash.com/photo-1627454819213-f7724a697ce7?q=80&w=800']
  },
  {
    id: 'v20',
    customerId: 'c6',
    brand: 'Nissan',
    model: 'GT-R Nismo (R35)',
    year: 2022,
    color: 'Stealth Gray',
    licensePlate: 'กต 35',
    vin: 'NIS-GTR-NISMO-35',
    engineNo: 'VR38DETT-NIS',
    status: VehicleStatus.ACTIVE,
    images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800']
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
  },
  {
    id: 'con2',
    contractNo: 'CONT-2023-002',
    customerId: 'c2',
    vehicleId: 'v2',
    principalAmount: 350000,
    interestRate: 1.5,
    startDate: '2023-11-15',
    endDate: '2024-05-15',
    status: ContractStatus.OVERDUE
  },
  {
    id: 'con3',
    contractNo: 'CONT-2023-SUP-01',
    customerId: 'c4',
    vehicleId: 'v4',
    principalAmount: 15000000,
    interestRate: 1.1,
    startDate: '2023-12-01',
    endDate: '2024-06-01',
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
    receiptNo: 'REC-23-001'
  },
  {
    id: 'p2',
    contractId: 'con1',
    amount: 6250,
    type: 'interest',
    paymentDate: '2023-12-01',
    paymentMethod: 'cash',
    receiptNo: 'REC-23-002'
  },
  {
    id: 'p3',
    contractId: 'con2',
    amount: 5250,
    type: 'interest',
    paymentDate: '2023-12-15',
    paymentMethod: 'transfer',
    receiptNo: 'REC-23-003'
  }
];
