<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>导入表格</title>
<style>
/* option{
color: red;
} */
</style>
</head>
<body style="height: 100%; padding-top: 0px">
  <%--  <%  
        String incode = (String)request.getParameter("verCode");   
        String rightcode = (String)session.getAttribute("rCode");   
          
        if(incode != null && rightcode != null){  
            if(incode.equals(rightcode)){  
                out.println("验证码输入正确！");  
            }else{  
                out.println("验证码输入不正确，请重新输入！");  
            }  
        }  
      %> 
      
	<div class="box">
	     <div class="head"></div>
	     <div class="content">
	         <input id="userName" type="text" value="用戶名"/><br>
	         <input id="password" type="text" value="密碼"/><br>
	         <input id="verCode" type="text" name="verCode" placeholder="验证码"/> 
             <img id="imgObj"  alt="" src="login!verCode" onclick="changeImg()"/> <br/>    
             <input type="button" value="登陸" onclick="check_validate()"/>
             
             <div id="info"></div>  
	         
	     </div>
	     <div class="foot">
	        <input type="button" value="测试json" onclick="jsonTest()"/>
	        <input type="text" id="rootJson" value='${menuStr}'/>
	        <input type="hidden" id="rootClassifierids" value='${menuStr}' />
	     </div>
 
 <input type="button" value="测试鼠标双击" ondblclick="test()"/>
 

<select name=""  >
<option value = "0" id="hhh">2048x1536</option>
                            <option value = "1">2048x1152</option>
                            <option value = "2">1600x1200</option>
</select>

	</div> --%>
	<div class="box">
	    <div class="top"></div>
	    <div class="content">
	        <input id="userName" type="text" value="用戶名"/><br>
	        <input id="password" type="text" value="密碼"/><br>
	        <input type="button" value="登陸" onclick="login()"/>

	    </div>
 	    <div class="foot"></div>
	</div>

	<!-- <script src="js/bootstrap.min.js"></script>
	<script src="js/loading.js"></script> -->
	<script src="js/jquery-1.11.1.min.js"></script>
	<script src="js/ajaxupload.js"></script>
<!-- 	<script src="js/login.js"></script> -->
	<script>
	   function login(){
		   var userName=document.getElementById("userName").value;
		   var password=document.getElementById("password").value;
		   alert("userName:"+userName+"-->password:"+password);
		   
		   var url="login!checkLogin.action";
		   var data="userName="+userName+"&password="+password;
		   alert("fff");
		   $.ajax({
				type:'POST',url:url,async:false,dataType:'text',data:data,cache:false,
				success:function(text){
					if(text=="true") {
					
						alert("注册成功！");
						return false;
					}
			    }
		   });
		   
		   
	   }
	   function findInfo(){
		   var incode = document.getElementById("verCode").value.toUpperCase();
			var requestUrl="login!login2.action";
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
	   }
	</script>
</body>
</html>
