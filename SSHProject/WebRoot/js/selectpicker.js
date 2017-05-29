/**
 * Created by WangJinglin on 2015/7/15.
 */
;(function($){
    'use strict';

    /**
     * 自定义jquery选择器（名称keywordFilter）
     * @param obj 当前Dom Element
     * @param index 当前序号
     * @param meta 参数
     * @returns {boolean} return true表示包含当前element，false表示不包含
     */
    $.expr[':'].keywordFilter = function(obj, index, meta) {
        return $(obj).text().toUpperCase().indexOf(meta[3].toUpperCase()) >= 0; //忽略大小写进行匹配
    };

    /**
     * 扩展Array数组contains方法，数组是否包含指定item
     * @param item
     * @returns {boolean}
     */
    Array.prototype.contains = function(item){
        return RegExp(item).test(this);
    };

    var Selectpicker = function(element, options, e) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        this.$element=$(element); //原始select
        this.$newElement=null;     //selectpicker生成的下拉框element
        this.$button=null;         //下拉框按钮
        this.$menu=null;           //下拉框菜单
        this.$lis=null;            //下拉框选项
        this.$searchbox=null;       //下拉框搜索框

        //合并默认参数、data属性参数、js传入的参数
        this.options= $.extend({},$.fn.selectpicker.defaults, this.$element.data(), typeof options == 'object' && options);

        if (this.options.title === null) {
            this.options.title = this.$element.attr('title');
        }

        //需要暴露到外层的公用API
        this.val = Selectpicker.prototype.val;
        this.show = Selectpicker.prototype.show;
        this.hide = Selectpicker.prototype.hide;
        this.showMenu = Selectpicker.prototype.showMenu;
        this.hideMenu = Selectpicker.prototype.hideMenu;
        this.refresh = Selectpicker.prototype.refresh;
        this.setDisabled = Selectpicker.prototype.setDisabled;
        this.render = Selectpicker.prototype.render;

        //初始化
        this.init();
    };


    Selectpicker.prototype={
        constructor:Selectpicker,
        /**
         * 初始化下拉组件
         */
        init:function(){
            var that=this,
                id=this.$element.attr('id');
            this.$element.hide();
            this.multiple = this.$element.prop('multiple');
            this.$newElement=this.createView();
            this.$element.after(this.$newElement);
            this.$menu=this.$newElement.find('> .iss-select-drop');
            this.$button=this.$newElement.find('> .iss-select');
            this.$searchbox = this.$newElement.find('.iss-select-search > input');
            this.$display=this.$button.find('span.display');
            this.$lis=this.$menu.find('li');
            this.$searchable=this.$element.attr('data-searchable');

            if (id !== undefined) {
                this.$button.attr('data-id', id);
                $('label[for="' + id + '"]').click(function(e) {
                    e.preventDefault();
                    that.$button.focus();
                });
            }
			//this.createTooltip();//取消浮动提示信息
			this.checkDisabled();
            this.clickListener();
            this.render();
            this.setWidth();
            this.liveSearchListener();
            this.$newElement.data('selectpicker', this);
            this.searching();
        },
        /**
         * 创建下拉框element
         */
        createView:function(){
            var $drop=this.createDropdown(),
                $li=this.createLi();
            $drop.find('ul').append($li);
            return $drop;
        },
        /**
         * 创建dropdown组件元素
         * @returns {*|HTMLElement}
         */
        createDropdown:function(){
            var drop='<div class="iss-select-container dropdown">'+
                '<button class="btn iss-select" data-toggle="dropdown" data-placement="auto right">' +
                '<span class="display pull-left"></span>&nbsp;<span class="caret"></span>' +
                '</button>' +
                '<div class="dropdown-menu iss-select-drop">' +
                '<div class="iss-select-search">' +
                '<input type="text" class="form-control input-sm" autocomplete="off"/>' +
                '<span class="glyphicon glyphicon-search search-icon"></span>' +
                '</div>' +
                '<ul class="iss-select-results">' +
                '</ul>' +
                '</div>' +
                '</div>';
            return $(drop);
        },
        /**
         * 创建下拉选项li
         * @returns {*|HTMLElement}
         */
        createLi:function(){
            var _liArr=[],that=this;
            this.$element.find('option').each(function(index){
                var $this = $(this),
                    text=$this.text(),
                    value=$this.val();

                _liArr.push('<li data-val="'+value+'" data-select-index="'+index+'" >' +
                    (that.multiple ? '<input type="checkbox" tabindex="-1">':'')+
                    '<a tabindex="0">'+text+'</a></li>');
            });

            return $(_liArr.join('\n'));
        },
        /**
         * 重建下拉框选项
         */
        reloadLi: function () {
            this.$lis.remove();
            var $li=this.createLi();
            this.$menu.find('ul').append($li);
            this.$lis=this.$menu.find('li');
        },
        createTooltip:function(){ //创建浮动提示信息
            this.$button.popover({
                trigger:'hover'
            });
        },
        /**
         * 设置选中项li的样式
         * @param index 索引
         * @param selected true|false 是否选中
         */
        setSelected: function(index, selected) {
            if (this.$lis == null) this.$lis = this.$menu.find('li');
            var $li=$(this.$lis[index]);
            $li.toggleClass('selected', selected);
            if(this.multiple){
               $li.find('input[type="checkbox"]').prop('checked',selected);
            }
        },
        isDisabled : function(){
            return this.$element.is(':disabled');
        },
        checkDisabled : function(){
            var that=this;

            if(this.isDisabled()){
                this.$button.addClass('disabled').attr('tabindex', -1);
            }else{
                if (this.$button.hasClass('disabled')) {
                    this.$button.removeClass('disabled');
                }

                if (this.$button.attr('tabindex') == -1) {
                    this.$button.removeAttr('tabindex');
                }
            }


        },
        setDisabled : function(disabled){
            this.$element.prop('disabled',disabled);
            this.checkDisabled();
        },
        clickListener:function(){ //添加监听
            var that=this;
            this.$newElement.on('shown.bs.dropdown',function(){//下拉框显示时搜索框自动获取焦点
                that.scrollToSelected();
                that.$searchbox.focus();
            });
            this.$newElement.on('hidden.bs.dropdown',function(){//下拉框隐藏时移除focus样式
                that.$lis.filter('.focus').removeClass('focus');
            });

            this.$menu.on('click','li',function(e){  //下拉li点击事件
                if($(this).hasClass('no-results')){
                    that.$searchbox.focus();
                    return false;
                }
                var clickedIndex = $(this).index(),
                    prevValue = that.$element.val(),
                    prevIndex = that.$element.prop('selectedIndex'),
                    $options = that.$element.find('option'),
                    $option = $options.eq(clickedIndex),
                    state = $option.prop('selected');

                if (that.multiple) {//多选时
                    e.stopPropagation();
                    that.$searchbox.focus();

                    $option.prop('selected', !state);
                    that.setSelected(clickedIndex, !state, e.target);
                }else{ //单选时
                    $options.prop('selected', false);
                    $option.prop('selected', true);
                    that.$menu.find('.selected').removeClass('selected');
                    that.setSelected(clickedIndex, true);
                }


                //触发下拉框onchange事件
                if ((prevValue != that.$element.val() && that.multiple) || (prevIndex != that.$element.prop('selectedIndex') && !that.multiple)) {
                    that.$element.change();
                }
            });

            this.$element.change(function() {//下拉框element值改变时重新渲染
                that.render();
            });

            $(window).resize(function() {//浏览器窗口大小改变时，重新计算宽度
               that.setWidth();
            });

            this.$button.click(function() {
                return !that.isDisabled();
            });
        },
        /**
         * 渲染下拉框选中状态和显示内容
         */
        render:function(){
            var that=this;

            //刷新li以匹配select
            this.$element.find('option').each(function(index) {
                that.setSelected(index, $(this).is(':selected') );
            });

            var selectedText=this.$element.find("option:selected").map(function(){
                return $(this).text();
            }).get().join(', ');

            this.$display.text(selectedText||' ');
            this.$button.attr('data-content',selectedText||'');//鼠标悬浮提示的信息
        },
        setWidth:function(){//设置下拉框宽度
            var width=this.options.width;
            if(width==='auto'){
                width=this.$element.width();
            };
            if(width==='fit'){
                width='100%';
            };
            this.$newElement.width(width);
            this.setHeight();
        },
        setHeight: function () {
            if(this.$element.hasClass('input-sm')){
                this.$button.addClass('btn-sm');
            }else if(this.$element.hasClass('input-lg')){
                this.$button.addClass('btn-lg');
            }
        },
        liveSearchListener:function(){//关键字搜索
            var that=this,
                no_results = $('<li class="no-results"></li>');

            this.$searchbox.on('compositionstart',function(){ //中文输入法时，输入字母过程中不搜索关键字
                that.searchingLock=true;
            });
            this.$searchbox.on('compositionend',function(){
                that.searchingLock=false;
            });
            this.$searchbox.on('input propertychange',function(){//监听关键字过滤输入框的输入
            	var keyword=that.$searchbox.val(),
	                $lis=that.$lis;
	            if(that.searchingLock){
	                return;
	            }
	            if(keyword){
	                that.searchingLock=true;
	                setTimeout(function(){
	                    //不使用show()/hide(),解决大数据量时缓慢的问题
	                    $lis.css('display','').not(':keywordFilter('+keyword+')').css('display','none'); //将不包含的隐藏
	                    that.searchingLock=false;
	                    if($lis.filter(':visible:not(.no-results)').length==0){
	                        no_results.html(that.options.noneResultsText.replace('keyword',keyword)).show();
	                        $lis.last().after(no_results);
	                    }else{
	                        no_results.remove();
	                    }
	                },500);
	
	            }else{
	                $lis.css('display',''); //显示
	                if (!!no_results.parent().length) no_results.remove();
	            }
            });
        },
        /**
         * 获取|设置 下拉框的value值
         * @param value value为空时表示获取下拉框的value值，不为空时表示设置下拉框的值
         * @returns {*}
         */
        val: function(value) {
            if (value !== undefined) {
                this.$element.val( value );
                this.$element.change();
                return this.$element;
            } else {
                return this.$element.val();
            }
        },
        /**
         * 获取|设置下拉框的Text值
         * @param text 为空时表示获取下拉框的text值，不为空时表示设置下拉框的值，单选框传字符串，多选框传数组
         * @returns {*}
         */
        rawVal:function(text){
            if (text !== undefined) {
                var that=this,
                    text=$.isArray(text) ? text : [text],
                    $opts=this.$element.find('option');
                $opts.each(function () {
                    var _this=$(this),
                        match=text.contains(_this.text());

                    _this.prop('selected',match);

                    if(!that.multiple && match){
                        return false;//单选时，匹配到结果则跳出循环
                    }
                });
                this.$element.change();
                return this.$element;
            } else {
                var selectedText=this.$element.find("option:selected").map(function(){
                    return $(this).text();
                }).get();
                if(this.multiple){
                    return selectedText;
                }else{
                    return selectedText.length>0 ? selectedText[0] : null;
                }
            }
        },
        show:function(){//显示下拉组件
            this.$newElement.show();
        },
        hide:function(){ //隐藏下了组件
            this.$newElement.hide();
        },
        showMenu : function(){ //显示下拉框选项面板
            var that=this;
            setTimeout(function(){
                that.$newElement.addClass('open').trigger($.Event('shown.bs.dropdown')); //显示下拉并触发shown事件
            },0);
        },
        hideMenu : function(){  //隐藏下拉框选项面板
            this.$newElement.removeClass('open');
        },
        scrollToSelected:function(){ //滚动到选中的第一个项
            this.$lis.filter('.selected:eq(0)').find('a').focus();
        },
        refresh:function(){  //刷新，重建下拉框选项
            this.reloadLi();
            this.render();
            this.setWidth();
            this.checkDisabled();
        },
        /**
         * 键盘事件监听，监听方向上下键、回车、Tab、Esc
         * @param e
         */
        keydown : function(e){
            var $this=$(this),  //事件触发的element
                keyCode= e.keyCode, //按键
                that,   //selectpicker对象
                $items,  //下拉选项li
                index,  //当前选中行的索引
                next;

            that=$this.parent().data('selectpicker');
            if($this.data('toggle')==='dropdown'){ // 在下拉框button元素上按键时不处理
                return;
            }
            $items=that.$lis.filter(':visible:not(.no-results)');
            index=$items.index($items.filter('.focus').last());
            if(index<0)index=$items.index($items.filter('.selected'));
            if(keyCode==40||keyCode==38){
                if(keyCode==40){ //方向键下↓
                    next=index+1;
                    if(next>=$items.length){
                        next=0;
                    }
                }else if(keyCode==38){ //方向键上↑
                    next=index-1;
                    if(next<0){
                        next=$items.length-1;
                    }
                }

                $items.removeClass('focus').eq(next).addClass('focus').find('a').focus();
                that.$searchbox.focus();
            }else if(keyCode===13 || keyCode===9){//回车键或者Tab键，回填数据
                var activeLi=$items.filter('.focus');
                if(activeLi.length>0){
                    activeLi.click();
                }else{
                    that.$newElement.removeClass('open');
                }
                e.preventDefault();
            }else if(keyCode===27){ //ESC键，直接隐藏下拉选项
                that.$newElement.removeClass('open');
                that.$lis.filter('.focus').removeClass('focus');
            }
        },
        searching:function(){
            if(this.$searchable=='true'){
                this.$newElement.removeClass('searchable');
            }else{
                this.$newElement.addClass('searchable');
            }
        }
    }

    $.fn.selectpicker=function(option,event){
        var args=arguments;
        var value;
        var chain = this.each(function() {
            if ($(this).is('select')) {
                var $this = $(this),
                    data = $this.data('selectpicker'),
                    options = typeof option == 'object' && option;

                if (!data) {
                    $this.data('selectpicker', (data = new Selectpicker(this, options, event)));
                } else if (options) {
                    for(var i in options) {
                        data.options[i] = options[i];
                    }
                }

                if (typeof option == 'string') {
                    //Copy the value of option, as once we shift the arguments
                    //it also shifts the value of option.
                    var property = option;
                    if (data[property] instanceof Function) {
                        [].shift.apply(args);
                        value = data[property].apply(data, args);
                    } else {
                        value = data.options[property];
                    }
                }
            }
        });

        if (value !== undefined) {
            return value;
        } else {
            return chain;
        }
    };

    /**
     * 下拉框组件默认参数
     */
    $.fn.selectpicker.defaults={
        width:'fit',
        noneResultsText:'没有匹配[keyword]的选项'
    };

    $(document).on('keydown',' .iss-select-drop',Selectpicker.prototype.keydown);


    $(function(){ //自动将含有selectpicker样式的element转换为selectpicker
        $(".selectpicker").selectpicker();
    });
})(jQuery);