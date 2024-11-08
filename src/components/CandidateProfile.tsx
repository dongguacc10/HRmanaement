import { useState } from 'react';
import { Mail, Phone, MapPin, User, Calendar, Clock, Printer, ChevronDown, Briefcase, Edit2, Trash2, CheckCircle2, XCircle, AlertCircle, Undo2, FileText, Sparkles, Loader2 } from 'lucide-react';
import { Button } from './Button';
import { TruncatedField } from './TruncatedField';
import { InterviewModal } from './InterviewModal';
import InterviewDetailDrawer from './InterviewDetailDrawer';
import SlideDrawer from './SlideDrawer';
import PositionDetail from '../pages/enterprise/positions/PositionDetail';
import { cn } from '../lib/utils';

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

interface CandidateProfileProps {
  candidateId?: string;
}

const MOCK_CANDIDATE = {
  name: '张三',
  gender: '男',
  age: 28,
  currentPosition: '高级前端工程师',
  company: '字节跳动',
  email: 'zhangsan@example.com',
  phone: '13800138000',
  location: '北京市朝阳区',
  education: '清华大学 · 计算机科学与技术',
  resumeContent: `### 个人简介
8年前端开发经验，3年团队管理经验。专注于大规模Web应用架构设计与性能优化，具有丰富的跨端开发经验。

### 工作经历
#### 字节跳动（2020-至今）
- 担任抖音电商前端团队技术负责人，负责团队管理和技术架构设计
- 主导完成电商平台微前端改造，提升开发效率30%
- 设计实现前端监控系统，将线上故障发现时间缩短50%

#### 阿里巴巴（2016-2020）
- 参与淘宝首页性能优化项目，页面加载时间减少40%
- 负责商家平台核心模块开发，服务百万级商家用户

### 技术栈
- 前端框架：React, Vue, Angular
- 工程化：Webpack, Vite, Rollup
- 跨端开发：React Native, Flutter
- 性能优化：性能监控、资源加载优化、渲染性能优化
- 微前端：qiankun, micro-app`,
  attachments: [
    { id: '1', name: '个人简历.pdf', size: '2.3MB', type: 'pdf' }
  ],
  applyPosition: {
    name: '前端架构师',
    applyDate: '2024-03-15'
  },
  interviews: [
    {
      id: '1',
      type: '技术面试',
      date: '2024-03-20',
      time: '14:30-15:30',
      interviewer: '李工'
    },
    {
      id: '2',
      type: '行为面试',
      date: '2024-03-18',
      time: '10:00-11:00',
      interviewer: '王工'
    },
    {
      id: '3',
      type: '初筛面试',
      date: '2024-03-15',
      time: '15:00-16:00',
      interviewer: '张工'
    }
  ],
  aiAssessment: {
    matchScore: 85,
    skills: [
      { name: '技术能力', score: 90, comment: '技术栈全面，架构经验丰富' },
      { name: '团队管理', score: 85, comment: '具有团队管理经验，注重效率提升' },
      { name: '问题解决', score: 88, comment: '善于解决复杂技术问题' },
      { name: '沟通能力', score: 82, comment: '表达清晰，逻辑性强' }
    ],
    strengths: [
      '丰富的大型项目架构经验',
      '优秀的性能优化能力',
      '团队管理和技术决策能力强'
    ],
    focusPoints: [
      '深入了解微前端架构设计经验',
      '考察跨团队协作能力',
      '了解技术团队管理方法论'
    ]
  }
};

type CandidateStatus = 'pending' | 'approved' | 'rejected';
type AnalysisStatus = 'empty' | 'generating' | 'complete';

export default function CandidateProfile({ candidateId }: CandidateProfileProps) {
  const [candidate] = useState(MOCK_CANDIDATE);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [content, setContent] = useState(candidate.resumeContent);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [showInterviewDetail, setShowInterviewDetail] = useState(false);
  const [showPositionDetail, setShowPositionDetail] = useState(false);
  const [selectedInterviewId, setSelectedInterviewId] = useState<string | null>(null);
  const [isInterviewsExpanded, setIsInterviewsExpanded] = useState(false);
  const [isEditingFeedback, setIsEditingFeedback] = useState(false);
  const [feedback, setFeedback] = useState(FEEDBACK_TEMPLATE);
  const [isGeneratingAISuggestion, setIsGeneratingAISuggestion] = useState(false);
  const [aiSuggestion, setAISuggestion] = useState('');
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [candidateStatus, setCandidateStatus] = useState<CandidateStatus>('pending');
  const [isHoveringStatus, setIsHoveringStatus] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState<AnalysisStatus>('empty');

  const handleStatusChange = (status: CandidateStatus) => {
    setCandidateStatus(status);
  };

  const handleStatusReset = () => {
    setCandidateStatus('pending');
  };

  const handleSaveContent = () => {
    setIsEditingContent(false);
  };

  const handleGenerateAISuggestion = async () => {
    setIsGeneratingAISuggestion(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setAISuggestion(`## 面试重点关注
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
- 评估对前沿技术的理解和判断`);
    setIsGeneratingAISuggestion(false);
  };

  const startAnalysis = async () => {
    setAnalysisStatus('generating');
    await new Promise(resolve => setTimeout(resolve, 2000));
    setAnalysisStatus('complete');
  };

  const renderAIAssessment = () => {
    if (analysisStatus === 'empty') {
      return (
        <div className="flex flex-col items-center justify-center h-[500px] text-center p-8">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            让 AI 解读候选人简历
          </h3>
          <p className="text-sm text-gray-500 mb-6 max-w-sm">
            基于简历内容，AI 将分析候选人的技能匹配度、优势和建议关注点
          </p>
          <Button onClick={startAnalysis}>
            <Sparkles className="w-4 h-4 mr-2" />
            开始解读
          </Button>
        </div>
      );
    }

    if (analysisStatus === 'generating') {
      return (
        <div className="flex flex-col items-center justify-center h-[500px]">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
          <p className="text-sm text-gray-600">正在分析候选人简历...</p>
        </div>
      );
    }

    return (
      <div className="space-y-6 p-6">
        {/* Match Score */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">岗位匹配度</h3>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">综合匹配度</span>
              <span className="text-2xl font-bold text-blue-600">{candidate.aiAssessment.matchScore}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${candidate.aiAssessment.matchScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Skills Assessment */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">技能评估</h3>
          <div className="space-y-3">
            {candidate.aiAssessment.skills.map((skill) => (
              <div key={skill.name} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{skill.name}</span>
                  <span className="text-sm font-medium text-blue-600">{skill.score}分</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                  <div 
                    className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${skill.score}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600">{skill.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">候选人优势</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <ul className="space-y-2">
              {candidate.aiAssessment.strengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-1.5 h-1.5 mt-2 mr-2 bg-blue-600 rounded-full flex-shrink-0" />
                  <span className="text-gray-700">{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Focus Points */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">建议关注点</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <ul className="space-y-2">
              {candidate.aiAssessment.focusPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-1.5 h-1.5 mt-2 mr-2 bg-blue-600 rounded-full flex-shrink-0" />
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-500 text-white">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-xl font-semibold">
                {candidate.name.slice(0, 2)}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{candidate.name}</h1>
                <div className="mt-1 text-blue-100">
                  {candidate.gender} · {candidate.age}岁 · {candidate.currentPosition} · {candidate.company}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowPrintModal(true)} className="text-white hover:bg-white/10">
              <Printer className="w-4 h-4 mr-1.5" />
              打印简历
            </Button>
          </div>

          <div className="flex items-center space-x-6 mb-4 ml-16">
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-1.5" />
              <TruncatedField text={candidate.email} type="email" />
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-1.5" />
              <TruncatedField text={candidate.phone} type="phone" />
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1.5" />
              <TruncatedField text={candidate.location} type="address" />
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1.5" />
              <TruncatedField text={candidate.education} type="text" />
            </div>
          </div>

          <div className="flex items-center justify-between ml-16">
            <div className="flex items-center">
              <span>应聘职位：</span>
              <button
                onClick={() => setShowPositionDetail(true)}
                className="text-white hover:text-blue-100"
              >
                {candidate.applyPosition.name}
              </button>
              <Calendar className="w-4 h-4 ml-2" />
              <span className="text-blue-100">{candidate.applyPosition.applyDate}</span>

              {candidateStatus === 'pending' && (
                <div className="flex items-center space-x-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-100 hover:bg-white/10"
                    onClick={() => handleStatusChange('rejected')}
                  >
                    <XCircle className="w-4 h-4 mr-1.5" />
                    不合适
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-green-100 hover:bg-white/10"
                    onClick={() => handleStatusChange('approved')}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-1.5" />
                    通过
                  </Button>
                </div>
              )}

              {candidateStatus === 'approved' && (
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "text-green-100 hover:text-red-100 hover:bg-white/10 ml-4",
                    isHoveringStatus && "!text-red-100"
                  )}
                  onMouseEnter={() => setIsHoveringStatus(true)}
                  onMouseLeave={() => setIsHoveringStatus(false)}
                  onClick={handleStatusReset}
                >
                  {isHoveringStatus ? (
                    <>
                      <Undo2 className="w-4 h-4 mr-1.5" />
                      撤销通过
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-1.5" />
                      已通过
                    </>
                  )}
                </Button>
              )}

              {candidateStatus === 'rejected' && (
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "text-red-100 hover:text-green-100 hover:bg-white/10 ml-4",
                    isHoveringStatus && "!text-green-100"
                  )}
                  onMouseEnter={() => setIsHoveringStatus(true)}
                  onMouseLeave={() => setIsHoveringStatus(false)}
                  onClick={handleStatusReset}
                >
                  {isHoveringStatus ? (
                    <>
                      <Undo2 className="w-4 h-4 mr-1.5" />
                      撤销
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 mr-1.5" />
                      已标记不合适
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          <div className="mt-4 ml-16">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-200" />
                  <h3 className="text-sm font-medium">面试记录</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowInterviewModal(true)}
                    className="text-white hover:bg-white/10"
                  >
                    安排面试
                  </Button>
                  <button
                    onClick={() => setIsInterviewsExpanded(!isInterviewsExpanded)}
                    className="p-1 hover:bg-white/10 rounded-full"
                  >
                    <ChevronDown className={cn(
                      "w-5 h-5 transition-transform",
                      isInterviewsExpanded ? "rotate-180" : ""
                    )} />
                  </button>
                </div>
              </div>

              {isInterviewsExpanded && (
                <div className="grid grid-cols-3 gap-4">
                  {candidate.interviews.map((interview) => (
                    <div
                      key={interview.id}
                      onClick={() => {
                        setSelectedInterviewId(interview.id);
                        setShowInterviewDetail(true);
                      }}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-3 cursor-pointer hover:bg-white/20"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <Calendar className="w-4 h-4 text-blue-200" />
                        <span className="text-sm font-medium">{interview.type}</span>
                      </div>
                      <div className="text-sm text-blue-100">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{interview.date} {interview.time}</span>
                        </div>
                        <div className="mt-1">面试官：{interview.interviewer}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Resume */}
        <div className="w-[60%] overflow-y-auto custom-scrollbar border-r">
          <div className="p-6 space-y-6">
            {/* Resume Attachments */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">简历附件</h3>
              </div>
              {candidate.attachments.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{file.name}</div>
                      <div className="text-xs text-gray-500">{file.size} · {file.type.toUpperCase()}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      下载
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Resume Content */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">简历详情</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditingContent(!isEditingContent)}
                >
                  <Edit2 className="w-4 h-4 mr-1.5" />
                  {isEditingContent ? '完成' : '编辑'}
                </Button>
              </div>
              {isEditingContent ? (
                <div className="space-y-4">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full h-[500px] p-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="使用 Markdown 格式编辑简历内容..."
                  />
                  <div className="flex justify-end space-x-4">
                    <Button variant="secondary" onClick={() => setIsEditingContent(false)}>
                      取消
                    </Button>
                    <Button onClick={handleSaveContent}>
                      保存
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="prose prose-sm max-w-none">
                  {content.split('\n').map((line, index) => {
                    if (line.startsWith('### ')) {
                      return <h3 key={index} className="text-lg font-semibold mt-6 mb-3">{line.slice(4)}</h3>;
                    }
                    if (line.startsWith('#### ')) {
                      return <h4 key={index} className="text-base font-medium mt-4 mb-2">{line.slice(5)}</h4>;
                    }
                    if (line.startsWith('- ')) {
                      return <li key={index} className="ml-4">{line.slice(2)}</li>;
                    }
                    return <p key={index} className="my-2">{line}</p>;
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - AI Assessment */}
        <div className="w-[40%] overflow-y-auto custom-scrollbar bg-gray-50">
          {renderAIAssessment()}
        </div>
      </div>

      {/* Modals */}
      <InterviewModal
        isOpen={showInterviewModal}
        onClose={() => setShowInterviewModal(false)}
        onSubmit={(data) => {
          console.log('Schedule interview:', data);
          setShowInterviewModal(false);
        }}
      />

      {/* Drawers */}
      <SlideDrawer
        isOpen={showInterviewDetail}
        onClose={() => setShowInterviewDetail(false)}
        width="800px"
      >
        <InterviewDetailDrawer
          interviewId={selectedInterviewId || ''}
          onClose={() => setShowInterviewDetail(false)}
        />
      </SlideDrawer>

      <SlideDrawer
        isOpen={showPositionDetail}
        onClose={() => setShowPositionDetail(false)}
        width="800px"
      >
        <PositionDetail
          positionId="1"
          onClose={() => setShowPositionDetail(false)}
        />
      </SlideDrawer>
    </div>
  );
}