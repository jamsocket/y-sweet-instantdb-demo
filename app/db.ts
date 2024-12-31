import { init } from "@instantdb/react";

let INSTANT_APP_ID = process.env.NEXT_PUBLIC_INSTANT_APP_ID;

if (!INSTANT_APP_ID) {
  throw Error("Please set the NEXT_PUBLIC_INSTANT_APP_ID environment variable");
}

export const db = init({ appId: INSTANT_APP_ID });
