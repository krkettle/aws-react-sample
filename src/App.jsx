import React, { useEffect, useState } from "react";
import axios from "axios";

const FETCH_INTERVAL = 3000;
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;

const getS3Object = (setDetail) => {
  let messageType;
  if (Math.random() < 0.5) {
    messageType = "good";
  } else {
    messageType = "bad";
  }
  console.log(
    `https://${S3_BUCKET_NAME}.s3-ap-northeast-1.amazonaws.com/${messageType}.json`
  );
  axios
    .get(
      `https://${S3_BUCKET_NAME}.s3-ap-northeast-1.amazonaws.com/${messageType}.json`
    )
    .then((res) => {
      console.log(res.data);
      setDetail(res.data);
    });
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
