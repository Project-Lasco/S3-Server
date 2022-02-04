import express from "express";
import { generateUploadURL } from "./s3.js";
import cors from "cors";
//const express = require('express');
//const s3 = require('s3')
const app = express();
app.use(express.static("front"));
app.use(cors({
  origin: "http://localhost:3000"
}))
app.get("/s3", async (req, res) => {
  const url = await generateUploadURL();
  console.log(url)
  res.send({url});
});

app.listen(8454, () => console.log(`server listening at 8454`));
