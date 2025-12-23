
import React, { useState, useEffect } from 'react';
import { Plus, Filter, Download, ExternalLink, Loader2, Search } from 'lucide-react';
import { MOCK_CONTRACTS, MOCK_CUSTOMERS } from '../services/mockData';
import { formatCurrency, formatDate } from '../lib/utils';
import { ContractStatus } from '../types';

const Contracts: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const getStatusBadge = (status: ContractStatus) => {
    switch (status) {
      case ContractStatus.ACTIVE:
        return <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border border-emerald-100">ปกติ</span>;
      case ContractStatus.OVERDUE:
        return <span className="bg-rose-50 text-rose-700 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border border-rose-100">ค้างชำระ</span>;
      case ContractStatus.CLOSED:
        return <span className="bg-slate-50 text-slate-700 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border border-slate-200">ปิดสัญญา</span>;
      default:
        return <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border border-blue-100">{status}</span>;
    }
  };

  if (loading) {
    return (
      <div className="h-64 flex flex-col items-center justify-center text-slate-400">
        <Loader2 className="animate-spin mb-4" size={32} />
        <p className="font-medium">กำลังรวบรวมข้อมูลสัญญา...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="ค้นหาเลขที่สัญญา หรือ ชื่อลูกค้า..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 shadow-sm transition-all active:scale-95">
            <Filter size={16} />
            กรองสถานะ
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/10 active:scale-95">
            <Plus size={16} />
            สร้างสัญญาใหม่
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">เลขที่สัญญา</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">ชื่อลูกค้า</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">ยอดจำนำ</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-center">ดอกเบี้ย</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">วันครบกำหนด</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">สถานะ</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_CONTRACTS.map((contract) => {
                const customer = MOCK_CUSTOMERS.find(c => c.id === contract.customerId);
                return (
                  <tr key={contract.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-mono text-sm font-bold text-blue-600">{contract.contractNo}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">{customer?.name || 'ไม่พบข้อมูล'}</td>
                    <td className="px-6 py-4 text-sm font-extrabold text-slate-900 text-right">{formatCurrency(contract.principalAmount)}</td>
                    <td className="px-6 py-4 text-sm text-slate-500 text-center">{contract.interestRate}% <span className="text-[10px]">/ด.</span></td>
                    <td className="px-6 py-4 text-sm text-slate-500 font-medium">{formatDate(contract.endDate)}</td>
                    <td className="px-6 py-4">{getStatusBadge(contract.status)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button title="เปิดสัญญา" className="text-slate-400 hover:text-blue-600 transition-colors"><ExternalLink size={18} /></button>
                        <button title="ดาวน์โหลด PDF" className="text-slate-400 hover:text-slate-600 transition-colors"><Download size={18} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Contracts;
