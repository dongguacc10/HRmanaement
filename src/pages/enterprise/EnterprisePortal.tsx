import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Building2, Users, Calendar, ChevronDown, LogOut, Settings, ChevronLeft, ChevronRight, Briefcase, LayoutDashboard } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';
import Dashboard from './Dashboard';
import Schedule from './Schedule';
import Candidates from './Candidates';
import CandidateDetail from './CandidateDetail';
import CandidateForm from './CandidateForm';
import Positions from './positions/Positions';
import CreatePosition from './positions/CreatePosition';
import CreatePositionPaste from './positions/CreatePositionPaste';
import CreatePositionImport from './positions/CreatePositionImport';
import EnterpriseSettings from './settings/EnterpriseSettings';
import ProfileSettings from './settings/ProfileSettings';

export function EnterprisePortal() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        userButtonRef.current &&
        !userMenuRef.current.contains(event.target as Node) &&
        !userButtonRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // TODO: Clear auth state, tokens etc
    window.location.href = '/login/enterprise';
  };

  const isActiveRoute = (path: string) => {
    if (path === '') {
      return location.pathname === '/enterprise' || location.pathname === '/enterprise/';
    }
    return location.pathname.startsWith(`/enterprise/${path}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 bg-white shadow-lg flex flex-col transition-all duration-300 z-30",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b">
          <img
            src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=64&h=64&fit=crop&auto=format"
            alt="Company Logo"
            className="h-10 w-10 rounded-lg"
          />
          <div className={cn(
            "ml-3 font-semibold text-gray-900 transition-opacity duration-300",
            isSidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
          )}>
            字节跳动
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/enterprise/dashboard"
                className={cn(
                  "flex items-center rounded-lg transition-colors",
                  isSidebarOpen ? "px-4 py-3" : "p-3",
                  isActiveRoute('')
                    ? "bg-blue-50 text-blue-600 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <LayoutDashboard className="h-5 w-5 flex-shrink-0" />
                <span className={cn(
                  "ml-3 transition-opacity duration-300 whitespace-nowrap",
                  isSidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                )}>
                  工作台
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/enterprise/candidates"
                className={cn(
                  "flex items-center rounded-lg transition-colors",
                  isSidebarOpen ? "px-4 py-3" : "p-3",
                  isActiveRoute('candidates')
                    ? "bg-blue-50 text-blue-600 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Users className="h-5 w-5 flex-shrink-0" />
                <span className={cn(
                  "ml-3 transition-opacity duration-300 whitespace-nowrap",
                  isSidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                )}>
                  候选人
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/enterprise/schedule"
                className={cn(
                  "flex items-center rounded-lg transition-colors",
                  isSidebarOpen ? "px-4 py-3" : "p-3",
                  isActiveRoute('schedule')
                    ? "bg-blue-50 text-blue-600 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Calendar className="h-5 w-5 flex-shrink-0" />
                <span className={cn(
                  "ml-3 transition-opacity duration-300 whitespace-nowrap",
                  isSidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                )}>
                  面试安排
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/enterprise/positions"
                className={cn(
                  "flex items-center rounded-lg transition-colors",
                  isSidebarOpen ? "px-4 py-3" : "p-3",
                  isActiveRoute('positions')
                    ? "bg-blue-50 text-blue-600 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Briefcase className="h-5 w-5 flex-shrink-0" />
                <span className={cn(
                  "ml-3 transition-opacity duration-300 whitespace-nowrap",
                  isSidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                )}>
                  职位管理
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/enterprise/settings"
                className={cn(
                  "flex items-center rounded-lg transition-colors",
                  isSidebarOpen ? "px-4 py-3" : "p-3",
                  isActiveRoute('settings')
                    ? "bg-blue-50 text-blue-600 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Settings className="h-5 w-5 flex-shrink-0" />
                <span className={cn(
                  "ml-3 transition-opacity duration-300 whitespace-nowrap",
                  isSidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                )}>
                  系统设置
                </span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Collapse Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-4 top-8 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          {isSidebarOpen ? (
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-500" />
          )}
        </button>

        {/* User Profile */}
        <div className="border-t p-4">
          <div className="relative">
            <button
              ref={userButtonRef}
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={cn(
                "w-full flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 transition-colors",
                !isSidebarOpen && "justify-center"
              )}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium flex-shrink-0">
                ZS
              </div>
              {isSidebarOpen && (
                <>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-gray-900">张三</div>
                    <div className="text-sm text-gray-500">HR经理</div>
                  </div>
                  <ChevronDown className={cn(
                    "w-4 h-4 text-gray-400 transition-transform duration-200",
                    showUserMenu && "rotate-180"
                  )} />
                </>
              )}
            </button>

            {/* User Menu Dropdown */}
            {showUserMenu && (
              <div
                ref={userMenuRef}
                className={cn(
                  "absolute bg-white rounded-lg shadow-lg border py-1 z-50",
                  isSidebarOpen 
                    ? "bottom-full left-0 right-0 mb-2"
                    : "left-full bottom-0 mb-0 ml-2 min-w-[160px] whitespace-nowrap"
                )}
              >
                <Link
                  to="/enterprise/settings/profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowUserMenu(false)}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  个人设置
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  退出登录
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div 
        className={cn(
          "flex-1 transition-all duration-300",
          isSidebarOpen ? "ml-64" : "ml-20"
        )}
      >
        <div className="main-content p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/candidate/new" element={<CandidateForm />} />
            <Route path="/candidate/:id" element={<CandidateDetail />} />
            <Route path="/candidate/:id/edit" element={<CandidateForm />} />
            <Route path="/schedule/*" element={<Schedule />} />
            <Route path="/positions/*" element={<Positions />} />
            <Route path="/positions/create" element={<CreatePosition />} />
            <Route path="/positions/create/paste" element={<CreatePositionPaste />} />
            <Route path="/positions/create/import" element={<CreatePositionImport />} />
            <Route path="/settings/*" element={<EnterpriseSettings />} />
            <Route path="/settings/profile" element={<ProfileSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default EnterprisePortal;