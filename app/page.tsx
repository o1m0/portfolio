"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import FadeIn from "@/components/FadeIn";

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-6 pt-40 pb-32 space-y-40">
        <FadeIn onLoad>
          <section id="about">
            <p className="text-xs text-muted-foreground tracking-widest uppercase mb-4">
              Software Engineer
            </p>
            <h1 className="text-5xl font-semibold tracking-tight mb-8">
              Haru Oba
            </h1>
            <p className="text-muted-foreground leading-loose text-sm">
              大阪工業大学 情報知能学科
              在学中。休学してWebエンジニアを目指して独学中。
              バックエンドに興味があり、Next.js・MongoDB・GoなどでWebアプリを開発しています。
            </p>
          </section>
        </FadeIn>

        <FadeIn delay={0.1}>
          <section id="career">
            <p className="text-xs text-muted-foreground tracking-widest uppercase mb-8">
              Career
            </p>
            <div className="space-y-8">
              <div className="flex gap-8">
                <span className="text-xs text-muted-foreground w-20 shrink-0 pt-0.5">
                  2023.04
                </span>
                <p className="text-sm">
                  大阪工業大学 情報学部 情報知能学科 入学
                </p>
              </div>
              <div className="flex gap-8">
                <span className="text-xs text-muted-foreground w-20 shrink-0 pt-0.5">
                  2026.04
                </span>
                <p className="text-sm">休学・独学でWebエンジニアを目指す</p>
              </div>
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={0.1}>
          <section id="skills">
            <p className="text-xs text-muted-foreground tracking-widest uppercase mb-8">
              Skills
            </p>
            <div className="space-y-4">
              {[
                {
                  label: "Frontend",
                  value: "Next.js / React / TypeScript / Tailwind CSS",
                },
                { label: "Backend", value: "Node.js / Express / REST API" },
                { label: "Database", value: "MongoDB / Mongoose" },
                { label: "Tools", value: "Git / GitHub / Vercel" },
              ].map((item) => (
                <div key={item.label} className="flex gap-8">
                  <span className="text-xs text-muted-foreground w-20 shrink-0 pt-0.5">
                    {item.label}
                  </span>
                  <p className="text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={0.1}>
          <section id="works">
            <p className="text-xs text-muted-foreground tracking-widest uppercase mb-8">
              Works
            </p>
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-medium">Rannery</h3>
                <motion.a
                  href="https://github.com/o1m0/rannery"
                  target="_blank"
                  className="text-xs text-muted-foreground transition-colors"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  GitHub &#8594;
                </motion.a>
              </div>
              <p className="text-sm text-muted-foreground leading-loose">
                AIが学習プランを自動生成・修正する学習管理アプリ。
                Next.js・MongoDB・Gemini APIを使って個人開発しました。
              </p>
              <div className="flex gap-2 flex-wrap pt-2">
                {[
                  "Next.js",
                  "TypeScript",
                  "MongoDB",
                  "Gemini API",
                  "Vercel",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs border border-border px-2 py-1 rounded-full text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={0.1}>
          <section id="contact">
            <p className="text-xs text-muted-foreground tracking-widest uppercase mb-8">
              Contact
            </p>
            <div className="space-y-4">
              <motion.a
                href="https://github.com/o1m0"
                target="_blank"
                className="flex justify-between items-center group"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-sm">GitHub</span>
                <motion.span
                  className="text-sm text-muted-foreground"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  @o1m0 &#8594;
                </motion.span>
              </motion.a>
              <motion.a
                href="mailto:your-email@gmail.com"
                className="flex justify-between items-center group"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-sm">Email</span>
                <motion.span
                  className="text-sm text-muted-foreground"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  your-email@gmail.com &#8594;
                </motion.span>
              </motion.a>
            </div>
          </section>
        </FadeIn>
      </main>

      <footer className="border-t border-border">
        <div className="max-w-2xl mx-auto px-6 py-8">
          <p className="text-xs text-muted-foreground">© 2026 Haru</p>
        </div>
      </footer>
    </>
  );
}
