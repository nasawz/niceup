import { EuiFilePicker, EuiImage, EuiSpacer } from '@elastic/eui';
import * as React from 'react';
import { useFileMuation } from '../../../hook/useFileMuation';

export default function FilePicker(props: any) {
  const {
    onChange,
    value,
    options: optionsStatic,
    display = 'default',
    initialPromptText = '选择图片',
    ...others
  } = props;
  const { uploadFile, loading } = useFileMuation();
  const [src, setSrc] = React.useState(value ? value : null);

  const handleUploaded = (err, res) => {
    if (!err) {
      // console.log(res);
      // TODO save res
      setSrc(res.tempFileURL);
      onChange(res.tempFileURL);
    }
  };

  return (
    <div>
      <EuiFilePicker
        isLoading={loading}
        accept="image/png, image/jpeg"
        initialPromptText={initialPromptText}
        display={display}
        onChange={files => {
          if (files && files.length > 0) {
            uploadFile(files, handleUploaded);
          }
        }}
        {...others}
      />
      {src && (
        <>
          <EuiSpacer size="s" />
          <EuiImage size="m" hasShadow alt="image" url={src} />
        </>
      )}
    </div>
  );
}
