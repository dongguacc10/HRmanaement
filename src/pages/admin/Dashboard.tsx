import { useState } from 'react';
import { Users, Building2, Calendar, CheckCircle, ArrowUp, ArrowDown, Activity, Plus } from 'lucide-react';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';

// 模拟实时数据
const MOCK_REAL_TIME_DATA = [
  { 
    id: 1, 
    time: '09:30', 
    enterprise: '阿里巴巴', 
    action: '新增企业用户',
    user: '张三',
    role: 'HR经理'
  },
  { 
    id: 2, 
    time: '10:00', 
    enterprise: '腾讯', 
    action: '修改企业信息',
    user: '李四',
    role: '管理员'
  },
  { 
    id: 3, 
    time: '10:30', 
    enterprise: '字节跳动', 
    action: '添加面试官',
    user: '王五',
    role: 'HR专员'
  }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('today');

  const stats = {
    totalEnterprises: {
      count: 128,
      trend: 15,
      isUp: true
    },
    activeEnterprises: {
      count: 45,
      trend: 5,
      isUp: true
    },
    totalUsers: {
      count: 920,
      trend: -3,
      isUp: false
    },
    totalInterviews: {
      count: 4500,
      trend: 12,
      isUp: true
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">管理仪表盘</h1>
        <div className="flex space-x-2">
          <Button
            variant={timeRange === 'today' ? 'primary' : 'ghost'}
            onClick={() => setTimeRange('today')}
          >
            今日
          </Button>
          <Button
            variant={timeRange === 'week' ? 'primary' : 'ghost'}
            onClick={() => setTimeRange('week')}
          >
            本周
          </Button>
          <Button
            variant={timeRange === 'month' ? 'primary' : 'ghost'}
            onClick={() => setTimeRange('month')}
          >
            本月
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <span className={`flex items-center text-sm ${
              stats.totalEnterprises.isUp ? 'text-green-600' : 'text-red-600'
            }`}>
              {stats.totalEnterprises.isUp ? (
                <ArrowUp className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDown className="h-4 w-4 mr-1" />
              )}
              {stats.totalEnterprises.trend}%
            </span>
          </div>
          <h3 className="text-2xl font-bold mt-4">{stats.totalEnterprises.count}</h3>
          <p className="text-gray-600 text-sm mt-1">企业总数</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div className="bg-green-100 p-3 rounded-lg">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
            <span className={`flex items-center text-sm ${
              stats.activeEnterprises.isUp ? 'text-green-600' : 'text-red-600'
            }`}>
              {stats.activeEnterprises.isUp ? (
                <ArrowUp className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDown className="h-4 w-4 mr-1" />
              )}
              {stats.activeEnterprises.trend}%
            </span>
          </div>
          <h3 className="text-2xl font-bold mt-4">{stats.activeEnterprises.count}</h3>
          <p className="text-gray-600 text-sm mt-1">活跃企业数</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <span className={`flex items-center text-sm ${
              stats.totalUsers.isUp ? 'text-green-600' : 'text-red-600'
            }`}>
              {stats.totalUsers.isUp ? (
                <ArrowUp className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDown className="h-4 w-4 mr-1" />
              )}
              {Math.abs(stats.totalUsers.trend)}%
            </span>
          </div>
          <h3 className="text-2xl font-bold mt-4">{stats.totalUsers.count}</h3>
          <p className="text-gray-600 text-sm mt-1">用户总数</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
            <span className={`flex items-center text-sm ${
              stats.totalInterviews.isUp ? 'text-green-600' : 'text-red-600'
            }`}>
              {stats.totalInterviews.isUp ? (
                <ArrowUp className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDown className="h-4 w-4 mr-1" />
              )}
              {stats.totalInterviews.trend}%
            </span>
          </div>
          <h3 className="text-2xl font-bold mt-4">{stats.totalInterviews.count}</h3>
          <p className="text-gray-600 text-sm mt-1">面试总数</p>
        </div>
      </div>

      {/* 快捷操作 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">企业管理</h2>
            <Button onClick={() => navigate('/admin/enterprises/new')}>
              <Plus className="w-4 h-4 mr-2" />
              添加企业
            </Button>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => navigate('/admin/enterprises')}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Building2 className="w-6 h-6 text-gray-600 mb-2" />
                <div className="text-sm font-medium text-gray-900">企业列表</div>
                <p className="text-xs text-gray-500 mt-1">查看和管理所有企业</p>
              </button>
              <button 
                onClick={() => navigate('/admin/enterprises/trial')}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Activity className="w-6 h-6 text-gray-600 mb-2" />
                <div className="text-sm font-medium text-gray-900">试用企业</div>
                <p className="text-xs text-gray-500 mt-1">管理试用中的企业</p>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">系统动态</h2>
          </div>
          <div className="divide-y">
            {MOCK_REAL_TIME_DATA.map((item) => (
              <div key={item.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-1">
                        <span className="font-medium text-gray-900">{item.enterprise}</span>
                        <span className="text-gray-500">·</span>
                        <span className="text-gray-500">{item.action}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        <span>{item.user}</span>
                        <span className="mx-2">·</span>
                        <span>{item.role}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}