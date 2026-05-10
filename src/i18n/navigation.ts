import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

const {
  Link,
  redirect,
  usePathname,
  useRouter,
  getPathname,
} = createNavigation(routing);

export { Link, redirect, usePathname, useRouter, getPathname };
/** Fallback for tooling that still default-imports `Link` from this module. */
export default Link;
