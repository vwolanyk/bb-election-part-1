document.addEventListener("DOMContentLoaded", function(){

// Create Initial Buttons
  var getResults = document.querySelector("button.candidates");
  var updateResults = document.querySelector("button.update");

// Event Listener for first Buttons

getResults.addEventListener('click', function(){

// Hide Get
  getResults.style.display = "none";

  $.ajax({

  url: 'https://bb-election-api.herokuapp.com/',
  method: 'GET',
  dataType: 'JSON'

}).done(function(responsedata){
  for (var i = 0; i < responsedata.candidates.length; i++){

    var listItem = document.createElement("li");
    var form = document.createElement("form");
    var voteButton = document.createElement("input");
    voteButton.type = "submit";
    voteButton.value = "VOTE FOR " + responsedata.candidates[i].name;
    var voteHidden = document.createElement("input");
    voteHidden.type = "hidden";
    voteHidden.name = "id";
    voteHidden.value = responsedata.candidates[i].id;
    var votes = document.createElement('span');
    votes.innerHTML = responsedata.candidates[i].votes;
    votes.className = "votes";
    form.method = "POST";
    form.action = "https://bb-election-api.herokuapp.com/vote";
    form.append(voteHidden, voteButton)
    listItem.innerText = "Candidate: " + responsedata.candidates[i].name + ' Votes: ';
    listItem.append(votes);
    listItem.append(form);
    electionresults.append(listItem);
  }
    // Add event listeners to each form
    var forms = document.querySelectorAll('form')

    for (var index = 0; index < forms.length; index++){
      forms[index].addEventListener('submit', function(event){
        event.preventDefault();
        var data = {};
        data[$(this).children('input[type=hidden]').attr('name')]= $(this).children('input[type=hidden]').val();

        $.ajax({
          url: form.action,
          method: form.method,
          data: data
        }).done(function(){

          $.ajax({

          url: 'https://bb-election-api.herokuapp.com/',
          method: 'GET',
          dataType: 'JSON'

        }).done(function(responsedata){

          for (var i = 0; i < $(".votes").length; i++){
            $(".votes")[i].innerHTML = responsedata.candidates[i].votes
          }
        })


        })

      })

  }

// done method for results button listener
})



  //Resulsts Button Listener
});



})
