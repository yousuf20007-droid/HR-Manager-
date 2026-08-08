import React, { useState } from 'react';
import { AppSettings } from './types';
import { MobileFrame } from './components/MobileFrame';
import { HRModule } from './components/HRModule';
import { AppSettingsModal } from './components/AppSettingsModal';

const SETTINGS_KEY = 'hr_manager_settings_v1';

const DEFAULT_SETTINGS: AppSettings = {
  lang: 'ar',
  platform: 'android',
  showDeviceFrame: true,
  currency: 'SAR',
  projectName: 'شركة البناء والتشييد',
  contractorName: 'الإدارة العامة',
};

function loadSettings(): AppSettings {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
  } catch {
    // ignore corrupt storage
  }
  return DEFAULT_SETTINGS;
}

export default function App() {
  const [settings, setSettings] = useState<AppSettings>(loadSettings);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleUpdateSettings = (patch: Partial<AppSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
      } catch {
        // ignore storage errors (private mode, quota, etc.)
      }
      return next;
    });
  };

  return (
    <MobileFrame settings={settings} onOpenSettings={() => setIsSettingsOpen(true)}>
      <div className="p-3 sm:p-5">
        <HRModule settings={settings} lang={settings.lang} />
      </div>

      <AppSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
      />
    </MobileFrame>
  );
}
