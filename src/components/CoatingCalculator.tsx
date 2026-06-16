import React, { useState } from "react";
import { Flame, Info, Check, ShieldAlert } from "lucide-react";

interface CoatingCalculatorProps {
  lang: "th" | "en";
}

export default function CoatingCalculator({ lang }: CoatingCalculatorProps) {
  const [selectedFilament, setSelectedFilament] = useState<string>("pla");

  const filaments = [
    {
      id: "pla",
      name: "PLA",
      normalTemp: "190°C - 220°C",
      firstHeatTemp: "185°C - 210°C",
      tipTh: "PLA ทาน่าย ไม่ค่อยสะสมคราบสะสม แต่หัวฉีดเคลือบแล้วจะทําให้สีไหม้เกาะผิวหลุดง่ายขึ้นมาก",
      tipEn: "PLA leaves minimal residue, but the nano coat prevents tiny specks from burning and sticking during long print jobs.",
    },
    {
      id: "petg",
      name: "PETG",
      normalTemp: "230°C - 250°C",
      firstHeatTemp: "220°C - 240°C",
      tipTh: "PETG ขึ้นชื่อเรื่องความเหนียวเหนอะติดหัวฉีด สารเคลือบนี้ช่วยให้หยดพลาสติกเช็ดออกได้ง่ายด้วยกระดาษแห้ง",
      tipEn: "PETG is notoriously sticky. With this coating, filament blobs slide right off leaving the tip perfectly clean.",
    },
    {
      id: "abs",
      name: "ABS / ASA",
      normalTemp: "240°C - 260°C",
      firstHeatTemp: "230°C - 245°C",
      tipTh: "ควันสะสมจากวัสดุ ABS/ASA จะไม่เกาะพื้นผิวโลหะหัวฉีดที่ฉาบ Nozzle Shield แล้ว",
      tipEn: "Oily off-gassing residues from ABS/ASA won't build up onto the brass or steel.",
    },
    {
      id: "tpu",
      name: "TPU (Flexible)",
      normalTemp: "210°C - 230°C",
      firstHeatTemp: "200°C - 220°C",
      tipTh: "ช่วยในเรื่องแรงเสียดทานการอัดรีดและลดความต้านทานแรงดึงผิว",
      tipEn: "Improves flow mechanics and material sliding on flexible polymers.",
    },
    {
      id: "nylon",
      name: "Nylon / PC",
      normalTemp: "265°C - 290°C",
      firstHeatTemp: "255°C - 275°C",
      tipTh: "อุณหภูมิเกือบถึงขีดจำกัดสูงสุดของสารเคลือบ (300°C) โปรดไล่ความร้อนทีละขั้นตอนเพื่อป้องกันการแตกร้าว",
      tipEn: "Close to the peak limit (300°C) of the nano coating. Ramp temperatures slowly for the first heating sequence.",
    },
  ];

  const current = filaments.find((f) => f.id === selectedFilament) || filaments[0];

  return (
    <div className="p-6 rounded-2xl bg-[#1c1b1b] border border-neutral-800 backdrop-blur-md">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-[#1a2e10] border border-emerald-500/30 rounded-lg text-primary">
          <Flame className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg text-white">
            {lang === "th" ? "เครื่องมือแนะนําอุณหภูมิพิมพ์" : "Temperature Parameter Guide"}
          </h3>
          <p className="text-xs text-neutral-400">
            {lang === "th"
              ? "คำนวณการทำความร้อนครั้งแรก และแนะนำพารามิเตอร์การพิมพ์"
              : "Calculate optimal initial temperatures and print parameters based on material."}
          </p>
        </div>
      </div>

      {/* Select buttons for materials */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">
        {filaments.map((f) => (
          <button
            key={f.id}
            onClick={() => setSelectedFilament(f.id)}
            className={`py-2 px-3 rounded-lg text-xs font-mono font-medium tracking-wide transition-all ${
              selectedFilament === f.id
                ? "bg-primary text-neutral-900 shadow-md shadow-primary/10"
                : "bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white"
            }`}
          >
            {f.name}
          </button>
        ))}
      </div>

      {/* Recommended Parameters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3">
        <div className="p-4 bg-neutral-900/60 rounded-xl border border-neutral-800/80">
          <div className="text-xs text-neutral-400 font-mono tracking-wider">
            {lang === "th" ? "อุณหภูมิปกติทั่วไป" : "Normal Printing Temp"}
          </div>
          <div className="text-xl font-mono font-bold text-neutral-100 mt-1">
            {current.normalTemp}
          </div>
        </div>

        <div className="p-4 bg-[#2b2b1a] rounded-xl border border-yellow-500/10">
          <div className="text-xs text-yellow-400 font-mono tracking-wider flex items-center justify-between">
            <span>{lang === "th" ? "แนะนําทำความร้อนครั้งแรก (STEP 05)" : "Recommended 1st Heating Temp (STEP 05)"}</span>
            <span className="bg-yellow-950/80 px-2 py-0.5 text-[10px] rounded text-[#ffd54f] border border-yellow-500/20">
              {lang === "th" ? "ลด 5-10°C" : "-5-10°C Lower"}
            </span>
          </div>
          <div className="text-xl font-mono font-bold text-[#ffd54f] mt-1">
            {current.firstHeatTemp}
          </div>
        </div>
      </div>

      {/* Custom Pro Tip */}
      <div className="mt-2 p-3 bg-neutral-900 border border-neutral-800 rounded-xl flex gap-3 text-xs leading-relaxed text-neutral-300">
        <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-white mr-1">
            {lang === "th" ? "ข้อแนะนําพิเศษ:" : "Nozzle Pro Tip:"}
          </span>
          {lang === "th" ? current.tipTh : current.tipEn}
        </div>
      </div>
    </div>
  );
}
