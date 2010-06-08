var encoded = null;
var elementId = null;

function randomPassword(length) {
	var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
	var pass = "";
	for(var i = 0; i < length; i++) {
		var index = Math.floor(Math.random() * 62);
		pass += chars.charAt(index);
	}
	return pass;
};

function encryptFormText(a) {
   if(!a){
	if (document.form.key.value.length == 0) {
		alert("Please specify a key with which to encrypt the message.");
		return;
	}
	if(document.form.passwd.value.length == 0) {
		alert("No plain text to encrypt!  Please enter or paste plain text in the " + a + " field above.");
		return;
	}
   }
   if (document.form.key.value.length != 0 && document.form.passwd.value.length != 0){
	//alert("you have a key of (" + document.form.key.value + ") and a password of (" + document.form.passwd.value +")");
		encoded = GibberishAES.enc(document.form.passwd.value, document.form.key.value);
	        document.form.passwd.value = encoded;
		try{
		   var forms = document.getElementsByTagName("form")
		   for(var k=0;k<forms.length;k++){
			var thisForm = forms[k]
			var formName = thisForm.name
			if(formName){try{
				document.forms[k].Show.disabled=false;
				if(a){ document.forms[k].Save.disabled=true;} //don't block save if we used the Encrypt button
				document.forms[k].key.value=''; //give people looking over our shoulder less time
			}catch(e){}}
		   }
		}catch(e){ alert("ERR: "+e);}

        	// generate a random ID
        	elementId = randomPassword(8);
        	encoded = encoded.replace(/\n/g, '');
   }else{
	//alert("key = "+ document.form.key.value);
	alert(document.form.passwd.type + " saved");
   }
};

function genSampleCode() {
	document.encryptedCode.text.value = "";
	var element = document.getElementById("encryptedTest");
	element.innerHTML = "";

	if (encoded == "" || encoded == null || elementId == "" || elementId == null)
		return;
	
	// standard sample code
	if (document.encryptedCode.codeType[0].checked) {
		var code1 = "<div id=\"" + elementId + "\" title=\"" + encoded + "\">";
		var code2 = "<a href=\"javascript:decryptText('" + elementId + "')\">Show encrypted text</a>";
		var code3 = "</div>";
		
		document.encryptedCode.text.value = code1 + "\n\t" + code2 + "\n" + code3;
		element.innerHTML = code1 + code2 + code3;
	
	// inline
	} else if (document.encryptedCode.codeType[1].checked) {
		var code1 = "<a href=\"javascript:decryptText('" + elementId + "')\">Show encrypted text</a>";
		var code2 = "<br />\n<br />";
		var code3 = "There is <em><span id=\"" + elementId + "\" title=\"" + encoded + "\">hidden text</span></em> here";
		document.encryptedCode.text.value = code1 + "\n" + code2 + "\n" + code3;
		element.innerHTML = code1+code2+code3;

	// ***
	} else if (document.encryptedCode.codeType[2].checked) {
		var code1 = "This is encrypted: <span id=\"" + elementId + "\" title=\"" + encoded + "\"><a href=\"javascript:decryptText('" + elementId + "')\">***</a></span>";
		document.encryptedCode.text.value = code1;
		element.innerHTML = code1;
	// form input text
	} else if (document.encryptedCode.codeType[3].checked) {
		var code1 = "<form> <input type=\"text\" id=\"" + elementId + "\" name=\"" + formName + "\" value=\"" + encoded + "\" /> </form>";
		document.encryptedCode.text.value = code1 + "\n\t";
		element.innerHTML = code1;
	}
}

function decryptFormText() {
	if (document.form.key.value.length == 0) {
		alert("Please specify a key with which to decrypt the message.");
		return;
	}

	if(document.form.passwd.value.length == 0) {
		alert("No cipher text to decrypt!  Please enter or paste cipher text in the field above.");
		return;
	}
	
	try {
		var dec = GibberishAES.dec(document.form.passwd.value, document.form.key.value);
		document.form.passwd.text.value = dec;
	} catch (err) {
		if(document.form.passwd.value.match(/.+=$/)){
			alert("Invalid key");
		}else{
			alert("Can't decrypt " + document.form.passwd.text.value + " with that key");
		}
	}
};

function gup(name) {
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec(window.location.href);
	if (results == null)
		return "";
	else
		return results[1];
};

function load() {
	document.form.Show.disabled=true;
	//if(document.key.text.value){document.key.text.value = "";}
	//document.plain.text.value = decodeURIComponent(gup("text"));
	//document.cipher.text.value = decodeURIComponent(gup("cipher"));
	//document.encryptedCode.text.value = "";
	//document.key.text.focus();
}

function clearForm() {
	document.form.key.value = ''
	document.form.passwd.value=''
	document.form.Show.disabled=true;
	document.form.Save.disabled=false;
}
