/* 内容管理对象 */

var H5 = function ( ) {
	this.id = ('h5_'+Math.random()).replace('.','_');
	this.el = $('<div class="h5" id="'+this.id+'">').hide();
	this.page = [ ];
	$('body').append(this.el);

    /*新增页面*/
    /**
     * [addPage description]
     * @param {string} name 图文组件的名称，会加入到ClssName中	
     * @param {string} text 页面内默认的文本
     * @return {H5} 链式调用     
     */
	this.addPage = function (name,text) {
		var page = $('<div class="h5-page section">');

		if(name !== undefined) {
			page.addClass('h5-page-'+name);
		}

		if(text !== undefined) {
			page.text(text);
		}

		this.el.append(page);
		this.page.push(page);

		return this;

	};

	/*新增组件*/
	/**
	 * [addComponent description]
	 * 
	 */
	this.addComponent = function (name,cfg) {
		var cfg = cfg || {};
		// cfg = $.extend({
		// 	type : 'base'
		// }, cfg);

		var component;//定义一个变量，存储组件元素
		var page = this.page.slice(-1)[0];
		switch (cfg.type) {
			case 'base':
				component = new H5ComponentBase(name,cfg);
				break;
			case 'point':
				component = new H5ComponentPoint(name,cfg);
				break;
			case 'bar':
				component = new H5ComponentBar(name,cfg);
				break;
			default:
				// statements_def
				break;
		}

		page.append(component);
		return this;
	};

    /**H5对象初始化
     * [loader description]
     * @return {[type]} [description]
     */
	this.loader = function () {
		this.el.fullpage({
			onLeave : function (index,nextIndex,direction) {
				$(this).find('.h5-component').trigger('onLeave');
			},
			afterLoad : function (anchorLink,index) {
				$(this).find('.h5-component').trigger('onLoad');
			},

		});


		this.page[0].find('.h5-component').trigger('onLoad');
		this.el.show();
	};

	return this ;
};	

