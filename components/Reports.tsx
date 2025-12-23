
import React, { useState, useEffect } from 'react';
import { BarChart3, Download, Calendar, Filter, FileText, Loader2, ArrowUpRight, ChevronDown, Printer } from 'lucide-react';
import { formatCurrency, formatDate } from '../lib/utils';
import { MOCK_CONTRACTS, MOCK_PAYMENTS } from '../services/mockData';

const Reports: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeReport, setActiveReport] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState({ start: '2023-01-01', end: '2024-12-31' });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center text-slate-400 py-20">
        <Loader2 className="animate-spin mb-4" size={48} />
        <p className="font-bold text-lg text-slate-600">กำลังประมวลผลข้อมูลรายงานมวลรวม...</p>
      </div>
    );
  }

  const reportTypes = [
    { id: 'income', title: 'รายงานรายได้ (Monthly Income)', desc: 'สรุปรายได้ดอกเบี้ยและค่าธรรมเนียมรายเดือน', icon: BarChart3, color: 'bg-emerald-600' },
    { id: 'overdue', title: 'รายงานค้างชำระ (Past Due)', desc: 'รายชื่อลูกค้าที่มียอดค้างชำระเกินกำหนด', icon: FileText, color: 'bg-rose-500' },
    { id: 'inventory', title: 'รายงานสต็อกรถ (Inventory)', desc: 'สรุปจำนวนรถเข้า-ออก ในแต่ละช่วงเวลา', icon: Calendar, color: 'bg-blue-600' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Filters Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-slate-100 rounded-xl text-slate-600">
            <Filter size={20} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">ตัวกรองรายงาน</h3>
            <p className="text-xs text-slate-500">กำหนดช่วงเวลาเพื่อดูข้อมูลที่ต้องการ</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2">
            <Calendar size={16} className="text-slate-400" />
            <input type="date" value={dateRange.start} onChange={e => setDateRange({...dateRange, start: e.target.value})} className="bg-transparent text-sm outline-none font-medium" />
            <span className="text-slate-300">ถึง</span>
            <input type="date" value={dateRange.end} onChange={e => setDateRange({...dateRange, end: e.target.value})} className="bg-transparent text-sm outline-none font-medium" />
          </div>
          <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-900/20">
            อัปเดตข้อมูล
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reportTypes.map((report) => (
          <button 
            key={report.id} 
            onClick={() => setActiveReport(report.id)}
            className={`text-left bg-white p-8 rounded-3xl border transition-all group relative overflow-hidden ${
              activeReport === report.id ? 'border-blue-600 ring-4 ring-blue-500/10' : 'border-slate-200 hover:border-blue-300 hover:shadow-xl hover:shadow-slate-200/50'
            }`}
          >
            <div className={`w-14 h-14 rounded-2xl ${report.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
              <report.icon size={28} />
            </div>
            <h3 className="font-black text-slate-800 text-lg mb-2 leading-tight">{report.title}</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed opacity-80">{report.desc}</p>
            <div className="flex items-center text-blue-600 text-sm font-bold">
              เรียกดูข้อมูล <ArrowUpRight size={16} className="ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
            {activeReport === report.id && (
              <div className="absolute top-4 right-4 text-blue-600">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping"></div>
              </div>
            )}
          </button>
        ))}
      </div>

      {activeReport === 'income' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-in slide-in-from-top-4 duration-500">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <h4 className="text-xl font-black text-slate-800">สรุปรายได้ดอกเบี้ยรายเดือน</h4>
              <p className="text-sm text-slate-500 font-medium">ประจำวันที่ {formatDate(dateRange.start)} - {formatDate(dateRange.end)}</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                <Printer size={18} /> พิมพ์รายงาน
              </button>
              <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20">
                <Download size={18} /> Export Excel
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-8 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">วันที่รับชำระ</th>
                  <th className="px-8 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">เลขที่ใบเสร็จ</th>
                  <th className="px-8 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">ประเภท</th>
                  <th className="px-8 py-4 text-xs font-black text-slate-500 uppercase tracking-widest text-right">จำนวนเงิน</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_PAYMENTS.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-4 text-sm font-bold text-slate-900">{formatDate(p.paymentDate)}</td>
                    <td className="px-8 py-4 text-sm font-mono text-blue-600">{p.receiptNo}</td>
                    <td className="px-8 py-4">
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${p.type === 'interest' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                        {p.type === 'interest' ? 'ดอกเบี้ย' : 'เงินต้น'}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-sm font-black text-slate-900 text-right">{formatCurrency(p.amount)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-900 text-white">
                <tr>
                  <td colSpan={3} className="px-8 py-6 text-sm font-black uppercase tracking-widest">ยอดรวมรายได้ทั้งสิ้น</td>
                  <td className="px-8 py-6 text-xl font-black text-right">{formatCurrency(MOCK_PAYMENTS.reduce((acc, curr) => acc + curr.amount, 0))}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {!activeReport && (
        <div className="py-20 flex flex-col items-center justify-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
            <FileText size={40} />
          </div>
          <h4 className="text-lg font-bold text-slate-800">กรุณาเลือกประเภทรายงาน</h4>
          <p className="text-slate-500 text-sm">เลือกรายงานจากด้านบนเพื่อดูรายละเอียดข้อมูลเชิงลึก</p>
        </div>
      )}
    </div>
  );
};

export default Reports;
