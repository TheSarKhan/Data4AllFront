/// <reference types="vite-plugin-svgr/client" />
import DataBaseIcon from "@/assets/icons/openDataBase/dataBase_icon.svg?react";
import BarChartIcon from "@/assets/icons/openDataBase/barChart_icon.svg?react";
import ShiledIcon from "@/assets/icons/openDataBase/shield_icon.svg?react";
import PlaneIcon from "@/assets/icons/openDataBase/plane_icon.svg?react";
import LightningIcon from "@/assets/icons/openDataBase/lightning_icon.svg?react";
import PeopleGroupIcon from "@/assets/icons/openDataBase/peopleGroup_icon.svg?react";
import AgricultureIcon from "@/assets/icons/openDataBase/agriculture_icon.svg?react";
import ScalesIcon from "@/assets/icons/openDataBase/scales_icon.svg?react";

console.log(DataBaseIcon);

const ICONS = {
  DataBase: DataBaseIcon,
  BarChart: BarChartIcon,
  Shiled: ShiledIcon,
  Plane: PlaneIcon,
  Lightning: LightningIcon,
  PeopleGroup: PeopleGroupIcon,
  Agriculture: AgricultureIcon,
  Scales: ScalesIcon,
} as const;

export default function Icon({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  const IconComponent = ICONS[name as keyof typeof ICONS];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
}
