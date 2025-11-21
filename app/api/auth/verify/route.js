//this route is only hit from the frontend

import { roleGuard } from "@/utils/roleguard";
import { NextResponse } from "next/server";

export async function GET(req) {
  const guard = await roleGuard(["admin", "faculty", "student"])(req); //send role to role guard to check the access
  if (guard) return guard; //if token is missing then stop here
  return NextResponse.json(success({ user: req.user }, "Access granted")); //if ok then grant the access
}