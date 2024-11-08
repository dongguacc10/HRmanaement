import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, FileText, Loader2 } from 'lucide-react';
import { Button } from '../../../components/Button';
import { cn } from '../../../lib/utils';
import { MOCK_RECENT_POSITIONS } from './types';
import SlideDrawer from '../../../components/SlideDrawer';
import PositionDetail from './PositionDetail';

type ImportStatus = 'idle' | 'uploading' | 'parsing';

interface ImportState {
  file: File | null;
  status: ImportStatus;
  progress: number;
}

export default function CreatePositionImport() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileImport, setFileImport] = useState<ImportState>({
    file: null,
    status: 'idle',
    progress: 0
  });
  const [showDetail, setShowDetail] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

  const isProcessing = fileImport.status !== 'idle';

  const handleBack = () => {
    navigate('/enterprise/positions/create', { replace: true });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileImport(prev => ({ ...prev, file, status: 'uploading', progress: 0 }));
      
      // 模拟上传进度
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setFileImport(prev => ({ ...prev, progress: i }));
      }

      // 模拟解析过程
      setFileImport(prev => ({ ...prev, status: 'parsing' }));
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 完成
      setFileImport(prev => ({ ...prev, status: 'idle' }));
    }
  };

  const handleSubmit = () => {
    if (fileImport.file) {
      console.log('Processing file:', fileImport.file);
    }
  };

  const handleRecentPositionClick = (position: typeof MOCK_RECENT_POSITIONS[0]) => {
    setSelectedPosition(position.id);
    setShowDetail(true);
  };

  const canSubmit = fileImport.file && !isProcessing;

  return (
    <div className="max-w-3xl mx-auto">
      <button
        onClick={handleBack}
        className="mb-6 flex items-center text-gray-600 hover:text-gray-900 group"
        disabled={isProcessing}
      >
        <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
        返回选择创建方式
      </button>

      <div className="text-center mb-12">
        <h1 className="text-2xl font-bold text-gray-900">使用 AI 导入</h1>
        <p className="mt-2 text-gray-600">选择要转换的文件</p>
      </div>

      {/* 上传文件卡片 */}
      <div className="max-w-md mx-auto">
        <div
          className={cn(
            "cursor-pointer transform transition-all duration-300",
            "hover:scale-105",
            isProcessing && "opacity-50 cursor-not-allowed"
          )}
          onClick={() => !isProcessing && fileInputRef.current?.click()}
        >
          <div className={cn(
            "bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 shadow-lg h-[320px]",
            "transition-all duration-300 flex flex-col",
            fileImport.file ? 'ring-2 ring-blue-500' : ''
          )}>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,.ppt,.pptx"
              onChange={handleFileChange}
              disabled={isProcessing}
            />
            
            <div className="flex-shrink-0 flex items-center justify-center mb-6">
              <div className={cn(
                "w-14 h-14 rounded-xl flex items-center justify-center",
                "bg-gradient-to-br from-blue-500 to-blue-600",
                "transform transition-transform duration-300 hover:scale-110"
              )}>
                {fileImport.status === 'parsing' ? (
                  <Loader2 className="w-7 h-7 text-white animate-spin" />
                ) : (
                  <Upload className="w-7 h-7 text-white" />
                )}
              </div>
            </div>

            <div className="flex-1">
              {fileImport.file ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate px-4" title={fileImport.file.name}>
                      {fileImport.file.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {fileImport.status === 'uploading' && `上传中 ${fileImport.progress}%`}
                      {fileImport.status === 'parsing' && '正在解析文件...'}
                      {fileImport.status === 'idle' && '解析完成'}
                    </p>
                  </div>
                  {fileImport.status === 'uploading' && (
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${fileImport.progress}%` }}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">上传文件</h3>
                  <p className="text-sm text-gray-600 mb-4 text-center">支持上传 PDF、Word、PPT 等格式文件</p>
                  <div className="space-y-2 max-w-[200px] mx-auto">
                    <div className="flex items-center text-xs text-gray-500">
                      <FileText className="w-3 h-3 mr-2 flex-shrink-0" />
                      <span>Word 文档</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <FileText className="w-3 h-3 mr-2 flex-shrink-0" />
                      <span>PDF 文件</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <FileText className="w-3 h-3 mr-2 flex-shrink-0" />
                      <span>PPT 演示文稿</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Button 
          onClick={handleSubmit}
          disabled={!canSubmit}
          size="lg"
        >
          开始创建
        </Button>
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