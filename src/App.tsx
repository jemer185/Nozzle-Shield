import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  COATING_STEPS,
  COMPATIBILITIES,
  BRAND_LINKS,
  CoatingStep,
} from "./data";
import ActiveTimer from "./components/ActiveTimer";
import CoatingCalculator from "./components/CoatingCalculator";
import {
  Check,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Info,
  Shield,
  ShoppingBag,
  Heart,
  HelpCircle,
} from "lucide-react";

export default function App() {
  const [lang, setLang] = useState<"th" | "en">("th");
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [selectedNozzleId, setSelectedNozzleId] = useState<string | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const toggleStepCompleted = (stepId: number) => {
    if (completedSteps.includes(stepId)) {
      setCompletedSteps(completedSteps.filter((id) => id !== stepId));
    } else {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const isStepChecked = (stepId: number) => completedSteps.includes(stepId);

  // Calculates overall completion percentage
  const totalSteps = COATING_STEPS.length;
  const progressPercent = Math.round((completedSteps.length / totalSteps) * 100);

  // Quick nozzle specialized tips
  const nozzleTips: Record<string, { th: string; en: string }> = {
    stainless: {
      th: "หัวฉีดสแตนเลสมีข้อดีคือไม่เป็นสนิมและรักษาความสะอาดง่าย แต่การนำความร้อนช้า การเคลือบ Nozzle Shield จะช่วยเร่งการลื่นไหลของพลาสติก และรักษาผิวสัมผัสหัวฉีดให้ใสสะอาดสม่ำเสมอ แนะนำให้ทาบางพิเศษเฉพาะจุดรูฉีด",
      en: "Stainless steel stands out for rust resistance, but has low thermal conductivity. This coating mitigates cooling friction and keeps sticky materials flowing smoothly without drag. Apply sparingly around the nozzle orifice.",
    },
    hardened: {
      th: "หัวฉีดเหล็กชุบแข็งจะมีความหยาบระดับไมโครจากกระบวนการผลิตเหล็ก สารเคลือบนาโนนี้จะแทรกซึมเข้าไปเติมเต็มช่องว่างเพื่อความลื่นขั้นสุด ช่วยคงสภาพพื้นผิวและต้านควันวัสดุคาร์บอนไฟเบอร์หรือทรายแก้วได้ดีขึ้น",
      en: "Hardened steel naturally has micro-pores from machining. The nano coating fills these microscopic ridges, drastically reducing friction and protecting your premium alloy against abrasive carbon fiber and glass filaments.",
    },
    brass: {
      th: "หัวฉีดทองเหลืองยอดนิยม นำความร้อนได้ยอดเยี่ยม แต่พื้นผิวมักเกิดคราบเหนียวสีดำไหม้สะสมและสกปรกง่าย Nozzle Shield จะปิดผนึกทองเหลืองไม่ให้ทำปฏิกิริยากับอุณหภูมิสูงและรักษาหัวฉีดให้ดูใหม่วาวเสมอ",
      en: "Standard Brass nozzles have exceptional thermal performance but tarnish quickly with dark, burnt plastic blobs. Our shield seals the brass to prevent oxidization at high temperatures, preserving that high-luster factory finish.",
    },
    filaments: {
      th: "สำหรับเส้นที่มีปัญหากองพลาสติกสะสม (PETG และ TPU) สารเคลือบนี้คือของเคียงคู่ที่คุณต้องการ! ส่วนคราบตอมตอมที่เกิดจากสารเพิ่มสีใน PLA/ABS จะเช็ดออกง่ายมากเพียงใช้เศษกระดาษรูดออกตอนอุณหภูมิสูง",
      en: "An absolute essential pairing for sticky filaments (TPU, PETG)! Color pigments in PLA/ABS/PC can also degrade and stick. This barrier makes regular maintenance simple: just wipe clean at production temperatures with high-density card.",
    },
  };

  const FAQS = [
    {
      qTh: "1 ขวด สามารถใช้เครือบหัวฉีดได้กี่ครั้ง?",
      qEn: "How many uses can I get out of one bottle?",
      aTh: "ปริมาณน้ำยาสามารถเคลือบหัวฉีดได้ 10-15 หัวฉีด ขึ้นอยู่กับปริมาณที่คุณทา สารเคลือบมีประสิทธิภาพนาน 6 เดือนต่อการทาหนึ่งครั้ง",
      aEn: "One bottle can treat approximately 10-15 nozzles depending on the size and brushing application quantity. Each coating lasts up to 6 months.",
    },
    {
      qTh: "สามารถทาทับบนหัวฉีดที่มีปัญหาคราบไหม้เก่าอยู่แล้วได้หรือไม่?",
      qEn: "Can I apply it on old, used nozzles?",
      aTh: "ได้ แต่ต้องขัดทำความสะอาดขจัดอนุภาคเกร็ดไหม้เดิมออกให้หมดด้วยแปรงลวดทองเหลืองก่อน เพื่อไม่ให้เศษฝุ่นกีดกันแรงยึดเกาะของนาโนเซรามิก",
      aEn: "Yes, but you must first clear off all burnt residue using a brass brush or cleaning sponge before aplicando. Maximum adhesion is only achieved on fully clean surfaces.",
    },
    {
      qTh: "อุณหภูมิใช้งานสูงสุดคือเท่าไหร่?",
      qEn: "What is the absolute maximum working temperature?",
      aTh: "อุณหภูมิใช้งานที่เหมาะสมคือไม่เกิน 280°C และรองรับอุณหภูมิสูงสุดช่วงพีกได้ถึง 300°C หากใช้อุณหภูมิสูงกว่านี้สารเคลือบอาจเสื่อมประสิทธิภาพเร็วขึ้น",
      aEn: "Recommended standard service limit is -40°C to 280°C. Peak maximum heat rating is 300°C. Exceeding this rating may shorten the coating lifetime.",
    },
  ];

  return (
    <div className="bg-[#131313] text-[#e5e2e1] font-sans min-h-screen selection:bg-primary selection:text-neutral-900 transition-colors duration-300">
      {/* Top Banner warning about local store config */}
      <div className="bg-neutral-900 border-b border-neutral-800 py-2.5 px-4 text-center text-xs text-neutral-400 font-mono tracking-wide relative flex items-center justify-center gap-1">
        <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
        <span>
          {lang === "th"
            ? "MATE LAB Official Guide: คู่มือการเคลือบหัวฉีดทางเลือกเทคโนโลยีระดับนาโน"
            : "MATE LAB Official Guide: Premium Nano-ceramic instructions & settings reference."}
        </span>
      </div>

      {/* Floating progress widget on desktop, showing coating completion progress */}
      <div className="fixed bottom-6 right-6 z-50 max-w-sm hidden md:block">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-900/95 backdrop-blur-md border border-neutral-800 p-4 rounded-xl shadow-2xl flex flex-col gap-2.5 w-64"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-400 font-medium">
              {lang === "th" ? "สถานะการเคลือบของคุณ" : "Your Coating Progress"}
            </span>
            <span className="text-xs font-mono font-bold text-primary bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-500/25">
              {progressPercent}%
            </span>
          </div>

          {/* Miniature progress bar */}
          <div className="w-full h-2 bg-neutral-850 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="text-[11px] text-neutral-500">
            {completedSteps.length === totalSteps ? (
              <span className="text-primary font-semibold flex items-center gap-1">
                🎉 {lang === "th" ? "พร้อมพิมพ์แล้ว!" : "Ready to Print!"}
              </span>
            ) : (
              <span>
                {lang === "th"
                  ? `สำเร็จแล้ว ${completedSteps.length} จากทั้งหมด ${totalSteps} ขั้นตอน`
                  : `${completedSteps.length} of ${totalSteps} application steps completed`}
              </span>
            )}
          </div>
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="w-full pt-16 pb-12 relative overflow-hidden flex flex-col items-center text-center">
        {/* Ambient background glow behind the logo */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10" />

        {/* Logo with gentle floating animation */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-24 h-24 mb-6 border border-neutral-800 rounded-2xl p-2 bg-neutral-900 relative group shadow-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
          <img
            alt="MATE LAB Logo"
            className="w-full h-full object-contain relative z-10 transition-transform group-hover:scale-105 duration-300"
            src={BRAND_LINKS.logo}
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Main Headings */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight mb-3 px-4"
        >
          Nozzle Shield Pro
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-xl text-neutral-400 font-sans tracking-wide max-w-xl px-4"
        >
          {lang === "th"
            ? "สารเคลือบเซรามิกระดับนาโนป้องกันการเกาะตัวสำหรับหัวฉีดเครื่องพิมพ์ 3 มิติ"
            : "Nano Ceramic Anti-Stick Coating for 3D Printer Nozzles"}
        </motion.p>

        {/* Tech stats specs box */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-8 sm:gap-14 mt-12 bg-neutral-900/40 border border-neutral-800 p-6 rounded-2xl max-w-2xl mx-4"
        >
          <div className="text-center group min-w-[120px]">
            <div className="font-display text-2xl sm:text-4xl text-primary font-bold tracking-tight mb-1 group-hover:scale-105 transition-transform">
              500+
            </div>
            <div className="font-sans text-xs sm:text-sm text-neutral-400 font-medium">
              {lang === "th" ? "ชั่วโมงการพิมพ์" : "Print Hours"}
            </div>
            <div className="font-mono text-[10px] text-neutral-500 mt-0.5">
              / Print Hours
            </div>
          </div>

          <div className="w-px bg-neutral-800 self-stretch hidden sm:block" />

          <div className="text-center group min-w-[120px]">
            <div className="font-display text-2xl sm:text-4xl text-primary font-bold tracking-tight mb-1 group-hover:scale-105 transition-transform">
              300°C
            </div>
            <div className="font-sans text-xs sm:text-sm text-neutral-400 font-medium font-medium">
              {lang === "th" ? "อุณหภูมิสูงสุด" : "Max Temp"}
            </div>
            <div className="font-mono text-[10px] text-neutral-500 mt-0.5">
              / Peak Thermal Allow
            </div>
          </div>

          <div className="w-px bg-neutral-800 self-stretch hidden sm:block" />

          <div className="text-center group min-w-[120px]">
            <div className="font-display text-2xl sm:text-4xl text-primary font-bold tracking-tight mb-1 group-hover:scale-105 transition-transform">
              &lt;50nm
            </div>
            <div className="font-sans text-xs sm:text-sm text-neutral-400 font-medium">
              {lang === "th" ? "ขนาดอนุภาคสาร" : "Particle Size"}
            </div>
            <div className="font-mono text-[10px] text-neutral-500 mt-0.5">
              / Particle Size
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main Content Page Container */}
      <main className="max-w-[900px] mx-auto px-4 sm:px-6 pb-20 relative">
        {/* Interactive Language Selector Toggle */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-neutral-900 border border-neutral-800 rounded-xl p-1.5 shadow-inner">
            <button
              onClick={() => setLang("th")}
              className={`flex items-center gap-2 px-6 sm:px-8 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                lang === "th"
                  ? "bg-primary text-neutral-950 shadow-lg font-bold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <span>🇹🇭</span>
              ภาษาไทย
            </button>
            <button
              onClick={() => setLang("en")}
              className={`flex items-center gap-2 px-6 sm:px-8 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                lang === "en"
                  ? "bg-primary text-neutral-950 shadow-lg font-bold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <span>🇬🇧</span>
              English
            </button>
          </div>
        </div>

        {/* Steps Progress Title section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="font-display text-lg sm:text-xl font-bold tracking-widest text-primary uppercase select-none">
              {lang === "th" ? "🧭 ขั้นตอนการใช้งาน" : "🧭 APPLICATION STEPS"}
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              {lang === "th"
                ? "ประกอบชิ้นส่วนและทำความสะอาดตามขั้นตอนอย่างดีเพื่อประสิทธิภาพการยึดเหนี่ยวสูงสุด"
                : "Follow each step sequentially for optimal ceramic adhesion and wear life."}
            </p>
          </div>

          {/* Task Completion quick gauge for mobile/tablets */}
          <div className="flex items-center gap-2.5 bg-neutral-900/60 p-2 px-4 rounded-xl border border-neutral-800 self-start sm:self-auto">
            <div className="text-xs text-neutral-400 font-mono">
              {lang === "th" ? "เคลือบสำเร็จ:" : "Done:"} {completedSteps.length}/{totalSteps}
            </div>
            <div className="w-16 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* 6 Steps Listing */}
        <div className="flex flex-col gap-6">
          {COATING_STEPS.map((step, idx) => {
            const checked = isStepChecked(step.id);
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`group rounded-2xl bg-neutral-900 border transition-all duration-300 p-5 sm:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 relative overflow-hidden ${
                  checked
                    ? "border-primary/40 bg-neutral-900/90 shadow-lg shadow-primary/2"
                    : "border-neutral-800 hover:border-neutral-700"
                }`}
                id={`step-card-${step.id}`}
              >
                {/* Visual Glow on Checked or Hover */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full transition-opacity opacity-0 group-hover:opacity-100 -z-10 ${
                    checked ? "bg-primary/5" : "bg-neutral-800/20"
                  }`}
                />

                {/* Left Side: Technical Image from Hotlink with checkbox overlay */}
                <div className="w-full md:w-44 h-44 flex-shrink-0 rounded-xl overflow-hidden bg-[#161616] border border-neutral-800 p-2.5 relative flex items-center justify-center select-none">
                  <img
                    alt={lang === "th" ? step.titleTh : step.titleEn}
                    className="w-full h-full object-contain filter group-hover:scale-105 transition-all duration-500"
                    src={step.imageUrl}
                    referrerPolicy="no-referrer"
                  />

                  {/* Interactive Checked Badge Overlay */}
                  <div className="absolute top-2.5 right-2.5 z-20">
                    <button
                      onClick={() => toggleStepCompleted(step.id)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all border ${
                        checked
                          ? "bg-primary text-neutral-900 border-primary"
                          : "bg-neutral-950/80 text-neutral-500 border-neutral-800 hover:text-neutral-200"
                      }`}
                      title={
                        lang === "th"
                          ? "ทำขั้นตอนนี้สำเร็จแล้ว"
                          : "Mark this step as complete"
                      }
                    >
                      <Check className="w-4 h-4 stroke-[3px]" />
                    </button>
                  </div>
                </div>

                {/* Right Side: Step descriptions */}
                <div className="flex-1 w-full">
                  <div className="flex flex-wrap items-center gap-3.5 mb-2.5">
                    {/* Badge Pill for Step Number */}
                    <span
                      className={`inline-flex px-3 py-1 font-mono text-xs rounded-full font-bold select-none tracking-wider ${step.badgeBg}`}
                    >
                      {step.stepNum}
                    </span>

                    {/* Completion marker next to title if selected */}
                    {checked && (
                      <span className="text-xs text-primary font-mono flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {lang === "th" ? "เสร็จแล้ว" : "Completed"}
                      </span>
                    )}
                  </div>

                  {/* Title displaying chosen language and subtitle in lighter grey */}
                  <h3 className="font-display font-semibold text-xl text-white tracking-tight">
                    {lang === "th" ? step.titleTh : step.titleEn}
                  </h3>

                  {/* Description in high contrast body text */}
                  <p className="font-sans text-neutral-300 text-sm leading-relaxed mt-3.5">
                    {lang === "th" ? step.descTh : step.descEn}
                  </p>

                  {/* Embed Timer helper if it contains interactive timers */}
                  {step.hasTimer && step.timerDurationSeconds && (
                    <ActiveTimer
                      durationSeconds={step.timerDurationSeconds}
                      labelTh={step.timerLabelTh || "นับเวลาถอยหลัง"}
                      labelEn={step.timerLabelEn || "Timer Countdown"}
                      lang={lang}
                    />
                  )}

                  {/* Embed Coating Settings Optimizer directly next to First Heating step */}
                  {step.id === 5 && (
                    <div className="mt-5">
                      <CoatingCalculator lang={lang} />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* High Visibility Safety Warning Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-[#241c09]/80 border-l-4 border-amber-500 p-6 rounded-r-xl my-12 flex items-start sm:items-center gap-4 shadow-xl"
        >
          <div className="p-2.5 bg-amber-950/70 border border-amber-500/20 rounded-lg text-amber-500 self-start sm:self-auto">
            <Info className="w-6 h-6 flex-shrink-0" />
          </div>
          <div className="flex-1 text-sm leading-relaxed">
            <p className="text-white font-medium">
              <span className="font-bold text-amber-400">
                {lang === "th" ? "ข้อสำคัญ:" : "IMPORTANT:"}
              </span>{" "}
              {lang === "th"
                ? "พื้นผิวหัวฉีดที่สกปรกจะลดการยึดเกาะของสารเคลือบนาโนซีลด์อย่างมีนัยสำคัญ หากเกิดการหลุดลอกขึ้นเฉพาะจุดในการใช้งานภายหลัง ให้ทำความสะอาดขัดบริเวณดังกล่าวให้แห้งสนิทและปัดแปรงทาซ้ำได้เลย"
                : "A dirty or oxidized nozzle surface will severely hinder nano ceramic bonding. If local peeling occurs later during intensive use, simply clean, dry the targeted spot, and reapply directly."}
            </p>
          </div>
        </motion.div>

        {/* Compatibility Section */}
        <section className="mt-16">
          <div className="text-center sm:text-left mb-8">
            <h2 className="font-display font-semibold text-lg sm:text-xl tracking-widest text-primary uppercase select-none">
              🔋 {lang === "th" ? "รองรับการใช้งานกับ" : "COMPATIBILITY REFERENCE"}
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              {lang === "th"
                ? " Nozzle Shield Pro ผ่านการทดสอบและทำงานได้ดีที่สุดร่วมกับประเภทหัวฉีดต่อไปนี้"
                : "Tested and certified compatible with multiple nozzle materials and advanced filaments."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {COMPATIBILITIES.map((comp) => {
              const tipDetails = nozzleTips[comp.id];
              const isSelected = selectedNozzleId === comp.id;

              return (
                <div
                  key={comp.id}
                  onClick={() =>
                    setSelectedNozzleId(isSelected ? null : comp.id)
                  }
                  className={`bg-neutral-900 border rounded-xl p-5 hover:border-neutral-600 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group cursor-pointer ${
                    isSelected
                      ? "border-primary bg-neutral-900 shadow-xl"
                      : "border-neutral-800"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      {/* Circle icon frame */}
                      <div className="w-9 h-9 rounded-full bg-neutral-805 flex items-center justify-center flex-shrink-0 border border-neutral-850 text-neutral-400 group-hover:text-primary transition-colors">
                        <Shield className="w-4 h-4 text-primary" />
                      </div>
                      <div className="font-display text-sm font-bold text-white group-hover:text-primary transition-colors">
                        {comp.title}
                      </div>
                    </div>

                    <div className="text-xs text-neutral-300 leading-relaxed font-sans mb-3">
                      {lang === "th" ? comp.descTh : comp.descEn}
                    </div>
                  </div>

                  {/* Interactive toggle flag */}
                  <div className="mt-4 pt-3.5 border-t border-neutral-800/60 flex items-center justify-between text-[11px] text-neutral-500 font-mono tracking-wider">
                    <span>
                      {isSelected
                        ? lang === "th"
                          ? "🔼 ยุบข้อมูล"
                          : "🔼 Close care tips"
                        : lang === "th"
                        ? "🔽 ดูคำแนะนำดูแล"
                        : "🔽 View care tips"}
                    </span>
                    <ChevronRight className={`w-3 h-3 transform transition-transform ${isSelected ? "rotate-90 text-primary" : ""}`} />
                  </div>

                  {/* Expandable Care Tips block directly inside */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-3 pt-3.5 border-t border-neutral-800 text-xs text-neutral-300 leading-relaxed"
                      >
                        <p className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800">
                          {lang === "th" ? tipDetails.th : tipDetails.en}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQs Section */}
        <section className="mt-20">
          <div className="text-center sm:text-left mb-8">
            <h2 className="font-display font-semibold text-lg sm:text-xl tracking-widest text-primary uppercase select-none flex items-center gap-2 justify-center sm:justify-start">
              <HelpCircle className="w-5 h-5 text-primary" />
              <span>{lang === "th" ? "คำถามที่พบบ่อย (FAQs)" : "FREQUENTLY ASKED QUESTIONS"}</span>
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              {lang === "th"
                ? "คำถามทั่วไปเกี่ยวกับ Nozzle Shield Pro เพื่อการใช้งานที่สมบูรณ์แบบ"
                : "Everything you need to know to ensure a flawless application cycle."}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {FAQS.map((faq, index) => {
              const isOpen = faqOpen === index;
              return (
                <div
                  key={index}
                  className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setFaqOpen(isOpen ? null : index)}
                    className="w-full text-left p-4 sm:p-5 flex justify-between items-center gap-4 text-sm font-semibold text-white select-none transition-colors hover:text-primary"
                  >
                    <span>{lang === "th" ? faq.qTh : faq.qEn}</span>
                    <span className="text-primary text-xl font-mono">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden bg-neutral-950/60 border-t border-neutral-850"
                      >
                        <p className="p-5 text-xs sm:text-sm text-neutral-400 leading-relaxed">
                          {lang === "th" ? faq.aTh : faq.aEn}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Cyber Industrial Footer */}
      <footer className="bg-neutral-950 pt-16 pb-12 border-t border-neutral-900 flex flex-col items-center">
        {/* Foot logo with hover glow */}
        <div className="w-20 h-20 bg-neutral-900 border border-neutral-800 rounded-2xl mb-4 p-2 shadow-2xl relative group overflow-hidden">
          <div className="absolute inset-0 bg-primary/2 group-hover:bg-primary/5 transition-all" />
          <img
            alt="MATE LAB"
            className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
            src={BRAND_LINKS.logo}
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="font-display font-semibold text-2xl text-primary tracking-widest mb-1 select-none">
          MATE LAB
        </div>
        <div className="text-xs text-neutral-400 font-medium tracking-widest mb-10 text-center uppercase">
          {lang === "th"
            ? "พิมพ์สะอาดลื่นไหลด้วยเทคโนโลยีนาโน · ผลิตในประเทศไทย"
            : "Precision 3D Printing Supplies · Thailand"}
        </div>

        {/* Shop Buttons mapped exactly with original styling details */}
        <div className="w-full max-w-sm flex flex-col gap-3.5 px-4 mb-12">
          {/* Shopee */}
          <a
            className="w-full bg-[#ff5722] hover:bg-[#eb4a17] text-white rounded-xl p-4 flex items-center transition-all shadow-md active:scale-[0.99] group"
            href={BRAND_LINKS.shopee}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="bg-white/10 p-2 rounded-lg mr-4">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 text-left">
              <span className="font-bold text-sm block">Shopee</span>
              <span className="text-[11px] text-white/70 block font-mono">
                shopee.co.th/matelab
              </span>
            </div>
            <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
          </a>

          {/* Lazada */}
          <a
            className="w-full bg-[#0d47a1] hover:bg-[#073985] text-white rounded-xl p-4 flex items-center transition-all shadow-md active:scale-[0.99] group"
            href={BRAND_LINKS.lazada}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="bg-white/10 p-2 rounded-lg mr-4">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 text-left">
              <span className="font-bold text-sm block">Lazada Shop</span>
              <span className="text-[11px] text-white/70 block font-mono">
                lazada.co.th
              </span>
            </div>
            <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
          </a>

          {/* LINE */}
          <a
            className="w-full bg-[#00c300] hover:bg-[#00ae00] text-white rounded-xl p-4 flex items-center transition-all shadow-md active:scale-[0.99] group"
            href={BRAND_LINKS.line}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="bg-white/10 p-2 rounded-lg mr-4">
              <span className="font-bold text-base text-white">L</span>
            </div>
            <div className="flex-1 text-left">
              <span className="font-bold text-sm block">LINE Official Account</span>
              <span className="text-[11px] text-white/70 block font-mono">
                @matelab
              </span>
            </div>
            <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>

        {/* Specs tag in JetBrains Mono list */}
        <div className="font-mono text-[11px] text-neutral-500 bg-neutral-900/60 p-3.5 rounded-full border border-neutral-850 px-6 tracking-wide select-none">
          -40°C to 280°C · peak 300°C · RoHS Certified
        </div>

        {/* Tiny humble footer line */}
        <div className="text-[10px] text-neutral-600 mt-6 flex items-center gap-1.5 font-light">
          <span>{lang === "th" ? "พัฒนามาเพื่อคนพิมพ์ 3 มิติโดยเฉพาะ" : "Engineered with passion for 3D enthusiasts"}</span>
          <Heart className="w-3 h-3 text-[#ff8a80] fill-current" />
        </div>
      </footer>
    </div>
  );
}
