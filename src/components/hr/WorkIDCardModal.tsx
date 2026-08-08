import React from 'react';
import { X, Printer, QrCode, Building2, ShieldCheck, UserCheck, Phone, MapPin, Calendar, Briefcase } from 'lucide-react';
import { EmployeeRecord, DEPARTMENT_CONFIGS, STATUS_CONFIGS } from '../../types/hr';

interface WorkIDCardModalProps {
  employee: EmployeeRecord;
  companyName: string;
  projectName: string;
  isAr: boolean;
  onClose: () => void;
}

const AVA_GRADIENTS = [
  'linear-gradient(135deg, #FFB25E, #FF7A3D)',
  'linear-gradient(135deg, #6EC3FF, #4C7EF3)',
  'linear-gradient(135deg, #3ED8A3, #1FA37E)',
  'linear-gradient(135deg, #F2C14E, #D89B1F)',
  'linear-gradient(135deg, #FF8FA3, #E85D7A)',
];

export const WorkIDCardModal: React.FC<WorkIDCardModalProps> = ({
  employee,
  companyName,
  projectName,
  isAr,
  onClose,
}) => {
  const deptConfig = DEPARTMENT_CONFIGS[employee.department] || DEPARTMENT_CONFIGS.engineering;
  const statusConfig = STATUS_CONFIGS[employee.status] || STATUS_CONFIGS.active;
  const grad = AVA_GRADIENTS[employee.id % AVA_GRADIENTS.length];

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase();
  };

  const getAge = (dob?: string) => {
    if (!dob) return null;
    const diff = new Date().getTime() - new Date(dob).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  };

  const handlePrint = () => {
    const printWin = window.open('', '_blank');
    if (!printWin) return;

    printWin.document.write(`
      <html dir="${isAr ? 'rtl' : 'ltr'}">
      <head>
        <title>Work ID Card - ${employee.name}</title>
        <style>
          @page { size: 85.6mm 54mm; margin: 0; }
          * { box-sizing: border-box; }
          body { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; background: #ffffff; color: #0F2D4A; }
          a { color: inherit; text-decoration: none; }
          .card-container {
            width: 85.6mm;
            height: 54mm;
            padding: 10px 12px;
            background: linear-gradient(135deg, #0A2239 0%, #113459 100%);
            color: #ffffff;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            overflow: hidden;
            border-radius: 0;
            border: 1.5px solid #E8823A;
          }
          .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.25); padding-bottom: 4px; }
          .company { font-size: 11px; font-weight: 900; color: #E8823A; letter-spacing: 0.2px; }
          .badge-title { font-size: 8.5px; color: #8FC1DD; font-weight: bold; }
          .header-tag { font-size: 8px; font-weight: 900; background: #E8823A; color: #ffffff; padding: 2.5px 8px; border-radius: 4px; }
          .content { display: flex; gap: 10px; align-items: center; margin-top: 4px; flex: 1; }
          .avatar { width: 54px; height: 60px; border-radius: 8px; background: ${grad}; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 18px; font-weight: 900; color: #ffffff; border: 2px solid #E8823A; flex-shrink: 0; box-shadow: 0 2px 6px rgba(0,0,0,0.3); }
          .details { flex: 1; min-width: 0; font-size: 9px; line-height: 1.35; }
          .emp-name { font-size: 12.5px; font-weight: 900; color: #ffffff; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
          .emp-title { color: #8FC1DD; font-weight: 800; font-size: 9.5px; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
          .row { margin-top: 2px; color: #e2e8f0; display: flex; gap: 6px; font-size: 8.5px; }
          .row b { color: #ffffff; min-width: 58px; font-weight: bold; }
          .footer { font-size: 8px; font-weight: 600; display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed rgba(255,255,255,0.25); padding-top: 4px; color: #cbd5e1; }
          .qr { width: 30px; height: 30px; background: #ffffff; padding: 2px; border-radius: 4px; }
        </style>
      </head>
      <body>
        <div class="card-container">
          <div class="header">
            <div>
              <div class="company">${companyName}</div>
              <div class="badge-title">${projectName}</div>
            </div>
            <div class="header-tag">بطاقة عمل رسمية</div>
          </div>
          <div class="content">
            <div class="avatar">
              <span>${getInitials(employee.name)}</span>
            </div>
            <div class="details">
              <div class="emp-name">${employee.name}</div>
              <div class="emp-title">${employee.position}</div>
              <div class="row"><b>الرقم الوظيفي:</b> ${employee.empNo}</div>
              <div class="row"><b>القسم:</b> ${deptConfig.labelAr}</div>
              ${employee.phone ? `<div class="row"><b>الجوال:</b> <span style="direction: ltr; display: inline-block;">${employee.phone}</span></div>` : ''}
              ${employee.address ? `<div class="row"><b>السكن:</b> ${employee.address}</div>` : ''}
            </div>
          </div>
          <div class="footer">
            <div>
              <div>تاريخ الإصدار: ${employee.hireDate}</div>
              <div>الحالة: ${statusConfig.labelAr}</div>
            </div>
            <div>
              <svg class="qr" viewBox="0 0 24 24"><path fill="#000" d="M2,2H10V10H2V2M4,4V8H8V4H4M11,2H13V4H11V2M14,2H22V10H14V2M16,4V8H20V4H16M2,14H10V22H2V14M4,16V20H8V16H4M11,14H13V16H11V14M14,14H16V16H14V14M19,14H22V16H19V14M11,17H14V19H11V17M17,17H19V19H17V17M14,20H17V22H14V20M19,20H22V22H19V20Z"/></svg>
            </div>
          </div>
        </div>
      </body>
      </html>
    `);
    printWin.document.close();
    printWin.focus();
    printWin.print();
  };

  const age = getAge(employee.dob);

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
    >
      <div className="w-full max-w-md bg-[#0F2D4A] border border-white/20 rounded-3xl p-5 space-y-4 shadow-2xl relative overflow-hidden">
        {/* Top Modal Controls */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#E8823A]/20 border border-[#E8823A]/40 flex items-center justify-center text-[#E8823A]">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">
                {isAr ? 'بطاقة عمل موظف / هوية رقمية' : 'Employee Work ID Badge'}
              </h3>
              <p className="text-[10px] text-[#8FC1DD]">
                {isAr ? 'بطاقة تعريف موقعية رسمية' : 'Official Site ID Card'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-[#153A5C] text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Realistic Interactive Work ID Card Preview */}
        <div
          dir={isAr ? 'rtl' : 'ltr'}
          className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#0B2238] via-[#153A5C] to-[#0A1A2B] border-2 border-[#E8823A]/50 shadow-xl space-y-3 relative overflow-hidden group"
        >
          {/* Subtle Watermark & Background Decor */}
          <div className="absolute -left-10 -bottom-10 w-36 h-36 bg-[#E8823A]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute right-0 top-0 w-24 h-24 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#E8823A]" />
              <div>
                <h4 className="text-xs font-black text-white tracking-wide">{companyName}</h4>
                <p className="text-[9px] text-[#8FC1DD] font-semibold">{projectName}</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-[#E8823A] text-white text-[9px] font-black uppercase tracking-wider shadow">
              {isAr ? 'بطاقة موظف' : 'WORK ID'}
            </span>
          </div>

          {/* Card Body */}
          <div className="flex items-start gap-3.5">
            {/* Avatar & Status Tag underneath */}
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <div
                className="w-16 h-20 rounded-xl flex flex-col items-center justify-center font-black text-white text-lg shadow-lg border-2 border-white/20"
                style={{ background: grad }}
              >
                <span>{getInitials(employee.name)}</span>
                <span className="text-[8px] font-bold text-white/80 mt-1 uppercase tracking-wider">ID CARD</span>
              </div>
              <span className={`px-2 py-0.5 rounded-md text-[9px] font-black border shadow ${statusConfig.badgeBg}`}>
                {statusConfig.labelAr}
              </span>
            </div>

            {/* Info Grid */}
            <div className="space-y-1.5 text-xs min-w-0 flex-1">
              <div>
                <h3 className="text-base sm:text-lg font-black text-white leading-tight">{employee.name}</h3>
                <p className="text-[11px] font-extrabold text-[#8FC1DD] leading-snug">{employee.position}</p>
              </div>

              <div className="pt-1 space-y-1 text-[11px] text-slate-200">
                <div className="flex items-center justify-between border-b border-white/5 pb-1">
                  <span className="text-slate-400">{isAr ? 'الرقم الوظيفي:' : 'Emp ID:'}</span>
                  <span className="font-mono text-amber-300 font-bold">{employee.empNo}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 pb-1">
                  <span className="text-slate-400">{isAr ? 'القسم:' : 'Dept:'}</span>
                  <span className={`font-bold ${deptConfig.color}`}>{deptConfig.labelAr}</span>
                </div>
                {employee.dob && (
                  <div className="flex items-center justify-between border-b border-white/5 pb-1">
                    <span className="text-slate-400">{isAr ? 'الميلاد (العمر):' : 'DOB (Age):'}</span>
                    <span className="font-mono text-white">{employee.dob} ({age} سنة)</span>
                  </div>
                )}
                {employee.address && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">{isAr ? 'السكن:' : 'Address:'}</span>
                    <span className="text-white truncate max-w-[150px]">{employee.address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Certified Skills Badges */}
          {employee.skills && employee.skills.length > 0 && (
            <div className="pt-2 border-t border-white/10">
              <span className="text-[9px] text-[#8FC1DD] font-bold block mb-1">{isAr ? 'المهارات المعتمدة:' : 'Certified Skills:'}</span>
              <div className="flex flex-wrap gap-1">
                {employee.skills.map((sk, i) => (
                  <span key={i} className="px-1.5 py-0.5 rounded bg-white/10 text-white text-[9px] font-medium border border-white/10">
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Card Footer Bar */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-300 font-mono">
            <div>
              <div>{isAr ? 'تاريخ التعيين:' : 'Hired:'} {employee.hireDate}</div>
              {employee.emergencyContact && <div className="text-amber-300 font-bold">{isAr ? 'الطوارئ:' : 'Emergency:'} {employee.emergencyContact}</div>}
            </div>

            <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg shrink-0 shadow">
              <QrCode className="w-5 h-5 text-black" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={handlePrint}
            className="flex-1 py-2.5 rounded-xl bg-[#E8823A] hover:bg-[#D6732B] text-white font-bold text-xs transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{isAr ? 'طباعة بطاقة العمل (85x54mm)' : 'Print ID Card'}</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-[#153A5C] hover:bg-[#1E4A75] text-slate-300 text-xs font-bold transition-all cursor-pointer"
          >
            {isAr ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
