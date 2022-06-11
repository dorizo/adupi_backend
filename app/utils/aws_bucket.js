import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

//key umtuk masuk ke aws singapure karena indo mahal
const client = new S3Client({
  region: "ap-southeast-1",
  credentials: {

  },
});

export const uploads3 = ({
  imageBase64:imageBase64,
  typeImage:typeImage, //image/png
  extImage:extImage,
  nameImage:nameImage,
}) => {
  //mereplace base64 agar bisa di baca oleh aws s3
  var buf = Buffer.from(
    imageBase64,
    "base64"
  );

  const bucketParams = {
    //nama bucket yang terdaftar
    Bucket: "ekonomisirkular.org",
    //requestnama dan memberi ext .png dll
    Key: nameImage + "." + extImage,
    Body: buf,
    ContentEncoding: "base64",
    //split untuk mendapatkan type content contoh image/png dari base64
    ContentType: typeImage,
  };
  try {
    client.send(new PutObjectCommand(bucketParams));
    return {
      status: true,
      url: "https://s3.ap-southeast-1.amazonaws.com/" + bucketParams.Bucket + "/" + bucketParams.Key,
    }
  } catch (err) {
    return {
      status: false
    }
  }
};
