/**
* This script generate the rpgui checkbox class.
* This will replace automatically every <input> element that has the "rpgui-checkbox" class.
*/


// class name we will convert to special checkbox
var _checkbox_class = "rpgui-checkbox";

// create a rpgui-checkbox from a given element.
// note: element must be <input> of type "checkbox" for this to work properly.
RPGUI.__create_funcs["checkbox"] = function(element)
{
	RPGUI.add_class(element, _checkbox_class);
	create_checkbox(element);
};

// set function to set value of the checkbox
RPGUI.__set_funcs["checkbox"] = function(elem, value)
{
	elem.checked = value;
};

// set function to get value of the checkbox
RPGUI.__get_funcs["checkbox"] = function(elem)
{
	return elem.checked;
};

// init all checkbox elements on page load
RPGUI.on_load(function()
{
	// get all the input elements we need to upgrade
	var elems = document.getElementsByClassName(_checkbox_class);

	// iterate the selects and upgrade them
	for (var i = 0; i < elems.length; ++i)
	{
		RPGUI.create(elems[i], "checkbox");
	}
});

// upgrade a single "input" element to the beautiful checkbox class
function create_checkbox(elem)
{
	// get next sibling, assuming its the checkbox label.
	// this object will be turned into the new checkbox.
	var new_checkbox = elem.nextSibling;

	// validate
	if (!new_checkbox || new_checkbox.tagName !== "LABEL")
	{
		throw "After a '" + _checkbox_class + "' there must be a label!";
	}

	// copy all event listeners and events
	RPGUI.copy_event_listeners(elem, new_checkbox);

	// do the click event for the new checkbox
	(function(elem, new_checkbox)
	{
		new_checkbox.addEventListener("click", function()
		{
			if (!elem.disabled)
			{
				RPGUI.set_value(elem, !elem.checked);
			}

		});
	})(elem, new_checkbox);
}
