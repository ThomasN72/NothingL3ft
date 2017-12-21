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

var database = firebase.database();

$(document).ready(function(){
  $('.carousel').carousel();
})

//this function creates the map; it needs the css styling to render
  var map, infoWindow;
  var markers = [];
  var pos;

  
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.09024, lng: -95.712891},
    zoom: 4
  });

  infoWindow = new google.maps.InfoWindow;
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
infoWindow.setPosition(pos);
infoWindow.setContent(browserHasGeolocation ?
                      'Error: The Geolocation service failed.' :
                      'Error: Your browser doesn\'t support geolocation.');
infoWindow.open(map);
}


$('#submit').on('click', function(){
  clearMarkers();
  event.preventDefault();
  var location = $('#restaurant').val();
  console.log("location: " + location);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      $('#results').html("<h2 class='text-center'> Results for " + location + "</h2>");

      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      currentMarker(pos)
      map.setCenter(pos);
      map.setZoom(12);

      restaurantFinder(location,pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });

    $('#maptext').text("Click on the marker for information about the restaurant");
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}); 

//Function for turning regular address into coordinates using the google geocoder api
function geoCoder(location,name,addresses){
  var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+ location + "&key=AIzaSyBpHkoMadHxCiRan1yfwVQ85q2ZxLiLOGI"

  $.ajax({
   url: queryURL,
   method: "GET"
   }).done(function(response) {
    console.log(response);
    var results = response.data;
    var coords = response.results["0"].geometry.location;
    console.log(coords)

    addMarker(coords,name,addresses)
  })
}
// })

//Function adds a marker at the restaurant's address; when the marker is click, restaurant info appears
function addMarker(location,name,address) {
  var marker = new google.maps.Marker({
      position: location,
      title: 'Test',
      map:map
  });

  markers.push(marker);

  var nameAddress = name + '<br>' + address[0] + '<br>' + address[1]   //This may need to change if the address has additional info like a company name or suite number

  var restaurantInfo = new google.maps.InfoWindow({
      content: nameAddress //use variable to fill this with restaurant info like the name/address/rating
  });

  marker.addListener('click', function() {
      restaurantInfo.open(map, marker); 
  })
}


//Adds a marker at the users location
function currentMarker(location) {
  var marker = new google.maps.Marker({
      position: location,
      title: 'Test',
      map:map
  });

  markers.push(marker);

  var restaurantInfo = new google.maps.InfoWindow({
      content: "Searched Location" //use variable to fill this with restaurant info like the name/address/rating
  });

  restaurantInfo.open(map, marker);
}


//Removing Markers
function clearMarkers(){
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
};

function restaurantFinder(location,pos){
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://cryptic-headland-94862.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=" + location + "&latitude=" + pos.lat + "&longitude=" + pos.lng + "&limit=5",
    "method": "GET",
    "headers": {
      "authorization": "Bearer p7FLN3mZ05l12noAsPo9XnkpnHonn_1O2asNEkYcBDuW0NcQNcilhY-zp0zhaSOTm-TkYVceqKZnzPzUMQorpxo6w8hOWNhc-TYT2tIaYlYbHMnLgcgh-0uDTxczWnYx",
      "Cache-Control": "no-cache",
      "Postman-Token": "8d7b0901-bf90-8b9a-bddc-874596ebc0e8"
    }
  }

  $.ajax(settings).done(function (response) {
    console.log(response);

    var dataObj = response.businesses
    var localList = dataObj;
    console.log(dataObj);

      for (var i = 0; i < dataObj.length; i++){
        var name = dataObj[i].name;
        var phone = dataObj[i].display_phone;
        var rating = dataObj[i].rating;
        var price = dataObj[i].price;
        var addresses = [];

        $('#results').append('<h5>' + name + '</h5>')

        for (var j = 0; j < dataObj[i].location.display_address.length; j++){
          $('#results').append(dataObj[i].location.display_address[j] + '<br>');
          addresses.push(dataObj[i].location.display_address[j]);
          console.log("address: "+addresses);
        }

        geoCoder(addresses,name,addresses)
        addresses = "";
        $('#results').append(phone + '<br>')
        $('#results').append('Rating: ' + rating + '<br>')
        $('#results').append('Price: ' + price + '<br>' + '<br>')
        // var link = dataObj[i].url;
        // $('#results').append('Website: '+ '<a href="' + link + '"Link </a> <br>');
      }
  })
}



$(document).ready (function() {
  database.ref().on("value", function(snapshot) {
    var address = snapshot.val().address

    // console.log(pos)

    currentMarker(address)
    map.setCenter(address);
    map.setZoom(12);
    infoWindow.setContent("Your Searched Location");
  })
});


var topDog =
    [{
      item: "Spicy Chicken Sausage",
      units: 5,
      price: "$1.75"
    },
    {
      item: "Mango Chicken Sausage",
      units: 3,
      price: "$1.50"
    },
    {
      item: "Kielbasa Sausage",
      units: 6,
      price: "$1.25"
    }]

var DojoDog = [
  {
    item: "Ninjutsu Dog",
    units: 2,
    price: "$1.30"
  },
  {
    item: "Kendo Dog",
    units: 5,
    price: "$1.80"
  },
  {
    item: "Sumo Dog",
    units: 3,
    price: "$2.00"
  },
  {
    item: "Wushu Dog",
    units: 2,
    price: "$1.65"
  }
];

function ObjectQuery(obj){
  var objHolder = $('<div id="restaurants">');
  for (var i = 0; i < obj.length; i++){
    $('.center').append('<p class="items">' + obj[i].units + " " + obj[i].item + ' at a price of ' + obj[i].price + '</p>');
  }
}

// ObjectQuery(topDog);

$('#picture1').on('click', function(){
  $('.center').empty();
   ObjectQuery(topDog);  
})
