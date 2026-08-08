import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal, Settings } from 'lucide-react';
import { AppSettings } from '../types';

interface MobileFrameProps {
  children: React.ReactNode;
  settings: AppSettings;
  onOpenSettings: () => void;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children, settings, onOpenSettings }) => {
  const [currentTime, setCurrentTime] = useState('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 30000);
    return () => clearInterval(timer);
  }, []);

  const isIOS = settings.platform === 'ios';
  const isWeb = settings.platform === 'web' || !settings.showDeviceFrame;

  const SettingsButton = (
    <button
      type="button"
      onClick={onOpenSettings}
      className="fixed top-4 left-4 z-[60] w-10 h-10 rounded-2xl bg-[#153A5C]/90 border border-white/15 backdrop-blur-xl flex items-center justify-center text-[#8FC1DD] hover:text-[#E8823A] hover:bg-[#183B5E] transition-all shadow-lg cursor-pointer"
      title={settings.lang === 'ar' ? 'الإعدادات' : 'Settings'}
    >
      <Settings className="w-4 h-4" />
    </button>
  );

  if (isWeb) {
    return (
      <div className="min-h-screen bg-[#0F2D4A] text-[#F4F7F9] font-sans relative">
        {SettingsButton}
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-2 sm:p-6 overflow-x-hidden font-sans select-none">
      <div
        className={`relative w-full max-w-[430px] h-[890px] max-h-[96vh] rounded-[48px] bg-[#0F2D4A] border-[10px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden transition-all duration-300 ${
          isIOS ? 'border-slate-800 ring-4 ring-slate-700/50' : 'border-stone-800 ring-4 ring-stone-700/40'
        }`}
      >
        {/* Status Bar */}
        <div className="h-11 px-7 pt-3 flex items-center justify-between text-[13px] font-semibold text-[#8FC1DD] z-30 select-none bg-[#0F2D4A]/80 backdrop-blur-xl border-b border-white/10">
          <span className="font-mono tracking-tight text-[#F4F7F9]">{currentTime}</span>

          {isIOS ? (
            <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-28 h-7 bg-black rounded-full flex items-center justify-end px-2 gap-1.5 shadow-inner">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700"></span>
              <span className="w-2 h-2 rounded-full bg-[#E8823A] animate-pulse"></span>
            </div>
          ) : (
            <div className="absolute left-1/2 -translate-x-1/2 top-3 w-4 h-4 bg-black rounded-full border border-stone-800"></div>
          )}

          <div className="flex items-center gap-1.5">
            <Signal className="w-3.5 h-3.5 text-[#8FC1DD]" />
            <Wifi className="w-3.5 h-3.5 text-[#8FC1DD]" />
            <Battery className="w-4 h-4 text-[#7FBF8F]" />
          </div>
        </div>

        {/* Settings gear (top-left, inside the frame) */}
        <button
          type="button"
          onClick={onOpenSettings}
          className="absolute top-14 left-3 z-40 w-9 h-9 rounded-xl bg-[#153A5C]/90 border border-white/15 backdrop-blur-xl flex items-center justify-center text-[#8FC1DD] hover:text-[#E8823A] hover:bg-[#183B5E] transition-all shadow-lg cursor-pointer"
          title={settings.lang === 'ar' ? 'الإعدادات' : 'Settings'}
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* Viewport Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative bg-[#0F2D4A]">{children}</div>

        {/* Native Home Indicator Bar */}
        <div className="h-4 bg-[#153A5C] flex justify-center items-center pb-1">
          <div className="w-32 h-1 bg-[#8FC1DD]/40 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
