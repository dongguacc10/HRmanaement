import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../lib/utils';

interface Dimension {
  key: string;
  label: string;
  weight: number;
  description?: string;
  color: string;
}

interface CompetencyEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  dimensions: Dimension[];
  onSubmit: (dimensions: Dimension[]) => void;
}

export function CompetencyEditModal({
  isOpen,
  onClose,
  dimensions: initialDimensions,
  onSubmit
}: CompetencyEditModalProps) {
  const [dimensions, setDimensions] = useState<Dimension[]>(initialDimensions);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleWeightChange = (key: string, value: string) => {
    const newWeight = parseInt(value) || 0;
    setDimensions(prev => 
      prev.map(dim => 
        dim.key === key ? { ...dim, weight: Math.min(100, Math.max(0, newWeight)) } : dim
      )
    );
    setError(null);
  };

  const handleDescriptionChange = (key: string, value: string) => {
    setDimensions(prev =>
      prev.map(dim =>
        dim.key === key ? { ...dim, description: value } : dim
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const totalWeight = dimensions.reduce((sum, dim) => sum + dim.weight, 0);
    if (totalWeight !== 100) {
      setError(`权重总和必须为100%，当前总和为${totalWeight}%`);
      return;
    }

    onSubmit(dimensions);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100]">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div className="absolute inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h2 className="text-lg font-medium text-gray-900">编辑胜任力模型</h2>
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="p-4 max-h-[calc(100vh-16rem)] overflow-y-auto">
                <div className="space-y-3">
                  {dimensions.map((dim) => (
                    <div key={dim.key} className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
                      <div 
                        className="w-1 self-stretch rounded-full"
                        style={{ backgroundColor: dim.color }}
                      />
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900">{dim.label}</h3>
                          <div className="w-24 flex items-center">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={dim.weight}
                              onChange={(e) => handleWeightChange(dim.key, e.target.value)}
                              className={cn(
                                "w-16 px-2 py-1 text-sm border rounded focus:ring-1 focus:ring-blue-500",
                                error ? "border-red-300" : "border-gray-300"
                              )}
                            />
                            <span className="ml-1 text-sm text-gray-500">%</span>
                          </div>
                        </div>
                        <textarea
                          value={dim.description || ''}
                          onChange={(e) => handleDescriptionChange(dim.key, e.target.value)}
                          rows={2}
                          placeholder="添加描述..."
                          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {error && (
                  <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
              </div>

              <div className="border-t px-4 py-3 bg-gray-50 rounded-b-xl">
                <div className="flex justify-end space-x-3">
                  <Button variant="secondary" type="button" onClick={onClose} size="sm">
                    取消
                  </Button>
                  <Button type="submit" size="sm">
                    保存
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}