// TODO: Ensure the base case works (every user sees info about their IP Address by default) -> DONE
// TODO: Add ability to input other IP addresses & get the remaining info -> DONE
// TODO Add ability to input domain names & get the info -> DONE
// TODO: Handle cases where there is no info
// TODO: Maps functionality -> make LeafletJS work
// TODO: (maybe) sharpen up UI (info messages, disclaimers, etc.)

// TODO: (later) hide the API key
// require("dotenv").config();
// console.log(process.env);
// const apiKey = process.env.API_KEY;
const apiKey = "112af9d778a540e0bf4baba8316ab539";

const ipAddress = document.querySelector(".ip-address");
const ipLocation = document.querySelector(".ip-location");
const timezoneOffset = document.querySelector(".timezone-offset");
const isp = document.querySelector(".isp");
const form = document.querySelector(".search-container");
const input = document.querySelector("#ip-address-input");

const url = "https://api.ipgeolocation.io/ipgeo?apiKey=";
let address;

async function getIpAddress(address) {
  if (address) {
    // domain or ip
    if (
      (address.match(/\./g) || []).length === 3 &&
      /^[0-9,.]*$/.test(address) === true
    ) {
      console.log("It's an IP Address!");
      const response = await fetch(`${url}${apiKey}&ip=${address}`);
      const data = await response.json();
      displayData(data);
    } else if (
      (address.match(/\./g) || []).length === 1 ||
      (address.match(/\./g) || []).length === 2
    ) {
      console.log("It's a domain name!");
      getIPFromDomain(address);
    } else {
      alert("Please enter a valid IP address or domain");
    }
  } else {
    const response = await fetch(`${url}${apiKey}`);
    const data = await response.json();
    displayData(data);
  }
}

const displayData = (fetchedData) => {
  const utcDate = new Date().toString().match(/([A-Z]+[\+-][0-9]+)/)[1];

  ipAddress.innerHTML = fetchedData.ip;
  ipLocation.innerHTML = `${fetchedData.city}, ${fetchedData.state_prov} ${fetchedData.zipcode}`;
  timezoneOffset.innerHTML = utcDate;
  isp.innerHTML = fetchedData.isp;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  address = input.value;
  getIpAddress(address);
  input.value = "";
});

const hostname = "127.0.0.1";
const port = 5505;

async function getIPFromDomain(domain) {
  const ip = await fetch(`http://${hostname}:${port}/`, {
    method: "POST",
    body: JSON.stringify({ domain: domain }),
    headers: { "Content-Type": "application/json" },
  });
  // Finally fetching some code from the server side!!!
  const ipJson = await ip.json();
  const response = await fetch(`${url}${apiKey}&ip=${ipJson.fetchedIpAddress}`);
  const data = await response.json();
  displayData(data);
}

getIpAddress();
