define(['jquery','scrollto'],function ($,scrollto) {
	
	// 把各个功能模块化
	// 
	// 极简法
	var BackTop ={
		DEFAULTS:{
			mode: 'move',
			pos: $(window).height(),
			speed: 800
		},
		createNew:function (el,opts) {
			var backtop={};
			backtop.opts = $.extend({},BackTop.DEFAULTS, opts);
			backtop.$el = el;
			backtop.scroll = scrollto.Scrollto.createNew({
	        	dest:0,
	        	speed:800
		    });


	        // 定义函数--滚动 
	    	backtop._move = function(){
	             backtop.scroll.move();
	    	}; 	
	         // 定义函数--直接滚动到顶部  
	    	backtop._go = function(){
	             backtop.scroll.go();	
	    	};
	        //定义函数--检测滚动条位置
	    	backtop._checkPosition = function(){
	    		var $el = backtop.$el;
	            if($(window).scrollTop() > backtop.opts.pos){
	             	$el.fadeIn();
	            }else{
	                $el.fadeOut();
	            }	
	    	};

	    	//-检测滚动条的位置
    		backtop._checkPosition();
    		$(window).on('scroll', backtop._checkPosition);

    		// 判断运动模式
            if (backtop.opts.mode == 'move') {
            	backtop.$el.on('click', backtop._move);	
            } else {
            	backtop.$el.on('click', backtop._go);	
            }
			return backtop;
		}
	}
    // 模块接口
	return {
		BackTop: BackTop
	}
	// // 构造函数法
	//  function BackTop(el,opts) {
	// 	   this.opts = $.extend({}, BackTop.DEFAULTS, opts);
	// 	   this.$el = $(el);
	//     this.scroll = scrollto.Scrollto.createNew({
	//        	dest:0,
	//        	speed:800
	//  });
	
	
	// 	// 判断运动模式
    //  if (this.opts.mode == 'move') {
	//      this.$el.on('click', $.proxy(this._move,this));	
	//  } else {
	//      this.$el.on('click', $.proxy(this._go,this));	
	//  }
	
	//  //-检测滚动条的位置
	// 	this._checkPosition();
	// 	$(window).on('scroll', $.proxy(this._checkPosition,this));
	//  }
	
	//  //静态属性
	//  BackTop.DEFAULTS= {
	// 	     mode: 'move',
	// 	     pos: $(window).height(),
	// 	     speed: 800
	//  };
	
	//  //定义函数--滚动 
	//  BackTop.prototype._move = function(){
	//       this.scroll.move();
	
	// };
	
	// //定义函数--直接滚动到顶部  
	// BackTop.prototype._go = function(){
	//       this.scroll.go();
	
	// };
	
	// //定义函数--检测滚动条位置
	// BackTop.prototype._checkPosition = function(){
	// 	     var $el = this.$el;
	//       if($(window).scrollTop() > this.opts.pos){
	//         	  $el.fadeIn();
	//       }else{
	//            $el.fadeOut();
	//       }	
	// };
    


});