import express from "express";
import { generateUploadURL } from "./s3.js";
//const express = require('express');
//const s3 = require('s3')
const app = express();

app.use(express.static("front"));

app.get("/s3", async (req, res) => {
  const url = await generateUploadURL();
  res.send({ url });
});

app.listen(8454, () => console.log(`server listening at 8454`));
