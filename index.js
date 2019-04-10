$(document).ready(function() {
  $("#myForm").submit(function() {
    $( ".searchResultDiv" ).remove();

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
          bookDiv = $(
            `<div class="searchResultDiv" id="book-container${i}"></div>`
          );
          url = response.items[i].volumeInfo.imageLinks.thumbnail;
          img.attr("src", url); //attaches image url

          bookDiv.appendTo("#result");
          title.appendTo(`#book-container${i}`);
          author.appendTo(`#book-container${i}`);
          img.appendTo(`#book-container${i}`);
        }
      });
    }
  });
  return false;
});
