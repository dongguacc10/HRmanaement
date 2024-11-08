import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { Button } from '../../../components/Button';
import { MOCK_RECENT_POSITIONS } from './types';
import SlideDrawer from '../../../components/SlideDrawer';
import PositionDetail from './PositionDetail';

export default function CreatePositionPaste() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [showDetail, setShowDetail] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 处理提交逻辑
    console.log('Submitted content:', content);
  };

  const handleBack = () => {
    navigate('/enterprise/positions/create', { replace: true });
  };

  const handleRecentPositionClick = (position: typeof MOCK_RECENT_POSITIONS[0]) => {
    setSelectedPosition(position.id);
    setShowDetail(true);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <button
        onClick={handleBack}
        className="mb-4 flex items-center text-gray-600 hover:text-gray-900 group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
        返回选择创建方式
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="flex items-center justify-center">
            <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
          </div>
          <h1 className="mt-2 text-center text-xl font-bold text-white">粘贴文本创建职位</h1>
          <p className="mt-1 text-center text-sm text-blue-100">
            将已有的职位描述粘贴到下方，系统会自动解析并创建职位
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="在此处粘贴职位描述..."
                className="w-full h-[300px] p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                autoFocus
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={!content.trim()}>
                开始创建
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* Recent Positions */}
      {MOCK_RECENT_POSITIONS.length > 0 && (
        <div className="max-w-2xl mx-auto mt-16">
          <h3 className="text-sm font-medium text-gray-700 mb-4">最近创建的职位</h3>
          <div className="space-y-2">
            {MOCK_RECENT_POSITIONS.map((position) => (
              <div
                key={position.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow transition-shadow cursor-pointer"
                onClick={() => handleRecentPositionClick(position)}
              >
                <div>
                  <h4 className="font-medium text-gray-900">{position.title}</h4>
                  <p className="text-sm text-gray-500">{position.department}</p>
                </div>
                <span className="text-sm text-gray-400">{position.createdAt}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Position Detail Drawer */}
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