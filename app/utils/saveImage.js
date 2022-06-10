import fs from "fs";

export const saveImage = async ({
  imageBase64: imageBase64,
  extImage: extImage,
  nameImage: nameImage,
  dir: dir,
}) => {
  fs.writeFile(
    "./assets/"+dir+"/"+nameImage + "." + extImage,
    imageBase64,
    "base64",
    (err) => {
      return {
        status: false,
      };
    }
  );
  return {
    status: true,
    url: nameImage + "." + extImage,
  };
};
