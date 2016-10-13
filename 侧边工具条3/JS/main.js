// ÅäÖÃÄ£¿é
requirejs.config({
	paths:{
		jquery: 'jquery.min',
	}
});


// ¼ÓÔØÄ£¿é
requirejs(['jquery','backtop' ],function($,backtop){
	
	backtop.BackTop.createNew($('#backtop'),{
		mode:'move'
		});



	// new backtop.BackTop($('#backtop'),{
	// mode:'move'
	// });

	// var scroll = new scrollto.Scrollto({});
	// $('#backtop').on('click',$.proxy(scroll.move,scroll));=
	// $(window).on('scroll',function () {
	// 	checkPosition($(window).height());
	// });
	// checkPosition($(window).height());

	// function checkPosition(pos) {
	// 	if ($(window).scrollTop()>pos) {
	// 		$('#backtop').fadeIn();
	// 	} else {
	// 		$('#backtop').fadeOut();// Òþ²Ø·µ»Ø¶¥²¿
	// 	}
	// }
	
});


