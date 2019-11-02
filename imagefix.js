var _gaq = _gaq || [];
_gaq.push(['_setAccount', '']);
_gaq.push(['_trackPageview']);

(function () {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();

var userAgents = [
    'Mozilla/5.0 (Linux; Android 10; SM-G970F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3396.81 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 7.0; Redmi Note 4 Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.111 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 6.0.1; SM-J500M Build/MMB29M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 5.1; A1601 Build/LMY47I) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.98 Mobile Safari/537.36'
];

function getRandomUserAgent() {
    const log = chrome.extension.getBackgroundPage().console.log;
    var randomNumber = Math.floor(Math.random() * userAgents.length);
    log(randomNumber);
    return userAgents[randomNumber];
}

chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {
    var headers = details.requestHeaders;
    const log = chrome.extension.getBackgroundPage().console.log;

    if (details.url.match(/photobucket/)) {
        var newHeaders = {};
        var randomUserAgent = getRandomUserAgent();

        refererUrl = details.url;
        if (details.url.match(/albums\/[^\/]+\/([^\/]+)\//)) {
            for (var i = 0, l = headers.length; i < l; ++i) {
                if (headers[i].name.toLowerCase() === "user-agent") {
                    headers[i].value = randomUserAgent;
                }
            }
            log('URL:' + details.url + ' Changing User-Agent to: ' + randomUserAgent)
        }
    }
    return { 'requestHeaders': headers };
}, { urls: ["<all_urls>"] }, ['requestHeaders', 'blocking']);


