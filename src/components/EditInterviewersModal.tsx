import { useState, useRef } from 'react';
import { X, Search, User } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../lib/utils';

interface Interviewer {
  id: string;
  name: string;
  title: string;
  phone: string;
  department?: string;
}

interface EditInterviewersModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentInterviewers: Interviewer[];
  onSubmit: (interviewers: Interviewer[]) => void;
}

const MOCK_INTERVIEWERS: Interviewer[] = [
  { id: '1', name: '李工', title: '技术专家', department: '技术部', phone: '13800138001' },
  { id: '2', name: '王工', title: '前端架构师', department: '技术部', phone: '13800138002' },
  { id: '3', name: '张工', title: '后端架构师', department: '技术部', phone: '13800138003' },
  { id: '4', name: '赵总', title: '产品总监', department: '产品部', phone: '13800138004' },
  { id: '5', name: '孙工', title: '算法专家', department: '算法部', phone: '13800138005' },
];

export function EditInterviewersModal({
  isOpen,
  onClose,
  currentInterviewers,
  onSubmit
}: EditInterviewersModalProps) {
  const [selectedInterviewers, setSelectedInterviewers] = useState<Interviewer[]>(currentInterviewers);
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredInterviewers = MOCK_INTERVIEWERS.filter(interviewer => {
    const isSelected = selectedInterviewers.some(i => i.id === interviewer.id);
    if (isSelected) return false;

    const searchLower = searchTerm.toLowerCase();
    return (
      interviewer.name.toLowerCase().includes(searchLower) ||
      interviewer.title.toLowerCase().includes(searchLower) ||
      interviewer.department?.toLowerCase().includes(searchLower)
    );
  });

  const handleRemoveInterviewer = (interviewerId: string) => {
    setSelectedInterviewers(prev => prev.filter(i => i.id !== interviewerId));
  };

  const handleAddInterviewer = (interviewer: Interviewer) => {
    setSelectedInterviewers(prev => [...prev, interviewer]);
    setSearchTerm('');
  };

  const handleSubmit = () => {
    onSubmit(selectedInterviewers);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">修改面试官</h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            {/* Selected Interviewers */}
            {selectedInterviewers.length > 0 && (
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-2">已选面试官</div>
                <div className="flex flex-wrap gap-2">
                  {selectedInterviewers.map(interviewer => (
                    <div
                      key={interviewer.id}
                      className="inline-flex items-center bg-blue-50 text-blue-700 rounded-full px-3 py-1"
                    >
                      <span>{interviewer.name}</span>
                      <span className="mx-1 text-blue-400">·</span>
                      <span className="text-blue-500">{interviewer.title}</span>
                      <button
                        onClick={() => handleRemoveInterviewer(interviewer.id)}
                        className="ml-2 text-blue-400 hover:text-blue-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="搜索面试官..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Interviewer List */}
            <div className="mt-4 max-h-[300px] overflow-y-auto">
              {filteredInterviewers.length > 0 ? (
                <div className="space-y-2">
                  {filteredInterviewers.map(interviewer => (
                    <div
                      key={interviewer.id}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                      onClick={() => handleAddInterviewer(interviewer)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{interviewer.name}</div>
                          <div className="text-sm text-gray-500">
                            {interviewer.title}
                            {interviewer.department && (
                              <>
                                <span className="mx-1">·</span>
                                {interviewer.department}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  未找到匹配的面试官
                </div>
              )}
            </div>
          </div>

          <div className="border-t px-6 py-4 bg-gray-50 rounded-b-xl">
            <div className="flex justify-end space-x-4">
              <Button variant="secondary" onClick={onClose}>
                取消
              </Button>
              <Button onClick={handleSubmit}>
                确认
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}