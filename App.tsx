
import React, { useState, useEffect } from 'react';
import { User } from './types';
import { authService } from './services/authService';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Customers from './components/Customers';
import Contracts from './components/Contracts';
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
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-blue-600 p-8 text-white text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4 backdrop-blur-sm">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl font-bold">AutoPawn Enterprise</h1>
          <p className="text-blue-100 mt-2 opacity-80">ระบบจัดการรับจำนำรถยนต์ระดับองค์กร</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">บัญชีผู้ใช้</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              placeholder="admin@autopawn.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-semibold text-slate-700">รหัสผ่าน</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/30 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : 'เข้าสู่ระบบ'}
          </button>

          <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
            <button 
              type="button" 
              onClick={() => { setEmail('admin@autopawn.com'); setPassword('password'); }}
              className="text-[10px] uppercase font-bold text-slate-400 hover:text-blue-600 text-center"
            >
              Log in as Admin
            </button>
            <button 
              type="button" 
              onClick={() => { setEmail('finance@autopawn.com'); setPassword('password'); }}
              className="text-[10px] uppercase font-bold text-slate-400 hover:text-blue-600 text-center"
            >
              Log in as Finance
            </button>
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
    // Check if user is already logged in (persistence)
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
      {renderContent()}
    </Layout>
  );
};

export default App;
