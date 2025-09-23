import BackgroundVideo from "@/components/bg-video/BackgroundVideo";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet } from "react-router-dom";

const links = [
  { to: "/open-database", label: "analytic.infobase" },
  { to: "/open-database/all", label: "analytic.infobase" },
  { to: "/open-database/macro&micro", label: "analytic.macro" },
];

export default function OpenDataBaseLayout() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="video-background">
        <BackgroundVideo videoSrc="/about/bg-about.mp4" />
      </div>

      <div className="flex justify-between mt-13 ml-18 ">
        <div className="text-lg poppins none lg:inline-flex lg:flex-col lg:items-start font-medium w-fit">
          {links.map(({ to, label }, i) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                `inline-block  mt-2 
                ${
                  i === 0
                    ? "ml-0 text-[#3460DC]"
                    : "ml-4 " + isActive
                    ? "text-[#A2B6EF]"
                    : "text-white"
                }`
              }
            >
              {t(label)}
            </NavLink>
          ))}
        </div>

        <div className="pe-8 w-[65vw]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
