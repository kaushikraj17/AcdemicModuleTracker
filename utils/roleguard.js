import { NextResponse } from "next/server";
import { verifyToken } from "./auth";

export function roleGuard(allowedRole) {
  return async (req) => {
    try {
      const token = req.cookies.get("token")?.value;
      if (!token)
        return NextResponse.json({ message: "Token missing" }, { status: 401 });

      const decoded = verifyToken(token);
      if (!allowedRole.includes(decoded.role))
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });

      req.user = decoded; //set decoded cookie payload in readble form
      return null;
    } catch (err) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
  };
}
