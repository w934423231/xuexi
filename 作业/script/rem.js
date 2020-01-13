$(document).ready(function(){
	if($(window).innerWidth()<640){
		$('html').css('font-size',$(window).innerWidth()/16+'px')
	}else{
		$('html').css('font-size','40px')
	}
})
