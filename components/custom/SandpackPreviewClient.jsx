"use client";
import React, { useEffect, useRef, useContext } from "react";
import { SandpackPreview, useSandpack } from "@codesandbox/sandpack-react";
import { ActionContext } from "@/context/ActionContext";

function SandpackPreviewClient() {
  const previewRef = useRef();
  const { sandpack } = useSandpack();
  const { action, setAction } = useContext(ActionContext);

  useEffect(() => {
    GetSandpackClient();
  }, [sandpack && action]);

  const GetSandpackClient = async () => {
    const client = previewRef.current?.getClient();
    if (client) {
      const result = await client.getCodeSandboxURL();
      if (action?.actionType === "deploy") {
        window.open(`https://${result?.sandboxId}.csb.app`);
      } else if (action?.actionType === "export") {
        window.open(result?.editorUrl);
      }
    }
  };
  return (
    <div>
      <SandpackPreview
        ref={previewRef}
        style={{ height: "80vh", width: "64vw" }}
        showNavigator={true}
      />
    </div>
  );
}

export default SandpackPreviewClient;
