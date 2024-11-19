"use client";

import { useRouter } from "next/navigation";
import { db } from "../db";
import { createDoc } from "@/utils/y-sweet/queries";
import { tx, id } from "@instantdb/react";
import { Button } from "@/components/ui/button";
import Loading from "@/components/loading";
import Link from "next/link";

export default function DocumentHome() {
  const { user, error: authError } = db.useAuth();

  const router = useRouter();

  const { isLoading, data, error } = db.useQuery({
    docs: {},
  });

  if (authError || !user) {
    return (
      <div className="text-red-400">Login or sign up to view documents.</div>
    );
  }

  const onCreateDoc = async () => {
    let ysweetDoc = await createDoc();
    let docId = id();
    db.transact([
      tx.docs[docId].update({
        ysweet_id: ysweetDoc.data,
        is_public: false,
        owner: user.id,
        name: "Untitled Document",
      }),
    ]);

    router.push(`/document/${ysweetDoc.data}`);
  };

  return (
    <div className="w-full flex flex-col items-center gap-8 p-4 mx-auto">
      <Button onClick={() => onCreateDoc()}>+ Create new doc</Button>
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-4 w-fit">Recent Documents</h2>
        <div className="flex flex-col gap-4">
          {isLoading && <Loading />}
          {error && <div className="text-red-400">Unable to load docs.</div>}
          {!isLoading && data && data.docs && data.docs.length === 0 && (
            <p className="text-gray-500">
              No documents found. Start by creating a new document!
            </p>
          )}
          {!isLoading && data && data.docs && data.docs.length > 0 && (
            <div>
              {data.docs.map((doc) => (
                <Link
                  href={`/document/${doc.ysweet_id}`}
                  key={doc.ysweet_id}
                  className="w-full flex justify-between items-center gap-3 py-1 border-b border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-200 transition-all"
                >
                  <span>{doc.name}</span>
                  <span>{`->`}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
