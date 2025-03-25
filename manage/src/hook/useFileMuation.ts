import { app } from '../lib/tcb';
import { config } from '../config';
import { useState } from 'react';
import { htmlIdGenerator } from '@elastic/eui';
const db = app.database();

const saveToDb = data => {
  data.createdAt = new Date().getTime();
  data.updatedAt = new Date().getTime();
  db.collection('File').add(data);
};

const removeFromDb = fileIDs => {
  db.collection('File')
    .where({ fileID: db.command.in(fileIDs) })
    .remove();
};

export function useFileMuation() {
  const [percent, setPercent] = useState(0.0);
  const [loading, setLoading] = useState(false);

  const getExtensionFromFilename = name => name.split('.').pop();
  const renameFile = file => {
    const ext = getExtensionFromFilename(file.name);
    return `${htmlIdGenerator('')()}.${ext}`;
  };

  const uploadFile = (files, cb) => {
    const file = files[0];
    setLoading(true);
    app
      .uploadFile({
        cloudPath: renameFile(file),
        filePath: file,
        onUploadProgress: function (progressEvent) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setPercent(percentCompleted);
        },
      })
      .then(result => {
        const { fileID } = result;
        app
          .getTempFileURL({
            fileList: [{ fileID, maxAge: 315360000 }],
          })
          .then(res => {
            const { fileList }: any = res;
            saveToDb(fileList[0]);
            cb(null, fileList[0]);
          })
          .catch(e => cb(e));
      })
      .catch(e => cb(e))
      .finally(() => {
        setLoading(false);
      });
  };

  const destroy = (fileIDs, cb) => {
    removeFromDb(fileIDs);
    let error = null;
    app
      .deleteFile({ fileList: fileIDs })
      .then(res => {})
      .catch(err => (error = err))
      .finally(() => {
        cb(error);
      });
  };

  return {
    uploadFile,
    destroy,
    loading,
  };
}
