/* 饼图组件对象 */


var H5ComponentPie = function(name, cfg){
    var component = new H5ComponentBase(name, cfg);

    //绘制网格线---背景层--
    var w = cfg.width;
    var h = cfg.height ;



    //  1.绘制一个画布，用作网格线背景
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('zIndex', 1);
    component.append(cns);

    var r = w / 2;

    //底图层
    ctx.beginPath();
    ctx.fillStyle = '#eee';
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;
    ctx.arc(r, r, r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    //  2.  绘制数据层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('zIndex', 2);
    component.append(cns);

    //数据层
    var colors = ['red', 'green', 'blue', 'purple', 'orange'];


    var sAngle = 1.5 * Math.PI; //开始的角度
    var eAngle = 0; //结束的角度
    var aAngle = 2 * Math.PI;


    var step = cfg.data.length;
    for (var i = 0; i < step; i++) {
        var item = cfg.data[i];
        color = item[2] || (item[2] = colors.pop());

        eAngle = sAngle + aAngle * item[1];

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.lineWidth = .1;
        ctx.moveTo(r, r);
        ctx.arc(r, r, r, sAngle, eAngle);
        ctx.fill();
        ctx.stroke();
        sAngle = eAngle; //上一次结束时的角度就是下一次开始时候的角度

        //加入项目名称以及百分比
        var text = $('<div class="text">');
        text.text(cfg.data[i][0]);
        var per = $('<div class="per">');
        per.text(cfg.data[i][1] * 100 + '%');
        text.append(per);
        var x = r + Math.sin(.5 * Math.PI - sAngle + aAngle * item[1] / 2) * r;
        var y = r + Math.cos(.5 * Math.PI - sAngle + aAngle * item[1] / 2) * r;

        if (x > w / 2) {
            text.css('left', x / 2 + 5);
        } else {
            text.css('right', (w - x) / 2 + 5);
        }

        if (y > h / 2) {
            text.css('top', y / 2 + 5);
        } else {
            text.css('bottom', (h - y) / 2 + 5);
        }

        if (cfg.data[i][2]) {
            text.css('color', cfg.data[i][2]);
        }


        component.append(text);
    }

    //3.蒙版层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('zIndex', 3);
    component.append(cns);



    //
    ctx.beginPath();
    ctx.fillStyle = '#eee';
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;


    // 生长动画
    var draw = function(per) {
        ctx.clearRect(0, 0, w, h);
        ctx.beginPath();
        ctx.moveTo(r, r);

        if (per <= 0) {
            ctx.arc(r, r, r, 0, 2 * Math.PI);
        } else {
            ctx.arc(r, r, r, sAngle, sAngle + 2 * Math.PI * per, true);

        }


        ctx.fill();
        ctx.stroke();
    }


    //饼图生长动画
    component.on('onLoad', function() {
        var p = 0;
        for (var i = 0; i < 100; i++) {
            setTimeout(function() {
                p += .01;
                draw(p);
            }, i * 10 + 500);
        }
    });

    //饼图退场动画
    component.on('onLeave', function() {
        var p = 1;
        for (var i = 0; i < 100; i++) {
            setTimeout(function() {
                p -= .01;
                draw(p);
            }, i * 10);
        }
    });

    return component;

}
