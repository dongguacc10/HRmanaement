import { useState, useMemo } from 'react';
import { Plus, Search, X } from 'lucide-react';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';
import { InterviewModal } from '../../components/InterviewModal';
import SlideDrawer from '../../components/SlideDrawer';
import { InterviewDetailDrawer } from '../../components/interview/InterviewDetailDrawer';
import CandidateProfile from '../../components/CandidateProfile';
import { cn } from '../../lib/utils';
import { Pagination } from '../../components/Pagination';

interface Interview {
  id: string;
  date: string;
  time: string;
  candidate: {
    id: string;
    name: string;
    currentPosition: string;
    company: string;
    applyPosition: {
      id: string;
      name: string;
    };
  };
  interviewer: string;
  location: string;
  status: string;
}

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

const MOCK_INTERVIEWS: Interview[] = [
  {
    id: '1',
    date: new Date().toISOString().split('T')[0],
    time: '14:30-15:30',
    candidate: {
      id: '1',
      name: '张三',
      currentPosition: '高级前端工程师',
      company: '字节跳动',
      applyPosition: {
        id: '1',
        name: '前端架构师'
      }
    },
    interviewer: '李工',
    location: '会议室A',
    status: '待面试'
  }
];

const ITEMS_PER_PAGE = 10;

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInterviewId, setSelectedInterviewId] = useState<string | null>(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [positionSearch, setPositionSearch] = useState('');
  const [showPositionDropdown, setShowPositionDropdown] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);

  // 格式化日期显示
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const weekDay = weekDays[date.getDay()];
    return `${date.getMonth() + 1}月${date.getDate()}日 ${weekDay}`;
  };

  // 处理日期选择
  const handleDateSelect = (date: Date) => {
    if (selectedDate?.toDateString() === date.toDateString()) {
      setSelectedDate(null);
    } else {
      setSelectedDate(date);
    }
    setCurrentPage(1);
  };

  // 处理面试安排提交
  const handleInterviewSubmit = (formData: any) => {
    console.log('New interview scheduled:', formData);
    setIsModalOpen(false);
  };

  // 筛选面试列表
  const filteredInterviews = useMemo(() => {
    return MOCK_INTERVIEWS.filter(interview => {
      const matchesSearch = searchTerm === '' || 
        interview.candidate.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = selectedStatus === 'all' || 
        interview.status === selectedStatus;

      const matchesDate = !selectedDate || 
        new Date(interview.date).toDateString() === selectedDate.toDateString();

      const matchesPosition = !selectedPosition || 
        interview.candidate.applyPosition.id === selectedPosition.id;

      return matchesSearch && matchesStatus && matchesDate && matchesPosition;
    });
  }, [MOCK_INTERVIEWS, searchTerm, selectedStatus, selectedDate, selectedPosition]);

  // 分页处理
  const paginatedInterviews = useMemo(() => {
    return filteredInterviews.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
  }, [filteredInterviews, currentPage]);

  // 处理面试详情点击
  const handleInterviewClick = (interviewId: string) => {
    setSelectedInterviewId(interviewId);
  };

  const handleCloseInterviewDetail = () => {
    setSelectedInterviewId(null);
  };

  // 处理查看候选人
  const handleViewCandidate = (candidateId: string) => {
    setSelectedCandidateId(candidateId);
  };

  const handleCloseCandidateDetail = () => {
    setSelectedCandidateId(null);
  };

  // 筛选职位列表
  const filteredPositions = MOCK_POSITIONS.filter(position => {
    const searchLower = positionSearch.toLowerCase();
    return (
      position.name.toLowerCase().includes(searchLower) ||
      position.department.toLowerCase().includes(searchLower)
    );
  });

  // 处理职位选择
  const handlePositionSelect = (position: Position) => {
    setSelectedPosition(position);
    setPositionSearch(position.name);
    setShowPositionDropdown(false);
  };

  // 清除职位选择
  const handleClearPosition = () => {
    setSelectedPosition(null);
    setPositionSearch('');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">面试安排</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          新建面试
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-4">
            <Calendar
              events={MOCK_INTERVIEWS.map(interview => ({
                id: interview.id,
                date: interview.date,
                time: interview.time,
                title: `${interview.candidate.name} - ${interview.candidate.applyPosition.name}`,
                type: interview.status
              }))}
              selectedDate={selectedDate || undefined}
              onDateSelect={handleDateSelect}
            />
          </div>
        </div>

        {/* Interview List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow flex flex-col h-[800px]">
            {/* 搜索和筛选区域 */}
            <div className="p-4 border-b space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="搜索候选人..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex space-x-4">
                <div className="relative flex-1">
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
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-32 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">全部状态</option>
                  <option value="待面试">待面试</option>
                  <option value="已完成">已完成</option>
                  <option value="已取消">已取消</option>
                </select>
              </div>
            </div>

            {/* 面试列表 */}
            <div className="flex-1 overflow-y-auto custom-scrollbar divide-y">
              {paginatedInterviews.length > 0 ? (
                paginatedInterviews.map((interview) => (
                  <div 
                    key={interview.id} 
                    className="p-4 hover:bg-gray-50 cursor-pointer transition-all duration-200"
                    onClick={() => handleInterviewClick(interview.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-bold text-gray-900">
                            {interview.candidate.name}
                          </h3>
                          <span className={`px-2 py-0.5 text-xs rounded-full ${
                            interview.status === '待面试' ? 'bg-blue-100 text-blue-700' :
                            interview.status === '已完成' ? 'bg-green-100 text-green-700' :
                            interview.status === '已取消' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {interview.status}
                          </span>
                        </div>
                        
                        <div className="mt-1 text-sm">
                          <span className="text-gray-500">应聘：</span>
                          <span className="text-blue-600 font-medium">{interview.candidate.applyPosition.name}</span>
                          <span className="mx-2 text-gray-300">|</span>
                          <span className="text-gray-500">{interview.candidate.currentPosition}</span>
                          <span className="mx-1 text-gray-500">@</span>
                          <span className="text-gray-500">{interview.candidate.company}</span>
                        </div>

                        <div className="mt-2 text-sm text-gray-500">
                          <span className="font-medium text-gray-900">{formatDate(interview.date)} {interview.time}</span>
                          <span className="mx-2">·</span>
                          <span>{interview.location}</span>
                          <span className="mx-2">·</span>
                          <span>面试官：{interview.interviewer}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  没有找到符合条件的面试安排
                </div>
              )}
            </div>

            {/* 分页器 */}
            <Pagination
              currentPage={currentPage}
              totalItems={filteredInterviews.length}
              pageSize={ITEMS_PER_PAGE}
              onPageChange={setCurrentPage}
              className="border-t"
            />
          </div>
        </div>
      </div>

      {/* Interview Detail Drawer */}
      <SlideDrawer
        isOpen={!!selectedInterviewId}
        onClose={handleCloseInterviewDetail}
        width="800px"
      >
        <InterviewDetailDrawer
          interviewId={selectedInterviewId!}
          onClose={handleCloseInterviewDetail}
          onViewCandidate={handleViewCandidate}
        />
      </SlideDrawer>

      {/* Candidate Detail Drawer */}
      <SlideDrawer
        isOpen={!!selectedCandidateId}
        onClose={handleCloseCandidateDetail}
        width="1000px"
      >
        <CandidateProfile
          candidateId={selectedCandidateId!}
        />
      </SlideDrawer>

      {/* Interview Form Modal */}
      <InterviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleInterviewSubmit}
      />
    </div>
  );
}