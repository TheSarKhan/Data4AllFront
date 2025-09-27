import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "@/utils/api";

const ContactForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { planId } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    fatherName: "",
    phoneNumber: "",
    email: "",
    applicationType: "",
    message: "",
    language: "az", 
  });

  const [formCompleted, setFormCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleForm = async () => {
    try {
      setLoading(true);

      await api.post("/support/contact-form", formData);

      localStorage.setItem("currentPlanId", planId);
      setFormCompleted(true);
    } catch (err) {
      console.error("Form göndərilərkən xəta:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:w-[90%] min-h-screen text-white p-6 relative overflow-x-hidden">
      <div className="flex justify-end min-h-screen">
        <div className="w-full max-w-[800px] flex flex-col px-4">
          <div
            className={`bg-[#070618CC]/85 p-8 sm:p-16 rounded-xl space-y-6 ${
              formCompleted ? "max-w-[600px] mx-auto" : ""
            }`}
          >
            {!formCompleted ? (
              <>
                <h1 className="text-2xl sm:text-3xl font-medium text-center text-[#F9F9F9]">
                  Əlaqə Forması
                </h1>

                <div className="w-full max-w-full sm:max-w-[700px] mx-auto">
                  {/* Ad */}
                  <div className="mb-6">
                    <label className="block text-[#F9F9F9] text-sm mb-2">Ad</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border border-[#66666659] rounded-md p-3 text-white focus:border-[#3460DC] focus:outline-none"
                    />
                  </div>

                  {/* Soyad */}
                  <div className="mb-6">
                    <label className="block text-[#F9F9F9] text-sm mb-2">Soyad</label>
                    <input
                      type="text"
                      name="surname"
                      value={formData.surname}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border border-[#66666659] rounded-md p-3 text-white focus:border-[#3460DC] focus:outline-none"
                    />
                  </div>

                  {/* Ata adı */}
                  <div className="mb-6">
                    <label className="block text-[#F9F9F9] text-sm mb-2">Ata adı</label>
                    <input
                      type="text"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border border-[#66666659] rounded-md p-3 text-white focus:border-[#3460DC] focus:outline-none"
                    />
                  </div>

                  {/* Telefon nömrəsi */}
                  <div className="mb-6">
                    <label className="block text-[#F9F9F9] text-sm mb-2">Telefon nömrəsi</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border border-[#66666659] rounded-md p-3 text-white focus:border-[#3460DC] focus:outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-6">
                    <label className="block text-[#F9F9F9] text-sm mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border border-[#66666659] rounded-md p-3 text-white focus:border-[#3460DC] focus:outline-none"
                    />
                  </div>

                  {/* Müraciət növü */}
                  <div className="mb-6">
                    <label className="block text-[#F9F9F9] text-sm mb-2">Müraciət növü</label>
                    <input
                      type="text"
                      name="applicationType"
                      value={formData.applicationType}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border border-[#66666659] rounded-md p-3 text-white focus:border-[#3460DC] focus:outline-none"
                    />
                  </div>

                  {/* Müraciət mətni */}
                  <div className="mb-6">
                    <label className="block text-[#F9F9F9] text-sm mb-2">Müraciət mətni</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border border-[#66666659] rounded-md p-3 text-white focus:border-[#3460DC] focus:outline-none"
                    />
                  </div>

                  {/* Submit */}
                  <div className="flex space-x-4 mt-6">
                    <button
                      onClick={handleForm}
                      disabled={loading}
                      className="w-full bg-[#3460DC] hover:bg-[#2a50ba] text-white py-3 px-4 rounded-lg font-medium transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {loading ? "Göndərilir..." : "Müraciət etmək"}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center space-y-10">
                <h1 className="text-3xl font-medium">Müraciətiniz qeydə alındı</h1>

                <div className="flex justify-center">
                  <img
                    src="/click.svg"
                    alt="Confirmation checkmark"
                    className="w-20 h-20 mx-auto mt-2"
                  />
                </div>

                <button
                  onClick={() => navigate("/contact")}
                  className="w-full bg-[#3460DC] hover:bg-[#2a50ba] text-white py-3 px-4 rounded-lg font-medium transition-colors cursor-pointer"
                >
                  Bağla
                </button>
              </div>
            )}
          </div>
          <div className={`flex-1 ${formCompleted ? "mb-12" : "mb-4"}`}></div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
