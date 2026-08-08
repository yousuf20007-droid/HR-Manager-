import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  Clock,
  Calculator,
  FileSpreadsheet,
  Settings,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  Star,
  Wallet,
  Calendar,
  ShieldAlert,
  Trash2,
  X,
  Download,
  Upload,
  Printer,
  Sliders,
  Check,
  FileText,
  User,
  Building2,
  ArrowRight,
  Lock,
  Unlock,
  AlertTriangle,
  Briefcase,
  TrendingUp,
  Sparkles,
  MapPin,
  Award,
  UserCheck,
  FileCheck,
  ShieldCheck,
  Compass,
  HardHat,
  Phone,
} from 'lucide-react';
import { AppSettings } from '../types';
import {
  DepartmentType,
  EmployeeStatus,
  EmployeeRecord,
  WorkPermit,
  SafetyCertificate,
  DEPARTMENT_CONFIGS,
  STATUS_CONFIGS,
} from '../types/hr';
import { EmployeeCard } from './hr/EmployeeCard';
import { WorkIDCardModal } from './hr/WorkIDCardModal';
import { WorkPermitModal } from './hr/WorkPermitModal';
import { SafetyPassModal } from './hr/SafetyPassModal';

interface HRModuleProps {
  settings: AppSettings;
  lang: 'ar' | 'en';
  onNavigateSection?: (sectionId: string) => void;
}

const INITIAL_EMPLOYEES: EmployeeRecord[] = [
  {
    id: 1,
    name: 'م. محمد عبدالله السالم',
    empNo: 'EMP-1001',
    position: 'مهندس موقع وإنشاءات رئيسي',
    department: 'engineering',
    status: 'active',
    hireDate: '2022-03-15',
    basicSalary: 9500,
    allowances: 2000,
    overtimeRate: 1.5,
    deductions: 500,
    contractExpiry: '2027-03-15',
    dob: '1990-05-15',
    phone: '+966555123456',
    address: 'الرياض - حي العليا - شارع التخصصي',
    bankAccount: 'SA0380000000608010167519',
    iqamaExpiry: '2027-04-10',
    skills: ['إدارة المشاريع', 'SBC 304', 'حساب الكميات', 'المخططات الهندسية', 'Revit'],
    kpis: { overallPerformance: 95, safetyCompliance: 98, productivity: 94, attendanceRate: 98 },
    emergencyContact: '+966500001122',
    workPermits: [
      {
        id: 'prm_1',
        title: 'تصريح إشراف ودخول المواقع الحيوية',
        type: 'high_risk',
        permitNo: 'PRM-8821',
        issueDate: '2025-01-01',
        expiryDate: '2027-01-01',
        status: 'valid',
        zone: 'جميع مباني المشروع',
      },
    ],
    safetyCertificates: [
      {
        id: 'sc_1',
        courseName: 'دورة كود البناء السعودي SBC وتطبيقات السلامة',
        issuer: 'الهيئة السعودية للمهندسين',
        issueDate: '2024-02-10',
        validUntil: '2027-02-10',
        status: 'valid',
      },
      {
        id: 'sc_2',
        courseName: 'دورة OSHA للسلامة وصحة مواقع البناء',
        issuer: 'المعهد العربي للسلامة',
        issueDate: '2025-01-05',
        validUntil: '2027-01-05',
        status: 'valid',
      },
    ],
    documents: [
      { name: 'عقد العمل الموحد', url: '#' },
      { name: 'شهادة الهيئة السعودية للمهندسين', url: '#' },
    ],
    monthlyOvertimeHours: 4,
    leaveDaysUsed: 6,
    timesheet: [
      { date: '2026-07-05', hours: 8, overtime: 2, note: 'إشراف صب السقف الطابق الأول' },
      { date: '2026-07-12', hours: 8, overtime: 3, note: 'اختبارات الضغط للخرسانة' },
    ],
    evaluations: [{ date: '2026-06-01', rating: 5, notes: 'أداء ممتاز بالإنتاجية والسلامة المهنية.' }],
    attendance: { '2026-08-02': 'present', '2026-08-03': 'present', '2026-08-04': 'late' },
  },
  {
    id: 2,
    name: 'م. خالد عبدالسلام العمري',
    empNo: 'EMP-1002',
    position: 'أخصائي مساحة وتخطيط أرضي',
    department: 'surveying',
    status: 'on_site',
    hireDate: '2023-01-10',
    basicSalary: 8500,
    allowances: 1500,
    overtimeRate: 1.5,
    deductions: 200,
    contractExpiry: '2026-12-31',
    dob: '1992-08-22',
    phone: '+966512345678',
    address: 'جدة - حي الخالدية - طريق الملك',
    bankAccount: 'SA4420000001234567891234',
    iqamaExpiry: '2026-11-20',
    skills: ['محطة المساحة Total Station', 'AutoCAD Civil 3D', 'أجهزة GPS المساحية', 'الرفع الطبوغرافي'],
    kpis: { overallPerformance: 91, safetyCompliance: 96, productivity: 90, attendanceRate: 96 },
    emergencyContact: '+966511112233',
    workPermits: [
      {
        id: 'prm_2',
        title: 'تصريح استخدام أجهزة الليزر والمساحة',
        type: 'equipment_license',
        permitNo: 'PRM-5510',
        issueDate: '2025-03-01',
        expiryDate: '2027-03-01',
        status: 'valid',
        zone: 'أراضي المرحلة الأولى والثانية',
      },
    ],
    safetyCertificates: [
      {
        id: 'sc_3',
        courseName: 'دورة السلامة الميدانية للمساحين والمخططين',
        issuer: 'الجمعية السعودية للمساحة',
        issueDate: '2024-06-01',
        validUntil: '2026-06-01',
        status: 'valid',
      },
    ],
    documents: [{ name: 'عقد العمل الموحد', url: '#' }],
    monthlyOvertimeHours: 2,
    leaveDaysUsed: 4,
    timesheet: [],
    evaluations: [],
    attendance: { '2026-08-02': 'present', '2026-08-03': 'present' },
  },
  {
    id: 3,
    name: 'سارة يوسف الحربي',
    empNo: 'EMP-1003',
    position: 'مديرة الموارد البشرية والمالية',
    department: 'management',
    status: 'active',
    hireDate: '2020-01-10',
    basicSalary: 11000,
    allowances: 2500,
    overtimeRate: 1.5,
    deductions: 300,
    contractExpiry: '2028-01-10',
    dob: '1995-11-20',
    phone: '+966501234567',
    address: 'الرياض - حي الروضة',
    bankAccount: 'SA9910000005556667778889',
    iqamaExpiry: '2028-05-01',
    skills: ['إدارة الموارد البشرية', 'تدقيق المستخلصات', 'أنظمة SAP', 'قانون العمل السعودي'],
    kpis: { overallPerformance: 98, safetyCompliance: 100, productivity: 97, attendanceRate: 99 },
    emergencyContact: '+966522223344',
    workPermits: [
      {
        id: 'prm_3',
        title: 'بطاقة إذن دخول المكاتب الرئيسية والمستودعات',
        type: 'national_id',
        permitNo: 'PRM-1001',
        issueDate: '2024-01-01',
        expiryDate: '2028-01-01',
        status: 'valid',
        zone: 'المقر الرئيسي والمكاتب',
      },
    ],
    safetyCertificates: [
      {
        id: 'sc_4',
        courseName: 'دورة إدارة السلامة والإخلاء بالمكاتب الإدارية',
        issuer: 'الدفاع المدني السعودي',
        issueDate: '2025-02-15',
        validUntil: '2027-02-15',
        status: 'valid',
      },
    ],
    documents: [{ name: 'عقد العمل الموحد', url: '#' }],
    monthlyOvertimeHours: 0,
    leaveDaysUsed: 12,
    timesheet: [],
    evaluations: [],
    attendance: { '2026-08-02': 'present', '2026-08-03': 'present' },
  },
  {
    id: 4,
    name: 'أحمد علي الحشاش',
    empNo: 'EMP-1004',
    position: 'فني حدادة وتشكيل حديد تسليح (BBS)',
    department: 'labor_crafts',
    status: 'on_site',
    hireDate: '2023-05-01',
    basicSalary: 5500,
    allowances: 1000,
    overtimeRate: 1.5,
    deductions: 100,
    contractExpiry: '2026-10-20',
    dob: '1988-03-10',
    phone: '+966532198765',
    address: 'الرياض - حي الملز - شارع الأحساء',
    bankAccount: 'SA1120000009988776655443',
    iqamaExpiry: '2026-09-15',
    skills: ['تشكيل حديد التسليح BBS', 'قراءة مخططات التسليح', 'تشغيل مقصات وسنابك الحديد', 'أعمال التربيط'],
    kpis: { overallPerformance: 89, safetyCompliance: 93, productivity: 95, attendanceRate: 92 },
    emergencyContact: '+966533334455',
    workPermits: [
      {
        id: 'prm_4',
        title: 'تصريح الأعمال الساخنة والقص بالورشة',
        type: 'hot_work',
        permitNo: 'PRM-7702',
        issueDate: '2025-04-10',
        expiryDate: '2026-10-10',
        status: 'valid',
        zone: 'منطقة تشكيل الحديد',
      },
    ],
    safetyCertificates: [
      {
        id: 'sc_5',
        courseName: 'شهادة السلامة عند التعامل مع معدات القص والتسليح',
        issuer: 'معهد السلامة للإنشاءات',
        issueDate: '2024-05-01',
        validUntil: '2026-05-01',
        status: 'valid',
      },
    ],
    documents: [],
    monthlyOvertimeHours: 8,
    leaveDaysUsed: 3,
    timesheet: [],
    evaluations: [],
    attendance: { '2026-08-02': 'present', '2026-08-03': 'present' },
  },
  {
    id: 5,
    name: 'فهد سليمان الدوسري',
    empNo: 'EMP-1005',
    position: 'ضابط أمن وسلامة ومراقبة جودة (HSE)',
    department: 'safety_qc',
    status: 'active',
    hireDate: '2021-08-15',
    basicSalary: 9000,
    allowances: 1800,
    overtimeRate: 1.5,
    deductions: 0,
    contractExpiry: '2027-08-15',
    dob: '1989-07-04',
    phone: '+966544332211',
    address: 'الدمام - حي الشاطئ',
    bankAccount: 'SA5540000007766554433221',
    iqamaExpiry: '2027-09-01',
    skills: ['تفتيش أمن السلامة OSHA', 'مراقبة الجودة QC', 'إدارة مخاطر الموقع', 'فحص السقالات'],
    kpis: { overallPerformance: 98, safetyCompliance: 100, productivity: 96, attendanceRate: 99 },
    emergencyContact: '+966544445566',
    workPermits: [
      {
        id: 'prm_5',
        title: 'تصريح مفتش سلامة عام وجودة لكافة الأقسام',
        type: 'high_risk',
        permitNo: 'PRM-9900',
        issueDate: '2024-01-01',
        expiryDate: '2027-01-01',
        status: 'valid',
        zone: 'كافة القطاعات والمواقع',
      },
    ],
    safetyCertificates: [
      {
        id: 'sc_6',
        courseName: 'شهادة OSHA المتقدمة في السلامة والصحة المهنية (30 ساعة)',
        issuer: 'OSHA Training Institute',
        issueDate: '2023-09-01',
        validUntil: '2026-09-01',
        status: 'valid',
      },
      {
        id: 'sc_7',
        courseName: 'شهادة مدرب إسعافات أولية وإنقاذ الأماكن المحصورة',
        issuer: 'الهلال الأحمر السعودي',
        issueDate: '2024-01-10',
        validUntil: '2027-01-10',
        status: 'valid',
      },
    ],
    documents: [],
    monthlyOvertimeHours: 5,
    leaveDaysUsed: 5,
    timesheet: [],
    evaluations: [],
    attendance: { '2026-08-02': 'present', '2026-08-03': 'present' },
  },
  {
    id: 6,
    name: 'عمر فاروق الشريف',
    empNo: 'EMP-1006',
    position: 'سائق ومُشغّل حفارات ومعدات ثقيلة',
    department: 'labor_crafts',
    status: 'on_site',
    hireDate: '2022-11-01',
    basicSalary: 6000,
    allowances: 1200,
    overtimeRate: 1.5,
    deductions: 100,
    contractExpiry: '2026-11-01',
    dob: '1986-12-01',
    phone: '+966566778899',
    address: 'الرياض - حي النسيم - شارع أسامة',
    bankAccount: 'SA8830000001122334455667',
    iqamaExpiry: '2026-10-15',
    skills: ['قيادة الحفارات والشيول', 'تشغيل رافعات الكرين', 'الصيانة الدورية للمعدات', 'نقل التربة'],
    kpis: { overallPerformance: 90, safetyCompliance: 94, productivity: 92, attendanceRate: 95 },
    emergencyContact: '+966555556677',
    workPermits: [
      {
        id: 'prm_6',
        title: 'رخصة قيادة معدات ثقيلة ورافعات سارية',
        type: 'equipment_license',
        permitNo: 'PRM-3341',
        issueDate: '2024-11-01',
        expiryDate: '2026-11-01',
        status: 'valid',
        zone: 'مناطق الحفر والرفع',
      },
    ],
    safetyCertificates: [
      {
        id: 'sc_8',
        courseName: 'شهادة السلامة في قيادة وتشغيل المعدات الثقيلة',
        issuer: 'مركز السلامة المهنية',
        issueDate: '2024-11-05',
        validUntil: '2026-11-05',
        status: 'valid',
      },
    ],
    documents: [],
    monthlyOvertimeHours: 6,
    leaveDaysUsed: 2,
    timesheet: [],
    evaluations: [],
    attendance: { '2026-08-02': 'present', '2026-08-03': 'present' },
  },
];

const AVA_GRADIENTS = [
  'linear-gradient(135deg, #FFB25E, #FF7A3D)',
  'linear-gradient(135deg, #6EC3FF, #4C7EF3)',
  'linear-gradient(135deg, #3ED8A3, #1FA37E)',
  'linear-gradient(135deg, #F2C14E, #D89B1F)',
  'linear-gradient(135deg, #FF8FA3, #E85D7A)',
];

// Searchable Employee Selector Component for Search-First import among hundreds of workers
function EmployeeSearchSelector({
  employees,
  isAr,
  onSelect,
}: {
  employees: EmployeeRecord[];
  isAr: boolean;
  onSelect: (emp: EmployeeRecord) => void;
}) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = employees.filter((e) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase().trim();
    return (
      e.name.toLowerCase().includes(q) ||
      e.empNo.toLowerCase().includes(q) ||
      e.position.toLowerCase().includes(q) ||
      (e.address && e.address.toLowerCase().includes(q))
    );
  });

  return (
    <div ref={containerRef} className="relative w-full sm:w-72">
      <div className="relative">
        <Search className="w-3.5 h-3.5 text-amber-400 absolute right-3 top-2.5 pointer-events-none" />
        <input
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder={isAr ? '🔍 ابحث باسم العامل أو الرقم...' : '🔍 Search name or ID...'}
          className="w-full bg-[#061626] border border-amber-500/50 hover:border-amber-400 focus:border-amber-400 rounded-xl pr-8 pl-8 py-1.5 text-xs text-amber-200 placeholder-slate-400 font-bold focus:outline-none shadow-sm transition-all"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute left-2.5 top-2 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full right-0 left-0 mt-1 bg-[#0A2238] border border-amber-500/40 rounded-xl shadow-2xl z-40 max-h-56 overflow-y-auto divide-y divide-white/10 p-1">
          {filtered.length === 0 ? (
            <div className="p-3 text-center text-slate-400 text-xs">
              {isAr ? 'لم يتم العثور على نتائج للبحث' : 'No matching worker found'}
            </div>
          ) : (
            filtered.map((emp) => (
              <button
                key={emp.id}
                type="button"
                onClick={() => {
                  onSelect(emp);
                  setQuery(`${emp.name} (${emp.empNo})`);
                  setIsOpen(false);
                }}
                className="w-full text-right p-2 rounded-lg hover:bg-[#13385B] transition-colors flex items-center justify-between gap-2 cursor-pointer group"
              >
                <div className="min-w-0">
                  <p className="text-xs font-black text-white group-hover:text-amber-300 truncate">{emp.name}</p>
                  <p className="text-[10px] text-slate-300 truncate">{emp.position}</p>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-amber-300 shrink-0 font-bold">
                  {emp.empNo}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export const HRModule: React.FC<HRModuleProps> = ({ settings, lang, onNavigateSection }) => {
  const isAr = lang === 'ar';
  const currencySymbol = settings.currency || (isAr ? 'ر.س' : 'SAR');

  // State Management
  const [employees, setEmployees] = useState<EmployeeRecord[]>(() => {
    try {
      const saved = localStorage.getItem('hr_employees_data_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return INITIAL_EMPLOYEES;
    } catch {
      return INITIAL_EMPLOYEES;
    }
  });

  const [activeScreen, setActiveScreen] = useState<'home' | 'employees' | 'profile' | 'attendance' | 'calc' | 'reports'>('home');
  const [selectedEmpId, setSelectedEmpId] = useState<number | null>(1);
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<'all' | DepartmentType>('all');
  const [profileTab, setProfileTab] = useState<'info' | 'payroll' | 'timesheet' | 'leave' | 'eval' | 'docs'>('info');
  const [searchQuery, setSearchQuery] = useState('');
  const [sheet, setSheet] = useState<{ type: 'add' | 'edit' | 'ts' | 'eval' | 'doc'; empId?: number } | null>(null);

  // Modals for Badge, Permit & Safety Pass
  const [activeIDModalEmp, setActiveIDModalEmp] = useState<EmployeeRecord | null>(null);
  const [activePermitsModalEmp, setActivePermitsModalEmp] = useState<EmployeeRecord | null>(null);
  const [activeSafetyModalEmp, setActiveSafetyModalEmp] = useState<EmployeeRecord | null>(null);

  // Forms State
  const [formName, setFormName] = useState('');
  const [formEmpNo, setFormEmpNo] = useState('');
  const [formPosition, setFormPosition] = useState('');
  const [formDepartment, setFormDepartment] = useState<DepartmentType>('engineering');
  const [formStatus, setFormStatus] = useState<EmployeeStatus>('active');
  const [formHireDate, setFormHireDate] = useState(new Date().toISOString().slice(0, 10));
  const [formBasic, setFormBasic] = useState('8000');
  const [formAllow, setFormAllow] = useState('1500');
  const [formDeduct, setFormDeduct] = useState('0');
  const [formOTRate, setFormOTRate] = useState('1.5');
  const [formContractExpiry, setFormContractExpiry] = useState('');
  const [formIqamaExpiry, setFormIqamaExpiry] = useState('');
  const [formDob, setFormDob] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formSkills, setFormSkills] = useState('');
  const [formEmergencyContact, setFormEmergencyContact] = useState('');
  const [formBank, setFormBank] = useState('');

  // Timesheet form
  const [tsDate, setTsDate] = useState(new Date().toISOString().slice(0, 10));
  const [tsHours, setTsHours] = useState('8');
  const [tsOvertime, setTsOvertime] = useState('2');
  const [tsNote, setTsNote] = useState('');

  // Evaluation form
  const [evalRating, setEvalRating] = useState(5);
  const [evalNotes, setEvalNotes] = useState('');

  // Doc form
  const [docName, setDocName] = useState('');
  const [docUrl, setDocUrl] = useState('');

  // Calculator State
  const [calcTab, setCalcTab] = useState<'payroll' | 'eos'>('payroll');
  const [calcBasic, setCalcBasic] = useState('8000');
  const [calcAllow, setCalcAllow] = useState('1500');
  const [calcOTHours, setCalcOTHours] = useState('10');
  const [calcOTRate, setCalcOTRate] = useState('1.5');
  const [calcDeduct, setCalcDeduct] = useState('0');
  const [calcGosiToggle, setCalcGosiToggle] = useState(false);
  const [calcSalaryEOS, setCalcSalaryEOS] = useState('9500');
  const [calcYearsEOS, setCalcYearsEOS] = useState('3.5');
  const [calcReasonEOS, setCalcReasonEOS] = useState<'end_contract' | 'resignation' | 'termination'>('end_contract');
  const [calcUnusedLeaveEOS, setCalcUnusedLeaveEOS] = useState('12');

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('hr_employees_data_v3', JSON.stringify(employees));
  }, [employees]);

  // Helpers
  const fmt = (n: number) => Math.round(n || 0).toLocaleString();
  const fmt2 = (n: number) => (n || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase();
  };
  const getAvaGrad = (id: number) => AVA_GRADIENTS[id % AVA_GRADIENTS.length];

  const daysUntil = (dateStr?: string) => {
    if (!dateStr) return Infinity;
    const diff = new Date(dateStr).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getYearsOfService = (hireDateStr: string) => {
    if (!hireDateStr) return 0;
    const diff = new Date().getTime() - new Date(hireDateStr).getTime();
    return Math.max(0, diff / (1000 * 60 * 60 * 24 * 365.25));
  };

  const computeMetrics = (emp: EmployeeRecord) => {
    const basic = Number(emp.basicSalary) || 0;
    const allowances = Number(emp.allowances) || 0;
    const deductions = Number(emp.deductions) || 0;
    const hourlyRate = basic / 30 / 8;
    const tsOT = (emp.timesheet || []).reduce((acc, t) => acc + (Number(t.overtime) || 0), 0);
    const totalOTHours = tsOT > 0 ? tsOT : Number(emp.monthlyOvertimeHours) || 0;
    const overtimeValue = hourlyRate * (Number(emp.overtimeRate) || 1.5) * totalOTHours;
    const totalSalary = basic + allowances + overtimeValue - deductions;
    const monthlyGross = basic + allowances;
    const yrs = getYearsOfService(emp.hireDate);
    const annualLeaveDaysEntitled = Math.round(30 * yrs * 10) / 10;
    const annualLeaveDaysRemaining = Math.max(0, annualLeaveDaysEntitled - (Number(emp.leaveDaysUsed) || 0));

    let eos = 0;
    if (yrs <= 1) {
      eos = monthlyGross * 0.5 * yrs;
    } else {
      eos = monthlyGross * 0.5 + monthlyGross * (yrs - 1);
    }

    return {
      basic,
      allowances,
      deductions,
      hourlyRate,
      totalOTHours,
      overtimeValue,
      totalSalary,
      monthlyGross,
      yrs,
      annualLeaveDaysEntitled,
      annualLeaveDaysRemaining,
      eos,
    };
  };

  const avgRating = (emp: EmployeeRecord) => {
    const evs = emp.evaluations || [];
    if (!evs.length) return 0;
    return evs.reduce((s, x) => s + (Number(x.rating) || 0), 0) / evs.length;
  };

  // Selected Employee
  const currentEmp = employees.find((e) => e.id === selectedEmpId) || employees[0];
  const currentMetrics = currentEmp ? computeMetrics(currentEmp) : null;

  // Global Totals
  const totalPayroll = employees.reduce((s, e) => s + computeMetrics(e).totalSalary, 0);
  const totalOT = employees.reduce((s, e) => s + computeMetrics(e).overtimeValue, 0);
  const totalEOS = employees.reduce((s, e) => s + computeMetrics(e).eos, 0);

  // Expiring Contracts & Iqamas
  const expiringContracts = employees.filter((e) => daysUntil(e.contractExpiry) >= 0 && daysUntil(e.contractExpiry) <= 60);
  const expiringIqamas = employees.filter((e) => daysUntil(e.iqamaExpiry) >= 0 && daysUntil(e.iqamaExpiry) <= 60);

  // Department counts
  const getDeptCount = (dept: DepartmentType) => employees.filter((e) => e.department === dept).length;

  // Filtered employees list
  const filteredEmployees = employees.filter((e) => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      e.name.toLowerCase().includes(q) ||
      e.empNo.toLowerCase().includes(q) ||
      e.position.toLowerCase().includes(q) ||
      (e.address && e.address.toLowerCase().includes(q)) ||
      (e.skills && e.skills.some((s) => s.toLowerCase().includes(q)));

    const matchesDept = selectedDeptFilter === 'all' || e.department === selectedDeptFilter;

    return matchesSearch && matchesDept;
  });

  // Handlers
  const handleOpenAdd = () => {
    setFormName('');
    setFormEmpNo(`EMP-${1000 + employees.length + 1}`);
    setFormPosition('');
    setFormDepartment('engineering');
    setFormStatus('active');
    setFormHireDate(new Date().toISOString().slice(0, 10));
    setFormBasic('8000');
    setFormAllow('1500');
    setFormDeduct('0');
    setFormOTRate('1.5');
    setFormContractExpiry('');
    setFormIqamaExpiry('');
    setFormDob('1992-05-10');
    setFormPhone('');
    setFormAddress('الرياض - حي الملز');
    setFormSkills('إدارة المشاريع, حساب الكميات, المخططات الهندسية');
    setFormEmergencyContact('');
    setFormBank('');
    setSheet({ type: 'add' });
  };

  const handleOpenEdit = (emp: EmployeeRecord) => {
    setFormName(emp.name);
    setFormEmpNo(emp.empNo);
    setFormPosition(emp.position);
    setFormDepartment(emp.department || 'engineering');
    setFormStatus(emp.status || 'active');
    setFormHireDate(emp.hireDate);
    setFormBasic(String(emp.basicSalary));
    setFormAllow(String(emp.allowances));
    setFormDeduct(String(emp.deductions));
    setFormOTRate(String(emp.overtimeRate));
    setFormContractExpiry(emp.contractExpiry || '');
    setFormIqamaExpiry(emp.iqamaExpiry || '');
    setFormDob(emp.dob || '');
    setFormPhone(emp.phone || '');
    setFormAddress(emp.address || '');
    setFormSkills((emp.skills || []).join(', '));
    setFormEmergencyContact(emp.emergencyContact || '');
    setFormBank(emp.bankAccount || '');
    setSheet({ type: 'edit', empId: emp.id });
  };

  const handleSaveEmployee = () => {
    if (!formName.trim()) return;

    const parsedSkills = formSkills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const data: EmployeeRecord = {
      id: sheet?.type === 'edit' && sheet.empId ? sheet.empId : Date.now(),
      name: formName.trim(),
      empNo: formEmpNo.trim() || `EMP-${Date.now().toString().slice(-4)}`,
      position: formPosition.trim() || (isAr ? 'موظف موقع' : 'Site Staff'),
      department: formDepartment,
      status: formStatus,
      hireDate: formHireDate || new Date().toISOString().slice(0, 10),
      basicSalary: parseFloat(formBasic) || 0,
      allowances: parseFloat(formAllow) || 0,
      deductions: parseFloat(formDeduct) || 0,
      overtimeRate: parseFloat(formOTRate) || 1.5,
      contractExpiry: formContractExpiry,
      iqamaExpiry: formIqamaExpiry,
      dob: formDob,
      phone: formPhone,
      address: formAddress,
      skills: parsedSkills.length > 0 ? parsedSkills : [isAr ? 'إدارة السلامة والموقع' : 'Site Management'],
      kpis: currentEmp?.kpis || { overallPerformance: 92, safetyCompliance: 96, productivity: 90, attendanceRate: 98 },
      emergencyContact: formEmergencyContact,
      bankAccount: formBank,
      workPermits: sheet?.type === 'edit' ? currentEmp?.workPermits || [] : [],
      safetyCertificates: sheet?.type === 'edit' ? currentEmp?.safetyCertificates || [] : [],
      documents: sheet?.type === 'edit' ? currentEmp?.documents || [] : [],
      timesheet: sheet?.type === 'edit' ? currentEmp?.timesheet || [] : [],
      evaluations: sheet?.type === 'edit' ? currentEmp?.evaluations || [] : [],
      attendance: sheet?.type === 'edit' ? currentEmp?.attendance || {} : {},
    };

    if (sheet?.type === 'edit' && sheet.empId) {
      setEmployees((prev) => prev.map((e) => (e.id === sheet.empId ? { ...e, ...data } : e)));
    } else {
      setEmployees((prev) => [...prev, data]);
      setSelectedEmpId(data.id);
    }
    setSheet(null);
  };

  const handleDeleteEmployee = (id: number) => {
    if (confirm(isAr ? 'هل تريد حذف سجل الموظف نهائياً؟' : 'Permanently delete employee record?')) {
      setEmployees((prev) => prev.filter((e) => e.id !== id));
      setActiveScreen('employees');
    }
  };

  const handleUpdatePermits = (empId: number, permits: WorkPermit[]) => {
    setEmployees((prev) => prev.map((e) => (e.id === empId ? { ...e, workPermits: permits } : e)));
  };

  const handleUpdateCertificates = (empId: number, certs: SafetyCertificate[]) => {
    setEmployees((prev) => prev.map((e) => (e.id === empId ? { ...e, safetyCertificates: certs } : e)));
  };

  const handleAddTimesheet = () => {
    if (!selectedEmpId) return;
    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id === selectedEmpId) {
          const list = emp.timesheet || [];
          return {
            ...emp,
            timesheet: [
              ...list,
              {
                date: tsDate,
                hours: parseFloat(tsHours) || 8,
                overtime: parseFloat(tsOvertime) || 0,
                note: tsNote,
              },
            ],
          };
        }
        return emp;
      })
    );
    setSheet(null);
    setTsNote('');
  };

  const handleAddEval = () => {
    if (!selectedEmpId || !evalNotes.trim()) return;
    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id === selectedEmpId) {
          const list = emp.evaluations || [];
          return {
            ...emp,
            evaluations: [
              ...list,
              {
                date: new Date().toISOString().slice(0, 10),
                rating: evalRating,
                notes: evalNotes.trim(),
              },
            ],
          };
        }
        return emp;
      })
    );
    setSheet(null);
    setEvalNotes('');
  };

  const handleAddDoc = () => {
    if (!selectedEmpId || !docName.trim()) return;
    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id === selectedEmpId) {
          const list = emp.documents || [];
          return {
            ...emp,
            documents: [
              ...list,
              {
                name: docName.trim(),
                url: docUrl.trim() || '#',
              },
            ],
          };
        }
        return emp;
      })
    );
    setSheet(null);
    setDocName('');
    setDocUrl('');
  };

  return (
    <div className={`space-y-4 ${isAr ? 'text-right' : 'text-left'} pb-24`}>
      {/* Main HR Header Banner Card */}
      <div className="p-4 sm:p-5 rounded-3xl border border-white/20 bg-gradient-to-r from-[#0B1E31]/95 via-[#102C48]/90 to-[#081827]/95 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#E8823A] to-amber-500 flex items-center justify-center text-white shadow-lg border border-white/20 shrink-0">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 font-black" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-xl font-black text-white tracking-wide">
                  {isAr ? 'الموارد البشرية' : 'HR Management'}
                </h1>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#E8823A] text-white font-black shadow shrink-0">
                  PRO
                </span>
              </div>
              <p className="text-xs text-[#8FC1DD] font-medium mt-0.5">
                {isAr ? 'إدارة الكادر، الأقسام، البطاقات والتصاريح' : 'Staff Directory & Safety Clearance'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Quick Search Box in Header */}
            <div className="relative flex-1 md:w-52">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAr ? 'بحث سريع عن موظف...' : 'Quick search...'}
                className="w-full bg-[#051322]/80 border border-white/15 rounded-xl pr-8 pl-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#E8823A]"
              />
            </div>

            <button
              onClick={handleOpenAdd}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#E8823A] to-amber-500 hover:from-[#D6732B] hover:to-amber-600 text-white text-xs font-black transition-all flex items-center gap-1.5 shadow-lg cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>{isAr ? 'إضافة موظف' : 'Add Staff'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Standalone Navigation Bar Below HR Header (Full Width Grid, No Overlap, Clear Text) */}
      <div className="bg-[#0B2238]/95 p-2 rounded-2xl border border-white/15 shadow-xl w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 w-full">
          <button
            onClick={() => setActiveScreen('home')}
            className={`w-full py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-xs ${
              activeScreen === 'home'
                ? 'bg-gradient-to-r from-[#E8823A] to-amber-500 text-white shadow-lg font-black border border-amber-400/40'
                : 'bg-[#102B45] hover:bg-[#183B5E] text-[#8FC1DD] hover:text-white border border-white/5 font-bold'
            }`}
          >
            <Users className="w-4 h-4 text-amber-300 shrink-0" />
            <span>{isAr ? 'الرئيسية' : 'Overview'}</span>
          </button>

          <button
            onClick={() => setActiveScreen('employees')}
            className={`w-full py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-xs ${
              activeScreen === 'employees' || activeScreen === 'profile'
                ? 'bg-gradient-to-r from-[#E8823A] to-amber-500 text-white shadow-lg font-black border border-amber-400/40'
                : 'bg-[#102B45] hover:bg-[#183B5E] text-[#8FC1DD] hover:text-white border border-white/5 font-bold'
            }`}
          >
            <Briefcase className="w-4 h-4 text-amber-300 shrink-0" />
            <span>{isAr ? 'بطاقات الموظفين' : 'Employee Cards'}</span>
          </button>

          <button
            onClick={() => setActiveScreen('attendance')}
            className={`w-full py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-xs ${
              activeScreen === 'attendance'
                ? 'bg-gradient-to-r from-[#E8823A] to-amber-500 text-white shadow-lg font-black border border-amber-400/40'
                : 'bg-[#102B45] hover:bg-[#183B5E] text-[#8FC1DD] hover:text-white border border-white/5 font-bold'
            }`}
          >
            <Clock className="w-4 h-4 text-amber-300 shrink-0" />
            <span>{isAr ? 'الحضور والغياب' : 'Attendance'}</span>
          </button>

          <button
            onClick={() => setActiveScreen('calc')}
            className={`w-full py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-xs ${
              activeScreen === 'calc'
                ? 'bg-gradient-to-r from-[#E8823A] to-amber-500 text-white shadow-lg font-black border border-amber-400/40'
                : 'bg-[#102B45] hover:bg-[#183B5E] text-[#8FC1DD] hover:text-white border border-white/5 font-bold'
            }`}
          >
            <Calculator className="w-4 h-4 text-amber-300 shrink-0" />
            <span>{isAr ? 'حاسبة المستحقات والرواتب' : 'Payroll & EOS'}</span>
          </button>

          <button
            onClick={() => setActiveScreen('reports')}
            className={`col-span-2 sm:col-span-1 w-full py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-xs ${
              activeScreen === 'reports'
                ? 'bg-gradient-to-r from-[#E8823A] to-amber-500 text-white shadow-lg font-black border border-amber-400/40'
                : 'bg-[#102B45] hover:bg-[#183B5E] text-[#8FC1DD] hover:text-white border border-white/5 font-bold'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-amber-300 shrink-0" />
            <span>{isAr ? 'التقارير الشاملة' : 'Reports'}</span>
          </button>
        </div>
      </div>

      {/* Screen 1: Home Overview */}
      {activeScreen === 'home' && (
        <div className="space-y-4">
          {/* Quick Stats Row */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="p-3.5 rounded-2xl bg-[#153A5C]/80 border border-white/10 space-y-1 shadow-md text-center sm:text-right">
              <span className="text-[10px] sm:text-xs text-[#8FC1DD] block truncate">{isAr ? 'إجمالي الموظفين' : 'Total Staff'}</span>
              <p className="text-sm sm:text-xl font-black text-sky-400 font-mono leading-tight">
                {employees.length} <span className="text-[10px] font-normal">{isAr ? 'موظف' : 'staff'}</span>
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#153A5C]/80 border border-white/10 space-y-1 shadow-md text-center sm:text-right">
              <span className="text-[10px] sm:text-xs text-[#8FC1DD] block truncate">{isAr ? 'إجمالي الرواتب' : 'Total Payroll'}</span>
              <p className="text-sm sm:text-xl font-black text-[#34D399] font-mono leading-tight">
                {fmt(totalPayroll)} <span className="text-[10px] font-normal">{currencySymbol}</span>
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#153A5C]/80 border border-white/10 space-y-1 shadow-md text-center sm:text-right">
              <span className="text-[10px] sm:text-xs text-[#8FC1DD] block truncate">{isAr ? 'أوفر تايم الشهر' : 'OT Payroll'}</span>
              <p className="text-sm sm:text-xl font-black text-[#FACC15] font-mono leading-tight">
                {fmt(totalOT)} <span className="text-[10px] font-normal">{currencySymbol}</span>
              </p>
            </div>
          </div>

          {/* Department Overview Cards */}
          <div className="space-y-2.5">
            <h2 className="text-xs sm:text-sm font-black text-white flex items-center justify-between">
              <span>{isAr ? 'توزيع الكادر حسب الأقسام والتخصصات' : 'Staff Distribution by Department'}</span>
              <button
                onClick={() => setActiveScreen('employees')}
                className="text-[11px] text-[#E8823A] font-bold hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>{isAr ? 'الانتقال للبطاقات' : 'Go to Cards'}</span>
                <span>←</span>
              </button>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {(Object.keys(DEPARTMENT_CONFIGS) as DepartmentType[]).map((deptKey) => {
                const cfg = DEPARTMENT_CONFIGS[deptKey];
                const count = getDeptCount(deptKey);
                return (
                  <div
                    key={deptKey}
                    onClick={() => {
                      setSelectedDeptFilter(deptKey);
                      setActiveScreen('employees');
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2 shadow-md hover:scale-[1.02] ${cfg.bg}`}
                  >
                    <div className="min-w-0">
                      <h4 className={`text-xs font-black truncate ${cfg.color}`}>{cfg.labelAr}</h4>
                      <p className="text-[11px] text-slate-300 font-mono font-bold mt-1">
                        {count} {isAr ? 'موظف/عامل' : 'staff'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Screen 2: Interactive Employee Cards Directory with Department Categorization */}
      {activeScreen === 'employees' && (
        <div className="space-y-3">
          {/* Search Bar & Add Button */}
          <div className="flex items-center justify-between gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAr ? 'بحث بالاسم، المسمى، السكن، المهارة...' : 'Search staff by name, skill, title...'}
                className="w-full bg-[#153A5C]/80 border border-white/15 rounded-xl pr-9 pl-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#E8823A]"
              />
            </div>
            <button
              onClick={handleOpenAdd}
              className="px-3.5 py-2 rounded-xl bg-[#E8823A] hover:bg-[#D6732B] text-white text-xs font-bold transition-all flex items-center gap-1 shrink-0 shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{isAr ? 'إضافة جديد' : 'Add New'}</span>
            </button>
          </div>

          {/* Department Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5">
            <button
              onClick={() => setSelectedDeptFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all border ${
                selectedDeptFilter === 'all'
                  ? 'bg-[#E8823A] text-white border-[#E8823A] shadow-md'
                  : 'bg-[#153A5C]/80 text-[#8FC1DD] border-white/10 hover:text-white'
              }`}
            >
              {isAr ? 'جميع الأقسام' : 'All Departments'} ({employees.length})
            </button>

            {(Object.keys(DEPARTMENT_CONFIGS) as DepartmentType[]).map((deptKey) => {
              const cfg = DEPARTMENT_CONFIGS[deptKey];
              const count = getDeptCount(deptKey);
              const isSel = selectedDeptFilter === deptKey;

              return (
                <button
                  key={deptKey}
                  onClick={() => setSelectedDeptFilter(deptKey)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all border ${
                    isSel
                      ? 'bg-[#E8823A] text-white border-[#E8823A] shadow-md'
                      : 'bg-[#153A5C]/80 text-slate-300 border-white/10 hover:text-white'
                  }`}
                >
                  {cfg.labelAr} ({count})
                </button>
              );
            })}
          </div>

          {/* Interactive Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredEmployees.map((emp) => (
              <EmployeeCard
                key={emp.id}
                employee={emp}
                currencySymbol={currencySymbol}
                isAr={isAr}
                onSelectProfile={(id) => {
                  setSelectedEmpId(id);
                  setActiveScreen('profile');
                }}
                onOpenWorkID={(e) => setActiveIDModalEmp(e)}
                onOpenPermits={(e) => setActivePermitsModalEmp(e)}
                onOpenSafetyPass={(e) => setActiveSafetyModalEmp(e)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Screen 3: Employee Profile Details */}
      {activeScreen === 'profile' && currentEmp && currentMetrics && (
        <div className="space-y-4">
          {/* Profile Header */}
          <div className="p-4 rounded-2xl bg-[#153A5C]/90 border border-white/15 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setActiveScreen('employees')}
                className="text-xs text-[#8FC1DD] hover:text-white flex items-center gap-1 cursor-pointer"
              >
                {isAr ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                <span>{isAr ? 'رجوع للقائمة' : 'Back to list'}</span>
              </button>

              <button
                onClick={() => handleOpenEdit(currentEmp)}
                className="px-3 py-1.5 rounded-xl bg-[#0F2D4A] hover:bg-[#1A456E] border border-white/20 text-xs text-white font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5 text-[#E8823A]" />
                <span>{isAr ? 'تعديل البيانات' : 'Edit Info'}</span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-right">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-white text-xl shadow-lg shrink-0"
                style={{ background: getAvaGrad(currentEmp.id) }}
              >
                {getInitials(currentEmp.name)}
              </div>
              <div className="space-y-1">
                <h2 className="text-lg font-black text-white">{currentEmp.name}</h2>
                <p className="text-xs text-[#8FC1DD]">
                  {currentEmp.position} · <span className="font-mono">{currentEmp.empNo}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Profile Navigation Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 bg-[#153A5C]/70 p-1 rounded-xl border border-white/10 text-xs font-bold">
            <button
              onClick={() => setProfileTab('info')}
              className={`px-3 py-1.5 rounded-lg cursor-pointer ${profileTab === 'info' ? 'bg-[#E8823A] text-white' : 'text-[#8FC1DD]'}`}
            >
              {isAr ? 'البيانات' : 'Info'}
            </button>
            <button
              onClick={() => setProfileTab('payroll')}
              className={`px-3 py-1.5 rounded-lg cursor-pointer ${profileTab === 'payroll' ? 'bg-[#E8823A] text-white' : 'text-[#8FC1DD]'}`}
            >
              {isAr ? 'كشف الراتب' : 'Payroll'}
            </button>
            <button
              onClick={() => setProfileTab('timesheet')}
              className={`px-3 py-1.5 rounded-lg cursor-pointer ${profileTab === 'timesheet' ? 'bg-[#E8823A] text-white' : 'text-[#8FC1DD]'}`}
            >
              {isAr ? 'الدوام' : 'Timesheet'}
            </button>
            <button
              onClick={() => setProfileTab('leave')}
              className={`px-3 py-1.5 rounded-lg cursor-pointer ${profileTab === 'leave' ? 'bg-[#E8823A] text-white' : 'text-[#8FC1DD]'}`}
            >
              {isAr ? 'الإجازات ونهاية الخدمة' : 'Leave/EOS'}
            </button>
            <button
              onClick={() => setProfileTab('eval')}
              className={`px-3 py-1.5 rounded-lg cursor-pointer ${profileTab === 'eval' ? 'bg-[#E8823A] text-white' : 'text-[#8FC1DD]'}`}
            >
              {isAr ? 'التقييمات' : 'Evaluations'}
            </button>
            <button
              onClick={() => setProfileTab('docs')}
              className={`px-3 py-1.5 rounded-lg cursor-pointer ${profileTab === 'docs' ? 'bg-[#E8823A] text-white' : 'text-[#8FC1DD]'}`}
            >
              {isAr ? 'المستندات' : 'Docs'}
            </button>
          </div>

          {/* Tab 1: Info */}
          {profileTab === 'info' && (
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-[#153A5C]/80 border border-white/10 space-y-2">
                <h3 className="font-bold text-white text-xs border-b border-white/10 pb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#E8823A]" />
                  <span>{isAr ? 'البيانات الشخصية والتوظيف' : 'Personal & Employment Details'}</span>
                </h3>
                <div className="grid grid-cols-2 gap-2 text-[#8FC1DD] pt-1">
                  <div>{isAr ? 'تاريخ الميلاد:' : 'DOB:'} <span className="text-white font-mono">{currentEmp.dob || '—'}</span></div>
                  <div>{isAr ? 'عنوان السكن:' : 'Address:'} <span className="text-white">{currentEmp.address || '—'}</span></div>
                  <div>{isAr ? 'تاريخ المباشرة:' : 'Hire Date:'} <span className="text-white font-mono">{currentEmp.hireDate}</span></div>
                  <div>{isAr ? 'رقم الهوية/الإقامة:' : 'Iqama/ID:'} <span className="text-white font-mono">{currentEmp.empNo}</span></div>
                  <div>{isAr ? 'تاريخ انتهاء العقد:' : 'Contract Exp:'} <span className="text-white font-mono">{currentEmp.contractExpiry || '—'}</span></div>
                  <div>{isAr ? 'رقم الجوال:' : 'Phone:'} <span className="text-white font-mono">{currentEmp.phone || '—'}</span></div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#153A5C]/80 border border-white/10 space-y-2">
                <h3 className="font-bold text-white text-xs border-b border-white/10 pb-1.5 flex items-center gap-1.5">
                  <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isAr ? 'البيانات المالية البنكية' : 'Financial & Bank Details'}</span>
                </h3>
                <div className="grid grid-cols-2 gap-2 text-[#8FC1DD] pt-1">
                  <div>{isAr ? 'الراتب الأساسي:' : 'Basic Salary:'} <span className="text-white font-mono">{fmt(currentEmp.basicSalary)} {currencySymbol}</span></div>
                  <div>{isAr ? 'العلاوات والبدلات:' : 'Allowances:'} <span className="text-white font-mono">{fmt(currentEmp.allowances)} {currencySymbol}</span></div>
                  <div>{isAr ? 'معدل الأوفر تايم:' : 'OT Rate:'} <span className="text-white font-mono">×{currentEmp.overtimeRate}</span></div>
                  <div>{isAr ? 'الاستقطاعات:' : 'Deductions:'} <span className="text-white font-mono">{fmt(currentEmp.deductions)} {currencySymbol}</span></div>
                </div>
              </div>

              <button
                onClick={() => handleDeleteEmployee(currentEmp.id)}
                className="w-full py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-rose-300 font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>{isAr ? 'حذف سجل الموظف نهائياً' : 'Delete Employee Record'}</span>
              </button>
            </div>
          )}

          {/* Tab 2: Payroll */}
          {profileTab === 'payroll' && (
            <div className="p-4 rounded-2xl bg-[#153A5C]/80 border border-white/10 space-y-3 text-xs">
              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-300">
                  <span>{isAr ? 'الراتب الأساسي:' : 'Basic Salary:'}</span>
                  <span className="font-mono text-white">{fmt2(currentMetrics.basic)} {currencySymbol}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>{isAr ? 'البدلات والعلاوات:' : 'Allowances:'}</span>
                  <span className="font-mono text-emerald-400">+ {fmt2(currentMetrics.allowances)} {currencySymbol}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-white/10 font-black text-sm">
                  <span className="text-white">{isAr ? 'صافي الراتب المستحق:' : 'Total Net Salary:'}</span>
                  <span className="text-emerald-400 font-mono text-base">{fmt2(currentMetrics.totalSalary)} {currencySymbol}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Timesheet */}
          {profileTab === 'timesheet' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white">{isAr ? 'سجل الساعات والدوام' : 'Timesheet Logs'}</h3>
                <button
                  onClick={() => setSheet({ type: 'ts', empId: currentEmp.id })}
                  className="px-3 py-1 rounded-lg bg-[#E8823A] text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isAr ? 'إضافة سجل يوم' : 'Add Workday Log'}</span>
                </button>
              </div>

              <div className="space-y-2">
                {(currentEmp.timesheet || []).length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-4">{isAr ? 'لا توجد سجلات دوام مضافة' : 'No timesheet entries yet'}</p>
                ) : (
                  currentEmp.timesheet?.map((ts, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#153A5C]/80 border border-white/10 flex items-center justify-between text-xs">
                      <div className="space-y-0.5">
                        <span className="text-white font-mono font-bold block">{ts.date}</span>
                        <span className="text-[#8FC1DD] text-[11px]">{ts.note || (isAr ? 'عمل اعتيادي' : 'Standard workday')}</span>
                      </div>
                      <div className="text-left font-mono">
                        <span className="text-sky-300 block">{ts.hours} {isAr ? 'ساعات' : 'hrs'}</span>
                        {ts.overtime > 0 && <span className="text-amber-400 text-[11px] block">+{ts.overtime} {isAr ? 'إضافي' : 'OT'}</span>}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Tab 4: Leave & EOS */}
          {profileTab === 'leave' && (
            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-[#153A5C]/80 border border-white/10 space-y-2">
                <h3 className="font-bold text-white text-xs">{isAr ? 'رصيد الإجازات السنوية' : 'Annual Leave Entitlement'}</h3>
                <div className="space-y-1 text-slate-300">
                  <div className="flex justify-between">
                    <span>{isAr ? 'الرصيد المستحق:' : 'Entitled Days:'}</span>
                    <span className="font-mono text-white">{currentMetrics.annualLeaveDaysEntitled.toFixed(1)} {isAr ? 'يوم' : 'days'}</span>
                  </div>
                  <div className="flex justify-between font-bold text-white pt-1 border-t border-white/10">
                    <span>{isAr ? 'الأيام المتبقية:' : 'Days Remaining:'}</span>
                    <span className="font-mono text-emerald-400">{currentMetrics.annualLeaveDaysRemaining.toFixed(1)} {isAr ? 'يوم' : 'days'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Evaluations */}
          {profileTab === 'eval' && (
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white">{isAr ? 'تقييمات الأداء والإنتاجية' : 'Performance Reviews'}</h3>
                <button
                  onClick={() => setSheet({ type: 'eval', empId: currentEmp.id })}
                  className="px-3 py-1 rounded-lg bg-[#E8823A] text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isAr ? 'إضافة تقييم' : 'Add Review'}</span>
                </button>
              </div>

              <div className="space-y-2">
                {(currentEmp.evaluations || []).length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-4">{isAr ? 'لا توجد تقييمات مضافة بعد' : 'No evaluation reviews recorded'}</p>
                ) : (
                  currentEmp.evaluations?.map((ev, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#153A5C]/80 border border-white/10 space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-3.5 h-3.5 ${s <= ev.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">{ev.date}</span>
                      </div>
                      <p className="text-white text-xs leading-relaxed">{ev.notes}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Tab 6: Documents */}
          {profileTab === 'docs' && (
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white">{isAr ? 'المستندات والعقود' : 'Documents & Contracts'}</h3>
                <button
                  onClick={() => setSheet({ type: 'doc', empId: currentEmp.id })}
                  className="px-3 py-1 rounded-lg bg-[#E8823A] text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isAr ? 'إضافة مستند' : 'Add Document'}</span>
                </button>
              </div>

              <div className="space-y-2">
                {(currentEmp.documents || []).length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-4">{isAr ? 'لا توجد مستندات مرفقة' : 'No documents uploaded'}</p>
                ) : (
                  currentEmp.documents?.map((doc, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#153A5C]/80 border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-sky-400" />
                        <span className="text-white font-bold">{doc.name}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Screen 4: Today Attendance */}
      {activeScreen === 'attendance' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#E8823A]" />
              <span>{isAr ? 'تسجيل الحضور اليومي السريع' : 'Daily Quick Attendance'}</span>
            </h3>
            <span className="text-xs font-mono text-amber-300">{new Date().toISOString().slice(0, 10)}</span>
          </div>

          <div className="space-y-2">
            {employees.map((emp) => {
              const todayKey = new Date().toISOString().slice(0, 10);
              const status = emp.attendance?.[todayKey];

              const toggleStatus = (st: 'present' | 'absent' | 'late' | 'leave') => {
                setEmployees((prev) =>
                  prev.map((e) => {
                    if (e.id === emp.id) {
                      const att = { ...(e.attendance || {}) };
                      if (att[todayKey] === st) {
                        delete att[todayKey];
                      } else {
                        att[todayKey] = st;
                      }
                      return { ...e, attendance: att };
                    }
                    return e;
                  })
                );
              };

              return (
                <div key={emp.id} className="p-3 rounded-xl bg-[#153A5C]/80 border border-white/10 flex items-center justify-between gap-2 shadow">
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{emp.name}</h4>
                    <p className="text-[10px] text-slate-400 truncate">{emp.position}</p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => toggleStatus('present')}
                      className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer transition-all ${
                        status === 'present' ? 'bg-emerald-500 text-white shadow' : 'bg-[#0F2D4A] text-slate-400'
                      }`}
                    >
                      {isAr ? 'حاضر' : 'Present'}
                    </button>
                    <button
                      onClick={() => toggleStatus('absent')}
                      className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer transition-all ${
                        status === 'absent' ? 'bg-rose-500 text-white shadow' : 'bg-[#0F2D4A] text-slate-400'
                      }`}
                    >
                      {isAr ? 'غائب' : 'Absent'}
                    </button>
                    <button
                      onClick={() => toggleStatus('late')}
                      className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer transition-all ${
                        status === 'late' ? 'bg-amber-500 text-white shadow' : 'bg-[#0F2D4A] text-slate-400'
                      }`}
                    >
                      {isAr ? 'متأخر' : 'Late'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Screen 5: Standalone Full Payroll & EOS Benefits Calculator */}
      {activeScreen === 'calc' && (
        <div className="space-y-4">
          {/* Sub-Tabs Selector */}
          <div className="flex items-center gap-1.5 bg-[#091E33] p-1.5 rounded-2xl border border-white/10 text-xs font-black">
            <button
              onClick={() => setCalcTab('payroll')}
              className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                calcTab === 'payroll' ? 'bg-[#E8823A] text-white shadow-md' : 'text-[#8FC1DD] hover:text-white'
              }`}
            >
              <Wallet className="w-4 h-4" />
              <span>{isAr ? 'حاسبة الرواتب والأوفرتايم' : 'Payroll & Overtime'}</span>
            </button>

            <button
              onClick={() => setCalcTab('eos')}
              className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
                calcTab === 'eos' ? 'bg-[#E8823A] text-white shadow-md' : 'text-[#8FC1DD] hover:text-white'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>{isAr ? 'حاسبة مكافأة نهاية الخدمة والإجازات' : 'End of Service & Leave'}</span>
            </button>
          </div>

          {/* Tab 1: Payroll & Overtime Calculator */}
          {calcTab === 'payroll' && (() => {
            const basic = parseFloat(calcBasic) || 0;
            const allow = parseFloat(calcAllow) || 0;
            const otHours = parseFloat(calcOTHours) || 0;
            const otRate = parseFloat(calcOTRate) || 1.5;
            const deduct = parseFloat(calcDeduct) || 0;

            const hourlyBase = basic / 30 / 8;
            const otAmount = hourlyBase * otRate * otHours;
            const gross = basic + allow + otAmount;
            const gosiAmount = calcGosiToggle ? (basic + allow) * 0.0975 : 0;
            const netPayable = Math.max(0, gross - deduct - gosiAmount);

            return (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Inputs Column */}
                <div className="md:col-span-7 p-4 sm:p-5 rounded-2xl bg-[#0F2D4A]/90 border border-white/15 space-y-4 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-white/10 pb-3">
                    <h3 className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5 shrink-0">
                      <Wallet className="w-4 h-4 text-[#E8823A]" />
                      <span>{isAr ? 'بيانات الراتب والأوفرتايم' : 'Payroll Inputs'}</span>
                    </h3>

                    {/* Pre-fill / Search employee combobox */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 w-full sm:w-auto">
                      <span className="text-[11px] font-bold text-amber-300 shrink-0">{isAr ? 'البحث عن موظف للاستيراد:' : 'Search Employee to Import:'}</span>
                      <EmployeeSearchSelector
                        employees={employees}
                        isAr={isAr}
                        onSelect={(emp) => {
                          setCalcBasic(String(emp.basicSalary));
                          setCalcAllow(String(emp.allowances));
                          setCalcDeduct(String(emp.deductions));
                          setCalcOTRate(String(emp.overtimeRate || 1.5));
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                    <div>
                      <label className="text-slate-200 block mb-1.5 font-bold">{isAr ? 'الراتب الأساسي (ر.س)' : 'Basic Salary (SAR)'}</label>
                      <input
                        type="number"
                        value={calcBasic}
                        onChange={(e) => setCalcBasic(e.target.value)}
                        className="w-full bg-[#091E33] border border-white/15 rounded-xl p-2.5 text-white font-mono font-bold text-sm focus:border-[#E8823A]"
                      />
                    </div>

                    <div>
                      <label className="text-slate-200 block mb-1.5 font-bold">{isAr ? 'البدلات والعلاوات (ر.س)' : 'Allowances (SAR)'}</label>
                      <input
                        type="number"
                        value={calcAllow}
                        onChange={(e) => setCalcAllow(e.target.value)}
                        className="w-full bg-[#091E33] border border-white/15 rounded-xl p-2.5 text-white font-mono font-bold text-sm focus:border-[#E8823A]"
                      />
                    </div>

                    <div>
                      <label className="text-slate-200 block mb-1.5 font-bold">{isAr ? 'ساعات الأوفرتايم (شهرياً)' : 'Monthly OT Hours'}</label>
                      <input
                        type="number"
                        value={calcOTHours}
                        onChange={(e) => setCalcOTHours(e.target.value)}
                        className="w-full bg-[#091E33] border border-white/15 rounded-xl p-2.5 text-white font-mono font-bold text-sm focus:border-[#E8823A]"
                      />
                    </div>

                    <div>
                      <label className="text-slate-200 block mb-1.5 font-bold">{isAr ? 'معدل أجر الإضافي' : 'OT Rate Multiplier'}</label>
                      <select
                        value={calcOTRate}
                        onChange={(e) => setCalcOTRate(e.target.value)}
                        className="w-full bg-[#091E33] border border-white/15 rounded-xl p-2.5 text-white font-mono font-bold text-sm focus:border-[#E8823A]"
                      >
                        <option value="1.5">1.5× ({isAr ? 'ساعات اعتيادية' : 'Standard OT'})</option>
                        <option value="2.0">2.0× ({isAr ? 'عطل رسمية/أعياد' : 'Holidays/Weekend'})</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-200 block mb-1.5 font-bold">{isAr ? 'الخصومات والسلف (ر.س)' : 'Deductions (SAR)'}</label>
                      <input
                        type="number"
                        value={calcDeduct}
                        onChange={(e) => setCalcDeduct(e.target.value)}
                        className="w-full bg-[#091E33] border border-white/15 rounded-xl p-2.5 text-white font-mono font-bold text-sm focus:border-[#E8823A]"
                      />
                    </div>

                    <div className="flex items-center pt-2 sm:pt-6">
                      <label className="flex items-center gap-2 cursor-pointer text-slate-200 text-xs font-bold">
                        <input
                          type="checkbox"
                          checked={calcGosiToggle}
                          onChange={(e) => setCalcGosiToggle(e.target.checked)}
                          className="w-4 h-4 accent-[#E8823A] rounded cursor-pointer shrink-0"
                        />
                        <span>{isAr ? 'خصم التأمينات الاجتماعية (GOSI 9.75%)' : 'Deduct GOSI (9.75%)'}</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Calculation Output Card */}
                <div className="md:col-span-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#091E33] via-[#0E2D4A] to-[#091E33] border border-white/20 space-y-4 shadow-xl text-xs relative overflow-hidden">
                  <h3 className="font-black text-white text-sm border-b border-white/10 pb-2 flex items-center justify-between">
                    <span>{isAr ? 'تفاصيل الحساب والتصفية' : 'Payroll Calculation Summary'}</span>
                    <span className="text-[10px] text-amber-300 font-mono font-bold">{currencySymbol}</span>
                  </h3>

                  <div className="space-y-2 text-slate-300">
                    <div className="flex justify-between items-center">
                      <span>{isAr ? 'أجر الساعة الأساسي:' : 'Hourly Base Rate:'}</span>
                      <span className="font-mono text-white font-bold">{fmt2(hourlyBase)} {currencySymbol}/ساعة</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>{isAr ? 'إجمالي أجر الأوفرتايم:' : 'Overtime Value:'}</span>
                      <span className="font-mono text-amber-300 font-bold">+ {fmt2(otAmount)} {currencySymbol}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>{isAr ? 'الراتب الشامل قبل الخصم:' : 'Gross Total:'}</span>
                      <span className="font-mono text-sky-300 font-bold">{fmt2(gross)} {currencySymbol}</span>
                    </div>

                    {calcGosiToggle && (
                      <div className="flex justify-between items-center text-rose-300">
                        <span>{isAr ? 'خصم التأمينات (GOSI 9.75%):' : 'GOSI Contribution:'}</span>
                        <span className="font-mono font-bold">- {fmt2(gosiAmount)} {currencySymbol}</span>
                      </div>
                    )}

                    {deduct > 0 && (
                      <div className="flex justify-between items-center text-rose-300">
                        <span>{isAr ? 'الخصومات والسلف:' : 'Deductions:'}</span>
                        <span className="font-mono font-bold">- {fmt2(deduct)} {currencySymbol}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#051322] border border-emerald-500/30 text-center space-y-1 shadow-inner">
                    <span className="text-[11px] text-slate-300 font-bold block">{isAr ? 'صافي الراتب المستحق للصرف:' : 'Net Payable Salary:'}</span>
                    <p className="text-xl sm:text-2xl font-black text-emerald-400 font-mono tracking-tight flex items-center justify-center gap-1.5">
                      <span>{fmt2(netPayable)}</span>
                      <span className="text-xs font-bold text-white">{currencySymbol}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => window.print()}
                    className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow"
                  >
                    <Printer className="w-4 h-4 text-amber-400" />
                    <span>{isAr ? 'طباعة قسيمة الراتب' : 'Print Salary Slip'}</span>
                  </button>
                </div>
              </div>
            );
          })()}

          {/* Tab 2: End-of-Service (EOS) Benefits & Vacation Settlement */}
          {calcTab === 'eos' && (() => {
            const gross = parseFloat(calcSalaryEOS) || 0;
            const yrs = parseFloat(calcYearsEOS) || 0;
            const unusedLeaveDays = parseFloat(calcUnusedLeaveEOS) || 0;

            // Saudi Labor Law EOS Calculation Logic
            let baseEos = 0;
            if (yrs <= 5) {
              baseEos = gross * 0.5 * yrs;
            } else {
              baseEos = gross * 0.5 * 5 + gross * 1.0 * (yrs - 5);
            }

            // Entitlement Ratio based on Reason
            let ratio = 1.0;
            let ratioLabel = isAr ? 'استحقاق كامل (100%)' : 'Full Entitlement (100%)';

            if (calcReasonEOS === 'resignation') {
              if (yrs < 2) {
                ratio = 0;
                ratioLabel = isAr ? 'لا توجد مكافأة (أقل من سنتين)' : 'No EOS (Less than 2 yrs)';
              } else if (yrs >= 2 && yrs < 5) {
                ratio = 1 / 3;
                ratioLabel = isAr ? 'ثلث المكافأة (1/3)' : 'One-third (1/3)';
              } else if (yrs >= 5 && yrs < 10) {
                ratio = 2 / 3;
                ratioLabel = isAr ? 'ثلثا المكافأة (2/3)' : 'Two-thirds (2/3)';
              } else {
                ratio = 1.0;
                ratioLabel = isAr ? 'مكافأة كاملة (100%)' : 'Full EOS (100%)';
              }
            }

            const netEos = baseEos * ratio;
            const dailyRate = gross / 30;
            const leavePayout = dailyRate * unusedLeaveDays;
            const finalEOSClearance = netEos + leavePayout;

            return (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs">
                {/* Inputs Column */}
                <div className="md:col-span-7 p-4 sm:p-5 rounded-2xl bg-[#0F2D4A]/90 border border-white/15 space-y-4 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-white/10 pb-3">
                    <h3 className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5 shrink-0">
                      <Calculator className="w-4 h-4 text-[#E8823A]" />
                      <span>{isAr ? 'بيانات التصفية ونهاية الخدمة' : 'EOS Inputs'}</span>
                    </h3>

                    {/* Pre-fill / Search employee combobox */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 w-full sm:w-auto">
                      <span className="text-[11px] font-bold text-amber-300 shrink-0">{isAr ? 'البحث عن موظف للاستيراد:' : 'Search Employee to Import:'}</span>
                      <EmployeeSearchSelector
                        employees={employees}
                        isAr={isAr}
                        onSelect={(emp) => {
                          const m = computeMetrics(emp);
                          setCalcSalaryEOS(String(m.monthlyGross));
                          setCalcYearsEOS(String(m.yrs.toFixed(1)));
                          setCalcUnusedLeaveEOS(String(m.annualLeaveDaysRemaining.toFixed(1)));
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-slate-200 block mb-1.5 font-bold">{isAr ? 'الراتب الشامل الأخير (ر.س)' : 'Monthly Gross Salary (SAR)'}</label>
                      <input
                        type="number"
                        value={calcSalaryEOS}
                        onChange={(e) => setCalcSalaryEOS(e.target.value)}
                        className="w-full bg-[#091E33] border border-white/15 rounded-xl p-2.5 text-white font-mono font-bold text-sm focus:border-[#E8823A]"
                      />
                    </div>

                    <div>
                      <label className="text-slate-200 block mb-1.5 font-bold">{isAr ? 'مدة الخدمة الإجمالية (بالسنوات)' : 'Total Service Years'}</label>
                      <input
                        type="number"
                        step="0.1"
                        value={calcYearsEOS}
                        onChange={(e) => setCalcYearsEOS(e.target.value)}
                        className="w-full bg-[#091E33] border border-white/15 rounded-xl p-2.5 text-white font-mono font-bold text-sm focus:border-[#E8823A]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-slate-200 block mb-1.5 font-bold">{isAr ? 'سبب انتهاء الخدمة (حسب نظام العمل السعودي)' : 'Reason for Leaving'}</label>
                      <select
                        value={calcReasonEOS}
                        onChange={(e) => setCalcReasonEOS(e.target.value as any)}
                        className="w-full bg-[#091E33] border border-white/15 rounded-xl p-2.5 text-white font-bold text-xs focus:border-[#E8823A]"
                      >
                        <option value="end_contract">{isAr ? 'انتهاء العقد / عدم رغبة أصحاب العمل بالتجديد (استحقاق 100%)' : 'Contract End (100% EOS)'}</option>
                        <option value="resignation">{isAr ? 'استقالة بطلب الموظف (استحقاق حسب السنوات 0-100%)' : 'Resignation (Tiered Entitlement)'}</option>
                        <option value="termination">{isAr ? 'إنهاء الخدمة من قِبل المنشأة بدون أسباب مخلة (100%)' : 'Termination by Company (100%)'}</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-slate-200 block mb-1.5 font-bold">{isAr ? 'رصيد الإجازات السنوية المتبقي (بالأيام)' : 'Unused Annual Leave Days'}</label>
                      <input
                        type="number"
                        value={calcUnusedLeaveEOS}
                        onChange={(e) => setCalcUnusedLeaveEOS(e.target.value)}
                        className="w-full bg-[#091E33] border border-white/15 rounded-xl p-2.5 text-white font-mono font-bold text-sm focus:border-[#E8823A]"
                      />
                    </div>
                  </div>
                </div>

                {/* EOS Calculation Output Card */}
                <div className="md:col-span-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#091E33] via-[#0E2D4A] to-[#091E33] border border-white/20 space-y-4 shadow-xl relative overflow-hidden">
                  <h3 className="font-black text-white text-sm border-b border-white/10 pb-2 flex items-center justify-between">
                    <span>{isAr ? 'نتيجة مخالصة نهاية الخدمة' : 'EOS Settlement Voucher'}</span>
                    <span className="text-[10px] text-amber-300 font-mono font-bold">{currencySymbol}</span>
                  </h3>

                  <div className="space-y-2 text-slate-300">
                    <div className="flex justify-between items-center">
                      <span>{isAr ? 'المكافأة الأساسية قبل النسبة:' : 'Base EOS Benefit:'}</span>
                      <span className="font-mono text-white font-bold">{fmt2(baseEos)} {currencySymbol}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>{isAr ? 'نسبة الاستحقاق حسب السبب:' : 'Entitlement Ratio:'}</span>
                      <span className="font-mono text-amber-300 font-bold">{ratioLabel}</span>
                    </div>

                    <div className="flex justify-between items-center border-t border-white/10 pt-1.5">
                      <span>{isAr ? 'صافي مكافأة نهاية الخدمة:' : 'Net EOS Amount:'}</span>
                      <span className="font-mono text-sky-300 font-bold">{fmt2(netEos)} {currencySymbol}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span>{isAr ? 'بدل رصيد الإجازات السنوية النقدية:' : 'Unused Leave Cash:'}</span>
                      <span className="font-mono text-emerald-400 font-bold">+ {fmt2(leavePayout)} {currencySymbol}</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#051322] border border-amber-500/30 text-center space-y-1.5 shadow-inner">
                    <span className="text-[11px] text-slate-300 font-bold block">{isAr ? 'إجمالي مبلغ المخالصة والتصفية النهائية:' : 'Total Final Settlement Clearance:'}</span>
                    <p className="text-xl sm:text-2xl font-black text-amber-400 font-mono tracking-tight flex items-center justify-center gap-1.5">
                      <span>{fmt2(finalEOSClearance)}</span>
                      <span className="text-xs font-bold text-white">{currencySymbol}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => window.print()}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#E8823A] to-amber-500 hover:from-[#D6732B] hover:to-amber-600 text-white font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Printer className="w-4 h-4" />
                    <span>{isAr ? 'طباعة نموذج تسوية المستحقات' : 'Print Clearance Voucher'}</span>
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Screen 6: Reports */}
      {activeScreen === 'reports' && (
        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-[#153A5C]/80 border border-white/10 space-y-3">
            <div className="text-xs font-bold text-white border-b border-white/10 pb-1.5">
              {isAr ? 'توزيع الرواتب والتكلفة الشهرية' : 'Monthly Salary Distribution'}
            </div>

            <div className="space-y-2">
              {employees.map((emp) => {
                const m = computeMetrics(emp);
                const pct = Math.min(100, Math.round((m.totalSalary / (totalPayroll || 1)) * 100));
                return (
                  <div key={emp.id} className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>{emp.name} ({DEPARTMENT_CONFIGS[emp.department]?.labelAr})</span>
                      <span className="font-mono text-emerald-400">{fmt(m.totalSalary)} {currencySymbol}</span>
                    </div>
                    <div className="h-2 rounded-full bg-[#0F2D4A] overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#E8823A] to-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Modals for ID Badge, Permits & Safety Clearance */}
      {activeIDModalEmp && (
        <WorkIDCardModal
          employee={activeIDModalEmp}
          companyName={settings.contractorName || 'شركة البناء والتشييد المتقدمة'}
          projectName={settings.projectName || 'مشروع التشييد البرجي'}
          isAr={isAr}
          onClose={() => setActiveIDModalEmp(null)}
        />
      )}

      {activePermitsModalEmp && (
        <WorkPermitModal
          employee={activePermitsModalEmp}
          isAr={isAr}
          onUpdatePermits={handleUpdatePermits}
          onClose={() => setActivePermitsModalEmp(null)}
        />
      )}

      {activeSafetyModalEmp && (
        <SafetyPassModal
          employee={activeSafetyModalEmp}
          companyName={settings.contractorName || 'شركة البناء والتشييد المتقدمة'}
          projectName={settings.projectName || 'مشروع التشييد البرجي'}
          isAr={isAr}
          onUpdateCertificates={handleUpdateCertificates}
          onClose={() => setActiveSafetyModalEmp(null)}
        />
      )}

      {/* Add / Edit Form Modal Sheet */}
      {sheet && (sheet.type === 'add' || sheet.type === 'edit') && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
          <div className="w-full max-w-lg bg-[#0F2D4A] border border-white/20 rounded-t-3xl sm:rounded-2xl p-4 sm:p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h3 className="text-sm font-black text-white">
                {sheet.type === 'add' ? (isAr ? 'إضافة موظف/عامل جديد' : 'Add Staff Member') : (isAr ? 'تعديل بيانات الموظف' : 'Edit Staff Details')}
              </h3>
              <button onClick={() => setSheet(null)} className="p-1 rounded-lg bg-[#153A5C] text-slate-300 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-right" dir={isAr ? 'rtl' : 'ltr'}>
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-200 font-bold block">{isAr ? 'الاسم الثلاثي/الكامل:' : 'Full Name:'}</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder={isAr ? 'الاسم الكامل للعميل أو الموظف' : 'Full Name'}
                  className="w-full bg-[#153A5C] border border-white/15 rounded-xl p-2.5 text-white font-bold focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-200 font-bold block">{isAr ? 'الرقم الوظيفي/الإقامة:' : 'Emp ID / Iqama:'}</label>
                  <input
                    type="text"
                    value={formEmpNo}
                    onChange={(e) => setFormEmpNo(e.target.value)}
                    className="w-full bg-[#153A5C] border border-white/15 rounded-xl p-2.5 text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-200 font-bold block">{isAr ? 'المسمى الوظيفي:' : 'Job Title:'}</label>
                  <input
                    type="text"
                    value={formPosition}
                    onChange={(e) => setFormPosition(e.target.value)}
                    placeholder={isAr ? 'مثال: مهندس موقع / فني حدادة' : 'Job Title'}
                    className="w-full bg-[#153A5C] border border-white/15 rounded-xl p-2.5 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-200 font-bold block">{isAr ? 'القسم / التخصص:' : 'Department:'}</label>
                  <select
                    value={formDepartment}
                    onChange={(e) => setFormDepartment(e.target.value as DepartmentType)}
                    className="w-full bg-[#153A5C] border border-white/15 rounded-xl p-2.5 text-white font-bold focus:border-amber-400 focus:outline-none cursor-pointer"
                  >
                    <option value="engineering">{isAr ? 'قسم الهندسة والتصميم' : 'Engineering'}</option>
                    <option value="surveying">{isAr ? 'قسم المساحة والتخطيط' : 'Surveying'}</option>
                    <option value="management">{isAr ? 'قسم الإدارة والمالية' : 'Management'}</option>
                    <option value="labor_crafts">{isAr ? 'قسم العمالة والفنيين' : 'Craftsmen & Labor'}</option>
                    <option value="safety_qc">{isAr ? 'قسم الجودة والسلامة' : 'Safety & QC'}</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-200 font-bold block">{isAr ? 'حالة الموظف:' : 'Status:'}</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as EmployeeStatus)}
                    className="w-full bg-[#153A5C] border border-white/15 rounded-xl p-2.5 text-white font-bold focus:border-amber-400 focus:outline-none cursor-pointer"
                  >
                    <option value="active">{isAr ? 'نشط (على رأس العمل)' : 'Active'}</option>
                    <option value="on_site">{isAr ? 'في موقع العمل' : 'On Site'}</option>
                    <option value="leave">{isAr ? 'في إجازة' : 'On Leave'}</option>
                    <option value="suspended">{isAr ? 'متوقف / غير نشط' : 'Suspended'}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-200 font-bold block">{isAr ? 'تاريخ الميلاد:' : 'Date of Birth:'}</label>
                  <input
                    type="date"
                    value={formDob}
                    onChange={(e) => setFormDob(e.target.value)}
                    className="w-full bg-[#153A5C] border border-white/15 rounded-xl p-2.5 text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-200 font-bold block">{isAr ? 'عنوان السكن:' : 'Address:'}</label>
                  <input
                    type="text"
                    value={formAddress}
                    onChange={(e) => setFormAddress(e.target.value)}
                    placeholder={isAr ? 'الرياض - حي الملز' : 'e.g. Riyadh - Malaz'}
                    className="w-full bg-[#153A5C] border border-white/15 rounded-xl p-2.5 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-200 font-bold block">{isAr ? 'المهارات المتقنة (مفصولة بفواصل):' : 'Mastered Skills:'}</label>
                <input
                  type="text"
                  value={formSkills}
                  onChange={(e) => setFormSkills(e.target.value)}
                  placeholder={isAr ? 'مثال: إدارة المشاريع, Revit, تشغيل الحفارات' : 'e.g. Project Mgt, Revit'}
                  className="w-full bg-[#153A5C] border border-white/15 rounded-xl p-2.5 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-200 font-bold block">{isAr ? 'رقم التواصل:' : 'Phone:'}</label>
                  <input
                    type="text"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full bg-[#153A5C] border border-white/15 rounded-xl p-2.5 text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-200 font-bold block">{isAr ? 'رقم الطوارئ:' : 'Emergency Contact:'}</label>
                  <input
                    type="text"
                    value={formEmergencyContact}
                    onChange={(e) => setFormEmergencyContact(e.target.value)}
                    className="w-full bg-[#153A5C] border border-white/15 rounded-xl p-2.5 text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-200 font-bold block">{isAr ? 'تاريخ المباشرة (التعيين):' : 'Hire Date:'}</label>
                  <input
                    type="date"
                    value={formHireDate}
                    onChange={(e) => setFormHireDate(e.target.value)}
                    className="w-full bg-[#153A5C] border border-white/15 rounded-xl p-2.5 text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-200 font-bold block">{isAr ? 'تاريخ انتهاء الإقامة/العقد:' : 'Iqama/Contract Expiry:'}</label>
                  <input
                    type="date"
                    value={formIqamaExpiry || formContractExpiry}
                    onChange={(e) => {
                      setFormIqamaExpiry(e.target.value);
                      setFormContractExpiry(e.target.value);
                    }}
                    className="w-full bg-[#153A5C] border border-white/15 rounded-xl p-2.5 text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-200 font-bold block">{isAr ? 'الراتب الأساسي (ر.س):' : 'Basic Salary:'}</label>
                  <input
                    type="number"
                    value={formBasic}
                    onChange={(e) => setFormBasic(e.target.value)}
                    className="w-full bg-[#153A5C] border border-white/15 rounded-xl p-2.5 text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-200 font-bold block">{isAr ? 'البدلات والعلاوات (ر.س):' : 'Allowances:'}</label>
                  <input
                    type="number"
                    value={formAllow}
                    onChange={(e) => setFormAllow(e.target.value)}
                    className="w-full bg-[#153A5C] border border-white/15 rounded-xl p-2.5 text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <button
                onClick={handleSaveEmployee}
                className="w-full py-3 rounded-xl bg-[#E8823A] hover:bg-[#D6732B] text-white font-black text-xs transition-all shadow-lg cursor-pointer mt-2"
              >
                {isAr ? 'حفظ الحقول وتحديث الموظف' : 'Save Staff Details'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Other Sheets (timesheet, eval, doc) */}
      {sheet && sheet.type === 'ts' && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0F2D4A] border border-white/20 rounded-2xl p-5 space-y-3 text-xs">
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <h3 className="font-bold text-white">{isAr ? 'تسجيل دوام يوم' : 'Add Workday Log'}</h3>
              <button onClick={() => setSheet(null)} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            <div>
              <label className="text-slate-300 block mb-1">{isAr ? 'التاريخ:' : 'Date:'}</label>
              <input type="date" value={tsDate} onChange={(e) => setTsDate(e.target.value)} className="w-full bg-[#153A5C] border border-white/10 rounded-xl p-2 text-white font-mono" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-300 block mb-1">{isAr ? 'الساعات:' : 'Hours:'}</label>
                <input type="number" value={tsHours} onChange={(e) => setTsHours(e.target.value)} className="w-full bg-[#153A5C] border border-white/10 rounded-xl p-2 text-white font-mono" />
              </div>
              <div>
                <label className="text-slate-300 block mb-1">{isAr ? 'الأوفر تايم:' : 'OT Hours:'}</label>
                <input type="number" value={tsOvertime} onChange={(e) => setTsOvertime(e.target.value)} className="w-full bg-[#153A5C] border border-white/10 rounded-xl p-2 text-white font-mono" />
              </div>
            </div>
            <div>
              <label className="text-slate-300 block mb-1">{isAr ? 'الملاحظات:' : 'Note:'}</label>
              <input type="text" value={tsNote} onChange={(e) => setTsNote(e.target.value)} className="w-full bg-[#153A5C] border border-white/10 rounded-xl p-2 text-white" />
            </div>
            <button onClick={handleAddTimesheet} className="w-full py-2.5 rounded-xl bg-[#E8823A] text-white font-bold cursor-pointer">{isAr ? 'حفظ السجل' : 'Save Entry'}</button>
          </div>
        </div>
      )}

      {sheet && sheet.type === 'eval' && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0F2D4A] border border-white/20 rounded-2xl p-5 space-y-3 text-xs">
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <h3 className="font-bold text-white">{isAr ? 'إضافة تقييم' : 'Add Evaluation'}</h3>
              <button onClick={() => setSheet(null)} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            <div>
              <label className="text-slate-300 block mb-1">{isAr ? 'ملاحظات التقييم:' : 'Review Notes:'}</label>
              <textarea rows={3} value={evalNotes} onChange={(e) => setEvalNotes(e.target.value)} className="w-full bg-[#153A5C] border border-white/10 rounded-xl p-2 text-white" />
            </div>
            <button onClick={handleAddEval} className="w-full py-2.5 rounded-xl bg-[#E8823A] text-white font-bold cursor-pointer">{isAr ? 'حفظ التقييم' : 'Save Review'}</button>
          </div>
        </div>
      )}

      {sheet && sheet.type === 'doc' && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0F2D4A] border border-white/20 rounded-2xl p-5 space-y-3 text-xs">
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <h3 className="font-bold text-white">{isAr ? 'إضافة مستند' : 'Add Document'}</h3>
              <button onClick={() => setSheet(null)} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
            </div>
            <div>
              <label className="text-slate-300 block mb-1">{isAr ? 'اسم المستند:' : 'Doc Name:'}</label>
              <input type="text" value={docName} onChange={(e) => setDocName(e.target.value)} className="w-full bg-[#153A5C] border border-white/10 rounded-xl p-2 text-white" />
            </div>
            <button onClick={handleAddDoc} className="w-full py-2.5 rounded-xl bg-[#E8823A] text-white font-bold cursor-pointer">{isAr ? 'حفظ المستند' : 'Save Doc'}</button>
          </div>
        </div>
      )}
    </div>
  );
};
