var taskbar = {

	init:function() {
		this.timeDate();
		this.mouseEventHandlers();
	},

	mouseEventHandlers:function() {
		var that = this;
		$('.taskbar ul li').click(function(e) {
			e.preventDefault();
			that.launch(e, $(this));
		});

		$('.taskbar > ul > li').hover(function(e) {
			e.preventDefault();
			if($('.tb li').hasClass('active')) {
				that.launch(e, $(this));
			}
		});

		$('.context-menu').mouseleave(function() { $(this).hide(); $(this).closest('li').removeClass('active'); });
	},

	launch:function(e, t) {

		var context = t.find('.context-menu').show();
		$('.taskbar ul li').removeClass('active'); 
		$('.context-menu').hide();

		if(t.find('a').length > 1) {
			t.addClass('active');
			var left = t.find('a').position().left - 10;		
			context.css('left', left).show();
		}
	},

	timeDate:function() {

		var weekday = new Array(7);
		weekday[0]=  "Sun";
		weekday[1] = "Mon";
		weekday[2] = "Tue";
		weekday[3] = "Wed";
		weekday[4] = "Thu";
		weekday[5] = "Fri";
		weekday[6] = "Sat";

		setInterval(function(){
			var now = new Date();
			var h = parseInt(now.getHours());
			var m = parseInt(now.getMinutes());

			//Doesn't return single int as time (eg 7:3 is now 07:03)
			if(m < 10) { m = '0'+m; }
			if(h < 10) { h = '0'+h; }

    		now = weekday[now.getDay()] + ' ' + h + ':' + m;
    		$('.taskbar #time').text(now);
		}, 500);
	}



};


taskbar.init();