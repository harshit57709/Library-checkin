const express = require("express"),
	  mongoose = require("mongoose"),
	  bodyParser = require('body-parser'),
	  pryjs 	=  require('pryjs')
mongoose.connect('mongodb://localhost:27017/Library',{useUnifiedTopology:true,useNewUrlParser:true});
var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

var studentSchema = new mongoose.Schema({
	name:String,
	rollNo:String,
	date: String,
	seatNo:String
})

Student= mongoose.model('Student',studentSchema);

app.get('/home',function(req,res){
Student.find({},function(err,students){
				res.render('home',{students:students});
			});

	
})	
app.get('/',(req,res)=>{
	res.render("lib")
})
app.get('/form',(req,res)=>{
	
	var seatNo = req.query
	res.render('form.ejs',{seatNo:seatNo.seat})
	
})

app.post('/form',(req,res) =>{
	var name   		= req.body.name,
		rollNo      = req.body.roll_no,
		seatNo      = req.body.seat_no,
		arrivalTime = new Date();
	
	newStudent = {name:name,rollNo:rollNo,seatNo:seatNo,arrivalTime:arrivalTime}
	
	Student.create(newStudent,function(err,addedStudent){
		if(err){
			console.log("Error has occured");
			console.log(err)
		}else{
			console.log(addedStudent);
			res.redirect('/home');
		}
		
		
	})
	
})
app.listen(process.env.PORT||3000,process.env.IP,function(){
	console.log('server started on port 3000');
});





