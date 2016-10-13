/* 柱图组件对象 */

var  H5ComponentPolyline = function (name,cfg) {
	var component = new H5ComponentBase(name,cfg);

	//绘制网格线---背景层
	var w= cfg.width;
	var h= cfg.height;



	//绘制一个画布，用作网格线背景
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height =ctx.height = h;
	component.append(cns);

	//水平网格线
	var step =10 ;
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#ccc';

	for (var i = 0; i <step+1; i++) {
		var y = (h/step) * i 
		ctx.moveTo(0,y);
		ctx.lineTo(w,y);

	}

	//垂直网格线（根据项目个数）
	var len = cfg.data.length+1;
	var text_w = w/len >> 0;
	for (var i = 0; i < len+1; i++) {
		var x = (w/len)*i >> 0;
		ctx.moveTo(x,0);
		ctx.lineTo(x,h);

		//写项目名称
		if(cfg.data[i]){
			var text = $('<div class="text">');
			text.text(cfg.data[i][0]);
			text.css('width', text_w/2).css('left', x/2+text_w/4);

			component.append(text);
		}

	}

	ctx.stroke();


	//加入画布---数据层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height =ctx.height = h;
	component.append(cns);

/**
 * 绘制折线以及对应的数据和阴影	
 * @param  {[floot]} per [0到1]
 * @return {[type]}     [description]
 */
    function draw (per) {
    	ctx.clearRect(0,0,w,h);
    
		//绘制折线数据
		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.strokeStyle = '#ff7878';
	    
	    //画点
	    var row = w/len;
	    var x = 0;
	    var y =0;
		for (var i = 0; i < len-1; i++) {
			var item = cfg.data[i];
			 x = row*(i+1);                //横坐标
			 y =h-(h*item[1]*per);            //纵坐标

			ctx.moveTo(x,y);
			ctx.arc(x,y,5,0,2*Math.PI);   //画圆
		}

		//连线
		  //移动画笔到第一个数据的点的位置
		 ctx.moveTo(row,h-(h*cfg.data[0][1]*per));

		 for (var i = 0; i < len-1; i++) {
		 	var item = cfg.data[i];

		 	 x = row*(i+1);
		 	 y =h-(h*item[1]*per);  
		 	 ctx.lineTo(x,y);    //把各点连接起来
		 }
		 ctx.stroke();


		 //绘制阴影
		 ctx.save();
		 ctx.lineTo(x,h);
		 ctx.lineTo(row,h);
		 ctx.fillStyle = 'rgba(255,136,120,.3)';	
		 ctx.fill();
		 ctx.restore();
		


		 //写数据
		 for (var i = 0; i < len-1; i++) {
		 	var item = cfg.data[i];

		 	 x = row*(i+1);
		 	 y =h-(h*item[1]*per);
		 	ctx.save();
		 	ctx.fillStyle = item[2] ? item[2] : '#59599';
		 	ctx.moveTo(x,y);
		 	ctx.fillText((item[1]*100)+'%',x-10,y-30);   //百分比数值
		 	ctx.restore();
		 }

	}

	component.on('onLoad', function() {
		//折线图生长动画
		var s = 0;
		for(var i = 0; i < 100;i++){
			setTimeout(	function () {
				s+=.01;
				draw(s);
			}, i*10+500);
		}
	});

	component.on('onLeave', function() {
		//折线图退场动画
		var s = 1;
		for(var i = 0; i < 100;i++){
			setTimeout(	function () {
				s-=.01;
				draw(s);
			}, i*10);
		}
	});

	return component;
};