// https://api.ipgeolocation.io
// 8a1a101fc03c4006a08b3109d1ba1c63

// const apiData = {
//   url: "https://api.ipgeolocation.io/",
// };

async function getData() {
  const response = await fetch(
    `https://api.ipgeolocation.io/ipgeo?apiKey=8a1a101fc03c4006a08b3109d1ba1c63`
  );
  const data = await response.json();
  console.log(data.ip);

  const testHeading = document.querySelector(".test-heading");
  testHeading.innerHTML = data.ip;
}

getData();
