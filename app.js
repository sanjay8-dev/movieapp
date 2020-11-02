var express = require("express");	
var app = express();
var request = require("request");
const sendMail = require("./mail.js")
require('dotenv').config();

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

//data parsing for contact us page
app.use(express.urlencoded({extended: false}));
app.use(express.json());



app.get('/', function(req, res){
     res.render("form");	
})
app.get('/results', function(req, res){
        var sresult= req.query.sresult	;
	request("http://www.omdbapi.com/?s="+sresult+"&apikey=thewdb", function(error, response, body){
		if(!error&& response.statusCode==200)
			{
		var mainData =JSON.parse(body);
	     console.log(mainData);
 	
		res.render("results", {mainData:mainData});
			}
		else{
			res.send("sorry error not found");
			
		}
		
	});
});

app.get('/show/:id', function(req,res){
	  var aresult =  req.params.id;
	request("http://www.omdbapi.com/?i="+aresult+"&plot=full&apikey=thewdb", function(error, response, body){
		if(!error&&response.statusCode==200)
			{
				var insideData =JSON.parse(body);
				console.log(insideData);
				
				res.render("show", {insideData:insideData});
			}
		else{
                res.send("error please check");
		
		}
		
		
	});
});

app.get('/contact', function(req, res){
   res.render("contact");  	
	
});
app.get('/aboutMe', (req, res)=>{
	res.render("about");
});
app.post('/contact', (req, res)=>{
	//send email route
	console.log(req.body);
	const {name, email, message}= req.body;
	res.json({message: "message received!"})
	sendMail(name, email, message, function(err, data){
		if(err){
			res.statusCode(500).json({message: 'Internal error'});
		}
		else{
			console.log("emailSent");
		}
	});
	
});


app.listen(process.env.PORT || 3000 , process.env.IP, function(){
	console.log("server has started")});
