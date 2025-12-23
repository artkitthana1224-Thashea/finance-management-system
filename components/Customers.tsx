
import React, { useState, useEffect } from 'react';
import { Search, UserPlus, Edit2, Trash2, Eye, Loader2 } from 'lucide-react';
import { MOCK_CUSTOMERS } from '../services/mockData';
import { formatDate } from '../lib/utils';

const Customers: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-64 flex flex-col items-center justify-center text-slate-400">
        <Loader2 className="animate-spin mb-4" size={32} />
        <p className="font-medium">กำลังโหลดรายชื่อลูกค้า...</p>
      </div>
    );
  }

  const filteredCustomers = MOCK_CUSTOMERS.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.idCard.includes(searchTerm) ||
    c.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="ค้นหาลูกค้า (ชื่อ, เลขบัตร, เบอร์โทร)..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/10">
          <UserPlus size={18} />
          เพิ่มข้อมูลลูกค้า
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">ชื่อ-นามสกุล</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">เลขบัตรประชาชน</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">เบอร์โทรศัพท์</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">วันที่ลงทะเบียน</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-100">
                        {customer.name.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-900">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-mono tracking-tighter">{customer.idCard}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">{customer.phone}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{formatDate(customer.createdAt)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button title="ดูประวัติ" className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye size={16} />
                      </button>
                      <button title="แก้ไข" className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button title="ลบ" className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredCustomers.length === 0 && (
          <div className="p-16 text-center text-slate-500 flex flex-col items-center">
            <Search className="mb-2 opacity-20" size={48} />
            <p className="font-medium">ไม่พบข้อมูลลูกค้าที่ค้นหา</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customers;
