import { useState, useRef, useEffect } from 'react';
import { Edit2, ChevronDown, Users, Calendar, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '../../../components/Button';
import CompetencyRadar from '../../../components/CompetencyRadar';
import { CompetencyEditModal } from '../../../components/CompetencyEditModal';
import { cn } from '../../../lib/utils';

interface PositionDetailProps {
  positionId: string;
  onClose: () => void;
}

const MOCK_POSITION = {
  id: '1',
  title: '前端架构师',
  department: '技术部',
  type: '全职',
  location: '北京',
  salary: '40-60K·15薪',
  status: 'active' as const,
  content: `### 职位描述
负责公司前端架构设计和技术选型，带领团队进行技术创新...

### 工作职责
- 负责前端架构设计和技术选型
- 制定前端开发规范和最佳实践
- 带领团队进行技术创新
- 解决疑难技术问题

### 任职要求
- 8年以上前端开发经验
- 精通 React、Vue 等主流框架
- 具有大型项目架构经验
- 良好的团队协作能力`,
  applicantsCount: 25,
  interviewingCount: 5,
  createdAt: '2024-03-01',
  updatedAt: '2024-03-15',
  publishedAt: '2024-03-01',
  recruitmentCycle: '30天',
  competencyModel: [
    { key: 'technical', label: '专业技能', weight: 30, description: '前端技术栈深度和广度，架构设计能力', color: '#3B82F6' },
    { key: 'leadership', label: '领导力', weight: 25, description: '团队管理和技术决策能力', color: '#10B981' },
    { key: 'communication', label: '沟通能力', weight: 15, description: '跨团队协作和需求理解能力', color: '#F59E0B' },
    { key: 'innovation', label: '创新能力', weight: 15, description: '技术创新和问题解决能力', color: '#8B5CF6' },
    { key: 'execution', label: '执行力', weight: 15, description: '项目推进和目标达成能力', color: '#EC4899' }
  ]
};

type AnalysisStatus = 'empty' | 'generating' | 'complete';
type AnimationPhase = 'frame' | 'chart' | 'details' | 'complete';

export default function PositionDetail({ positionId, onClose }: PositionDetailProps) {
  const [position] = useState(MOCK_POSITION);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [content, setContent] = useState(position.content);
  const [hoveredDimension, setHoveredDimension] = useState<string | null>(null);
  const [showCompetencyEditModal, setShowCompetencyEditModal] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState<AnalysisStatus>('empty');
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>('frame');
  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const statusButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        statusDropdownRef.current &&
        statusButtonRef.current &&
        !statusDropdownRef.current.contains(event.target as Node) &&
        !statusButtonRef.current.contains(event.target as Node)
      ) {
        setShowStatusDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleStatusChange = (newStatus: string) => {
    // TODO: 更新职位状态
    setShowStatusDropdown(false);
  };

  const handleSaveContent = () => {
    // TODO: 保存职位内容
    setIsEditingContent(false);
  };

  const handleCompetencyUpdate = (updatedDimensions: any[]) => {
    // TODO: 更新胜任力模型
    console.log('Updated dimensions:', updatedDimensions);
    setShowCompetencyEditModal(false);
  };

  const startAnalysis = async () => {
    setAnalysisStatus('generating');
    setAnimationPhase('frame');

    // 模拟生成过程
    await new Promise(resolve => setTimeout(resolve, 500));
    setAnimationPhase('chart');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    setAnimationPhase('details');
    
    await new Promise(resolve => setTimeout(resolve, 800));
    setAnimationPhase('complete');
    setAnalysisStatus('complete');
  };

  const renderAnalysisContent = () => {
    if (analysisStatus === 'empty') {
      return (
        <div className="flex flex-col items-center justify-center h-[500px] text-center p-8">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            让 AI 解读职位胜任力模型
          </h3>
          <p className="text-sm text-gray-500 mb-6 max-w-sm">
            基于职位描述，AI 将分析并生成详细的胜任力模型解读，帮助您更好地评估候选人
          </p>
          <Button onClick={startAnalysis}>
            <Sparkles className="w-4 h-4 mr-2" />
            开始解读
          </Button>
        </div>
      );
    }

    const showFrame = animationPhase !== 'frame';
    const showChart = ['chart', 'details', 'complete'].includes(animationPhase);
    const showDetails = ['details', 'complete'].includes(animationPhase);

    return (
      <div className={cn(
        "transition-opacity duration-500",
        showFrame ? "opacity-100" : "opacity-0"
      )}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-medium text-gray-900">胜任力模型解读</h3>
            <span className="px-1.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded">Beta</span>
          </div>
          {animationPhase === 'complete' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCompetencyEditModal(true)}
            >
              <Edit2 className="w-4 h-4 mr-1" />
              编辑
            </Button>
          )}
        </div>

        {analysisStatus === 'generating' && animationPhase !== 'complete' && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
            <div className="flex flex-col items-center">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-2" />
              <span className="text-sm text-gray-600">
                {animationPhase === 'frame' && '正在分析职位要求...'}
                {animationPhase === 'chart' && '生成胜任力维度...'}
                {animationPhase === 'details' && '完善模型解读...'}
              </span>
            </div>
          </div>
        )}

        <div className={cn(
          "transition-opacity duration-500",
          showChart ? "opacity-100" : "opacity-0"
        )}>
          <CompetencyRadar
            dimensions={position.competencyModel}
            hoveredDimension={hoveredDimension}
            onHover={setHoveredDimension}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-500 text-white">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">{position.title}</h2>
            <div className="flex items-center space-x-2">
              <div className="relative" ref={statusDropdownRef}>
                <button
                  ref={statusButtonRef}
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className="inline-flex items-center px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
                >
                  {position.status === 'active' ? '招聘中' : '已关闭'}
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                {showStatusDropdown && (
                  <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-lg py-1 z-10">
                    <button
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handleStatusChange('active')}
                    >
                      招聘中
                    </button>
                    <button
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handleStatusChange('closed')}
                    >
                      关闭
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-blue-100">
            <span>{position.department}</span>
            <span>·</span>
            <span>{position.type}</span>
            <span>·</span>
            <span>{position.location}</span>
            <span>·</span>
            <span className="text-white font-medium">{position.salary}</span>
          </div>

          <div className="mt-6 grid grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-lg px-4 py-3">
              <div className="flex items-center justify-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-200" />
                <div>
                  <div className="text-sm text-blue-200">发布时间</div>
                  <div className="mt-0.5 font-medium">{position.publishedAt}</div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 rounded-lg px-4 py-3">
              <div className="flex items-center justify-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-200" />
                <div>
                  <div className="text-sm text-blue-200">招聘周期</div>
                  <div className="mt-0.5 font-medium">{position.recruitmentCycle}</div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 rounded-lg px-4 py-3">
              <div className="flex items-center justify-center">
                <Users className="w-5 h-5 mr-2 text-blue-200" />
                <div>
                  <div className="text-sm text-blue-200">候选人</div>
                  <div className="mt-0.5 font-medium">{position.applicantsCount} 人</div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 rounded-lg px-4 py-3">
              <div className="flex items-center justify-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-200" />
                <div>
                  <div className="text-sm text-blue-200">面试中</div>
                  <div className="mt-0.5 font-medium">{position.interviewingCount} 人</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="h-full flex">
          {/* Left Content */}
          <div className="w-2/5 overflow-y-auto custom-scrollbar p-6 border-r">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">职位详情</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditingContent(!isEditingContent)}
              >
                <Edit2 className="w-4 h-4 mr-1" />
                编辑
              </Button>
            </div>
            {isEditingContent ? (
              <div className="space-y-4">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-[calc(100vh-400px)] p-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="使用 Markdown 格式编辑职位内容..."
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
                  if (line.startsWith('- ')) {
                    return <li key={index} className="ml-4">{line.slice(2)}</li>;
                  }
                  return <p key={index} className="my-2">{line}</p>;
                })}
              </div>
            )}
          </div>

          {/* Right Content */}
          <div className="w-3/5 overflow-y-auto custom-scrollbar p-6 relative">
            {renderAnalysisContent()}
          </div>
        </div>
      </div>

      <CompetencyEditModal
        isOpen={showCompetencyEditModal}
        onClose={() => setShowCompetencyEditModal(false)}
        dimensions={position.competencyModel}
        onSubmit={handleCompetencyUpdate}
      />
    </div>
  );
}