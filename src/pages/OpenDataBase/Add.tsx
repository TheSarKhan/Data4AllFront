import { useState } from "react";
import uploadFile from "../../../public/generalIcons/uploadFile.svg";
import uploadImage from "../../../public/generalIcons/uploadImage.svg";
import doubleCheck from "../../../public/generalIcons/doubleCheck.svg";
import { Link, useParams } from "react-router-dom";

const Add = () => {
  const [datasetFile, setDatasetFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    date: "",
    datasetName: "",
    datasetTitle: "",
    description: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { category } = useParams<{ category?: string }>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDatasetFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setDatasetFile(file);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!datasetFile || !imageFile) {
      setError("Zəhmət olmasa həm dataset, həm şəkil seçin");
      return;
    }

    const formData = new FormData();

    const requestPayload = {
      author: form.fullName,
      category: category,
      dataSetName: form.datasetName,
      title: form.datasetTitle,
      description: form.description,
    };

    const jsonBlob = new Blob([JSON.stringify(requestPayload)], {
      type: "application/json",
    });

    formData.append("request", jsonBlob);
    formData.append("file", datasetFile);
    formData.append("img", imageFile);

    try {
      setLoading(true);
      const response = await fetch("http://45.94.4.187:8081/api/v1/dataset", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        setError(errorText || "Sorğu uğursuz oldu");
        return;
      }

      setSuccess(true);
    } catch (err) {
      setError("Serverə qoşulmaq mümkün olmadı");
    } finally {
      setLoading(false);
    }
  };

  return success ? (
    <div className="w-full h-full flex justify-center items-center mt-32">
      <div className="poppins text-white bg-[#0c0819] w-[30vw] py-12 flex flex-col justify-center items-center rounded-xl gap-6">
        <h1 className="text-4xl font-semibold">Dataset əlavə olundu</h1>
        <img className="w-16 h-16" src={doubleCheck} alt="doublecheck" />
        <Link
          to="/open-database"
          className="bg-[#4361dc] w-[60%] block text-center p-4 rounded-xl"
        >
          Bağla
        </Link>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center text-white px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-[#0c0717] p-14 rounded-2xl"
      >
        <h1 className="text-4xl font-semibold poppins mb-6">
          Yeni dataset əlavə et
        </h1>

        <div className="mb-8">
          <label className="block mb-2 text-sm">Ad, Soyad</label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="w-full bg-transparent border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-8">
          <label className="block mb-2 text-sm">Tarix</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full bg-transparent border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-8">
          <label className="block mb-2 text-sm">Datasetin adı</label>
          <input
            type="text"
            name="datasetName"
            value={form.datasetName}
            onChange={handleChange}
            className="w-full bg-transparent border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-8">
          <label className="block mb-2 text-sm">Datasetin başlığı</label>
          <input
            type="text"
            name="datasetTitle"
            value={form.datasetTitle}
            onChange={handleChange}
            className="w-full bg-transparent border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <label
            htmlFor="datasetFile"
            className="cursor-pointer border border-dashed border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center hover:border-blue-500 transition"
          >
            <input
              id="datasetFile"
              type="file"
              className="hidden"
              onChange={handleDatasetFileChange}
            />
            <img
              className="w-[50px] h-[50px]"
              src={uploadFile}
              alt="uploadFile"
            />
            <span className="text-sm text-gray-400 mt-2">
              {datasetFile ? datasetFile.name : "Dataset faylı"}
            </span>
          </label>

          <label
            htmlFor="imageFile"
            className="cursor-pointer border border-dashed border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center hover:border-blue-500 transition"
          >
            <input
              id="imageFile"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageFileChange}
            />
            <img
              className="w-[50px] h-[50px]"
              src={uploadImage}
              alt="uploadImage"
            />
            <span className="text-sm text-gray-400 mt-2">
              {imageFile ? imageFile.name : "Şəkil"}
            </span>
          </label>
        </div>

        <div className="mb-8">
          <label className="block mb-2 text-sm">Dataset haqqında məlumat</label>
          <textarea
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
            placeholder="Mətni yazın..."
            className="w-full bg-transparent border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500 resize-none"
          ></textarea>
        </div>

        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading ? "bg-gray-600" : "bg-[#4361dc] hover:bg-[#3550c5]"
          } transition-colors py-3 rounded-lg font-medium`}
        >
          {loading ? "Yüklənir..." : "Əlavə edin"}
        </button>
      </form>
    </div>
  );
};

export default Add;
