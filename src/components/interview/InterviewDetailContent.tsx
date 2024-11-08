import { useState } from 'react';
import { Edit2, ChevronDown, Users, Calendar, Sparkles, Loader2, Mail, Phone, MapPin, Printer, CheckCircle2, XCircle, Clock, User } from 'lucide-react';
import { Button } from '../Button';
import { PrintResumeModal } from '../PrintResumeModal';
import { EditInterviewModal } from '../EditInterviewModal';
import { ConfirmDialog } from '../ConfirmDialog';
import CompetencyRadar from '../CompetencyRadar';
import { CompetencyEditModal } from '../CompetencyEditModal';
import SlideDrawer from '../SlideDrawer';
import PositionDetail from '../../pages/enterprise/positions/PositionDetail';

interface InterviewDetailContentProps {
  interviewId: string;
  onClose: () => void;
  onViewCandidate?: (candidateId: string) => void;
}

const MOCK_INTERVIEW = {
  id: '1',
  date: '2024-03-20',
  time: '14:30',
  duration: '1.5',
  location: '会议室A',
  status: '待面试',
  checkInStatus: '未签到',
  checkInTime: null,
  candidate: {
    id: '1',
    name: '张三',
    age: 28,
    avatar: null,
    title: '高级前端工程师',
    company: '字节跳动',
    email: 'zhangsan@example.com',
    phone: '13800138000',
    applyPosition: {
      id: '1',
      name: '前端架构师'
    },
    applyDate: '2024-03-15',
    applyStatus: '技术面试'
  },
  interviewers: [
    { id: '1', name: '李工', title: '技术总监' },
    { id: '2', name: '王工', title: '前端架构师' }
  ],
  feedback: '',
  aiSuggestion: ''
};

const FEEDBACK_TEMPLATE = `## 技术能力评估

- 技术深度：
- 技术广度：
- 系统设计：
- 问题解决：

## 沟通表现

- 表达能力：
- 理解能力：
- 互动质量：

## 综合评价

## 建议`;

const AI_GUIDE_TEMPLATE = `## 面试重点关注
- 候选人具有丰富的前端开发经验，建议深入了解性能优化经验
- 作为前端架构师候选人，重点考察系统设计能力
- 关注团队管理和技术决策方面的经验

## 建议提问方向
1. 询问过往项目中的技术架构决策过程
2. 探讨前端工程化体系建设经验
3. 了解团队管理方法论和实践案例

## 需要注意
- 注意考察跨团队协作能力
- 关注技术视野的广度和深度
- 评估对前沿技术的理解和判断`;

export function InterviewDetailContent({ interviewId, onClose, onViewCandidate }: InterviewDetailContentProps) {
  const [interview] = useState(MOCK_INTERVIEW);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);
  const [isEditingFeedback, setIsEditingFeedback] = useState(false);
  const [feedback, setFeedback] = useState(FEEDBACK_TEMPLATE);
  const [isGeneratingAIGuide, setIsGeneratingAIGuide] = useState(false);
  const [aiGuide, setAiGuide] = useState('');
  const [showPositionDetail, setShowPositionDetail] = useState(false);

  const handleEditSubmit = (data: Partial<typeof interview>) => {
    // TODO: 实现编辑提交逻辑
    setShowEditModal(false);
  };

  const handlePass = () => {
    // TODO: 实现通过逻辑
    setShowPassConfirm(false);
  };

  const handleReject = () => {
    // TODO: 实现拒绝逻辑
    setShowRejectConfirm(false);
  };

  const handlePrint = (options: { resume: boolean; aiSuggestion: boolean; feedback: boolean }) => {
    // TODO: 实现打印逻辑
    setShowPrintModal(false);
  };

  const generateAIGuide = async () => {
    setIsGeneratingAIGuide(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setAiGuide(AI_GUIDE_TEMPLATE);
    setIsGeneratingAIGuide(false);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-500 text-white">
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-2xl font-semibold">
                {interview.candidate.avatar ? (
                  <img 
                    src={interview.candidate.avatar} 
                    alt={interview.candidate.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  interview.candidate.name.slice(0, 2)
                )}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <button 
                    className="text-2xl font-bold hover:text-blue-100 transition-colors"
                    onClick={() => onViewCandidate?.(interview.candidate.id)}
                  >
                    {interview.candidate.name}
                  </button>
                  <span className="text-blue-100">· {interview.candidate.age}岁</span>
                </div>
                <div className="mt-1 text-blue-100">
                  <span>{interview.candidate.title}</span>
                  <span className="mx-2">@</span>
                  <span>{interview.candidate.company}</span>
                </div>
                <div className="mt-2 flex items-center space-x-4 text-sm text-blue-100">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-1.5" />
                    {interview.candidate.email}
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-1.5" />
                    {interview.candidate.phone}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPrintModal(true)}
                className="text-white hover:bg-white/10"
              >
                <Printer className="w-4 h-4 mr-1.5" />
                打印简历
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowEditModal(true)}
                className="text-white hover:bg-white/10"
              >
                <Edit2 className="w-4 h-4 mr-1.5" />
                编辑
              </Button>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-blue-200 mb-1">应聘职位</div>
                <button
                  className="font-medium hover:text-blue-100 transition-colors"
                  onClick={() => setShowPositionDetail(true)}
                >
                  {interview.candidate.applyPosition.name}
                </button>
              </div>
              <div>
                <div className="text-sm text-blue-200 mb-1">投递时间</div>
                <div className="font-medium">{interview.candidate.applyDate}</div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-blue-200" />
                <span>{interview.date} {interview.time}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-blue-200" />
                <span>{interview.duration}小时</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-blue-200" />
                <span>{interview.location}</span>
              </div>
              <div className="flex items-center">
                <span className={`px-2 py-1 text-sm rounded-full ${
                  interview.checkInStatus === '已签到' 
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {interview.checkInStatus}
                  {interview.checkInTime && ` · ${interview.checkInTime}`}
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center space-x-2 text-blue-100">
              <User className="w-4 h-4" />
              <span>面试官：</span>
              {interview.interviewers.map((interviewer, index) => (
                <span key={interviewer.id}>
                  {interviewer.name}
                  {index < interview.interviewers.length - 1 && '、'}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowRejectConfirm(true)}
              className="text-red-100 hover:bg-white/10"
            >
              <XCircle className="w-4 h-4 mr-1.5" />
              不合适
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPassConfirm(true)}
              className="text-green-100 hover:bg-white/10"
            >
              <CheckCircle2 className="w-4 h-4 mr-1.5" />
              通过
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="h-full flex">
          <div className="w-1/2 overflow-y-auto custom-scrollbar p-6 border-r">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">AI 面试指南</h3>
              {!aiGuide && !isGeneratingAIGuide && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={generateAIGuide}
                >
                  <Sparkles className="w-4 h-4 mr-1.5" />
                  生成指南
                </Button>
              )}
            </div>

            {isGeneratingAIGuide ? (
              <div className="flex flex-col items-center justify-center h-[400px]">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
                <p className="text-sm text-gray-600">正在生成面试指南...</p>
              </div>
            ) : aiGuide ? (
              <div className="prose prose-sm max-w-none">
                {aiGuide.split('\n').map((line, index) => {
                  if (line.startsWith('## ')) {
                    return <h2 key={index} className="text-lg font-semibold mt-6 mb-3">{line.slice(3)}</h2>;
                  }
                  if (line.startsWith('- ')) {
                    return <li key={index} className="ml-4">{line.slice(2)}</li>;
                  }
                  if (line.match(/^\d+\./)) {
                    return <div key={index} className="ml-4">{line}</div>;
                  }
                  return <p key={index}>{line}</p>;
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  生成 AI 面试指南
                </h3>
                <p className="text-sm text-gray-500 mb-6 max-w-sm">
                  基于候选人简历和职位要求，AI 将生成个性化的面试指南，帮助您更好地进行面试
                </p>
                <Button onClick={generateAIGuide}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  开始生成
                </Button>
              </div>
            )}
          </div>

          <div className="w-1/2 overflow-y-auto custom-scrollbar p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">面试反馈</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditingFeedback(!isEditingFeedback)}
              >
                <Edit2 className="w-4 h-4 mr-1.5" />
                {isEditingFeedback ? '完成' : '编辑'}
              </Button>
            </div>

            {isEditingFeedback ? (
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full h-[500px] p-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="请输入面试反馈..."
              />
            ) : (
              <div className="prose prose-sm max-w-none">
                {feedback.split('\n').map((line, index) => {
                  if (line.startsWith('## ')) {
                    return <h2 key={index} className="text-lg font-semibold mt-6 mb-3">{line.slice(3)}</h2>;
                  }
                  if (line.startsWith('- ')) {
                    return <li key={index} className="ml-4">{line.slice(2)}</li>;
                  }
                  return <p key={index}>{line}</p>;
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <EditInterviewModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        interview={interview}
        onSubmit={handleEditSubmit}
      />

      <PrintResumeModal
        isOpen={showPrintModal}
        onClose={() => setShowPrintModal(false)}
        onPrint={handlePrint}
      />

      <ConfirmDialog
        isOpen={showPassConfirm}
        onClose={() => setShowPassConfirm(false)}
        onConfirm={handlePass}
        title="确认通过"
        message="确认通过该候选人吗？通过后将进入下一轮面试。"
        confirmText="确认通过"
        cancelText="取消"
      />

      <ConfirmDialog
        isOpen={showRejectConfirm}
        onClose={() => setShowRejectConfirm(false)}
        onConfirm={handleReject}
        title="确认不合适"
        message="确认该候选人不合适吗？操作后将结束面试流程。"
        confirmText="确认不合适"
        cancelText="取消"
      />

      <SlideDrawer
        isOpen={showPositionDetail}
        onClose={() => setShowPositionDetail(false)}
        width="800px"
      >
        <PositionDetail
          positionId={interview.candidate.applyPosition.id}
          onClose={() => setShowPositionDetail(false)}
        />
      </SlideDrawer>
    </div>
  );
}