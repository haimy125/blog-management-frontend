// components/editor.tsx
import React, { useState } from "react";
import { EditorState } from "draft-js";
import dynamic from "next/dynamic";
import { convertToHTML } from "draft-convert";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  {
    ssr: false,
  }
);

interface EditorComponentProps {
  onChange: (htmlContent: string) => void;
}

const EditorComponent: React.FC<EditorComponentProps> = ({ onChange }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (newState: EditorState) => {
    setEditorState(newState);
    const htmlContent = convertToHTML(newState.getCurrentContent());
    onChange(htmlContent); // Gọi hàm onChange với nội dung HTML
  };

  return (
    <div style={{ height: "400px", overflowY: "scroll", overflowX: "auto" }}>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
        mention={{
          separator: " ",
          trigger: "@",
        }}
      />
    </div>
  );
};

export default EditorComponent;
