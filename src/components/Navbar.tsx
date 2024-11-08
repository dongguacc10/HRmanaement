import { Link } from 'react-router-dom';
import { Building2, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './Button';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl text-gray-900">InterviewFlow</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/features" className="text-gray-600 hover:text-gray-900">Features</Link>
            <Link to="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" onClick={() => window.location.href = '/login/enterprise'}>
                企业登录
              </Button>
              <Button variant="ghost" onClick={() => window.location.href = '/login/admin'}>
                管理员登录
              </Button>
              <Button onClick={() => window.location.href = '/check-in'}>
                候选人签到
              </Button>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/features" className="block px-3 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50">Features</Link>
            <Link to="/pricing" className="block px-3 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50">Pricing</Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50">Contact</Link>
            <Link to="/login/enterprise" className="block px-3 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50">企业登录</Link>
            <Link to="/login/admin" className="block px-3 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50">管理员登录</Link>
            <Link to="/check-in" className="block px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">候选人签到</Link>
          </div>
        </div>
      )}
    </nav>
  );
}