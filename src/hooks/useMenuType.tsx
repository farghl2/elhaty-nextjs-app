'use client'
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function useMenuType() {
  const searchParams = useSearchParams();
  const [menuType, setMenuType] = useState<"dinein" | "takeaway">("takeaway");

  useEffect(() => {
    const typeFromUrl = searchParams.get("type") as "dinein" | "takeaway" | null;
    if (typeFromUrl) {
      setMenuType(typeFromUrl);
      sessionStorage.setItem("menuType", typeFromUrl);
    } else {
      const stored = sessionStorage.getItem("menuType") as "dinein" | "takeaway" | null;
      if (stored) {
        setMenuType(stored);
      }
    }
  }, [searchParams]);

  return menuType;
}