/* 雷达图组件对象 */

var  H5ComponentRadar =function(name,cfg) {
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


	var r = w/2;         //大圆半径
	var step = cfg.data.length;  //项目个数
    

	/*	计算多边形的顶点坐标
		圆心（a,b),半径r,角度deg
		rad = (2*Math.PI/360)*(360/step)*i
		横坐标  x=a+Math.sin(rad)*r
		纵坐标  y=b+Math.cos(rad)*r
	*/

    // 绘制网格背景(绘制10面)
    var isBlue = false ;
    for (var s = 10; s >0; s--) {

    	ctx.beginPath();
    	for (var i = 0; i < step; i++) {
    		var rad = (2*Math.PI/360) * (360/step) * i;
    		var x = r + Math.sin(rad) * r * (s/10);
    	    var y = r + Math.cos(rad) * r * (s/10);

    	    ctx.lineTo(x,y);
    	}
    	ctx.closePath();
    	ctx.fillStyle = (isBlue = !isBlue) ? '#99c0ff' : '#f1f9ff';
    	ctx.fill();
  
    }

    //绘制伞骨
    for (var i = 0; i < step; i++) {
    	var rad = (2*Math.PI/360) * (360/step) * i;
    	var x = r + Math.sin(rad) * r ;
        var y = r + Math.cos(rad) * r ;
        ctx.moveTo(r,r);
        ctx.lineTo(x,y);

        //输出项目名字
        var text = $('<div class="text">');
        text.text(cfg.data[i][0]);
        text.css('transition', 'all 1s ' + i *.5 + 's');

        if (x > w/2) {
        	text.css('left',x/2+5);
        } else {
        	text.css('right',(w-x)/2+5);
        }

        if (y > h/2) {
        	text.css('top',y/2+5);
        } else {
        	text.css('bottom',(h-y)/2+5);
        }

        if(cfg.data[i][2]){
        	text.css('color', cfg.data[i][2]);
        }
        component.append(text);
     }
     ctx.strokeStyle = '#e0e0e0'
     ctx.stroke();

     //数据层
     //绘制画布
     var cns = document.createElement('canvas');
     var ctx = cns.getContext('2d');
     cns.width = ctx.width = w;
     cns.height =ctx.height = h;
     component.append(cns);

    //绘制数据
    ctx.strokeStyle = '#f00';

	var draw = function(per) {
		ctx.clearRect(0,0,w,h);
		//输出数据
		for (var i = 0; i < step; i++) {
			var rad = (2*Math.PI/360) * (360/step) * i;
			var rate = cfg.data[i][1] * per;
			var x = r + Math.sin(rad) * r * rate;
		    var y = r + Math.cos(rad) * r * rate;

		    ctx.lineTo(x,y);
		    
		}
		ctx.closePath();
		ctx.stroke();

		//输出数据的点
		ctx.fillStyle = '#ff7676';

		for (var i = 0; i < step; i++) {
			var rad = (2*Math.PI/360) * (360/step) * i;
			var rate = cfg.data[i][1] * per;
			var x = r + Math.sin(rad) * r * rate;
		    var y = r + Math.cos(rad) * r * rate;
		    ctx.beginPath();
		    ctx.arc(x,y,5,0,2*Math.PI);
		    ctx.fill();
		    ctx.closePath();
		}

	
	}


	component.on('onLoad', function() {
		//雷达图生长动画
		var s = 0;
		for(var i = 0; i < 100;i++){
			setTimeout(	function () {
				s+=.01;
				draw(s);
			}, i*10+500);
		}
	});

	component.on('onLeave', function() {
		//雷达图退场动画
		var s = 1;
		for(var i = 0; i < 100;i++){
			setTimeout(	function () {
				s-=.01;
				draw(s);
			}, i*10);
		}
	});

	return component;

}

