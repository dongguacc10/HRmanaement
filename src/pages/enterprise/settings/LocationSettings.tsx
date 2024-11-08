import { useState } from 'react';
import { Plus, Search, MapPin, Edit2, Trash2 } from 'lucide-react';
import { Button } from '../../../components/Button';
import { LocationFormModal } from './LocationFormModal';
import { ConfirmDialog } from '../../../components/ConfirmDialog';

interface Location {
  id: string;
  name: string;
  type: '线下会议室' | '线上会议';
  capacity?: number;
  address?: string;
  status: 'available' | 'occupied' | 'maintenance';
}

const MOCK_LOCATIONS: Location[] = [
  {
    id: '1',
    name: '会议室A',
    type: '线下会议室',
    capacity: 8,
    address: '北京市海淀区科技园区1号楼3层',
    status: 'available'
  },
  {
    id: '2',
    name: '会议室B',
    type: '线下会议室',
    capacity: 6,
    address: '北京市海淀区科技园区1号楼3层',
    status: 'occupied'
  },
  {
    id: '3',
    name: '腾讯会议',
    type: '线上会议',
    status: 'available'
  }
];

export default function LocationSettings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [editLocation, setEditLocation] = useState<Location | undefined>(undefined);

  const handleFormSubmit = (data: Omit<Location, 'id' | 'status'>) => {
    // TODO: 实现添加/编辑地点逻辑
    console.log('Location data:', data);
    setShowFormModal(false);
    setEditLocation(undefined);
  };

  const handleDelete = (id: string) => {
    // TODO: 实现删除地点逻辑
    console.log('Delete location:', id);
    setShowDeleteConfirm(null);
  };

  const handleEdit = (location: Location) => {
    setEditLocation(location);
    setShowFormModal(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">面试地点管理</h2>
        <Button onClick={() => setShowFormModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          添加地点
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="搜索面试地点..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Location List */}
      <div className="space-y-4">
        {MOCK_LOCATIONS.map((location) => (
          <div
            key={location.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
          >
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">{location.name}</div>
                <div className="text-sm text-gray-500">
                  {location.type}
                  {location.capacity && ` · ${location.capacity}人`}
                </div>
                {location.address && (
                  <div className="text-sm text-gray-500 mt-1">
                    {location.address}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                location.status === 'available'
                  ? 'bg-green-100 text-green-700'
                  : location.status === 'occupied'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {location.status === 'available' ? '空闲' : 
                 location.status === 'occupied' ? '使用中' : '维护中'}
              </span>
              <div className="flex items-center space-x-2">
                <button 
                  className="p-1 hover:bg-gray-200 rounded-full"
                  onClick={() => handleEdit(location)}
                >
                  <Edit2 className="w-4 h-4 text-gray-500" />
                </button>
                <button 
                  className="p-1 hover:bg-gray-200 rounded-full"
                  onClick={() => setShowDeleteConfirm(location.id)}
                >
                  <Trash2 className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Location Form Modal */}
      <LocationFormModal
        isOpen={showFormModal}
        onClose={() => {
          setShowFormModal(false);
          setEditLocation(undefined);
        }}
        onSubmit={handleFormSubmit}
        editData={editLocation}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(null)}
        onConfirm={() => handleDelete(showDeleteConfirm!)}
        title="确认删除地点"
        message="删除后该地点将无法继续使用，是否确认删除？"
        confirmText="确认删除"
        cancelText="取消"
      />
    </div>
  );
}