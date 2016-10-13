/* 散点图表组件对象 */

var H5ComponentPoint = function(name, cfg) {
    var component = new H5ComponentBase(name, cfg);

    var base = cfg.data[0][1]; //以第一个数据的大小为100%


    // 输出每个 Point
    $.each(cfg.data, function(index, item) {

        var point = $('<div class="point point-' + (index + 1) + '">');

        var name = $('<div class="name">' + item[0] + '</div>');
        var rate = $('<div class="per">' + (item[1] * 100) + '%</div>');

        name.append(rate);
        point.append(name);

        var per = (item[1] / base * 100) + '%'; //  0.2/0.4=0.5*100=50+%   根据第一项来设置项目宽高
        point.width(per).height(per);

        if (item[2]) {
            point.css('background-color', item[2]); //背景颜色
        }

        if (item[3] !== undefined && item[4] !== undefined) {
            point.css('left', item[3]).css('top', item[4]); //位置

        }

        point.css('transition', 'all 1s ' + index * 0.5 + 's');


        component.append(point);
    });

    component.find('.point').on('click', function() {

        component.find('.point').removeClass('point_focus');
        $(this).addClass('point_focus');

        return false;
    }).eq(0).addClass('point_focus');


    return component;
};
