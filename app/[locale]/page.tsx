import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import HeroSpotlight from "@/components/HeroSpotlight";
import CareerTimeline from "@/components/CareerTimeline";
import SkillsChart from "@/components/SkillsChart";
import WorksSection from "@/components/WorksSection";
import ArticlesSection from "@/components/ArticlesSection";
import Reveal from "@/components/Reveal";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiZenn } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import { routing } from "@/i18n/routing";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  return (
    <div className="wrap" id="view-home">
      <section id="about" className="hero-intro">
        <HeroSpotlight />
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1 className="name">Haru Oba</h1>
        <p className="role">{t("role")}</p>
        <p className="bio">{t("bio")}</p>
      </section>

      <CareerTimeline />
      <SkillsChart />
      <WorksSection />
      <ArticlesSection />

      <Reveal id="contact">
        <h2>{t("contactHeading")}</h2>
        <div className="contact">
          <a href="https://github.com/o1m0" target="_blank" rel="noreferrer">
            <span className="contact-label">
              <FaGithub className="contact-icon" aria-hidden="true" />
              GitHub
            </span>
          </a>
          <a href="https://x.com/0ba_dev" target="_blank" rel="noreferrer">
            <span className="contact-label">
              <FaXTwitter className="contact-icon" aria-hidden="true" />
              X
            </span>
          </a>
          <a href="https://zenn.dev/0ba_dev" target="_blank" rel="noreferrer">
            <span className="contact-label">
              <SiZenn className="contact-icon" aria-hidden="true" />
              Zenn
            </span>
          </a>
          <a
            href="https://www.instagram.com/0ba.dev/"
            target="_blank"
            rel="noreferrer"
          >
            <span className="contact-label">
              <FaInstagram className="contact-icon" aria-hidden="true" />
              Instagram
            </span>
          </a>
          <a href="mailto:contact@0ba.dev">
            <span className="contact-label">
              <MdEmail className="contact-icon" aria-hidden="true" />
              Email
            </span>
          </a>
        </div>
        <footer className="foot mono">{t("footer")}</footer>
      </Reveal>
    </div>
  );
}
