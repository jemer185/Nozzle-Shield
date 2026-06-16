import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Sparkles } from "lucide-react";

interface ActiveTimerProps {
  durationSeconds: number;
  labelTh: string;
  labelEn: string;
  lang: "th" | "en";
}

export default function ActiveTimer({
  durationSeconds,
  labelTh,
  labelEn,
  lang,
}: ActiveTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(durationSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isFastMode, setIsFastMode] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      const intervalSec = isFastMode ? 50 : 1000; // Speed up by 20x in fast demo mode
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            return 0;
          }
          return prev - (isFastMode ? Math.min(prev, 60) : 1); // reduction
        });
      }, intervalSec);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, isFastMode]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(durationSeconds);
  };

  const toggleFastMode = () => {
    setIsFastMode(!isFastMode);
  };

  // Helper to format time
  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;

    const parts = [];
    if (durationSeconds >= 3600) {
      parts.push(h.toString().padStart(2, "0"));
    }
    parts.push(m.toString().padStart(2, "0"));
    parts.push(s.toString().padStart(2, "0"));

    return parts.join(":");
  };

  const percentage = (timeLeft / durationSeconds) * 100;
  const isFinished = timeLeft === 0;

  return (
    <div className="mt-4 p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 w-full">
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <span className="text-xs text-primary font-mono tracking-wider uppercase font-semibold">
          ⏱️ {lang === "th" ? labelTh : labelEn}
        </span>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-2xl font-mono font-bold text-white tracking-widest">
            {formatTime(timeLeft)}
          </span>
          {isFinished && (
            <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-emerald-950 text-primary border border-emerald-500/30 font-semibold animate-pulse">
              <Sparkles className="w-3 h-3" />
              {lang === "th" ? "เสร็จสมบูรณ์!" : "Done!"}
            </span>
          )}
        </div>
      </div>

      {/* Progress slider bar with high fidelity */}
      <div className="flex-1 w-full max-w-xs h-1.5 bg-neutral-800 rounded-full overflow-hidden relative">
        <div
          className={`h-full transition-all duration-300 ${
            isFinished ? "bg-primary" : "bg-[#bdfd7f]"
          }`}
          style={{ width: `${100 - percentage}%` }}
        />
      </div>

      <div className="flex items-center gap-2 flex-wrap justify-center">
        {/* Toggle Fast Demo */}
        {durationSeconds > 600 && (
          <button
            onClick={toggleFastMode}
            className={`text-xs px-2.5 py-1.5 rounded-lg border font-mono transition-all ${
              isFastMode
                ? "bg-amber-950/60 text-amber-400 border-amber-500/30"
                : "bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-white"
            }`}
            title="Accelerates the curing elapsed time simulation"
          >
            {isFastMode ? "⚡ Demo mode ACTIVE" : "🧪 Turbo Curing Demo"}
          </button>
        )}

        {/* Start/Pause button */}
        <button
          onClick={toggleTimer}
          disabled={isFinished}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
            isFinished
              ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
              : isRunning
              ? "bg-amber-500 text-neutral-900 hover:bg-amber-400"
              : "bg-primary text-neutral-900 hover:bg-primary-dark"
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              {lang === "th" ? "หยุดชั่วคราว" : "Pause"}
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              {lang === "th" ? "เริ่มเวลา" : "Start"}
            </>
          )}
        </button>

        {/* Reset button */}
        <button
          onClick={resetTimer}
          className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 hover:text-white text-neutral-400 transition-colors"
          title="Reset Timer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
