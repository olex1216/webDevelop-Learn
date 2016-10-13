define(['jquery'],function ($) {
 
    //极简法
	var Scrollto={
		//静态属性
	 	DEFAULTS:{
	 		dest:0,
			speed:800
	 	},
	    createNew : function(opts){
	    	var scrollto = {};
	    	scrollto.opts = $.extend({}, Scrollto.DEFAULTS, opts);
	    	scrollto.$el = $('html,body');

            //滚动条
	    	scrollto.move=function(){
	            var opts=scrollto.opts,
			    dest=scrollto.opts.dest;
			    if ($(window).scrollTop() != dest) {
					if(!scrollto.$el.is(':animated')){
					scrollto.$el.animate({scrollTop: dest}, opts.speed) ;
					}
			    } 
	    	}
             
            // 直接滚动到顶部  
	    	scrollto.go=function(){
	    		var dest=scrollto.opts.dest;
				if ($(window).scrollTop() !=dest) {
					 scrollto.$el.scrollTop(dest);
				}
		    }
		    return scrollto;
		}
	 }

    return {
		Scrollto: Scrollto
	}

		//构造函数法
		// function Scrollto(opts) {
		// 	this.opts = $.extend({}, Scrollto.DEFAULS, opts);	
		// 	this.$el = $('html,body');
		// }

	   //滚动条
		// Scrollto.prototype.move = function(){
		// 	var opts=this.opts,
		// 	    dest=this.opts.dest;
		// 	//滚动条未到达目标且未运动时执行动画
		// 	if ($(window).scrollTop() != dest) {
		// 		if(!this.$el.is(':animated')){
		// 			this.$el.animate({scrollTop: dest}, opts.speed) ;
		// 		}
		// 	} 

			
		// };

		// // 直接滚动到顶部  
		// Scrollto.prototype.go = function(){
		// 	var dest=this.opts.dest;
		// 	if ($(window).scrollTop() !=dest) {
		// 		 this.$el.scrollTop(dest);
		// 	}
		// };
	    
	 //    //静态属性
		// Scrollto.DEFAULTS={
		// 	dest:0,
		// 	speed:800
		// }
    
});