"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import FadeIn from "@/components/FadeIn";
import { BsTypescript } from "react-icons/bs";
import { RiNextjsFill } from "react-icons/ri";
import { TbBrandMongodb } from "react-icons/tb";
import { IoLogoVercel } from "react-icons/io5";
import { FaGithub } from "react-icons/fa"; // Font Awesome
import { FaXTwitter } from "react-icons/fa6"; // X(Twitter)
import { SiZenn } from "react-icons/si"; // Simple Icons
import { FaInstagram } from "react-icons/fa"; // Instagram
import { MdEmail } from "react-icons/md"; // Material Design

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

        {/* Works */}
        <FadeIn delay={0.1}>
          <section id="works">
            <p className="text-xs text-muted-foreground tracking-widest uppercase mb-8">
              Works
            </p>
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-medium">Rannery</h3>
                  <span className="text-xs border border-border text-muted-foreground px-2 py-0.5 rounded-full">
                    個人開発
                  </span>
                  <span className="text-xs border border-green-500 text-green-500 px-2 py-0.5 rounded-full">
                    完成
                  </span>
                </div>
                <div className="flex gap-4">
                  <motion.a
                    href="https://rannery.vercel.app"
                    target="_blank"
                    className="text-xs text-muted-foreground transition-colors"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    Demo &#8594;
                  </motion.a>
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
              </div>
              <p className="text-sm text-muted-foreground leading-loose">
                AIが学習プランを自動生成・修正する学習管理アプリ。
                Next.js・MongoDB・Gemini APIを使って個人開発しました。
              </p>
              <div className="flex gap-3 flex-wrap pt-2 items-center">
                <RiNextjsFill size={18} className="text-muted-foreground" />
                <BsTypescript size={16} className="text-muted-foreground" />
                <TbBrandMongodb size={18} className="text-muted-foreground" />
                <IoLogoVercel size={16} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Gemini API
                </span>
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
              {[
                {
                  icon: <FaGithub size={16} />,
                  label: "GitHub",
                  href: "https://github.com/o1m0",
                  sub: "@o1m0",
                },
                {
                  icon: <FaXTwitter size={16} />,
                  label: "X",
                  href: "https://x.com/0ba_dev",
                  sub: "@0ba_dev",
                },
                {
                  icon: <SiZenn size={16} />,
                  label: "Zenn",
                  href: "https://zenn.dev/0ba_dev",
                  sub: "@0ba_dev",
                },
                {
                  icon: <FaInstagram size={16} />,
                  label: "Instagram",
                  href: "https://www.instagram.com/0ba.dev/",
                  sub: "@0ba.dev",
                },
                {
                  icon: <MdEmail size={16} />,
                  label: "Email",
                  href: "contact@0ba.dev",
                  sub: "contact@0ba.dev",
                },
              ].map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  className="flex justify-between items-center group"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="flex items-center gap-3 text-sm text-muted-foreground">
                    {item.icon}
                    {item.label}
                  </span>
                  <motion.span
                    className="text-sm text-muted-foreground"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.sub} &#8594;
                  </motion.span>
                </motion.a>
              ))}
            </div>
          </section>
        </FadeIn>
      </main>

      <footer className="border-t border-border">
        <div className="max-w-2xl mx-auto px-6 py-8">
          <p className="text-xs text-muted-foreground">© 2026 Haru Oba</p>
        </div>
      </footer>
    </>
  );
}
