//script is called in the head so it is ready at all times
$(document).ready(function() {
  //this is a function to call on submitting the search field
  $("#myForm").submit(function() {
    //remove the .result div on submission if old search results exist
    $("#result").remove();
    //sets search to the input text within the search bar
    var search = $("#booksText").val();
    //if search bar is empty on submit and alert is thrown, else url, img, title, and author strings are defined
    if (search == "") {
      alert("Please enter something into the search bar!");
    } else {
      var url = "";
      var img = "";
      var title = "";
      var author = "";

      //this calls the google books api and concatenates the search bar input for the search term
      $.get("https://www.googleapis.com/books/v1/volumes?q=" + search, function(
        response
      ) {
        //this loops through the api response for every item (only getting 10 items which is the same as each google page. Look into changing items.length)
        for (let i = 0; i < response.items.length; i++) {
          //creates a container for the results
          results = $('<div id="result"></div>');
          //adds the item title from the api
          title = $(
            '<h5 class="center-align">' +
              response.items[i].volumeInfo.title +
              "</h5>"
          );
          //adds the item author from the api
          author = $(
            '<h5 class="center-align">' +
              response.items[i].volumeInfo.authors +
              "</h5>"
          );
          //adds an img tag and creates a button with an href link to the google books page for the item
          img = $(
            '<img class="book-images"><br><a href=' +
              response.items[i].volumeInfo.infoLink +
              '><button id="imagebutton">Read More</button></a></img>'
          );
          //this grabs the item image url and attaches it to the img tag
          url = response.items[i].volumeInfo.imageLinks.thumbnail;
          img.attr("src", url); //attaches image url

          //this creates a button to add the item to the reading list
          addToRead = $(
            `<button class="addToReadButton${i}" type="button">Add to Read List</button>`
          );
          //this creates the div container for each itemand inserts a script tag that moves the div to the reading list when the addToRead button is pressed
          //the addToRead button is then removed and the search results are cleared
          //a remove item button is also added
          bookDiv = $(
            `<div class="searchResultDiv" id="book-container${i}">
            <script type="text/javascript">
            $(document).ready(function () {
                function notify() {        
                    $("#book-container${i}").appendTo(".wantToReadContainer");
                    $('<button class="removeButton" id="removeButton${i}" type="button">Remove From List</button>').appendTo("#book-container${i}");
                    $("#result").remove();
                    $(".addToReadButton${i}").remove();
                }
                $(".addToReadButton${i}").on("click", notify);
            });
        </script>
        </div>`
          );
          //the following adds the above items into the header of the html file to build the search results
          results.appendTo("header");
          bookDiv.appendTo("#result");
          title.appendTo(`#book-container${i}`);
          author.appendTo(`#book-container${i}`);
          img.appendTo(`#book-container${i}`);
          addToRead.appendTo(`#book-container${i}`);
        }
      });
    }
  });
});
//this adds functionality to the remove button within the read list items
$(document).on("click", ".removeButton", function() {
  $(this)
    .parent()
    .remove();
});
