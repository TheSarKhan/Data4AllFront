"use client";
import { Link } from "react-router-dom";
interface WideLinearButtonProps {
  title: string;
  pageRouter: string;
  src?: string;
}

const WideLinearButton: React.FC<WideLinearButtonProps> = ({
  title,
  pageRouter,
  src,
}) => {
  return (
    <div
      className={
        "flex items-center justify-center " +
        `bg-[url(${src})] bg-cover bg-center`
      }
      style={{ backgroundImage: `url(${src})` }}
    >
      <Link
        className="relative w-[552px] min-h-[270px] p-6 rounded-2xl
        text-white flex flex-col justify-between
        border transition-all duration-100 group
        bg-gradient-to-br from-[#1D0416] to-[#315eda5c]
        border-[#3460DC] shadow-[0px_0px_65px_#3460DC40] bg-transparent"
        to={pageRouter}
      >
        <img className="self-end" src="/Analytics/Icon1.svg" alt={title} />
        <div className="text-white text-[30px] h-[80px] font-medium font-poppins max-w-[250px]">
          {title}
        </div>
      </Link>
    </div>
  );
};

export default WideLinearButton;
