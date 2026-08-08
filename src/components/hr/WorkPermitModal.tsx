import React, { useState } from 'react';
import { X, Plus, ShieldAlert, CheckCircle2, AlertCircle, Printer, FileCheck, Calendar, MapPin, KeyRound } from 'lucide-react';
import { EmployeeRecord, WorkPermit, PermitType } from '../../types/hr';

interface WorkPermitModalProps {
  employee: EmployeeRecord;
  isAr: boolean;
  onUpdatePermits: (empId: number, permits: WorkPermit[]) => void;
  onClose: () => void;
}

const PERMIT_TYPE_CONFIG: Record<PermitType, { labelAr: string; labelEn: string; icon: string; bg: string }> = {
  equipment_license: {
    labelAr: 'رخصة قيادة وتدريب معدات ثقيلة',
    labelEn: 'Heavy Equipment Operator License',
    icon: 'Truck',
    bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  },
  national_id: {
    labelAr: 'تصريح إقامة / بطاقة هوية وطنية',
    labelEn: 'Residency / National ID Permit',
    icon: 'CreditCard',
    bg: 'bg-[#E8823A]/20 text-[#E8823A] border-[#E8823A]/40',
  },
  confined_space: {
    labelAr: 'تصريح دخول الأماكن المحصورة',
    labelEn: 'Confined Space Access Permit',
    icon: 'ShieldAlert',
    bg: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
  },
  hot_work: {
    labelAr: 'تصريح الأعمال الساخنة واللحام',
    labelEn: 'Hot Work & Welding Permit',
    icon: 'Flame',
    bg: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
  },
  heights: {
    labelAr: 'تصريح العمل على ارتفاعات والسقالات',
    labelEn: 'Working at Heights & Scaffolding',
    icon: 'ArrowUpCircle',
    bg: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
  },
  high_risk: {
    labelAr: 'تصريح مناطق الخطورة العالية',
    labelEn: 'High-Risk Zone Access Permit',
    icon: 'AlertTriangle',
    bg: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  },
};

export const WorkPermitModal: React.FC<WorkPermitModalProps> = ({
  employee,
  isAr,
  onUpdatePermits,
  onClose,
}) => {
  const permits = employee.workPermits || [];
  const [showAddForm, setShowAddForm] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [permitType, setPermitType] = useState<PermitType>('equipment_license');
  const [permitNo, setPermitNo] = useState(`PRM-${Math.floor(10000 + Math.random() * 90000)}`);
  const [issueDate, setIssueDate] = useState(new Date().toISOString().slice(0, 10));
  const [expiryDate, setExpiryDate] = useState(
    new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
  );
  const [zone, setZone] = useState('');

  const handleAddPermit = () => {
    if (!title.trim()) return;

    const newPermit: WorkPermit = {
      id: `prm_${Date.now()}`,
      title: title.trim(),
      type: permitType,
      permitNo: permitNo.trim(),
      issueDate,
      expiryDate,
      status: new Date(expiryDate).getTime() > Date.now() ? 'valid' : 'expired',
      zone: zone.trim() || (isAr ? 'كافة مواقع المشروع' : 'All Project Sites'),
    };

    onUpdatePermits(employee.id, [...permits, newPermit]);
    setShowAddForm(false);
    setTitle('');
    setZone('');
  };

  const handlePrintPermit = (prm: WorkPermit) => {
    const printWin = window.open('', '_blank');
    if (!printWin) return;

    printWin.document.write(`
      <html dir="${isAr ? 'rtl' : 'ltr'}">
      <head>
        <title>Work Permit Pass - ${prm.title}</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, sans-serif; padding: 30px; background: #f8fafc; color: #0F2D4A; }
          .permit-box {
            border: 3px double #0F2D4A;
            border-radius: 12px;
            padding: 24px;
            background: #fff;
            max-width: 600px;
            margin: auto;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          }
          .header { text-align: center; border-bottom: 2px solid #E8823A; padding-bottom: 12px; margin-bottom: 20px; }
          .header h1 { margin: 0; font-size: 20px; color: #0F2D4A; }
          .header p { margin: 4px 0 0; font-size: 12px; color: #64748b; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 13px; }
          .label { color: #64748b; font-size: 11px; }
          .val { font-weight: bold; color: #0F2D4A; }
          .badge {
            display: inline-block;
            padding: 6px 12px;
            background: #10b981;
            color: #fff;
            font-weight: bold;
            border-radius: 6px;
            font-size: 12px;
            margin-top: 15px;
          }
          .footer { margin-top: 25px; border-top: 1px solid #e2e8f0; pt-10px; font-size: 11px; display: flex; justify-content: space-between; }
        </style>
      </head>
      <body>
        <div class="permit-box">
          <div class="header">
            <h1>تصريح عمل ورخصة موقعية معتمدة</h1>
            <p>المشروع: مشروع التشييد والبناء · شركة البناء والتشييد المتقدمة</p>
          </div>

          <div style="text-align: center; margin-bottom: 15px;">
            <span style="font-size: 16px; font-weight: 900; color: #E8823A;">${prm.title}</span>
            <div style="font-family: monospace; font-weight: bold; font-size: 12px; margin-top: 2px;">رقم التصريح: ${prm.permitNo}</div>
          </div>

          <div class="grid">
            <div>
              <div class="label">اسم الموظف / العامل:</div>
              <div class="val">${employee.name}</div>
            </div>
            <div>
              <div class="label">الرقم الوظيفي:</div>
              <div class="val">${employee.empNo}</div>
            </div>
            <div>
              <div class="label">المسمى الوظيفي:</div>
              <div class="val">${employee.position}</div>
            </div>
            <div>
              <div class="label">منطقة العمل/الموقع المصرح به:</div>
              <div class="val">${prm.zone || 'جميع مناطق الموقع'}</div>
            </div>
            <div>
              <div class="label">تاريخ الإصدار:</div>
              <div class="val">${prm.issueDate}</div>
            </div>
            <div>
              <div class="label">تاريخ الانتهاء:</div>
              <div class="val">${prm.expiryDate}</div>
            </div>
          </div>

          <div style="text-align: center;">
            <div class="badge">مُصرح بالعمل - الحالة سارية</div>
          </div>

          <div class="footer">
            <div>توقيع مسؤول السلامة بالموقع: ..........................</div>
            <div>توقيع المهندس المقيم: ..........................</div>
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
      <div className="w-full max-w-lg bg-[#0F2D4A] border border-white/20 rounded-3xl p-5 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#E8823A]/20 border border-[#E8823A]/40 flex items-center justify-center text-[#E8823A]">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">
                {isAr ? 'تصاريح العمل ورخص الموقع' : 'Work Permits & Site Clearance'}
              </h3>
              <p className="text-[11px] text-[#8FC1DD]">
                {employee.name} ({employee.empNo})
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

        {/* Existing Permits List */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-[#E8823A]" />
              <span>{isAr ? 'التصاريح والرخص المسجلة' : 'Issued Work Permits'} ({permits.length})</span>
            </h4>

            {!showAddForm && (
              <button
                onClick={() => setShowAddForm(true)}
                className="px-3 py-1.5 rounded-xl bg-[#E8823A] hover:bg-[#D6732B] text-white text-xs font-bold transition-all flex items-center gap-1 shadow cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isAr ? 'إصدار تصريح جديد' : 'Issue Permit'}</span>
              </button>
            )}
          </div>

          {permits.length === 0 && !showAddForm && (
            <div className="p-6 rounded-2xl bg-[#153A5C]/50 border border-dashed border-white/15 text-center space-y-2">
              <AlertCircle className="w-8 h-8 text-amber-400/60 mx-auto" />
              <p className="text-xs text-slate-300 font-medium">
                {isAr ? 'لم يتم إصدار أي تصريح عمل لهذا الموظف حتى الآن' : 'No work permits issued for this staff member yet.'}
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="px-3 py-1.5 rounded-xl bg-[#E8823A] text-white text-xs font-bold cursor-pointer"
              >
                {isAr ? 'إصدار تصريح عمل الآن' : 'Issue Permit Now'}
              </button>
            </div>
          )}

          {permits.map((prm) => {
            const cfg = PERMIT_TYPE_CONFIG[prm.type] || PERMIT_TYPE_CONFIG.equipment_license;
            const isExpired = new Date(prm.expiryDate).getTime() < Date.now();

            return (
              <div
                key={prm.id}
                className="p-3.5 rounded-2xl bg-[#153A5C]/80 border border-white/10 space-y-2 shadow-md hover:border-[#E8823A]/40 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border inline-block mb-1 ${cfg.bg}`}>
                      {cfg.labelAr}
                    </span>
                    <h5 className="text-xs font-black text-white leading-tight">{prm.title}</h5>
                    <p className="text-[10px] font-mono text-[#8FC1DD]">
                      {isAr ? 'رقم التصريح:' : 'Permit #:'} {prm.permitNo}
                    </p>
                  </div>

                  <div className="text-left shrink-0">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                        isExpired
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}
                    >
                      {isExpired ? (isAr ? 'منتهي' : 'Expired') : (isAr ? 'ساري' : 'Valid')}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-300 pt-1 border-t border-white/10">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#E8823A]" />
                    <span className="truncate">{prm.zone || (isAr ? 'جميع المناطق' : 'All Zones')}</span>
                  </div>
                  <div className="flex items-center gap-1 justify-end font-mono">
                    <Calendar className="w-3 h-3 text-sky-400" />
                    <span>{prm.expiryDate}</span>
                  </div>
                </div>

                <div className="pt-1 flex justify-end">
                  <button
                    onClick={() => handlePrintPermit(prm)}
                    className="px-2.5 py-1 rounded-lg bg-[#0F2D4A] hover:bg-[#1A456E] border border-white/15 text-sky-300 hover:text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Printer className="w-3 h-3" />
                    <span>{isAr ? 'طباعة التصريح' : 'Print Permit'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Permit Form */}
        {showAddForm && (
          <div className="p-4 rounded-2xl bg-[#0B2238] border border-[#E8823A]/40 space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h4 className="font-extrabold text-[#E8823A] text-xs">
                {isAr ? 'نموذج إصدار تصريح عمل/رخصة قيادة جديد' : 'New Permit Issuance Form'}
              </h4>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
            </div>

            <div>
              <label className="text-slate-300 block mb-1">{isAr ? 'عنوان التصريح / الترخيص:' : 'Permit Title:'}</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={isAr ? 'مثال: تصريح تشغيل الكرين والرافعات الشوكية' : 'e.g. Forklift Operation License'}
                className="w-full bg-[#153A5C] border border-white/15 rounded-xl p-2.5 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-300 block mb-1">{isAr ? 'نوع التصريح:' : 'Permit Category:'}</label>
                <select
                  value={permitType}
                  onChange={(e) => setPermitType(e.target.value as PermitType)}
                  className="w-full bg-[#153A5C] border border-white/15 rounded-xl p-2.5 text-white"
                >
                  <option value="equipment_license">{isAr ? 'رخصة قيادة معدات' : 'Equipment Operator'}</option>
                  <option value="confined_space">{isAr ? 'تصريح أماكن محصورة' : 'Confined Space'}</option>
                  <option value="hot_work">{isAr ? 'تصريح أعمال ساخنة ولحام' : 'Hot Work'}</option>
                  <option value="heights">{isAr ? 'تصريح عمل على ارتفاعات' : 'Heights & Scaffolding'}</option>
                  <option value="high_risk">{isAr ? 'تصريح مناطق خطرة' : 'High Risk'}</option>
                  <option value="national_id">{isAr ? 'بطاقة إقامة / هوية' : 'Residency Pass'}</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">{isAr ? 'رقم التصريح:' : 'Permit No:'}</label>
                <input
                  type="text"
                  value={permitNo}
                  onChange={(e) => setPermitNo(e.target.value)}
                  className="w-full bg-[#153A5C] border border-white/15 rounded-xl p-2.5 text-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-300 block mb-1">{isAr ? 'الموقع المصرح به / المنطقة:' : 'Allowed Site/Zone:'}</label>
              <input
                type="text"
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                placeholder={isAr ? 'مثال: المنطقة الشرقية - برج A والطابق الأخير' : 'e.g. Zone A - Tower Roof'}
                className="w-full bg-[#153A5C] border border-white/15 rounded-xl p-2.5 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-300 block mb-1">{isAr ? 'تاريخ الإصدار:' : 'Issue Date:'}</label>
                <input
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="w-full bg-[#153A5C] border border-white/15 rounded-xl p-2.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-slate-300 block mb-1">{isAr ? 'تاريخ الانتهاء:' : 'Expiry Date:'}</label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full bg-[#153A5C] border border-white/15 rounded-xl p-2.5 text-white font-mono"
                />
              </div>
            </div>

            <button
              onClick={handleAddPermit}
              className="w-full py-3 rounded-xl bg-[#E8823A] hover:bg-[#D6732B] text-white font-black text-xs transition-all shadow-lg cursor-pointer mt-2"
            >
              {isAr ? 'اعتماد وإصدار التصريح' : 'Issue Work Permit'}
            </button>
          </div>
        )}

        <div className="pt-2 text-right">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#153A5C] hover:bg-[#1E4A75] text-slate-300 text-xs font-bold cursor-pointer"
          >
            {isAr ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
