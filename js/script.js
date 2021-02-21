   	var button = document.querySelector('.button');
	var input = document.querySelector('.input_text');



button.addEventListener('click', function(name){
   fetch ('http://api.openweathermap.org/data/2.5/forecast?q='+input.value+'&cnt=16&appid=742198c70f710c4c4e1999121c8c386b&lang=en, ru, ua,uk')
	.then (function (resp) { return resp.json() }) //convert to json
	.then (function (data) {
		console.log(data);
		document.querySelector('.current__city').textContent = data.city.name;
		document.querySelector('.current__date').innerHTML = data.list[0].dt_txt;
		document.querySelector('.current__temp').innerHTML = Math.round(data.list[0].main.temp - 273.15) + '&deg;';
		document.querySelector('.feelslike').innerHTML = Math.round(data.list[0].main.feels_like - 273.15) + '&deg;';
		document.querySelector('.humidity').innerHTML = data.list[0].main.humidity + "%";
		document.querySelector('.pressure').innerHTML = Math.round(data.list[0].main.pressure / 1.33) + "мм";
		document.querySelector('.wind').innerHTML = Math.round(data.list[0].wind.speed) + "м/с";
		getForecastDetails(data);

		var lat = data.city.coord.lat;
		var lon = data.city.coord.lon;

			fetch ('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&appid=742198c70f710c4c4e1999121c8c386b')
				.then (function (resp) { return resp.json() }) //convert to json
				.then (function (data1) {
					console.log(data1);
					getNextDaysDetails(data1);
				})
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


	function getForecastDetails (data) {
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



	function getNextDaysDetails(data1) {
		let ndaysDataContainer = document.querySelector('.next__days');
		let ndays = ''

		for (let i = 1; i < 4; i++) {
			let item = data1.daily[i];


			let icon = item.weather[0].icon;
			let mintemp = getTemperature(item.temp.min -273.15);
			let maxtemp = getTemperature(item.temp.max -273.15);
			let date = new Date(data1.daily[i].dt * 1000);
			var options = {weekday: 'long'};
			date = new Intl.DateTimeFormat('uk', options).format(date);

			let ntemplate = `<div class="ndays__items">
				<div class="next__date"> ${date} </div>
				<div class="next__icon icon__${icon}"></div>
				<div class="next__temp">
					<div class="next__mintemp">мін.${mintemp}</div>
					<div class="next__maxtemp">макс.${maxtemp}</div>
				</div>
			</div>`;
			ndays += ntemplate;
		}
		ndaysDataContainer.innerHTML = ndays;
	}



	const temperatureUnit = '˚';
	const humidityUnit = ' %';
	const pressureUnit = ' мм. рт. ст.';
	const windUnit = ' м/с';


	function getValueWithUnit(value, unit) {
	  return `${value}${unit}`;
	}

	function getTemperature(value) {
	  var roundedValue = value.toFixed();
	  return getValueWithUnit(roundedValue, temperatureUnit);
	}
})