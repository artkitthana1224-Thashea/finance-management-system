
import React, { useState, useEffect } from 'react';
import { User } from './types';
import { authService } from './services/authService';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Customers from './components/Customers';
import Contracts from './components/Contracts';
import Vehicles from './components/Vehicles';
import Payments from './components/Payments';
import Reports from './components/Reports';
import { ShieldCheck, Loader2 } from 'lucide-react';

const LoginPage = ({ onLogin }: { onLogin: (u: User) => void }) => {
  const [email, setEmail] = useState('admin@autopawn.com');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await authService.login(email, password);
      onLogin(user);
    } catch (err) {
      setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <ShieldCheck size={120} />
          </div>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-3xl mb-6 backdrop-blur-md shadow-inner">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">AutoPawn</h1>
          <p className="text-blue-100 mt-2 opacity-80 font-medium">Enterprise Management System</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">บัญชีผู้ใช้</label>
            <input 
              type="email" 
              required
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
              placeholder="admin@autopawn.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">รหัสผ่าน</label>
            <input 
              type="password" 
              required
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="p-4 bg-rose-50 text-rose-600 text-sm font-bold rounded-2xl border border-rose-100 text-center animate-bounce">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/30 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-600/20 active:scale-95"
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : 'เข้าสู่ระบบ'}
          </button>

          <div className="pt-6 border-t border-slate-100 flex flex-col gap-3">
             <p className="text-[10px] text-slate-400 font-bold uppercase text-center tracking-widest">Demo Accounts</p>
             <div className="grid grid-cols-2 gap-3">
              <button 
                type="button" 
                onClick={() => { setEmail('admin@autopawn.com'); setPassword('password'); }}
                className="py-2 px-3 text-[10px] uppercase font-black bg-slate-50 border border-slate-200 rounded-xl text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all"
              >
                Administrator
              </button>
              <button 
                type="button" 
                onClick={() => { setEmail('finance@autopawn.com'); setPassword('password'); }}
                className="py-2 px-3 text-[10px] uppercase font-black bg-slate-50 border border-slate-200 rounded-xl text-slate-500 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50 transition-all"
              >
                Finance Manager
              </button>
             </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const storedUser = authService.getCurrentUser();
    if (storedUser) setUser(storedUser);
    setIsInitializing(false);
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  if (!user) {
    return <LoginPage onLogin={(u) => setUser(u)} />;
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'customers':
        return <Customers />;
      case 'contracts':
        return <Contracts />;
      case 'vehicles':
        return <Vehicles />;
      case 'payments':
        return <Payments />;
      case 'reports':
        return <Reports />;
      default:
        return (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-400 font-medium">ส่วนนี้กำลังอยู่ระหว่างการพัฒนา...</p>
          </div>
        );
    }
  };

  return (
    <Layout 
      user={user} 
      onLogout={handleLogout} 
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage}
    >
      <div key={currentPage} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;
