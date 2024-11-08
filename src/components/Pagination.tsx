import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../lib/utils';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  className?: string;
  showTotal?: boolean;
  totalLabel?: string;
}

export function Pagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  className,
  showTotal = true,
  totalLabel = '条'
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range: (number | string)[] = [];
    
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // First page
        i === totalPages || // Last page
        (i >= currentPage - delta && i <= currentPage + delta) // Pages around current
      ) {
        range.push(i);
      } else if (range[range.length - 1] !== '...') {
        range.push('...');
      }
    }
    
    return range;
  };

  return (
    <div className={cn(
      "bg-white px-4 py-3 sm:px-6",
      className
    )}>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-[1400px] mx-auto">
        {/* Total count */}
        {showTotal && (
          <div className="flex-shrink-0 text-sm text-gray-700 whitespace-nowrap">
            显示 {startItem} - {endItem} 条，
            共 {totalItems} {totalLabel}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-end gap-2 flex-1 min-w-0">
          {/* Previous page button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="hidden sm:flex"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            上一页
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="sm:hidden"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Page numbers */}
          <div className="hidden sm:flex -space-x-px">
            {getPageNumbers().map((pageNum, index) => (
              pageNum === '...' ? (
                <span
                  key={`ellipsis-${index}`}
                  className="px-3 py-2 text-sm text-gray-700 bg-white"
                >
                  ...
                </span>
              ) : (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum as number)}
                  className={cn(
                    "relative inline-flex items-center px-3 py-2 text-sm font-medium focus:outline-none transition-colors",
                    pageNum === currentPage
                      ? "z-10 bg-blue-50 text-blue-600"
                      : "text-gray-500 hover:bg-gray-50"
                  )}
                >
                  {pageNum}
                </button>
              )
            ))}
          </div>

          {/* Current page indicator for mobile */}
          <span className="text-sm text-gray-700 sm:hidden">
            {currentPage} / {totalPages}
          </span>

          {/* Next page button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="hidden sm:flex"
          >
            下一页
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="sm:hidden"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}