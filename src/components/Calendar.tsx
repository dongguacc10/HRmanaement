import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

interface CalendarEvent {
  id: string;
  date: string;
  time: string;
  title: string;
  type: string;
}

interface CalendarProps {
  events: CalendarEvent[];
  selectedDate?: Date;
  onDateSelect: (date: Date) => void;
}

export function Calendar({ events, selectedDate, onDateSelect }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get the first day of the month
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const startingDayOfWeek = firstDayOfMonth.getDay();

  // Get the last day of the month
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const totalDays = lastDayOfMonth.getDate();

  // Generate calendar days array
  const days = Array.from({ length: 42 }, (_, i) => {
    const dayNumber = i - startingDayOfWeek + 1;
    if (dayNumber < 1 || dayNumber > totalDays) return null;
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber);
  });

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Format month and year
  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' });
  };

  // Navigate to previous/next month
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  // Check if a date is selected
  const isDateSelected = (date: Date) => {
    return selectedDate?.toDateString() === date.toDateString();
  };

  // Check if a date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="select-none">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {formatMonthYear(currentDate)}
        </h2>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth('prev')}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth('next')}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
        {/* Weekday Headers */}
        {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
          <div
            key={day}
            className="bg-gray-50 py-2 text-center text-sm font-medium text-gray-500"
          >
            {day}
          </div>
        ))}

        {/* Calendar Days */}
        {days.map((date, index) => {
          if (!date) {
            return (
              <div
                key={`empty-${index}`}
                className="bg-white h-24 p-1"
              />
            );
          }

          const dateEvents = getEventsForDate(date);
          const hasEvents = dateEvents.length > 0;

          return (
            <div
              key={date.toISOString()}
              onClick={() => onDateSelect(date)}
              className={`
                bg-white h-24 p-1 cursor-pointer transition-colors
                hover:bg-gray-50 relative
                ${isDateSelected(date) ? 'ring-2 ring-blue-500 ring-inset' : ''}
              `}
            >
              <div className="flex justify-between items-start">
                <span
                  className={`
                    inline-flex items-center justify-center w-6 h-6 text-sm
                    ${isToday(date) ? 'bg-blue-500 text-white rounded-full' : 
                      isDateSelected(date) ? 'text-blue-600 font-semibold' : 
                      'text-gray-700'}
                  `}
                >
                  {date.getDate()}
                </span>
                {hasEvents && (
                  <span className="px-1.5 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">
                    {dateEvents.length}
                  </span>
                )}
              </div>
              
              {/* Event Indicators */}
              <div className="mt-1 space-y-1 overflow-hidden max-h-[calc(100%-2rem)]">
                {dateEvents.slice(0, 2).map((event, i) => (
                  <div
                    key={event.id}
                    className="px-1 py-0.5 text-xs rounded bg-blue-50 text-blue-700 truncate"
                  >
                    {event.time.split('-')[0]} {event.title}
                  </div>
                ))}
                {dateEvents.length > 2 && (
                  <div className="px-1 py-0.5 text-xs text-gray-500">
                    +{dateEvents.length - 2} 更多
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}