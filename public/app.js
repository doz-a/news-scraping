// Grab the articles as a json
$.getJSON("/articles", function (data) {
  for (var i = 0; i < data.length; i++) {
    $("#articles").append(
      `
    <h4>${data[i].title} </h4>
    ${data[i].summary}
    <br>
    <a href="${data[i].link}">Visit article</a> | 
    <a href="#" data-id='${data[i]._id}'>View notes</a> 
    <hr>
    `);
  }
});


// Whenever someone clicks notes tag
$(document).on("click", "a", function () {
  // Empty the notes from the note section
  $("#notes").empty();
  console.log("successful click");
  // Save the id from the a tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function (data) {
      console.log(data);

      // The title of the article
      $("#notes").append(`<br><br><h2> ${data.title} </h2><hr>`);
      // An input to enter a new title      

      if (data.note) {
        // Place the title of the note in the title input
        $("#notes").append(`
        
        <h5>${data.note.title}</h5>
        ${data.note.body}
        <br>
        <button data-id='${data.note}' id='deleteNote'>Delete Note</button>
        <hr>
        `);
      }
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append(`<button data-id='${data._id}' id='savenote'>Add Note</button>`);

    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
