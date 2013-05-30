chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method == "getSecret")
      sendResponse({secret: localStorage['secret'], debug: ( localStorage['debug'] === "true")});
    else
      sendResponse({}); 
});