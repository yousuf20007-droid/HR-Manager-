export type DepartmentType = 'engineering' | 'surveying' | 'management' | 'labor_crafts' | 'safety_qc';
export type EmployeeStatus = 'active' | 'on_site' | 'leave' | 'suspended';

export type PermitType = 
  | 'equipment_license' 
  | 'national_id' 
  | 'confined_space' 
  | 'hot_work' 
  | 'heights' 
  | 'high_risk';

export interface WorkPermit {
  id: string;
  title: string;
  type: PermitType;
  permitNo: string;
  issueDate: string;
  expiryDate: string;
  status: 'valid' | 'expired' | 'renewing';
  zone?: string;
}

export interface SafetyCertificate {
  id: string;
  courseName: string;
  issuer: string;
  issueDate: string;
  validUntil: string;
  status: 'valid' | 'expired';
}

export interface EmployeeKPIs {
  overallPerformance: number; // 0-100
  safetyCompliance: number;   // 0-100
  productivity: number;       // 0-100
  attendanceRate: number;     // 0-100
}

export interface EmployeeDocument {
  name: string;
  url: string;
}

export interface TimesheetEntry {
  date: string;
  hours: number;
  overtime: number;
  note?: string;
}

export interface EvaluationEntry {
  date: string;
  rating: number;
  notes: string;
}

export interface EmployeeRecord {
  id: number;
  name: string;
  empNo: string;
  position: string;
  department: DepartmentType;
  status: EmployeeStatus;
  hireDate: string;
  basicSalary: number;
  allowances: number;
  overtimeRate: number;
  deductions: number;
  contractExpiry?: string;
  iqamaExpiry?: string;
  dob?: string;
  phone?: string;
  address?: string;
  skills?: string[];
  kpis?: EmployeeKPIs;
  emergencyContact?: string;
  bankAccount?: string;
  nationality?: string;
  gosiNumber?: string;
  assignedProject?: string;
  documents?: EmployeeDocument[];
  timesheet?: TimesheetEntry[];
  evaluations?: EvaluationEntry[];
  attendance?: Record<string, 'present' | 'absent' | 'late' | 'leave'>;
  workPermits?: WorkPermit[];
  safetyCertificates?: SafetyCertificate[];
  monthlyOvertimeHours?: number;
  leaveDaysUsed?: number;
}

export const DEPARTMENT_CONFIGS: Record<DepartmentType, { id: DepartmentType; labelAr: string; labelEn: string; icon: string; color: string; bg: string }> = {
  engineering: {
    id: 'engineering',
    labelAr: 'قسم الهندسة والتصميم',
    labelEn: 'Engineering & Design',
    icon: 'Building2',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10 border-sky-500/30',
  },
  surveying: {
    id: 'surveying',
    labelAr: 'قسم المساحة والتخطيط',
    labelEn: 'Surveying & Planning',
    icon: 'Compass',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10 border-indigo-500/30',
  },
  management: {
    id: 'management',
    labelAr: 'قسم الإدارة والمالية',
    labelEn: 'Management & Finance',
    icon: 'Briefcase',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/30',
  },
  labor_crafts: {
    id: 'labor_crafts',
    labelAr: 'قسم العمالة والفنيين',
    labelEn: 'Craftsmen & Site Labor',
    icon: 'HardHat',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/30',
  },
  safety_qc: {
    id: 'safety_qc',
    labelAr: 'قسم الجودة والسلامة',
    labelEn: 'Quality & Safety (HSE)',
    icon: 'ShieldCheck',
    color: 'text-teal-400',
    bg: 'bg-teal-500/10 border-teal-500/30',
  },
};

export const STATUS_CONFIGS: Record<EmployeeStatus, { labelAr: string; labelEn: string; color: string; badgeBg: string }> = {
  active: { labelAr: 'نشط (على رأس العمل)', labelEn: 'Active', color: 'text-emerald-400', badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
  on_site: { labelAr: 'في موقع العمل', labelEn: 'On Site', color: 'text-sky-400', badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/40' },
  leave: { labelAr: 'في إجازة', labelEn: 'On Leave', color: 'text-amber-400', badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
  suspended: { labelAr: 'متوقف / غير نشط', labelEn: 'Suspended', color: 'text-rose-400', badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
};
