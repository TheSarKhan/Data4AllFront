import BackgroundVideo from "@/components/bg-video/BackgroundVideo";
import { GoDatabase } from "react-icons/go";
import { PiUsers } from "react-icons/pi";
import UploadNewInfoBtn from "@/components/UploadNewInfoBtn";
import { SearchIcon } from "lucide-react";
import LinearButton from "@/components/ui/linearButton";
import OpenInfoDataNavCard from "@/components/ui/OpenInfoDataNavCard";
import WideLinearButton from "@/components/ui/WideLinearButton";
import { useTranslation } from "react-i18next";

const OpenDataBase = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="video-background">
        <BackgroundVideo videoSrc="/about/bg-about.mp4" />
      </div>

      <section className="flex flex-col items-center justify-center pt-24 px-8 mb-6">
        <div className="flex flex-col items-center w-full">
          <h1 className="text-4xl text-[#F9F9F9] font-semibold leading-tight items-center flex flex-col lg:pb-14">
            Açıq Məlumat Bazası Portalına
            <span className="block">Xoş Gəlmisiniz!</span>
          </h1>
          <form className="flex w-full max-w-[940px]">
            <button
              type="submit"
              className="px-4 py-3.5 bg-[#1E1A26BD] text-white rounded-l-4xl cursor-pointer"
            >
              <SearchIcon />
            </button>
            <input
              type="text"
              placeholder="Axtarış"
              className="bg-[#1E1A26BD] w-full px-1 py-3.5 text-lg rounded-r-4xl text-white"
            />
          </form>
          <div className="flex gap-5 lg:pb-14 pt-2 text-white">
            <h4 className="flex items-center gap-2">
              <GoDatabase /> 343 məlumat dəstləri dərc edilmişdir
            </h4>
            <h4 className="flex items-center gap-2">
              <PiUsers /> 232 nəşriyyatçılar
            </h4>
          </div>

          <UploadNewInfoBtn to={"select-category"} />
        </div>

        <div className="flex gap-6 mt-6">
          <OpenInfoDataNavCard
            iconName="DataBase"
            to="all"
            title={t("analytic.all")}
          />
          <OpenInfoDataNavCard
            iconName="BarChart"
            to="macroandmicro"
            title={t("analytic.macroandmicro")}
          />
          <OpenInfoDataNavCard
            iconName="Shiled"
            to="health"
            title={t("analytic.health")}
          />
          <OpenInfoDataNavCard
            iconName="Plane"
            to="tourism"
            title={t("analytic.tourism")}
          />
          <OpenInfoDataNavCard
            iconName="Lightning"
            to="energy"
            title={t("analytic.energy")}
          />
          <OpenInfoDataNavCard
            iconName="PeopleGroup"
            to="demographic"
            title={t("analytic.demographic")}
          />
          <OpenInfoDataNavCard
            iconName="Agriculture"
            to="agriculture"
            title={t("analytic.agriculture")}
          />
          <OpenInfoDataNavCard
            iconName="Scales"
            to="crime"
            title={t("analytic.crime")}
          />
        </div>
        <div className="mt-6">
          <div className="flex justify-between w-full gap-6">
            <WideLinearButton
              src="public/OpenDataBase/map.png"
              title="Azərbaycan Açıq Məlumat Siyasəti"
              pageRouter="economic_indicators"
            />
            <WideLinearButton
              title="Statistik təqvim"
              pageRouter="economic_indicators"
            />
          </div>
          <div className="flex justify-center flex-wrap gap-6 pt-12 w-full">
            <LinearButton
              title="Azərbaycan Açıq Məlumat Siyasəti"
              pageRouter="economic_indicators"
            />
            <LinearButton
              title="Milli Portal"
              pageRouter="international_demonstrators"
            />
            <LinearButton title="Dataset sorğusu" pageRouter="open_infobase" />
          </div>
        </div>
      </section>
    </>
  );
};

export default OpenDataBase;
