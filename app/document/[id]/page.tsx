"use client";
import React from "react";
import { YDocProvider } from "@y-sweet/react";
import SlateEditor from "../../../components/slate/SlateEditor";
import { Button } from "../../../components/ui/button";
import EditableDocTitle from "../../../components/document/editable-doc-title";
import CopyLink from "../../../components/document/copy-link";
import PermissionsToggle from "../../../components/document/permissions-toggle";
import Loading from "@/components/loading";
import { db } from "./../../db";

export type DocumentMetadata = {
  name: string;
  id: string;
  doc_id: string;
  is_public: boolean;
};

export default function DocumentPage({ params }: { params: { id: string } }) {
  const docId = params.id;

  const { isLoading, error, data } = db.useQuery({
    docs: {
      $: {
        where: {
          ysweet_id: docId,
        },
      },
    },
  });

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [toolTipMessage, setToolTipMessage] = React.useState("");

  if (isLoading) {
    return <Loading />;
  } else if (!docId || error || !data || !data.docs || data.docs.length === 0) {
    return <div className="text-red-400">Document not found</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center py-3 text-sm">
        <EditableDocTitle docId={docId} />
        <Button onClick={() => setIsModalOpen(true)}>Share</Button>
      </div>
      <YDocProvider docId={docId} authEndpoint="/api/auth">
        <SlateEditor />
      </YDocProvider>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg p-6 w-full max-w-lg text-black ">
            <h2 className="text-2xl mb-4">Share document</h2>
            <PermissionsToggle
              docId={docId}
              setToolTipMessage={setToolTipMessage}
            />
            <div className="flex gap-4 pt-6">
              <CopyLink docId={docId} setToolTipMessage={setToolTipMessage} />
              <button onClick={() => setIsModalOpen(false)}>Done</button>
              {toolTipMessage && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 text-white text-sm py-1 px-3 rounded shadow-lg">
                  {toolTipMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
