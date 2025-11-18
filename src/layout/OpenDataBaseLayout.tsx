import BackgroundVideo from "@/components/bg-video/BackgroundVideo";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet } from "react-router-dom";

const links = [
  { to: "/open-database", label: "analytic.infobase" },
  { to: "/open-database/all", label: "analytic.all" },
  { to: "/open-database/macroandmicro", label: "analytic.macroandmicro" },
  { to: "/open-database/health", label: "analytic.health" },
  { to: "/open-database/tourism", label: "analytic.tourism" },
  { to: "/open-database/energy", label: "analytic.energy" },
  { to: "/open-database/demographic", label: "analytic.demographic" },
  { to: "/open-database/agriculture", label: "analytic.agriculture" },
  { to: "/open-database/crime", label: "analytic.crime" },
];

export default function OpenDataBaseLayout() {
  const { t } = useTranslation();
  
  return (
    <div className="relative">
      <div className="video-background">
        <BackgroundVideo videoSrc="/about/bg-about.mp4" />
      </div>

      <div className="fixed top-1/4 left-18 text-lg poppins font-medium flex flex-col items-start">
        {links.map(({ to, label }, i) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `inline-block mt-2 
                ${
                  i === 0
                    ? "ml-0 mb-2 text-[#3460DC]"
                    : "ml-4 " + (isActive ? "text-[#A2B6EF]" : "text-white")
                }`
            }
          >
            {t(label)}
          </NavLink>
        ))}
        <NavLink to={""} end className="inline-block mt-4 text-white">
          İqtisadi göstəricilər
        </NavLink>
        <NavLink to={""} end className="inline-block mt-4 text-white">
          Beynəlxalq göstəricilər
        </NavLink>
      </div>

      <div className="flex justify-end">
        <div className="pe-8 w-[65vw]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
