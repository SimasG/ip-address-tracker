// TODO1: get input value from my form -> DONE
// 1. Create "app.post" route
// 2. Parse my input value into req.body.domain/ip
// TODO2: use the input value for getIpAddress()
// TODO3: use getIpAddress() result for displayData() (should happen by default)

import express from "express";
import path from "path";
import cors from "cors";
import methodOverride from "method-override";
import dns from "dns";
// why are we importing "config" in an object?
import { config } from "dotenv";

if (process.env.NODE_ENV !== "production") {
  // "config()" function will read our environment variables in .env and save them
  config();
}

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
// converts incoming body into JSON automatically
app.use(express.json());
// allows cross origin requests (i.e. any URL can make requests to the server URL)

// * I needed to set cors origin to true because I was making a request from my server.js (on localhost:3000)
// * to script.js (on 127.0.1.1/index.html). Now both files reside in the same URL and cors modification isn't required.
// app.use(cors({ origin: true }));

// * Allows to send over the static files to the client (css, js, images, etc.)
// * Otherwise, the browser would try to call the files from the host domain (e.g. localhost:3000/scss/styles.csss)
app.use("/static", express.static("./static"));

app.set("view engine", "ejs");

// * the line below doesn't work with ES6 module import syntax
// app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("index");
});

// app.post("/test", (req, res) => {
//   const input = req.body.input;
//   if (input) console.log(input);
//   res.send(input);
// });

// let url = "google.com";

app.post("/", (req, res) => {
  const input = req.body.domain;
  dns.resolve4(input, (err, addresses) => {
    if (err) throw err;
    const fetchedIpAddress = addresses[0];
    res.send({ fetchedIpAddress: fetchedIpAddress });
  });
});

const hostname = "127.0.0.1";
const port = 5505;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
