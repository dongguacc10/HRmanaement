import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Users, Calendar, ChevronDown, LogOut, Settings, Plus, Briefcase, LayoutDashboard, ArrowRight, Sparkles, Zap } from 'lucide-react';
import { Button } from '../../components/Button';
import SlideDrawer from '../../components/SlideDrawer';
import { InterviewDetailDrawer } from '../../components/interview/InterviewDetailDrawer';
import CandidateProfile from '../../components/CandidateProfile';

// 模拟实时数据
const MOCK_REAL_TIME_DATA = [
  { 
    id: 1, 
    time: '09:30', 
    enterprise: '阿里巴巴', 
    candidate: '张三', 
    position: '高级前端工程师',
    currentCompany: '字节跳动',
    applyPosition: '前端架构师', 
    status: '已签到' 
  },
  { 
    id: 2, 
    time: '10:00', 
    enterprise: '腾讯', 
    candidate: '李四', 
    position: '产品经理',
    currentCompany: '阿里巴巴',
    applyPosition: '高级产品经理', 
    status: '待签到' 
  },
  { 
    id: 3, 
    time: '10:30', 
    enterprise: '字节跳动', 
    candidate: '王五', 
    position: '算法工程师',
    currentCompany: '美团',
    applyPosition: '算法专家', 
    status: '已签到' 
  },
  { 
    id: 4, 
    time: '11:00', 
    enterprise: '美团', 
    candidate: '赵六', 
    position: '后端工程师',
    currentCompany: '京东',
    applyPosition: 'DevOps专家', 
    status: '待签到' 
  },
];

const MOCK_STATS = {
  checkIns: {
    today: 12,
    total: 1280
  },
  interviews: {
    today: 8,
    total: 960
  },
  candidates: {
    today: 5,
    total: 320
  },
  positions: {
    today: 3,
    total: 45
  }
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedInterviewId, setSelectedInterviewId] = useState<string | null>(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);

  const handleInterviewClick = (interviewId: string) => {
    setSelectedInterviewId(interviewId);
  };

  const handleCloseInterviewDetail = () => {
    setSelectedInterviewId(null);
  };

  const handleCandidateClick = (candidateId: string) => {
    setSelectedCandidateId(candidateId);
  };

  const handleCloseCandidateDetail = () => {
    setSelectedCandidateId(null);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FAFBFF] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          <div 
            className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 shadow-[0_12px_36px_rgb(59,130,246,0.35)] hover:shadow-[0_12px_36px_rgb(59,130,246,0.5)] transition-all cursor-pointer group"
            onClick={() => navigate('/enterprise/positions/create')}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-lg font-semibold text-white">发布职位</h3>
                  <span className="flex items-center px-1.5 py-0.5 text-xs font-medium bg-white/20 backdrop-blur-sm text-white rounded-full">
                    <Sparkles className="w-3 h-3 mr-0.5" />
                    AI
                  </span>
                </div>
                <p className="text-sm text-blue-100">快速创建职位并发布</p>
              </div>
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div 
            className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 shadow-[0_12px_36px_rgb(168,85,247,0.35)] hover:shadow-[0_12px_36px_rgb(168,85,247,0.5)] transition-all cursor-pointer group"
            onClick={() => navigate('/enterprise/candidate/new')}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-lg font-semibold text-white">新增候选人</h3>
                  <span className="flex items-center px-1.5 py-0.5 text-xs font-medium bg-white/20 backdrop-blur-sm text-white rounded-full">
                    <Sparkles className="w-3 h-3 mr-0.5" />
                    AI
                  </span>
                </div>
                <p className="text-sm text-purple-100">添加候选人信息</p>
              </div>
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div 
            className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-6 shadow-[0_12px_36px_rgb(16,185,129,0.35)] hover:shadow-[0_12px_36px_rgb(16,185,129,0.5)] transition-all cursor-pointer group"
            onClick={() => navigate('/enterprise/schedule')}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-lg font-semibold text-white">面试安排</h3>
                  <span className="flex items-center px-1.5 py-0.5 text-xs font-medium bg-white/20 backdrop-blur-sm text-white rounded-full">
                    <Zap className="w-3 h-3 mr-0.5" />
                    快捷
                  </span>
                </div>
                <p className="text-sm text-emerald-100">安排面试时间</p>
              </div>
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-4 gap-6 mb-12">
          {/* Check-ins */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-2xl font-bold text-gray-900">{MOCK_STATS.checkIns.today}</div>
                <div className="text-sm text-gray-500 mt-0.5">
                  今日签到
                  <div className="text-gray-400 mt-0.5">总计 {MOCK_STATS.checkIns.total}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Interviews */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-2xl font-bold text-gray-900">{MOCK_STATS.interviews.today}</div>
                <div className="text-sm text-gray-500 mt-0.5">
                  今日面试
                  <div className="text-gray-400 mt-0.5">总计 {MOCK_STATS.interviews.total}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Candidates */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-pink-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-2xl font-bold text-gray-900">{MOCK_STATS.candidates.today}</div>
                <div className="text-sm text-gray-500 mt-0.5">
                  新增候选人
                  <div className="text-gray-400 mt-0.5">总计 {MOCK_STATS.candidates.total}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Positions */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-2xl font-bold text-gray-900">{MOCK_STATS.positions.today}</div>
                <div className="text-sm text-gray-500 mt-0.5">
                  在招职位
                  <div className="text-gray-400 mt-0.5">总计 {MOCK_STATS.positions.total}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Interviews */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-medium text-gray-900">今日面试安排</h3>
              <Button variant="ghost" size="sm" onClick={() => navigate('/enterprise/schedule')}>
                查看全部
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-4">
              {MOCK_REAL_TIME_DATA.map(interview => (
                <div 
                  key={interview.id} 
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200 transform hover:scale-[1.02]"
                  onClick={() => handleInterviewClick(interview.id.toString())}
                >
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-blue-600">{interview.time}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{interview.candidate}</span>
                      <span className="text-gray-400">·</span>
                      <span className="font-medium text-blue-600">{interview.applyPosition}</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-0.5">
                      {interview.position}
                      <span className="mx-1">@</span>
                      {interview.currentCompany}
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-sm rounded-full ${
                    interview.status === '已签到' 
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {interview.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Candidates */}
          <div className="bg-white rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-medium text-gray-900">最新候选人</h3>
              <Button variant="ghost" size="sm" onClick={() => navigate('/enterprise/candidates')}>
                查看全部
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="space-y-4">
              {MOCK_REAL_TIME_DATA.map(candidate => (
                <div 
                  key={candidate.id} 
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200 transform hover:scale-[1.02]"
                  onClick={() => handleCandidateClick(candidate.id.toString())}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-medium">
                    {candidate.candidate.slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{candidate.candidate}</span>
                      <span className="text-gray-400">·</span>
                      <span className="font-medium text-blue-600">{candidate.applyPosition}</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-0.5">
                      {candidate.position}
                      <span className="mx-1">@</span>
                      {candidate.currentCompany}
                    </div>
                  </div>
                </div>
              ))}
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
            onViewCandidate={handleCandidateClick}
          />
        </SlideDrawer>

        {/* Candidate Detail Drawer */}
        <SlideDrawer
          isOpen={!!selectedCandidateId}
          onClose={handleCloseCandidateDetail}
          width="1000px"
        >
          <CandidateProfile
            candidateId={selectedCandidateId}
          />
        </SlideDrawer>
      </div>
    </div>
  );
}