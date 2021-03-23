import React, { useEffect, useState } from "react";
import AWS from "aws-sdk";

AWS.config.update({
  credentials: new AWS.Credentials(
    process.env.AWS_ACCESS_KEY_ID,
    process.env.AWS_SECRET_ACCESS_KEY
  ),
});

const FETCH_INTERVAL = 3000;
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;

const s3 = new AWS.S3();

const getS3Object = async (setDetail) => {
  let messageType;
  if (Math.random() < 0.5) {
    messageType = "good";
  } else {
    messageType = "bad";
  }
  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: `${messageType}.json`,
  };
  try {
    const res = await s3.getObject(params).promise();
    const jsonData = JSON.parse(res.Body.toString());
    setDetail(jsonData);
  } catch (err) {
    console.log(err);
    setDetail({ color: "black", message: "Error" });
  }
};

const App = () => {
  const [detail, setDetail] = useState({ color: "data", message: "" });

  useEffect(() => {
    getS3Object(setDetail);
    const intervalId = setInterval(() => {
      getS3Object(setDetail);
    }, FETCH_INTERVAL);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <h1 style={{ color: detail.color }}>{detail.message}</h1>;
};

export default App;
