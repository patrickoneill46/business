jQuery(function($){

	var path = window.location.pathname,
		$activeLink = $('.nav li a[href="' + path.slice(1, path.length) + '"]');
	// $('.nav li > a').each(function(index, element){
	// 	var $this = $(this),

	// 	// if(path != '/' && path.indexOf($this.attr('href')) != -1){
	// 	if(path.slice(1, path.length) === $this.attr('href')){
	// 		// $('.nav li > a').removeClass('active')
	// 		$this.parent().addClass('active');
	// 	}

	// });

	// $('.nav li a[href="' + path.slice(1, path.length) + '"]').parent().addClass('active');
	if ($activeLink.length == 0){
		$('.nav li a[href="/"').parent().addClass('active');
	} else {
		$activeLink.parent().addClass('active');
	}
});