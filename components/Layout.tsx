
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
  ShieldCheck
} from 'lucide-react';
import { User, UserRole } from '../types';
import { authService } from '../services/authService';

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
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <ShieldCheck className="text-white" size={24} />
          </div>
          <span className="font-bold text-xl tracking-tight">AutoPawn</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          {menuItems.map((item) => {
            if (!item.roles.includes(user.role)) return null;
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
                {isActive && <ChevronRight size={16} className="ml-auto opacity-50" />}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-slate-500 uppercase">{user.role}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">ออกจากระบบ</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">
          <h1 className="text-lg font-semibold text-slate-800">
            {menuItems.find(i => i.id === currentPage)?.label || 'Page'}
          </h1>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
            <span className="text-sm text-slate-500 font-medium">{new Date().toLocaleDateString('th-TH')}</span>
          </div>
        </header>

        {/* Viewport */}
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
