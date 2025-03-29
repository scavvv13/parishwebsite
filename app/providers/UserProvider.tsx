"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getCurrentUser, fetchAuthSession } from "aws-amplify/auth";

interface UserContextType {
  user: {
    groups: string[];
    givenName: string;
    familyName: string;
    profile_picture: string;
  } | null;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserContextType["user"]>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await fetchAuthSession();
        await getCurrentUser();
        setUser({
          groups: Array.isArray(
            session.tokens?.idToken?.payload["cognito:groups"]
          )
            ? (session.tokens?.idToken?.payload["cognito:groups"] as string[])
            : [],
          profile_picture: String(
            session.tokens?.idToken?.payload.picture || ""
          ),
          givenName: String(session.tokens?.idToken?.payload.given_name || ""),
          familyName: String(
            session.tokens?.idToken?.payload.family_name || ""
          ),
        });
      } catch (error) {
        console.error("Error fetching user session:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading }}>
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
