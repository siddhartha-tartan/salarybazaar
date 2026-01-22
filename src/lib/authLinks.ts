export const AUTH_LINKS = {
  employeeSignIn: "https://salarybazaar-ecp.vercel.app/employee/login",
  // Single entry for both new + existing corporates (handled on the same tool/page)
  corporateLogin: "https://salarybazaar-ecp.vercel.app/hr/login",
} as const;

export type AuthLinkKey = keyof typeof AUTH_LINKS;

/**
 * Temporary redirect helper.
 * Replace AUTH_LINKS values later with the real tool URLs.
 */
export function goToAuthLink(key: AuthLinkKey) {
  window.location.assign(AUTH_LINKS[key]);
}

