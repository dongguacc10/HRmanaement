import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CalendarProps {
  events: Array<{
    id: string;
    date: string;
    time: string;
    title: string;
    type: string;
  }>;
  onDateSelect?: (date: Date) => void;
  selectedDate?: Date;
}

export function Calendar({ events, onDateSelect, selectedDate: propSelectedDate }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(propSelectedDate || new Date());
  const [selectedDate, setSelectedDate] = useState(propSelectedDate);

  // 获取当月的天数
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // 获取当月第一天是星期几
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // 获取上个月的最后几天
  const getPreviousMonthDays = (date: Date) => {
    const firstDay = getFirstDayOfMonth(date);
    const previousMonth = new Date(date.getFullYear(), date.getMonth() - 1);
    const daysInPreviousMonth = getDaysInMonth(previousMonth);
    const days = [];
    
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(previousMonth.getFullYear(), previousMonth.getMonth(), daysInPreviousMonth - i),
        isCurrentMonth: false
      });
    }
    
    return days;
  };

  // 获取当月的所有天数
  const getCurrentMonthDays = (date: Date) => {
    const daysInMonth = getDaysInMonth(date);
    const days = [];
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(date.getFullYear(), date.getMonth(), i),
        isCurrentMonth: true
      });
    }
    
    return days;
  };

  // 获取下个月的前几天
  const getNextMonthDays = (date: Date) => {
    const daysInMonth = getDaysInMonth(date);
    const lastDay = new Date(date.getFullYear(), date.getMonth(), daysInMonth).getDay();
    const days = [];
    
    for (let i = 1; i < 7 - lastDay; i++) {
      days.push({
        date: new Date(date.getFullYear(), date.getMonth() + 1, i),
        isCurrentMonth: false
      });
    }
    
    return days;
  };

  // 获取所有要显示的日期
  const getAllDays = () => {
    return [
      ...getPreviousMonthDays(currentDate),
      ...getCurrentMonthDays(currentDate),
      ...getNextMonthDays(currentDate)
    ];
  };

  // 获取某一天的面试事件
  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === date.getDate() &&
             eventDate.getMonth() === date.getMonth() &&
             eventDate.getFullYear() === date.getFullYear();
    });
  };

  // 处理日期选择
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    onDateSelect?.(date);
  };

  // 处理月份切换
  const handleMonthChange = (increment: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1));
  };

  // 格式化日期显示
  const formatMonth = (date: Date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  const days = getAllDays();
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  return (
    <div className="select-none">
      {/* 日历头部 */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => handleMonthChange(-1)}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900">
          {formatMonth(currentDate)}
        </h2>
        <button
          onClick={() => handleMonthChange(1)}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* 星期标题 */}
      <div className="grid grid-cols-7 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* 日历格子 */}
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {days.map(({ date, isCurrentMonth }, index) => {
          const dayEvents = getEventsForDate(date);
          const isToday = new Date().toDateString() === date.toDateString();
          const isSelected = selectedDate?.toDateString() === date.toDateString();

          return (
            <div
              key={index}
              className={cn(
                "bg-white min-h-[100px] p-1 cursor-pointer",
                !isCurrentMonth && "opacity-50"
              )}
              onClick={() => handleDateSelect(date)}
            >
              <div className="flex justify-between items-start">
                <span
                  className={cn(
                    "inline-flex items-center justify-center w-6 h-6 text-sm rounded-full",
                    isToday && !isSelected && "bg-blue-100 text-blue-600",
                    isSelected && "bg-blue-600 text-white",
                    !isToday && !isSelected && "hover:bg-gray-100"
                  )}
                >
                  {date.getDate()}
                </span>
                {dayEvents.length > 0 && (
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                    {dayEvents.length}
                  </span>
                )}
              </div>
              <div className="mt-1 space-y-1">
                {dayEvents.map((event, eventIndex) => (
                  <div
                    key={event.id}
                    className={cn(
                      "px-1.5 py-0.5 rounded text-xs font-medium truncate",
                      event.type === '技术面试' && "bg-blue-50 text-blue-700",
                      event.type === '产品面试' && "bg-green-50 text-green-700",
                      event.type === '初筛面试' && "bg-purple-50 text-purple-700",
                      event.type === '设计面试' && "bg-orange-50 text-orange-700"
                    )}
                    title={`${event.time} - ${event.title}`}
                  >
                    {event.time.split('-')[0]} {event.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}