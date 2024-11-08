import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '../../components/Button';

interface InterviewFormData {
  date: string;
  time: string;
  type: string;
  location: string;
  interviewer: string;
  notes: string;
}

export default function InterviewForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [showCandidateSearch, setShowCandidateSearch] = useState(false);
  const [formData, setFormData] = useState<InterviewFormData>({
    date: '',
    time: '',
    type: '',
    location: '',
    interviewer: '',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 实际项目中这里需要处理表单提交逻辑
    console.log('Form data:', { ...formData, candidate: selectedCandidate });
    navigate('/enterprise/schedule');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {id ? '编辑面试' : '安排新面试'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              候选人
            </label>
            <div className="relative">
              <input
                type="text"
                value={selectedCandidate}
                onChange={(e) => setSelectedCandidate(e.target.value)}
                onFocus={() => setShowCandidateSearch(true)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="搜索候选人..."
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              
              {showCandidateSearch && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                  <div className="p-2">
                    {['张三', '李四', '王五'].map((name) => (
                      <div
                        key={name}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded-md"
                        onClick={() => {
                          setSelectedCandidate(name);
                          setShowCandidateSearch(false);
                        }}
                      >
                        {name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                日期
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                时间
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              面试类型
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">选择类型...</option>
              <option value="technical">技术面试</option>
              <option value="behavioral">行为面试</option>
              <option value="system-design">系统设计面试</option>
              <option value="culture-fit">文化契合度面试</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              地点/会议链接
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="会议室编号或视频会议链接"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              面试官
            </label>
            <input
              type="text"
              name="interviewer"
              value={formData.interviewer}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="输入面试官姓名"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              备注
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="面试特殊说明或注意事项"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate(-1)}
            >
              取消
            </Button>
            <Button type="submit">
              {id ? '更新面试' : '安排面试'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}