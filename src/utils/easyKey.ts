import * as md5 from 'md5';

export const easyKey = (data: object) => {
  return md5(JSON.stringify(data));
};
