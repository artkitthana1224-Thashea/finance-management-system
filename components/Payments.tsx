
import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, CreditCard, Loader2, Download, ChevronRight, FileCheck } from 'lucide-react';
import { MOCK_PAYMENTS, MOCK_CONTRACTS } from '../services/mockData';
import { formatCurrency, formatDate } from '../lib/utils';

const Payments: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center text-slate-400 py-20">
        <Loader2 className="animate-spin mb-4" size={40} />
        <p className="font-bold">กำลังดึงข้อมูลธุรกรรมล่าสุด...</p>
      </div>
    );
  }

  const filteredPayments = MOCK_PAYMENTS.filter(p => 
    p.receiptNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex-1 max-w-xl">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="ค้นหาเลขที่ใบเสร็จ หรือ เลขที่สัญญา..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-700 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm active:scale-95">
            <Filter size={18} />
            กรอง
          </button>
          <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-6 py-3 rounded-2xl font-black text-sm hover:shadow-xl hover:shadow-emerald-600/20 transition-all active:scale-95">
            <Plus size={18} />
            รับชำระเงินใหม่
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">เลขที่ใบเสร็จ</th>
                <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">เลขที่สัญญา</th>
                <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">วันที่ชำระ</th>
                <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">ประเภท</th>
                <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest text-right">จำนวนเงิน</th>
                <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest text-center">ช่องทาง</th>
                <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPayments.map((payment) => {
                const contract = MOCK_CONTRACTS.find(c => c.id === payment.contractId);
                return (
                  <tr key={payment.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                          <FileCheck size={16} />
                        </div>
                        <span className="font-mono text-sm font-black text-slate-900">{payment.receiptNo}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm font-bold text-blue-600 hover:underline cursor-pointer">
                        {contract?.contractNo}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-sm font-medium text-slate-600">
                      {formatDate(payment.paymentDate)}
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        payment.type === 'interest' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                      }`}>
                        {payment.type === 'interest' ? 'ดอกเบี้ย' : 'เงินต้น'}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-sm font-black text-slate-900 text-right">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="px-8 py-5 text-center">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-lg text-slate-600 font-bold text-xs uppercase tracking-tight">
                        <CreditCard size={12} />
                        {payment.paymentMethod === 'transfer' ? 'โอนเงิน' : 'เงินสด'}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button title="ใบเสร็จ PDF" className="p-2.5 bg-slate-100 text-slate-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all">
                          <Download size={18} />
                        </button>
                        <button className="p-2.5 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-xl transition-all">
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredPayments.length === 0 && (
          <div className="p-20 text-center text-slate-400">
            <p className="font-bold text-lg">ไม่พบประวัติการชำระเงิน</p>
            <p className="text-sm">ลองค้นหาด้วยคำสำคัญอื่น</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;
