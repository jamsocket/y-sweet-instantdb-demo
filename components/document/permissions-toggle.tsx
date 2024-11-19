"use client";

import React from "react";
import { tx } from "@instantdb/react";
import { db } from "@/app/db";

interface PermissionsToggleProps {
  docId: string;
  setToolTipMessage: (message: string) => void;
}

export default function PermissionsToggle(props: PermissionsToggleProps) {
  const { docId, setToolTipMessage } = props;

  const { data } = db.useQuery({
    docs: {
      $: {
        where: {
          ysweet_id: docId,
        },
      },
    },
  });

  const handleToggle = async () => {
    let docNamespaceId = data?.docs[0].id;
    if (!docNamespaceId) {
      return;
    }
    db.transact([
      tx.docs[docNamespaceId].update({
        is_public: !data?.docs[0].is_public,
      }),
    ]);

    setToolTipMessage(
      !data?.docs[0].is_public
        ? "Document made public"
        : "Document made private",
    );

    setTimeout(() => {
      setToolTipMessage("");
    }, 2000);
  };

  return (
    <div className="flex items-center gap-4">
      <div>Make this document public</div>
      <div className="flex items-center justify-center">
        <div
          onClick={() => handleToggle()}
          className={`w-16 h-8 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
            data?.docs[0].is_public ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
              data?.docs[0].is_public ? "translate-x-8" : "translate-x-0"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
}
