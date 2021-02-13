  fetch ('http://api.openweathermap.org/data/2.5/weather?id=707471&appid=742198c70f710c4c4e1999121c8c386b')
	.then (function (resp) { return resp.json() }) //convert to json
	.then (function (data) {
		console.log(data);
		// document.querySelector('.city__name').textContent = data.name;
		// document.querySelector('.temp').innerHTML = Math.round(data.main.temp - 273.15) + '&deg;';

	})
	.catch (function() {
		// catch any errors
	});


	// 48.300702 25.223240
	// 693510













	// const url = 'js/data.json';
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

	function getValueWithUnit(value, unit) {
	  return `${value}${unit}`;
	}

	function getTemperature(value) {
	  var roundedValue = value.toFixed();
	  return getValueWithUnit(roundedValue, temperatureUnit);
	}

	function render(data) {
	  renderCity(data);
	  renderCurrentTemperature(data);

	  renderForecast(data);
	  renderDetails(data);

	}

	function renderCity(data) {
	  let cityName = document.querySelector('.current__city');
	  cityName.innerHTML = data.city.name;
	}

	function renderCurrentTemperature(data) {
	  let tmp = data.list[0].main.temp;

	  let currentTmp = document.querySelector('.current__temp');
	  currentTmp.innerHTML = getTemperature(tmp -273.15);
	}


	function renderForecast(data) {
	  let forecastDataContainer = document.querySelector('.forecast');
	  let forecasts = '';

	  for (let i = 0; i < 6; i++) {
	    let item = data.list[i];

	    let icon = item.weather[0].icon;
	    let temp = getTemperature(item.main.temp -273.15);
	    let hours = ( i == 0 ? 'Нині' : getHoursString(item.dt * 1000) + ":00");

	    let template = `<div class="forecast__item">
	      <div class="forecast__time">${hours}</div>
	      <div class="forecast__icon icon__${icon}"></div>
	      <div class="forecast__temperature">${temp}</div>
	    </div>`;
	    forecasts += template;
	  }
	  forecastDataContainer.innerHTML = forecasts;
	}

	function renderDetails(data) {
	  let item = data.list[0];
	  let pressureValue = convertPressure(item.main.pressure);
	  let pressure = getValueWithUnit(pressureValue, pressureUnit);
	  let humidity = getValueWithUnit(item.main.humidity, humidityUnit);
	  let feels_like = getTemperature(item.main.feels_like -273.15);
	  let wind = getValueWithUnit(item.wind.speed, windUnit);

	  renderDetailsItem('feelslike', feels_like);
	  renderDetailsItem('humidity', humidity);
	  renderDetailsItem('pressure', pressure);
	  renderDetailsItem('wind', wind);
	}

	function renderDetailsItem(className, value) {
	  let container = document.querySelector(`.${className}`).querySelector('.details__value');
	  container.innerHTML = value;
	}

	function start() {
	  getData().then(data => {
	    currentData = data;
	    render(data);
	  })
	}

	function transition() {
	  document.documentElement.classList.add('transition');
	  setTimeout(function() {
	    document.documentElement.classList.remove('transition');
	  }, 4000)
	}

	start();



