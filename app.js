var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
const Promise = require('bluebird');

let app = express();

const PORT = process.env.PORT || 4500;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var input;
var result;

var newRequest = function(input){
	return new Promise(function(resolve,reject){
		request(`http://localhost:8080/api/${input.number}/${input.amount}`, (err, res, body) => {
		  if (err) { reject(err); }
			else{
				result = body;
				resolve(JSON.parse(result))
				console.log('body is',body);
			}
		});
	});
}
var roundRequest = function(input){
	return new Promise(function(resolve,reject){
		request(`http://localhost:8080/api/round/${input.number}/${input.amount}`, (err, res, body) => {
		  if (err) { return console.log(err); }
			result = body;
			resolve(JSON.parse(result));
		});
	});
}

app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
	res.render('home');
});

app.get('/round', (req,res)=>{
	roundRequest(input).then(function(obj) {
        result = obj;
				res.render('results',{obj:result});
    }, function(err) {
        console.log(err);
    });
});
app.get('/results', (req,res)=>{
	console.log('final result is',result);
	res.render("results",{obj: result});
});

app.post('/calculate', (req,res)=>{
	input = req.body;
	newRequest(input).then(function(obj) {
        result = obj;
        console.log("Initialized user details");
        // Use user details from here
        // console.log(obj)
				res.render('results',{obj:result});
    }, function(err) {
        console.log(err);
    });
});


app.listen(PORT, () => console.log('App is running on Port ', PORT));
