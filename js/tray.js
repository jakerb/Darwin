var tray = {

	create:function(proc) {
		var tray = $('.tray > div');
		tray.append('<a class="icon icon-'+proc+'"><div class="glyph"></div><span class="active"></span></a>');
	}

};

