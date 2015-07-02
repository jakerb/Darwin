var windows = {

	processes: [],

	init:function() {
		var that = this;

		if($('.tb-app').length > 1) {
			//hide others
		}


		$('body').on('click', 'a', function(e) { e.preventDefault(); that.view($(this)); });
		$('body').on('click', '.window', function(e) { that.activate($(this)); });
		$('body').on('drag', '.window', function(e) { that.activate($(this)); });


	},

	create:function(win) {
		var that = this;
		var proc = 'pid-' + Math.random().toString(36).substr(2);

		tray.create(proc);

		$.get('component/window/index.html', function(c) {

			$.getJSON( "component/window/" + win + "/app.json", function(i) {
				if(i.height && i.width && i.title) {


					$('.desktop').append(c).find('.window.td').removeClass('td').attr('data-pid', proc).addClass(proc).css({'height':i.height, 'width':i.width}).find('.title').text(i.title);

					for (var a = 0, l = $(i.views).length; a < l; a++) {
						var view = "component/window/" + win + "/view/" + i.views[a].view + ".html";
						var file = "component/window/" + win + "/css/" + i.views[a].view + ".css";
						var title = i.views[a].title;	
						var window = $('.'+proc).find('.body');


							$('head').append('<link rel="stylesheet" type="text/css" href="' + file	 + '">');
							window.append('<div class="view vd view-' + title + '"></div>');
							$('.view.vd').load(view).removeClass('vd');
					};



					for(var a = 0, l = $(i.taskbar).length; a < l; a++) {
						var tb = $('div.taskbar');

						var title = i.taskbar[a].items;
						var slug = i.taskbar[a].slug;

							if(!$('ul.tb').hasClass(proc)) {
								tb.append('<ul class="tb tb-app ' + proc + '"></ul>');
							}



							if($('ul.'+proc+' > li').length === 0) {
								t = i.title;
							} else {
								t = i.taskbar[a].title;
							}


							tb.find('.'+proc).append('<li class="tb-item td"><a href="" class="tb-title td">'+t+'</a><div class="context-menu" data-x="0"><ul></ul></div></li>');
							tb.find('ul.tb-default').hide();
							var tbmenu = $('ul.tb.' + proc);

							var count = 1;


							for(var b = 0, l = i.taskbar[a].items.length; b < l; b++) {
								var title = i.taskbar[a].items[b].title;
								var url = i.taskbar[a].items[b].url;
								var divide = false;

								if(i.taskbar[a].items[b].divide) {
									divide = 'class="divide"';
								}


								$('.tb.' + proc + ' li.tb-item.td').find('.context-menu ul').append('<li '+divide+'><a class="tb-item" href="' + url + '"> ' + title + ' </a></li>');
								count++;
							};

							if($('.tb-app').length > 1) {
								$('.tb-app').hide().eq(1).show();
							}

							$('.tb.' + proc + ' li.tb-item.td').removeClass('td');



							$('.tb.'+proc).eq(1).remove();
						}

					taskbar.mouseEventHandlers();
					that.processes.push(proc);
					that.interactions();
				} else {
					//A param isn't set
				}
			});

		});
	},

	view:function(win) {
		var that = this;
		var view = win.attr('href');
		var window = win.closest('.body');
		if(view.length > 0) {
			window.find('.view').hide();
			window.find('.view-'+view).show();

		}

	},

	activate:function(win) {
		var pid = win.data('pid');
		$('.window').removeClass('activeWindow');
		win.addClass('activeWindow');

		$('.taskbar ul.tb-default').hide();
		$('.taskbar .'+pid).show();


	},

	interactions:function() {
		var that = this;
		$(".window header .traffic a.close").on('click', function(e) { e.preventDefault(); that.close($(this)); });
		$(".window").draggable({ handle: "header", containment: ".desktop" });
	},

	close:function(w) {
		$(w).closest('.window').hide();
	}

};


windows.init();