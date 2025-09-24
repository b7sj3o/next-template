import {createNavigation} from 'next-intl/navigation';
import { defineRouting } from "next-intl/routing";
 
export const routing = defineRouting({
  locales: ["en", "ua"],
  defaultLocale: "ua",
  pathnames: {},
  // localePrefix: 'as-needed' // Делает слеш в дефолтном варианте, а не /ua
});
 
export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
 
export const { Link, permanentRedirect, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
