import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Building2, Users, Calendar } from 'lucide-react';
import { Button } from '../../../components/Button';
import { Pagination } from '../../../components/Pagination';
import SlideDrawer from '../../../components/SlideDrawer';
import EnterpriseDetail from './EnterpriseDetail';
import { MOCK_ENTERPRISES } from './types';
import { TruncatedField } from '../../../components/TruncatedField';

const ITEMS_PER_PAGE = 15;

export default function EnterpriseList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedEnterprise, setSelectedEnterprise] = useState<number | null>(null);

  const filteredEnterprises = useMemo(() => {
    return MOCK_ENTERPRISES.filter(enterprise => {
      const matchesSearch = 
        enterprise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enterprise.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enterprise.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = selectedStatus === 'all' || enterprise.status === selectedStatus;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, selectedStatus]);

  const paginatedEnterprises = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEnterprises.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredEnterprises, currentPage]);

  const handleEnterpriseClick = (enterpriseId: number) => {
    setSelectedEnterprise(enterpriseId);
    setShowDetail(true);
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'formal':
        return 'bg-green-100 text-green-700';
      case 'trial':
        return 'bg-blue-100 text-blue-700';
      case 'expired':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'formal':
        return '正式';
      case 'trial':
        return '试用中';
      case 'expired':
        return '已到期';
      default:
        return status;
    }
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">企业管理 ({filteredEnterprises.length})</h1>
        <Button onClick={() => navigate('/admin/enterprises/new')}>
          <Plus className="w-4 h-4 mr-2" />
          添加企业
        </Button>
      </div>

      <div className="sticky top-0 z-10 bg-gray-100 pt-4 pb-4">
        <div className="bg-white shadow-md p-4 rounded-lg">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索企业..."
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
              <option value="formal">正式</option>
              <option value="trial">试用中</option>
              <option value="expired">已到期</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-white rounded-lg shadow">
        <div className="divide-y">
          {paginatedEnterprises.map((enterprise) => (
            <div
              key={enterprise.id}
              className="p-6 hover:bg-gray-50 cursor-pointer"
              onClick={() => handleEnterpriseClick(enterprise.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <img
                    src={enterprise.logo}
                    alt={enterprise.name}
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                  />
                  <div>
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-bold text-gray-900">
                        <TruncatedField text={enterprise.name} type="name" />
                      </h3>
                      <span className={`px-2 py-0.5 text-sm rounded-full ${getStatusBadgeStyle(enterprise.status)}`}>
                        {getStatusText(enterprise.status)}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Building2 className="w-4 h-4 mr-1.5 flex-shrink-0" />
                        <TruncatedField text={enterprise.industry} type="name" />
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1.5 flex-shrink-0" />
                        <span>{enterprise.userCount} 名用户</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1.5 flex-shrink-0" />
                        <span>最近活跃：{enterprise.lastActive}</span>
                      </div>
                      <div className="flex items-center">
                        <TruncatedField text={enterprise.location} type="address" />
                        <span className="mx-2">·</span>
                        <span>{enterprise.size}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalItems={filteredEnterprises.length}
          pageSize={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
          className="border-t"
        />
      </div>

      <SlideDrawer 
        isOpen={showDetail} 
        onClose={() => setShowDetail(false)}
        width="1000px"
      >
        <EnterpriseDetail 
          enterpriseId={selectedEnterprise} 
          onClose={() => setShowDetail(false)} 
        />
      </SlideDrawer>
    </div>
  );
}