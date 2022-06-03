import React from 'react';
import { nanoid } from 'nanoid';

export type EditorProps = {
  id?: string;
  markdown?: string;
};

const Editor = ({ markdown = '', id }: EditorProps) => {
  const editorId = id || nanoid();

  return (
    <section>
      <textarea id={editorId} aria-label="Markdown Editor" value={markdown} />
    </section>
  );
};

export default Editor;
