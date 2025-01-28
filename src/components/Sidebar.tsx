import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart2, Home, LineChart, HelpCircle, FileText, CreditCard, History, ChevronDown, ChevronRight, Target, TrendingUp, Shapes, BarChart, LineChart as LineChart2 } from 'lucide-react';

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

interface SubMenuLinkProps {
  to: string;
  label: string;
  isActive: boolean;
}

function SubMenuLink({ to, label, isActive }: SubMenuLinkProps) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-2 pl-12 rounded-lg transition-colors ${
        isActive 
          ? 'bg-gray-100 text-blue-600 font-medium' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
      }`}
    >
      <span className="text-sm">{label}</span>
    </Link>
  );
}

export function Sidebar() {
  const location = useLocation();
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(true);
  
  const isActive = (path: string) => location.pathname === path;
  const isAnalysisSection = location.pathname.startsWith('/app/analysis');

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col">
      <div className="flex items-center gap-3 px-4 py-5">
        <BarChart2 className="w-8 h-8 text-blue-600" />
        <span className="text-xl font-bold text-gray-900">CandlyzeAI</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-2">
          <SidebarLink
            to="/app"
            icon={<Home className="w-5 h-5" />}
            label="Dashboard"
            isActive={isActive('/app')}
          />
          
          {/* Chart Analysis with submenu */}
          <div>
            <button
              onClick={() => setIsAnalysisOpen(!isAnalysisOpen)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isAnalysisSection
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <LineChart className="w-5 h-5" />
              <span className="font-medium flex-1 text-left">Chart Analysis</span>
              {isAnalysisOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            {isAnalysisOpen && (
              <div className="mt-1 space-y-1">
                <SubMenuLink
                  to="/app/analysis/key-levels"
                  label="Key Levels Analysis"
                  isActive={isActive('/app/analysis/key-levels')}
                />
                <SubMenuLink
                  to="/app/analysis/trend"
                  label="Trend Analysis"
                  isActive={isActive('/app/analysis/trend')}
                />
                <SubMenuLink
                  to="/app/analysis/patterns"
                  label="Pattern Recognition"
                  isActive={isActive('/app/analysis/patterns')}
                />
                <SubMenuLink
                  to="/app/analysis/indicators"
                  label="Indicator Analysis"
                  isActive={isActive('/app/analysis/indicators')}
                />
                <SubMenuLink
                  to="/app/analysis/prediction"
                  label="Price Prediction"
                  isActive={isActive('/app/analysis/prediction')}
                />
              </div>
            )}
          </div>
          
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
            to="/app/subscription"
            icon={<CreditCard className="w-5 h-5" />}
            label="Subscription"
            isActive={isActive('/app/subscription')}
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
        </div>
      </nav>
    </div>
  );
}
