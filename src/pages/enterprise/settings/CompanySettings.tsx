import { useState } from 'react';
import { Building2, Upload, Mail, Phone, MapPin, Globe, X } from 'lucide-react';
import { Button } from '../../../components/Button';
import { cn } from '../../../lib/utils';

interface CompanyInfo {
  name: string;
  logo: string;
  industry: string;
  size: string;
  website: string;
  description: string;
  address: string;
  email: string;
  phone: string;
}

const MOCK_COMPANY: CompanyInfo = {
  name: '字节跳动',
  logo: 'https://example.com/logo.png',
  industry: '互联网',
  size: '10000人以上',
  website: 'https://www.bytedance.com',
  description: '字节跳动是全球领先的科技公司之一，致力于用科技创新服务大众...',
  address: '北京市海淀区科技园区',
  email: 'contact@bytedance.com',
  phone: '010-12345678'
};

export default function CompanySettings() {
  const [company, setCompany] = useState(MOCK_COMPANY);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof CompanyInfo, string>>>({});

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 实现保存逻辑
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">公司信息管理</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Logo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            公司Logo
          </label>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                {logoFile ? (
                  <img
                    src={URL.createObjectURL(logoFile)}
                    alt="Logo preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <Building2 className="w-12 h-12 text-gray-400" />
                )}
              </div>
              <label
                htmlFor="logo-upload"
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-50"
              >
                <Upload className="w-4 h-4 text-gray-600" />
                <input
                  id="logo-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleLogoChange}
                />
              </label>
            </div>
            <div className="text-sm text-gray-500">
              <p>支持 JPG、PNG 格式</p>
              <p>建议尺寸 200x200 像素</p>
              <p>文件大小不超过 2MB</p>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              公司名称 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={company.name}
              onChange={(e) => setCompany({ ...company, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              所属行业 <span className="text-red-500">*</span>
            </label>
            <select
              value={company.industry}
              onChange={(e) => setCompany({ ...company, industry: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="互联网">互联网</option>
              <option value="金融">金融</option>
              <option value="教育">教育</option>
              <option value="医疗">医疗</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              公司规模 <span className="text-red-500">*</span>
            </label>
            <select
              value={company.size}
              onChange={(e) => setCompany({ ...company, size: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="0-50人">0-50人</option>
              <option value="51-200人">51-200人</option>
              <option value="201-500人">201-500人</option>
              <option value="501-1000人">501-1000人</option>
              <option value="1000人以上">1000人以上</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              公司官网
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="url"
                value={company.website}
                onChange={(e) => setCompany({ ...company, website: e.target.value })}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              联系电话 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                value={company.phone}
                onChange={(e) => setCompany({ ...company, phone: e.target.value })}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              联系邮箱 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={company.email}
                onChange={(e) => setCompany({ ...company, email: e.target.value })}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              公司地址 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={company.address}
                onChange={(e) => setCompany({ ...company, address: e.target.value })}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Company Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            公司介绍
          </label>
          <textarea
            value={company.description}
            onChange={(e) => setCompany({ ...company, description: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="submit">
            保存修改
          </Button>
        </div>
      </form>
    </div>
  );
}