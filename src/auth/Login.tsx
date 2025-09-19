import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BackgroundVideo from '@/components/bg-video/BackgroundVideo';
import { Trans, useTranslation } from 'react-i18next';
import api from '@/utils/api';
import { getToken, getTokenRefresh, setToken, setTokenRefresh } from '@/utils/token';
import { toast } from 'sonner';

declare global {
    interface Window {
        grecaptcha: {
            ready: (callback: () => void) => void;
            execute: (siteKey: string, options: { action: string }) => Promise<string>;
            render: (container: HTMLElement, options: { sitekey: string; theme?: string; size?: string; callback?: (token: string) => void; 'expired-callback'?: () => void; 'error-callback'?: () => void; }) => number;
            getResponse: (widgetId?: number) => string;
            reset: (widgetId?: number) => void;
        };
    }
}

const Login = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
    const [recaptchaRendered, setRecaptchaRendered] = useState(false);
    const recaptchaRef = useRef<HTMLDivElement>(null);
    const accessToken = getToken();
    const refreshToken = getTokenRefresh();
    const [widgetId, setWidgetId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const existingScript = document.querySelector('script[src*="google.com/recaptcha/api.js"]');
        if (existingScript) {
            setRecaptchaLoaded(true);
            initializeRecaptcha();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
        script.async = true;
        script.defer = true;
        script.onload = () => {
            setRecaptchaLoaded(true);
            initializeRecaptcha();
        };
        script.onerror = () => {
            console.error('ReCaptcha script yüklenemedi');
            toast.error(t('auth.recaptchaLoadError'));
        };
        document.head.appendChild(script);

        return () => {
            const existingScript = document.querySelector('script[src*="google.com/recaptcha/api.js"]');
            if (existingScript) {
                document.head.removeChild(existingScript);
            }
        };
    }, []);

    const initializeRecaptcha = () => {
        if (recaptchaRef.current && window.grecaptcha) {
            window.grecaptcha.ready(() => {
                try {
                    const recaptchaSize = isMobile ? 'compact' : 'normal';

                    const id = window.grecaptcha.render(recaptchaRef.current!, {
                        sitekey: '6LerN1MrAAAAAHK3l-g1D8z0377xlEUT9_SbfQv-',
                        theme: 'dark',
                        size: recaptchaSize,
                        callback: function (token: string) {
                            setRecaptchaRendered(true);
                        },
                        'expired-callback': function () {
                            setRecaptchaRendered(false);
                        },
                        'error-callback': function () {
                            setRecaptchaRendered(false);
                        }
                    });
                    setWidgetId(id);
                    setRecaptchaRendered(true);
                } catch (error) {
                    console.error('ReCaptcha render error:', error);
                    toast.error(t('auth.recaptchaInitError'));
                }
            });
        } else {
            console.log('ReCaptcha container or grecaptcha not available');
        }
    };

    useEffect(() => {
        if (recaptchaLoaded && window.grecaptcha && widgetId !== null) {
            try {
                window.grecaptcha.reset(widgetId);
            } catch (error) {
                console.error('ReCaptcha reset error:', error);
            }

            initializeRecaptcha();
        }
    }, [isMobile, recaptchaLoaded]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!window.grecaptcha) {
            toast.error(t('auth.recaptchaNotLoaded'));
            return;
        }

        let recaptchaToken = '';

        if (widgetId === null) {
            recaptchaToken = window.grecaptcha.getResponse();
        } else {
            recaptchaToken = window.grecaptcha.getResponse(widgetId);
        }

        if (!recaptchaToken) {
            toast.error(t('auth.pleaseVerifyCaptcha'));
            return;
        }

        setLoading(true);

        try {
            const response = await api.post('/auth/login', {
                email: formData.email,
                password: formData.password,
                recaptchaToken: recaptchaToken
            });
            const { accessToken, refreshToken } = response.data;

            setToken(accessToken);
            setTokenRefresh(refreshToken);

            toast.success(t('auth.loginSuccess'));
            navigate('/');
            window.location.reload();
        } catch (error: any) {
            toast.error(error.response?.data || t('auth.loginError'));

            try {
                if (window.grecaptcha) {
                    if (widgetId !== null) {
                        window.grecaptcha.reset(widgetId);
                    } else {
                        window.grecaptcha.reset();
                    }
                }
            } catch (resetError) {
                console.error('ReCaptcha reset error:', resetError);
                toast.error(t('auth.recaptchaResetError'));
            }
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

            <div className="flex items-center justify-end min-h-screen p-4">
                <Card className="w-full max-w-lg bg-[#070618] text-white">
                    <div className="ml-4 w-8 bg-blue-400 rounded-2xl p-1">
                        <Link to={"/"}>
                            <ArrowBackIcon className="text-white" />
                        </Link>
                    </div>
                    <CardHeader className="space-y-1 text-center">
                        <CardTitle className="text-2xl">{t('login')}</CardTitle>
                        <p className="text-sm">
                            <Trans
                                i18nKey="auth.login.subTitle"
                                components={{
                                    1: <Link to="/register" className="hover:underline text-blue-600" />
                                }}
                            />
                        </p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">{t('auth.login.userName')}</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    className='h-12 border-2'
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">{t('auth.login.password')}</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        className="h-12 border-2 pr-10"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                    </button>
                                    <Link
                                        to={'/forgot-password'}
                                        className='float-end py-2 hover:underline'
                                        style={{ fontSize: '14px' }}
                                    >
                                        {t('auth.login.forgotPass')}
                                    </Link>
                                </div>
                            </div>

                            {/* Responsive ReCaptcha Container */}
                            <div className="flex justify-center my-4">
                                <div
                                    ref={recaptchaRef}
                                    className="g-recaptcha"
                                    data-sitekey="6LerN1MrAAAAAHK3l-g1D8z0377xlEUT9_SbfQv-"
                                    data-theme="dark"
                                    style={{
                                        transform: isMobile ? 'scale(0.85)' : 'scale(1)',
                                        transformOrigin: 'center center'
                                    }}
                                ></div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="remember"
                                    checked={rememberMe}
                                    onCheckedChange={(checked) => {
                                        setRememberMe(checked as boolean);
                                    }}
                                />
                                <Label
                                    htmlFor="remember"
                                    className="text-sm font-normal cursor-pointer"
                                >
                                    {t('auth.login.remember')}
                                </Label>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                                disabled={loading || !recaptchaLoaded}
                            >
                                {loading ? t('auth.loading') : t('login')}
                            </Button>

                            <div className="relative my-4 flex items-center">
                                <div className="flex-grow border-t border-gray-300"></div>
                                <span className="px-2 text-sm text-white">{t('auth.login.orContinue')}</span>
                                <div className="flex-grow border-t border-gray-300"></div>
                            </div>

                            <Button
                                variant="outline"
                                className="w-full mt-4 h-12 border-gray-300 cursor-pointer text-black"
                                type="button"
                            >
                                <img
                                    src="https://www.google.com/favicon.ico"
                                    alt="Google"
                                    className="w-6 h-6 mr-2"
                                />
                                {t('auth.login.continue')}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Login;