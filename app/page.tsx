"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import FadeIn from "@/components/FadeIn";
import { FaGithub } from "react-icons/fa"; // Font Awesome
import { FaXTwitter } from "react-icons/fa6"; // X(Twitter)
import { SiZenn } from "react-icons/si"; // Simple Icons
import { FaInstagram } from "react-icons/fa"; // Instagram
import { MdEmail } from "react-icons/md"; // Material Design
import Footer from '@/components/Footer'
import WorksSection from '@/components/WorksSection'
import ArticlesSection from '@/components/ArticlesSection'

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-6 pt-24 sm:pt-40 pb-20 sm:pb-32 space-y-24 sm:space-y-40">
        <FadeIn onLoad>
          <section id="about">
            <p className="text-xs text-muted-foreground tracking-widest uppercase mb-4">
              Software Engineer
            </p>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-8">
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
                  2021.04
                </span>
                <div className="space-y-3">
                  <p className="text-sm">
                    神戸市立科学技術高等学校 科学工学科 入学
                  </p>
                  <div className="space-y-2 border-l border-border pl-4">
                    <p className="text-xs text-muted-foreground">
                      ジャパンマイコンカーラリー近畿地区大会 CameraClass 3連覇
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ジャパンマイコンカーラリー全国大会 CameraClass 優勝
                    </p>
                    <p className="text-xs text-muted-foreground">
                      マイクロマウス関西地区大会 マイクロマウス部門 特別賞
                    </p>
                    <p className="text-xs text-muted-foreground">
                      全日本マイクロマウス大会 セミファイナル部門 特別賞
                    </p>
                    <p className="text-xs text-muted-foreground">
                      神戸市児童生徒賞 受賞
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-8">
                <span className="text-xs text-muted-foreground w-20 shrink-0 pt-0.5">
                  2024.04
                </span>
                <p className="text-sm">
                  大阪工業大学 情報学部 情報知能学科 入学
                </p>
              </div>
              <div className="flex gap-8">
                <span className="text-xs text-muted-foreground w-20 shrink-0 pt-0.5">
                  2026.04
                </span>
                <p className="text-sm">
                  休学・独学でバックエンドエンジニアを目指す
                </p>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Skills */}
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

            <div className="mt-10 space-y-4">
              <p className="text-xs text-muted-foreground tracking-widest uppercase mb-6">
                Learning Next
              </p>
              {[
                { label: "Backend", value: "Go / PostgreSQL" },
                { label: "Infra", value: "Docker / AWS / Nginx" },
                { label: "Other", value: "GitHub Actions / CI/CD" },
              ].map((item) => (
                <div key={item.label} className="flex gap-8">
                  <span className="text-xs text-muted-foreground w-20 shrink-0 pt-0.5">
                    {item.label}
                  </span>
                  <p className="text-sm text-muted-foreground">{item.value}</p>
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
    <WorksSection />
  </section>
</FadeIn>
<FadeIn delay={0.1}>
  <section id="articles">
    <p className="text-xs text-muted-foreground tracking-widest uppercase mb-8">
      Articles
    </p>
    <ArticlesSection />
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
      <Footer />
    </>
  );
}
