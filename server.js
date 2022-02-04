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
// uploads to profile-pics folder
app.get("/s3", async (req, res) => {
  const url = await generateUploadURL('profile-pics/');
  console.log(url)
  res.send({url});
});
// uploads to artworks folder
// TODO: think abt changing design of uploads
app.get("/art", async (req, res) => {
  const url = await generateUploadURL('user-artwork/');
  console.log(url)
  res.send({url});
});

// app.get("/art", async (req, res) => {
//   // generates upload url, and sends it back
// })

app.listen(8454, () => console.log(`server listening at 8454`));
