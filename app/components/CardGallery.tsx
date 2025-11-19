"use client";

import { motion } from "framer-motion";

const images = [
  {
    src: "https://images.unsplash.com/photo-1612737144187-d51c1483225a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWVzdGhldGljJTIwY29mZmUlMjBkcmlua3xlbnwwfHwwfHx8MA%3D%3D",
    alt: "Aesthetic coffee drink",
  },
  {
    src: "https://images.unsplash.com/photo-1683882490013-5b94462881a3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YWVzdGhldGljJTIwY29mZmUlMjBkcmlua3xlbnwwfHwwfHx8MA%3D%3D",
    alt: "Coffee bar aesthetic",
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1681711648620-9fa368907a86?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29mZmUlMjBjdXB8ZW58MHx8MHx8fDA%3D",
    alt: "Coffee cup close-up",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
};

const cardVariants = (index: number) => ({
  hidden: {
    opacity: 0,
    y: 50,
    x: index === 0 ? -12 : index === 2 ? 12 : 0,
    rotate: index === 0 ? -6 : index === 2 ? 6 : 0,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    x: index === 0 ? -20 : index === 2 ? 20 : 0,
    rotate: index === 0 ? -4 : index === 2 ? 4 : 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] },
  },
});

export default function CardGallery() {
  return (
    <div className="test-container">
      <div className="main-hero">
        <motion.div
          className="flex-h hero-gallery test-hero-gallery"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          {images.map((img, idx) => (
            <motion.div
              key={img.src}
              variants={cardVariants(idx)}
              whileHover={{
                y: -10,
                scale: 1.04,
                boxShadow: "0 18px 45px rgba(0,0,0,0.18)",
              }}
              whileTap={{ scale: 0.99 }}
              className="hero-image-wrapper"
              style={{ zIndex: images.length - idx }}
            >
              <motion.img
                src={img.src}
                alt={img.alt}
                className="image-cover"
                loading="lazy"
                transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
