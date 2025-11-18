import BackgroundVideo from "@/components/bg-video/BackgroundVideo";
import OpenInfoDataNavCard from "@/components/ui/OpenInfoDataNavCard";
import { useTranslation } from "react-i18next";
// import { Link } from "react-router-dom";

export default function SelectCategory() {
  const { t } = useTranslation();
  return (
    <div className="mt-48">
      <div className="video-background">
        <BackgroundVideo videoSrc="/about/bg-about.mp4" />
      </div>
      <h1 className="text-white text-4xl mb-20 text-center">
        Choose category to add
      </h1>
      <div className="flex items-center justify-center gap-6 mt-6">
        <OpenInfoDataNavCard
          iconName="BarChart"
          to="/open-database/macroandmicro/add"
          title={t("analytic.macroandmicro")}
        />
        <OpenInfoDataNavCard
          iconName="Shiled"
          to="/open-database/health/add"
          title={t("analytic.health")}
        />
        <OpenInfoDataNavCard
          iconName="Plane"
          to="/open-database/tourism/add"
          title={t("analytic.tourism")}
        />
        <OpenInfoDataNavCard
          iconName="Lightning"
          to="/open-database/energy/add"
          title={t("analytic.energy")}
        />
        <OpenInfoDataNavCard
          iconName="PeopleGroup"
          to="/open-database/demographic/add"
          title={t("analytic.demographic")}
        />
        <OpenInfoDataNavCard
          iconName="Agriculture"
          to="/open-database/agriculture/add"
          title={t("analytic.agriculture")}
        />
        <OpenInfoDataNavCard
          iconName="Scales"
          to="/open-database/crime/add"
          title={t("analytic.crime")}
        />
      </div>
    </div>
  );
}
