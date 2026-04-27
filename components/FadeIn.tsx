"use client";

import { motion } from "framer-motion";

export default function FadeIn({
  children,
  delay = 0,
  onLoad = false,
}: {
  children: React.ReactNode;
  delay?: number;
  onLoad?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      {...(onLoad
        ? { animate: { opacity: 1, y: 0 } }
        : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true } }
      )}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}