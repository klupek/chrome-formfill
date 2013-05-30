chrome-formfill
===============

Google Chrome extension for automagic form filling.

Usage
-----

Install extension. Setup shared key in extension options.  
Then, create URL: http://example.com/form#$request.$signature  
where $request is base64 encoded JSON:  
```{
	"form name or form number" => {
		"field 1 name" => "field 1 value",
		"field 2 name" => "field 2 value"
	}, "other form name or number" => {
		...
	}
}```
and $signature is hexdigest HMAC-SHA1 of http://example.com/form#$request, example generating code in :
```require 'digest'

def signature(messsage, secret)
	Digest::HMAC.hexdigest(message, secret, Digest::SHA1)
end```

Example usage
-------------

Remote form code:  
```<form name="foo">
	<input type="text" name="bar" />
	<textarea name="baz"></textarea>
	...
</form>```

Request:  
```{
	"foo" => {
		"bar" => "value for bar text field",
		"baz" => "value for baz textarea"
	}
}```

Bugs/ToDo
---------

Checkboxes and everything else, that does not simply use formelement.value in DOM is not supported.


Security
--------

Form can be filled only when signature matches. Signature check debugging (console logs) can be enabled in extension options.


Used libraries
--------------

jQuery-2.0.1   
crypto-js - https://code.google.com/p/crypto-js/

