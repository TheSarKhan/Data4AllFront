import { useParams } from "react-router-dom";
import OpenInfoCard from "@/components/OpenInfoCard";
import UploadNewInfoBtn from "@/components/UploadNewInfoBtn";
import { SlidersVertical } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import api from "@/utils/api";

export default function DataSets() {
  const { t } = useTranslation();
  const { category } = useParams<{ category?: string }>();
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    if (category === "all") {
      api
        .get(`dataset/get/all`)
        .then((response) => response.data)
        .then((data) => setDatasets(data));
    } else {
      api
        .get(`dataset/get/all/${category}`, {
          params: {
            offset: 0,
          },
        })
        .then((response) => response.data)
        .then((data) => setDatasets(data.content));
    }
  }, [category]);

  console.log(datasets);
  return (
    <div className="px-4 lg:px-8 xl:px-10 py-6 flex items-center">
      <div className="w-full lg:ml-32">
        <div className="flex flex-col gap-8 lg:pl-48">
          <div className="flex items-center justify-between">
            <h1 className="text-[#3460DC] text-4xl font-bold">
              {t(`analytic.${category}`)}
            </h1>
            <SlidersVertical className="text-white size-7 cursor-pointer" />
          </div>
          <div>
            <UploadNewInfoBtn />
          </div>
          <div className="flex flex-col gap-4">
            {datasets.map((ds, i) => {
              return <OpenInfoCard dataset={ds} key={i} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
