$(document).ready(function(){

//HIDE THE ERROR AND SUCCESS ALERTS
  document.getElementById('errors').style.display='none';
  document.getElementById('success').style.display='none';
  
  $('#my-form').submit(function(event){
      event.preventDefault();
      
      //EMPTY OUTPUT AREAS
      $('#success').empty();
        $('#error').empty();
      
      
      //VARIABLE DECLARATIONS
          var first = $('#first').val();
          var lastName = $('#last-name').val();
          var email = $('#email').val();
          
          
         //REGULAR EXPRESSIONS 
          var namePattern = /[A-Z ](\'[A-Z]{1})*[a-z]{1,20}/;
          var emailPattern = /^([A-Za-z0-9\_\-\.]{1,20})@([A-Za-z0-9\-]{1,20}\.)([a-zA-Z]{2,4})$/;
          
         
          var error = '';
          var success = '';
          
          
          //FORMAT CHECKING
          if (namePattern.test(first) == false){
              error ="Format of first name is incorrect, please try again.\n";
             
          }
          
          
          if (namePattern.test(lastName) == false){
              error += "Format of last name is incorrect, please try again.\n";
          }
          
          if (emailPattern.test(email) == false){
              error += "Format of email is incorrect, please try again.\n";
          }

          
        
          //SHOW THE ERROR ALERT
          if (error.length > 0) {
            // When there are any validation errors, show an error message
            document.getElementById('errors').style.display='block';
            $("#errors").text(error);
            return;
            
            
        }
        
        //SHOW THE SUCCESS ALERT
        if (error.length === 0) {
            // When there are no errors, show a success message
            document.getElementById('success').style.display='block';
            success = "Your message has been received, thank you.\n";
            $("#success").text(success);
           return;
            
            
        }
        
        //HIDE BOTH ALERTS
        document.getElementById('errors').style.display='none';
        document.getElementById('success').style.display='none';

  });
    
    
});