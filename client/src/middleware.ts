import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/", "/(ar|en|fr)/:path*"], // At this line, define into the matcher all the availables language you have defined into routing.ts
};
