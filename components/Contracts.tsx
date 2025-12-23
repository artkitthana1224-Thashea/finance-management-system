
import React from 'react';
import { Plus, Filter, Download, ExternalLink } from 'lucide-react';
import { MOCK_CONTRACTS, MOCK_CUSTOMERS } from '../services/mockData';
import { formatCurrency, formatDate, cn } from '../lib/utils';
import { ContractStatus } from '../types';

const Contracts: React.FC = () => {
  const getStatusBadge = (status: ContractStatus) => {
    switch (status) {
      case ContractStatus.ACTIVE:
        return <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-bold uppercase">ปกติ</span>;
      case ContractStatus.OVERDUE:
        return <span className="bg-rose-100 text-rose-700 px-2 py-1 rounded text-xs font-bold uppercase">ค้างชำระ</span>;
      case ContractStatus.CLOSED:
        return <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-bold uppercase">ปิดสัญญา</span>;
      default:
        return <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold uppercase">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-slate-800">รายการสัญญาจำนำทั้งหมด</h2>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Filter size={16} />
            กรอง
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
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
                  <tr key={contract.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-mono text-sm font-medium text-blue-600">{contract.contractNo}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{customer?.name || 'ไม่พบข้อมูล'}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900 text-right">{formatCurrency(contract.principalAmount)}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 text-center">{contract.interestRate}% /ด.</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{formatDate(contract.endDate)}</td>
                    <td className="px-6 py-4">{getStatusBadge(contract.status)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <button title="เปิดสัญญา" className="text-slate-400 hover:text-blue-600"><ExternalLink size={18} /></button>
                        <button title="ดาวน์โหลด PDF" className="text-slate-400 hover:text-slate-600"><Download size={18} /></button>
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
