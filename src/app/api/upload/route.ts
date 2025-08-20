import { NextRequest, NextResponse } from "next/server";
import multer from 'multer'
import { promisify } from "util";
import fs from "fs";
import path from "path";

// إعداد التخزين
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = path.join(process.cwd(), "public/uploads");
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
});

const uploadMiddleware = upload.single("file");
const uploadMiddlewareAsync = promisify(uploadMiddleware);

// Next.js API Route
export async function POST(req: NextRequest) {
  const formData: any = await req.formData();
  const file: File | null = formData.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  // حفظ الملف
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = path.join(process.cwd(), "public/plates", file.name);
  fs.writeFileSync(filePath, buffer);

  return NextResponse.json({
    message: "File uploaded successfully",
    url: `/plates/${file.name}`,
  });
}
