# TableHeadFixer
### About
TableHeadFixer is a simple [jQuery](http:/jquery.com/ "jQuery") plugin for fixer HTML tables header, footer or columns.<br/>
This plugin will only add elements events and css attributes necessary for fix tables header, footer or columns, you can customize styles of your table, this plugin will not influence style of table (width, height, background, font color, etc...)

### Require (Important!)
- [jQuery](http:/jquery.com/ "jQuery")

### Get Starting
For use <b>TableHeadFixer</b> plugin, is require include <b>jQuery</b> in your page.<br/>
After included <b>jQuery</b> in your page, just include <b>TableHeadFixer</b> plugin and call <b>.tableHeadFixer([param])</b> function after page rendered.<br/>
And table of fixed need has a <code>div</code>, where included all size style.

### Example:
#### Fix Table Header
```javascript
    // get your table with jQuery selector
    $("#fixTable").tableHeadFixer();
```

#### Fix First Left Column
By default, table header is fixed when <b>.tableHeadFixer()</b> function is called, if you need fix only footer or columns, is necessary disable head fix by parameter.
```javascript
	$("#fixTable").tableHeadFixer({'left' : 1, 'head' : false});
```

#### Fix Two Left Columns
```javascript
	$("#fixTable").tableHeadFixer({'left' : 2, 'head' : false});
```

#### Fix Table Header and First Right Column
```javascript
	$("#fixTable").tableHeadFixer({'right' : 1});
```

#### Fix Table Header and Footer
```javascript
	$("#fixTable").tableHeadFixer({'foot' : true});
```

#### Maybe you will need set fixer cells for resolve conflit between jQuery plugins
```javascript
	$("#fixTable").tableHeadFixer({'z-index' : 50});
```

#### Fix Multiple Rows in Header or Footer
For fix multiple rows in header or footer, is only add new <code>tr</code> in the header or footer, all <code>tr</code> is will be fixed.

#### More Demos
For check more demos, please enter in the <b>examples</b> path.

### Parameters
|attribute	| values		|default	|
|-----------|---------------|-----------|
| head    	| true/false 	|true		|
| foot		| true/false 	|false		|
| left		| 1,2,3,4,etc 	|0			|
| right		| 1,2,3,4,etc 	|0			|
| z-index   | 10,50,999,etc |0			|

### Note
For fixer table header, footer or columns, is important table contained in a div, where which has set `height`, for fix header or footer, and set `width`, for fix left or right columns. This is very important, after all, for fix any row or columns, is necessary a area limited for show table.

#### If fixed cells border is important for you
If fixed cells border is important for you, is necessary set table cells css `border-collapse: separate`, because for css, when `border-collapse: collapse`, cells border is not possible separate and maintain even position of fixed cells
