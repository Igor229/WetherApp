fetch ('http://api.openweathermap.org/data/2.5/weather?id=693510&appid=742198c70f710c4c4e1999121c8c386b')
	.then (function (resp) { return resp.json() }) //convert to json
	.then (function (data) {
		console.log(data);
		document.querySelector('.package-name').textContent = data.name;
		document.querySelector('.price').innerHTML = Math.round(data.main.temp - 273.15) + '&deg;';

	})
	.catch (function() {
		// catch any errors
	});


	// 48.300702 25.223240
	// 693510