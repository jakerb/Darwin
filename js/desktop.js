var desktop = {

	init:function() {
		var that = this;
		$('.layer').on('click', function(e) { e.preventDefault(); that.attention(); })
	},

	attention:function() {
		$('.desktop .window').removeClass('activeWindow');
		$('.taskbar').find('.tb-app').hide();
		$('.taskbar').find('.tb-default').show();
	}

};

desktop.init();