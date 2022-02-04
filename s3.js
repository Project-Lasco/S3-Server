import aws from "aws-sdk";
import crypto from "crypto";
import dotenv from 'dotenv'
import { promisify } from "util";
const randomBytes = promisify(crypto.randomBytes);

dotenv.config()

const region = "us-east-1";
const bucketName = "lasco-dev";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

export async function generateUploadURL(folder) {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex");
  var params = {};
  if (folder) {
    params = {
      Bucket: bucketName,
      Key: folder + imageName,
      Expires: 60,
    };
  }
  else {
    params = {
      Bucket: bucketName,
      Key: imageName,
      Expires: 60,
    };
  }
 
  

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
}
