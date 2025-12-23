
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Car, 
  FileText, 
  CreditCard, 
  BarChart3, 
  Bell, 
  LogOut,
  ChevronRight,
  ShieldCheck,
  Settings
} from 'lucide-react';
import { User, UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout, currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: 'dashboard', label: 'แดชบอร์ด', icon: LayoutDashboard, roles: [UserRole.ADMIN, UserRole.FINANCE, UserRole.STAFF, UserRole.AUDITOR] },
    { id: 'customers', label: 'รายชื่อลูกค้า', icon: Users, roles: [UserRole.ADMIN, UserRole.FINANCE, UserRole.STAFF] },
    { id: 'vehicles', label: 'ยานพาหนะ', icon: Car, roles: [UserRole.ADMIN, UserRole.FINANCE, UserRole.STAFF] },
    { id: 'contracts', label: 'สัญญาจำนำ', icon: FileText, roles: [UserRole.ADMIN, UserRole.FINANCE, UserRole.STAFF] },
    { id: 'payments', label: 'การชำระเงิน', icon: CreditCard, roles: [UserRole.ADMIN, UserRole.FINANCE] },
    { id: 'reports', label: 'รายงาน', icon: BarChart3, roles: [UserRole.ADMIN, UserRole.FINANCE, UserRole.AUDITOR] },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col shadow-2xl z-20">
        <div className="p-8 border-b border-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/40">
            <ShieldCheck className="text-white" size={28} />
          </div>
          <div>
            <span className="font-black text-2xl tracking-tighter block leading-none">AutoPawn</span>
            <span className="text-[10px] uppercase font-bold text-blue-400 tracking-[0.2em]">Enterprise</span>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-2 custom-scrollbar">
          <p className="text-[10px] uppercase font-black text-slate-500 px-4 mb-4 tracking-widest">Main Menu</p>
          {menuItems.map((item) => {
            if (!item.roles.includes(user.role)) return null;
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group relative ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/40 translate-x-1' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                  <Icon size={20} />
                </div>
                <span className={`font-bold text-sm ${isActive ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="ml-auto flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse mr-2"></div>
                    <ChevronRight size={14} className="opacity-50" />
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-slate-800 bg-slate-950/30">
          <div className="flex items-center gap-4 px-2 mb-6 group cursor-pointer">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-700 to-slate-800 flex items-center justify-center text-lg font-black border border-slate-700 shadow-md">
                {user.name.charAt(0)}
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900"></div>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-black truncate group-hover:text-blue-400 transition-colors">{user.name}</p>
              <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{user.role}</p>
            </div>
            <button className="text-slate-600 hover:text-white transition-colors">
              <Settings size={18} />
            </button>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-2xl text-rose-400 border border-rose-400/20 hover:bg-rose-400 hover:text-white transition-all font-bold text-sm active:scale-95"
          >
            <LogOut size={18} />
            <span>ออกจากระบบ</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-10 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <div className="w-1 h-8 bg-blue-600 rounded-full"></div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight uppercase">
              {menuItems.find(i => i.id === currentPage)?.label || 'Page'}
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{new Date().toLocaleDateString('th-TH', { weekday: 'long' })}</span>
              <span className="text-sm font-bold text-slate-800">{new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
            <div className="h-10 w-[1px] bg-slate-100 mx-2"></div>
            <button className="relative p-2.5 text-slate-500 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all active:scale-95">
              <Bell size={22} />
              <span className="absolute top-2.5 right-2.5 w-3 h-3 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Viewport */}
        <div className="flex-1 overflow-y-auto p-10 bg-slate-50/50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
