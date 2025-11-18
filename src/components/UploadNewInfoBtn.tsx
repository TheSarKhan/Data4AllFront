import { BsFileEarmarkPlus } from "react-icons/bs";
import { Link } from "react-router-dom";

const UploadNewInfoBtn = ({to}:{to?:string}) => {
  return (
    <Link
      to={to ?? "add"}
      className="flex items-center gap-2 text-white bg-[#3460DC] px-5 py-3.5 rounded-4xl text-lg cursor-pointer"
    >
      Yeni məlumat elavə et
      <BsFileEarmarkPlus className="size-6" />
    </Link>
  );
};

export default UploadNewInfoBtn;
