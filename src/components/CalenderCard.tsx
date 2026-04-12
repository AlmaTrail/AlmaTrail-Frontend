import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CalendarCard() {
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const dates = [
    { value: 28, current: false },
    { value: 29, current: false },
    { value: 30, current: false },
    { value: 1, current: true },
    { value: 2, current: true },
    { value: 3, current: true },
    { value: 4, current: true },
    { value: 5, current: true },
    { value: 6, current: true },
    { value: 7, current: true },
    { value: 8, current: true },
    { value: 9, current: true },
    { value: 10, current: true, selected: true },
    { value: 11, current: true },
    { value: 12, current: true },
    { value: 13, current: true },
    { value: 14, current: true },
    { value: 15, current: true },
    { value: 16, current: true },
  ];

  return (
    <div className="bg-surface-container-low p-8 rounded-2xl">
      <div className="flex justify-between items-center mb-8">
        <h3 className="font-headline text-xl font-bold">November 2024</h3>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-white rounded-full transition-colors text-on-surface-variant">
            <ChevronLeft size={20} />
          </button>
          <button className="p-2 hover:bg-white rounded-full transition-colors text-on-surface-variant">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-outline mb-4 tracking-widest">
        {days.map(day => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {dates.map((date, i) => (
          <button
            key={i}
            className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
              date.selected
                ? 'bg-primary text-white font-bold shadow-lg scale-110 z-10'
                : !date.current
                ? 'text-outline/40 cursor-default'
                : 'hover:bg-white text-on-surface'
            }`}
          >
            {date.value}
          </button>
        ))}
      </div>
    </div>
  );
}
