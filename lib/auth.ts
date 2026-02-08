import jwt from "jsonwebtoken";

/**
 * This type represents the data stored inside the JWT
 */
export type AuthUser = {
  userId: number;
  email: string;
  role: string;
};

/**
 * Extracts the JWT token from the Authorization header
 * Expected format: Authorization: Bearer <token>
 */
function getToken(req: Request): string | null {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) return null;
  if (!authHeader.startsWith("Bearer ")) return null;

  return authHeader.split(" ")[1];
}

/**
 * requireAuth
 * - Used when ANY logged-in user is allowed
 * - Verifies JWT
 * - Returns user info from token
 */
export function requireAuth(req: Request): AuthUser {
  const token = getToken(req);
  if (!token) {
    throw new Error("UNAUTHORIZED");
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("SERVER_ERROR");
  }

  try {
    const decoded = jwt.verify(token, secret) as AuthUser;
    return decoded;
  } catch {
    throw new Error("UNAUTHORIZED");
  }
}

/**
 * requireAdmin
 * - Used when ONLY admins are allowed
 * - First checks login
 * - Then checks role === 'admin'
 */
export function requireAdmin(req: Request): AuthUser {
  const user = requireAuth(req);

  if (user.role !== "admin") {
    throw new Error("FORBIDDEN");
  }

  return user;
}
