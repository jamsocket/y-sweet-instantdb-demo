import { init } from "@instantdb/react";

let INSTANT_APP_ID = process.env.NEXT_PUBLIC_INSTANT_APP_ID;

if (!INSTANT_APP_ID) {
  console.error("Please set the INSTANT_APP_ID environment variable");
  INSTANT_APP_ID = "";
}

export const db = init({ appId: INSTANT_APP_ID });
