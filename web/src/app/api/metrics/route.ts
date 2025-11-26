import { NextResponse } from "next/server";

import { loadExecutiveSnapshot } from "@/lib/server/loadSnapshot";

export const revalidate = 60;

export async function GET() {
  const snapshot = await loadExecutiveSnapshot();
  return NextResponse.json(snapshot);
}


