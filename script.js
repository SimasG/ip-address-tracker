// TODO: Ensure the base case works (every user sees info about their IP Address by default) -> DONE
// TODO: Add ability to input other IP addresses & get the remaining info
// TODO Add ability to input domain names & get the info
// TODO: Maps functionality -> make LeafletJS work

const url =
  "https://api.ipgeolocation.io/ipgeo?apiKey=112af9d778a540e0bf4baba8316ab539";

const ipAddress = document.querySelector(".ip-address");
const ipLocation = document.querySelector(".ip-location");
const timezoneOffset = document.querySelector(".timezone-offset");
const isp = document.querySelector(".isp");
const form = document.querySelector(".search-container");
const input = document.querySelector("#ip-address-input");

let address;

async function getIpAddress(address) {
  if (address) {
    const response = await fetch(`${url}/&ip=${address}`);
    const data = await response.json();
    console.log(data);
    displayData(data);
  } else {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    displayData(data);
  }
  //   displayNoResults(data);
}

const displayData = (fetchedData) => {
  const utcDate = new Date().toString().match(/([A-Z]+[\+-][0-9]+)/)[1];

  ipAddress.innerHTML = fetchedData.ip;
  ipLocation.innerHTML = `${fetchedData.city}, ${fetchedData.state_prov} ${fetchedData.zipcode}`;
  timezoneOffset.innerHTML = utcDate;
  isp.innerHTML = fetchedData.isp;
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  address = input.value;
  getIpAddress(address);
  input.value = "";
});

getIpAddress(address);
