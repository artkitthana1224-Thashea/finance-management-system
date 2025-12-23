
import React from 'react';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { formatCurrency } from '../lib/utils';

const data = [
  { name: 'ม.ค.', income: 45000 },
  { name: 'ก.พ.', income: 52000 },
  { name: 'มี.ค.', income: 48000 },
  { name: 'เม.ย.', income: 61000 },
  { name: 'พ.ค.', income: 55000 },
  { name: 'มิ.ย.', income: 67000 },
];

const StatCard = ({ title, value, icon: Icon, trend, color }: any) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
      <div className={`flex items-center text-xs font-semibold ${trend > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
        {trend > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {Math.abs(trend)}%
      </div>
    </div>
    <div>
      <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="ยอดรับจำนำรวม" 
          value={formatCurrency(12500000)} 
          icon={FileText} 
          trend={12.5} 
          color="bg-blue-600"
        />
        <StatCard 
          title="รายได้ดอกเบี้ยเดือนนี้" 
          value={formatCurrency(185400)} 
          icon={TrendingUp} 
          trend={8.2} 
          color="bg-emerald-500"
        />
        <StatCard 
          title="ลูกค้าทั้งหมด" 
          value="156" 
          icon={Users} 
          trend={4.1} 
          color="bg-violet-500"
        />
        <StatCard 
          title="สัญญาใกล้ครบกำหนด" 
          value="12" 
          icon={AlertCircle} 
          trend={-2.4} 
          color="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-800">รายได้ดอกเบี้ยย้อนหลัง 6 เดือน</h3>
            <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20">
              <option>ปี 2567</option>
              <option>ปี 2566</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [formatCurrency(value), 'รายได้']}
                />
                <Area type="monotone" dataKey="income" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="font-bold text-slate-800 mb-6">ความเคลื่อนไหวล่าสุด</h3>
          <div className="flex-1 space-y-6">
            {[
              { type: 'payment', title: 'รับชำระดอกเบี้ย', desc: 'สัญญา CONT-004 (คุณพรชัย)', amount: '+฿1,250', time: '10 นาทีที่แล้ว', color: 'bg-emerald-50 text-emerald-600' },
              { type: 'contract', title: 'สร้างสัญญาใหม่', desc: 'Toyota Fortuner (คุณวิไล)', amount: '-฿450,000', time: '1 ชม. ที่แล้ว', color: 'bg-blue-50 text-blue-600' },
              { type: 'overdue', title: 'แจ้งเตือนค้างชำระ', desc: 'Honda Civic (คุณสมบัติ)', amount: 'ค้าง 3 วัน', time: '3 ชม. ที่แล้ว', color: 'bg-amber-50 text-amber-600' },
              { type: 'payment', title: 'รับชำระดอกเบี้ย', desc: 'สัญญา CONT-012 (คุณกิตติ)', amount: '+฿3,400', time: '5 ชม. ที่แล้ว', color: 'bg-emerald-50 text-emerald-600' },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${item.color}`}>
                  {item.title.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-bold text-slate-900 truncate">{item.title}</p>
                    <span className="text-sm font-bold text-slate-900">{item.amount}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">{item.desc}</p>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            ดูทั้งหมด
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
