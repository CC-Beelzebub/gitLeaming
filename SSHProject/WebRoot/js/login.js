function isSpace(str) {
		var len = str.length;
		for(var i=0; i< len; i++) {
			temp = str.substring(i,i+1);
			if (temp != " ") {
				return false;
			}
		}
		return true;
	}
	
	function  check_validate(theForm) {
		
        var incodes = document.getElementById("verCode");     
		if (isSpace(incodes.value)) {
			alert("验证码不能为空！");
			incodes.focus();
			return false;
		}
		
	
		var incode = document.getElementById("verCode").value.toUpperCase();
		var requestUrl="login!isVerCode.action";
		var dataStr="incode="+incode;
		var flag=0;
		$.ajax({
			type:'POST',url:requestUrl,async:false,dataType:'text',data:dataStr,cache:false,
			success:function(text){
				if(text!="true") {
					flag=1;
					alert("验证码错误！");
					return false;
				}
		    }
		});
		if(flag==1){
			incodes.focus();
			return false;
		}
		return true;
	}
	function Focus(){ 
		document.getElementById("userName").focus(); 
		scroll(0,0); 
	}
	function focusPwd(){ 
		document.getElementById("password").focus(); 
		scroll(0,0); 
	}
	function focusCode(){ 
		document.getElementById("verCode").focus(); 
		scroll(0,0); 
	}
	function changeImg(){     
		var imgSrc = $("#imgObj");     
		var src = imgSrc.attr("src");  
		var timestamp = (new Date()).valueOf();
		$("#imgObj").attr('src',"login!verCode.action?operate="+timestamp);
	} 
	//时间戳     
	//为了使每次生成图片不一致，即不让浏览器读缓存，所以需要加上时间戳     
	function chgUrl(url){     
	    var timestamp = (new Date()).valueOf();     
	    urlurl = url.substring(0,17);     
	    if((url.indexOf("&")>=0)){     
	        urlurl = url + "×tamp=" + timestamp;     
	    }else{     
	        urlurl = url + "?timestamp=" + timestamp;     
	    }     
	    return url;     
	}
	
	function jsonTest(){
		
		var requestUrl="login!jsonTest.action";
		$.ajax({
			type:'POST',
			url:requestUrl,
			async:false,
		    dataType:'text',
		    cache:false,
		    success:function(data){
		    	if(data!=null){
		    		alert("成功");
		    	}
		    }
		});
		
		var ms = $("#rootJson").val();
		var mnus = eval(ms); 
		for (var i = 0; i < mnus.length; i++) {
	        var menu = mnus[i];
	        alert(menu);
	    }
	}
