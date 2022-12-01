import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { useCookieSync } from "../hooks/useCookieSync";
import { JwtContent, jwtContentSchema } from "@weett/schemas/jwt";

type AuthenticationUser = {
  id: string;
  name: string;
  email: string;
};

type Authentication = {
  user?: AuthenticationUser;

  isSigned: boolean;
  authenticate: (token: string) => void;
};

export const AuthenticationContext = createContext<Authentication | null>(null);

const parseToken = (token: string) => {
  const withoutBearer = token.split("Bearer ")[1];

  const decodedToken = jwt.decode(withoutBearer);
  return jwtContentSchema.parse(decodedToken);
};

const cookieOptions = {
  key: "weett/auth",
  defaultValue: undefined,
  schema: z.string().min(3),
  expiresIn: [3, "d"] as const,
} as const;

export const AuthenticationProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useCookieSync(cookieOptions);
  const [user, setUser] = useState<JwtContent>();

  const isSigned = useMemo(() => {
    return !!token;
  }, [token]);

  const authenticate = useCallback((token: string) => {
    setToken(token);
  }, []);

  useEffect(() => {
    if (!token) return;
    try {
      const user = parseToken(token);
      setUser(user);
    } catch (error) {
      setToken(undefined);
      setUser(undefined);
    }
  }, [token]);

  return (
    <AuthenticationContext.Provider value={{ user, isSigned, authenticate }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);

  if (!context)
    throw new Error(
      "useAuthentication must be called inside UseAuthenticationProvider"
    );

  return context;
};
