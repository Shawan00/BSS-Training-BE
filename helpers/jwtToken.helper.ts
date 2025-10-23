import * as jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";

export interface tokenDecoded {
  shopifyDomain: string;
  iat: number;
  exp: number;
  expired?: boolean;
}

export const genAccessToken = (shopify_domain: string): string => {
  const options: SignOptions = { expiresIn: parseInt(process.env.ACCESS_TOKEN_SECRET_EXPIRE!) || 5000 };
  const accessToken: string = jwt.sign({ shopify_domain }, process.env.ACCESS_TOKEN_SECRET!, options);
  return accessToken;
}

export const genRefreshToken = (shopify_domain: string): string => {
  const options: SignOptions = { expiresIn: parseInt(process.env.REFRESH_TOKEN_SECRET_EXPIRE!) * 24 * 60 * 60 * 1000 };
  const refreshToken: string = jwt.sign({ shopify_domain }, process.env.REFRESH_TOKEN_SECRET as string, options);
  return refreshToken;
}

export const verifyToken = (token: string, type: "access" | "refresh"): tokenDecoded | null => {
  try {
    const secretKey: string = type === "access" ? process.env.ACCESS_TOKEN_SECRET! : process.env.REFRESH_TOKEN_SECRET!;
    const decoded: tokenDecoded = jwt.verify(token, secretKey) as tokenDecoded;
    if (decoded.exp && decoded.exp < Date.now() / 1000) {
      decoded.expired = true;
    } else {
      decoded.expired = false;
    }
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}
