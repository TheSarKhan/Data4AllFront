import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import CustomPhoneInput from "@/components/PhoneInput";
import { Link, useNavigate } from "react-router-dom";
import FileUpload from "@/components/FileUpload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BackgroundVideo from "@/components/bg-video/BackgroundVideo";
import { Trans, useTranslation } from "react-i18next";
import { E164Number } from "libphonenumber-js/core";
import api from "@/utils/api";
import { toast } from "sonner";
import { getToken, getTokenRefresh } from "@/utils/token";

const Register = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
        workplace: "",
        phoneNumber: undefined as E164Number | undefined,
    });
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const accessToken = getToken();
    const refreshToken = getTokenRefresh();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [id]: type === "checkbox" ? checked : value,
        }));
    };

    const handlePhoneChange = (value: E164Number | undefined) => {
        setForm((prev) => ({
            ...prev,
            phoneNumber: value,
        }));
    };

    const handleFileChange = (file: File | null) => {
        setProfileImage(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            toast.error('Oops! Passwords do not match.');
            return;
        }

        if (!form.acceptTerms) {
            toast.error('Oops! You must accept the terms and conditions.');
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();

            // Create the registerRequest object as a JSON string
            const registerRequest = {
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                password: form.password,
                confirmPassword: form.confirmPassword,
                acceptTerms: form.acceptTerms,
                workplace: form.workplace,
                phoneNumber: form.phoneNumber || "",
            };

            // Append the registerRequest as a Blob with proper content type
            const registerRequestBlob = new Blob(
                [JSON.stringify(registerRequest)],
                { type: "application/json" }
            );

            formData.append("registerRequest", registerRequestBlob);

            if (profileImage) {
                formData.append("profileImage", profileImage);
            }

            await api.post("/auth/register", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success('Email verification link sent! Please check your inbox.');
            navigate("/login");
        } catch (err: any) {
            console.error("Register error:", err);
            toast.error(err.response?.data || t("auth.registerError"));
        } finally {
            setLoading(false);
        }
    };

    if (accessToken && refreshToken) {
        navigate('/');
        return null;
    }

    return (
        <div>
            <div className="video-background">
                <BackgroundVideo videoSrc="./signIn/bg-video-signIn.mp4" />
            </div>

            <div className="flex justify-end items-center min-h-screen p-4">
                <Card className="w-full max-w-lg text-white bg-[#070618]">
                    <div className="flex">
                        <div className="ml-4 bg-blue-400 rounded-2xl p-1">
                            <Link to={"/"}>
                                <ArrowBackIcon className="text-white" />
                            </Link>
                        </div>
                        <div className="w-full">
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl pr-10">{t("register")}</CardTitle>
                            </CardHeader>
                        </div>
                    </div>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col md:flex-row mb-4 gap-2">
                                <div className="space-y-2 w-full md:w-1/2">
                                    <Label htmlFor="firstName">{t("auth.register.name")}</Label>
                                    <Input
                                        id="firstName"
                                        className="h-12"
                                        value={form.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2 w-full md:w-1/2">
                                    <Label htmlFor="lastName">{t("auth.register.surname")}</Label>
                                    <Input
                                        id="lastName"
                                        className="h-12"
                                        value={form.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 mb-4">
                                <Label htmlFor="email">{t("auth.register.eMail")}</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    className="h-12"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2 mb-4">
                                <Label htmlFor="password">{t("auth.password")}</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        className="h-12"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                        minLength={6}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff size={18} className="text-white" />
                                        ) : (
                                            <Eye className="text-white" size={18} />
                                        )}
                                    </button>
                                </div>
                                <Label htmlFor="confirmPassword">{t("auth.confirmPass")}</Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        type={showPassword ? "text" : "password"}
                                        className="h-12"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col lg:flex-row">
                                <div className="space-y-2 mb-6 w-full lg:w-9/12">
                                    <Label htmlFor="phone">{t("auth.number")}</Label>
                                    <CustomPhoneInput
                                        value={form.phoneNumber}
                                        onChange={handlePhoneChange}
                                    />
                                    <Label htmlFor="workplace">{t("auth.workPlace")}</Label>
                                    <Input
                                        id="workplace"
                                        className="h-12"
                                        value={form.workplace}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-full lg:w-3/12 text-white">
                                    <FileUpload
                                        onFileChange={handleFileChange}
                                        acceptedFormats={["image/jpeg", "image/png"]}
                                    />
                                </div>
                            </div>

                            <div className="flex items-start space-x-2 mb-6 mt-4">
                                <Checkbox
                                    id="acceptTerms"
                                    checked={form.acceptTerms}
                                    onCheckedChange={(checked) =>
                                        setForm((prev) => ({ ...prev, acceptTerms: !!checked }))
                                    }

                                />
                                <div className="grid gap-1.5 leading-none">
                                    <label
                                        htmlFor="acceptTerms"
                                        className="text-sm font-medium leading-none text-white"
                                    >
                                        <Trans
                                            i18nKey="auth.policy"
                                            components={{
                                                1: (
                                                    <a
                                                        href="/terms"
                                                        className="text-blue-600 hover:underline"
                                                    />
                                                ),
                                                3: (
                                                    <a
                                                        href="/privacy"
                                                        className="text-blue-600 hover:underline"
                                                    />
                                                ),
                                            }}
                                        />
                                    </label>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                {loading ? "..." : t("register")}
                            </Button>

                            <div className="text-center mt-4">
                                <Trans
                                    i18nKey="auth.register.haveAccount"
                                    components={{
                                        1: <Link to="/login" className="hover:underline text-blue-500" />,
                                    }}
                                />
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Register;