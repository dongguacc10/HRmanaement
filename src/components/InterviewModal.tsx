import { useState, useRef, useEffect } from 'react';
import { X, Search } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../lib/utils';

interface InterviewFormData {
  candidateId: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  interviewers: string[];
  notes: string;
}

interface Candidate {
  id: string;
  name: string;
  position: string;
  appliedPosition: string;
}

interface Interviewer {
  name: string;
  title: string;
  department: string;
}

const mockCandidates: Candidate[] = [
  { id: '1', name: '张三', position: '前端架构师', appliedPosition: '技术专家' },
  { id: '2', name: '李四', position: '高级算法工程师', appliedPosition: '算法专家' },
  { id: '3', name: '王五', position: 'DevOps专家', appliedPosition: '技术专家' },
  { id: '4', name: '赵六', position: '产品专家', appliedPosition: '产品总监' },
  { id: '5', name: '钱七', position: '技术专家', appliedPosition: '架构师' },
];

const INITIAL_INTERVIEWERS: Interviewer[] = [
  { name: '李工', title: '技术总监', department: '技术部' },
  { name: '王工', title: '前端架构师', department: '技术部' },
  { name: '张工', title: '后端架构师', department: '技术部' },
  { name: '赵总', title: '产品总监', department: '产品部' },
  { name: '孙工', title: '算法专家', department: '算法部' },
  { name: '周工', title: '技术经理', department: '技术部' },
  { name: '吴工', title: 'DevOps专家', department: '运维部' },
  { name: '郑工', title: '安全专家', department: '安全部' },
  { name: '陈工', title: '测试经理', department: '测试部' },
];

const DURATION_OPTIONS = [
  { value: '0.5', label: '30分钟' },
  { value: '1', label: '1小时' },
  { value: '1.5', label: '1.5小时' },
  { value: '2', label: '2小时' },
];

interface InterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: InterviewFormData) => void;
}

export function InterviewModal({ isOpen, onClose, onSubmit }: InterviewModalProps) {
  const [formData, setFormData] = useState<InterviewFormData>({
    candidateId: '',
    date: '',
    time: '',
    duration: '1',
    location: '',
    interviewers: [],
    notes: '',
  });

  const [candidateSearch, setCandidateSearch] = useState('');
  const [showCandidateDropdown, setShowCandidateDropdown] = useState(false);
  const [interviewerSearch, setInterviewerSearch] = useState('');
  const [showInterviewerDropdown, setShowInterviewerDropdown] = useState(false);
  const [hoveredInterviewer, setHoveredInterviewer] = useState<string | null>(null);

  const candidateSearchRef = useRef<HTMLDivElement>(null);
  const interviewerSearchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (candidateSearchRef.current && !candidateSearchRef.current.contains(event.target as Node)) {
        setShowCandidateDropdown(false);
      }
      if (interviewerSearchRef.current && !interviewerSearchRef.current.contains(event.target as Node)) {
        setShowInterviewerDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredCandidates = mockCandidates.filter(
    candidate => 
      candidate.name.toLowerCase().includes(candidateSearch.toLowerCase()) ||
      candidate.position.toLowerCase().includes(candidateSearch.toLowerCase())
  );

  const filteredInterviewers = INITIAL_INTERVIEWERS.filter(
    interviewer => {
      const searchTerm = interviewerSearch.toLowerCase();
      const matchesSearch = 
        interviewer.name.toLowerCase().includes(searchTerm) ||
        interviewer.title.toLowerCase().includes(searchTerm) ||
        interviewer.department.toLowerCase().includes(searchTerm);
      const notSelected = !formData.interviewers.includes(interviewer.name);
      return matchesSearch && notSelected;
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleCandidateSelect = (candidate: Candidate) => {
    setFormData(prev => ({ ...prev, candidateId: candidate.id }));
    setCandidateSearch(`${candidate.name} - ${candidate.appliedPosition} - ${candidate.position}`);
    setShowCandidateDropdown(false);
  };

  const handleInterviewerSelect = (interviewer: Interviewer) => {
    setFormData(prev => ({
      ...prev,
      interviewers: [...prev.interviewers, interviewer.name]
    }));
    setInterviewerSearch('');
    setShowInterviewerDropdown(false);
  };

  const handleInterviewerRemove = (interviewerName: string) => {
    setFormData(prev => ({
      ...prev,
      interviewers: prev.interviewers.filter(name => name !== interviewerName)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">安排面试</h2>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="max-h-[calc(100vh-16rem)] overflow-y-auto custom-scrollbar">
                <div className="p-6 space-y-6">
                  {/* 候选人选择 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      候选人 <span className="text-red-500">*</span>
                    </label>
                    <div className="relative" ref={candidateSearchRef}>
                      <input
                        type="text"
                        value={candidateSearch}
                        onChange={(e) => {
                          setCandidateSearch(e.target.value);
                          setShowCandidateDropdown(true);
                        }}
                        onFocus={() => setShowCandidateDropdown(true)}
                        placeholder="搜索候选人..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      
                      {showCandidateDropdown && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto custom-scrollbar">
                          {filteredCandidates.length > 0 ? (
                            filteredCandidates.map((candidate) => (
                              <div
                                key={candidate.id}
                                className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                                onClick={() => handleCandidateSelect(candidate)}
                              >
                                <div className="font-medium">{candidate.name}</div>
                                <div className="text-sm text-gray-500">
                                  <span className="text-blue-600">应聘职位：{candidate.appliedPosition}</span>
                                  <span className="mx-2">·</span>
                                  <span>当前职位：{candidate.position}</span>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="px-4 py-2 text-gray-500">未找到匹配的候选人</div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 面试时间和时长 */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        面试日期 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        开始时间 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="time"
                        required
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        面试时长 <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                      >
                        {DURATION_OPTIONS.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* 面试地点 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      面试地点 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="会议室或线上会议链接"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* 面试官 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      面试官 <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-3">
                      {/* Selected Interviewers */}
                      {formData.interviewers.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {formData.interviewers.map((name) => {
                            const interviewer = INITIAL_INTERVIEWERS.find(i => i.name === name);
                            return (
                              <div
                                key={name}
                                className="relative group"
                                onMouseEnter={() => setHoveredInterviewer(name)}
                                onMouseLeave={() => setHoveredInterviewer(null)}
                              >
                                <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                                  <span>{name}</span>
                                  {interviewer && (
                                    <span className="ml-1 text-blue-500">· {interviewer.title}</span>
                                  )}
                                </div>
                                {hoveredInterviewer === name && (
                                  <button
                                    type="button"
                                    onClick={() => handleInterviewerRemove(name)}
                                    className="absolute -top-1 -right-1 w-4 h-4 bg-gray-500 text-white rounded-full flex items-center justify-center hover:bg-gray-600"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                            );
                          })}
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

                        {showInterviewerDropdown && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto custom-scrollbar">
                            {filteredInterviewers.length > 0 ? (
                              filteredInterviewers.map((interviewer) => (
                                <div
                                  key={interviewer.name}
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
                    </div>
                  </div>

                  {/* 备注 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      备注
                    </label>
                    <textarea
                      rows={3}
                      placeholder="添加面试相关备注信息"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t px-6 py-4 bg-gray-50 rounded-b-xl">
                <div className="flex justify-end space-x-4">
                  <Button variant="secondary" type="button" onClick={onClose}>
                    取消
                  </Button>
                  <Button type="submit">
                    确认安排
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}