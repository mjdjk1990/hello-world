/* var http = require('http');

http.request({ hostname: 'google.com' }, function(res) {
  res.setEncoding('utf8');
  res.on('data', function(chunk) {
    console.log(chunk);
  });
}).end(); */

var express = require('express');
var app = express();

var fs = require('fs');
var awsData = JSON.parse(fs.readFileSync('./index.json', 'utf8'));

var loc = 'Asia Pacific (Seoul)';
var i = 0;

// iterate through the wholeeee index.json and get stuff
for(const prop in awsData.products) {
	if(loc == awsData.products[prop].attributes.location) {
		if(i < 10) {
			i++;
			
			var sku = awsData.products[prop].sku;
			console.log(sku + ': ' + awsData.products[prop].attributes.location);
	
			// on demand
			var onDemand = awsData.terms.OnDemand;
			var offerTermCode;
			var rateCode;
			for(const prop in onDemand) {
				if(sku == prop) {
					//console.log(sku + ' is available on demand!');
					for(const o in onDemand[prop]) {
						offerTermCode = o;
						//console.log(offerTermCode);
					}
					//console.log(onDemand[prop][offerTermCode].priceDimensions);
					for(const p in onDemand[prop][offerTermCode].priceDimensions) {
						rateCode = p;
						//console.log(priceDimensionsCode);
					}
					var desc = onDemand[prop][offerTermCode].priceDimensions[rateCode].description;
					var pricePerUnit = onDemand[prop][offerTermCode].priceDimensions[rateCode].pricePerUnit.USD;
					
					console.log('ON DEMAND:\n' + desc + '\nat USD$' + pricePerUnit + '\n');
					
				}		
			}
			
			// reserved
			var reserved = awsData.terms.Reserved;
			for(const prop in reserved) {
				if(sku == prop) {
					//console.log(sku + ' is available reserved!');
					for(const o in reserved[prop]) {
						offerTermCode = o;
						//console.log(offerTermCode);
					}
					//console.log(onDemand[prop][offerTermCode].priceDimensions);
					for(const p in reserved[prop][offerTermCode].priceDimensions) {
						rateCode = p;
						//console.log(priceDimensionsCode);
					}
					var desc = reserved[prop][offerTermCode].priceDimensions[rateCode].description;
					var pricePerUnit = reserved[prop][offerTermCode].priceDimensions[rateCode].pricePerUnit.USD;
					
					console.log('RESERVED:\n' + desc + '\nat USD$' + pricePerUnit + '\n');
				}
			}
		}
	}
}

app.use(express.static('public'));
app.get('/qt_test.html', function(req, res) {
	res.sendFile(__dirname + "/" + "qt_test.html");
})

var server = app.listen(8080, function() {
	var host = server.address().address
	var port = server.address().port
	console.log("Example app listening at http://%s:%s", host, port)
})