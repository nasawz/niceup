import { useQuery } from 'react-query';
import Taro from '@tarojs/taro';
function useTempFileURL(ids) {
  return useQuery(
    ['getTempFileURL', ids],
    async () => {
      let fileList = ids.map(id => {
        return {
          fileID: id,
          maxAge: 60 * 60, // one hour
        };
      });
      const result = await Taro.cloud.getTempFileURL({ fileList });
      let urls = result.fileList.map(item => {
        return item.tempFileURL;
      });
      return urls;
    },
    {
      enabled: false,
    },
  );
  // return useQuery("downloadFile", async () => {
  //   const { result } = await Taro.cloud.downloadFile
  //   return result
  //   // const { data } = await axios.get(
  //   //   "https://jsonplaceholder.typicode.com/posts"
  //   // );
  //   // return data;
  // }, {
  //   enabled: false,
  // });
}

export { useTempFileURL };
