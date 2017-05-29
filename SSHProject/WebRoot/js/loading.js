function showMask(msg) {
        var $loadMask=$('#issLoadMask');
        if($loadMask.length==0){
            $loadMask=$('<div id="issLoadMask" class="modal fade" data-backdrop="static">' +
                            '<div class="modal-dialog modal-sm">' +
                                '<div class="modal-content">数据加载中……</div>' +
                        '</div></div>').appendTo($('body'));
        }
        if(msg){
            $loadMask.find('.modal-content').html(msg);
        }
        $loadMask.modal('show');
    };

  
function hideMask() {
        $('#issLoadMask').modal('hide');
    };
    
$(function(){
	$('body').click(function(){
		try{//点击iframe时也关闭主页面二级菜单
			window.top.hideMenu();
		}catch(e){}
	});
});  