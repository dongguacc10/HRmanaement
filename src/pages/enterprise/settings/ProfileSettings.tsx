import { useState } from 'react';
import { User, Mail, Phone, Lock, Key } from 'lucide-react';
import { Button } from '../../../components/Button';
import { cn } from '../../../lib/utils';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
}

const INITIAL_PROFILE: UserProfile = {
  name: '张三',
  email: 'zhangsan@example.com',
  phone: '13800138000',
  avatar: null
};

export default function ProfileSettings() {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [formErrors, setFormErrors] = useState<{
    profile?: Partial<Record<keyof UserProfile, string>>;
    password?: {
      current?: string;
      new?: string;
      confirm?: string;
    };
  }>({});

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: typeof formErrors.profile = {};

    if (!profile.name) errors.name = '请输入姓名';
    if (!profile.email) errors.email = '请输入邮箱';
    if (!profile.phone) errors.phone = '请输入手机号';

    if (Object.keys(errors).length > 0) {
      setFormErrors(prev => ({ ...prev, profile: errors }));
      return;
    }

    // TODO: Submit profile changes
    console.log('Profile updated:', profile);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: typeof formErrors.password = {};

    if (!currentPassword) errors.current = '请输入当前密码';
    if (!newPassword) errors.new = '请输入新密码';
    if (!confirmPassword) errors.confirm = '请确认新密码';
    if (newPassword !== confirmPassword) {
      errors.confirm = '两次输入的密码不一致';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(prev => ({ ...prev, password: errors }));
      return;
    }

    // TODO: Submit password change
    console.log('Password updated');
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      // TODO: Upload avatar
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">个人设置</h2>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">基本信息</h3>
          <form onSubmit={handleProfileSubmit} className="space-y-6">
            {/* Avatar */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-medium">
                  {profile.name.slice(0, 2)}
                </div>
                <label
                  htmlFor="avatar-upload"
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-50"
                >
                  <User className="w-4 h-4 text-gray-600" />
                  <input
                    id="avatar-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">头像</h3>
                <p className="text-sm text-gray-500">
                  JPG, PNG or GIF，文件大小不超过 2MB
                </p>
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  姓名 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className={cn(
                      "w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                      formErrors.profile?.name ? "border-red-500" : "border-gray-300"
                    )}
                  />
                </div>
                {formErrors.profile?.name && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.profile.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  邮箱 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className={cn(
                      "w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                      formErrors.profile?.email ? "border-red-500" : "border-gray-300"
                    )}
                  />
                </div>
                {formErrors.profile?.email && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.profile.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  手机号 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className={cn(
                      "w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                      formErrors.profile?.phone ? "border-red-500" : "border-gray-300"
                    )}
                  />
                </div>
                {formErrors.profile?.phone && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.profile.phone}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit">
                保存修改
              </Button>
            </div>
          </form>
        </div>

        {/* Password Section */}
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">修改密码</h3>
          <form onSubmit={handlePasswordSubmit} className="max-w-md space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                当前密码 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className={cn(
                    "w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                    formErrors.password?.current ? "border-red-500" : "border-gray-300"
                  )}
                />
              </div>
              {formErrors.password?.current && (
                <p className="mt-1 text-sm text-red-500">{formErrors.password.current}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                新密码 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={cn(
                    "w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                    formErrors.password?.new ? "border-red-500" : "border-gray-300"
                  )}
                />
              </div>
              {formErrors.password?.new && (
                <p className="mt-1 text-sm text-red-500">{formErrors.password.new}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                确认新密码 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={cn(
                    "w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                    formErrors.password?.confirm ? "border-red-500" : "border-gray-300"
                  )}
                />
              </div>
              {formErrors.password?.confirm && (
                <p className="mt-1 text-sm text-red-500">{formErrors.password.confirm}</p>
              )}
            </div>

            <div className="flex justify-end">
              <Button type="submit">
                修改密码
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}