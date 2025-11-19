"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const posts = [
  {
    title: "Behind the Bar",
    desc: "How we dial in espresso every morning.",
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80&auto=format&fit=crop",
  },
  {
    title: "House Vibes",
    desc: "A look at the music that shapes our space.",
    src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80&auto=format&fit=crop",
  },
  {
    title: "Slow Mornings",
    desc: "Why we love cozy corners and long stays.",
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80&auto=format&fit=crop",
  },
  {
    title: "Seasonal Sips",
    desc: "Testing new flavor notes for our next menu drop.",
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80&auto=format&fit=crop",
  },
];

export default function BlogPosts() {
  return (
    <section className="w-full bg-[#f6ebdf] border border-[#f0d7c0]/60 shadow-[0_12px_32px_rgba(0,0,0,0.08)] py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight" style={{ color: "#3e3028" }}>
            Blog Posts
          </h2>
          <p className="mt-2 text-sm sm:text-base" style={{ color: "#a67863" }}>
            Warm stories and notes from The Notebook Café
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {posts.map((post) => (
            <motion.article
              key={post.title}
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.03,
                boxShadow: "0 18px 45px rgba(0,0,0,0.18)",
              }}
              className="relative rounded-3xl border border-[#f0d7c0] bg-[#fff7ed] overflow-hidden flex flex-col"
              style={{ color: "#3e3028" }}
            >
              <div className="relative w-full pt-[62%] overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  <Image
                    src={post.src}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    priority={false}
                  />
                </motion.div>
              </div>
              <div className="p-4 sm:p-5 lg:p-6 space-y-1.5">
                <h3 className="text-lg font-semibold" style={{ color: "#3e3028" }}>
                  {post.title}
                </h3>
                <p className="text-sm" style={{ color: "#b88a74" }}>
                  {post.desc}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
