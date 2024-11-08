import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Users, MapPin, Building2, UserCog, FolderTree } from 'lucide-react';
import InterviewerSettings from './InterviewerSettings';
import UserManagement from './UserManagement';
import LocationSettings from './LocationSettings';
import CompanySettings from './CompanySettings';
import DepartmentSettings from './DepartmentSettings';
import { cn } from '../../../lib/utils';

const settingsMenu = [
  {
    path: 'interviewers',
    name: '面试官管理',
    icon: UserCog,
    component: InterviewerSettings
  },
  {
    path: 'users',
    name: '用户管理',
    icon: Users,
    component: UserManagement
  },
  {
    path: 'departments',
    name: '部门管理',
    icon: FolderTree,
    component: DepartmentSettings
  },
  {
    path: 'locations',
    name: '面试地点管理',
    icon: MapPin,
    component: LocationSettings
  },
  {
    path: 'company',
    name: '公司信息管理',
    icon: Building2,
    component: CompanySettings
  }
];

export default function EnterpriseSettings() {
  const location = useLocation();

  const isActiveRoute = (path: string) => {
    return location.pathname.endsWith(path);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">系统设置</h1>
      
      <div className="flex gap-8">
        {/* Settings Navigation */}
        <div className="w-56 flex-shrink-0">
          <nav className="bg-white rounded-lg shadow-sm p-2">
            {settingsMenu.map(({ path, name, icon: Icon }) => (
              <Link
                key={path}
                to={`/enterprise/settings/${path}`}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all",
                  isActiveRoute(path)
                    ? "bg-blue-50 text-blue-600 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-colors",
                  isActiveRoute(path)
                    ? "bg-blue-100"
                    : "bg-gray-100 group-hover:bg-gray-200"
                )}>
                  <Icon className={cn(
                    "w-5 h-5",
                    isActiveRoute(path)
                      ? "text-blue-600"
                      : "text-gray-500"
                  )} />
                </div>
                {name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-white rounded-lg shadow">
          <Routes>
            <Route path="/" element={<InterviewerSettings />} />
            {settingsMenu.map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Routes>
        </div>
      </div>
    </div>
  );
}