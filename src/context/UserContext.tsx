import React, { createContext, useReducer, useEffect } from "react";

type User = {
  id: number;
  email: string;
  token: string;
};

type UserState = {
  user: User | null;
  error: string | null;
  loading: boolean;
};

type UserAction =
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_ERROR"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "CLEAR_ERROR" };

interface UserContextProps extends UserState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string) => Promise<void>;
  clearError: () => void;
}

const initialUserState: UserState = {
  user: null,
  error: null,
  loading: false,
};

const UserContext = createContext<UserContextProps>({
  ...initialUserState,
  login: () => Promise.resolve(),
  logout: () => null,
  signup: () => Promise.resolve(),
  clearError: () => null,
});

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);

  useEffect(() => {
    const checkSession = async () => {
      dispatch({ type: "SET_LOADING", payload: true });

      try {
        const response = await fetch("/api/session", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          dispatch({ type: "SET_USER", payload: data.user });
        } else {
          dispatch({ type: "SET_ERROR", payload: "Error checking session" });
        }
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: "Error checking session" });
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "SET_USER", payload: data.user });
      } else {
        dispatch({ type: "SET_ERROR", payload: "Invalid email or password" });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Error logging in" });
    }
  };

  const signup = async (email: string, password: string) => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "SET_USER", payload: data.user });
      }

      if (response.status === 409) {
        dispatch({ type: "SET_ERROR", payload: "Email already in use" });
      }

      if (response.status === 400) {
        dispatch({ type: "SET_ERROR", payload: "Invalid email or password" });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Error signing up" });
    }
  };

  const logout = async () => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        dispatch({ type: "SET_USER", payload: null });
      } else {
        dispatch({ type: "SET_ERROR", payload: "Error logging out" });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Error logging out" });
    }
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        login,
        signup,
        logout,
        clearError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};