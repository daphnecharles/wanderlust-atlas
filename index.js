
    $(document).ready(function () {

//HIDE THE ERRORS ALERT
 document.getElementById('errors').style.display='none';
 
 
  //GOOGLE MAPS  

//Resize the map div so it fits inside Bootstrap container
$(window).resize(function () {
    var h = $(window).height(),
        offsetTop = 60; // Calculate the top offset
    $('#map').css('height', (h - offsetTop));
}).resize();


//Create new google map within div with id map
   var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: {lat: 0, lng: 0},
    styles: [{
      featureType: 'poi',
      stylers: [{ visibility: 'off' }]  // Turn off points of interest.
    }, {
      featureType: 'transit.station',
      stylers: [{ visibility: 'off' }]  // Turn off bus stations, train stations, etc.
    }],
    disableDoubleClickZoom: true
  });
  
  
  //Initializing variables
var marker;
var geocode;
var infowindow;

  
  //Create a new marker and pan the map to its location
function placeMarkerAndPanTo(latLng, map) {
  marker = new google.maps.Marker({
    position: latLng,
    map: map,
    
  }); 
  
  map.panTo(latLng);
  //Converts Google Maps latLng object to string in format required for Twitter geocode parameter
  geocode = latLng.toString().replace(" ", "");
  geocode = geocode.toString().replace(")", "");
  geocode = geocode.toString().replace("(", "");
  geocode = geocode + ",10mi";
   var message = "The geocode has been set to the following coordinates: " + geocode;

//Create a new infowindow and open when marker is clicked
var infowindow = new google.maps.InfoWindow({
    content: message
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

}


  //Add a listener for when the user clicks on the map which calls the function to place and pan to marker
   map.addListener('click', function(e) {
    placeMarkerAndPanTo(e.latLng, map);
    
    
  });
  


    
    // Disallow hiding the AJAX loading modal that pops up when searching
    var allowAjaxHide = false;
    var hideFunction = function(event) {
        if (!allowAjaxHide) {
            event.preventDefault(); 
        }
        allowAjaxHide = false;
    };
    
    $('#ajaxIndicator').on('hide.bs.modal', hideFunction);
    
    

    // FORM FUNCTION
    $('#getposts_form').submit(function(event) {
        event.preventDefault();

        // clear out our output areas
        $('#output').empty();
        $('#errors').empty();

//VARIABLE DECLARATION
        var q = $("#search").val();
        var lang = $("#lang").val();
        var result_type = $("#result_type").val();

        // FORM VALIDATION
        var errorMessages = '';
        var emptyStringPattern = /^\s*$/;

        if (emptyStringPattern.test(q)) {
            errorMessages += 'You must enter a search term.';
        }

        if (errorMessages.length > 0) {
            // When there are any validation errors, quit before the ajax call is made and show an error message.
            document.getElementById('errors').style.display='block';
            $("#errors").text(errorMessages);
            return;
            
            
        }
        
        document.getElementById('errors').style.display='none';
        
       
       

        // TWITTER AJAX CALL
        $.ajax({
            url: '/api/index.php/TwitterAppOnly/search/tweets.json',
            
          type: 'GET',
            dataType: 'JSON',
            data: { 
            q: q,
            count: 15, 
            result_type: result_type,
            lang: lang,
            geocode: geocode,
         
            },
            
            success: function(serverResponse) {
                try {
                    console.log(serverResponse);
                    var statuses = serverResponse.statuses;
                    console.log(statuses);
                    var myHTML = '';
                    //Loop to pull media from statuses object and append it to output div
                   
                    for(var i = 0; i<statuses.length; i++){
                     
                  myHTML += '<li class="tweet list-group-item">';
                  myHTML += '<span class="img fixPadding"><img id="tweetImage" src="' + statuses[i].user.profile_image_url_https + '"></span>';
                  myHTML += '<span class="user twitter" id="tweetUser">' + statuses[i].user.screen_name + '</span>' + '<br>';
                  myHTML += '<span class="body twitter" id="tweetText">' + statuses[i].text + '</span>' + '<br>';
                  myHTML += '<span class="body twitter" id="tweetTimestamp">' + statuses[i].created_at + '</span>';
                  myHTML += '<span class="body badge glyphicon glyphicon-retweet">' + statuses[i].retweet_count + '</span>';
                    myHTML += '<span class="body badge glyphicon glyphicon-heart">' + statuses[i].favorite_count + '</span>';
                    myHTML += '<span class="body badge glyphicon glyphicon-map-marker">' + statuses[i].user.location + '</span>';
                  myHTML += '</li>';
                
                
                    }
                    $('#output').append(myHTML);
                }
                catch (ex) {
                    console.error(ex);
                    $("#errors").text("An error occurred processing the data from Twitter");
                }
            },
        
            error: function(jqXHR, textStatus, errorThrown) {
                // Since our script runs on Cloud9, let's make
                // a friendlier error message for ourselves
                if (errorThrown == 'Service Unavailable') {
                    $("#errors").text("Your cloud 9 instance isn't running!");
                }
                else {
                    $("#errors").text('An unknown error occurred: ' + errorThrown);
                }
            },
            
            
            
            complete: function() {
               
                allowAjaxHide = true;
                $("#ajaxIndicator").modal('hide');
            }
            
            
        });



       
        $("#ajaxIndicator").modal('show');
           
    });
    
});