export const saveCookie = (res:any, type:string, token:string):void => {
  res.cookie(type, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: parseInt(process.env.COOKIE_HTTP_ONLY_EXPIRE!) * 24 * 60 * 60 * 1000,
    path: "/"
  });
}