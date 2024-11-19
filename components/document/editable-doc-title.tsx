"use client";

import { Input } from "../ui/input";
import { tx } from "@instantdb/react";
import { db } from "@/app/db";

interface EditableDocTitleProps {
  docId: string;
}

export default function EditableDocTitle(props: EditableDocTitleProps) {
  const { docId } = props;
  const { data } = db.useQuery({
    docs: {
      $: {
        where: {
          ysweet_id: docId,
        },
      },
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    let docId = data?.docs[0].id;
    if (!docId) {
      return;
    }
    db.transact([
      tx.docs[docId].update({
        name: inputValue,
      }),
    ]);
  };

  return (
    <>
      <Input
        value={data?.docs[0].name ?? ""}
        onChange={handleInputChange}
        className="text-2xl font-bold mb-4 w-fit"
        placeholder="Untitled Document"
      />
    </>
  );
}
