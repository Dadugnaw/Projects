"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else {
        switch (user.role) {
          case "ADMIN":
            router.push("/admin");
            break;
          case "RECEPTIONIST":
            router.push("/reception");
            break;
          case "TRAINER":
            router.push("/trainer");
            break;
          case "MEMBER":
            router.push("/member");
            break;
          default:
            router.push("/login");
        }
      }
    }
  }, [user, loading, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-950">
      <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
    </div>
  );
}
