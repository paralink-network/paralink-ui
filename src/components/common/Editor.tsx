import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-textmate';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/snippets/json';

interface Editor {
  code: string;
  onChange: (code: string) => void;
}

const Editor = ({ code, onChange }: Editor): JSX.Element => (
  <AceEditor
    mode="json"
    theme="textmate"
    onChange={onChange}
    fontSize={14}
    showPrintMargin={false}
    showGutter
    highlightActiveLine
    value={code}
    width="100%"
    height="100%"
    setOptions={{
      showLineNumbers: true,
      tabSize: 2,
      minLines: 1,
    }}
  />
);

export default Editor;
