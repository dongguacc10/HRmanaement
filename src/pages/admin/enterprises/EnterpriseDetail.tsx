import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin, Users, Edit2, Plus, Camera, Calendar, CheckCircle } from 'lucide-react';
import { Button } from '../../../components/Button';
import { TruncatedField } from '../../../components/TruncatedField';
import { MOCK_ENTERPRISES } from './types';
import { EditEnterpriseModal } from './EditEnterpriseModal';
import { AddUserModal } from './AddUserModal';
import { ConfirmDialog } from '../../../components/ConfirmDialog';

interface EnterpriseDetailProps {
  enterpriseId: number | null;
  onClose: () => void;
}

interface EnterpriseUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  lastLogin: string;
  status: 'active' | 'inactive';
}

const MOCK_USERS: EnterpriseUser[] = [
  {
    id: '1',
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '13800138000',
    role: '管理员',
    department: 'HR',
    lastLogin: '2024-03-15 14:30',
    status: 'active'
  },
  {
    id: '2',
    name: '李四',
    email: 'lisi@example.com',
    phone: '13800138001',
    role: '面试官',
    department: '技术部',
    lastLogin: '2024-03-14 16:45',
    status: 'active'
  }
];

export default function EnterpriseDetail({ enterpriseId, onClose }: EnterpriseDetailProps) {
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showDeleteUserConfirm, setShowDeleteUserConfirm] = useState<string | null>(null);
  const [showResetPasswordConfirm, setShowResetPasswordConfirm] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  
  const enterprise = MOCK_ENTERPRISES.find(e => e.id === enterpriseId);

  if (!enterprise) {
    return <div className="p-6">企业不存在</div>;
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      // TODO: Upload logo
      console.log('Logo file:', file);
    }
  };

  const handleEditSubmit = (data: any) => {
    console.log('Update enterprise:', data);
    setShowEditModal(false);
  };

  const handleAddUser = (data: any) => {
    console.log('Add user:', data);
    setShowAddUserModal(false);
  };

  const handleDeleteUser = (userId: string) => {
    console.log('Delete user:', userId);
    setShowDeleteUserConfirm(null);
  };

  const handleResetPassword = (userId: string) => {
    console.log('Reset password for user:', userId);
    setShowResetPasswordConfirm(null);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-6 bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-500 text-white">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-6">
            <div className="relative">
              <img
                src={enterprise.logo}
                alt={enterprise.name}
                className="w-16 h-16 rounded-lg object-cover bg-white/10 backdrop-blur-sm"
              />
              <label
                htmlFor="logo-upload"
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20"
              >
                <Camera className="w-4 h-4 text-white/80" />
                <input
                  id="logo-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleLogoChange}
                />
              </label>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{enterprise.name}</h1>
              <div className="mt-2 flex items-center space-x-4 text-blue-100">
                <div className="flex items-center">
                  <Building2 className="w-4 h-4 mr-1" />
                  <span>{enterprise.industry}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{enterprise.location}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{enterprise.size}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowEditModal(true)} 
              className="text-white hover:bg-white/10"
            >
              <Edit2 className="w-3.5 h-3.5 mr-1.5" />
              编辑
            </Button>
          </div>
        </div>

        {/* Usage Statistics */}
        <div className="mt-8 grid grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-lg px-4 py-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <Users className="w-5 h-5 mr-2 text-blue-200" />
              <div className="text-sm text-blue-200">活跃用户</div>
            </div>
            <div className="text-2xl font-semibold">{enterprise.usage.activeUsers}</div>
          </div>
          <div className="bg-white/5 rounded-lg px-4 py-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <Calendar className="w-5 h-5 mr-2 text-blue-200" />
              <div className="text-sm text-blue-200">面试总数</div>
            </div>
            <div className="text-2xl font-semibold">{enterprise.usage.totalInterviews}</div>
          </div>
          <div className="bg-white/5 rounded-lg px-4 py-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <Calendar className="w-5 h-5 mr-2 text-blue-200" />
              <div className="text-sm text-blue-200">已安排面试</div>
            </div>
            <div className="text-2xl font-semibold">{enterprise.usage.scheduledInterviews}</div>
          </div>
          <div className="bg-white/5 rounded-lg px-4 py-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <CheckCircle className="w-5 h-5 mr-2 text-blue-200" />
              <div className="text-sm text-blue-200">签到总数</div>
            </div>
            <div className="text-2xl font-semibold">{enterprise.usage.totalCheckIns}</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* 联系人和销售负责人 */}
        <div className="grid grid-cols-2 gap-6">
          {/* 企业联系人 */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">企业联系人</h2>
            <div className="border rounded-lg p-4">
              {enterprise.contacts[0] && (
                <>
                  <div className="font-medium text-gray-900">{enterprise.contacts[0].name}</div>
                  <div className="text-sm text-gray-500 mt-1">{enterprise.contacts[0].title}</div>
                  <div className="mt-3 space-y-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      <TruncatedField text={enterprise.contacts[0].phone} type="phone" />
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      <TruncatedField text={enterprise.contacts[0].email} type="email" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* 销售负责人 */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">销售负责人</h2>
            <div className="border rounded-lg p-4">
              <div className="font-medium text-gray-900">{enterprise.sales.name}</div>
              <div className="text-sm text-gray-500 mt-1">{enterprise.sales.title}</div>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <TruncatedField text={enterprise.sales.phone} type="phone" />
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  <TruncatedField text={enterprise.sales.email} type="email" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 使用信息 */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">使用信息</h2>
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">
                  {enterprise.status === 'formal' ? '正式客户' : '试用客户'}
                </div>
                {enterprise.status === 'trial' ? (
                  <div className="text-sm text-gray-500 mt-1">
                    试用期：{enterprise.trial?.days}天（{enterprise.trial?.startDate} 开始）
                  </div>
                ) : (
                  <div className="text-sm text-gray-500 mt-1">
                    合同期：{enterprise.contract?.startDate} 至 {enterprise.contract?.endDate}
                  </div>
                )}
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                enterprise.status === 'formal'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {enterprise.status === 'formal' ? '正式' : '试用中'}
              </span>
            </div>
          </div>
        </div>

        {/* 用户列表 */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">企业用户</h2>
            <Button size="sm" onClick={() => setShowAddUserModal(true)}>
              <Plus className="w-4 h-4 mr-1.5" />
              添加用户
            </Button>
          </div>
          <div className="bg-white rounded-lg border">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">部门</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">角色</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">手机号</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最近登录</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {MOCK_USERS.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              <TruncatedField text={user.name} type="name" />
                            </div>
                            <div className="text-sm text-gray-500">
                              <TruncatedField text={user.email} type="email" />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <TruncatedField text={user.department} type="name" />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.role}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <TruncatedField text={user.phone} type="phone" />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.lastLogin}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.status === 'active' ? '已激活' : '未激活'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setShowResetPasswordConfirm(user.id)}
                        >
                          重置密码
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setShowDeleteUserConfirm(user.id)}
                        >
                          删除
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditEnterpriseModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        enterprise={enterprise}
        onSubmit={handleEditSubmit}
      />

      <AddUserModal
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        onSubmit={handleAddUser}
      />

      <ConfirmDialog
        isOpen={!!showDeleteUserConfirm}
        onClose={() => setShowDeleteUserConfirm(null)}
        onConfirm={() => handleDeleteUser(showDeleteUserConfirm!)}
        title="确认删除用户"
        message="删除后该用户将无法继续使用系统，是否确认删除？"
        confirmText="确认删除"
        cancelText="取消"
      />

      <ConfirmDialog
        isOpen={!!showResetPasswordConfirm}
        onClose={() => setShowResetPasswordConfirm(null)}
        onConfirm={() => handleResetPassword(showResetPasswordConfirm!)}
        title="确认重置密码"
        message="重置后将生成随机密码并发送至用户邮箱，是否继续？"
        confirmText="确认重置"
        cancelText="取消"
      />
    </div>
  );
}