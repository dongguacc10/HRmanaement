import { useState } from 'react';
import { Plus, Search, Building2, Edit2, Trash2 } from 'lucide-react';
import { Button } from '../../../components/Button';
import { ConfirmDialog } from '../../../components/ConfirmDialog';
import { DepartmentFormModal } from './DepartmentFormModal';

interface Department {
  id: string;
  name: string;
  code: string;
  parentId: string | null;
  description: string;
}

const MOCK_DEPARTMENTS: Department[] = [
  {
    id: '1',
    name: '技术部',
    code: 'TECH',
    parentId: null,
    description: '负责公司技术研发和架构设计'
  },
  {
    id: '2',
    name: '前端组',
    code: 'TECH-FE',
    parentId: '1',
    description: '负责前端开发和架构设计'
  },
  {
    id: '3',
    name: '后端组',
    code: 'TECH-BE',
    parentId: '1',
    description: '负责后端开发和架构设计'
  },
  {
    id: '4',
    name: '产品部',
    code: 'PROD',
    parentId: null,
    description: '负责产品规划和设计'
  }
];

export default function DepartmentSettings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [expandedDepartments, setExpandedDepartments] = useState<Set<string>>(new Set(['1']));

  const toggleDepartment = (id: string) => {
    const newExpanded = new Set(expandedDepartments);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedDepartments(newExpanded);
  };

  const getChildDepartments = (parentId: string | null) => {
    return MOCK_DEPARTMENTS.filter(dept => dept.parentId === parentId);
  };

  const handleFormSubmit = (data: Omit<Department, 'id'>) => {
    // TODO: 实现添加部门逻辑
    console.log('New department:', data);
    setShowFormModal(false);
  };

  const renderDepartment = (department: Department, level: number = 0) => {
    const children = getChildDepartments(department.id);
    const hasChildren = children.length > 0;
    const isExpanded = expandedDepartments.has(department.id);

    return (
      <div key={department.id}>
        <div 
          className={`flex items-center justify-between p-4 hover:bg-gray-50 ${
            level > 0 ? 'ml-6 border-l' : ''
          }`}
        >
          <div className="flex items-center space-x-4">
            <div 
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                level === 0 ? 'bg-blue-100' : 'bg-gray-100'
              }`}
            >
              <Building2 className={`w-5 h-5 ${level === 0 ? 'text-blue-600' : 'text-gray-600'}`} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-medium text-gray-900">{department.name}</h3>
                <span className="text-sm text-gray-500">{department.code}</span>
              </div>
              <div className="mt-1 text-sm text-gray-500">
                {department.description}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-1 hover:bg-gray-100 rounded-full">
              <Edit2 className="w-4 h-4 text-gray-500" />
            </button>
            <button 
              className="p-1 hover:bg-gray-100 rounded-full"
              onClick={() => setShowDeleteConfirm(department.id)}
            >
              <Trash2 className="w-4 h-4 text-gray-500" />
            </button>
            {hasChildren && (
              <button 
                className="p-1 hover:bg-gray-100 rounded-full"
                onClick={() => toggleDepartment(department.id)}
              >
                <svg
                  className={`w-4 h-4 text-gray-500 transform transition-transform ${
                    isExpanded ? 'rotate-90' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Render children if expanded */}
        {isExpanded && hasChildren && (
          <div className="border-l ml-9">
            {children.map(child => renderDepartment(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">部门管理</h2>
        <Button onClick={() => setShowFormModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          添加部门
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="搜索部门..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Department Tree */}
      <div className="bg-white rounded-lg shadow divide-y">
        {getChildDepartments(null).map(department => renderDepartment(department))}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(null)}
        onConfirm={() => {
          // TODO: 实现删除逻辑
          setShowDeleteConfirm(null);
        }}
        title="确认删除部门"
        message="删除部门将同时删除其下属部门，是否确认删除？"
        confirmText="确认删除"
        cancelText="取消"
      />

      {/* Department Form Modal */}
      <DepartmentFormModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSubmit={handleFormSubmit}
        departments={MOCK_DEPARTMENTS}
      />
    </div>
  );
}