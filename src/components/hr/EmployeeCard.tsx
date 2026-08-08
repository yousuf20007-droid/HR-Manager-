import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  UserCheck,
  FileCheck,
  ShieldCheck,
  MapPin,
  Calendar,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Phone,
  Briefcase,
  BadgeCheck,
} from 'lucide-react';
import { EmployeeRecord, DEPARTMENT_CONFIGS, STATUS_CONFIGS } from '../../types/hr';

interface EmployeeCardProps {
  employee: EmployeeRecord;
  currencySymbol: string;
  isAr: boolean;
  onSelectProfile: (empId: number) => void;
  onOpenWorkID: (emp: EmployeeRecord) => void;
  onOpenPermits: (emp: EmployeeRecord) => void;
  onOpenSafetyPass: (emp: EmployeeRecord) => void;
}

// 8 Distinct Glassmorphic Card Themes (Selected deterministically based on employee.id)
const GLASS_CARD_THEMES = [
  {
    // Sapphire Cyan Glass
    bg: 'bg-gradient-to-br from-sky-950/75 via-[#0C2A4A]/65 to-slate-950/85 border-sky-400/40 hover:border-sky-300/70 shadow-sky-950/50',
    glow: 'bg-sky-500/25',
    avatarGrad: 'linear-gradient(135deg, #00B4DB, #0083B0)',
  },
  {
    // Amber Sunset Glass
    bg: 'bg-gradient-to-br from-amber-950/75 via-[#361D09]/65 to-slate-950/85 border-amber-400/40 hover:border-amber-300/70 shadow-amber-950/50',
    glow: 'bg-amber-500/25',
    avatarGrad: 'linear-gradient(135deg, #E8823A, #FFB25E)',
  },
  {
    // Emerald Forest Glass
    bg: 'bg-gradient-to-br from-emerald-950/75 via-[#082C22]/65 to-slate-950/85 border-emerald-400/40 hover:border-emerald-300/70 shadow-emerald-950/50',
    glow: 'bg-emerald-500/25',
    avatarGrad: 'linear-gradient(135deg, #11998e, #38ef7d)',
  },
  {
    // Purple Amethyst Glass
    bg: 'bg-gradient-to-br from-purple-950/75 via-[#250C3A]/65 to-slate-950/85 border-purple-400/40 hover:border-purple-300/70 shadow-purple-950/50',
    glow: 'bg-purple-500/25',
    avatarGrad: 'linear-gradient(135deg, #8E2DE2, #4A00E0)',
  },
  {
    // Teal Cyan Glass
    bg: 'bg-gradient-to-br from-teal-950/75 via-[#072B33]/65 to-slate-950/85 border-teal-400/40 hover:border-teal-300/70 shadow-teal-950/50',
    glow: 'bg-teal-500/25',
    avatarGrad: 'linear-gradient(135deg, #00DAC6, #008B7D)',
  },
  {
    // Rose Ruby Glass
    bg: 'bg-gradient-to-br from-rose-950/75 via-[#350A1A]/65 to-slate-950/85 border-rose-400/40 hover:border-rose-300/70 shadow-rose-950/50',
    glow: 'bg-rose-500/25',
    avatarGrad: 'linear-gradient(135deg, #FF416C, #FF4B2B)',
  },
  {
    // Indigo Night Glass
    bg: 'bg-gradient-to-br from-indigo-950/75 via-[#10133A]/65 to-slate-950/85 border-indigo-400/40 hover:border-indigo-300/70 shadow-indigo-950/50',
    glow: 'bg-indigo-500/25',
    avatarGrad: 'linear-gradient(135deg, #4A00E0, #8E2DE2)',
  },
  {
    // Bronze Copper Glass
    bg: 'bg-gradient-to-br from-orange-950/75 via-[#3A1808]/65 to-slate-950/85 border-orange-400/40 hover:border-orange-300/70 shadow-orange-950/50',
    glow: 'bg-orange-500/25',
    avatarGrad: 'linear-gradient(135deg, #F2994A, #F2C94C)',
  },
];

export const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee,
  currencySymbol,
  isAr,
  onSelectProfile,
  onOpenWorkID,
  onOpenPermits,
  onOpenSafetyPass,
}) => {
  const deptConfig = DEPARTMENT_CONFIGS[employee.department] || DEPARTMENT_CONFIGS.engineering;
  const statusConfig = STATUS_CONFIGS[employee.status] || STATUS_CONFIGS.active;
  const theme = GLASS_CARD_THEMES[employee.id % GLASS_CARD_THEMES.length];

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase();
  };

  const getAge = (dob?: string) => {
    if (!dob) return null;
    const diff = new Date().getTime() - new Date(dob).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  };

  const daysUntil = (dateStr?: string) => {
    if (!dateStr) return 999;
    const diff = new Date(dateStr).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const iqamaDays = daysUntil(employee.iqamaExpiry);
  const contractDays = daysUntil(employee.contractExpiry);
  const age = getAge(employee.dob);

  const kpis = employee.kpis || {
    overallPerformance: 92,
    safetyCompliance: 96,
    productivity: 90,
    attendanceRate: 98,
  };

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className={`w-full p-4 rounded-2xl ${theme.bg} backdrop-blur-xl border transition-all duration-300 shadow-xl hover:shadow-2xl space-y-3 relative overflow-hidden group`}
    >
      {/* Decorative Ambient Glass Glow */}
      <div className={`absolute -right-12 -top-12 w-36 h-36 ${theme.glow} rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-all`} />

      {/* Expiry Warning Banner if Iqama or Contract is expiring soon */}
      {(iqamaDays <= 60 || contractDays <= 60) && (
        <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-400" />
          <span className="truncate">
            {iqamaDays <= 60
              ? (isAr ? `تنبيه انتهاء الإقامة: متبقي ${iqamaDays} يوم` : `Iqama expiry: ${iqamaDays}d remaining`)
              : (isAr ? `تنبيه انتهاء العقد: متبقي ${contractDays} يوم` : `Contract expiry: ${contractDays}d remaining`)}
          </span>
        </div>
      )}

      {/* Row 1: Header Row with Avatar, Name, Badges & View Details Button */}
      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-3.5 min-w-0 flex-1">
          {/* Avatar Icon */}
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white text-base shrink-0 shadow-lg border-2 border-white/20 relative"
            style={{ background: theme.avatarGrad }}
          >
            <span>{getInitials(employee.name)}</span>
            <span
              className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#0B2239] ${
                employee.status === 'active' || employee.status === 'on_site' ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
            />
          </div>

          {/* Name & Primary Badges */}
          <div className="min-w-0 space-y-1 flex-1">
            <h3 className="text-base sm:text-lg font-black text-white tracking-wide leading-snug">
              {employee.name}
            </h3>

            <p className="text-xs font-bold text-[#8FC1DD] flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">{employee.position}</span>
            </p>

            <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-black border ${statusConfig.badgeBg} shrink-0`}>
                {statusConfig.labelAr}
              </span>
              <span className="bg-black/40 px-2 py-0.5 rounded-md text-amber-300 border border-white/10 text-[10px] font-mono font-bold shrink-0">
                {employee.empNo}
              </span>
              <span className={`px-2 py-0.5 rounded-md border ${deptConfig.bg} text-[10px] font-bold shrink-0`}>
                {deptConfig.labelAr}
              </span>
            </div>
          </div>
        </div>

        {/* View Profile Action Button */}
        <button
          onClick={() => onSelectProfile(employee.id)}
          className="px-3 py-1.5 rounded-xl bg-black/40 hover:bg-white/15 text-[#8FC1DD] hover:text-white transition-all border border-white/15 text-xs font-bold flex items-center gap-1 cursor-pointer shadow shrink-0"
        >
          <span>{isAr ? 'الملف' : 'Profile'}</span>
          {isAr ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Row 2: Compact Specs Horizontal Strip (DOB, Location, Phone) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs bg-black/30 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 text-slate-200">
        <div className="flex items-center gap-1.5 min-w-0">
          <Calendar className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          <span className="truncate">
            <span className="text-slate-400">{isAr ? 'الميلاد: ' : 'DOB: '}</span>
            <span className="text-white font-mono font-bold">{employee.dob || '—'}</span>
            {age !== null && <span className="text-sky-300 font-bold"> ({age} {isAr ? 'سنة' : 'yrs'})</span>}
          </span>
        </div>

        <div className="flex items-center gap-1.5 min-w-0">
          <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="truncate">
            <span className="text-slate-400">{isAr ? 'الموقع: ' : 'Loc: '}</span>
            <span className="text-white font-bold">{employee.address || (isAr ? 'غير مسجل' : 'N/A')}</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 min-w-0">
          <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="truncate">
            <span className="text-slate-400">{isAr ? 'الجوال: ' : 'Tel: '}</span>
            <span className="text-white font-mono font-bold">{employee.phone || (isAr ? 'غير مسجل' : 'N/A')}</span>
          </span>
        </div>
      </div>

      {/* Row 3: Skills & KPI Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        {employee.skills && employee.skills.length > 0 ? (
          <div className="flex items-center gap-1.5 flex-wrap min-w-0">
            <span className="text-[#8FC1DD] font-bold flex items-center gap-1 shrink-0 text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{isAr ? 'المهارات:' : 'Skills:'}</span>
            </span>
            {employee.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-white/10 text-white text-[11px] font-semibold border border-white/10"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : <div />}

        {/* KPI Mini Progress Indicator */}
        <div className="flex items-center gap-2 bg-black/40 px-2.5 py-1 rounded-lg border border-white/10 shrink-0">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[11px] text-slate-300 font-bold">{isAr ? 'الأداء والسلامة:' : 'KPI:'}</span>
          <div className="w-16 h-1.5 rounded-full bg-[#12314F] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full"
              style={{ width: `${kpis.overallPerformance}%` }}
            />
          </div>
          <span className="font-mono text-emerald-300 text-xs font-black">{kpis.overallPerformance}%</span>
        </div>
      </div>

      {/* Row 4: Action Buttons Row */}
      <div className="grid grid-cols-3 gap-2 pt-1 text-xs">
        <button
          onClick={() => onOpenWorkID(employee)}
          className="py-2 px-2 rounded-xl bg-black/40 hover:bg-white/15 border border-white/15 text-white hover:text-amber-300 transition-all font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow"
        >
          <UserCheck className="w-3.5 h-3.5 text-[#E8823A] shrink-0" />
          <span>{isAr ? 'بطاقة عمل' : 'Work ID'}</span>
        </button>

        <button
          onClick={() => onOpenPermits(employee)}
          className="py-2 px-2 rounded-xl bg-black/40 hover:bg-white/15 border border-white/15 text-white hover:text-sky-300 transition-all font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow"
        >
          <FileCheck className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          <span>{isAr ? 'تصريح موقع' : 'Permit'}</span>
        </button>

        <button
          onClick={() => onOpenSafetyPass(employee)}
          className="py-2 px-2 rounded-xl bg-black/40 hover:bg-white/15 border border-white/15 text-white hover:text-emerald-300 transition-all font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>{isAr ? 'أمن وسلامة' : 'Safety'}</span>
        </button>
      </div>
    </div>
  );
};


