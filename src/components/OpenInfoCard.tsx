import { Link } from "react-router-dom";

interface DataSet {
  author: string;
  category: string;
  createdAt: string;
  dataSetName: string;
  description: string;
  fileUrl: string;
  id: number;
  imageUrl: string;
  title: string;
}

const OpenInfoCard = ({ dataset }: { dataset: DataSet }) => {
  return (
    <div className="bg-transparent w-full px-3.5 pt-3.5 pb-2 flex flex-col gap-11 border-2 border-[#5D5659] rounded-xs">
      <Link to="1">
        <h3 className="text-white text-lg">{dataset.dataSetName}</h3>
      </Link>
      <div className="flex flex-col gap-1 text-xs text-[#7C88AA]">
        <h5>Yükləyən: {dataset.author}</h5>
        <h5>Tarix: {dataset.createdAt}</h5>
      </div>
    </div>
  );
};

export default OpenInfoCard;
