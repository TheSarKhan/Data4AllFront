import OpenInfoCard from "@/components/OpenInfoCard";
import UploadNewInfoBtn from "@/components/UploadNewInfoBtn";
import { SlidersVertical } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function All() {
  const { t } = useTranslation();
  return (
    <div className="px-4 lg:px-8 xl:px-10 py-6 flex items-center">
      <div className="w-full lg:ml-32">
        <div className="flex flex-col gap-8 lg:pl-48">
          <div className="flex items-center justify-between">
            <h1 className="text-[#3460DC] text-4xl font-bold">{t("analytic.allData")}</h1>
            <SlidersVertical className="text-white size-7 cursor-pointer" />
          </div>
          <div>
            <UploadNewInfoBtn />
          </div>
          <div className="flex flex-col gap-4">
            <OpenInfoCard />
            <OpenInfoCard />
            <OpenInfoCard />
            <OpenInfoCard />
            <OpenInfoCard />
            <OpenInfoCard />
            <OpenInfoCard />
            <OpenInfoCard />
            <OpenInfoCard />
            <OpenInfoCard />
            <OpenInfoCard />
            <OpenInfoCard />
          </div>
        </div>
      </div>
    </div>
  );
}
