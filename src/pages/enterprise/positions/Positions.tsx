import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Sparkles } from 'lucide-react';
import { Button } from '../../../components/Button';
import { Pagination } from '../../../components/Pagination';
import SlideDrawer from '../../../components/SlideDrawer';
import PositionDetail from './PositionDetail';

interface Position {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  salary: string;
  status: 'active' | 'closed';
  requirements: string[];
  description: string;
  responsibilities: string[];
  applicantsCount: number;
  interviewingCount: number;
  createdAt: string;
  updatedAt: string;
}

const MOCK_POSITIONS: Position[] = [
  {
    id: '1',
    title: '前端架构师',
    department: '技术部',
    type: '全职',
    location: '北京',
    salary: '40-60K·15薪',
    status: 'active',
    requirements: [
      '8年以上前端开发经验',
      '精通 React、Vue 等主流框架',
      '具有大型项目架构经验',
      '良好的团队协作能力'
    ],
    description: '负责公司前端架构设计和技术选型，带领团队进行技术创新...',
    responsibilities: [
      '负责前端架构设计和技术选型',
      '制定前端开发规范和最佳实践',
      '带领团队进行技术创新',
      '解决疑难技术问题'
    ],
    applicantsCount: 25,
    interviewingCount: 5,
    createdAt: '2024-03-01',
    updatedAt: '2024-03-15'
  },
  {
    id: '2',
    title: '高级算法工程师',
    department: '算法部',
    type: '全职',
    location: '北京',
    salary: '45-70K·15薪',
    status: 'active',
    requirements: [
      '计算机相关专业硕士及以上学历',
      '5年以上算法开发经验',
      '精通机器学习和深度学习',
      '有大规模机器学习系统开发经验'
    ],
    description: '负责公司核心算法研发，解决业务中的算法问题...',
    responsibilities: [
      '设计和实现机器学习算法',
      '优化算法性能和效果',
      '参与技术方案评审',
      '指导初级工程师'
    ],
    applicantsCount: 18,
    interviewingCount: 3,
    createdAt: '2024-03-05',
    updatedAt: '2024-03-15'
  },
  {
    id: '3',
    title: '产品经理',
    department: '产品部',
    type: '全职',
    location: '北京',
    salary: '35-50K·15薪',
    status: 'active',
    requirements: [
      '5年以上产品经理经验',
      '有大型互联网产品经验',
      '优秀的沟通和协调能力',
      '有技术背景优先'
    ],
    description: '负责公司核心产品的规划和设计...',
    responsibilities: [
      '制定产品战略和规划',
      '负责产品需求分析和设计',
      '协调各部门资源',
      '跟踪产品效果和优化'
    ],
    applicantsCount: 15,
    interviewingCount: 4,
    createdAt: '2024-03-10',
    updatedAt: '2024-03-15'
  }
];

const ITEMS_PER_PAGE = 10;

export default function Positions() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showDetail, setShowDetail] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPositions = useMemo(() => {
    return MOCK_POSITIONS.filter(position => {
      const matchesSearch = 
        position.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        position.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        position.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = selectedStatus === 'all' || 
        (selectedStatus === 'active' && position.status === 'active') ||
        (selectedStatus === 'closed' && position.status === 'closed');
      
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, selectedStatus]);

  const paginatedPositions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPositions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPositions, currentPage]);

  const handlePositionClick = (positionId: string) => {
    setSelectedPosition(positionId);
    setShowDetail(true);
  };

  const handleCreatePosition = () => {
    navigate('/enterprise/positions/create');
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">职位管理</h1>
        <Button onClick={handleCreatePosition}>
          <Sparkles className="w-4 h-4 mr-2" />
          AI 发布职位
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="sticky top-0 z-10">
        <div className="bg-white shadow-md p-4">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索职位..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full sm:w-48 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">所有状态</option>
              <option value="active">招聘中</option>
              <option value="closed">已关闭</option>
            </select>
          </div>
        </div>
      </div>

      {/* Position List */}
      <div className="mt-4 bg-white rounded-lg shadow">
        <div className="divide-y">
          {paginatedPositions.map((position) => (
            <div
              key={position.id}
              className="p-6 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
              onClick={() => handlePositionClick(position.id)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold text-gray-900">{position.title}</h3>
                    <span className={`px-2 py-0.5 text-sm rounded-full ${
                      position.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {position.status === 'active' ? '招聘中' : '已关闭'}
                    </span>
                  </div>
                  
                  <div className="mt-2 flex items-center text-sm text-gray-500 space-x-4">
                    <span>{position.department}</span>
                    <span>·</span>
                    <span>{position.type}</span>
                    <span>·</span>
                    <span>{position.location}</span>
                    <span>·</span>
                    <span className="text-blue-600">{position.salary}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">
                    <span>{position.applicantsCount} 位候选人</span>
                    <span className="mx-2">·</span>
                    <span>{position.interviewingCount} 位面试中</span>
                  </div>
                  <div className="mt-1 text-xs text-gray-400">
                    更新于 {position.updatedAt}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalItems={filteredPositions.length}
          pageSize={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
          className="border-t"
        />
      </div>

      <SlideDrawer
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        width="800px"
      >
        <PositionDetail
          positionId={selectedPosition || ''}
          onClose={() => setShowDetail(false)}
        />
      </SlideDrawer>
    </div>
  );
}