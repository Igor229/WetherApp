  fetch ('http://api.openweathermap.org/data/2.5/weather?id=707471&appid=742198c70f710c4c4e1999121c8c386b')
	.then (function (resp) { return resp.json() }) //convert to json
	.then (function (data) {
		console.log(data);
		document.querySelector('.current__city').textContent = data.name;
		document.querySelector('.current__temp').innerHTML = Math.round(data.main.temp - 273.15) + '&deg;';
		document.querySelector('.feelslike').innerHTML = Math.round(data.main.feels_like - 273.15) + '&deg;';
		document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
		document.querySelector('.pressure').innerHTML = Math.round(data.main.pressure / 1.33) + "мм";
		document.querySelector('.wind').innerHTML = Math.round(data.wind.speed) + "м/с";
	})

	Number.prototype.pad = function(size) {
	  var s = String(this);
	  while (s.length < (size || 2)) {s = "0" + s;}
	  return s;
	}


	function getHoursString(dateTime) {
		  let date = new Date(dateTime);
		  let hours = date.getHours().pad();

		  return hours;
		}


	function getIcon (data) {
		let forecastDataContainer = document.querySelector('.forecast');
		let forecasts = ''

		for (let i = 0; i < 6; i++) {
			let item = data.list[i];


			let icon = item.weather[0].icon;
			let temp = getTemperature(item.main.temp -273.15);
			let time = ( i == 0 ? 'Нині' : getHoursString(item.dt * 1000) + ":00");

			let template = `<div class="forecast__item">
			<div class="forecast__time">${time}</div>
			<div class="forecast__icon icon__${icon}"></div>
			<div class="forecast__temp">${temp}</div>
			</div>`;
			forecasts += template;
		}
		forecastDataContainer.innerHTML = forecasts;
	}


	const temperatureUnit = '˚';
	const humidityUnit = ' %';
	const pressureUnit = ' мм. рт. ст.';
	const windUnit = ' м/с';

	var currentData;

	async function getData() {
	  let response = await fetch('http://api.openweathermap.org/data/2.5/forecast?q=Ivano-Frankivsk&appid=742198c70f710c4c4e1999121c8c386b');

	  if (response.ok) {
	    let jsonData = response.json();
	    return jsonData;
	  } else {
	    alert('Error: ' + response.status);
	  }
	}

	function convertPressure(value) {
	  return (value/1.33 ).toFixed();
	}

	function getValueWithUnit(value, unit) {
	  return `${value}${unit}`;
	}

	function getTemperature(value) {
	  var roundedValue = value.toFixed();
	  return getValueWithUnit(roundedValue, temperatureUnit);
	}

	function render(data) {
	  getIcon(data);

	}

	function start() {
	  getData().then(data => {
	    currentData = data;
	    render(data);
	  })
	}

	start();