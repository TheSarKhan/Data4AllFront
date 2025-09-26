import { Link } from "react-router-dom";
import Icon from "../Icons/OpenDataBaseIcons";

export default function OpenInfoDataNavCard({
  to,
  iconName,
  title,
}: {
  to: string;
  iconName: string;
  title: string;
}) {
  return (
    <Link to={to} className="group">
      <div
        className="category-card flex flex-col items-center justify-center
                      w-36 h-36 px-6 py-6 gap-4
                      text-white rounded-xl
                      hover:shadow-[0_0_25px] shadow-[#34467B]
                      hover:text-[#975BE4] transition"
      >
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 flex-shrink-0">
            <Icon
              name={iconName}
              className="w-full h-full stroke-white group-hover:stroke-[#975BE4]"
            />
          </div>

          <div className="mt-4 h-12 flex items-center justify-center text-center">
            <h3 className="text-base leading-snug">{title}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
}
