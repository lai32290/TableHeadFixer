(function ($) {

  $.fn.tableFixer = function (param) {

    return this.each(function () {
      table.call(this);
    });

    function table() {
      /**
       * This function solver z-index problem in corner cell
       * where fix row and column at the same time,
       * set corner cells z-index 1 more then other fixed cells
       */
      function setCorner() {
        var table = $(settings.table);

        if (settings.head) {
          var tr;
          if (settings.left > 0) {
            tr = table.find("> thead > tr");

            tr.each(function (k, row) {
              solveLeftColspan(row, function (cell) {
                $(cell).css("z-index", settings['z-index'] + 1);
              });
            });
          }

          if (settings.right > 0) {
            tr = table.find("> thead > tr");

            tr.each(function (k, row) {
              solveRightColspan(row, function (cell) {
                $(cell).css("z-index", settings['z-index'] + 1);
              });
            });
          }
        }

        if (settings.foot) {
          if (settings.left > 0) {
            tr = table.find("> tfoot > tr");

            tr.each(function (k, row) {
              solveLeftColspan(row, function (cell) {
                $(cell).css("z-index", settings['z-index'] + 1);
              });
            });
          }

          if (settings.right > 0) {
            tr = table.find("> tfoot > tr");

            tr.each(function (k, row) {
              solveRightColspan(row, function (cell) {
                $(cell).css("z-index", settings['z-index'] + 1);
              });
            });
          }
        }
      }

      // Set style of table parent
      function setParent() {
        var parent = $(settings.parent);
        var table = $(settings.table);

        parent.append(table).css({
          'overflow-x': 'auto',
          'overflow-y': 'auto',
          'position': 'relative', // for cells position computation
        });

        parent.on('scroll', $.proxy(function () {
          var scrollWidth = parent[0].scrollWidth;
          var clientWidth = parent[0].clientWidth;
          var scrollHeight = parent[0].scrollHeight;
          var clientHeight = parent[0].clientHeight;
          var scroll_top = parent.scrollTop();
          var scroll_left = parent.scrollLeft();
          var table_position = {
            left: table[0].offsetLeft,
            top: table[0].offsetTop,
          };
          table_position.right = scrollWidth - table_position.left - table.width();
          table_position.bottom = scrollHeight - table_position.top - table.height();

          if (settings.head) {
            var top = scroll_top - table_position.top;
            this.find("> thead > tr > *").css("top", top < 0 ? 0 : top);
          }

          if (settings.foot) {
            var bottom = scrollHeight - clientHeight - scroll_top - table_position.bottom;
            this.find("> tfoot > tr > *").css("bottom", bottom < 0 ? 0 : bottom);
          }

          if (settings.left > 0) {
            var left = scroll_left - table_position.left;
            settings.leftColumns.css("left", left < 0 ? 0 : left);
          }

          if (settings.right > 0) {
            var right = scrollWidth - clientWidth - scroll_left - table_position.right;
            settings.rightColumns.css("right", right < 0 ? 0 : right);
          }
        }, table));
      }

      // Set table head fixed
      function fixHead() {
        var thead = $(settings.table).find("> thead");
        var cells = thead.find("> tr > *");

        setBackground(cells);
        cells.css({
          'position': 'relative',
          'z-index': settings['z-index'],
        });
      }

      // Set table foot fixed
      function fixFoot() {
        var tfoot = $(settings.table).find("> tfoot");
        var cells = tfoot.find("> tr > *");

        setBackground(cells);
        cells.css({
          'position': 'relative',
          'z-index': settings['z-index'],
        });
      }

      // Set table left column fixed
      function fixLeft() {
        var table = $(settings.table);

        settings.leftColumns = $();

        var tr = table.find("> thead > tr, > tbody > tr, > tfoot > tr");
        tr.each(function (k, row) {

          solveLeftColspan(row, function (cell) {
            settings.leftColumns = settings.leftColumns.add(cell);
          });
        });

        var column = settings.leftColumns;

        column.each(function (k, cell) {
          cell = $(cell);

          setBackground(cell);
          cell.css({
            'position': 'relative',
            'z-index': settings['z-index'],
          });
        });
      }

      // Set table right column fixed
      function fixRight() {
        var table = $(settings.table);

        settings.rightColumns = $();

        var tr = table.find("> thead > tr, > tbody > tr, > tfoot > tr");
        tr.each(function (k, row) {
          solveRightColspan(row, function (cell) {
            settings.rightColumns = settings.rightColumns.add(cell);
          });
        });

        var column = settings.rightColumns;

        column.each(function (k, cell) {
          cell = $(cell);

          setBackground(cell);
          cell.css({
            'position': 'relative',
            'z-index': settings['z-index'],
          });
        });

      }

      // Set fixed cells backgrounds
      function setBackground(elements) {
        elements.each(function (k, element) {
          element = $(element);
          var parent = $(element).parent();

          var elementBackground = element.css("background-color");
          elementBackground = (elementBackground === "transparent" || elementBackground === "rgba(0, 0, 0, 0)")
            ? null
            : elementBackground;

          var parentBackground = parent.css("background-color");
          parentBackground = (parentBackground === "transparent" || parentBackground === "rgba(0, 0, 0, 0)")
            ? null
            : parentBackground;

          var background = parentBackground ? parentBackground : "white";
          background = elementBackground ? elementBackground : background;

          element.css("background-color", background);
        });
      }

      function solveLeftColspan(row, action) {
        var fixColumn = settings.left;
        var inc = 1;

        for (var i = 1; i <= fixColumn; i = i + inc) {
          var nth = inc > 1 ? i - 1 : i;

          var cell = $(row).find("> *:nth-child(" + nth + ")");
          var colspan = cell.prop("colspan");

          if (typeof cell.cellPos() !== 'undefined' && cell.cellPos().left < fixColumn) {
            action(cell);
          }

          inc = colspan;
        }
      }

      function solveRightColspan(row, action) {
        var fixColumn = settings.right;
        var inc = 1;
        for (var i = 1; i <= fixColumn; i = i + inc) {
          var nth = inc > 1 ? i - 1 : i;

          var cell = $(row).find("> *:nth-last-child(" + nth + ")");
          var colspan = cell.prop("colspan");
          action(cell);
          inc = colspan;
        }
      }

      var defaults = {
        head: true,
        foot: false,
        left: 0,
        right: 0,
        'z-index': 1,
      };

      var settings = $.extend({}, defaults, param);
      settings.head = Boolean(settings.head);
      settings.foot = Boolean(settings.foot);
      settings.table = this;
      settings.parent = $(settings.table).parent();
      setParent();

      if (settings.head === true) {
        fixHead();
      }

      if (settings.foot === true) {
        fixFoot();
      }

      if (settings.left > 0) {
        fixLeft();
      }

      if (settings.right > 0) {
        fixRight();
      }

      setCorner();

      $(settings.parent).trigger("scroll");

      $(window).resize(function () {
        $(settings.parent).trigger("scroll");
      });
    }
  };

})(jQuery);

/**
 * cellPos jQuery plugin
 * ---------------------
 * Get visual position of cell in HTML table (or its block like thead).
 * Return value is object with "top" and "left" properties set to row
 * and column index of top-left cell corner.
 * Example of use:
 * $("#myTable tbody td").each(function(){
 *   $(this).text( $(this).cellPos().top +", "+ $(this).cellPos().left );
 * });
 */
(function ($) {
  /* scan individual table and set "cellPos" data in the form { left: x-coord, top: y-coord } */
  function scanTable($table) {
    var m = [];
    $table.children("tr").each(function (y, row) {
      $(row).children("td, th").each(function (x, cell) {
        var $cell = $(cell),
          colspan = $cell.attr("colspan") | 0,
          rowspan = $cell.attr("rowspan") | 0,
          tx, ty;
        colspan = colspan ? colspan : 1;
        rowspan = rowspan ? rowspan : 1;

        // noinspection StatementWithEmptyBodyJS
        for (; m[y] && m[y][x]; ++x); //skip already occupied cells in current row

        for (tx = x; tx < x + colspan; ++tx) {  //mark matrix elements occupied by current cell with true
          for (ty = y; ty < y + rowspan; ++ty) {
            if (!m[ty]) {  //fill missing rows
              m[ty] = [];
            }
            m[ty][tx] = true;
          }
        }
        var pos = {top: y, left: x};
        $cell.data("cellPos", pos);
      });
    });
  }

  /* plugin */
  $.fn.cellPos = function (rescan) {
    var $cell = this.first(),
      pos = $cell.data("cellPos");
    if (!pos || rescan) {
      var $table = $cell.closest("table, thead, tbody, tfoot");
      scanTable($table);
    }
    pos = $cell.data("cellPos");
    return pos;
  }
})(jQuery);
