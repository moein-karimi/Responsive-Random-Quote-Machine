let quotesData;
 
/*
  Code by Gabriel Nunes
  Modified by Todd Chaffee to use Camper gist for JSON Quote data.
   The first code was far more difficult, I (moein) delete inIframe which isn’t necessary and trying to modified the code as simple as possible.
*/



var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857", "#f50ad2", "#03c4fc"];
var currentQuote = '', currentAuthor = '';


function getQuotes() {
  return $.ajax({
    accepts: {
        text: "application/json"
    },
    url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
    success: function(jsonQuotes) {
      if (typeof jsonQuotes === 'string') {
        //console.log(jsonQuotes);
        quotesData = JSON.parse(jsonQuotes);
        //console.log('quotesData');
        //console.log(quotesData);
      }
    },
    error: function() {
 alert('OOPS :(');
 }
  });
}

function getRandomQuote() {
  return quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
}

function getQuote() {

  let randomQuote = getRandomQuote();
  
  currentQuote = randomQuote.quote;
  currentAuthor = randomQuote.author;

  
    $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes,moein&related=moein137&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)+ ' @moein137');
  
  
  $(".quote-text").animate(
    { opacity: 0 },
    500,
    function() {
      $(this).animate({ opacity: 1}, 500);
     document.getElementById('text').textContent = currentQuote;;
    }
  );

  $(".quote-author").animate(
    { opacity: 0 },
    500,
    function() {
      $(this).animate({ opacity: 1}, 500);
      $('#author').html(currentAuthor);
    }
  );

  var color = Math.floor(Math.random() * colors.length);
  $("html body").animate(
    {
      backgroundColor: colors[color],
      color: colors[color]
    },
    1000
  );
  $(".button").animate(
    {
      backgroundColor: colors[color]
    },
    1000
  );
}

$(document).ready(function() {
  getQuotes().then(() => {
    getQuote();
  });

  $('#new-quote').on('click', getQuote);

});
