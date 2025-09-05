import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest, {params}:{params:Promise<{image:string}>}) {
  const { searchParams } = new URL(req.url);
  const {image } = await params;
  const filePath = searchParams.get("path");

  if (!image) return new Response("File not found", { status: 404 });

  const fullPath = path.join(process.cwd(), "plates", image);

  if (!fs.existsSync(fullPath)) {
    return new Response("Not found", { status: 404 });
  }

  const file = fs.readFileSync(fullPath);
  return new Response(file, {
    headers: {
      "Content-Type": "image/**", 
    },
  });
}