import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';

interface SlideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
}

export default function SlideDrawer({ isOpen, onClose, children, width = '1000px' }: SlideDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const body = document.body;
    if (isOpen) {
      body.classList.add('drawer-open');
      body.style.overflow = 'hidden';
    } else {
      body.classList.remove('drawer-open');
      body.style.overflow = '';
    }
    return () => {
      body.classList.remove('drawer-open');
      body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-40",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        ref={drawerRef}
        className={cn(
          "fixed inset-y-0 right-0 w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{ maxWidth: width }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
}