"use client";

import { useLottie } from "lottie-react";
import { useEffect } from "react";

interface LottieAnimationProps {
  animationData: any;
  width?: number;
  className?: string;
}

export default function LottieAnimation({ animationData, width = 200, className = "" }: LottieAnimationProps) {
  const options = {
    animationData,
    loop: true,
    autoplay: true,
  };

  const lottieRef = useLottie(options, { width, height: width });
  
  // Note: Interactivity removed for production build compatibility
  // Use CSS animations instead via BreathingCircle component

  return <>{lottieRef.View}</>;
}

// Meditation/Calming animation data
export const meditationAnimation = {
  v: "5.5.7",
  fr: 60,
  ip: 0,
  op: 100,
  w: 1000,
  h: 1000,
  nm: "meditation",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "circle",
      sr: 1,
      ks: { a: 0, k: [500, 500], ix: 2 },
      ao: 0,
      shapes: [
        {
          ty: "el",
          d: 1,
          nm: "circle path",
          c: { v: [[0, 0], [300, 0]], i: [[0, 0], [0, 0]], o: [[0, 0], [0, 0]], closed: true },
          s: { v: [[100, 100, 100]], i: [[0, 0, 0], [0, 0, 0]], o: [[0, 0, 0], [0, 0, 0]] },
        },
      ],
      ip: 0,
      op: 100,
    },
  ],
};

// Simple breathing circle animation (will use CSS instead for simplicity)
export const BreathingCircle = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full rounded-full bg-amber-200/30 animate-ping" style={{ animationDuration: '4s' }}></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-3/4 h-3/4 rounded-full bg-amber-300/40 animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.5s' }}></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1/2 h-1/2 rounded-full bg-amber-400/50 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};
