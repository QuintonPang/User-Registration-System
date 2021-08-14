module.exports = app =>



{ const User = require("../controllers/user.controller.js");


	// Create a new Customer 

	app.post("/registerUser",User.create);
	

	//Search by id

		app.post("/searchUser/:userid",User.findById);

	//get all
	
		app.get("/searchAllUser",User.findAll);


	//update by id

		app.post("/updateUser/:userid", User.update);

	//delete by id
	
		
		app.post("/deleteUser/:userid", User.delete);

	//delete all
	
		app.get("/deleteAllUser", User.deleteAll);
 


	//post is for with input, get is for without any input
};
