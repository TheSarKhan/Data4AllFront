import Cookies from "js-cookie";

const TOKEN_KEY = 'token';
const REFRESH_KEY = 'refresh-token';

export const setToken = (token: string): void => {
    Cookies.set(TOKEN_KEY, token, {
        expires: 7
    });
};
export const setTokenRefresh = (token: string): void => {
    Cookies.set(REFRESH_KEY, token, {
        expires: 7
    });
};

export const getToken = (): string | undefined => {
    return Cookies.get(TOKEN_KEY);
};

export const getTokenRefresh = (): string | undefined => {
    return Cookies.get(REFRESH_KEY);
};


export const removeToken = (): void => {
    Cookies.remove(TOKEN_KEY);
};

export const removeTokenRefresh = (): void => {
    Cookies.remove(REFRESH_KEY);
};

export const clearTokens = (): void => {
    removeToken();
    removeTokenRefresh();
};
