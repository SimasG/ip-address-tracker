// TODO: Ensure the base case works (every user sees info about their IP Address by default) -> DONE
// TODO: Add ability to input other IP addresses & get the remaining info -> DONE
// TODO Add ability to input domain names & get the info -> DONE
// TODO: Handle cases where there is no info & basic validation -> DONE
// TODO: Maps functionality -> make LeafletJS work
// TODO: Fix the timezone display
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
      /^[0-9.]*$/.test(address) === true
    ) {
      const response = await fetch(`${url}${apiKey}&ip=${address}`);
      if (!response.ok) return alert("The IP address is not valid!");
      const data = await response.json();
      console.log(data);
      displayData(data);

      const latid = data.latitude;
      const longit = data.longitude;
      renderMap(latid, longit);
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
    console.log(data);
    displayData(data);

    const latid = data.latitude;
    const longit = data.longitude;
    renderMap(latid, longit);
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
let map;

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
  console.log(data);

  const latid = data.latitude;
  const longit = data.longitude;
  renderMap(latid, longit);

  displayData(data);
}

// Map API
function renderMap(latid, longit) {
  if (map != undefined) {
    map.off();
    map.remove();
    map = new L.map("map", {
      zoomControl: false,
    }).setView([latid, longit], 13);
    // .locate({ setView: true, maxZoom: 16 });
    const osm = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    );
    osm.addTo(map);
    L.marker([latid, longit]).addTo(map);
  } else {
    map = new L.map("map", {
      zoomControl: false,
    }).setView([latid, longit], 13);
    // .locate({ setView: true, maxZoom: 16 });
    const osm = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    );
    osm.addTo(map);
    L.marker([latid, longit]).addTo(map);
  }
}

getIpAddress();
