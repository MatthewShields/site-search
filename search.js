var tab;
var urlArray;
var tabURL;
var activeURL;

$(document).ready(function() {

    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function(array_of_Tabs) {
        tab = array_of_Tabs[0];
        tabURL = tab.url;

        activeURL = extractDomain(tabURL);
        $('input').attr('placeholder', 'Search ' + activeURL);
    });


    $('form').submit(function(event) {
        event.preventDefault();

        var searchTerm = encodeURI($('input').val());

        openTab('https://www.google.co.uk/search?q=site%3A'+activeURL+'%20'+searchTerm);

    });

    

    $('.search-clear').click(function () {

        var searchTerm = encodeURI($('input').val());

        openTab('https://www.google.co.uk/search?q=site%3A'+activeURL+'%20'+searchTerm);

        chrome.tabs.create({url: 'http://google.com'});
    });

});


function extractDomain(target) {
    var domain;
    if (target.indexOf("://") > -1) {
        domain = target.split('/')[2];
    }
    else {
        domain = target.split('/')[0];
    }

    domain = domain.split(':')[0];

    return domain;
}


function openTab(target) {
    chrome.tabs.create({url: target});
}