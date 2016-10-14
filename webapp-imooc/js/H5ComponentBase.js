/* 基本图文组件对象 */
/**
 * 设置基本图文组件的宽、高、文本、样式
 */

var H5ComponentBase = function (name,cfg) {
	 var cfg = cfg || {};
	 var id = ('h5_c_'+Math.random()).replace('.','_');
	 var cls = 'h5-comp-'+ cfg.type ;


	 var component = $('<div class="h5-component '+cls+' h5-comp-name-'+name+'" id="'+id+'">');

	 cfg.text && component.text(cfg.text);
	 cfg.width && component.width(cfg.width/2);
	 cfg.height && component.height(cfg.height/2);

	 cfg.css && component.css(cfg.css);
	 cfg.bg && component.css('backgroundImage','url('+cfg.bg+')');

	 if(cfg.center === true) {
	 	component.css({
	 		left : '50%',
	 		marginLeft : (cfg.width/4 * -1) + 'px',
	 	});

	 }
	 if( typeof cfg.onclick === 'function' ){
	     component.on('click',cfg.onclick);
	 };

	 component.on('onLoad',function () {
	 	component.addClass(cls+'-load').removeClass(cls+'-leave');
	 	cfg.animateIn && component.animate(cfg.animateIn);
	 	return false;
	 });

	 component.on('onLeave',function () {
	 	component.addClass(cls+'-leave').removeClass(cls+'-load');
	 	cfg.animateOut && component.animate(cfg.animateOut);
	 	return false;
	 });

	 return component ;
};