jQuery.fn.extend({

	fixHeader: function(param) {
		var self = {
			param: {
				fixHead: true
			},

			setParent: function() {
				var parent = self.parent;

				$(this).before(parent);
				parent.append(this);
				parent
					.css({
						'width' : '100%',
						'height' : '100%',
						'overflow' : 'scroll'
					});

				parent.scroll(function() {
					var top = parent.scrollTop();
					this.find("thead th").css("top", (top));
				}.bind(this));
			}.bind(this),
			
			fixHead: function() {
				var thead = $(this).find("thead");
				var tr = thead.find("tr");
				var th = thead.find("th");

				th.css({
					'position' : 'relative',
					'background' : tr.css("background")
				});
			}.bind(this)
		};


		// ------------------------------------------------

		if(param !== undefined)
			self.param = param;

		self.parent = $("<div></div>");
		self.setParent();

		if(self.param.fixHead == true)
			self.fixHead();

		console.log(this.position().top);
	}
});

$(".fixHead").fixHeader(); 