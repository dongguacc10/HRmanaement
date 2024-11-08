import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { Button } from '../../../components/Button';
import { cn } from '../../../lib/utils';

interface FormData {
  // 企业基本信息
  logo: File | null;
  name: string;
  industry: string;
  size: string;
  location: string;
  description: string;

  // 企业联系人
  contactName: string;
  contactTitle: string;
  contactEmail: string;
  contactPhone: string;

  // 销售与使用信息
  salesName: string;
  salesEmail: string;
  customerStatus: 'trial' | 'formal';
  trialDays?: number;
  contractStartDate?: string;
  contractEndDate?: string;
  notes: string;
}

export default function EnterpriseForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    logo: null,
    name: '',
    industry: '',
    size: '',
    location: '',
    description: '',
    contactName: '',
    contactTitle: '',
    contactEmail: '',
    contactPhone: '',
    salesName: '',
    salesEmail: '',
    customerStatus: 'formal',
    notes: ''
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (formErrors[name as keyof FormData]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        logo: file
      }));
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
    }
  };

  const removeLogo = () => {
    setFormData(prev => ({
      ...prev,
      logo: null
    }));
    if (logoPreview) {
      URL.revokeObjectURL(logoPreview);
      setLogoPreview(null);
    }
  };

  const validateForm = () => {
    const errors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name) errors.name = '请输入企业名称';
    if (!formData.industry) errors.industry = '请选择所属行业';
    if (!formData.size) errors.size = '请选择企业规模';
    if (!formData.location) errors.location = '请输入企业地址';
    if (!formData.contactName) errors.contactName = '请输入联系人姓名';
    if (!formData.contactEmail) errors.contactEmail = '请输入联系人邮箱';
    if (!formData.contactPhone) errors.contactPhone = '请输入联系人电话';
    if (!formData.salesName) errors.salesName = '请输入销售姓名';

    if (formData.customerStatus === 'trial') {
      if (!formData.trialDays) errors.trialDays = '请输入试用天数';
    } else {
      if (!formData.contractStartDate) errors.contractStartDate = '请选择合同开始日期';
      if (!formData.contractEndDate) errors.contractEndDate = '请选择合同结束日期';
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

    // TODO: Submit form data
    console.log('Form data:', formData);
    navigate('/admin/enterprises');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-900">添加企业</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              企业Logo
            </label>
            <div className="flex items-center space-x-6">
              {logoPreview ? (
                <div className="relative">
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeLogo}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              ) : (
                <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                  <label htmlFor="logo-upload" className="cursor-pointer text-center p-4">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <span className="mt-2 block text-sm font-medium text-gray-600">
                      上传Logo
                    </span>
                    <input
                      id="logo-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleLogoChange}
                    />
                  </label>
                </div>
              )}
              <div className="text-sm text-gray-500">
                <p>支持 JPG、PNG 格式</p>
                <p>建议尺寸 200x200 像素</p>
                <p>文件大小不超过 2MB</p>
              </div>
            </div>
          </div>

          {/* 企业基本信息 */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">企业基本信息</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  企业名称 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
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
                  所属行业 <span className="text-red-500">*</span>
                </label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className={cn(
                    "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                    formErrors.industry ? "border-red-500" : "border-gray-300"
                  )}
                >
                  <option value="">请选择行业</option>
                  <option value="互联网">互联网</option>
                  <option value="金融">金融</option>
                  <option value="教育">教育</option>
                  <option value="医疗">医疗</option>
                </select>
                {formErrors.industry && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.industry}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  企业规模 <span className="text-red-500">*</span>
                </label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className={cn(
                    "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                    formErrors.size ? "border-red-500" : "border-gray-300"
                  )}
                >
                  <option value="">请选择规模</option>
                  <option value="0-50人">0-50人</option>
                  <option value="51-200人">51-200人</option>
                  <option value="201-500人">201-500人</option>
                  <option value="501-1000人">501-1000人</option>
                  <option value="1000人以上">1000人以上</option>
                </select>
                {formErrors.size && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.size}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  企业地址 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={cn(
                    "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                    formErrors.location ? "border-red-500" : "border-gray-300"
                  )}
                />
                {formErrors.location && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.location}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                企业介绍
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* 企业联系人 */}
          <div className="space-y-6 pt-6 border-t">
            <h2 className="text-lg font-semibold text-gray-900">企业联系人</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  联系人姓名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  className={cn(
                    "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                    formErrors.contactName ? "border-red-500" : "border-gray-300"
                  )}
                />
                {formErrors.contactName && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.contactName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  职位
                </label>
                <input
                  type="text"
                  name="contactTitle"
                  value={formData.contactTitle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  联系人邮箱 <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  className={cn(
                    "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                    formErrors.contactEmail ? "border-red-500" : "border-gray-300"
                  )}
                />
                {formErrors.contactEmail && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.contactEmail}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  联系人电话 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  className={cn(
                    "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                    formErrors.contactPhone ? "border-red-500" : "border-gray-300"
                  )}
                />
                {formErrors.contactPhone && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.contactPhone}</p>
                )}
              </div>
            </div>
          </div>

          {/* 销售与使用信息 */}
          <div className="space-y-6 pt-6 border-t">
            <h2 className="text-lg font-semibold text-gray-900">销售与使用信息</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  销售姓名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="salesName"
                  value={formData.salesName}
                  onChange={handleInputChange}
                  className={cn(
                    "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                    formErrors.salesName ? "border-red-500" : "border-gray-300"
                  )}
                />
                {formErrors.salesName && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.salesName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  销售邮箱
                </label>
                <input
                  type="email"
                  name="salesEmail"
                  value={formData.salesEmail}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  客户状态 <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="customerStatus"
                      value="trial"
                      checked={formData.customerStatus === 'trial'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">试用</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="customerStatus"
                      value="formal"
                      checked={formData.customerStatus === 'formal'}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">正式</span>
                  </label>
                </div>
              </div>

              {formData.customerStatus === 'trial' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    试用天数 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="trialDays"
                    value={formData.trialDays || ''}
                    onChange={handleInputChange}
                    min="1"
                    className={cn(
                      "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                      formErrors.trialDays ? "border-red-500" : "border-gray-300"
                    )}
                  />
                  {formErrors.trialDays && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.trialDays}</p>
                  )}
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      合同开始日期 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="contractStartDate"
                      value={formData.contractStartDate || ''}
                      onChange={handleInputChange}
                      className={cn(
                        "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                        formErrors.contractStartDate ? "border-red-500" : "border-gray-300"
                      )}
                    />
                    {formErrors.contractStartDate && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.contractStartDate}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      合同结束日期 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="contractEndDate"
                      value={formData.contractEndDate || ''}
                      onChange={handleInputChange}
                      className={cn(
                        "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                        formErrors.contractEndDate ? "border-red-500" : "border-gray-300"
                      )}
                    />
                    {formErrors.contractEndDate && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.contractEndDate}</p>
                    )}
                  </div>
                </>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                备注
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate(-1)}
            >
              取消
            </Button>
            <Button type="submit">
              保存
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}