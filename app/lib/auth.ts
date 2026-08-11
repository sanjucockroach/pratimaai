/**
 * Secure SHA-256 Web Crypto verification for Admin Portal.
 * Plaintext credentials are NEVER exposed in client bundle.
 */

// Default SHA-256 digests (computed from private credentials)
const DEFAULT_USER_HASH = "fd61764875fa8bb1067963c1796976b0cd7cbc81c7d279338973f1ba3e38b239";
const DEFAULT_PASS_HASH = "bc56cbb11b681dcfcb659d78730622ac625ebeb9d9d4f42791fb00d626fdcb2d";
const SESSION_SECRET_HASH = "8d2e8b284e9c71a39f60d62b9a71a938c5b36a10058b7617b07db6c95c8cb20d";

export async function hashString(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function verifyAdminCredentials(user: string, pass: string): Promise<boolean> {
  const expectedUserHash = import.meta.env.VITE_ADMIN_USER_HASH || DEFAULT_USER_HASH;
  const expectedPassHash = import.meta.env.VITE_ADMIN_PASS_HASH || DEFAULT_PASS_HASH;

  const [inputUserHash, inputPassHash] = await Promise.all([
    hashString(user.trim()),
    hashString(pass.trim()),
  ]);

  return inputUserHash === expectedUserHash && inputPassHash === expectedPassHash;
}

export function setAdminSession(): void {
  if (typeof window !== "undefined" && typeof sessionStorage !== "undefined") {
    sessionStorage.setItem("pratima_admin_token", SESSION_SECRET_HASH);
  }
}

export function clearAdminSession(): void {
  if (typeof window !== "undefined" && typeof sessionStorage !== "undefined") {
    sessionStorage.removeItem("pratima_admin_token");
  }
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined" || typeof sessionStorage === "undefined") {
    return false;
  }
  return sessionStorage.getItem("pratima_admin_token") === SESSION_SECRET_HASH;
}
