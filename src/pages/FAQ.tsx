import { useEffect, useState } from "react";
import IconAccordion from "/report/IconAccordion.png";
import api from "@/utils/api";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  title: string;
  faqs: FAQItem[];
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openSection, setOpenSection] = useState<number | null>(null);
  const [sections, setSections] = useState<FAQSection[]>([]);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const res = await api.get("/support/faq/az");
        const data = res.data;

        const transformed: FAQSection[] = Object.entries(
          data.headersSubHeadersAndTheirContentMap
        ).map(([title, questionsObj]) => ({
          title,
          faqs: Object.entries(questionsObj as Record<string, string>).map(
            ([q, a]) => ({
              question: q,
              answer: a,
            })
          ),
        }));

        setSections(transformed);
      } catch (error) {
        console.error("FAQ fetch error:", error);
      }
    };

    fetchFAQs();
  }, []);

  const toggleAccordion = (sectionIndex: number, faqIndex: number) => {
    if (openSection === sectionIndex && openIndex === faqIndex) {
      setOpenSection(null);
      setOpenIndex(null);
    } else {
      setOpenSection(sectionIndex);
      setOpenIndex(faqIndex);
    }
  };

  return (
    <div className="md:w-[90%] px-4 lg:px-8 xl:px-10 py-6 flex justify-end items-center">
      <div className="w-[830px]">
        <h1 className="text-2xl sm:text-4xl font-medium mb-10 text-[#F9F9F9]">
          Tez-tez verilən suallar
        </h1>

        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-10">
            <h3 className="text-3xl md:text-4xl lg:text-[36px] text-white mb-6">
              {section.title}
            </h3>
            {section.faqs.map((faq, faqIndex) => {
              const isOpen =
                openSection === sectionIndex && openIndex === faqIndex;

              return (
                <div
                  key={faqIndex}
                  className="mt-6 border rounded-[8px] cursor-pointer text-white"
                  style={{ borderColor: "#373641" }}
                  onClick={() => toggleAccordion(sectionIndex, faqIndex)}
                >
                  <div className="flex justify-between items-center p-5">
                    <h3 className="text-[20px]">{faq.question}</h3>
                    <img
                      className={`w-7 transform transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      src={IconAccordion}
                      alt="IconAccordion"
                    />
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-500`}
                    style={{ maxHeight: isOpen ? "500px" : "0px" }}
                  >
                    <p className="text-[20px] bg-[#65558F6E] p-5">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
