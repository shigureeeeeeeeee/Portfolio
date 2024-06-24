"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

export const BackgroundBeams = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-full bg-black relative flex flex-col items-center justify-center overflow-hidden rounded-md">
      <div className="absolute inset-0 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(1200px_circle_at_center,white,transparent)]" />
        <div className="h-full w-full flex items-center justify-center relative z-10">
          {/* Beams */}
          <Beam
            className="absolute left-1/4 top-1/4 h-[40rem] w-[40rem] -translate-y-1/2 bg-purple-500"
          />
          <Beam className="absolute right-1/4 top-1/3 h-[35rem] w-[35rem] translate-y-1/2 bg-cyan-500" />
          <Beam className="absolute left-1/3 bottom-1/3 h-[30rem] w-[30rem] translate-y-1/2 bg-yellow-500" />
        </div>
      </div>
      <div className="relative z-20">{children}</div>
    </div>
  );
};

const Beam = ({ className }: { className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0.5, scale: 0.5 }}
      animate={{
        opacity: [0.5, 0.8, 0.5],
        scale: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={cn(
        "absolute bg-opacity-50 mix-blend-multiply filter blur-[100px]",
        className
      )}
    />
  );
};