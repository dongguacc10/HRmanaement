import { Loader2 } from 'lucide-react';

interface LoadingModalProps {
  loading?: boolean;
  children: React.ReactNode;
}

export function LoadingModal({ loading, children }: LoadingModalProps) {
  return (
    <div className="relative">
      {children}
      {loading && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center rounded-xl">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      )}
    </div>
  );
}