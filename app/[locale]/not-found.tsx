import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("NotFound");
  return (
    <div className="wrap">
      <p className="eyebrow">{t("eyebrow")}</p>
      <h1 className="name" style={{ fontSize: "clamp(3.6rem,11vw,6rem)" }}>
        {t("title")}
      </h1>
      <p className="bio" style={{ marginBottom: 40 }}>
        {t("body")}
      </p>
      <Link className="back-link" href="/">
        {t("backHome")}
      </Link>
    </div>
  );
}
