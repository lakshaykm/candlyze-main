import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart2, 
  Home, 
  LineChart, 
  HelpCircle, 
  FileText,
  CreditCard,
  History
} from 'lucide-react';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

function SidebarLink({ to, icon, label, isActive }: SidebarLinkProps) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        isActive 
          ? 'bg-blue-600 text-white' 
          : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
}

export function Sidebar() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
      <div className="flex items-center gap-3 px-4 py-5">
        <BarChart2 className="w-8 h-8 text-blue-600" />
        <span className="text-xl font-bold text-gray-900">CandlyzeAI</span>
      </div>

      <nav className="mt-8 space-y-2">
        <SidebarLink
          to="/app"
          icon={<Home className="w-5 h-5" />}
          label="Dashboard"
          isActive={isActive('/app')}
        />
        
        <SidebarLink
          to="/app/analysis"
          icon={<LineChart className="w-5 h-5" />}
          label="Chart Analysis"
          isActive={isActive('/app/analysis')}
        />
        
        <SidebarLink
          to="/app/history"
          icon={<History className="w-5 h-5" />}
          label="Analysis History"
          isActive={isActive('/app/history')}
        />

        <div className="py-3">
          <div className="h-px bg-gray-200" />
        </div>
        
        <SidebarLink
          to="/subscription"
          icon={<CreditCard className="w-5 h-5" />}
          label="Subscription"
          isActive={isActive('/subscription')}
        />

        <div className="py-3">
          <div className="h-px bg-gray-200" />
        </div>

        <SidebarLink
          to="/about"
          icon={<HelpCircle className="w-5 h-5" />}
          label="About"
          isActive={isActive('/about')}
        />
        
        <SidebarLink
          to="/terms"
          icon={<FileText className="w-5 h-5" />}
          label="Terms"
          isActive={isActive('/terms')}
        />
      </nav>
    </div>
  );
}
