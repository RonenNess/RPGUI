/**
* This script generate the rpgui button class.
* This will replace automatically every <button> element that has the "rpgui-button" class.
*/


// class name we will convert to special button
var _button_class = "rpgui-button";

// create a rpgui-button from a given element.
RPGUI.__create_funcs["button"] = function(element)
{
	RPGUI.add_class(element, _button_class);
	create_button(element);
};

// init all button elements on page load
RPGUI.on_load(function()
{
	// get all the select elements we need to upgrade
	var elems = document.getElementsByClassName(_button_class);

	// iterate the selects and upgrade them
	for (var i = 0; i < elems.length; ++i)
	{
		RPGUI.create(elems[i], "button");
	}
});

// upgrade a single "input" element to the beautiful button class
function create_button(elem)
{
	// set cursor
	RPGUI.set_cursor(elem, "point");
}
