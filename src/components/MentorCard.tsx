export default function MentorCard() {
  return (
    <div className="bg-surface-container-lowest p-8 rounded-2xl ambient-glow transition-all hover:scale-[1.01]">
      <div className="flex items-center gap-6 mb-8">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop"
            alt="Elena Rodriguez"
            className="w-20 h-20 rounded-full object-cover ring-4 ring-surface-container-low"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
             <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
        <div>
          <h2 className="font-headline text-2xl font-bold text-on-surface">Elena Rodriguez</h2>
          <p className="text-on-surface-variant font-medium">Senior Editorial Mentor</p>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Available Today</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-6 border-t border-outline-variant/15">
        <div className="flex justify-between items-center">
          <span className="text-on-surface-variant text-sm">Session Type</span>
          <span className="font-semibold text-on-surface">1:1 Strategic Review</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-on-surface-variant text-sm">Base Rate</span>
          <span className="font-bold text-on-surface text-lg">$120.00 / hr</span>
        </div>
      </div>
    </div>
  );
}
