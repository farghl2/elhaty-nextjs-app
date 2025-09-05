import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const formData: any = await req.formData();
  const file: File | null = formData.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  // تحويل الملف لبايتات
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // استخراج الامتداد من اسم الملف الأصلي
  const ext = path.extname(file.name);
  const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;

  // المسار داخل public/plates
  const uploadDir = path.join(process.cwd(), "plates");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, uniqueName);
  fs.writeFileSync(filePath, buffer);
  console.log(`plates/${uniqueName}`)
  return NextResponse.json({
    message: "File uploaded successfully",
    url: `${uniqueName}`,
  });
}
