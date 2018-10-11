# TableFixer
### About
TableFixer is a fork of @lai32290 [TableHeadFixer plugin](https://github.com/lai32290/TableHeadFixer).
It works in the same way as the old TableHeadFixer plugin, but there is couple of valuable fixes and enhancements.
To learn, what was changed in this new version of TableFixer, please, read the [changelog](#changelog)

TableFixer is a simple [jQuery](http:/jquery.com/ "jQuery") plugin for fixing HTML table header, footer and columns.<br/>
This plugin will only add elements' events and css attributes necessary to fix table header, footer and columns. You can customize styles of your table, as this plugin will not influence any styles of your table (width, height, background, font color, etc...)


### Dependiences (Important!)
- [jQuery](http:/jquery.com/ "jQuery") 1.7

### Get Starting
Before you can use <b>TableFixer</b> plugin, it is required to include <b>jQuery</b> on your website.<br/>
To use <b>TableFixer</b> just include the plugin and call <b>$(element).tableFixer([param])</b> function after the page renders.<br/>
The table must be wrapped with a <code>div</code> element with all size styles set.

### Example:
#### Fix Table Header
```javascript
    // get your table with jQuery selector
    $("#fixTable").tableFixer();
```

#### Fix First Left Column
By default, the function <b>.tableHeadFixer()</b> fixes only table header. If you need to fix only footer or columns, it is necessary to disable header fix by parameter.
```javascript
	$("#fixTable").tableFixer({'left' : 1, 'head' : false});
```

#### Fix Two Left Columns
```javascript
	$("#fixTable").tableFixer({'left' : 2, 'head' : false});
```

#### Fix Table Header and First Right Column
```javascript
	$("#fixTable").tableFixer({'right' : 1});
```

#### Fix Table Header and Footer
```javascript
	$("#fixTable").tableFixer({'foot' : true});
```

#### If you need to set fixed cells z-index parameter to resolve conflits between jQuery plugins
```javascript
	$("#fixTable").tableFixer({'z-index' : 50});
```

#### Fix Multiple Rows in Header or Footer
Fixing multiple rows in header or footer is as easy as adding new <code>tr</code> to either of them, all header's and footer's table rows will be fixed.

#### More Demos
More demos are available inside <b>examples</b> directory.

### Parameters
| attribute	| values		|default	|
|-----------|---------------|-----------|
| head    	| true/false 	| true		|
| foot		| true/false 	| false		|
| left		| 1,2,3,4,etc 	| 0			|
| right		| 1,2,3,4,etc 	| 0			|
| z-index   | 10,50,999,etc | 1			|

### Note
To be able to fix table header, footer and columns, it is important to have the table contained in a <code>div</code>, with explicitely set `height` (for fixing header or footer) and `width` (for fixing columns) attributes/css styles. This is very important, since this plugin depends on having the area for the table limited.

#### If fixed cells' border is important for you
If fixed cells' border is important for you, it is necessary to set table cells' styles to `border-collapse: separate`, because with `border-collapse: collapse` style the cell borders cannot separate and maintain the position of fixed cells.


### Changelog
2018-10-11 (1.1) TableHeadFixer fork:
 - renamed plugin to TableFixer;
 - renamed plugin file to table-fixer.jquery.js;
 - fixed issues with z-indexes in fixed cells;
 - fixed issue with fixed cells position when table has margins, or parent div has other content;
 - styled code;
 - removed junk in code;
### Licence
MIT
