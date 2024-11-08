import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '../Button';
import { cn } from '../../lib/utils';

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ className, children, loading, disabled, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(className, "relative")}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <Loader2 className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 animate-spin" />
        )}
        <span className={cn(loading && "invisible")}>{children}</span>
      </Button>
    );
  }
);

LoadingButton.displayName = 'LoadingButton';