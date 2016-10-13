requirejs.config({
	paths:{
		jquery: 'jquery.min',


	}
});

requirejs(['jquery' ,'validate'],function($,validate){
	console.log(validate.isEqual(1,2));
		
});


