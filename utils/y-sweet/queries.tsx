"use server";
import { manager } from "./y-sweet-document-manager";

export async function createDoc() {
  // In a production app, this is where you'd authenticate the user
  // and check that they are authorized to access the doc.
  const ysweetDoc = await manager.createDoc();

  return {
    data: ysweetDoc.docId,
    error: null,
  };
}
