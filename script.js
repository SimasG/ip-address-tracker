const url =
  "https://api.ipgeolocation.io/ipgeo?apiKey=8a1a101fc03c4006a08b3109d1ba1c63";

const ipAddress = document.querySelector(".ip-address");
const ipLocation = document.querySelector(".ip-location");
const timezoneOffset = document.querySelector(".timezone-offset");
const isp = document.querySelector(".isp");

window.addEventListener("load", fetch(url));

fetch(url)
  .then((data) => data.json())
  .then((ipData) => populateData(ipData));

const populateData = (fetchedData) => {
  console.log(fetchedData);
  const utcDate = new Date().toString().match(/([A-Z]+[\+-][0-9]+)/)[1];

  ipAddress.innerHTML = fetchedData.ip;
  ipLocation.innerHTML = `${fetchedData.city}, ${fetchedData.state_prov} ${fetchedData.zipcode}`;
  timezoneOffset.innerHTML = utcDate;
  isp.innerHTML = fetchedData.isp;
};

// const offset = new Date().getTimezoneOffset();
// console.log(offset);

// const timezony = Intl.DateTimeFormat().resolvedOptions().timeZone;
// console.log(timezony);
