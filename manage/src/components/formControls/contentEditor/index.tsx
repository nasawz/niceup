import * as React from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { useFileMuation } from '../../../hook/useFileMuation';

export default function ContentEditor(props: any) {
  const { uploadFile, loading } = useFileMuation();
  const { onChange, value, ...others } = props;
  // const [content, setContent] = React.useState('')
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  const handleEditorChange = ({ html, text }) => {
    // onChange(btoa(text));
    onChange(btoa(encodeURIComponent(text)));
  };
  const onUpload = file => {
    // console.log(file);

    return new Promise((resolve, reject) => {
      uploadFile([file], (err, res) => {
        if (!err) {
          resolve(res.tempFileURL);
        } else {
          reject(err);
        }
      });
    });
  };
  return (
    <MdEditor
      onImageUpload={onUpload}
      value={value ? decodeURIComponent(atob(value)) : ''}
      renderHTML={text => mdParser.render(text)}
      onChange={handleEditorChange}
      {...others}
    />
  );
}
