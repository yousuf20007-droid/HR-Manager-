import React from 'react';
import { X, Globe, Coins, Smartphone, Monitor } from 'lucide-react';
import { AppSettings, CurrencyCode } from '../types';

interface AppSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (patch: Partial<AppSettings>) => void;
}

const CURRENCIES: { code: CurrencyCode; symbol: string; nameAr: string; nameEn: string }[] = [
  { code: 'SAR', symbol: 'ر.س', nameAr: 'ريال سعودي', nameEn: 'Saudi Riyal' },
  { code: 'AED', symbol: 'د.إ', nameAr: 'درهم إماراتي', nameEn: 'UAE Dirham' },
  { code: 'EGP', symbol: 'ج.م', nameAr: 'جنيه مصري', nameEn: 'Egyptian Pound' },
  { code: 'KWD', symbol: 'د.ك', nameAr: 'دينار كويتي', nameEn: 'Kuwaiti Dinar' },
  { code: 'QAR', symbol: 'ر.ق', nameAr: 'ريال قطري', nameEn: 'Qatari Riyal' },
  { code: 'BHD', symbol: 'د.ب', nameAr: 'دينار بحريني', nameEn: 'Bahraini Dinar' },
  { code: 'OMR', symbol: 'ر.ع', nameAr: 'ريال عماني', nameEn: 'Omani Rial' },
  { code: 'JOD', symbol: 'د.أ', nameAr: 'دينار أردني', nameEn: 'Jordanian Dinar' },
  { code: 'USD', symbol: '$', nameAr: 'دولار أمريكي', nameEn: 'US Dollar' },
  { code: 'EUR', symbol: '€', nameAr: 'يورو', nameEn: 'Euro' },
];

export const AppSettingsModal: React.FC<AppSettingsModalProps> = ({ isOpen, onClose, settings, onUpdateSettings }) => {
  if (!isOpen) return null;
  const isAr = settings.lang === 'ar';

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-md bg-[#0F2D4A] border border-white/15 sm:rounded-3xl rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-[#0F2D4A]/95 backdrop-blur-xl border-b border-white/10 px-5 py-4 flex items-center justify-between">
          <h2 className="text-base font-black text-white">{isAr ? 'الإعدادات' : 'Settings'}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#8FC1DD] hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Language */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-[#8FC1DD] text-xs font-black">
              <Globe className="w-4 h-4" />
              <span>{isAr ? 'اللغة' : 'Language'}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onUpdateSettings({ lang: 'ar' })}
                className={`py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  settings.lang === 'ar'
                    ? 'bg-gradient-to-r from-[#E8823A] to-amber-500 text-white shadow-lg'
                    : 'bg-[#153A5C] text-[#8FC1DD] hover:bg-[#183B5E]'
                }`}
              >
                العربية
              </button>
              <button
                onClick={() => onUpdateSettings({ lang: 'en' })}
                className={`py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  settings.lang === 'en'
                    ? 'bg-gradient-to-r from-[#E8823A] to-amber-500 text-white shadow-lg'
                    : 'bg-[#153A5C] text-[#8FC1DD] hover:bg-[#183B5E]'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Currency */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-[#8FC1DD] text-xs font-black">
              <Coins className="w-4 h-4" />
              <span>{isAr ? 'العملة' : 'Currency'}</span>
            </div>
            <select
              value={settings.currency}
              onChange={(e) => onUpdateSettings({ currency: e.target.value as CurrencyCode })}
              className="w-full bg-[#153A5C] border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#E8823A] cursor-pointer"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.symbol} — {isAr ? c.nameAr : c.nameEn} ({c.code})
                </option>
              ))}
            </select>
          </div>

          {/* Device frame */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-[#8FC1DD] text-xs font-black">
              <Smartphone className="w-4 h-4" />
              <span>{isAr ? 'طريقة العرض' : 'Display'}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <button
                onClick={() => onUpdateSettings({ platform: 'android' })}
                className={`py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  settings.platform === 'android'
                    ? 'bg-gradient-to-r from-[#E8823A] to-amber-500 text-white shadow-lg'
                    : 'bg-[#153A5C] text-[#8FC1DD] hover:bg-[#183B5E]'
                }`}
              >
                Android
              </button>
              <button
                onClick={() => onUpdateSettings({ platform: 'ios' })}
                className={`py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  settings.platform === 'ios'
                    ? 'bg-gradient-to-r from-[#E8823A] to-amber-500 text-white shadow-lg'
                    : 'bg-[#153A5C] text-[#8FC1DD] hover:bg-[#183B5E]'
                }`}
              >
                iOS
              </button>
            </div>
            <button
              onClick={() => onUpdateSettings({ showDeviceFrame: !settings.showDeviceFrame })}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#153A5C] text-[#8FC1DD] hover:bg-[#183B5E] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Monitor className="w-3.5 h-3.5" />
              {settings.showDeviceFrame
                ? isAr
                  ? 'إخفاء إطار الهاتف (عرض واسع)'
                  : 'Hide phone frame (wide view)'
                : isAr
                ? 'إظهار إطار الهاتف'
                : 'Show phone frame'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
