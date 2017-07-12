document.addEventListener("DOMContentLoaded", function() {

  // Imagination!
var getResults = document.querySelector("button.results");

getResults.addEventListener('click', function(){

  $.ajax({

url: 'https://bb-election-api.herokuapp.com/',
method: 'GET',
dataType: 'JSON'

}).done(function(responsedata){console.log(responsedata.candidates)
  for (var i = 0; i < responsedata.candidates.length; i++){
    var listItem = document.createElement("li");
    listItem.innerHTML = "Candidate: " + responsedata.candidates[i].name + ' Votes: '+ responsedata.candidates[i].votes + 'Votes';
    electionresults.append(listItem);
  }
});


});

// DOM listener END
})
