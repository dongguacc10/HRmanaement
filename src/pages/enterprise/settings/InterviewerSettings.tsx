import { useState } from 'react';
import { Plus, Search, User, Mail, Phone, Edit2, Trash2 } from 'lucide-react';
import { Button } from '../../../components/Button';
import { InterviewerFormModal } from './InterviewerFormModal';
import { ConfirmDialog } from '../../../components/ConfirmDialog';

interface Interviewer {
  id: string;
  name: string;
  title: string;
  department: string;
  email: string;
  phone: string;
}

const MOCK_INTERVIEWERS: Interviewer[] = [
  {
    id: '1',
    name: '张三',
    title: '技术专家',
    department: '技术部',
    email: 'zhangsan@example.com',
    phone: '13800138001'
  },
  {
    id: '2',
    name: '李四',
    title: '产品专家',
    department: '产品部',
    email: 'lisi@example.com',
    phone: '13800138002'
  },
  {
    id: '3',
    name: '王五',
    title: '架构师',
    department: '技术部',
    email: 'wangwu@example.com',
    phone: '13800138003'
  }
];

export default function InterviewerSettings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleFormSubmit = (data: Omit<Interviewer, 'id'>) => {
    // TODO: 实现添加面试官逻辑
    console.log('New interviewer:', data);
    setShowFormModal(false);
  };

  const handleDelete = (id: string) => {
    // TODO: 实现删除面试官逻辑
    console.log('Delete interviewer:', id);
    setShowDeleteConfirm(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">面试官管理</h2>
        <Button onClick={() => setShowFormModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          添加面试官
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="搜索面试官..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Interviewer List */}
      <div className="space-y-4">
        {MOCK_INTERVIEWERS.map((interviewer) => (
          <div
            key={interviewer.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
          >
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">{interviewer.name}</div>
                <div className="text-sm text-gray-500">
                  {interviewer.title} · {interviewer.department}
                </div>
                <div className="mt-1 space-y-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <Mail className="w-4 h-4 mr-2" />
                    {interviewer.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Phone className="w-4 h-4 mr-2" />
                    {interviewer.phone}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-1 hover:bg-gray-200 rounded-full">
                <Edit2 className="w-4 h-4 text-gray-500" />
              </button>
              <button 
                className="p-1 hover:bg-gray-200 rounded-full"
                onClick={() => setShowDeleteConfirm(interviewer.id)}
              >
                <Trash2 className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interviewer Form Modal */}
      <InterviewerFormModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSubmit={handleFormSubmit}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(null)}
        onConfirm={() => handleDelete(showDeleteConfirm!)}
        title="确认删除面试官"
        message="删除后该面试官将无法继续使用系统，是否确认删除？"
        confirmText="确认删除"
        cancelText="取消"
      />
    </div>
  );
}