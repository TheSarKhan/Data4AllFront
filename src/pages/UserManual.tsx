import api from "@/utils/api";
import { useEffect, useState } from "react";

interface UserInstruction {
  header: string;
  message: string;
}

const UserManual = () => {
  const [data, setData] = useState<UserInstruction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/support/user-instruction/az");
        setData(res.data);
      } catch (err) {
        console.error("User manual yüklənmədi:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10 text-white">
        Yüklənir...
      </div>
    );
  }

  return (
    <div className="px-4 lg:px-8 xl:px-10 py-6 flex justify-end items-center">
      <div className="w-[830px]">
        <div className="mb-8">
          <div className="text-3xl md:text-4xl lg:text-5xl text-white font-bold text-center md:text-left">
            <h1>{data?.header}</h1>
          </div>
        </div>
        <p className="text-white text-lg">{data?.message}</p>
      </div>
    </div>
  );
};

export default UserManual;
