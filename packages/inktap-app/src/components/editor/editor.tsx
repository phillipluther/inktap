import React, { useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import classnames from 'classnames';
import Markdown from 'markdown-to-jsx';

import styles from './editor.module.css';
import utilStyles from '../util-styles.module.css';

export type EditorProps = {
  id?: string;
  markdown?: string;
};

const Editor = ({ markdown = '', id }: EditorProps) => {
  const editorId = id || nanoid();
  const [editorValue, setEditorValue] = useState(markdown);
  const editorEl = useRef<HTMLTextAreaElement | null>(null);

  const focusEditor = () => {
    editorEl.current?.focus();
  };

  return (
    <div className={styles.wrapper}>
      <textarea
        id={editorId}
        className={classnames(styles.editor, utilStyles.focusable)}
        aria-label="Markdown Editor"
        value={editorValue}
        onChange={(e) => {
          setEditorValue(e.target.value);
        }}
        ref={editorEl}
      />
      <Markdown className={styles.preview} aria-hidden onClick={focusEditor}>
        {editorValue}
      </Markdown>
    </div>
  );
};

export default Editor;
