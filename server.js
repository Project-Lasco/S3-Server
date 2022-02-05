import express from "express";
import { generateUploadURL, delArt } from "./s3.js";
import cors from "cors";
import bp from "body-parser";
//const express = require('express');
//const s3 = require('s3')
const app = express();

// uses body parser json for parsing json string sent from client
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
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

// deletes specified artwork url from db received from client
app.post("/deleteArt", (req, res) => {
  // parses json object of response first
  console.log("hello client")
  // const object = JSON.parse(req);
  // gets url of artwork to be deleted
  console.log("REQ", req.body.val)

  const url = req.body.val;
  console.log("URL", url)
  // gets key from url (file path in s3 bucket)
  const key = url.split("https://lasco-dev.s3.amazonaws.com/")[1];
  // calls delArt fun in s3 with argument as artwork key so it can call s3
  delArt(key)
  res.send('hello')
});

// app.get("/art", async (req, res) => {
//   // generates upload url, and sends it back
// })

app.listen(8454, () => console.log(`server listening at 8454`));
