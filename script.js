document.querySelector("i").addEventListener("click", (e) => {
  fun();
});
document.querySelector("input").addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    fun();
  }
});
function fun() {
  let input_Field = document.querySelector("input");
  if (input_Field.value == "") {
    alert("Please enter city name");
  } else {
    let try_catch = api_Call(input_Field.value);
    try_catch
      .then((data) => {
        let x = change_temp(data.main.temp);
        if (x == true) {
          change_Humidity(data.main.humidity);
          change_Wind(data.wind.speed);
        }
      })
      .catch(() => {
        alert("Please check city Name");
      });
  }
}

async function api_Call(city_Name) {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city_Name.replace(
      / +/g,
      ""
    )}&appid=986e2bcc70eaeb4ac397700f1626f4d2&units=metric`
  );

  let json_Response = await response.json();
  return await json_Response;
}

function change_temp(change_temperature) {
  let ch_temp = document.querySelector(".parent2 h2");
  ch_temp.innerText = `${Math.round(change_temperature)}°c`;
  return true;
}

function change_Humidity(change_humidity) {
  let ch_humidity = document.querySelector("#third h2");
  ch_humidity.innerText = `${change_humidity}%`;
  return true;
}

function change_Wind(data) {
  let ch_wind = document.querySelector("#fourth h2");
  ch_wind.innerText = `${Math.floor(data * 3.6)}km/h`;
  return true;
}
