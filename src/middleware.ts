import NextAuth from "next-auth";
import { authConfig } from "@/config/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // Protects routes as per authConfig callbacks, ignoring static files/api
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
