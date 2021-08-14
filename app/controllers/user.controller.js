const User = require ("../models/user.model.js");

//const app = require ("../Server.js");


var express = require('express');

var app = express();
;

const path = require('path');
app.set('view engine', 'ejs');

//__dirname is current directory
//// default is /views, this changes the path to look for views folder

app.set('views', path.join(__dirname, '../'));

exports.create = (req, res) => {


	  // Validate request 
	  
	  if (!req.body) {
		  res.status(400).send({


			  message: "Content can not be empty!" });

	  } // Create a User



	  const user = new User({ 


		  username:req.body.username,
		  password: req.body.password


	  });




	  // Save User in the database
	  
	  
	  User.create(user, (err, data) => {



		  if (err) res.status(500).send({

			  message: err.message || "Some error occurred while creating the User." }); 

		  else{

			  

			//  res.send(data);
			  res.redirect("/");
			
	}


		  });



};


//search by id
//
exports.findById = (req, res) => {

	//req.params is all variables from url

	User.findById(req.params.userid, (err, data) => {

		if (err) {
			if (err.kind === "not_found") { 
				res.status(404).send({ message: `Not found User with id ${req.params.userid}.` });
			} 


			else {
				res.status(500).send({ message: "Error retrieving User wwith id " + req.params.userid });

			}

		}


		else {
			//res.send(data);
		//console.log(data);
			
		//first data refers as variable name being passed to html, second data refers to the data found by searching

		res.render('searchUserResult',{data:data});



		}
	});


};


exports.update =(req,res) =>{



	User.update(req.params.userid, 

			new User(req.body), //Passes a user with req.body
			(err,data)=>{

		



		if (err){
			if (err.kind==="not_found"){


				
				res.status(404).send({message:"User not found"});


			}else{


				res.status(500).send({message:"Error"});


			}
		





		}else{
	
		//res.send(data);
			
	


			res.redirect("/updateUser");


	}





}
	)};

exports.findAll = (req, res) => { 
	User.getAll((err, data) => { 

		if (err) res.status(500).send({ 

			message: err.message || "Some error occurred while retrieving users." });



		else res.send(data); 


	}); 


};
 
exports.delete = (req, res) => { 
	User.remove(req.params.userid, (err, data) => { 


			if (err) {
				if (err.kind === "not_found") {

					res.status(404).send({ message: `Not found user with id ${req.params.userid}.` });

				} 


				else { 


					res.status(500).send({ message: "Could not delete user with id " + req.params.userid });


				} 


			} else 
				
				res.send({ message: `User was deleted successfully!` });
		});


};


exports.deleteAll = (req, res) => {

	User.removeAll((err, data) => {

		if (err) res.status(500).send({

			message: err.message || "Some error occurred while removing all users." });

		else 


			res.send({ message: `All users were deleted successfully!` }); 

	});

};
