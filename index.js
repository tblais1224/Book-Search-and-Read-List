//script is called in the head so it is ready at all times
$(document).ready(function() {
  //this is a function to call on submitting the search field
  $("#myForm").submit(function() {
    //remove the .result div on submission if old search results exist

    $("#result").remove();

    var search = $("#booksText").val();

    if (search == "") {
      alert("Please enter something into the search bar!");
    } else {
      var url = "";
      var img = "";
      var title = "";
      var author = "";

      $.get("https://www.googleapis.com/books/v1/volumes?q=" + search, function(
        response
      ) {
        for (let i = 0; i < response.items.length; i++) {
          results = $('<div id="result"></div>');
          title = $(
            '<h5 class="center-align">' +
              response.items[i].volumeInfo.title +
              "</h5>"
          );
          author = $(
            '<h5 class="center-align">' +
              response.items[i].volumeInfo.authors +
              "</h5>"
          );
          img = $(
            '<img class="book-images"><br><a href=' +
              response.items[i].volumeInfo.infoLink +
              '><button id="imagebutton">Read More</button></a></img>'
          );
          url = response.items[i].volumeInfo.imageLinks.thumbnail;
          img.attr("src", url); //attaches image url

          addToRead = $(
            `<button class="addToReadButton${i}" type="button">Add to Read List</button>`
          );
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
