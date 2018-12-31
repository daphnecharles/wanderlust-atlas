

$( document ).ready(function() {


//Get the URL from the current window and pull accessToken
var accessToken = window.location.href;
accessToken = accessToken.replace("https://advancedwebdesign-daphneacharles.c9users.io/WanderlustAtlas/#access_token=", "");



var clientID = '502c79169511424cb563cac12a8f9f3e';
    
var dataUrl = 'https://api.instagram.com/v1/users/self/media/recent?access_token=' + accessToken;

    //INSTAGRAM AJAX CALL
 $.ajax({
            url: dataUrl,
          type: 'GET',
            dataType: 'jsonp',
           // cache: false, 
            data: { //required parameters should go here
   count:12,
            },
            
            success: function(serverResponse) {
                try {

                    var data = serverResponse.data;
                    console.log(data);
                   var myHTML = '';
             
                    for(var i = 6; i< data.length; i++){
                 myHTML += '<li class="insta list-group-item">';
                 myHTML += '<span class="instaUser">' + data[i].user.username + '</span>' + '<br>';
                 myHTML += '<span class="instaBody">' + data[i].location.name + '</span>' + '<br>';
                 myHTML += '<span class="instaBody"><img id="instaPic" src="' + data[i].images.low_resolution.url + '"></span>';
                 myHTML += '<span class="instaBody badge glyphicon glyphicon-heart">' + data[i].likes.count + '</span>' + '<br>';
                 myHTML += '<span class="instaBody">' + data[i].caption.text + '</span>' + '<br>';
                  
                 myHTML += '</li>';
                
                }
                    $('#output2').append(myHTML);

                }
                catch (ex) {
                    console.error(ex);
                    $("#errors").text("An error occurred processing the data from Instagram");
                }
            },
            
            error: function(jqXHR, textStatus, errorThrown) {
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



           
    });
    

























