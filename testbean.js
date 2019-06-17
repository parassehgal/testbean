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

app.get('/login',function(req,res){
	try{
		fs.readFileSync('./html/login.html');
	}
	catch(e)
	{
		console.log('Error occured' + e.stack);
	}
});

app.get('/testdialogflow',function(req,res){
res.send('Inside getheroku');
});

app.post('/testdialogflow',function (req, res) {
	console.log('Inside /testdialogflow');
	
	 //log(req.headers['authorization'],true);
	 //log(JSON.stringify(req),true);
	 //console.log(JSON.stringify(req));
	
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
	
});

app.post('/alexa',function(req,res){

		request.post(
	    {
			url : 'https://115.254.126.74:1144/alexa',	
			json : req.body,			
			strictSSL: false
		}, 
	    function(err,response,b){
			 if(err || response.statusCode != 200)
			 {
				 res.json({
						"version": "1.0",
						"response": {
						  "shouldEndSession": false,
						  "outputSpeech": {
							"type": "SSML",
							"ssml": "<speak>" + "Error occurred" + "</speak>"
						  }
						}
					   });
				
			 }
		 else
			 {
			 res.json({
						"version": "1.0",
						"response": {
						  "shouldEndSession": false,
						  "outputSpeech": {
							"type": "SSML",
							"ssml": "<speak>" + response.body.message + "</speak>"
						  }
						}
					   });
			}
		
	    });

});

app.post('/alexa/token',function(req,res){

/*log('Inside heroku access token',true);
log(JSON.stringify(req.body),true);
console.log(JSON.stringify(req.body));*/
var rb = {"grant_type":"authorization_code","code":"136be4f9098b1f4aac6409086419e987e0c52d67f7ad42c314751982ba1ae94d1572a7bf17b405fe","redirect_uri":"https://layla.amazon.com/api/skill/link/M1HXPN4UNAI4NX","client_id":"LESEHejecNlArGo3lQ6GqZ62CaLRcP"};


		request.post(
	    {
			url : 'https://115.254.126.74:1144/oauth/alexatoken',	
			headers: req.headers,
			json : rb,			
			strictSSL: false
		}, 
	    function(err,response,b){
		if(err || response.statusCode != 200)
			{
				res.json({
						"access_token" : null,
					    "token_type" : "bearer",
					    "expires_in" : null,
					    "refresh_token" : null
					   });
			}
		 else
			{
			 res.json({
						"access_token" : response.body.access_token,
					    "token_type" : "bearer",
					    "expires_in" : response.body.expires_in,
					    "refresh_token" : response.body.refresh_token
					   });
			}	
		});
});

app.listen(process.env.PORT||9879);
console.log('Server running');

function log(txt, isError) {
    
	if ((typeof (isError) != 'undefined' && isError))
	{
		request.post(
			{
				url : 'https://115.254.126.74:1144/logging',				
				json : {message:txt, isError:isError},		
				strictSSL: false
			},
			function (error, response, body) {
			
			});
	}
}
	
	