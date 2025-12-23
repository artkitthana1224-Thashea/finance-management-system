
import React, { useState } from 'react';
import { Search, UserPlus, MoreVertical, Edit2, Trash2, Eye } from 'lucide-react';
import { MOCK_CUSTOMERS } from '../services/mockData';
import { formatDate } from '../lib/utils';

const Customers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="ค้นหาลูกค้า (ชื่อ, เลขบัตร, เบอร์โทร)..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
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
              {MOCK_CUSTOMERS.filter(c => c.name.includes(searchTerm) || c.idCard.includes(searchTerm)).map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                        {customer.name.charAt(0)}
                      </div>
                      <span className="font-medium text-slate-900">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-mono">{customer.idCard}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{customer.phone}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{formatDate(customer.createdAt)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {MOCK_CUSTOMERS.length === 0 && (
          <div className="p-12 text-center text-slate-500">
            <p>ไม่พบข้อมูลลูกค้า</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customers;
