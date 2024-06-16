export const fileNameFromPath = (filePath) => {
  if (!filePath) {
    return null;
  }
  const fileArr = filePath?.split("/");
  const nameArr = fileArr[fileArr?.length - 1]?.split("-");
  nameArr.shift();
  return nameArr.join();
};
