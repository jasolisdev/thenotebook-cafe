"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.19, 1.0, 0.22, 1.0] as const
    }
  },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40, scale: 0.98 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.19, 1.0, 0.22, 1.0] as const
    }
  },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40, scale: 0.98 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.19, 1.0, 0.22, 1.0] as const
    }
  },
};

const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.92, rotateY: -5 },
  show: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 0.9,
      ease: [0.19, 1.0, 0.22, 1.0] as const,
      delay: 0.2
    }
  },
};

const featureItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.19, 1.0, 0.22, 1.0] as const
    }
  },
};

const leftFeatures = [
  {
    title: "Single-Origin, Lightly Roasted",
    desc: "Bright, clean flavor profiles from farms we know by name—roasted gently to preserve the origin notes you can taste.",
    icon: "bean"
  },
  {
    title: "Clean & Pesticide-Free",
    desc: "We partner with growers who farm responsibly, so every cup stays pure, traceable, and free of harsh chemicals.",
    icon: "leaf"
  },
];

const rightFeatures = [
  {
    title: "Hand-Selected, Micro-Batch",
    desc: "Each lot is cupped, graded, and roasted in small batches for balance—never mass-produced, always intentional.",
    icon: "hand"
  },
  {
    title: "Served Fresh, Never Bitter",
    desc: "Brewed to order with precise recipes, filtered water, and calibrated grinders for a smooth, silky finish every time.",
    icon: "cup"
  },
];

// Feature icon components
const FeatureIcon = ({ type }: { type: string }) => {
  const iconProps = {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (type === "bean") {
    return (
      <svg {...iconProps}>
        <ellipse cx="12" cy="12" rx="8" ry="10" transform="rotate(-30 12 12)" />
        <path d="M8 10c2 2 4 4 8 4" />
      </svg>
    );
  }
  if (type === "leaf") {
    return (
      <svg {...iconProps}>
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    );
  }
  if (type === "hand") {
    return (
      <svg {...iconProps}>
        <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
        <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
        <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
        <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
      </svg>
    );
  }
  if (type === "cup") {
    return (
      <svg {...iconProps}>
        <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
        <line x1="6" y1="2" x2="6" y2="4" />
        <line x1="10" y1="2" x2="10" y2="4" />
        <line x1="14" y1="2" x2="14" y2="4" />
      </svg>
    );
  }
  return null;
};

export default function CoffeeDifferenceSection() {
  return (
    <section className="w-full px-4 sm:px-6 py-16 sm:py-20 lg:py-28 relative overflow-hidden">
      {/* Subtle decorative background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute top-[10%] left-[5%] w-32 h-32 rounded-full bg-[#a48374]" />
        <div className="absolute bottom-[15%] right-[8%] w-40 h-40 rounded-full bg-[#a48374]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Headline */}
        <motion.div
          className="text-center mb-14 sm:mb-16 lg:mb-20"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <motion.div
            className="inline-block mb-4 px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(164, 131, 116, 0.08)",
              border: "1px solid rgba(164, 131, 116, 0.15)"
            }}
          >
            <span className="text-xs sm:text-sm font-medium tracking-wider uppercase" style={{ color: "#a48374" }}>
              Our Commitment
            </span>
          </motion.div>
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.75rem] font-semibold tracking-tight leading-tight"
            style={{ color: "#2a1f16" }}
          >
            What Makes Our Coffee Different?
          </motion.h2>
          <motion.p
            className="mt-4 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#6f5647" }}
          >
            Four pillars of quality that define every cup we serve
          </motion.p>
        </motion.div>

        {/* Center image */}
        <motion.div
          className="w-full mb-12 sm:mb-16"
          variants={fadeScale}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div
            className="overflow-hidden rounded-[32px] bg-gradient-to-br from-[#fff7ed] to-[#f4f0e9] p-1.5 shadow-2xl max-w-[400px] lg:max-w-[500px] mx-auto group"
            style={{
              border: "1px solid rgba(164, 131, 116, 0.2)",
            }}
          >
            <div
              className="overflow-hidden rounded-[26px] transition-transform duration-700 group-hover:scale-[1.02]"
              style={{ aspectRatio: "4 / 5" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1610030621290-527342d7eb4a?q=80&w=925&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Artisan coffee craftsmanship"
                width={925}
                height={700}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                priority={false}
              />
            </div>
          </div>
        </motion.div>

        {/* Features grid - all 4 cards below image */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {[...leftFeatures, ...rightFeatures].map((item, idx) => (
            <motion.div
              key={item.title}
              variants={featureItem}
              className="group relative"
            >
              <div
                className="relative p-6 sm:p-7 lg:p-8 rounded-2xl transition-all duration-500 hover:shadow-lg h-full"
                style={{
                  background: "rgba(244, 240, 233, 0.4)",
                  border: "1px solid rgba(164, 131, 116, 0.12)",
                }}
              >
                {/* Icon */}
                <div
                  className="inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: "rgba(164, 131, 116, 0.12)",
                    color: "#a48374"
                  }}
                >
                  <FeatureIcon type={item.icon} />
                </div>

                {/* Content */}
                <h3
                  className="text-lg sm:text-xl font-semibold tracking-tight mb-3"
                  style={{ color: "#2a1f16" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm sm:text-[15px] leading-relaxed"
                  style={{ color: "#6f5647" }}
                >
                  {item.desc}
                </p>

                {/* Subtle accent line */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
                  style={{ background: "linear-gradient(90deg, rgba(164,131,116,0.4), rgba(164,131,116,0))" }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
