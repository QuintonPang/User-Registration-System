// Set express as Node.js web application

//  server framework.

//To install express before using it as

// an application server by using 

// "npm install express" command.

 var express = require('express'); 

var app = express();

const bodyparser = require("body-parser");


const path = require('path');

//bootstrap js file
 
//iport("bootstrap");

// bootstrap scss file

//import("./scss/Server.scss");


// Set EJS as templating engine

app.set('view engine', 'ejs');

//__dirname is current directory
// default is /views, this changes the path to look for views folder
app.set('views', path.join(__dirname, './views'));
app.get('/', (req, res)=>{ 

	 

// The render method takes the name of the HTML

// page to be rendered as input

// This page should be in the views folder

// in the root directory.

res.render('home'); 

});

app.get("/registerUser",(req,res)=>{


res.render("registerUser");

});




app.get("/updateUser",(req,res)=>{



	res.render("updateUser");


});


app.get("/deleteUser", (req, res)=>{



	res.render("deleteUser");


});


app.get("/searchUser",(req,res)=>{


	res.render("searchUser");



});

const server = app.listen(4000, function(){ 

	    console.log('listening to port 4000') 

});

// Body-parser middleware

app.use(bodyparser.urlencoded({extended:false})) 

app.use(bodyparser.json())


//gets username from POST

/**app.post('/registerUser', (req, res) => { 

	    console.log("Using Body-parser: ", req.body.username);

	res.redirect("registerUser");

	//res.render("registerUser");
	
	//res.end();

})
*/

require("./routes/user.routes.js")(app)

