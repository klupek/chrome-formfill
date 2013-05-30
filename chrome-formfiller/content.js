var auth_debugging = false;


function fillForms(request) {
	var data = request;
	var json = window.atob(data);
	var obj = JSON.parse(json);
	for(var formId in obj) {
		var form = document.forms[formId];
		if(form !== undefined) {
			for(var fieldId in obj[formId]) {
				var field = form[fieldId];
				if(field !== undefined) {
					field.value = obj[formId][fieldId];
				}
			}
		}
	}
};

function authenticate(secret) {
	if(secret == undefined || secret == "") {
		if(auth_debugging) {
			console.log("AUTH failed, set secret, please");
		}
		return; 
	}
	
	var hash = window.location.hash;
	var components = hash.substring(1).split(".");
	if(components.length == 2) {
		var request = components[0];
		var signature = components[1];
		var ls = window.location.toString();
		var auth_base = ls.substring(0, ls.length - signature.length - 1);
		var verification = CryptoJS.HmacSHA1(auth_base, secret).toString();
		if(verification === signature) {
			fillForms(request);
		} else if(auth_debugging) {
			console.log("AUTH failed, expected " + verification + ", got " + signature);
			console.log("BASE = " + auth_base);
		}
	}
}

jQuery(document).ready(function() {
	chrome.extension.sendRequest({method: "getSecret"}, function(response) {
		auth_debugging = response.debug;
		authenticate(response.secret);
	});
});