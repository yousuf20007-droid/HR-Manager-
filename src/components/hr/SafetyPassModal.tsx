import React, { useState } from 'react';
import { X, ShieldCheck, Award, CheckCircle2, AlertTriangle, Plus, Printer, BookOpen, ShieldAlert } from 'lucide-react';
import { EmployeeRecord, SafetyCertificate } from '../../types/hr';

interface SafetyPassModalProps {
  employee: EmployeeRecord;
  companyName: string;
  projectName: string;
  isAr: boolean;
  onUpdateCertificates: (empId: number, certs: SafetyCertificate[]) => void;
  onClose: () => void;
}

export const SafetyPassModal: React.FC<SafetyPassModalProps> = ({
  employee,
  companyName,
  projectName,
  isAr,
  onUpdateCertificates,
  onClose,
}) => {
  const certs = employee.safetyCertificates || [
    {
      id: 'cert_1',
      courseName: 'دورة السلامة والصحة المهنية OSHA 30-Hour',
      issuer: 'المعهد السعودي للسلامة والصحة المهنية',
      issueDate: '2025-01-15',
      validUntil: '2027-01-15',
      status: 'valid',
    },
    {
      id: 'cert_2',
      courseName: 'شهادة الإسعافات الأولية وتدريب الطوارئ بالموقع',
      issuer: 'الهلال الأحمر السعودي',
      issueDate: '2025-05-10',
      validUntil: '2026-05-10',
      status: 'valid',
    },
  ];

  const [showAdd, setShowAdd] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [issuer, setIssuer] = useState('');
  const [issueDate, setIssueDate] = useState(new Date().toISOString().slice(0, 10));
  const [validUntil, setValidUntil] = useState(
    new Date(Date.now() + 365 * 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
  );

  const hasExpiredCerts = certs.some((c) => new Date(c.validUntil).getTime() < Date.now());
  const isFullyQualified = certs.length > 0 && !hasExpiredCerts;

  const handleAddCert = () => {
    if (!courseName.trim()) return;

    const newCert: SafetyCertificate = {
      id: `cert_${Date.now()}`,
      courseName: courseName.trim(),
      issuer: issuer.trim() || (isAr ? 'مركز تدريب أمن والسلامة' : 'HSE Training Center'),
      issueDate,
      validUntil,
      status: new Date(validUntil).getTime() > Date.now() ? 'valid' : 'expired',
    };

    onUpdateCertificates(employee.id, [...certs, newCert]);
    setShowAdd(false);
    setCourseName('');
    setIssuer('');
  };

  const handlePrintSafetyBadge = () => {
    const printWin = window.open('', '_blank');
    if (!printWin) return;

    printWin.document.write(`
      <html dir="${isAr ? 'rtl' : 'ltr'}">
      <head>
        <title>Safety Pass - ${employee.name}</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, sans-serif; padding: 25px; background: #064e3b; color: #fff; }
          .badge-card {
            width: 85.6mm;
            height: 120mm;
            border: 3px solid #10b981;
            border-radius: 12px;
            padding: 12px;
            background: linear-gradient(180deg, #022c22 0%, #064e3b 100%);
            box-sizing: border-box;
            margin: auto;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .title { font-size: 11px; font-weight: 900; color: #6ee7b7; text-transform: uppercase; }
          .company { font-size: 9px; color: #a7f3d0; margin-bottom: 8px; }
          .photo { width: 55px; height: 55px; border-radius: 50%; background: #10b981; margin: 0 auto; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: bold; border: 2px solid #fff; }
          .emp-name { font-size: 12px; font-weight: 900; color: #fff; margin-top: 6px; }
          .emp-id { font-size: 9px; font-mono; color: #6ee7b7; }
          .status-seal {
            background: #10b981;
            color: #022c22;
            font-weight: 900;
            font-size: 10px;
            padding: 6px;
            border-radius: 6px;
            margin: 8px 0;
            text-transform: uppercase;
          }
          .certs-list { font-size: 7.5px; text-align: right; color: #d1fae5; line-height: 1.4; border-top: 1px solid rgba(255,255,255,0.2); pt-4px; }
        </style>
      </head>
      <body>
        <div class="badge-card">
          <div>
            <div class="title">بطاقة أمن وسلامة ودخول الموقع</div>
            <div class="company">${companyName} · ${projectName}</div>
          </div>

          <div>
            <div class="photo">${employee.name.slice(0, 2)}</div>
            <div class="emp-name">${employee.name}</div>
            <div class="emp-id">ID: ${employee.empNo} | ${employee.position}</div>
          </div>

          <div class="status-seal">
            ✅ مصرح بالدخول لكافة مناطق المشروع
          </div>

          <div class="certs-list">
            <b>الكورسات والشهادات المعتمدة:</b>
            ${certs.map((c) => `<div>• ${c.courseName} (حتى ${c.validUntil})</div>`).join('')}
          </div>

          <div style="font-size: 7px; opacity: 0.8; margin-top: 4px;">
            HSE Department Approved Badge
          </div>
        </div>
      </body>
      </html>
    `);
    printWin.document.close();
    printWin.focus();
    printWin.print();
  };

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
    >
      <div className="w-full max-w-lg bg-[#0F2D4A] border border-emerald-500/30 rounded-3xl p-5 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">
                {isAr ? 'بطاقة أمن وسلامة ودخول الموقع (HSE Pass)' : 'Site Entry Safety Clearance'}
              </h3>
              <p className="text-[11px] text-[#8FC1DD]">
                {employee.name} · {employee.position}
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

        {/* Site Clearance Status Seal */}
        <div
          className={`p-4 rounded-2xl border-2 flex items-center justify-between gap-3 shadow-lg ${
            isFullyQualified
              ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300'
              : 'bg-amber-950/60 border-amber-500/60 text-amber-300'
          }`}
        >
          <div className="flex items-center gap-3">
            {isFullyQualified ? (
              <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-amber-400 shrink-0" />
            )}
            <div>
              <h4 className="text-xs font-black uppercase tracking-wide text-white">
                {isFullyQualified
                  ? isAr ? 'مُصرح بدخول كافة مواقع العمل والمشروع' : 'AUTHORIZED FOR SITE ENTRY'
                  : isAr ? 'غير مكتمل - يتطلب تجديد دورات السلامة' : 'SAFETY RE-CERTIFICATION REQUIRED'}
              </h4>
              <p className="text-[10px] opacity-90 leading-snug">
                {isFullyQualified
                  ? isAr ? 'حاصل على كافة الدورات وشروط أمن والسلامة المهنية SBC/OSHA' : 'Fully certified with OSHA & SBC Building Code requirements'
                  : isAr ? 'يلزم استكمال أو تجديد شهادة السلامة للدخول' : 'Please update or renew safety courses'}
              </p>
            </div>
          </div>
        </div>

        {/* Certified Safety Courses List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'الكورسات وشهادات السلامة المسجلة' : 'Safety Certifications'} ({certs.length})</span>
            </h4>

            {!showAdd && (
              <button
                onClick={() => setShowAdd(true)}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1 shadow cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isAr ? 'إضافة شهادة سلامة' : 'Add Cert'}</span>
              </button>
            )}
          </div>

          {certs.map((c) => {
            const isExp = new Date(c.validUntil).getTime() < Date.now();
            return (
              <div
                key={c.id}
                className="p-3.5 rounded-2xl bg-[#153A5C]/80 border border-white/10 space-y-1 shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h5 className="text-xs font-bold text-white leading-tight">{c.courseName}</h5>
                    <p className="text-[10px] text-[#8FC1DD]">{isAr ? 'الجهة المانحة:' : 'Issuer:'} {c.issuer}</p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono shrink-0 ${
                      isExp ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}
                  >
                    {isExp ? (isAr ? 'منتهية' : 'Expired') : (isAr ? 'سارية' : 'Valid')}
                  </span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-1 border-t border-white/10">
                  <span>{isAr ? 'تاريخ الدورة:' : 'Issued:'} {c.issueDate}</span>
                  <span>{isAr ? 'صالحة حتى:' : 'Valid Until:'} {c.validUntil}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Certificate Form */}
        {showAdd && (
          <div className="p-4 rounded-2xl bg-[#03231B] border border-emerald-500/40 space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h4 className="font-extrabold text-emerald-400 text-xs">
                {isAr ? 'تسجيل شهادة/دورة سلامة جديدة' : 'Add New Safety Course Certification'}
              </h4>
              <button
                onClick={() => setShowAdd(false)}
                className="text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
            </div>

            <div>
              <label className="text-slate-300 block mb-1">{isAr ? 'اسم دورة السلامة/الكورس:' : 'Course Name:'}</label>
              <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder={isAr ? 'مثال: دورة السلامة في مواقع التشييد SBC' : 'e.g. OSHA Construction Safety'}
                className="w-full bg-[#153A5C] border border-white/15 rounded-xl p-2.5 text-white"
              />
            </div>

            <div>
              <label className="text-slate-300 block mb-1">{isAr ? 'الجهة المانحة للشهادة:' : 'Issuer / Provider:'}</label>
              <input
                type="text"
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                placeholder={isAr ? 'مثال: الهيئة السعودية للمهندسين / OSHA' : 'e.g. OSHA Training Institute'}
                className="w-full bg-[#153A5C] border border-white/15 rounded-xl p-2.5 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-300 block mb-1">{isAr ? 'تاريخ الحصول عليها:' : 'Issue Date:'}</label>
                <input
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="w-full bg-[#153A5C] border border-white/15 rounded-xl p-2.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-slate-300 block mb-1">{isAr ? 'صالحة لغاية:' : 'Valid Until:'}</label>
                <input
                  type="date"
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                  className="w-full bg-[#153A5C] border border-white/15 rounded-xl p-2.5 text-white font-mono"
                />
              </div>
            </div>

            <button
              onClick={handleAddCert}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-all shadow-lg cursor-pointer mt-2"
            >
              {isAr ? 'حفظ واعتلاء شهادة السلامة' : 'Save Safety Certificate'}
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={handlePrintSafetyBadge}
            className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{isAr ? 'طباعة بطاقة أمن وسلامة الدخول للموقع' : 'Print Safety Pass'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-[#153A5C] hover:bg-[#1E4A75] text-slate-300 text-xs font-bold cursor-pointer"
          >
            {isAr ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
