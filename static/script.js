// TODO: (later) hide the API key -> DONE
// TODO: Fix bug: domain name validation -> DONE
// TODO: Fix bug: IP address validation ->

const ipAddress = document.querySelector(".ip-address");
const ipLocation = document.querySelector(".ip-location");
const timezoneOffset = document.querySelector(".timezone-offset");
const isp = document.querySelector(".isp");
const form = document.querySelector(".search-container");
const input = document.querySelector("#ip-address-input");

let address;
const hostname = "127.0.0.1";
const port = 5505;

async function getIpAddress(address) {
  if (address) {
    // domain or ip
    if (
      (address.match(/\./g) || []).length === 3 &&
      /^[0-9.]*$/.test(address) === true
    ) {
      const ip = await fetch(`http://${hostname}:${port}/ip`, {
        method: "POST",
        // Sending the body to the backend. There the ip address will be used for the API endpoint
        // to fetch the correct data
        body: JSON.stringify({ address: address }),
        headers: { "Content-Type": "application/json" },
      });
      // Finally fetching some code from the server side!!!
      const ipJson = await ip.json();
      const { error, data } = ipJson;
      if (error) {
        alert(error);
      } else {
        displayData(data);

        const latid = data.latitude;
        const longit = data.longitude;
        renderMap(latid, longit);
      }
    } else if (
      // (address.match(/\./g) || []).length === 1 ||
      // (address.match(/\./g) || []).length === 2
      /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(
        address
      ) === true
    ) {
      console.log("It's a domain name!");
      getIPFromDomain(address);
    } else {
      alert("Please enter a valid IP address or domain");
    }
  } else {
    const ip = await fetch(`http://${hostname}:${port}/ip`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    // Finally fetching some code from the server side!!!
    const ipJson = await ip.json();
    const { data } = ipJson;
    // const data = ipJson.data;
    displayData(data);

    const latid = data.latitude;
    const longit = data.longitude;
    renderMap(latid, longit);
  }
}

async function getIPFromDomain(domain) {
  console.log(domain);
  const ip = await fetch(`http://${hostname}:${port}/`, {
    method: "POST",
    body: JSON.stringify({ domain: domain }),
    headers: { "Content-Type": "application/json" },
  });
  // Finally fetching some code from the server side!!!
  const ipJson = await ip.json();
  const { fetchedIpAddress, error } = ipJson;
  if (error) return alert(error);

  const response = await fetch(`http://${hostname}:${port}/domain`, {
    method: "POST",
    body: JSON.stringify({ fetchedIpAddress: fetchedIpAddress }),
    headers: { "Content-Type": "application/json" },
  });
  const responseJson = await response.json();
  const { data } = responseJson;
  displayData(data);

  const latid = data.latitude;
  const longit = data.longitude;
  renderMap(latid, longit);
}

const displayData = (fetchedData) => {
  const localDate = fetchedData.time_zone.current_time;
  const offset = localDate.substring(localDate.length - 5);

  ipAddress.innerHTML = fetchedData.ip;
  ipLocation.innerHTML = `${fetchedData.city}, ${fetchedData.state_prov} ${fetchedData.zipcode}`;
  timezoneOffset.innerHTML = `GMT ${offset}`;
  isp.innerHTML = fetchedData.isp;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  address = input.value;
  getIpAddress(address);
  input.value = "";
});

// Map API
let map;

function renderMap(latid, longit) {
  if (map != undefined) {
    map.off();
    map.remove();
    map = new L.map("map", {
      zoomControl: false,
    }).setView([latid, longit], 13);
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
