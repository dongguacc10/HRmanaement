import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Sparkles, Upload, ArrowLeft } from 'lucide-react';
import { MOCK_RECENT_POSITIONS } from './types';
import SlideDrawer from '../../../components/SlideDrawer';
import PositionDetail from './PositionDetail';

export default function CreatePosition() {
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

  const handleMethodClick = (method: 'paste' | 'generate' | 'import') => {
    if (method === 'generate') {
      setShowChat(true);
    } else {
      navigate(`/enterprise/positions/create/${method}`, { replace: true });
    }
  };

  const handleRecentPositionClick = (position: typeof MOCK_RECENT_POSITIONS[0]) => {
    setSelectedPosition(position.id);
    setShowDetail(true);
  };

  const handleCloseChat = () => {
    setShowChat(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {!showChat ? (
        <>
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-4">使用 AI 创建</h1>
          <p className="text-gray-600 text-center mb-16">您希望如何开始？</p>

          <div className="grid grid-cols-3 gap-12 px-8">
            {/* 粘贴文本 */}
            <div 
              className="group cursor-pointer transform transition-all duration-500 origin-top-right -rotate-6 translate-y-8 hover:rotate-0 hover:translate-y-0"
              onClick={() => handleMethodClick('paste')}
            >
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-8 shadow-lg group-hover:shadow-xl transition-all duration-500 border border-slate-200">
                <div className="aspect-video flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-xl bg-slate-200/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <FileText className="w-8 h-8 text-slate-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">粘贴文本</h3>
                <p className="text-sm text-slate-600">根据笔记、大纲或现有内容创建</p>
              </div>
            </div>

            {/* AI 生成 */}
            <div 
              className="transform transition-all duration-500 scale-110 hover:scale-115 cursor-pointer"
              onClick={() => handleMethodClick('generate')}
            >
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500">
                <div className="aspect-video flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform duration-500">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">生成</h3>
                <p className="text-sm text-blue-100">在几秒钟内根据一行提示创建</p>
                <div className="mt-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/30 text-white">
                  热门
                </div>
              </div>
            </div>

            {/* 导入文件 */}
            <div 
              className="group cursor-pointer transform transition-all duration-500 origin-top-left rotate-6 translate-y-8 hover:rotate-0 hover:translate-y-0"
              onClick={() => handleMethodClick('import')}
            >
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-8 shadow-lg group-hover:shadow-xl transition-all duration-500 border border-slate-200">
                <div className="aspect-video flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-xl bg-slate-200/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <Upload className="w-8 h-8 text-slate-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">导入文件或 URL</h3>
                <p className="text-sm text-slate-600">增强现有文档、演示文稿或网页的功能</p>
              </div>
            </div>
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
        </>
      ) : (
        <div className="max-w-3xl mx-auto">
          <button
            onClick={handleCloseChat}
            className="mb-6 flex items-center text-gray-600 hover:text-gray-900 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            返回选择创建方式
          </button>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600">
              <div className="flex items-center justify-center">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>
              <h1 className="mt-2 text-center text-xl font-bold text-white">AI 对话创建职位</h1>
              <p className="mt-1 text-center text-sm text-blue-100">
                告诉我您想要创建的职位，我会帮您生成完整的职位描述
              </p>
            </div>

            <div className="h-[700px]">
              <iframe
                src="https://udify.app/chatbot//gim2WCQq7MEsPalT"
                style={{ width: '100%', height: '100%' }}
                frameBorder="0"
                allow="microphone"
              />
            </div>
          </div>

          {/* Recent Positions */}
          {MOCK_RECENT_POSITIONS.length > 0 && (
            <div className="mt-16">
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