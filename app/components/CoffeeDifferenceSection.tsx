"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] } },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] } },
};

const leftFeatures = [
  {
    title: "Single-Origin, Lightly Roasted",
    desc: "Bright, clean flavor profiles from farms we know by name—roasted gently to preserve the origin notes you can taste.",
  },
  {
    title: "Clean & Pesticide-Free",
    desc: "We partner with growers who farm responsibly, so every cup stays pure, traceable, and free of harsh chemicals.",
  },
];

const rightFeatures = [
  {
    title: "Hand-Selected, Micro-Batch",
    desc: "Each lot is cupped, graded, and roasted in small batches for balance—never mass-produced, always intentional.",
  },
  {
    title: "Served Fresh, Never Bitter",
    desc: "Brewed to order with precise recipes, filtered water, and calibrated grinders for a smooth, silky finish every time.",
  },
];

export default function CoffeeDifferenceSection() {
  return (
    <section className="w-full px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto">
        {/* Headline */}
        <motion.div
          className="text-center mb-12 sm:mb-14"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-[0.06em]"
            style={{ color: "#2a1f16" }}
          >
            What Makes Our Coffee Different?
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(280px,380px)_1fr] gap-10 lg:gap-14 items-start"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {/* Left features */}
          <motion.div className="space-y-8 sm:space-y-10" variants={fadeLeft}>
            {leftFeatures.map((item) => (
              <div key={item.title} className="space-y-3">
                <h3 className="text-lg font-semibold tracking-[0.04em]" style={{ color: "#2a1f16" }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6f5647" }}>
                  {item.desc}
                </p>
                <div
                  className="h-px"
                  style={{ background: "rgba(120,90,70,0.18)" }}
                />
              </div>
            ))}
          </motion.div>

          {/* Center image */}
          <motion.div className="w-full" variants={fadeScale}>
            <div
              className="overflow-hidden rounded-[28px] border border-[#f0d7c0] bg-[#fff7ed] shadow-[0_16px_36px_rgba(0,0,0,0.16)] max-w-[320px] mx-auto"
              style={{ aspectRatio: "4 / 5", maxHeight: "380px" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1610030621290-527342d7eb4a?q=80&w=925&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Coffee craft"
                width={925}
                height={700}
                className="w-full h-full object-cover"
                priority={false}
              />
            </div>
          </motion.div>

          {/* Right features */}
          <motion.div className="space-y-8 sm:space-y-10" variants={fadeRight}>
            {rightFeatures.map((item) => (
              <div key={item.title} className="space-y-3">
                <h3 className="text-lg font-semibold tracking-[0.04em]" style={{ color: "#2a1f16" }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6f5647" }}>
                  {item.desc}
                </p>
                <div
                  className="h-px"
                  style={{ background: "rgba(120,90,70,0.18)" }}
                />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
