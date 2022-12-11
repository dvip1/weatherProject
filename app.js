const express = require('express');
const https = require("https");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
	res.sendFile(__dirname + "/index.html");
})
app.post('/', (req, res) => {
	const city = req.body.city1;
	url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=d525cc6404accf888b4230ffc981fc45'
	https.get(url, (response) => {
		console.log('StatusCode: ' + response.statusCode);
		console.log('headers: ' + response.headers);
		response.on('data', (d) => {
			d = JSON.parse(d);
			icon = d.weather[0].icon;
			const image_url = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
			res.write("<p>Today's temperature of "+city +"  is" + d.main.temp + " degree celsius</p>");
			res.write("<img src=" + image_url + ">")
			res.send();
			res.send();
		})
	})
})
// url= 'https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=d525cc6404accf888b4230ffc981fc45'

// 		})
// 	})
app.listen(port, () => {
	console.log("port started at " + port);
})

