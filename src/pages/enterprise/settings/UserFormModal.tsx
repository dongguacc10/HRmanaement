import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../../components/Button';
import { cn } from '../../../lib/utils';

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

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<SystemUser, 'id' | 'status'>) => void;
  editData?: SystemUser;
}

const DEPARTMENTS = [
  { id: '1', name: '人力资源部' },
  { id: '2', name: '技术部' },
  { id: '3', name: '产品部' },
  { id: '4', name: '运营部' }
];

const ROLES = [
  { id: '1', name: '管理员' },
  { id: '2', name: '普通用户' }
];

export function UserFormModal({
  isOpen,
  onClose,
  onSubmit,
  editData
}: UserFormModalProps) {
  const [formData, setFormData] = useState<Omit<SystemUser, 'id' | 'status'>>({
    name: editData?.name || '',
    title: editData?.title || '',
    department: editData?.department || '',
    email: editData?.email || '',
    phone: editData?.phone || '',
    role: editData?.role || ''
  });

  const [formErrors, setFormErrors] = useState<{
    name?: string;
    title?: string;
    department?: string;
    email?: string;
    phone?: string;
    role?: string;
  }>({});

  if (!isOpen) return null;

  const validateForm = () => {
    const errors: typeof formErrors = {};

    if (!formData.name.trim()) {
      errors.name = '请输入姓名';
    }
    if (!formData.title.trim()) {
      errors.title = '请输入职位';
    }
    if (!formData.department.trim()) {
      errors.department = '请选择部门';
    }
    if (!formData.email.trim()) {
      errors.email = '请输入邮箱';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = '请输入有效的邮箱地址';
    }
    if (!formData.phone.trim()) {
      errors.phone = '请输入手机号';
    } else if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      errors.phone = '请输入有效的手机号';
    }
    if (!formData.role.trim()) {
      errors.role = '请选择角色';
    }

    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">
              {editData ? '编辑用户' : '添加用户'}
            </h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  姓名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (formErrors.name) {
                      setFormErrors({ ...formErrors, name: undefined });
                    }
                  }}
                  className={cn(
                    "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                    formErrors.name ? "border-red-500" : "border-gray-300"
                  )}
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  职位 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                    if (formErrors.title) {
                      setFormErrors({ ...formErrors, title: undefined });
                    }
                  }}
                  className={cn(
                    "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                    formErrors.title ? "border-red-500" : "border-gray-300"
                  )}
                />
                {formErrors.title && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  部门 <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => {
                    setFormData({ ...formData, department: e.target.value });
                    if (formErrors.department) {
                      setFormErrors({ ...formErrors, department: undefined });
                    }
                  }}
                  className={cn(
                    "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                    formErrors.department ? "border-red-500" : "border-gray-300"
                  )}
                >
                  <option value="">请选择部门</option>
                  {DEPARTMENTS.map(dept => (
                    <option key={dept.id} value={dept.name}>
                      {dept.name}
                    </option>
                  ))}
                </select>
                {formErrors.department && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.department}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  角色 <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => {
                    setFormData({ ...formData, role: e.target.value });
                    if (formErrors.role) {
                      setFormErrors({ ...formErrors, role: undefined });
                    }
                  }}
                  className={cn(
                    "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                    formErrors.role ? "border-red-500" : "border-gray-300"
                  )}
                >
                  <option value="">请选择角色</option>
                  {ROLES.map(role => (
                    <option key={role.id} value={role.name}>
                      {role.name}
                    </option>
                  ))}
                </select>
                {formErrors.role && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.role}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  邮箱 <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (formErrors.email) {
                      setFormErrors({ ...formErrors, email: undefined });
                    }
                  }}
                  className={cn(
                    "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                    formErrors.email ? "border-red-500" : "border-gray-300"
                  )}
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  手机号 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (formErrors.phone) {
                      setFormErrors({ ...formErrors, phone: undefined });
                    }
                  }}
                  className={cn(
                    "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                    formErrors.phone ? "border-red-500" : "border-gray-300"
                  )}
                />
                {formErrors.phone && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>
                )}
              </div>
            </div>

            <div className="border-t px-6 py-4 bg-gray-50 rounded-b-xl">
              <div className="flex justify-end space-x-4">
                <Button variant="secondary" type="button" onClick={onClose}>
                  取消
                </Button>
                <Button type="submit">
                  {editData ? '保存' : '添加'}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}