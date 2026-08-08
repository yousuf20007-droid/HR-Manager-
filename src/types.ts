export type PlatformType = 'android' | 'ios' | 'web';
export type CurrencyCode = 'SAR' | 'AED' | 'EGP' | 'KWD' | 'QAR' | 'BHD' | 'OMR' | 'JOD' | 'USD' | 'EUR';
export type Language = 'ar' | 'en';

export interface AppSettings {
  lang: Language;
  platform: PlatformType;
  showDeviceFrame: boolean;
  currency: CurrencyCode;
  // Kept for compatibility with HRModule, which reads these two fields
  // to label exported/printed reports. Rename freely from Settings.
  projectName: string;
  contractorName: string;
}

