const express = require("express");
const bodyParser = require("body-parser");
var request = require('request');
var app = express();
app.use(
		bodyParser.urlencoded(
		{ extended: true })
	);
app.use(bodyParser.json());

app.get('/testdialogflow',function(req,res){
res.send('Inside getheroku');
});

app.post('/testdialogflow',function (req, res) {
	console.log('Inside /testdialogflow');
	
	
	request.post('https://www.securesmarthome.co:1144/testdialogflow',
	{
		json: req.body
	},
	function(err,response,body){
		if(!err && response.statusCode == 200)
		{
			//res.send(body);
			res.json({
					fulfillmentText: 'Sucess',
					source: "testbean"
				  });
		}
		else
		{
			res.json({
					fulfillmentText: 'error',
					source: "testbean"
				  });
		}
	});
}).listen(process.env.PORT||9879);s
	
	//var current_mode = "customise";
	/*var ans;
	var v=req.body.queryResult;
	
	if(v.intent.displayName == "on_off_state")
	{	
		ans = "Okay ac turned on";					
	}
	else 
	{
		ans = "Sorry i am in else"; 
	}
	
	return res.json({
				fulfillmentText: ans,
				source: "testbean"
			  });
			  
}).listen(process.env.PORT||9879);*/