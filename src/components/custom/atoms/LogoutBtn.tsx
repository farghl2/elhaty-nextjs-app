import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function LogoutBtn() {
  const router = useRouter();

  async function handleLogout() {
    const res = await fetch("/api/logout", {
      method: "POST",
    });

    if (res.ok) {
      router.push("/login");
    } else {
      alert("Logout failed");
    }
  }

  return (
    <div className="mt-8 w-full flex flex-col items-center justify-center ">
        <div className="w-full bg-muted-foreground h-0.5 mb-5"/>
    <Button variant="outline" onClick={handleLogout}>
      تسجيل الخروج <LogOut />
    </Button>
    </div>
  );
}