import { useState, useRef, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../lib/utils';

interface Interview {
  id: string;
  date: string;
  time: string;
  duration: string;
  type: string;
  location: string;
  interviewers: Array<{
    id: string;
    name: string;
    title: string;
  }>;
}

interface EditInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  interview: Interview;
  onSubmit: (data: Partial<Interview>) => void;
}

interface Interviewer {
  id: string;
  name: string;
  title: string;
  department: string;
}

const MOCK_INTERVIEWERS: Interviewer[] = [
  { id: '1', name: '李工', title: '技术专家', department: '技术部' },
  { id: '2', name: '王工', title: '前端架构师', department: '技术部' },
  { id: '3', name: '张工', title: '后端架构师', department: '技术部' },
  { id: '4', name: '赵总', title: '产品总监', department: '产品部' },
  { id: '5', name: '孙工', title: '算法专家', department: '算法部' },
  { id: '6', name: '周工', title: '技术经理', department: '技术部' },
  { id: '7', name: '吴工', title: 'DevOps专家', department: '运维部' },
  { id: '8', name: '郑工', title: '安全专家', department: '安全部' },
  { id: '9', name: '陈工', title: '测试经理', department: '测试部' },
];

const DURATION_OPTIONS = [
  { value: '30', label: '30分钟' },
  { value: '60', label: '1小时' },
  { value: '90', label: '1.5小时' },
  { value: '120', label: '2小时' },
];

const INTERVIEW_TYPES = [
  '技术面试',
  '行为面试',
  '系统设计面试',
  '文化契合度面试'
];

export function EditInterviewModal({
  isOpen,
  onClose,
  interview,
  onSubmit
}: EditInterviewModalProps) {
  const [formData, setFormData] = useState({
    date: interview.date,
    time: interview.time,
    duration: interview.duration,
    type: interview.type,
    location: interview.location,
    interviewers: interview.interviewers
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});
  const [interviewerSearch, setInterviewerSearch] = useState('');
  const [showInterviewerDropdown, setShowInterviewerDropdown] = useState(false);
  const interviewerSearchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (interviewerSearchRef.current && !interviewerSearchRef.current.contains(event.target as Node)) {
        setShowInterviewerDropdown(false);
      }
    }

    if (showInterviewerDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showInterviewerDropdown]);

  if (!isOpen) return null;

  const filteredInterviewers = MOCK_INTERVIEWERS.filter(interviewer => {
    const searchTerm = interviewerSearch.toLowerCase();
    const matchesSearch = 
      interviewer.name.toLowerCase().includes(searchTerm) ||
      interviewer.title.toLowerCase().includes(searchTerm) ||
      interviewer.department?.toLowerCase().includes(searchTerm);
    const notSelected = !formData.interviewers.some(i => i.id === interviewer.id);
    return matchesSearch && notSelected;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: typeof formErrors = {};

    if (!formData.date) errors.date = '请选择面试日期';
    if (!formData.time) errors.time = '请选择面试时间';
    if (!formData.duration) errors.duration = '请选择面试时长';
    if (!formData.type) errors.type = '请选择面试类型';
    if (!formData.location) errors.location = '请输入面试地点';
    if (!formData.interviewers.length) errors.interviewers = '请选择面试官';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    onSubmit(formData);
    onClose();
  };

  const handleInterviewerSelect = (interviewer: Interviewer) => {
    setFormData(prev => ({
      ...prev,
      interviewers: [...prev.interviewers, { 
        id: interviewer.id, 
        name: interviewer.name, 
        title: interviewer.title 
      }]
    }));
    setInterviewerSearch('');
    setShowInterviewerDropdown(false);
    if (formErrors.interviewers) {
      setFormErrors(prev => ({ ...prev, interviewers: undefined }));
    }
  };

  const handleInterviewerRemove = (interviewerId: string) => {
    setFormData(prev => ({
      ...prev,
      interviewers: prev.interviewers.filter(i => i.id !== interviewerId)
    }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">编辑面试信息</h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="max-h-[calc(100vh-16rem)] overflow-y-auto p-6 space-y-6">
              {/* Date, Time and Duration */}
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    面试日期 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className={cn(
                      "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                      formErrors.date ? "border-red-500" : "border-gray-300"
                    )}
                  />
                  {formErrors.date && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.date}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    开始时间 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className={cn(
                      "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                      formErrors.time ? "border-red-500" : "border-gray-300"
                    )}
                  />
                  {formErrors.time && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.time}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    面试时长 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className={cn(
                      "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                      formErrors.duration ? "border-red-500" : "border-gray-300"
                    )}
                  >
                    <option value="">请选择时长</option>
                    {DURATION_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {formErrors.duration && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.duration}</p>
                  )}
                </div>
              </div>

              {/* Interview Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  面试类型 <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className={cn(
                    "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                    formErrors.type ? "border-red-500" : "border-gray-300"
                  )}
                >
                  <option value="">请选择类型</option>
                  {INTERVIEW_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {formErrors.type && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.type}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  面试地点 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="会议室编号或线上会议链接"
                  className={cn(
                    "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                    formErrors.location ? "border-red-500" : "border-gray-300"
                  )}
                />
                {formErrors.location && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.location}</p>
                )}
              </div>

              {/* Interviewers */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  面试官 <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {/* Selected Interviewers */}
                  {formData.interviewers.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.interviewers.map((interviewer) => (
                        <div
                          key={interviewer.id}
                          className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 flex items-center space-x-1"
                        >
                          <span>{interviewer.name}</span>
                          <span className="text-blue-500">· {interviewer.title}</span>
                          <button
                            type="button"
                            onClick={() => handleInterviewerRemove(interviewer.id)}
                            className="ml-2 text-blue-400 hover:text-blue-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Interviewer Search */}
                  <div className="relative" ref={interviewerSearchRef}>
                    <input
                      type="text"
                      value={interviewerSearch}
                      onChange={(e) => {
                        setInterviewerSearch(e.target.value);
                        setShowInterviewerDropdown(true);
                      }}
                      onFocus={() => setShowInterviewerDropdown(true)}
                      placeholder="搜索面试官..."
                      className={cn(
                        "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500",
                        formErrors.interviewers ? "border-red-500" : "border-gray-300"
                      )}
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

                    {showInterviewerDropdown && (
                      <div className="absolute z-[100] w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {filteredInterviewers.length > 0 ? (
                          filteredInterviewers.map((interviewer) => (
                            <div
                              key={interviewer.id}
                              className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                              onClick={() => handleInterviewerSelect(interviewer)}
                            >
                              <div className="font-medium">{interviewer.name}</div>
                              <div className="text-sm text-gray-500">
                                <span>{interviewer.title}</span>
                                <span className="mx-2">·</span>
                                <span>{interviewer.department}</span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-2 text-gray-500">未找到匹配的面试官</div>
                        )}
                      </div>
                    )}
                  </div>
                  {formErrors.interviewers && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.interviewers}</p>
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