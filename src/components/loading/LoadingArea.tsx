import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface LoadingAreaProps {
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function LoadingArea({ loading, children, className }: LoadingAreaProps) {
  return (
    <div className={cn("relative", className)}>
      {children}
      {loading && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      )}
    </div>
  );
}