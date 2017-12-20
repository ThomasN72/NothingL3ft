// Initialize Firebase
var config = {
  apiKey: "AIzaSyCXoshqAsJV4F6SLVUOkjRavjM6OsUJ35w",
  authDomain: "nothingleft-9ed3b.firebaseapp.com",
  databaseURL: "https://nothingleft-9ed3b.firebaseio.com",
  projectId: "nothingleft-9ed3b",
  storageBucket: "nothingleft-9ed3b.appspot.com",
  messagingSenderId: "38778897751"
};
firebase.initializeApp(config);
var database = firebase.database()
var itemNumber = 0;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
  	var number = 0
  	console.log("userLogged")
  	database.ref("/userInfo").child(user.uid).on("value", function(snapshot) {
  		// console.log(Object.keys(snapshot.val()[0]))
  		// console.log(snapshot.val().itemsForSales==null)
  		if(snapshot.val().itemsForSales!=null){
	  		var dataDetails = snapshot.val().itemsForSales

	  		for(var i=0; i<dataDetails.length; i++){
		  		var items = Object.keys(snapshot.val().itemsForSales[i])
		  		console.log("items",items)
		  		console.log(dataDetails)
		  		console.log(dataDetails.length)
		  		console.log(dataDetails[i])
		  		console.log(dataDetails[i][items])
		  		console.log("i",i)
	  			var itemPicture = dataDetails[i][items].itemPicture	
	  			var itemName = dataDetails[i][items].itemName
	  			var itemPrice = dataDetails[i][items].itemPrice
	  			var itemQuantity = dataDetails[i][items].itemQuantity
	  			var deleteButton = "&#9747"

	  			$(".foodDetails").append("<tr>"
	  				+"<td><img style='width:200px' src='"+itemPicture+"'></td>"			
	  				+"<td>"+itemName+"</td>"
	  				+"<td>"+itemPrice+"</td>"
	  				+"<td>"+itemQuantity+"</td>"
	  				+"<td class='delete' data-center='"+itemNumber+"'>"+deleteButton+"</td>"
	  				+"</tr>")

	  			$(".delete").attr("data-center", itemNumber)
	  			$(".delete").on("click", function(){
	  				$(this).parent().detach();
	  				var currentNumber = $(this).attr("data-center")
	  				database.ref("/userInfo").child(user.uid).child(currentNumber).remove()
	  			})
	  		}
  		}else{
  			console.log("wrong")
  		}
  	})
  	number++
  }else {
	    // No user is signed in.
	  	console.log("userNotLogged")
	}
})

$(".addItem").on("click",function(){
	user = firebase.auth().currentUser;

	var itemPicture = $("#item_Picture").val();		
	var itemName = $("#item_Name").val();
	var itemPrice = $("#item_Price").val();
	var itemQuantity = $("#item_Quantity").val();
	var deleteButton = "&#9747"

	$(".foodDetails").append("<tr>"
		+"<td><img style='width:200px' src='"+itemPicture+"'></td>"			
		+"<td>"+itemName+"</td>"
		+"<td>"+itemPrice+"</td>"
		+"<td>"+itemQuantity+"</td>"
		+"<td class='delete' data-center='"+itemNumber+"'>"+deleteButton+"</td>"
		+"</tr>")

	$(".delete").attr("data-center", itemNumber)
	$(".delete").on("click", function(){
		$(this).parent().detach();
		var currentNumber = $(this).attr("data-center")
		database.ref("/userInfo").child(user.uid).child("/itemsForSales").child(currentNumber).remove()
	})

	database.ref("/userInfo").child(user.uid).child("/itemsForSales").child(itemNumber).push({
		itemPicture,
		itemName,
		itemPrice,
		itemQuantity,
	})
	itemNumber++;
})

$(".logOut").on("click",function(){
	window.location.href = "index.html";
	firebase.auth().signOut().then(function() {
	  // Sign-out successful.
	}).catch(function(error) {
	  // An error happened.
	});
})



