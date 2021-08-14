

const sql = require("./db.js");


// constructor 


const User = function(user) {
	this.username = user.username;
	this.password = user.password;
	
	 }; 


User.create = (newUser, result) => { 
	sql.query("INSERT INTO user SET ?", newUser, (err, res) => {

		if (err) { console.log("error: ", err); 

			result(err, null); return;


		}


		console.log("created user: ", { id: res.insertId, ...newUser }); 		
		result(null, { id: res.insertId, ...newUser	}); 
	});

}; 

User.findById = (userid, result) => { 
	sql.query(`SELECT * FROM user WHERE userid = ${userid}`, 

	(err, res) => { 

		if (err) { 
			console.log("error: ", err); 
			result(err, null);
			return; 
		} 

		if (res.length) { 

			console.log("found user: ", res[0]); 
			result(null, res[0]); 
			return; 

		} 

// not found Customer with the id 
		result({ kind: "not_found" }, null);


	});


};


User.update = (userid, user,result) =>{


	sql.query('UPDATE user SET  username=?, password=? WHERE userid=?',[user.username,user.password,userid], (err, res) =>{


		if (err)  {
			console.log(err);
			result(null,err);
			return;

		}


		if (res.affectedRows==0){


			result({kind:"not_found"},null);

		}

		result(null,{id:userid, ...user});





		



}
	)};



User.getAll = result => {
	sql.query("SELECT * FROM user", (err, res) => { 

		if (err) { 

			console.log("error: ", err); 
			result(null, err); return;

		} 


		console.log("users: ", res);
		result(null, res);

	}); 


};

User.remove = (id, result) => {

	sql.query("DELETE FROM user  WHERE userid = ?",id, (err, res) => {


		if (err) { 
			console.log("error: ", err);
			result(null, err);
			return;

		} if (res.affectedRows == 0) {

			// not found User with the id
			result({ kind: "not_found" }, null); 
			return;
		}

		console.log("deleted user with id: ", id); result(null, res);

	}); 

};

User.removeAll = result => { 

	sql.query("DELETE FROM user", (err, res) => {

		if (err) { 
			console.log("error: ", err); 
			result(null, err);
			return;

		} 


		console.log(`deleted ${res.affectedRows} users`);

		result(null, res); 

	}); 


};


module.exports=User;
