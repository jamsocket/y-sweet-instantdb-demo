"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { db } from "@/app/db";
import { useRouter } from "next/navigation";

export default function AuthButton() {
  const { user } = db.useAuth();
  const router = useRouter();

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form
        action={() => {
          db.auth.signOut();
          router.push("/");
        }}
      >
        <Button type="submit" variant={"outline"}>
          Sign out
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <a href="/sign-in">Sign Up/In</a>
      </Button>
    </div>
  );
}
