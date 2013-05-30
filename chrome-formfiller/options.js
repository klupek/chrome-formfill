function save_options() {
  localStorage["secret"] = document.getElementById("secret").value;
  localStorage["debug"] = document.getElementById("debug").checked;

  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}

function restore_options() {
  var secret = localStorage["secret"];
  if (!secret) {
    return;
  }
  document.getElementById("secret").value = secret;
  document.getElementById("debug").checked = (localStorage["debug"] === "true");
  console.log(localStorage);
}

function makesecret()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 32; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

	document.getElementById("secret").value = text;
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
document.querySelector('#generate').addEventListener('click', makesecret);