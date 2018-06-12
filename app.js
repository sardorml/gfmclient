var express = require('express');
var bodyParser = require('body-parser');

var app = express();
const PORT = process.env.PORT || 8080;
var urlencodedParser = bodyParser.urlencoded({extended: false});


////////
var input;
var result;
var extra;
var one_third;
var for_each;
///////

app.set('view engine', 'ejs');

app.get('/', function(req,res){

	res.render('home',{obj: req.query});
});


app.post('/',urlencodedParser, function(req,res){
	input = req.body;
	input.amount = parseFloat(input.amount);
	console.log('User input: ', input);
	if(input.amount){ // Check if input amount is number
		if(input.number>1){
			if(input.amount < 5000){ // if less than 5000
			result = input.amount;
			for_each = 0;
			}
			else{
				one_third = input.amount/3;
				console.log('One third: ', one_third);
				if((one_third/(input.number-1))>10000){
					extra = one_third-(10000*(input.number-1));
					for_each = 10000;
					console.log('Extra Amount: ', extra);

					result = (2*one_third)+extra;
				}else{
					result = one_third*2; // Pay 2/3
					for_each = one_third/(input.number-1)
					
				}
			}
		}
		else{
			result = input.amount;
			for_each = 0;
		}
		input.result_for_each = Math.round(for_each*100)/100;
		input.amount = Math.round(result*100)/100;
		console.log('Number of people in the group: ', input.number);
		console.log('Total amount need to be paid by you: ', input.amount);
		console.log('Total amount need to be paid by other members: ', input.result_for_each);
		res.render('results',{obj: input});
	}
	else res.render('error');
	
	

	
});


app.listen(PORT, () => console.log('App is running on Port ', PORT));