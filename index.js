// TODO1: get input value from my form
// 1. Create "app.post" route
// 2. Parse my input value into req.body.domain/ip
// TODO2: use the input value for getIpAddress()
// TODO3: use getIpAddress() result for displayData() (should happen by default)

const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const dns = require("dns");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  // console.log(getIpAddress());
  // res.render("index", getIpAddress());
  res.render("index");
});

app.post("/", (req, res) => {
  const input = req.body.input;
  console.log(input);
  res.redirect("/");
});

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

app.listen(8080, () => {
  console.log("LISTENING ON PORT 8080");
});
