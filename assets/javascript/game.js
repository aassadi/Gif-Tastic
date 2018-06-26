
$( document ).ready(function() {
var animals =["Cats","Dogs","Bird","Fish","Bear","Lion","Horse","Pig","Goose","wolf","Giraffe"
             ,"Tiger","Deer","Squirrel","Sheep","Duck","Raccoon","cheetah","Otter","Armadillo"];
//----------------------------------------------------
// Function that displays all gif buttons
function renderButtons(){
   $("#animal-view").empty(); // erasing anything in this div id so that it doesnt duplicate the results

    for( var i=0 ;i<animals.length;i++){

      var animalButton =$("<button>");
      animalButton.addClass("animal");
      animalButton.attr("data-animal",animals[i]);
      animalButton.text(animals[i]);
      $("#animal-view").append(animalButton);


    }
}
//----------------------------------------------------
// Function to add a new animal button
$("#add-animal").on("click",function(event){
    event.preventDefault();

    var newAnimal =$("#animal-input").val().trim();;
    if(newAnimal ===""){
        return false;
    }

    animals.push(newAnimal);
    
    renderButtons();
  
   
});
renderButtons()
$("animalButton").on("click",function(){

});
//--------------------------------------------------------
// Function that displays all of the gifs
$(document).on("click", "button",function(){
var animal = $(this).attr("data-animal");

var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response){
              console.log(response);
              $("#animal-div").empty();

              var results =response.data;

              for(var i=0; i< results.length; i++){

                  var animalDiv = $("<div class='animalDiv'>");
                  var p2 = $("<p class='title'>").text( results[i].title);
                  var p = $("<p class='title'>").text("Rating: " + results[i].rating);

                  var animalImage = $("<img>").attr("src",results[i].images.fixed_height_still.url);
                   // still image stored into src of image
                  animalImage.attr("data-still",results[i].images.fixed_height_still.url);
                  animalImage.attr("data-animate",results[i].images.fixed_height.url);
                  animalImage.attr("data-state","still");
                  animalImage.addClass("images")
                  

                  
                  animalDiv.append(p2);
                  animalDiv.append(p);
                  animalDiv.append(animalImage);
                  $("#animal-div").append(animalDiv);

              }

          });   
          

        });
        // Document Event Listeners for state and animate.
        $(document).on("click","img", function(){

            var state = $(this).attr("data-state");
            
            if(state==="still"){
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");

            }else{
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }

        });
    });
