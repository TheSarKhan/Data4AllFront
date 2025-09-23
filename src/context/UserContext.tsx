import { createContext, useReducer, useContext, ReactNode } from "react";

interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    position: string;
    profileImage: string;
    phoneNumber: string;
    workplace: string;
}

interface UserState {
    user: User | null;
    isLogged: boolean;
}

type Action =
    | { type: "SET_USER"; payload: User }
    | { type: "CLEAR_USER" };

const initialState: UserState = { 
    user: null, 
    isLogged: false 
};

interface UserContextType {
    state: UserState;
    setUser: (user: User) => void;
    clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const userReducer = (state: UserState, action: Action): UserState => {
    switch (action.type) {
        case "SET_USER":
            return { 
                user: action.payload, 
                isLogged: true 
            };
        case "CLEAR_USER":
            return { 
                user: null, 
                isLogged: false 
            };
        default:
            return state;
    }
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    const setUser = (user: User) => dispatch({ type: "SET_USER", payload: user });
    const clearUser = () => dispatch({ type: "CLEAR_USER" });

    return (
        <UserContext.Provider value={{ state, setUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};