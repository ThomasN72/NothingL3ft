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

//Function for finding user location
function mylocation(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      console.log(pos)
      database.ref('address/').set(pos);
      window.location.replace('results.html')
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

var placeSearch, autocomplete, geocoder;

function initAutocomplete() {
  geocoder = new google.maps.Geocoder();
  autocomplete = new google.maps.places.Autocomplete(
      (document.getElementById('search'))/*,
      {types: ['(cities)']}*/);

  autocomplete.addListener('place_changed', fillInAddress);
}

function codeAddress(address) {
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
        alert(results[0].geometry.location);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

function fillInAddress() {
  var place = autocomplete.getPlace();
}


$('#searchBtn').on("click", function(event){
  event.preventDefault();
  var locationAddress = $('#search').val();
  console.log(locationAddress);
  geoCoder(locationAddress)
  $('#search').val("");
})


$('#currentlocation').click(function(){
  mylocation();
});


function geoCoder(location){
  var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+ location + "&key=AIzaSyBpHkoMadHxCiRan1yfwVQ85q2ZxLiLOGI"

  $.ajax({
   url: queryURL,
   method: "GET"
   }).done(function(response) {
    console.log(response);
    var results = response.data;
    var pos = response.results["0"].geometry.location;
    console.log("pos :" + pos)
    database.ref('address/').set(pos);
  }).then(function(){
    window.location.replace('results.html')
  })
}

//this function prevent form submission with <enter>
$(document).on("keypress", "form", function(event) { 
    return event.keyCode != 13;
});
