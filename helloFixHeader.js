jQuery.fn.extend({

	tableHeadFixer: function(param) {
		var self = {
			param: {
				head: true,
				foot: false,
				left: 0,
				right: 0
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
					var left = parent.scrollLeft();

					if(self.param.head)
						this.find("thead tr > *").css("top", top);

					if(self.param.left > 0)
						self.param.leftColumns.css("left", left);
				}.bind(this));
			}.bind(this),
			
			fixHead: function() {
				var thead = $(this).find("thead");
				var tr = thead.find("tr");
				var cells = thead.find("tr > *");

				self.setBackground(cells);
				cells.css({
					'position' : 'relative'
				});
			}.bind(this),

			fixLeft: function() {
				var table = $(this);

				var fixColumn = self.param.left;

				self.param.leftColumns = $();

				for(var i = 1; i <= fixColumn; i++) {
					self.param.leftColumns = self.param.leftColumns
						.add(table.find("tr td:nth-child(" + i + "), tr th:nth-child(" + i + ")"));
				}

				var column = self.param.leftColumns;

				column.each(function(k, cell) {
					var cell = $(cell);

					self.setBackground(cell);
					cell.css({
						'position' : 'relative'
					});
				});
			}.bind(this),

			setCorner: function() {
				if(self.param.head) {
					if(self.param.left > 0) {
						var thead = $(this).find("thead");
						var cells = $();

						for(var i = 1; i <= self.param.left; i++)
							cells = cells.add(thead.find("tr > *:nth-child(" + i + ")"));
						
						cells.css({
							'z-index' : '999'
						});
					}
				}
			}.bind(this),

			setBackground: function(elements) {
				elements.each(function(k, element) {
					var element = $(element);
					var parent = $(element).parent();

					var elementBackground = element.css("background-color");
					elementBackground = (elementBackground == "transparent" || elementBackground == "rgba(0, 0, 0, 0)") ? null : elementBackground;

					var parentBackground = parent.css("background-color");
					parentBackground = (parentBackground == "transparent" || parentBackground == "rgba(0, 0, 0, 0)") ? null : parentBackground;

					var background = parentBackground ? parentBackground : "white";
					background = elementBackground ? elementBackground : background;

					element.css("background-color", background);
				});
			}.bind(this),
		};


		// ------------------------------------------------

		if(param === undefined)
			param = {};

		if(typeof param == "object") {
			for(var k in param) {
				var attr = param[k];
				self.param[k] = attr;
			}
		}

		self.parent = $("<div></div>");
		self.setParent();

		if(self.param.head == true)
			self.fixHead();

		if(self.param.left > 0)
			self.fixLeft();

		self.setCorner();
	}
});