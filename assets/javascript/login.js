// // Initialize Firebase
// var config = {
//   apiKey: "AIzaSyCXoshqAsJV4F6SLVUOkjRavjM6OsUJ35w",
//   authDomain: "nothingleft-9ed3b.firebaseapp.com",
//   databaseURL: "https://nothingleft-9ed3b.firebaseio.com",
//   projectId: "nothingleft-9ed3b",
//   storageBucket: "nothingleft-9ed3b.appspot.com",
//   messagingSenderId: "38778897751"
// };

// firebase.initializeApp(config);
// var database = firebase.database()

var email;
var password;
var userId = "buyer";
var logOutButton = "<div class='logOut waves-effect waves-light btn logOut'>logOut</div>"
var displayName;

// $(document).ready(function(){
	$('#modal1').modal();
	$('#modal2').modal();

	//Select user type
	$("span").on("click",function(){
		$("span").removeClass("waves-effect waves-light btn")
		$(this).addClass("waves-effect waves-light btn")
		userId = $(this).attr("data-center")
	})

	$(".signIn").on("click", function(){
		email = $(".userName").val()
		password = $(".userPassword").val()
		// console.log(email)
		// console.log(password)
		firebase.auth().signInWithEmailAndPassword(email, password).then(function(firebaseUser) {
   			}).catch(function(error) {
			  	var errorCode = error.code;
			  	var errorMessage = error.message;
			  	// console.log(errorMessage)
		}).then(function(){
			user = firebase.auth().currentUser;
			// console.log(user)
			firebase.auth().onAuthStateChanged(function(user) {
			 	if (user.displayName == "restaurant") {
				    // User is signed in.
			 		window.location.href = "restaurantProfile.html";
			    	// displayName = user.displayName;
			    	// displayName = userId;
				    // var email = user.email;
				    // console.log(user.email);


			  } else if(user.displayName == "buyer") {
			  		// console.log("correct")
			    	// User is signed out.
				    $(".button1").detach()
				    $(".button2").detach()				
				    $(".button3").append(logOutButton)

			  } else{

			  }
			});
		})
	});

	$(".signUp").on("click", function(){
		email = $(".email").val()
		password = $(".password").val()
		// console.log(email)
		// console.log(password)
		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
		}).then(function(){

			firebase.auth().onAuthStateChanged(function(user) {

				user.updateProfile({
				  displayName: userId,
				})
				if (user) {
					// console.log(user.email);
				} else {
				    // User is signed out.
					// console.log("NOPE")
				}
			});
		}).then(function(){
			user = firebase.auth().currentUser;
			// console.log(user)
			database.ref("/userInfo").child(user.uid).set({
				email,
				password,
				userId,
			})
		}).then(function(){
			if(userId == "restaurant"){
				window.location.href = "restaurantProfile.html";
			}else{
				$(".button1").detach()
				$(".button2").detach()				
				$(".button3").append(logOutButton)
			}
		}).then(function(){
			$(".logOut").on("click",function(){
				window.location.href = "index.html";
				firebase.auth().signOut().then(function() {
				  	$(".logOut").detach()
				  	$(".button1").append()
				  	$(".button2").append()
				  // Sign-out successful.
				}).catch(function(error) {
				  // An error happened.
				});
			})
		})
	})

	$(".logOut").on("click",function(){
		window.location.href = "index.html";
		firebase.auth().signOut().then(function() {
		  	$(".logOut").detach()
		  	$(".button1").append()
		  	$(".button2").append()
		  // Sign-out successful.
		}).catch(function(error) {
		  // An error happened.
		});
	})
// });