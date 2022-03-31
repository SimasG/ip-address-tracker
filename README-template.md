// TODO: Ensure the base case works (every user sees info about their IP Address by default) -> DONE
// TODO: Add ability to input other IP addresses & get the remaining info -> DONE
// TODO Add ability to input domain names & get the info -> DONE
// TODO: Handle cases where there is no info & basic validation -> DONE
// TODO: Maps functionality -> make LeafletJS work -> DONE
// TODO: Fix the timezone display -> DONE

192.212.174.101

API data I need:

ipgeolocation.io

- IP Address (filled in by the user)
- Location
- Timezone
- ISP (Internet Service Provider)

https://leafletjs.com/SlavaUkraini/

- Spacial map representation

// async function getData() {
// const response = await fetch(
// `https://api.ipgeolocation.io/ipgeo?apiKey=8a1a101fc03c4006a08b3109d1ba1c63`
// );
// const data = await response.json();
// console.log(data.ip);

// const testHeading = document.querySelector(".test-heading");
// testHeading.innerHTML = data.ip;
// }

// getData();

// fetch(url)
// .then((data) => data.json())
// .then((ipData) => populateData(ipData));
