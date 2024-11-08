import { X } from 'lucide-react';
import { Button } from './Button';

interface PrintResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPrint: (options: {
    resume: boolean;
    aiSuggestion: boolean;
    feedback: boolean;
  }) => void;
}

export function PrintResumeModal({ isOpen, onClose, onPrint }: PrintResumeModalProps) {
  if (!isOpen) return null;

  const printOptions = [
    {
      label: '仅打印简历',
      onClick: () => onPrint({ resume: true, aiSuggestion: false, feedback: false })
    },
    {
      label: '打印简历和AI面试建议',
      onClick: () => onPrint({ resume: true, aiSuggestion: true, feedback: false })
    },
    {
      label: '打印全部内容',
      description: '包含简历、AI面试建议和面试反馈',
      onClick: () => onPrint({ resume: true, aiSuggestion: true, feedback: true })
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">打印简历</h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            {printOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  option.onClick();
                  onClose();
                }}
                className="w-full p-4 text-left bg-white hover:bg-gray-50 rounded-lg border transition-colors"
              >
                <div className="font-medium text-gray-900">{option.label}</div>
                {option.description && (
                  <div className="mt-1 text-sm text-gray-500">{option.description}</div>
                )}
              </button>
            ))}
          </div>

          <div className="border-t px-6 py-4 bg-gray-50 rounded-b-xl">
            <div className="flex justify-end">
              <Button variant="secondary" onClick={onClose}>
                取消
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}