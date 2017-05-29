function init() {
	var ms = $("#rootClassifierids").val();
	var mnus = eval(ms); 
	var menuHtml = createMenu(mnus);
    //console.log(menuHtml);
    $("#sidebar-collapse").append(menuHtml);
    iFrameHeight();
    $(window).resize(function(){iFrameHeight()});
}


function iFrameHeight() {
	var ifm = document.getElementById("iframepage");
	ifm.height =  $(window).height()-55;
}

function createMenu(json) {
    var createChildren = function (menu) {
        var childHtml = [];
        childHtml.push('<li class="parent">' +
                '<a href="#'+ menu.code + '"  data-toggle="collapse" data-parent="#myTree">' +
                '<span class="glyphicon glyphicon-list"></span>' + menu.name +'</a>')
               /* ' <span class="icon pull-right"><em class="glyphicon glyphicon-s glyphicon-plus"></em></span></a>')*/
        childHtml.push('<ul class="children collapse" id="' + menu.code + '">');
        for (var i = 0; i < menu.children.length; i++) {
            var subMenu = menu.children[i];
            if (subMenu.children && subMenu.children.length > 0) { //含子菜单
                childHtml.push(createChildren(subMenu));
            } else {//一级菜单
                childHtml.push('<li><a href="' + subMenu.url + '" target="iframepage"><span class="glyphicon glyphicon-th"></span> ' + subMenu.name + '</a></li>')
            }
        }
        childHtml.push('</ul></li>')
        return childHtml.join('\n');
    };
    var html = [];
    html.push('<ul class="nav menu" id="myTree">');
    for (var i = 0; i < json.length; i++) {
        var menu = json[i];
        if (menu.children && menu.children.length > 0) { //含子菜单
            html.push(createChildren(menu));
        } else {//一级菜单
            html.push('<li><a href="' + menu.url + '"  target="iframepage"><span class="glyphicon glyphicon-th"></span> ' + menu.name + '</a></li>')
        }
    }
    html.push('</ul>');
    return html.join('\n');
}

function showDiv(){
	$("#addDiv").modal("show");
}
function hideDiv(){
	$("#addDiv").modal("hide");
}
function saveUser(){
	var oldPwd=$("#oldPwd").val().trim();
	var pwd=$("#pwd").val().trim();
	var rePwd=$("#rePwd").val().trim();
	if(oldPwd=="" ){
		alert("旧密码不能为空!");
		return;
	} 
	if(pwd=="" ) {
		alert("密码不能为空!");
		return;
	}
	if(rePwd=="" ) {
		alert("确认密码不能为空!");
		return;
	}
	if(pwd!=rePwd){
		alert("两次输入的密码不一样!");
		return;
	}
	var requestUrl="page/privilege/privilege.do?method=resetPwdForIndex";
	var dataStr="pwd="+pwd+"&oldPwd="+oldPwd+"&opt=resetPwdSelf";
	$.ajax({type:'POST',url:requestUrl,async:false,dataType:'text',data:dataStr,cache:false,success:function(text){
		var obj = eval("obj=" + text);
		if(!obj.result){
			alert(obj.info);
		}else {
			alert("密码重设成功！");
			hideDiv();
		}
	}});
}

function resetUser(){
	$("#oldPwd").val("");
	$("#pwd").val("");
	$("#rePwd").val("");
}

function reLoadMenery(){
	var requestUrl="page/privilege/privilege.do?method=reLoadMemery";
	$.ajax({type:'POST',url:requestUrl,async:false,dataType:'text',data:'',cache:false,success:function(text){
		if(text!="fail" && text!=null){
			alert("装载缓存成功");
		}else{
			alert("装载缓存失败");
		}
    }
	});
}