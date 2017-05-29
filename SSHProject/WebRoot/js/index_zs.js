function init() {
	var ms = $("#rootClassifierids").val();
	var mnus = eval(ms); 
	var menuHtml = createMenu(mnus);
    //console.log(menuHtml);
    $(".menuList_header").html(menuHtml);
    iFrameHeight();
    $(window).resize(function(){iFrameHeight()});
}


function iFrameHeight() {
	var ifm = document.getElementById("iframepage");
	ifm.height =  $(window).height()-115;
}

function createMenu(json) {
	var createSubChilden = function(menu){
		var childHtml = [];
		childHtml.push('<li class="dropdown-submenu">');
		childHtml.push('<a href="javascript:;">'+menu.name+'</a>');
		childHtml.push('<ul class="dropdown-menu">');
		for (var i = 0; i < menu.children.length; i++) {
			var subMenu = menu.children[i];
            if (subMenu.children && subMenu.children.length > 0) { //含子菜单
                childHtml.push(createSubChilden(subMenu));
            } else {//一级菜单
                childHtml.push('<li><a href="' + subMenu.url + '" target="iframepage">' + subMenu.name + '</a></li>');
            }
		}
		childHtml.push('</ul>')
        return childHtml.join('\n');
	}
    var createChildren = function (menu) {
        var childHtml = [];
        childHtml.push('<div class="dropdown menu-dropdown">');
		childHtml.push('<a role="button" data-toggle="dropdown" class="" data-target="#" href="javascript:;">'+ menu.name + '<span class="caret"></span></a>');
		childHtml.push('<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu">');
        
        for (var i = 0; i < menu.children.length; i++) {
            var subMenu = menu.children[i];
            if (subMenu.children && subMenu.children.length > 0) { //含子菜单
                childHtml.push(createSubChilden(subMenu));
            } else {//一级菜单
                childHtml.push('<li><a href="' + subMenu.url + '" target="iframepage">' + subMenu.name + '</a></li>');
            }
        }
        childHtml.push('</ul>')
        childHtml.push('</div>');
        return childHtml.join('\n');
    };
    
    var html = [];
    for (var i = 0; i < json.length; i++) {
        var menu = json[i];
        if (menu.children && menu.children.length > 0) { //含子菜单
            html.push(createChildren(menu));
        } else {//一级菜单
        	childHtml.push('<div class="dropdown menu-dropdown">');
            html.push('<a href="' + menu.url + '"  target="iframepage">' + menu.name + '</a>');
            childHtml.push('</div>');
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