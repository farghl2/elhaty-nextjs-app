"use client";

import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function UploadImage({ onUpload }: { onUpload: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      setPreview(data.url);
      onUpload(data.url); 
    } else {
      alert(data.error || "Upload failed");
    }

    setUploading(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <Input type="file" className="borde" accept="image/*" onChange={handleFileChange} />
      {uploading && <p><Loader className="animate-spin"/></p>}
      {preview && (
        <img
       
          src={`/api/static/${preview}`}
          alt="Uploaded preview"
          className="w-32 h-32 object-cover rounded-lg border"
        />
      )}
    </div>
  );
}
