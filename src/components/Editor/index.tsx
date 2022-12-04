import React, { useEffect, useRef, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import 'monaco-editor/esm/vs/editor/editor.all.js';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';

import styles from './index.module.scss';

interface IProps {
  value?: any;
  onChange?: Function;
  disabled?: boolean;
}

const Index = (props: IProps) => {
  const { value, onChange, disabled = false } = props;
  const [defaultValue, setdefaultValue] = useState('');

  useEffect(() => {
    setdefaultValue(value);
  }, [value]);

  const onChangeHandle = (value, e) => {
    setdefaultValue(value);
    onChange?.(value);
  };

  const editorDidMountHandle = (editor, monaco) => {
    editor.getAction('editor.action.formatDocument').run();
    // editor.focus();
  };

  return (
    <MonacoEditor
      className={styles.EditorView}
      language="javascript"
      value={defaultValue}
      options={{ selectOnLineNumbers: true, minimap: { enabled: false }, readOnly: disabled }}
      onChange={onChangeHandle}
      editorDidMount={editorDidMountHandle}
    />
  );
};

export default Index;