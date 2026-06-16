export interface CoatingStep {
  id: number;
  stepNum: string;
  badgeBg: string; // Background color for the pill
  badgeText: string; // Text color index
  titleTh: string;
  titleEn: string;
  descTh: string;
  descEn: string;
  imageUrl: string;
  hasTimer?: boolean;
  timerDurationSeconds?: number;
  timerLabelTh?: string;
  timerLabelEn?: string;
}

export interface CompatibilityItem {
  id: string;
  iconName: string;
  title: string;
  descTh: string;
  descEn: string;
}

export const COATING_STEPS: CoatingStep[] = [
  {
    id: 1,
    stepNum: "STEP 01",
    badgeBg: "bg-emerald-950/80 border border-emerald-500/30 text-[#bdfd7f]",
    badgeText: "#bdfd7f",
    titleTh: "ทำความสะอาดหัวฉีด",
    titleEn: "Clean the Nozzle",
    descTh: "เช็ดหัวฉีดให้ทั่วด้วยผ้าไร้ขนชุบแอลกอฮอล์ 99% ขจัดคราบน้ำมัน ฝุ่น และสิ่งตกค้างทั้งหมด",
    descEn: "Wipe the nozzle thoroughly with a lint-free cloth soaked in 99% isopropyl alcohol. Remove all oil, dust, and residue.",
    imageUrl: "https://lh3.googleusercontent.com/aida/AP1WRLs77lvIgSNORB7t1dI38BdqkPo8MgXHH9ORpuhpSVjJSVp6v8RGHT6n5Fe0wSbUGwKC94mdSJGSSaFundykrxU5r-QKPc7GhH0ejkXgIHDG3NZ3hUAFK6MdZZnR36U2FUjbpBi7hoXzoH8pH_eUtCU2QZ99u6fbY0eAIW-Slt5cJ2VxDE-uPH4dEVO63uj5HUwWsT0RedDNMufKSXOeR2aVEpEY8QSWhePP0X7Yukg1ybSlnTuTn0YhKW7i",
  },
  {
    id: 2,
    stepNum: "STEP 02",
    badgeBg: "bg-emerald-950/80 border border-emerald-500/30 text-[#bdfd7f]",
    badgeText: "#bdfd7f",
    titleTh: "ปล่อยให้แห้ง — 5 นาที",
    titleEn: "Let It Dry — 5 Minutes",
    descTh: "รอให้แอลกอฮอล์ระเหยจนหมด พื้นผิวหัวฉีดต้องแห้งสนิทก่อนทาสารเคลือบ",
    descEn: "Allow the alcohol to fully evaporate. The nozzle surface must be completely dry before applying the coating.",
    imageUrl: "https://lh3.googleusercontent.com/aida/AP1WRLsvaJc-fWvMmO4NVxAiu236LE9Vvq2y0LlzcnD53D2MqpCuV4DP7T78k-_9HezXKRPqV5Fsd6rh3FDyl6sMYq8l1k7wMjsilTkeOA54t60KpZJkcw2Rpd_tO6jXY8ieJ2sR87T0RHXFhPGVbZuBS45U8eXUdKeDNrVDXog2xKBe88x1a4uRT-ht0_EkyfCNi7Z_2-C9-JwZpQ5f3brye0XiMkm8jqa5sBIHlm6KcZUdNnTnyUqGho1p_Tq9",
    hasTimer: true,
    timerDurationSeconds: 300, // 5 minutes
    timerLabelTh: "ตัวจับเวลาความแห้ง",
    timerLabelEn: "Drying Timer",
  },
  {
    id: 3,
    stepNum: "STEP 03",
    badgeBg: "bg-yellow-950/60 border border-yellow-500/30 text-[#ffd54f]",
    badgeText: "#ffd54f",
    titleTh: "ทาสารเคลือบ",
    titleEn: "Apply the Coating",
    descTh: "ใช้แปรงที่ติดมากับฝาทาสารเคลือบลงบนปลายหัวฉีดและรอบรูฉีดโดยตรง ทาบางๆ สม่ำเสมอ — ไม่จำเป็นต้องทาหนา",
    descEn: "Use the built-in brush to apply the coating directly onto the nozzle tip and around the opening. Brush in a thin, even layer — no need to apply thick.",
    imageUrl: "https://lh3.googleusercontent.com/aida/AP1WRLs88UonQqQjH9i_ev7kAxWdbOQTMlVZL3U-LoEtsB7m1unvRwU-olA0ezaTBE2X3RGuXBl1gEJNcRx8UhtnrTy4YvyHLBktWNWw3JMqvNJu5BoVBNhbQlXes-umyl1hmy_aFjFwzXuH7M_dUqmHhQrKAwIbFM4UVohUtRY3FPtbTlpklQO26wGaBio4vxyoTGilgQo8i5JWTFSyDcw8PjeU3PLToOm8CAQUfDOOjYbgQZkZg3HxQtZu6UrL",
  },
  {
    id: 4,
    stepNum: "STEP 04",
    badgeBg: "bg-sky-950/60 border border-sky-500/30 text-[#64b5f6]",
    badgeText: "#64b5f6",
    titleTh: "การทำให้แห้ง (Curing) — 24 ชั่วโมง",
    titleEn: "Curing — 24 Hours",
    descTh: "ปล่อยสารเคลือบให้เซ็ตตัวที่อุณหภูมิห้องเป็นเวลา 24 ชั่วโมง ห้ามให้ความร้อนหรือสัมผัสหัวฉีดในช่วงเวลานี้",
    descEn: "Let the coating cure at room temperature for 24 hours. Do not heat or touch the nozzle during this time.",
    imageUrl: "https://lh3.googleusercontent.com/aida/AP1WRLtu1HFs-ItdBDMT2eHE-6agknJV4C6nVk3ewSi3lHAtb7ov3vJgv68OSjvMiJcXvpQ984upZb2-0fDafpVLNAGehHNZ1OUP9L4jLwDURy9g3f4TcsZbo-BqE_z7E9SUusjJwSBemTzmS3wMUx_zbujpMltixDInrcWqgihvyOAXF10dkClKjYsZGYVg_hCyFfiEh47V72R2eH2K07JFY_E_08bL6IhNbXsNJLWsST1TIMeI4Vh1kHmKQ6R9",
    hasTimer: true,
    timerDurationSeconds: 86400, // 24 hours (we will do a configurable/simulated timer too)
    timerLabelTh: "ตัวจับเวลาการเซ็ตตัว",
    timerLabelEn: "Curing Timer",
  },
  {
    id: 5,
    stepNum: "STEP 05",
    badgeBg: "bg-rose-950/60 border border-rose-500/30 text-[#ff8a80]",
    badgeText: "#ff8a80",
    titleTh: "การทำความร้อนครั้งแรก",
    titleEn: "First Heating",
    descTh: "หลังผ่านไป 24 ชั่วโมง ให้ทำความร้อนถึงอุณหภูมิเป้าหมายตามปกติ แนะนำให้ทำความร้อนต่ำกว่าปกติ 5-10°C ในครั้งแรกเพื่อความปลอดภัยและตรวจสอบการรั่วซึม",
    descEn: "After 24 hours, heat to your target temperature. We recommend lowering the initial heating temp by 5-10°C to check for leaks and ensure stability.",
    imageUrl: "https://lh3.googleusercontent.com/aida/AP1WRLtnKODygUJwUnJAk-Xat9w2Lm7H96NqHcKMggeA_Cr9XTabvK0HbG83DtWb3JOMikZrGuXBtRKYC1UPpkQrUbrEy-hmEkUFjkeBvbkU7i7RqunoQ8MC8M2002uGsoj00AxqlJ5VTa78fd-LwlsnZIREOM9vGe-65pjUfGIB4jUb10GVkMTglI1whZGTxC1VPxNdAwYf1ukgHfJJ42cKcXlWS8O-wMlrtzN46uu-2lgmeTTib3AcW7r0E3KA",
  },
  {
    id: 6,
    stepNum: "STEP 06",
    badgeBg: "bg-emerald-950/80 border border-emerald-500/30 text-[#bdfd7f]",
    badgeText: "#bdfd7f",
    titleTh: "พร้อมพิมพ์!",
    titleEn: "Ready to Print!",
    descTh: "สารเคลือบจะปกป้องหัวฉีดของคุณนาน 3-6 เดือน หรือ 500+ ชั่วโมงการพิมพ์ ทาซ้ำเมื่อเริ่มสังเกตเห็นว่าเส้นใยเริ่มติดอีกครั้ง",
    descEn: "The coating protects your nozzle for 3–6 months or 500+ print hours. Reapply when you notice filament beginning to stick again.",
    imageUrl: "https://lh3.googleusercontent.com/aida/AP1WRLvLbff2Q09QN5Y_c-YfdOZlyPynG-nBuz7KY6F7wSf1qgTAD2XFy9kQ-nhIiHwwqEwi3bjk25FB96WQWYK60YC_im5lbvIj_DRjSZ-TbiDn9iegoCcblt96fi6BQrfOv95kXmZRIkzjI9Dm8KJdi2gXb7KaOKrug-8_4y9m0W4D2IBmYspZjpF4uVT_k1jVaoKp7uag1SSsLmAOL-kG6br0r88vvKIZNYmgrtA4LF_ljwnPiXsaix8EBQDY",
  },
];

export const COMPATIBILITIES: CompatibilityItem[] = [
  {
    id: "stainless",
    iconName: "precision_manufacturing",
    title: "Stainless Steel Nozzles",
    descTh: "เพิ่มการไหลของเส้น ลดการติดขัด",
    descEn: "Maximize flow, minimize sticking.",
  },
  {
    id: "hardened",
    iconName: "hardware",
    title: "Hardened Steel Nozzles",
    descTh: "เติมเต็มช่องว่างระดับไมโครและปกป้องเนื้อเหล็ก",
    descEn: "Fills micro-pores & protects steel.",
  },
  {
    id: "brass",
    iconName: "format_paint",
    title: "Brass Nozzles",
    descTh: "ป้องกันคราบไหม้สะสม ให้หัวฉีดดูเหมือนใหม่เสมอ",
    descEn: "Prevents burnt residue, keeps it like new.",
  },
  {
    id: "filaments",
    iconName: "texture",
    title: "PLA / PETG / ABS / TPU / PC / ASA",
    descTh: "หมดปัญหาคราบไหม้และก้อนพลาสติกส่วนเกิน",
    descEn: "No more burnt residue & blobs.",
  },
];

export const BRAND_LINKS = {
  logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-CNlkb663UCOXeYJU04MqHW5YpF_C9DQIt-ldnrWJXn0bTpH15EANRjPzTeCGhYqpP4Eb9oeK10qUPuiCyMAGRYBysPK0wqs904X9-2s4hsFqrNHWlyP1BL4d9zm4W69PaMg_NmvBFXIgRPFs7dEF5jLh0bbB0-VtAMhqKXcnYsshlRrpTBSVUfTcbQA9WR5pRR5Gr_VEwgc8VpyrdXRlZk6zf_ClecXQSZC96Nd-tSp7oNvvkTeQdUWDIykqjO9_rvqYN1RgyJuQ",
  shopee: "https://shopee.co.th/matelab",
  lazada: "https://s.lazada.co.th/s.ZhKh9x?c=b",
  line: "https://lin.ee/wiWl25h",
};
