import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../../components/Button';
import { Enterprise } from './types';
import { cn } from '../../../lib/utils';

interface EditEnterpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
  enterprise: Enterprise;
  onSubmit: (data: Partial<Enterprise>) => void;
}

export function EditEnterpriseModal({
  isOpen,
  onClose,
  enterprise,
  onSubmit
}: EditEnterpriseModalProps) {
  const [formData, setFormData] = useState({
    name: enterprise.name,
    industry: enterprise.industry,
    size: enterprise.size,
    location: enterprise.location,
    description: '',
    logo: enterprise.logo,
    customerStatus: enterprise.customerStatus || 'trial',
    trialDays: enterprise.trialDays || 30,
    contractStartDate: enterprise.contractStartDate || '',
    contractEndDate: enterprise.contractEndDate || '',
    contacts: [{
      name: enterprise.contacts[0]?.name || '',
      title: enterprise.contacts[0]?.title || '',
      phone: enterprise.contacts[0]?.phone || '',
      email: enterprise.contacts[0]?.email || ''
    }],
    sales: {
      name: '',
      title: '',
      phone: '',
      email: ''
    }
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">编辑企业信息</h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="max-h-[calc(100vh-16rem)] overflow-y-auto p-6 space-y-8">
              {/* 基本信息 */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">基本信息</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      企业名称 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      所属行业 <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">请选择行业</option>
                      <option value="互联网">互联网</option>
                      <option value="金融">金融</option>
                      <option value="教育">教育</option>
                      <option value="医疗">医疗</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      企业规模 <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.size}
                      onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">请选择规模</option>
                      <option value="0-50人">0-50人</option>
                      <option value="51-200人">51-200人</option>
                      <option value="201-500人">201-500人</option>
                      <option value="501-1000人">501-1000人</option>
                      <option value="1000人以上">1000人以上</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      企业地址 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* 企业联系人 */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">企业联系人</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      姓名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.contacts[0].name}
                      onChange={(e) => setFormData({
                        ...formData,
                        contacts: [{ ...formData.contacts[0], name: e.target.value }]
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      职位 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.contacts[0].title}
                      onChange={(e) => setFormData({
                        ...formData,
                        contacts: [{ ...formData.contacts[0], title: e.target.value }]
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      手机号 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.contacts[0].phone}
                      onChange={(e) => setFormData({
                        ...formData,
                        contacts: [{ ...formData.contacts[0], phone: e.target.value }]
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      邮箱 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.contacts[0].email}
                      onChange={(e) => setFormData({
                        ...formData,
                        contacts: [{ ...formData.contacts[0], email: e.target.value }]
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* 销售负责人 */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">销售负责人</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      姓名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.sales.name}
                      onChange={(e) => setFormData({
                        ...formData,
                        sales: { ...formData.sales, name: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      职位 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.sales.title}
                      onChange={(e) => setFormData({
                        ...formData,
                        sales: { ...formData.sales, title: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      手机号 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.sales.phone}
                      onChange={(e) => setFormData({
                        ...formData,
                        sales: { ...formData.sales, phone: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      邮箱 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.sales.email}
                      onChange={(e) => setFormData({
                        ...formData,
                        sales: { ...formData.sales, email: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* 使用信息 */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">使用信息</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      客户状态 <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.customerStatus}
                      onChange={(e) => setFormData({ ...formData, customerStatus: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="trial">试用</option>
                      <option value="formal">正式</option>
                    </select>
                  </div>

                  {formData.customerStatus === 'trial' ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        试用天数 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="90"
                        value={formData.trialDays}
                        onChange={(e) => setFormData({ ...formData, trialDays: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          合同开始日期 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          value={formData.contractStartDate}
                          onChange={(e) => setFormData({ ...formData, contractStartDate: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          合同结束日期 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          value={formData.contractEndDate}
                          onChange={(e) => setFormData({ ...formData, contractEndDate: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t px-6 py-4 bg-gray-50 rounded-b-xl">
              <div className="flex justify-end space-x-4">
                <Button variant="secondary" type="button" onClick={onClose}>
                  取消
                </Button>
                <Button type="submit">
                  保存
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}