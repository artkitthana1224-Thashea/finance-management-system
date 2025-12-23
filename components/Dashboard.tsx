
import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Loader2,
  ShieldCheck,
  Zap,
  Award,
  ChevronRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { formatCurrency } from '../lib/utils';
import { MOCK_VEHICLES } from '../services/mockData';

const data = [
  { name: 'ม.ค.', income: 450000 },
  { name: 'ก.พ.', income: 520000 },
  { name: 'มี.ค.', income: 480000 },
  { name: 'เม.ย.', income: 610000 },
  { name: 'พ.ค.', income: 550000 },
  { name: 'มิ.ย.', income: 670000 },
];

const StatCard = ({ title, value, icon: Icon, trend, color }: any) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all duration-500">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-2xl ${color} shadow-lg shadow-current/10`}>
        <Icon size={24} className="text-white" />
      </div>
      <div className={`flex items-center text-xs font-black ${trend > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
        {trend > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {Math.abs(trend)}%
      </div>
    </div>
    <div>
      <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest">{title}</h3>
      <p className="text-2xl font-black text-slate-900 mt-1">{value}</p>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center text-slate-400 py-20">
        <Loader2 className="animate-spin mb-4" size={48} />
        <p className="font-black text-lg text-slate-600">กำลังเชื่อมต่อฐานข้อมูลระดับองค์กร...</p>
      </div>
    );
  }

  // Filter only luxury cars for spotlight
  const luxurySpotlight = MOCK_VEHICLES.filter(v => v.brand === 'Lamborghini' || v.brand === 'Ferrari' || v.brand === 'Bugatti').slice(0, 4);

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      
      {/* Premium Welcome Banner */}
      <div className="relative overflow-hidden bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 px-3 py-1 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <Zap size={12} fill="currentColor" /> Premium Service Only
            </div>
            <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tighter mb-4">
              ยกระดับการบริหาร <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 text-glow">ทรัพย์สินมูลค่าสูง</span> ของคุณ
            </h1>
            <p className="text-slate-400 font-medium leading-relaxed mb-8">
              ระบบ AutoPawn Enterprise ออกแบบมาเพื่อดูแลรถยนต์ระดับไฮเอนด์ด้วยมาตรฐานความปลอดภัยสูงสุด พร้อมระบบคำนวณดอกเบี้ยแบบลดต้นลดดอกที่โปร่งใส
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-emerald-500" size={20} />
                <span className="text-sm font-bold">ความปลอดภัย 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="text-amber-500" size={20} />
                <span className="text-sm font-bold">ประกันภัยเต็มวงเงิน</span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-auto flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
              <img 
                src="https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=800" 
                alt="McLaren Spotlight" 
                className="w-72 h-44 object-cover rounded-3xl border border-white/10 shadow-2xl rotate-3 hover:rotate-0 transition-all duration-700 relative z-10"
              />
            </div>
          </div>
        </div>
        {/* Background Decorative */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="ยอดรับจำนำหมุนเวียน" 
          value={formatCurrency(125000000)} 
          icon={FileText} 
          trend={12.5} 
          color="bg-slate-900"
        />
        <StatCard 
          title="ดอกเบี้ยสะสมเดือนนี้" 
          value={formatCurrency(1854000)} 
          icon={TrendingUp} 
          trend={8.2} 
          color="bg-blue-600"
        />
        <StatCard 
          title="พอร์ตลูกค้าพรีเมียม" 
          value="48" 
          icon={Users} 
          trend={4.1} 
          color="bg-emerald-600"
        />
        <StatCard 
          title="ความเสี่ยงคงค้าง" 
          value="3" 
          icon={AlertCircle} 
          trend={-2.4} 
          color="bg-rose-600"
        />
      </div>

      {/* Supercar Spotlight Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Luxury Assets Spotlight</h2>
            <p className="text-sm text-slate-400 font-bold">รายการทรัพย์สินมูลค่าสูงที่อยู่ในคลังเก็บรักษา</p>
          </div>
          <button className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest hover:gap-3 transition-all">
            ดูทั้งหมด <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {luxurySpotlight.map((car, idx) => (
            <div key={idx} className="bg-white rounded-[2rem] border border-slate-100 p-2 shadow-sm hover:shadow-xl transition-all group overflow-hidden">
              <div className="relative aspect-[4/3] rounded-[1.8rem] overflow-hidden mb-4">
                <img src={car.images[0]} alt={car.model} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-3 left-3 text-white opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                  <p className="text-[10px] font-black uppercase tracking-widest">{car.brand}</p>
                  <p className="text-sm font-bold">{car.model}</p>
                </div>
              </div>
              <div className="px-4 pb-4">
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">สถานะ</span>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md text-[9px] font-black uppercase">Stored</span>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Growth Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-black text-slate-800 text-lg uppercase tracking-tight">Financial Growth Insight</h3>
              <p className="text-xs text-slate-400 font-bold">ผลประกอบการรายได้ดอกเบี้ย (YTD)</p>
            </div>
            <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-black outline-none focus:ring-4 focus:ring-blue-500/10">
              <option>ปีงบประมาณ 2567</option>
              <option>ปีงบประมาณ 2566</option>
            </select>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} dx={-10} tickFormatter={(val) => `${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', padding: '16px' }}
                  labelStyle={{ fontWeight: 900, marginBottom: '4px', color: '#1e293b' }}
                  formatter={(value: number) => [formatCurrency(value), 'รายได้ดอกเบี้ย']}
                />
                <Area type="monotone" dataKey="income" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorIncome)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Business Performance Widget */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col">
          <h3 className="font-black text-slate-800 text-lg uppercase tracking-tight mb-8">Asset Liquidity</h3>
          <div className="flex-1 space-y-8">
            {[
              { label: 'Supercars', value: 65, color: 'bg-blue-600', total: '฿85.4M' },
              { label: 'Luxury Sedans', value: 25, color: 'bg-emerald-600', total: '฿32.1M' },
              { label: 'Classic Cars', value: 10, color: 'bg-amber-500', total: '฿12.5M' },
            ].map((item, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-black text-slate-800 uppercase tracking-widest">{item.label}</span>
                  <span className="text-sm font-black text-slate-900">{item.total}</span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.value}%` }}></div>
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">ความหนาแน่นของพอร์ต: {item.value}%</p>
              </div>
            ))}
          </div>
          <div className="mt-10 p-6 bg-slate-50 rounded-3xl border border-slate-100">
             <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="text-blue-600" size={20} />
                <span className="text-sm font-black text-slate-800 uppercase tracking-tight">Security Status</span>
             </div>
             <p className="text-xs text-slate-500 font-medium leading-relaxed">คลังเก็บรักษา (Warehouse A/B) ทำงานปกติ พร้อมระบบสำรองไฟ 100%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
