import { useState } from 'react';
import { Plus, Search, User, Mail, Phone, Building2, RotateCcw, PowerOff } from 'lucide-react';
import { Button } from '../../../components/Button';
import { UserFormModal } from './UserFormModal';
import { ConfirmDialog } from '../../../components/ConfirmDialog';

interface SystemUser {
  id: string;
  name: string;
  title: string;
  department: string;
  email: string;
  phone: string;
  role: string;
  status: 'active' | 'inactive';
}

const MOCK_USERS: SystemUser[] = [
  {
    id: '1',
    name: '张三',
    title: 'HR经理',
    department: '人力资源部',
    email: 'zhangsan@example.com',
    phone: '13800138001',
    role: '管理员',
    status: 'active'
  },
  {
    id: '2',
    name: '李四',
    title: 'HR专员',
    department: '人力资源部',
    email: 'lisi@example.com',
    phone: '13800138002',
    role: '普通用户',
    status: 'active'
  }
];

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showResetPasswordConfirm, setShowResetPasswordConfirm] = useState<string | null>(null);
  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState<string | null>(null);

  const handleFormSubmit = (data: Omit<SystemUser, 'id' | 'status'>) => {
    // TODO: 实现添加用户逻辑
    console.log('New user:', data);
    setShowFormModal(false);
  };

  const handleDelete = (id: string) => {
    // TODO: 实现删除用户逻辑
    console.log('Delete user:', id);
    setShowDeleteConfirm(null);
  };

  const handleResetPassword = (id: string) => {
    // TODO: 实现重置密码逻辑
    console.log('Reset password for user:', id);
    setShowResetPasswordConfirm(null);
  };

  const handleDeactivate = (id: string) => {
    // TODO: 实现下线用户逻辑
    console.log('Deactivate user:', id);
    setShowDeactivateConfirm(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">用户管理</h2>
        <Button onClick={() => setShowFormModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          添加用户
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="搜索用户..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* User List */}
      <div className="space-y-4">
        {MOCK_USERS.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
          >
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">{user.name}</div>
                <div className="text-sm text-gray-500">
                  {user.title} · {user.department}
                </div>
                <div className="mt-1 space-y-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <Mail className="w-4 h-4 mr-2" />
                    {user.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Phone className="w-4 h-4 mr-2" />
                    {user.phone}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                {user.role}
              </span>
              <button
                className="p-1 hover:bg-gray-200 rounded-full text-gray-500 hover:text-gray-700"
                onClick={() => setShowResetPasswordConfirm(user.id)}
                title="重置密码"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                className="p-1 hover:bg-gray-200 rounded-full text-gray-500 hover:text-gray-700"
                onClick={() => setShowDeactivateConfirm(user.id)}
                title="下线用户"
              >
                <PowerOff className="w-4 h-4" />
              </button>
              <button
                className="text-red-600 hover:text-red-700 text-sm"
                onClick={() => setShowDeleteConfirm(user.id)}
              >
                删除
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* User Form Modal */}
      <UserFormModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSubmit={handleFormSubmit}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(null)}
        onConfirm={() => handleDelete(showDeleteConfirm!)}
        title="确认删除用户"
        message="删除后该用户将无法继续使用系统，是否确认删除？"
        confirmText="确认删除"
        cancelText="取消"
      />

      {/* Reset Password Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!showResetPasswordConfirm}
        onClose={() => setShowResetPasswordConfirm(null)}
        onConfirm={() => handleResetPassword(showResetPasswordConfirm!)}
        title="确认重置密码"
        message="重置后将生成随机密码并发送至用户邮箱，是否继续？"
        confirmText="确认重置"
        cancelText="取消"
      />

      {/* Deactivate Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!showDeactivateConfirm}
        onClose={() => setShowDeactivateConfirm(null)}
        onConfirm={() => handleDeactivate(showDeactivateConfirm!)}
        title="确认下线用户"
        message="下线后该用户将无法继续使用系统，是否确认下线？"
        confirmText="确认下线"
        cancelText="取消"
      />
    </div>
  );
}