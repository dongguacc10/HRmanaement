import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Settings, Building2, LayoutDashboard, ChevronDown, LogOut, ChevronRight, ChevronLeft } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Dashboard from './Dashboard';
import EnterpriseList from './enterprises/EnterpriseList';
import EnterpriseDetail from './enterprises/EnterpriseDetail';
import EnterpriseForm from './enterprises/EnterpriseForm';
import UserSettings from './settings/UserSettings';
import { cn } from '../../lib/utils';

export function AdminPortal() {
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
    window.location.href = '/login/admin';
  };

  const isActiveRoute = (path: string) => {
    if (path === '') {
      return location.pathname === '/admin' || location.pathname === '/admin/dashboard';
    }
    return location.pathname.startsWith(`/admin/${path}`);
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
        {/* Header with Logo */}
        <div className="flex items-center h-16 px-4 border-b relative">
          <div className="flex items-center flex-1">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Settings className="h-8 w-8 text-white" />
            </div>
            <div className={cn(
              "ml-3 font-semibold text-xl text-gray-900 transition-opacity duration-300",
              isSidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
            )}>
              管理后台
            </div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={cn(
              "absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            )}
          >
            {isSidebarOpen ? (
              <ChevronLeft className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-500" />
            )}
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin/dashboard"
                className={cn(
                  "flex items-center px-4 py-3 rounded-lg transition-colors",
                  isActiveRoute('') && !isActiveRoute('enterprises')
                    ? "bg-blue-50 text-blue-600 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <LayoutDashboard className="h-6 w-6 flex-shrink-0" />
                <span className={cn(
                  "ml-3 transition-opacity duration-300 whitespace-nowrap",
                  isSidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                )}>
                  仪表盘
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/enterprises"
                className={cn(
                  "flex items-center px-4 py-3 rounded-lg transition-colors",
                  isActiveRoute('enterprises')
                    ? "bg-blue-50 text-blue-600 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Building2 className="h-6 w-6 flex-shrink-0" />
                <span className={cn(
                  "ml-3 transition-opacity duration-300 whitespace-nowrap",
                  isSidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                )}>
                  企业管理
                </span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* User Profile */}
        <div className="border-t p-4">
          <div className="relative">
            <button
              ref={userButtonRef}
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={cn(
                "w-full flex items-center hover:bg-gray-50 rounded-lg p-3 transition-colors",
                !isSidebarOpen && "justify-center"
              )}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium flex-shrink-0">
                JD
              </div>
              {isSidebarOpen && (
                <>
                  <div className="flex-1 ml-3 text-left">
                    <div className="font-medium text-gray-900">John Doe</div>
                    <div className="text-sm text-gray-500">管理员</div>
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
                  to="/admin/settings"
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
            <Route path="/enterprises" element={<EnterpriseList />} />
            <Route path="/enterprises/new" element={<EnterpriseForm />} />
            <Route path="/enterprises/:id" element={<EnterpriseDetail />} />
            <Route path="/settings" element={<UserSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminPortal;