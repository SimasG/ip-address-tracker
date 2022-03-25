// TODO1: get input value from my form
// 1. Create "app.post" route
// 2. Parse my input value into req.body.domain/ip
// TODO2: use the input value for getIpAddress()
// TODO3: use getIpAddress() result for displayData() (should happen by default)

// const express = require("express");
// const app = express();
// const path = require("path");
// const cors = require("cors");
// const methodOverride = require("method-override");
// const dns = require("dns");

import express from "express";
import path from "path";
import cors from "cors";
import methodOverride from "method-override";
import dns from "dns";
// why are we importing "config" in an object?
// import { config } from "dotenv";

if (process.env.NODE_ENV !== "production") {
  // "config()" function will read our environment variables in .env and save them
  config();
}

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
// converts incoming body into JSON automatically
app.use(express.json());
// allows cross origin requests (i.e. any URL can make requests to the server URL)
app.use(cors({ origin: true }));

app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  // res.send("ROOT ROUTE WORKS!");
  // console.log(getIpAddress());
  // res.render("index", getIpAddress());
  res.render("index");
});

app.get("/plz", (req, res) => {
  res.send({ Plz: "plz" });
  // console.log(getIpAddress());
  // res.render("index", getIpAddress());
  // res.render("index");
});

// app.post("/", (req, res) => {
//   const input = req.body.input;
//   console.log(input);
//   res.redirect("/");
// });

// let url = "google.com";

let fakeDB = [
  { data1: 123 },
  { data2: 321 },
  { data3: 456 },
  { data4: 654 },
  { data5: 789 },
  { data6: 987 },
];

// dns.resolve4(url, (err, addresses) => {
//   if (err) throw err;
//   console.log(addresses[0]);
// });

// app.post("/getAddress", (req, res) => {
//   console.log(req.body);
//   res.send("IT WORKED!");
// });

// const port = 5500;

// app.listen(`http://127.0.0.1:${port}`, () => {
//   console.log(`App available on http://127.0.0.1:${port}`);
// });

const hostname = "127.0.0.1";
const port = 5500;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
