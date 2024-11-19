"use server";
import { manager } from "./y-sweet-document-manager";

export async function createDoc() {
  const ysweetDoc = await manager.createDoc();

  return {
    data: ysweetDoc.docId,
    error: null,
  };
}
