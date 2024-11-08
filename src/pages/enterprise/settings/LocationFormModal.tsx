import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../../components/Button';
import { cn } from '../../../lib/utils';

interface Location {
  id: string;
  name: string;
  type: '线下会议室' | '线上会议';
  capacity?: number;
  address?: string;
  status: 'available' | 'occupied' | 'maintenance';
}

interface LocationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Location, 'id' | 'status'>) => void;
  editData?: Location;
}

export function LocationFormModal({
  isOpen,
  onClose,
  onSubmit,
  editData
}: LocationFormModalProps) {
  const [formData, setFormData] = useState<Omit<Location, 'id' | 'status'>>({
    name: editData?.name || '',
    type: editData?.type || '线下会议室',
    capacity: editData?.capacity || undefined,
    address: editData?.address || ''
  });

  const [formErrors, setFormErrors] = useState<{
    name?: string;
    capacity?: string;
    address?: string;
  }>({});

  if (!isOpen) return null;

  const validateForm = () => {
    const errors: typeof formErrors = {};

    if (!formData.name.trim()) {
      errors.name = '请输入地点名称';
    }

    if (formData.type === '线下会议室') {
      if (!formData.capacity) {
        errors.capacity = '请输入容纳人数';
      } else if (formData.capacity < 1) {
        errors.capacity = '容纳人数必须大于0';
      }
      if (!formData.address?.trim()) {
        errors.address = '请输入详细地址';
      }
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
              {editData ? '编辑面试地点' : '添加面试地点'}
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
                  地点类型 <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={formData.type === '线下会议室'}
                      onChange={() => setFormData({ ...formData, type: '线下会议室' })}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">线下会议室</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={formData.type === '线上会议'}
                      onChange={() => setFormData({ ...formData, type: '线上会议' })}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">线上会议</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  地点名称 <span className="text-red-500">*</span>
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
                  placeholder={formData.type === '线下会议室' ? '如：1号会议室' : '如：腾讯会议'}
                  className={cn(
                    "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                    formErrors.name ? "border-red-500" : "border-gray-300"
                  )}
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                )}
              </div>

              {formData.type === '线下会议室' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      容纳人数 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.capacity || ''}
                      onChange={(e) => {
                        setFormData({ ...formData, capacity: parseInt(e.target.value) || undefined });
                        if (formErrors.capacity) {
                          setFormErrors({ ...formErrors, capacity: undefined });
                        }
                      }}
                      className={cn(
                        "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                        formErrors.capacity ? "border-red-500" : "border-gray-300"
                      )}
                    />
                    {formErrors.capacity && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.capacity}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      详细地址 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.address || ''}
                      onChange={(e) => {
                        setFormData({ ...formData, address: e.target.value });
                        if (formErrors.address) {
                          setFormErrors({ ...formErrors, address: undefined });
                        }
                      }}
                      placeholder="如：北京市海淀区科技园区1号楼3层"
                      className={cn(
                        "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                        formErrors.address ? "border-red-500" : "border-gray-300"
                      )}
                    />
                    {formErrors.address && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.address}</p>
                    )}
                  </div>
                </>
              )}
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