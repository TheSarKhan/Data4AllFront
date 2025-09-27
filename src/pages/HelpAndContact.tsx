import { useEffect, useState } from "react";
import HelpSidebar from "@/components/HelpSidebar";
import BackgroundVideo from "@/components/bg-video/BackgroundVideo";
import LinearButton from "@/components/ui/linearButton";
import { Outlet, useMatch } from "react-router-dom";
import api from "@/utils/api";

const HelpAndContact = () => {
  const isButton = useMatch("/contact");
  const [links, setLinks] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/support/az");
        setLinks(res.data); 
      } catch (err) {
        console.error("Support linkləri yüklənmədi:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="help-and-contact flex flex-col lg:flex-row">
      <div className="video-background">
        <BackgroundVideo videoSrc="/about/bg-about.mp4" />
      </div>

      {isButton ? (
        <div className="absolute top-[60px] md:right-10 grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-6 w-full lg:max-w-[800px] items-center justify-center p-10 md:p-[60px]">
          {links.map((title, index) => (
            <LinearButton
              key={index}
              title={title}
              pageRouter={
                index === 0
                  ? "faq"
                  : index === 1
                  ? "user_manual"
                  : "contact_form"
              }
            />
          ))}
        </div>
      ) : (
        <HelpSidebar />
      )}

      <Outlet />
    </div>
  );
};

export default HelpAndContact;
