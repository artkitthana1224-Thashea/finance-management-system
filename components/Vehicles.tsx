
import React, { useState, useEffect } from 'react';
import { Search, Car, Filter, Plus, Loader2, MoreHorizontal, User, Tag, MapPin } from 'lucide-react';
import { MOCK_VEHICLES, MOCK_CUSTOMERS } from '../services/mockData';
import { VehicleStatus } from '../types';

const Vehicles: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const getStatusStyle = (status: VehicleStatus) => {
    switch (status) {
      case VehicleStatus.STORED: return 'bg-blue-600 text-white shadow-blue-600/20';
      case VehicleStatus.ACTIVE: return 'bg-emerald-600 text-white shadow-emerald-600/20';
      case VehicleStatus.SEIZED: return 'bg-rose-600 text-white shadow-rose-600/20';
      case VehicleStatus.REDEEMED: return 'bg-slate-500 text-white shadow-slate-500/20';
      default: return 'bg-slate-400 text-white';
    }
  };

  const statusMap: Record<VehicleStatus, string> = {
    [VehicleStatus.STORED]: 'จอดเก็บ',
    [VehicleStatus.ACTIVE]: 'ใช้งานปกติ',
    [VehicleStatus.SEIZED]: 'ยึดทรัพย์',
    [VehicleStatus.REDEEMED]: 'ไถ่ถอนแล้ว'
  };

  if (loading) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center text-slate-400 py-20">
        <Loader2 className="animate-spin mb-4" size={40} />
        <p className="font-bold">กำลังตรวจสอบคลังยานพาหนะ...</p>
      </div>
    );
  }

  const filtered = MOCK_VEHICLES.filter(v => 
    v.licensePlate.includes(searchTerm) || 
    v.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex-1 max-w-xl">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="ค้นหาทะเบียน, ยี่ห้อ, รุ่น หรือเลขตัวถัง..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-700 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm active:scale-95">
            <Filter size={18} />
            ตัวกรอง
          </button>
          <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-sm hover:shadow-xl hover:shadow-blue-600/20 transition-all active:scale-95">
            <Plus size={18} />
            เพิ่มรถยนต์
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((vehicle) => {
          const owner = MOCK_CUSTOMERS.find(c => c.id === vehicle.customerId);
          return (
            <div key={vehicle.id} className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden hover:shadow-2xl hover:shadow-slate-200 transition-all group hover:-translate-y-1">
              <div className="aspect-[16/10] w-full bg-slate-100 relative overflow-hidden">
                <img src={vehicle.images[0]} alt={vehicle.brand} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className={`absolute top-4 right-4 px-4 py-1.5 rounded-full text-[10px] font-black uppercase shadow-lg backdrop-blur-md ${getStatusStyle(vehicle.status)}`}>
                  {statusMap[vehicle.status]}
                </div>
                <div className="absolute bottom-4 left-4">
                   <div className="bg-slate-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-xl font-mono font-black text-xs border border-white/20">
                    {vehicle.licensePlate}
                   </div>
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-black text-slate-900 text-xl tracking-tight">{vehicle.brand} {vehicle.model}</h3>
                    <p className="text-sm font-bold text-slate-400 mt-1">{vehicle.year} • {vehicle.color}</p>
                  </div>
                  <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all">
                    <MoreHorizontal size={20} />
                  </button>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <User size={14} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">เจ้าของทรัพย์สิน</p>
                      <p className="text-sm font-bold text-slate-800">{owner?.name || 'ไม่พบข้อมูล'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center">
                      <Tag size={14} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">เลขตัวถัง (VIN)</p>
                      <p className="text-xs font-mono font-bold text-slate-600">{vehicle.vin}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <button className="w-full py-3.5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-colors shadow-lg shadow-slate-900/10 active:scale-95">
                    ดูประวัติการจำนำ
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {filtered.length === 0 && (
        <div className="py-24 text-center">
           <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-100 rounded-full text-slate-300 mb-4">
            <Car size={48} />
           </div>
           <h3 className="text-xl font-bold text-slate-800">ไม่พบข้อมูลรถที่ค้นหา</h3>
           <p className="text-slate-500 max-w-xs mx-auto mt-2">โปรดลองตรวจสอบความถูกต้องของเลขทะเบียนหรือยี่ห้อรถอีกครั้ง</p>
        </div>
      )}
    </div>
  );
};

export default Vehicles;
