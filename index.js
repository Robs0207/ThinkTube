"use strict";

$(function() {

// handle search event
    $('#search-term').submit(function(event) {
        event.preventDefault();

        var searchTerm = $('#query').val();
        
        getRequest(searchTerm);
        $('#query').val("");
        $('#query').focus();

    });
});

function getRequest(searchTerm) {

// create query object containing required parameters and their arguments
    var query = {
        part: 'snippet',
        key: 'AIzaSyD7onfBYdJYZ4zjudJv0JV_771m7pPVC78',
        q: searchTerm,
        maxResults: 10
    };

// set url of API end-point
    var YouTube_API_EndPoint_URL = 'https://www.googleapis.com/youtube/v3/search';

// call API with arguments
    $.getJSON(YouTube_API_EndPoint_URL, query, function(data) {

        displayResponse(data.items);

    });
}

function displayResponse(response) {

// initialize dynamic HTML element
    var htmlElement = '';

// lopp over API response and populate HTML elements with thumbnail image link, description and video channel  
    $.each(response, function(index, value) {
        htmlElement += '<div class="videoInfo">';
        htmlElement += '<a href="https://www.youtube.com/watch?v=' + value.id.videoId + '" target="newtab"><img src="' + value.snippet.thumbnails.default.url + '"></a>';
        htmlElement += '<p><a href="https://www.youtube.com/watch?v=' + value.id.videoId + '" target="newtab">' + value.snippet.title + '</a></p>';
        htmlElement += '<p>' + value.snippet.description + '</p>';
        htmlElement += '<p>Channel: ' + value.snippet.channelTitle + '</p>';
        htmlElement += '</div>';
    });

// render response to page
    $('.js-search-results').html(htmlElement);
    $('.js-search-results').fadeIn(1500);

}
