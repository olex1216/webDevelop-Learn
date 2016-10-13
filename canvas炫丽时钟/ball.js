
	var ball = {x:50,y:50,r:20,g:2,vx:4,vy:0,color:"#005588"};
	var go = $('#go');
	var stop = $('#stop');
	var timer;

	var canvas = document.getElementById('canvas');
	var context = canvas.getContext("2d");
	canvas.width = 1024;
	canvas.height =500;

	window.onload = function () { 
		 render(context) ;

		 go.on('click', function() {

		 	ballGo();
		 	go.attr('disabled', 'true');
		 });

		 stop.on('click', function() {
		 	clearInterval(timer);
		 	// ball = {x:50,y:50,r:20,g:2,vx:4,vy:0,color:"#005588"};
		 	render(context);
		 	go.removeAttr('disabled');
		 });
    };


	function ballGo() {
		timer=setInterval(function () {
			render(context);
			update(); 
		}, 50);	  
	}

	function render (cxt) {
	    cxt.clearRect(0,0,cxt.canvas.width, cxt.canvas.height);
	    cxt.beginPath();
	    cxt.arc(ball.x,ball.y,ball.r,0,2*Math.PI);
	    cxt.closePath();
	    cxt.fillStyle = ball.color;
	    cxt.fill();
	}
		

	function update(){
		//下落
		ball.x += ball.vx;//x = vx*t
		ball.y += ball.vy;//y = vy*t
		ball.vy += ball.g;//vy = g*t

		//下边碰撞
		if(ball.y >=500 -ball.r){
		ball.y =500 -ball.r;
		ball.vy = -ball.vy*0.9;
		}
		//右边碰撞
		if(ball.x >= 1024 -ball.r){
		ball.x = 1024 -ball.r;
		ball.vx = -ball.vx*0.9;
		}
		//左边碰撞
		if(ball.x <= ball.r){
		ball.x = ball.r;
		ball.vx = -ball.vx*0.9;
		}
	}
