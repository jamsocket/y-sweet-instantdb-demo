"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import {db} from "./db";

export default function Index() {
  const { user } = db.useAuth();

  return (
    <div className="flex flex-col gap-16 pt-24 items-center bg-slate-300 text-black">
      <div className="flex gap-8 justify-center items-center">
        <a href="https://www.instantdb.com/" target="_blank" rel="noreferrer">
          <Image
            alt="InstantDB Logo"
            src={"/instant-logo.svg"}
            width={30}
            height={30}
          />
        </a>
        <span className="border-l rotate-45 h-6" />
        <a
          href="https://jamsocket.com/y-sweet"
          className="flex"
          target="_blank"
          rel="noreferrer"
        >
          <span className="font-semibold pr-3">Y-Sweet by</span>
          <Image
            alt="Jamsocket Logo"
            src={"/jamsocket-logo.svg"}
            width={100}
            height={100}
          />
        </a>
      </div>
      <h1 className="sr-only">InstantDB and Y-Sweet Starter Template</h1>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        The fastest way to build apps with InstantDB and Y-Sweet
      </p>
      <div className="flex gap-4">
        {user ? <Button asChild size="sm">
          <a href="/document">See Documents</a>
        </Button> : <Button asChild size="sm">
          <a href="/sign-in">Sign up/in</a>
        </Button>}
      </div>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
