var express = require('express');
var app = express();
const port = process.env.PORT || 8080;

// tell it to use the public directory as one where static files live
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('pages/form');
});

app.get('/cost', calculateRate);

app.listen(port, function() {
  console.log('Node app is running on port', port);
});


function calculateRate(request, response) {
	const weight = Number(request.query.weight);
	const shipping = String(request.query.shipping);

	computeCost(response, weight, shipping);
}

function computeCost(response, weight, shipping) {

	let result = 0;

	if(shipping == "Letters (Stamped)")
        {
		if (weight <= 1)
		result = .55
		else if (weight <= 2)
		result = .70
		else if (weight <= 3)
		result = .85
		else
		result = 1

	}
	else if(shipping == "Letters (Metered)")
        {
		if (weight <= 1)
		result = .5
		else if (weight <= 2)
		result = .65
		else if (weight <= 3)
		result = .8
		else
		result = .95

	}
	else if(shipping == "Large Envelopes (Flats)")
        {
		if (weight <= 1)
		result = 1
		else if (weight <= 2)
		result = 1.20
		else if (weight <= 3)
		result = 1.40
		else if (weight <= 4)
		result = 1.60
		else if (weight <= 5)
		result = 1.80
		else if (weight <= 6)
		result = 2
		else if (weight <= 7)
		result = 2.20
		else if (weight <= 8)
		result = 2.40
		else if (weight <= 9)
		result = 2.60
		else if (weight <= 10)
		result = 2.80
		else if (weight <= 11)
		result = 3
		else if (weight <= 12)
		result = 3.20
		else
		result = 3.40
	}
	else if(shipping == "First-Class Package Service—Retail")
        {
		if (weight <= 4)
		result = 3.80
		else if (weight <= 8)
		result = 4.60
		else if (weight <= 12)
		result = 5.30
		else
		result = 5.90

	}

	const params = {weight: weight, shipping: shipping, result: result};

	response.render('pages/result', params);
}