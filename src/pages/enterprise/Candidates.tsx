import { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Mail, Phone, MapPin, Sparkles, X } from 'lucide-react';
import { Button } from '../../components/Button';
import { Pagination } from '../../components/Pagination';
import SlideDrawer from '../../components/SlideDrawer';
import CandidateProfile from '../../components/CandidateProfile';
import { TruncatedField } from '../../components/TruncatedField';
import { cn } from '../../lib/utils';

interface Position {
  id: string;
  name: string;
  department: string;
}

const MOCK_POSITIONS: Position[] = [
  { id: '1', name: '前端架构师', department: '技术部' },
  { id: '2', name: '高级算法工程师', department: '算法部' },
  { id: '3', name: '产品经理', department: '产品部' },
  { id: '4', name: '技术专家', department: '技术部' },
  { id: '5', name: 'DevOps专家', department: '运维部' },
];

interface Candidate {
  id: number;
  name: string;
  currentPosition: string;
  currentCompany: string;
  salary: string;
  email: string;
  phone: string;
  location: string;
  appliedPosition: string;
  status: string;
}

const MOCK_CANDIDATES: Candidate[] = [
  {
    id: 1,
    name: '张三',
    currentPosition: '高级前端工程师',
    currentCompany: '腾讯科技',
    salary: '40-50万',
    email: 'zhangsan@example.com',
    phone: '13800138000',
    location: '北京',
    appliedPosition: '技术专家',
    status: '面试中'
  },
  {
    id: 2,
    name: '李四',
    currentPosition: '产品经理',
    currentCompany: '阿里巴巴',
    salary: '35-45万',
    email: 'lisi@example.com',
    phone: '13800138001',
    location: '杭州',
    appliedPosition: '高级产品经理',
    status: '简历筛选'
  },
  {
    id: 3,
    name: '王五',
    currentPosition: '算法工程师',
    currentCompany: '字节跳动',
    salary: '45-60万',
    email: 'wangwu@example.com',
    phone: '13800138002',
    location: '北京',
    appliedPosition: '算法专家',
    status: '已通过'
  },
  {
    id: 4,
    name: '赵六',
    currentPosition: '后端工程师',
    currentCompany: '美团',
    salary: '30-40万',
    email: 'zhaoliu@example.com',
    phone: '13800138003',
    location: '北京',
    appliedPosition: '高级后端工程师',
    status: '已拒绝'
  },
  {
    id: 5,
    name: '钱七',
    currentPosition: 'DevOps工程师',
    currentCompany: '京东',
    salary: '35-45万',
    email: 'qianqi@example.com',
    phone: '13800138004',
    location: '北京',
    appliedPosition: 'DevOps专家',
    status: '待安排面试'
  }
];

const ITEMS_PER_PAGE = 10;

export default function Candidates() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [positionSearch, setPositionSearch] = useState('');
  const [showPositionDropdown, setShowPositionDropdown] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const positionSearchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (positionSearchRef.current && !positionSearchRef.current.contains(event.target as Node)) {
        setShowPositionDropdown(false);
      }
    }

    if (showPositionDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPositionDropdown]);

  const filteredPositions = MOCK_POSITIONS.filter(position => {
    const searchLower = positionSearch.toLowerCase();
    return (
      position.name.toLowerCase().includes(searchLower) ||
      position.department.toLowerCase().includes(searchLower)
    );
  });

  const handlePositionSelect = (position: Position) => {
    setSelectedPosition(position);
    setPositionSearch(position.name);
    setShowPositionDropdown(false);
  };

  const handleClearPosition = () => {
    setSelectedPosition(null);
    setPositionSearch('');
  };

  const filteredCandidates = useMemo(() => {
    return MOCK_CANDIDATES.filter(candidate => {
      const matchesSearch = 
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.phone.includes(searchTerm);
      
      const matchesStatus = selectedStatus === 'all' || candidate.status === selectedStatus;
      
      const matchesPosition = !selectedPosition || 
        candidate.appliedPosition === selectedPosition.name;
      
      return matchesSearch && matchesStatus && matchesPosition;
    });
  }, [searchTerm, selectedStatus, selectedPosition]);

  const paginatedCandidates = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCandidates.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredCandidates, currentPage]);

  const handleCandidateClick = (candidateId: number) => {
    setSelectedCandidate(candidateId);
  };

  const handleCloseCandidateDetail = () => {
    setSelectedCandidate(null);
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">候选人 ({filteredCandidates.length})</h1>
        <Button onClick={() => navigate('/enterprise/candidate/new')}>
          <Sparkles className="w-4 h-4 mr-2" />
          AI 添加候选人
        </Button>
      </div>

      <div className="sticky top-0 z-10">
        <div className="bg-white shadow-md p-4">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索候选人..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative flex-1" ref={positionSearchRef}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="筛选职位..."
                  value={positionSearch}
                  onChange={(e) => {
                    setPositionSearch(e.target.value);
                    setShowPositionDropdown(true);
                    if (!e.target.value) {
                      setSelectedPosition(null);
                    }
                  }}
                  onFocus={() => setShowPositionDropdown(true)}
                  className={cn(
                    "w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                    selectedPosition ? "border-blue-500" : "border-gray-300"
                  )}
                />
                {selectedPosition && (
                  <button
                    onClick={handleClearPosition}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {showPositionDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                  {filteredPositions.length > 0 ? (
                    filteredPositions.map((position) => (
                      <div
                        key={position.id}
                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                        onClick={() => handlePositionSelect(position)}
                      >
                        <div className="font-medium">{position.name}</div>
                        <div className="text-sm text-gray-500">{position.department}</div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500">未找到匹配的职位</div>
                  )}
                </div>
              )}
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-32 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">所有状态</option>
              <option value="面试中">面试中</option>
              <option value="简历筛选">简历筛选</option>
              <option value="待安排面试">待安排面试</option>
              <option value="已通过">已通过</option>
              <option value="已拒绝">已拒绝</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-white rounded-lg shadow">
        <div className="divide-y">
          {paginatedCandidates.map((candidate) => (
            <div
              key={candidate.id}
              className="p-6 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
              onClick={() => handleCandidateClick(candidate.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                    {candidate.name.slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900">
                      <TruncatedField text={candidate.name} type="name" />
                    </div>
                    <div className="text-blue-600 mt-1">
                      <span className="text-gray-500 text-sm">应聘岗位：</span>
                      <TruncatedField text={candidate.appliedPosition} type="position" />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <TruncatedField text={`${candidate.currentPosition} · ${candidate.currentCompany} · ${candidate.salary}`} type="info" />
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        <TruncatedField text={candidate.email} type="email" />
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-1" />
                        <TruncatedField text={candidate.phone} type="phone" />
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        <TruncatedField text={candidate.location} type="location" />
                      </div>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  candidate.status === '已通过' ? 'bg-green-100 text-green-700' :
                  candidate.status === '已拒绝' ? 'bg-red-100 text-red-700' :
                  candidate.status === '面试中' ? 'bg-blue-100 text-blue-700' :
                  candidate.status === '待反馈' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {candidate.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalItems={filteredCandidates.length}
          pageSize={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
          className="border-t"
        />
      </div>

      <SlideDrawer 
        isOpen={!!selectedCandidate}
        onClose={handleCloseCandidateDetail}
        width="1000px"
      >
        <CandidateProfile candidateId={selectedCandidate?.toString()} />
      </SlideDrawer>
    </div>
  );
}