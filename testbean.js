const express = require("express");
const bodyParser = require("body-parser");
var request = require('request');
var app = express();
var fs =require('fs');
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
	
	
	 request.post(
	   {
			url : 'https://115.254.126.74:1144/dialogflow',
			headers : {
				authorization : req.headers['authorization']
			},	
			json : req.body,			
			strictSSL: false
		}, 
	    function(err,response,b){
			 if(err || response.statusCode != 200)
			 {
			
				 res.json({
						 fulfillmentText: 'error while calling api: ' +err+ ' , code: ' + ((typeof(response)=='undefined' ||  response==null)?' Undefined': response.statusCode) ,
						 source: "testbean12"
					   });
				
			 }
		 else
			 {
			 res.json({
						 fulfillmentText: response.body.fulfillmentText,
						 source: response.body.source
					   });
			}
		
	    });
	
	
	//www.securesmarthome.co
	  /*request.get(
	   {
			url : 'https://172.16.231.81:1144/dialogflow',
		 
		 strictSSL: false
		 }, 
	    function(err,response,body){
			 if(err || response.statusCode != 200)
			 {
			res.send(body);
				 res.json({
						 fulfillmentText: 'error while calling api: ' +err+ ' , code: ' + ((typeof(response)=='undefined' ||  response==null)?' Undefined': response.statusCode) ,
						 source: "testbean12"
					   });
				
			 }
		 else
			 {
			 res.json({
						 fulfillmentText: 'Success',
						 source: "testbean1"
					   });
			}
	    });*/
	
	/*request.post('https://www.securesmarthome.co:1144/dialogflow',
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
					fulfillmentText: 'error while calling api: ' +err+ ' , code: ' +  response.statusCode ,
					source: "testbean"
				  });
		}
	});*/
}).listen(process.env.PORT||9879);
console.log('Server running');
	
	
