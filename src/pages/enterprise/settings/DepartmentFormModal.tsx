import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../../components/Button';
import { cn } from '../../../lib/utils';

interface Department {
  id: string;
  name: string;
  code: string;
  parentId: string | null;
  description: string;
}

interface DepartmentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Department, 'id'>) => void;
  departments: Department[];
  editData?: Department;
}

export function DepartmentFormModal({
  isOpen,
  onClose,
  onSubmit,
  departments,
  editData
}: DepartmentFormModalProps) {
  const [formData, setFormData] = useState<Omit<Department, 'id'>>({
    name: editData?.name || '',
    code: editData?.code || '',
    parentId: editData?.parentId || null,
    description: editData?.description || ''
  });

  const [formErrors, setFormErrors] = useState<{
    name?: string;
    code?: string;
  }>({});

  if (!isOpen) return null;

  const validateForm = () => {
    const errors: typeof formErrors = {};

    if (!formData.name.trim()) {
      errors.name = '请输入部门名称';
    }
    if (!formData.code.trim()) {
      errors.code = '请输入部门编码';
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
              {editData ? '编辑部门' : '添加部门'}
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
                  上级部门
                </label>
                <select
                  value={formData.parentId || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    parentId: e.target.value || null
                  })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">无上级部门</option>
                  {departments
                    .filter(dept => dept.parentId === null)
                    .map(dept => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))
                  }
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  部门名称 <span className="text-red-500">*</span>
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
                  部门编码 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => {
                    setFormData({ ...formData, code: e.target.value });
                    if (formErrors.code) {
                      setFormErrors({ ...formErrors, code: undefined });
                    }
                  }}
                  className={cn(
                    "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                    formErrors.code ? "border-red-500" : "border-gray-300"
                  )}
                />
                {formErrors.code && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.code}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  部门描述
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
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