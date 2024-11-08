import { Link } from 'react-router-dom';
import { Building2, Users, ShieldCheck } from 'lucide-react';
import { Navbar } from '../components/Navbar';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Streamline Your Interview Process
          </h1>
          <p className="text-xl text-gray-600">
            Modern check-in system for enterprise interviews
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* 企业入口 */}
          <Link
            to="/login/enterprise"
            className="group bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">企业登录</h2>
            <p className="text-gray-600">登录您的企业账号，管理面试流程</p>
          </Link>

          {/* 管理员入口 */}
          <Link
            to="/login/admin"
            className="group bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
          >
            <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">管理员登录</h2>
            <p className="text-gray-600">系统管理员登录入口</p>
          </Link>

          {/* 候选人入口 */}
          <Link
            to="/check-in"
            className="group bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
          >
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">候选人签到</h2>
            <p className="text-gray-600">面试候选人快速签到入口</p>
          </Link>
        </div>

        {/* 功能特点 */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">主要功能</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">企业管理</h3>
              <p className="text-gray-600">完整的企业面试管理系统，支持多部门多角色</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">面试签到</h3>
              <p className="text-gray-600">便捷的候选人签到系统，支持多种签到方式</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">系统管理</h3>
              <p className="text-gray-600">强大的后台管理功能，确保系统安全稳定运行</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}