$(document).ready(function() {
    var quote;
    var author;

    function getNewQuote() {
 //--------------------AJAX call to the forismatic.com API ----------------//
        $.ajax({
            url: 'https://api.forismatic.com/api/1.0/',
            jsonp: 'jsonp',
            dataType: 'jsonp',

            data: {
                method: 'getQuote',
                lang: 'en',
                format: 'jsonp'
            },
            success: function(response) {
                quote = response.quoteText;
                author = response.quoteAuthor;
                $('#quote').text(quote);
                // If there is an author then share author's name
                if (author) {
                    $('#author').text('- ' + author);
                    // Else if there isn't an author then place "- unknown"
                } else {
                    $('#author').text('- unknown');
                }
            }
        });
    }
    getNewQuote();
//------------ When you click "Get Quote" button it generates a new quote -------//
    $('.get-quote').on('click', function(event) {
        event.preventDefault();
        getNewQuote();
    });

//---------- This allows you to share the quote on twitter if you are logged in -----// 
    $('.share-quote').on('click', function(event) {
        event.preventDefault();
        window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(quote + '-' + author))
    });
});
