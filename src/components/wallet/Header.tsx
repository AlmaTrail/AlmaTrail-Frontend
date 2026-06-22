import React from 'react';

interface HeaderProps {
  currentView: 'desktop' | 'mobile' | 'auto';
  setCurrentView: (view: 'desktop' | 'mobile' | 'auto') => void;
  onNotificationClick: () => void;
  onSettingsClick: () => void;
}

export default function Header({
  currentView,
  setCurrentView,
  onNotificationClick,
  onSettingsClick,
}: HeaderProps) {
  return (
    <header className="fixed top-0 w-full z-40 bg-surface/80 backdrop-blur-md border-b border-outline-variant/10 shadow-sm">
      <div className="flex justify-between items-center px-4 sm:px-8 h-20 w-full max-w-[1440px] mx-auto">
        <div className="flex items-center gap-6 md:gap-8">
          <div className="flex items-center gap-2">
            <img 
              alt="Almatrail Logo" 
              className="h-8 w-8 object-contain" 
              src="https://lh3.googleusercontent.com/aida/AP1WRLv-ZykxpHHy72bzt1mly1SayNHHGDrBkFVxSn38roP9wp7wZcPgByoVynzPcpuEdT_jNDeRgYn0l3CmXREniXNVynnuYxmkASxELK-aYs0ivYpoba1o7-YU1O-r31GrXNOxiSST6aOf0GNXuR9oKva-HqXOlkfcDpo7TnumqSzXoX7Wq4d8e7g-gzeRQpezJK98GFkOVhCJCNInnIPofGxS9bJkpeYPkdiRFzvXSz2oapWtDvvl-9UUjIyk"
              referrerPolicy="no-referrer"
            />
            <span className="font-headline text-xl md:text-2xl font-bold tracking-tight text-primary">Almatrail</span>
          </div>
          
          {/* Main Desktop Search Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#dashboard" className="text-on-surface-variant hover:text-primary transition-colors font-medium text-sm lg:text-base">Dashboard</a>
            <a href="#mentors" className="text-on-surface-variant hover:text-primary transition-colors font-medium text-sm lg:text-base">Mentors</a>
            <a href="#sessions" className="text-on-surface-variant hover:text-primary transition-colors font-medium text-sm lg:text-base">Sessions</a>
            <a href="#earnings" className="text-primary font-bold border-b-2 border-primary pb-1 text-sm lg:text-base">Earnings</a>
          </nav>
        </div>

        {/* Dynamic Mode Switcher for the developer preview (clean, subtle & useful) */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden sm:flex items-center bg-surface-container rounded-full p-0.5 text-xs font-semibold border border-outline-variant/10">
            <button 
              onClick={() => setCurrentView('auto')}
              className={`px-3 py-1.5 rounded-full transition-all ${currentView === 'auto' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
              title="Resize browser to switch preview"
            >
              🔄 Auto
            </button>
            <button 
              onClick={() => setCurrentView('desktop')}
              className={`px-3 py-1.5 rounded-full transition-all ${currentView === 'desktop' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              💻 Desktop
            </button>
            <button 
              onClick={() => setCurrentView('mobile')}
              className={`px-3 py-1.5 rounded-full transition-all ${currentView === 'mobile' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              📱 Mobile
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button 
              id="header_notification_btn"
              onClick={onNotificationClick}
              className="p-2 rounded-full hover:bg-surface-container-highest/10 transition-all active:scale-95 text-on-surface-variant hover:text-primary relative"
            >
              <span className="material-symbols-outlined text-2xl">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full animate-ping"></span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full"></span>
            </button>
            <button 
              id="header_settings_btn"
              onClick={onSettingsClick}
              className="p-2 rounded-full hover:bg-surface-container-highest/10 transition-all active:scale-95 text-on-surface-variant hover:text-primary"
            >
              <span className="material-symbols-outlined text-2xl">settings</span>
            </button>
            <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant/20 ml-2 shadow-sm">
              <img 
                alt="Mentor profile photo" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7qL027di8gTqmu50qSjWh7gpGJ6lh4G4XUR2IIc0ZoKBq3PvKjLW7kvzQwvv4soplOBDwJ2pBCQ7ajf8DBNmz59mytcbMJDL-uZyXiSpXtc0iNJen2BrIy7Dzd5i-TZ5H7wtWbxOGIUozEcytcrvvHHk0XXouSx26kc1Bg_ZE4qWMHPdjbzZqivFDHQLsU0roTY5K5a6-_McBMfhxJp6b9cOP7h9O-Je5dPyluPwZWFPRlx9Z8h03BRLIuEMzSP_dnRCa8pszo3YW"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
