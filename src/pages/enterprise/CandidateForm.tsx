import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, X, Search } from 'lucide-react';
import { Button } from '../../components/Button';
import { cn } from '../../lib/utils';

interface Position {
  id: string;
  title: string;
  department: string;
  level: string;
}

// 模拟职位数据
const INITIAL_POSITIONS: Position[] = [
  { id: 'p1', title: '前端工程师', department: '技术部', level: 'P6' },
  { id: 'p2', title: '后端工程师', department: '技术部', level: 'P6' },
  { id: 'p3', title: '全栈工程师', department: '技术部', level: 'P7' },
  { id: 'p4', title: 'iOS工程师', department: '移动开发部', level: 'P6' },
  { id: 'p5', title: 'Android工程师', department: '移动开发部', level: 'P6' },
  { id: 'p6', title: '产品经理', department: '产品部', level: 'P6' },
  { id: 'p7', title: 'UI设计师', department: '设计部', level: 'P5' },
  { id: 'p8', title: '测试工程师', department: '测试部', level: 'P5' },
  { id: 'p9', title: '前端架构师', department: '技术部', level: 'P8' },
  { id: 'p10', title: '技术专家', department: '技术部', level: 'P8' },
  { id: 'p11', title: '算法工程师', department: '算法部', level: 'P7' },
  { id: 'p12', title: 'DevOps工程师', department: '运维部', level: 'P6' },
];

type ResumeStatus = 'idle' | 'uploading' | 'parsing';

export default function CandidateForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [positionSearch, setPositionSearch] = useState('');
  const [showPositionDropdown, setShowPositionDropdown] = useState(false);
  const [hoveredPosition, setHoveredPosition] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    contact?: string;
    position?: string;
  }>({});

  // 新增状态
  const [resumeStatus, setResumeStatus] = useState<ResumeStatus>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);

  const positionSearchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (positionSearchRef.current && !positionSearchRef.current.contains(event.target as Node)) {
        setShowPositionDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredPositions = INITIAL_POSITIONS.filter(position => {
    const searchTerm = positionSearch.toLowerCase();
    const matchesSearch = 
      position.title.toLowerCase().includes(searchTerm) ||
      position.department.toLowerCase().includes(searchTerm) ||
      position.level.toLowerCase().includes(searchTerm);
    const notSelected = !selectedPosition || position.id !== selectedPosition.id;
    return matchesSearch && notSelected;
  });

  const handlePositionSelect = (position: Position) => {
    setSelectedPosition(position);
    setPositionSearch('');
    setShowPositionDropdown(false);
    setFormErrors(prev => ({ ...prev, position: undefined }));
  };

  const handlePositionRemove = () => {
    setSelectedPosition(null);
    setFormErrors(prev => ({ ...prev, position: '请选择应聘职位' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: typeof formErrors = {};

    if (!name.trim()) {
      errors.name = '请输入姓名';
    }

    if (!email && !phone) {
      errors.contact = '邮箱和手机号至少填写一个';
    }

    if (!selectedPosition) {
      errors.position = '请选择应聘职位';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    navigate('/enterprise/candidates');
  };

  const handleResumeUpload = async (file: File) => {
    setResumeFile(file);
    setResumeStatus('uploading');
    
    // 模拟上传进度
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setUploadProgress(i);
    }

    // 模拟解析过程
    setResumeStatus('parsing');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 模拟解析完成后填充表单
    setName('张三');
    setEmail('zhangsan@example.com');
    setPhone('13800138000');
    setSelectedPosition(INITIAL_POSITIONS[0]);
    setResumeStatus('idle');
  };

  const isFormDisabled = resumeStatus === 'uploading' || resumeStatus === 'parsing';

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900"
          disabled={isFormDisabled}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {id ? '编辑候选人' : '添加候选人'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 简历上传 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              简历上传
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                {resumeStatus === 'idle' && !resumeFile && (
                  <>
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="resume-upload"
                        className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500"
                      >
                        <span>点击上传</span>
                        <input
                          id="resume-upload"
                          type="file"
                          className="sr-only"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleResumeUpload(file);
                          }}
                        />
                      </label>
                      <p className="pl-1">或拖拽文件到此处</p>
                    </div>
                    <p className="text-xs text-gray-500">支持 PDF、DOC 格式，最大 10MB</p>
                  </>
                )}

                {resumeStatus === 'uploading' && (
                  <div className="space-y-4">
                    <div className="text-sm font-medium text-gray-900">正在上传简历...</div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <div className="text-sm text-gray-500">{uploadProgress}%</div>
                  </div>
                )}

                {resumeStatus === 'parsing' && (
                  <div className="space-y-4">
                    <div className="text-sm font-medium text-gray-900">正在解析简历...</div>
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                    </div>
                    <div className="text-sm text-gray-500">请稍候</div>
                  </div>
                )}

                {resumeStatus === 'idle' && resumeFile && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-sm text-green-600">{resumeFile.name}</span>
                      <button
                        type="button"
                        onClick={() => setResumeFile(null)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">简历解析完成</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 姓名 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              姓名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setFormErrors(prev => ({ ...prev, name: undefined }));
              }}
              className={cn(
                "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                formErrors.name ? 'border-red-500' : 'border-gray-300',
                isFormDisabled ? 'bg-gray-100 cursor-not-allowed' : ''
              )}
              placeholder="请输入候选人姓名"
              disabled={isFormDisabled}
            />
            {formErrors.name && (
              <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
            )}
          </div>

          {/* 应聘职位 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              应聘职位 <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              {/* Selected Position */}
              {selectedPosition && (
                <div className="flex flex-wrap gap-2 mb-3">
                  <div
                    className="relative group"
                    onMouseEnter={() => setHoveredPosition(selectedPosition.id)}
                    onMouseLeave={() => setHoveredPosition(null)}
                  >
                    <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                      <span>{selectedPosition.title}</span>
                      <span className="ml-1 text-blue-500">
                        · {selectedPosition.department} · {selectedPosition.level}
                      </span>
                    </div>
                    {!isFormDisabled && hoveredPosition === selectedPosition.id && (
                      <button
                        type="button"
                        onClick={handlePositionRemove}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-gray-500 text-white rounded-full flex items-center justify-center hover:bg-gray-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Position Search */}
              <div className="relative" ref={positionSearchRef}>
                <input
                  type="text"
                  value={positionSearch}
                  onChange={(e) => {
                    setPositionSearch(e.target.value);
                    setShowPositionDropdown(true);
                  }}
                  onFocus={() => setShowPositionDropdown(true)}
                  placeholder="搜索职位..."
                  className={cn(
                    "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                    formErrors.position ? 'border-red-500' : 'border-gray-300',
                    isFormDisabled ? 'bg-gray-100 cursor-not-allowed' : ''
                  )}
                  disabled={isFormDisabled}
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

                {showPositionDropdown && !isFormDisabled && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto custom-scrollbar">
                    {filteredPositions.length > 0 ? (
                      filteredPositions.map((position) => (
                        <div
                          key={position.id}
                          className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                          onClick={() => handlePositionSelect(position)}
                        >
                          <div className="font-medium">{position.title}</div>
                          <div className="text-sm text-gray-500">
                            <span>{position.department}</span>
                            <span className="mx-2">·</span>
                            <span>{position.level}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500">未找到匹配的职位</div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {formErrors.position && (
              <p className="mt-1 text-sm text-red-500">{formErrors.position}</p>
            )}
          </div>

          {/* 联系方式 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                邮箱
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (e.target.value || phone) {
                    setFormErrors(prev => ({ ...prev, contact: undefined }));
                  }
                }}
                className={cn(
                  "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                  formErrors.contact ? 'border-red-500' : 'border-gray-300',
                  isFormDisabled ? 'bg-gray-100 cursor-not-allowed' : ''
                )}
                placeholder="请输入邮箱地址"
                disabled={isFormDisabled}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                手机号码
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (e.target.value || email) {
                    setFormErrors(prev => ({ ...prev, contact: undefined }));
                  }
                }}
                className={cn(
                  "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                  formErrors.contact ? 'border-red-500' : 'border-gray-300',
                  isFormDisabled ? 'bg-gray-100 cursor-not-allowed' : ''
                )}
                placeholder="请输入手机号码"
                disabled={isFormDisabled}
              />
            </div>
            {formErrors.contact && (
              <p className="text-sm text-red-500">{formErrors.contact}</p>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate(-1)}
              disabled={isFormDisabled}
            >
              取消
            </Button>
            <Button type="submit" disabled={isFormDisabled}>
              {id ? '更新候选人' : '添加候选人'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}