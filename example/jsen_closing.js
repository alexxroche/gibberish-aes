var decryptElementId;function decryptText(c,a,b){decryptElementId=c;if(a==null)a="Enter the decryption key:";b!=null&&b?decrypt(b):vcPrompt(a,decrypt)}; function decrypt(b){if(b!=""&&b!=null){if(decryptElementId.constructor!=Array)decryptElementId=[decryptElementId];for(var f=false,d=0;d<decryptElementId.length;d++){var a=document.getElementById(decryptElementId[d]),c=a.title,g=false;if(!c||c.match(/^enc/i)){c=a.value;g=true}try{var e=GibberishAES.dec(c,b);f=true;if(g)a.value=e;a.innerHTML=e;a.title=a.title.match(/^enc/i)?"plain":"";a.readOnly=false;try{var h=document.getElementsByTagName("form");for(a=0;a<h.length;a++)if(h[a].name)try{document.forms[a].Show.disabled= true;document.forms[a].Save.disabled=false;document.forms[a].key.value=b}catch(j){}}catch(i){alert("ERR: "+i)}}catch(k){alert("plain=("+e+") for cypher "+c+" and key:"+b)}}f||alert("Invalid decryption key","test")}}var overlayElt=null,winElt=null,passElt=null,promptElt=null; function vcPrompt(a){if(overlayElt==null||winElt==null||passElt==null||promptElt==null)vcCreateDialog(a);promptElt.innerHTML=a!=null?a:"Enter password:";pageSize=getPageSize();winElt.style.marginTop=Math.round(pageSize[3]*0.3)+"px";winElt.style.marginLeft=Math.round((pageSize[2]-400)/2)+"px";if(isIE6=/msie|MSIE 6/.test(navigator.userAgent)){pageScroll=getPageScroll();overlayElt.style.position="absolute";overlayElt.style.width=pageSize[0]+"px";overlayElt.style.height=pageSize[1]+"px";winElt.style.position= "absolute";winElt.style.top=pageScroll[1]+"px";winElt.style.left=pageScroll[0]+"px"}passElt.value="";overlayElt.style.display="block";winElt.style.display="block";passElt.focus();passElt.select()}; function vcCreateDialog(){overlayElt=document.createElement("div");overlayElt.setAttribute("id","vcOverlay");var a=overlayElt.style;a.backgroundColor="black";a.MozOpacity=0.1;a.opacity=0.1;a.filter="alpha(opacity=10)";a.position="fixed";a.top=0;a.left=0;a.width="100%";a.height="100%";a.zIndex=254;a.textAlign="left";a.margin=0;a.padding=0;var b=document.getElementsByTagName("body").item(0);b.insertBefore(overlayElt,b.firstChild);winElt=document.createElement("div");winElt.setAttribute("id","vcWin"); a=winElt.style;a.position="fixed";a.top=0;a.left=0;a.width="400px";a.zIndex=255;a.border="1px solid black";a.backgroundColor="#fbfcfd";a.textAlign="left";a.margin=0;a.padding=0;b.insertBefore(winElt,b.firstChild);b=document.createElement("div");b.setAttribute("id","vcInWin");a=b.style;a.border="5px solid #808080";a.padding="15px";a.margin=0;winElt.appendChild(b);promptElt=document.createElement("p");promptElt.setAttribute("id","vcPrompt");a=promptElt.style;a.padding=0;a.margin=0;a.fontFamily="Arial, sans-serif"; a.fontSize="14px";a.textAlign="left";a.color="black";b.appendChild(promptElt);passElt=document.createElement("input");passElt.setAttribute("id","vcPass");passElt.type="text";passElt.onkeydown=function(c){if(c==null)c=window.event;if(c.keyCode==10||c.keyCode==13)vcClick(1);c.keyCode==27&&vcClick(0)};a=passElt.style;a.position="relative";a.width="345px";a.padding="5px";a.margin="5px 0 10px 0";a.fontFamily="monospace";a.fontSize="14px";a.textAlign="left";a.color="black";a.border="2px solid #808080"; a.backgroundColor="white";b.appendChild(passElt);a=document.createElement("div");a.style.textAlign="right";a.style.fontFamily="Arial, sans-serif";a.style.fontSize="14px";b.appendChild(a);b=document.createElement("input");b.type="button";b.value="OK";b.onclick=function(){vcClick(1)};b.style.margin="0 0 0 0.5em";b.style.padding="5px";b.style.color="black";a.appendChild(b);b=document.createElement("input");b.type="button";b.value="Cancel";b.onclick=function(){vcClick(0)};b.style.margin="0 0 0 0.5em"; b.style.padding="5px";b.style.color="black";a.appendChild(b)}function vcClick(a){overlayElt.style.display="none";winElt.style.display="none";a&&decrypt(passElt.value)} function getPageScroll(){var a;if(self.pageYOffset)a=self.pageYOffset;else if(document.documentElement&&document.documentElement.scrollTop)a=document.documentElement.scrollTop;else if(document.body)a=document.body.scrollTop;var b;if(self.pageXOffset)b=self.pageXOffset;else if(document.documentElement&&document.documentElement.scrollLeft)b=document.documentElement.scrollLeft;else if(document.body)b=document.body.scrollLeft;return arrayPageScroll=new Array(b,a)}; function getPageSize(){var c,d;if(window.innerHeight&&window.scrollMaxY){c=document.body.scrollWidth;d=window.innerHeight+window.scrollMaxY}else if(document.body.scrollHeight>document.body.offsetHeight){c=document.body.scrollWidth;d=document.body.scrollHeight}else{c=document.body.offsetWidth;d=document.body.offsetHeight}var a,b;if(self.innerHeight){a=self.innerWidth;b=self.innerHeight}else if(document.documentElement&&document.documentElement.clientHeight){a=document.documentElement.clientWidth;b= document.documentElement.clientHeight}else if(document.body){a=document.body.clientWidth;b=document.body.clientHeight}pageHeight=d<b?b:d;pageWidth=c<a?a:c;return arrayPageSize=new Array(pageWidth,pageHeight,a,b)};

var GibberishAES={
	Nr:14,Nb:4,Nk:8,Decrypt:false,
	
	enc_utf8:function(s){
	   try{
		return unescape(encodeURIComponent(s))
	   }catch(e){throw "Error on UTF-8 encode"}
	},

	dec_utf8:function(s){
	   try{
		return decodeURIComponent(escape(s))
	   }catch(e){throw ("Bad Key")}
	},

	padBlock:function(a){
		var b=[];
		if(a.length<16){var c=16-a.length;
		var b=[c,c,c,c,c,c,c,c,c,c,c,c,c,c,c,c]}
		for(var i=0;i<a.length;i++){b[i]=a[i]}
		return b
	},

	block2s:function(a,b){
		if(a==undefined){throw ("Decryption error: Maybe bad cipher")}
		var c="";
		if(b){
			var d=a[15];
			if(d>16){throw ("Decryption error: Maybe bad key")}
			if(d==16){return ""}
			for(var i=0;i<16-d;i++){c+=String.fromCharCode(a[i])}
		}else{
			for(i=0;i<16;i++){c+=String.fromCharCode(a[i])}
		}
		return c
	},

	a2h:function(a){
		var b="";
		for(var i=0;i<a.length;i++){b+=(a[i]<16?"0":"")+a[i].toString(16)}
		return b
	},

	h2a:function(s){
		var a=[];
		s.replace(/(..)/g,function(b){a.push(parseInt(b,16))});
		return a
	},

	s2a:function(a){
		a=this.enc_utf8(a);
		var b=[];
		for(var i=0;i<a.length;i++){b[i]=a.charCodeAt(i)}
		return b
	},

	size:function(a){
		switch(a){
			case 128:this.Nr=10;
			this.Nk=4;
			break;
			case 192:this.Nr=12;
			this.Nk=6;
			break;
			case 256:this.Nr=14;
			this.Nk=8;
			break;
			default:throw ("Invalid Key Size Specified:"+a)
		}
	},

	randArr:function(a){
		var b=[];
		for(var i=0;i<a;i++){b=b.concat(Math.floor(Math.random()*256))}
		return b
	},

	openSSLKey:function(a,b){
		var c=this.Nr>=12?3:2;
		var d=[];
		var e=[];
		var f=[];
		var g=[];
		data00=a.concat(b);
		f[0]=GibberishAES.Hash.MD5(data00);
		g=f[0];
		for(var i=1;i<c;i++){
			f[i]=GibberishAES.Hash.MD5(f[i-1].concat(data00));
			g=g.concat(f[i])
		}
		d=g.slice(0,4*this.Nk);
		e=g.slice(4*this.Nk,4*this.Nk+16);
		return {key:d,iv:e}
	},

	rawEncrypt:function(a,b,c){
		b=this.expandKey(b);
		var d=Math.ceil(a.length/16);
		var e=[];
		for(var i=0;i<d;i++){e[i]=this.padBlock(a.slice(i*16,i*16+16))}
		if(a.length%16===0){
			e.push([16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16]);
			d++}
		var f=[];
		for(var i=0;i<e.length;i++){
			e[i]=(i===0)?this.xorBlocks(e[i],c):this.xorBlocks(e[i],f[i-1]);
			f[i]=this.encryptBlock(e[i],b)
		}
		return f
	},

	rawDecrypt:function(a,b,c){
		b=this.expandKey(b);
		var d=a.length/16;
		var e=[];
		for(var i=0;i<d;i++){e.push(a.slice(i*16,(i+1)*16))}
		var f=[];
		for(var i=e.length-1;i>=0;i--){
			f[i]=this.decryptBlock(e[i],b);
			f[i]=(i===0)?this.xorBlocks(f[i],c):this.xorBlocks(f[i],e[i-1])
		}
		var g="";
		for(var i=0;i<d-1;i++){g+=this.block2s(f[i])}
		g+=this.block2s(f[i],true);
		return this.dec_utf8(g)},

	encryptBlock:function(a,b){
		this.Decrypt=false;
		var c=this.addRoundKey(a,b,0);
		for(var d=1;d<(this.Nr+1);d++){
			c=this.subBytes(c);
			c=this.shiftRows(c);
			if(d<this.Nr){c=this.mixColumns(c)}
			c=this.addRoundKey(c,b,d)
		}
		return c
	},

	decryptBlock:function(a,b){
		this.Decrypt=true;
		var c=this.addRoundKey(a,b,this.Nr);
		for(var d=this.Nr-1;d>-1;d--){
			c=this.shiftRows(c);
			c=this.subBytes(c);
			c=this.addRoundKey(c,b,d);
			if(d>0){c=this.mixColumns(c)}
		}
		return c
	},

	subBytes:function(a){
		var S=this.Decrypt?this.SBoxInv:this.SBox;
		var b=[];
		for(var i=0;i<16;i++){b[i]=S[a[i]]}
		return b
	},

	shiftRows:function(a){
		var b=[];
		var c=this.Decrypt?[0,13,10,7,4,1,14,11,8,5,2,15,12,9,6,3]:[0,5,10,15,4,9,14,3,8,13,2,7,12,1,6,11];
		for(var i=0;i<16;i++){b[i]=a[c[i]]}
		return b
	},

	mixColumns:function(a){
		var t=[];
		if(!this.Decrypt){
			for(var c=0;c<4;c++){
				t[c*4]=this.G2X[a[c*4]]^this.G3X[a[1+c*4]]^a[2+c*4]^a[3+c*4];
				t[1+c*4]=a[c*4]^this.G2X[a[1+c*4]]^this.G3X[a[2+c*4]]^a[3+c*4];
				t[2+c*4]=a[c*4]^a[1+c*4]^this.G2X[a[2+c*4]]^this.G3X[a[3+c*4]];
				t[3+c*4]=this.G3X[a[c*4]]^a[1+c*4]^a[2+c*4]^this.G2X[a[3+c*4]]
			}
		}else{
			for(var c=0;c<4;c++){
				t[c*4]=this.GEX[a[c*4]]^this.GBX[a[1+c*4]]^this.GDX[a[2+c*4]]^this.G9X[a[3+c*4]];
				t[1+c*4]=this.G9X[a[c*4]]^this.GEX[a[1+c*4]]^this.GBX[a[2+c*4]]^this.GDX[a[3+c*4]];
				t[2+c*4]=this.GDX[a[c*4]]^this.G9X[a[1+c*4]]^this.GEX[a[2+c*4]]^this.GBX[a[3+c*4]];
				t[3+c*4]=this.GBX[a[c*4]]^this.GDX[a[1+c*4]]^this.G9X[a[2+c*4]]^this.GEX[a[3+c*4]]
			}
		}
		return t
	},

	addRoundKey:function(a,b,c){
		var d=[];
		for(var i=0;i<16;i++){d[i]=a[i]^b[c][i]}
		return d
	},
	
	xorBlocks:function(a,b){var c=[]; for(var i=0; i<16; i++){c[i]=a[i]^b[i]}return c},

	expandKey:function(a){
		var b=this.Nb;
		var c=this.Nr;
		var d=this.Nk;
		var w=[];
		var e=[];
		for(var i=0;i<d;i++){
			var r=[a[4*i],a[4*i+1],a[4*i+2],a[4*i+3]];
			w[i]=r
		}
		for(var i=d;i<(4*(c+1));i++){
			w[i]=[];
			for(var t=0;t<4;t++){e[t]=w[i-1][t]}
			if(i%d===0){
				e=this.subWord(this.rotWord(e));
				e[0]^=this.Rcon[i/d-1]
			}else{
				if(d>6&&i%d==4){e=this.subWord(e)}
			}
			for(var t=0;t<4;t++){w[i][t]=w[i-d][t]^e[t]}
		}
		var f=[];
		for(var i=0;i<(c+1);i++){
			f[i]=[];
			for(var j=0;j<4;j++){f[i].push(w[i*4+j][0],w[i*4+j][1],w[i*4+j][2],w[i*4+j][3])}
		}
		return f
	},

	subWord:function(w){
		for(var i=0;i<4;i++){w[i]=this.SBox[w[i]]}return w},

	rotWord:function(w){
		var a=w[0];
		for(var i=0;i<4;i++){w[i]=w[i+1]}
		w[3]=a;
		return w
	},

	SBox:[99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22],

	SBoxInv:[82,9,106,213,48,54,165,56,191,64,163,158,129,243,215,251,124,227,57,130,155,47,255,135,52,142,67,68,196,222,233,203,84,123,148,50,166,194,35,61,238,76,149,11,66,250,195,78,8,46,161,102,40,217,36,178,118,91,162,73,109,139,209,37,114,248,246,100,134,104,152,22,212,164,92,204,93,101,182,146,108,112,72,80,253,237,185,218,94,21,70,87,167,141,157,132,144,216,171,0,140,188,211,10,247,228,88,5,184,179,69,6,208,44,30,143,202,63,15,2,193,175,189,3,1,19,138,107,58,145,17,65,79,103,220,234,151,242,207,206,240,180,230,115,150,172,116,34,231,173,53,133,226,249,55,232,28,117,223,110,71,241,26,113,29,41,197,137,111,183,98,14,170,24,190,27,252,86,62,75,198,210,121,32,154,219,192,254,120,205,90,244,31,221,168,51,136,7,199,49,177,18,16,89,39,128,236,95,96,81,127,169,25,181,74,13,45,229,122,159,147,201,156,239,160,224,59,77,174,42,245,176,200,235,187,60,131,83,153,97,23,43,4,126,186,119,214,38,225,105,20,99,85,33,12,125],
	Rcon:[1,2,4,8,16,32,64,128,27,54,108,216,171,77,154,47,94,188,99,198,151,53,106,212,179,125,250,239,197,145],
	G2X:[0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,108,110,112,114,116,118,120,122,124,126,128,130,132,134,136,138,140,142,144,146,148,150,152,154,156,158,160,162,164,166,168,170,172,174,176,178,180,182,184,186,188,190,192,194,196,198,200,202,204,206,208,210,212,214,216,218,220,222,224,226,228,230,232,234,236,238,240,242,244,246,248,250,252,254,27,25,31,29,19,17,23,21,11,9,15,13,3,1,7,5,59,57,63,61,51,49,55,53,43,41,47,45,35,33,39,37,91,89,95,93,83,81,87,85,75,73,79,77,67,65,71,69,123,121,127,125,115,113,119,117,107,105,111,109,99,97,103,101,155,153,159,157,147,145,151,149,139,137,143,141,131,129,135,133,187,185,191,189,179,177,183,181,171,169,175,173,163,161,167,165,219,217,223,221,211,209,215,213,203,201,207,205,195,193,199,197,251,249,255,253,243,241,247,245,235,233,239,237,227,225,231,229],
	G3X:[0,3,6,5,12,15,10,9,24,27,30,29,20,23,18,17,48,51,54,53,60,63,58,57,40,43,46,45,36,39,34,33,96,99,102,101,108,111,106,105,120,123,126,125,116,119,114,113,80,83,86,85,92,95,90,89,72,75,78,77,68,71,66,65,192,195,198,197,204,207,202,201,216,219,222,221,212,215,210,209,240,243,246,245,252,255,250,249,232,235,238,237,228,231,226,225,160,163,166,165,172,175,170,169,184,187,190,189,180,183,178,177,144,147,150,149,156,159,154,153,136,139,142,141,132,135,130,129,155,152,157,158,151,148,145,146,131,128,133,134,143,140,137,138,171,168,173,174,167,164,161,162,179,176,181,182,191,188,185,186,251,248,253,254,247,244,241,242,227,224,229,230,239,236,233,234,203,200,205,206,199,196,193,194,211,208,213,214,223,220,217,218,91,88,93,94,87,84,81,82,67,64,69,70,79,76,73,74,107,104,109,110,103,100,97,98,115,112,117,118,127,124,121,122,59,56,61,62,55,52,49,50,35,32,37,38,47,44,41,42,11,8,13,14,7,4,1,2,19,16,21,22,31,28,25,26],
	G9X:[0,9,18,27,36,45,54,63,72,65,90,83,108,101,126,119,144,153,130,139,180,189,166,175,216,209,202,195,252,245,238,231,59,50,41,32,31,22,13,4,115,122,97,104,87,94,69,76,171,162,185,176,143,134,157,148,227,234,241,248,199,206,213,220,118,127,100,109,82,91,64,73,62,55,44,37,26,19,8,1,230,239,244,253,194,203,208,217,174,167,188,181,138,131,152,145,77,68,95,86,105,96,123,114,5,12,23,30,33,40,51,58,221,212,207,198,249,240,235,226,149,156,135,142,177,184,163,170,236,229,254,247,200,193,218,211,164,173,182,191,128,137,146,155,124,117,110,103,88,81,74,67,52,61,38,47,16,25,2,11,215,222,197,204,243,250,225,232,159,150,141,132,187,178,169,160,71,78,85,92,99,106,113,120,15,6,29,20,43,34,57,48,154,147,136,129,190,183,172,165,210,219,192,201,246,255,228,237,10,3,24,17,46,39,60,53,66,75,80,89,102,111,116,125,161,168,179,186,133,140,151,158,233,224,251,242,205,196,223,214,49,56,35,42,21,28,7,14,121,112,107,98,93,84,79,70],
	GBX:[0,11,22,29,44,39,58,49,88,83,78,69,116,127,98,105,176,187,166,173,156,151,138,129,232,227,254,245,196,207,210,217,123,112,109,102,87,92,65,74,35,40,53,62,15,4,25,18,203,192,221,214,231,236,241,250,147,152,133,142,191,180,169,162,246,253,224,235,218,209,204,199,174,165,184,179,130,137,148,159,70,77,80,91,106,97,124,119,30,21,8,3,50,57,36,47,141,134,155,144,161,170,183,188,213,222,195,200,249,242,239,228,61,54,43,32,17,26,7,12,101,110,115,120,73,66,95,84,247,252,225,234,219,208,205,198,175,164,185,178,131,136,149,158,71,76,81,90,107,96,125,118,31,20,9,2,51,56,37,46,140,135,154,145,160,171,182,189,212,223,194,201,248,243,238,229,60,55,42,33,16,27,6,13,100,111,114,121,72,67,94,85,1,10,23,28,45,38,59,48,89,82,79,68,117,126,99,104,177,186,167,172,157,150,139,128,233,226,255,244,197,206,211,216,122,113,108,103,86,93,64,75,34,41,52,63,14,5,24,19,202,193,220,215,230,237,240,251,146,153,132,143,190,181,168,163],
	GDX:[0,13,26,23,52,57,46,35,104,101,114,127,92,81,70,75,208,221,202,199,228,233,254,243,184,181,162,175,140,129,150,155,187,182,161,172,143,130,149,152,211,222,201,196,231,234,253,240,107,102,113,124,95,82,69,72,3,14,25,20,55,58,45,32,109,96,119,122,89,84,67,78,5,8,31,18,49,60,43,38,189,176,167,170,137,132,147,158,213,216,207,194,225,236,251,246,214,219,204,193,226,239,248,245,190,179,164,169,138,135,144,157,6,11,28,17,50,63,40,37,110,99,116,121,90,87,64,77,218,215,192,205,238,227,244,249,178,191,168,165,134,139,156,145,10,7,16,29,62,51,36,41,98,111,120,117,86,91,76,65,97,108,123,118,85,88,79,66,9,4,19,30,61,48,39,42,177,188,171,166,133,136,159,146,217,212,195,206,237,224,247,250,183,186,173,160,131,142,153,148,223,210,197,200,235,230,241,252,103,106,125,112,83,94,73,68,15,2,21,24,59,54,33,44,12,1,22,27,56,53,34,47,100,105,126,115,80,93,74,71,220,209,198,203,232,229,242,255,180,185,174,163,128,141,154,151],
	GEX:[0,14,28,18,56,54,36,42,112,126,108,98,72,70,84,90,224,238,252,242,216,214,196,202,144,158,140,130,168,166,180,186,219,213,199,201,227,237,255,241,171,165,183,185,147,157,143,129,59,53,39,41,3,13,31,17,75,69,87,89,115,125,111,97,173,163,177,191,149,155,137,135,221,211,193,207,229,235,249,247,77,67,81,95,117,123,105,103,61,51,33,47,5,11,25,23,118,120,106,100,78,64,82,92,6,8,26,20,62,48,34,44,150,152,138,132,174,160,178,188,230,232,250,244,222,208,194,204,65,79,93,83,121,119,101,107,49,63,45,35,9,7,21,27,161,175,189,179,153,151,133,139,209,223,205,195,233,231,245,251,154,148,134,136,162,172,190,176,234,228,246,248,210,220,206,192,122,116,102,104,66,76,94,80,10,4,22,24,50,60,46,32,236,226,240,254,212,218,200,198,156,146,128,142,164,170,184,182,12,2,16,30,52,58,40,38,124,114,96,110,68,74,88,86,55,57,43,37,15,1,19,29,71,73,91,85,127,113,99,109,215,217,203,197,239,225,243,253,167,169,187,181,159,145,131,141],

	enc:function(a,b){
		var c=this.randArr(8);
		var d=this.openSSLKey(this.s2a(b),c);
		var e=d.key;
		var f=d.iv;
		a=this.s2a(a);
		var g=this.rawEncrypt(a,e,f);
		var h=[[83,97,108,116,101,100,95,95].concat(c)];
		g=h.concat(g);
		return this.Base64.encode(g)
	},

	dec:function(a,b){
		var c=this.Base64.decode(a);
		var d=c.slice(8,16);
		var e=this.openSSLKey(this.s2a(b),d);
		var f=e.key;
		var g=e.iv;
		var c=c.slice(16,c.length);
		a=this.rawDecrypt(c,f,g);
		return a
	}
};

GibberishAES.Hash={MD5:function(e){function k(g,h){var j,l,i,m,r;i=g&2147483648;m=h&2147483648;j=g&1073741824;l=h&1073741824;r=(g&1073741823)+(h&1073741823);if(j&l)return r^2147483648^i^m;return j|l?r&1073741824?r^3221225472^i^m:r^1073741824^i^m:r^i^m}function n(g,h,j,l,i,m,r){g=k(g,k(k(h&j|~h&l,i),r));return k(g<<m|g>>>32-m,h)}function o(g,h,j,l,i,m,r){g=k(g,k(k(h&l|j&~l,i),r));return k(g<<m|g>>>32-m,h)}function p(g,h,j,l,i,m,r){g=k(g,k(k(h^j^l,i),r));return k(g<<m|g>>>32-m,h)}function q(g,h,j,l, i,m,r){g=k(g,k(k(j^(h|~l),i),r));return k(g<<m|g>>>32-m,h)}function s(g){var h,j=[];for(h=0;h<=3;h++)j=j.concat(g>>>h*8&255);return j}var f=Array(),t,u,v,w,a,b,c,d;f=function(g){var h=g.length,j=h+8;j=((j-j%64)/64+1)*16;for(var l=Array(j-1),i=0;i<h;){l[(i-i%4)/4]|=g[i]<<i%4*8;i++}l[(i-i%4)/4]|=128<<i%4*8;l[j-2]=h<<3;l[j-1]=h>>>29;return l}(e);a=1732584193;b=4023233417;c=2562383102;for(e=0;e<f.length;e+=16){t=a;u=b;v=c;w=d;a=n(a,b,c,d,f[e+0],7,3614090360);d=n(d,a,b,c,f[e+1],12,3905402710);c=n(c,d, a,b,f[e+2],17,606105819);b=n(b,c,d,a,f[e+3],22,3250441966);a=n(a,b,c,d,f[e+4],7,4118548399);d=n(d,a,b,c,f[e+5],12,1200080426);c=n(c,d,a,b,f[e+6],17,2821735955);b=n(b,c,d,a,f[e+7],22,4249261313);a=n(a,b,c,d,f[e+8],7,1770035416);d=n(d,a,b,c,f[e+9],12,2336552879);c=n(c,d,a,b,f[e+10],17,4294925233);b=n(b,c,d,a,f[e+11],22,2304563134);a=n(a,b,c,d,f[e+12],7,1804603682);d=n(d,a,b,c,f[e+13],12,4254626195);c=n(c,d,a,b,f[e+14],17,2792965006);b=n(b,c,d,a,f[e+15],22,1236535329);a=o(a,b,c,d,f[e+1],5,4129170786); d=o(d,a,b,c,f[e+6],9,3225465664);c=o(c,d,a,b,f[e+11],14,643717713);b=o(b,c,d,a,f[e+0],20,3921069994);a=o(a,b,c,d,f[e+5],5,3593408605);d=o(d,a,b,c,f[e+10],9,38016083);c=o(c,d,a,b,f[e+15],14,3634488961);b=o(b,c,d,a,f[e+4],20,3889429448);a=o(a,b,c,d,f[e+9],5,568446438);d=o(d,a,b,c,f[e+14],9,3275163606);c=o(c,d,a,b,f[e+3],14,4107603335);b=o(b,c,d,a,f[e+8],20,1163531501);a=o(a,b,c,d,f[e+13],5,2850285829);d=o(d,a,b,c,f[e+2],9,4243563512);c=o(c,d,a,b,f[e+7],14,1735328473);b=o(b,c,d,a,f[e+12],20,2368359562); a=p(a,b,c,d,f[e+5],4,4294588738);d=p(d,a,b,c,f[e+8],11,2272392833);c=p(c,d,a,b,f[e+11],16,1839030562);b=p(b,c,d,a,f[e+14],23,4259657740);a=p(a,b,c,d,f[e+1],4,2763975236);d=p(d,a,b,c,f[e+4],11,1272893353);c=p(c,d,a,b,f[e+7],16,4139469664);b=p(b,c,d,a,f[e+10],23,3200236656);a=p(a,b,c,d,f[e+13],4,681279174);d=p(d,a,b,c,f[e+0],11,3936430074);c=p(c,d,a,b,f[e+3],16,3572445317);b=p(b,c,d,a,f[e+6],23,76029189);a=p(a,b,c,d,f[e+9],4,3654602809);d=p(d,a,b,c,f[e+12],11,3873151461);c=p(c,d,a,b,f[e+15],16,530742520); b=p(b,c,d,a,f[e+2],23,3299628645);a=q(a,b,c,d,f[e+0],6,4096336452);d=q(d,a,b,c,f[e+7],10,1126891415);c=q(c,d,a,b,f[e+14],15,2878612391);b=q(b,c,d,a,f[e+5],21,4237533241);a=q(a,b,c,d,f[e+12],6,1700485571);d=q(d,a,b,c,f[e+3],10,2399980690);c=q(c,d,a,b,f[e+10],15,4293915773);b=q(b,c,d,a,f[e+1],21,2240044497);a=q(a,b,c,d,f[e+8],6,1873313359);d=q(d,a,b,c,f[e+15],10,4264355552);c=q(c,d,a,b,f[e+6],15,2734768916);b=q(b,c,d,a,f[e+13],21,1309151649);a=q(a,b,c,d,f[e+4],6,4149444226);d=q(d,a,b,c,f[e+11],10,3174756917); c=q(c,d,a,b,f[e+2],15,718787259);b=q(b,c,d,a,f[e+9],21,3951481745);a=k(a,t);b=k(b,u);c=k(c,v);d=k(d,w)}return s(a).concat(s(b),s(c),s(d))}};
GibberishAES.Base64={chars:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","+","/"],encode:function(d){var c=[],b="";totalChunks=Math.floor(d.length*16/3);for(var a=0;a<d.length*16;a++)c.push(d[Math.floor(a/16)][a%16]);for(a=0;a<c.length;a+=3){b+=this.chars[c[a]>>2];b+=this.chars[(c[a]&3)<<4|c[a+1]>> 4];b+=c[a+1]!=null?this.chars[(c[a+1]&15)<<2|c[a+2]>>6]:"=";b+=c[a+2]!=null?this.chars[c[a+2]&63]:"="}d=b.slice(0,64)+"\n";for(a=1;a<Math.ceil(b.length/64);a++)d+=b.slice(a*64,a*64+64)+(Math.ceil(b.length/64)==a+1?"":"\n");return d},decode:function(d){d=d.replace(/\s/g,"");for(var c=[],b=[],a=[],e=0;e<d.length;e+=4){b[0]=this.chars.indexOf(d.charAt(e));b[1]=this.chars.indexOf(d.charAt(e+1));b[2]=this.chars.indexOf(d.charAt(e+2));b[3]=this.chars.indexOf(d.charAt(e+3));a[0]=b[0]<<2|b[1]>>4;a[1]=(b[1]& 15)<<4|b[2]>>2;a[2]=(b[2]&3)<<6|b[3];c.push(a[0],a[1],a[2])}return c=c.slice(0,c.length-c.length%16)}};
if(!Array.indexOf){ Array.prototype.indexOf=function(a,b){ for(var i=(b||0);i<this.length;i++){if(this[i]==a){return i}} } };
