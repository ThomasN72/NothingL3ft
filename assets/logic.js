// nav bar
$(document ).ready(function(){
     $(".button-collapse").sideNav();
     $('.carousel').carousel();
     console.log("Hey!")
  });

function getBlogs(str,flag){
          if(str==""){
            if(flag == 0) //laptop size
            {
            document.getElementById("searchResults").innerHTML="";
          }
          else{ //for mobile and laptop
             document.getElementById("searchResults2").innerHTML="";
          }
              return;
          }
   var searchedResults,x,txt="";
          var xhttp=new XMLHttpRequest();
           xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        searchedResults=JSON.parse(this.responseText);
        for(x in searchedResults)
        {
//           get data from server and set it to txt
          txt="data"
        }
    if(flag == 0) //laptop size
            {
            document.getElementById("searchResults").innerHTML=txt;
          }
          else{ //for mobile and laptop
             document.getElementById("searchResults2").innerHTML=txt;
          }
    }
}
}
// 
